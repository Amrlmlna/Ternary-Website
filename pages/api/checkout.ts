import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2025-07-30.basil",
});

const PRICING = {
  hobby: {
    priceId: process.env.STRIPE_HOBBY_PRICE_ID || "",
    successUrl: process.env.NEXT_PUBLIC_BASE_URL + "/success",
    cancelUrl: process.env.NEXT_PUBLIC_BASE_URL + "/pricing",
  },
  pro: {
    priceId: process.env.STRIPE_PRO_PRICE_ID || "",
    successUrl: process.env.NEXT_PUBLIC_BASE_URL + "/success",
    cancelUrl: process.env.NEXT_PUBLIC_BASE_URL + "/pricing",
  },
  ultra: {
    priceId: process.env.STRIPE_ULTRA_PRICE_ID || "",
    successUrl: process.env.NEXT_PUBLIC_BASE_URL + "/success",
    cancelUrl: process.env.NEXT_PUBLIC_BASE_URL + "/pricing",
  },
};

type PlanType = keyof typeof PRICING;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return res.status(405).end();
  const { plan } = req.body;
  if (!plan || !Object.keys(PRICING).includes(plan))
    return res.status(400).json({ error: "Invalid plan" });

  const planKey = plan as PlanType;
  const isRecurring = ["pro", "ultra"].includes(planKey);

  // Debug logging (disabled in production)
  if (process.env.NODE_ENV !== "production") {
    console.log("Checkout request:", {
      plan: planKey,
      priceId: PRICING[planKey].priceId,
      isRecurring,
      envVars: {
        STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY ? "SET" : "NOT SET",
        STRIPE_HOBBY_PRICE_ID: process.env.STRIPE_HOBBY_PRICE_ID,
        STRIPE_PRO_PRICE_ID: process.env.STRIPE_PRO_PRICE_ID,
        STRIPE_ULTRA_PRICE_ID: process.env.STRIPE_ULTRA_PRICE_ID,
        NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
      },
    });
  }

  // Validate price ID exists
  if (!PRICING[planKey].priceId) {
    return res.status(500).json({
      error: `Price ID not configured for plan: ${planKey}`,
    });
  }

  try {
    // Preflight: verify the Price exists and belongs to this account/mode
    const priceId = PRICING[planKey].priceId;
    let price;
    try {
      price = await stripe.prices.retrieve(priceId);
      if (process.env.NODE_ENV !== "production") console.log("Stripe price retrieved:", {
        id: price.id,
        active: price.active,
        currency: price.currency,
        recurring: price.recurring ? {
          interval: price.recurring.interval,
          interval_count: price.recurring.interval_count,
        } : null,
        type: price.type,
      });
    } catch (preErr: any) {
      console.error("Stripe price retrieve error:", preErr);
      return res.status(500).json({
        error:
          `Stripe price not found or not accessible: ${priceId}. Ensure the ID exists under the same Stripe account as STRIPE_SECRET_KEY and in the correct mode (test vs live).`,
      });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price: price.id,
          quantity: 1,
        },
      ],
      mode: isRecurring ? "subscription" : "payment",
      success_url:
        PRICING[planKey].successUrl +
        "?session_id={CHECKOUT_SESSION_ID}&plan=" +
        planKey,
      cancel_url: PRICING[planKey].cancelUrl,
      metadata: { plan: planKey },
      ...(isRecurring
        ? {}
        : {
            payment_intent_data: {
              metadata: { plan: planKey },
            },
          }),
      customer_email: req.body.email, // Capture email if provided
    });

    if (process.env.NODE_ENV !== "production") console.log("Stripe session created:", session.id);
    return res.status(200).json({ url: session.url });
  } catch (err: any) {
    console.error("Stripe error:", err);
    return res.status(500).json({ error: err.message || "Stripe error" });
  }
}
