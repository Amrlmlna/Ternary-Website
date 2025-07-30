import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2025-06-30.basil",
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
  res: NextApiResponse,
) {
  if (req.method !== "POST") return res.status(405).end();
  const { plan } = req.body;
  if (!plan || !Object.keys(PRICING).includes(plan))
    return res.status(400).json({ error: "Invalid plan" });

  const planKey = plan as PlanType;
  const isRecurring = ["pro", "ultra"].includes(planKey);

  // Debug logging
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

  // Validate price ID exists
  if (!PRICING[planKey].priceId) {
    return res.status(500).json({
      error: `Price ID not configured for plan: ${planKey}`,
    });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price: PRICING[planKey].priceId,
          quantity: 1,
        },
      ],
      mode: isRecurring ? "subscription" : "payment",
      success_url:
        PRICING[planKey].successUrl + "?session_id={CHECKOUT_SESSION_ID}&plan=" + planKey,
      cancel_url: PRICING[planKey].cancelUrl,
      metadata: { plan: planKey },
      ...(isRecurring ? {} : {
        payment_intent_data: {
          metadata: { plan: planKey }
        }
      }),
      customer_email: req.body.email, // Capture email if provided
    });

    console.log("Stripe session created:", session.id);
    return res.status(200).json({ url: session.url });
  } catch (err: any) {
    console.error("Stripe error:", err);
    return res.status(500).json({ error: err.message || "Stripe error" });
  }
}
