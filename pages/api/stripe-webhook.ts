import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import { buffer } from "micro";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-06-30.basil",
});

// Supabase removed. All user/key info now comes from LiteLLM only.

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

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    try {
      console.log("🔍 Processing checkout session:", session.id);

      // Extract customer email and plan from metadata
      const customerEmail = session.customer_details?.email;
      const plan = session.metadata?.plan;

      if (!customerEmail || !plan) {
        console.error("❌ Missing customer email or plan in session metadata");
        return res.status(400).json({ error: "Missing required metadata" });
      }

      console.log("📧 Customer email:", customerEmail);
      console.log("📦 Plan:", plan);

      // Call internal API route for keygen to avoid code duplication
      let apiKey = "";
      try {
        const keygenRes = await fetch(
          `${
            process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
          }/api/litellm-keygen`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              plan,
              email: customerEmail,
              key_alias: `stripe-webhook-${session.id}`,
            }),
          }
        );
        const keygenData = await keygenRes.json();
        if (!keygenRes.ok || !keygenData.key) {
          console.error(
            "❌ Failed to generate API key via internal keygen:",
            keygenData
          );
          return res.status(500).json({ error: "Failed to generate API key" });
        }
        apiKey = keygenData.key;
        console.log(
          "🔑 Generated API key via internal keygen:",
          apiKey.substring(0, 10) + "..."
        );
      } catch (err: any) {
        console.error("❌ Error calling internal keygen:", err);
        return res.status(500).json({ error: "Failed to generate API key" });
      }

      // Redirect to Ternary app with deep link
      const deepLinkUrl = `ternary://ternary-pro-return?key=${apiKey}`;
      console.log("🔗 Redirecting to deep link:", deepLinkUrl);
      
      // Juga siapkan URL untuk halaman success sebagai fallback
      const host = req.headers.host || 'ternary.app';
      const protocol = /^localhost/.test(host) ? 'http' : 'https';
      const successUrl = new URL('/success', `${protocol}://${host}`);
      successUrl.searchParams.append('apiKey', apiKey);
      // Tidak perlu menambahkan email lagi
      
      // Return success with redirect URL (do NOT redirect from backend)
      return res.status(200).json({
        success: true,
        message: "Subscription activated successfully",
        redirectUrl: deepLinkUrl,
        successUrl: successUrl.toString(),
        apiKey: apiKey,
      });
    } catch (error) {
      console.error("❌ Error processing webhook:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  return res.status(200).json({ received: true });
}
