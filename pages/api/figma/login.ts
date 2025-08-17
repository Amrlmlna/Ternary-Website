import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const clientId = process.env.FIGMA_CLIENT_ID;
    
    if (!clientId) {
      return res.status(500).json({ error: "Figma client ID not configured" });
    }

    // Generate a random state parameter for security
    const state = Math.random().toString(36).substring(2, 15) + 
                  Math.random().toString(36).substring(2, 15);

    // Store state in session or temporary storage (you might want to use Redis in production)
    // For now, we'll include it in the URL and validate it in the callback

    const params = new URLSearchParams({
      client_id: clientId,
      redirect_uri: `${process.env.NEXT_PUBLIC_BASE_URL || "https://ternary-beta-domain.vercel.app"}/api/figma/callback`,
      scope: "file_content:read,files:read,current_user:read",
      state: state,
      response_type: "code",
    });

    const authUrl = `https://www.figma.com/oauth?${params.toString()}`;

    // Redirect user to Figma OAuth
    res.redirect(302, authUrl);
  } catch (error) {
    console.error("❌ Error initiating Figma OAuth:", error);
    return res.status(500).json({ error: "Failed to initiate OAuth flow" });
  }
}
