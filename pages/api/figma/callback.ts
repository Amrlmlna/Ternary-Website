import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { code, state, error } = req.query;

    // Handle OAuth error
    if (error) {
      console.error("❌ Figma OAuth error:", error);
      return res.status(400).json({ error: `OAuth error: ${error}` });
    }

    // Validate required parameters
    if (!code || !state) {
      return res.status(400).json({ error: "Missing code or state parameter" });
    }

    const clientId = process.env.FIGMA_CLIENT_ID;
    const clientSecret = process.env.FIGMA_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
      return res.status(500).json({ error: "Figma credentials not configured" });
    }

    // Instead of exchanging the code here, redirect with code & state
    // The Electron app expects to receive code & state via deep link and will exchange them itself.
    const host = req.headers.host || "ternary-beta-domain.vercel.app";
    const protocol = /^localhost/.test(host) ? "http" : "https";
    const successUrl = new URL("/figma-success", `${protocol}://${host}`);
    successUrl.searchParams.append("code", code as string);
    successUrl.searchParams.append("state", state as string);

    console.log("🔗 Redirecting to success page with code & state:", successUrl.toString());
    return res.redirect(302, successUrl.toString());

  } catch (error) {
    console.error("❌ Error in Figma OAuth callback:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
