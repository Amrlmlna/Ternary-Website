import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (process.env.NODE_ENV === "production") {
    return res
      .status(403)
      .json({ error: "Diagnostics disabled in production" });
  }
  try {
    const secret = process.env.STRIPE_SECRET_KEY;
    if (!secret)
      return res.status(500).json({ error: "STRIPE_SECRET_KEY not set" });

    const stripe = new Stripe(secret as string);

    const acct = await stripe.accounts.retrieve();

    const priceIds = [
      {
        key: "STRIPE_HOBBY_PRICE_ID",
        value: process.env.STRIPE_HOBBY_PRICE_ID,
      },
      { key: "STRIPE_PRO_PRICE_ID", value: process.env.STRIPE_PRO_PRICE_ID },
      {
        key: "STRIPE_ULTRA_PRICE_ID",
        value: process.env.STRIPE_ULTRA_PRICE_ID,
      },
    ];

    const prices = await Promise.all(
      priceIds.map(async (p) => {
        if (!p.value) return { key: p.key, status: "MISSING_ENV" };
        try {
          const price = await stripe.prices.retrieve(p.value);
          return {
            key: p.key,
            id: price.id,
            active: price.active,
            currency: price.currency,
            type: price.type,
            recurring: price.recurring
              ? {
                  interval: price.recurring.interval,
                  interval_count: price.recurring.interval_count,
                }
              : null,
            status: "OK",
          };
        } catch (e: any) {
          return {
            key: p.key,
            id: p.value,
            status: "NOT_FOUND",
            error: e?.message || String(e),
          };
        }
      })
    );

    return res.status(200).json({
      account: {
        id: acct.id,
        settings: { dashboard: acct.settings?.dashboard },
      },
      mode: secret.startsWith("sk_live_")
        ? "live"
        : secret.startsWith("sk_test_")
        ? "test"
        : "unknown",
      prices,
    });
  } catch (err: any) {
    return res
      .status(500)
      .json({ error: err?.message || "Diagnostics failed" });
  }
}
