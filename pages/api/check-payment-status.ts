import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2025-07-30.basil",
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") return res.status(405).end();

  const { session_id } = req.query;

  if (!session_id) {
    return res.status(400).json({ error: "Missing session_id" });
  }

  try {
    // Periksa status session di Stripe
    const session = await stripe.checkout.sessions.retrieve(
      session_id as string
    );

    if (session.payment_status !== "paid") {
      return res.status(200).json({
        paid: false,
        message: "Pembayaran belum selesai",
      });
    }

    // Jika sudah dibayar, coba ambil API key dari LiteLLM
    const customerEmail = session.customer_details?.email;
    const plan = session.metadata?.plan;

    if (!customerEmail || !plan) {
      return res.status(400).json({ error: "Missing customer email or plan" });
    }

    // Panggil litellm-keygen untuk mendapatkan API key
    const keygenRes = await fetch(
      `${
        process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
      }/api/litellm-keygen`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          plan,
          email: customerEmail,
          key_alias: `stripe-session-${session_id}`,
        }),
      }
    );

    const keygenData = await keygenRes.json();

    if (!keygenRes.ok || !keygenData.key) {
      return res.status(500).json({
        error: "Failed to generate API key",
        details: keygenData,
      });
    }

    // Kembalikan API key ke client
    return res.status(200).json({
      paid: true,
      apiKey: keygenData.key,
      message: "Pembayaran berhasil dan API key telah dibuat",
    });
  } catch (error: any) {
    console.error("Error checking payment status:", error);
    return res.status(500).json({
      error: error.message || "Internal server error",
    });
  }
}
