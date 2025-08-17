import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({ error: "Refresh token is required" });
    }

    const clientId = process.env.FIGMA_CLIENT_ID;
    const clientSecret = process.env.FIGMA_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
      return res.status(500).json({ error: "Figma credentials not configured" });
    }

    // Refresh the access token
    const tokenResponse = await fetch("https://api.figma.com/v1/oauth/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
      },
      body: new URLSearchParams({
        refresh_token: refreshToken,
        grant_type: "refresh_token",
      }),
    });

    if (!tokenResponse.ok) {
      const errorText = await tokenResponse.text();
      console.error("❌ Figma token refresh failed:", errorText);
      return res.status(400).json({ error: "Failed to refresh token" });
    }

    const tokenData = await tokenResponse.json();
    const { access_token, expires_in } = tokenData;

    if (!access_token || !expires_in) {
      console.error("❌ Invalid refresh response from Figma:", tokenData);
      return res.status(400).json({ error: "Invalid response from Figma token refresh" });
    }

    console.log("✅ Figma token refreshed successfully");

    return res.status(200).json({
      accessToken: access_token,
      expiresIn: expires_in,
    });

  } catch (error) {
    console.error("❌ Error refreshing Figma token:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
