import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "GET") return res.status(405).end();

  // Return environment variables for debugging (without sensitive data)
  res.json({
    environment: process.env.NODE_ENV,
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
    stripeKeys: {
      secretKey: process.env.STRIPE_SECRET_KEY ? "SET" : "NOT SET",
      publishableKey: process.env.STRIPE_PUBLISHABLE_KEY ? "SET" : "NOT SET",
      webhookSecret: process.env.STRIPE_WEBHOOK_SECRET ? "SET" : "NOT SET",
    },
    priceIds: {
      hobby: process.env.STRIPE_HOBBY_PRICE_ID || "NOT SET",
      pro: process.env.STRIPE_PRO_PRICE_ID || "NOT SET",
      ultra: process.env.STRIPE_ULTRA_PRICE_ID || "NOT SET",
    },
    supabase: {
      url: process.env.SUPABASE_URL ? "SET" : "NOT SET",
      serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY ? "SET" : "NOT SET",
    },
    aiProviders: {
      openai: process.env.OPENAI_API_KEY ? "SET" : "NOT SET",
      anthropic: process.env.ANTHROPIC_API_KEY ? "SET" : "NOT SET",
      google: process.env.GOOGLE_API_KEY ? "SET" : "NOT SET",
    },
  });
}
