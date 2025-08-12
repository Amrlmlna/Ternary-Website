import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-07-30.basil",
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    console.log("🔍 Listing all prices from Stripe...");

    const prices = await stripe.prices.list({
      limit: 100,
      active: true,
    });

    console.log(`📊 Found ${prices.data.length} prices`);

    const priceList = prices.data.map((price) => ({
      id: price.id,
      product: price.product,
      unit_amount: price.unit_amount,
      currency: price.currency,
      recurring: price.recurring,
      nickname: price.nickname,
      metadata: price.metadata,
    }));

    return res.status(200).json({
      success: true,
      count: prices.data.length,
      prices: priceList,
    });
  } catch (error) {
    console.error("❌ Error listing prices:", error);
    return res.status(500).json({
      error: "Failed to list prices",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
