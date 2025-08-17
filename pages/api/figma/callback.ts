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

    // Exchange authorization code for access token
    const tokenResponse = await fetch("https://api.figma.com/v1/oauth/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
      },
      body: new URLSearchParams({
        redirect_uri: `${process.env.NEXT_PUBLIC_BASE_URL || "https://ternary-beta-domain.vercel.app"}/api/figma/callback`,
        code: code as string,
        grant_type: "authorization_code",
      }),
    });

    if (!tokenResponse.ok) {
      const errorText = await tokenResponse.text();
      console.error("❌ Figma token exchange failed:", errorText);
      return res.status(400).json({ error: "Failed to exchange authorization code" });
    }

    const tokenData = await tokenResponse.json();
    const { access_token, refresh_token, expires_in, user_id_string } = tokenData;

    if (!access_token || !refresh_token || !expires_in || !user_id_string) {
      console.error("❌ Invalid token response from Figma:", tokenData);
      return res.status(400).json({ error: "Invalid response from Figma OAuth" });
    }

    console.log("✅ Figma OAuth successful for user:", user_id_string);

    // Create success page URL with tokens (following Stripe pattern)
    const host = req.headers.host || "ternary-beta-domain.vercel.app";
    const protocol = /^localhost/.test(host) ? "http" : "https";
    const successUrl = new URL("/figma-success", `${protocol}://${host}`);
    
    // Add tokens as URL parameters (like Stripe does with apiKey)
    successUrl.searchParams.append("token", access_token);
    successUrl.searchParams.append("refreshToken", refresh_token);
    successUrl.searchParams.append("expiresIn", expires_in.toString());
    successUrl.searchParams.append("userId", user_id_string);

    console.log("🔗 Redirecting to success page:", successUrl.toString());

    // Redirect to success page (like Stripe does)
    return res.redirect(302, successUrl.toString());

  } catch (error) {
    console.error("❌ Error in Figma OAuth callback:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
