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

    // Build scopes to match Electron app/reference
    const baseScopes = [
      "current_user:read",
      "file_content:read",
      "file_comments:read",
      "projects:read",
      "library_content:read",
      "library_assets:read",
      "file_dev_resources:read",
      "webhooks:read",
      "webhooks:write",
    ];
    const includeEnterprise = process.env.FIGMA_ENABLE_ENTERPRISE_SCOPES === "true";
    const enterpriseScopes = includeEnterprise ? [
      "file_variables:read",
      // "file_variables:write",
    ] : [];
    const scopes = [...baseScopes, ...enterpriseScopes].join(",");

    const params = new URLSearchParams({
      client_id: clientId,
      redirect_uri: `${process.env.NEXT_PUBLIC_BASE_URL || "https://ternary-beta-domain.vercel.app"}/api/figma/callback`,
      scope: scopes,
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
