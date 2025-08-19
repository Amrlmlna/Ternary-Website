import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import { buffer } from "micro";
import { createClient } from '@supabase/supabase-js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-07-30.basil",
});

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export const config = { api: { bodyParser: false } };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const sig = req.headers["stripe-signature"];
  let event: Stripe.Event;

  let buf;
  try {
    buf = await buffer(req);
    event = stripe.webhooks.constructEvent(
      buf,
      sig as string,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    console.error("❌ Webhook signature verification failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  console.log("✅ Webhook received:", event.type);

  // Handle subscription lifecycle events
  if (event.type === "checkout.session.completed") {
    await handleCheckoutCompleted(event.data.object as Stripe.Checkout.Session);
  } else if (event.type === "customer.subscription.created") {
    await handleSubscriptionCreated(event.data.object as Stripe.Subscription);
  } else if (event.type === "customer.subscription.updated") {
    await handleSubscriptionUpdated(event.data.object as Stripe.Subscription);
  } else if (event.type === "customer.subscription.deleted") {
    await handleSubscriptionDeleted(event.data.object as Stripe.Subscription);
  } else if (event.type === "invoice.payment_succeeded") {
    await handlePaymentSucceeded(event.data.object as Stripe.Invoice);
  } else if (event.type === "invoice.payment_failed") {
    await handlePaymentFailed(event.data.object as Stripe.Invoice);
  }

  return res.status(200).json({ received: true });
}

// Helper function to find user by email
async function findUserByEmail(email: string) {
  const { data: user } = await supabase.auth.admin.listUsers();
  return user.users.find(u => u.email === email);
}

// Helper function to get plan details from price ID
function getPlanFromPriceId(priceId: string): { plan: string; status: string } {
  // Map your Stripe price IDs to plan names
  const priceMapping: Record<string, string> = {
    'price_pro_monthly': 'pro',
    'price_pro_yearly': 'pro', 
    'price_plus_monthly': 'plus',
    'price_plus_yearly': 'plus',
    // Add your actual Stripe price IDs here
  };
  
  return {
    plan: priceMapping[priceId] || 'free',
    status: 'active'
  };
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  try {
    console.log("🔍 Processing checkout session:", session.id);
    
    const customerEmail = session.customer_details?.email;
    if (!customerEmail) {
      console.error("❌ Missing customer email in session");
      return;
    }

    // Find user in Supabase Auth
    const user = await findUserByEmail(customerEmail);
    if (!user) {
      console.error("❌ User not found for email:", customerEmail);
      return;
    }

    console.log("✅ Found user:", user.id);
    
    // Get subscription details
    if (session.subscription) {
      const subscription = await stripe.subscriptions.retrieve(session.subscription as string);
      await upsertSubscription(user.id, subscription);
    }
  } catch (error) {
    console.error("❌ Error processing checkout:", error);
  }
}

async function handleSubscriptionCreated(subscription: Stripe.Subscription) {
  try {
    const customer = await stripe.customers.retrieve(subscription.customer as string);
    if ('email' in customer && customer.email) {
      const user = await findUserByEmail(customer.email);
      if (user) {
        await upsertSubscription(user.id, subscription);
      }
    }
  } catch (error) {
    console.error("❌ Error handling subscription created:", error);
  }
}

async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  try {
    const customer = await stripe.customers.retrieve(subscription.customer as string);
    if ('email' in customer && customer.email) {
      const user = await findUserByEmail(customer.email);
      if (user) {
        await upsertSubscription(user.id, subscription);
      }
    }
  } catch (error) {
    console.error("❌ Error handling subscription updated:", error);
  }
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  try {
    // Mark subscription as canceled
    const { error } = await supabase
      .from('subscriptions')
      .update({ 
        status: 'canceled',
        updated_at: new Date().toISOString()
      })
      .eq('stripe_subscription_id', subscription.id);

    if (error) {
      console.error("❌ Error updating canceled subscription:", error);
    } else {
      console.log("✅ Subscription marked as canceled:", subscription.id);
    }
  } catch (error) {
    console.error("❌ Error handling subscription deleted:", error);
  }
}

async function handlePaymentSucceeded(invoice: Stripe.Invoice) {
  try {
    const subscriptionId = (invoice as any).subscription;
    if (subscriptionId) {
      const subscription = await stripe.subscriptions.retrieve(subscriptionId);
      const customer = await stripe.customers.retrieve(subscription.customer as string);
      
      if ('email' in customer && customer.email) {
        const user = await findUserByEmail(customer.email);
        if (user) {
          await upsertSubscription(user.id, subscription);
        }
      }
    }
  } catch (error) {
    console.error("❌ Error handling payment succeeded:", error);
  }
}

async function handlePaymentFailed(invoice: Stripe.Invoice) {
  try {
    const subscriptionId = (invoice as any).subscription;
    if (subscriptionId) {
      // Mark subscription as past_due
      const { error } = await supabase
        .from('subscriptions')
        .update({ 
          status: 'past_due',
          updated_at: new Date().toISOString()
        })
        .eq('stripe_subscription_id', subscriptionId);

      if (error) {
        console.error("❌ Error updating past due subscription:", error);
      } else {
        console.log("✅ Subscription marked as past due:", subscriptionId);
      }
    }
  } catch (error) {
    console.error("❌ Error handling payment failed:", error);
  }
}

async function upsertSubscription(userId: string, subscription: Stripe.Subscription) {
  try {
    const priceId = subscription.items.data[0]?.price.id;
    const { plan, status } = getPlanFromPriceId(priceId || '');
    
    const subscriptionData = {
      user_id: userId,
      stripe_subscription_id: subscription.id,
      stripe_customer_id: subscription.customer as string,
      plan,
      status: subscription.status as any,
      current_period_start: new Date((subscription as any).current_period_start * 1000).toISOString(),
      current_period_end: new Date((subscription as any).current_period_end * 1000).toISOString(),
      cancel_at_period_end: (subscription as any).cancel_at_period_end,
      updated_at: new Date().toISOString(),
    };

    const { error } = await supabase
      .from('subscriptions')
      .upsert(subscriptionData, { 
        onConflict: 'stripe_subscription_id' 
      });

    if (error) {
      console.error("❌ Error upserting subscription:", error);
    } else {
      console.log("✅ Subscription upserted:", subscription.id, plan);
    }
  } catch (error) {
    console.error("❌ Error in upsertSubscription:", error);
  }
}
