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
        redirect_uri: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/figma/callback`,
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

    // Create deep link URL following the Stripe webhook pattern
    const deepLinkParams = new URLSearchParams({
      token: access_token,
      refreshToken: refresh_token,
      expiresIn: expires_in.toString(),
      userId: user_id_string,
    });

    const deepLinkUrl = `ternary://figma-oauth-return?${deepLinkParams.toString()}`;
    console.log("🔗 Redirecting to deep link:", deepLinkUrl);

    // Create success page URL as fallback
    const host = req.headers.host || "ternary.app";
    const protocol = /^localhost/.test(host) ? "http" : "https";
    const successUrl = new URL("/figma-success", `${protocol}://${host}`);
    successUrl.searchParams.append("status", "success");

    // Return HTML page that attempts deep link and provides fallback
    const html = `
<!DOCTYPE html>
<html>
<head>
    <title>Figma Connected Successfully</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            max-width: 600px;
            margin: 50px auto;
            padding: 20px;
            text-align: center;
            background: #f8fafc;
        }
        .container {
            background: white;
            padding: 40px;
            border-radius: 12px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .success-icon {
            font-size: 48px;
            margin-bottom: 20px;
        }
        h1 {
            color: #1a202c;
            margin-bottom: 16px;
        }
        p {
            color: #4a5568;
            margin-bottom: 24px;
            line-height: 1.5;
        }
        .btn {
            display: inline-block;
            background: #3182ce;
            color: white;
            padding: 12px 24px;
            text-decoration: none;
            border-radius: 6px;
            font-weight: 500;
            margin: 8px;
        }
        .btn:hover {
            background: #2c5aa0;
        }
        .btn-secondary {
            background: #e2e8f0;
            color: #4a5568;
        }
        .btn-secondary:hover {
            background: #cbd5e0;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="success-icon">✅</div>
        <h1>Figma Connected Successfully!</h1>
        <p>Your Figma account has been connected to Ternary. You can now close this window and return to the Ternary app.</p>
        
        <a href="${deepLinkUrl}" class="btn">Open Ternary App</a>
        <a href="${successUrl.toString()}" class="btn btn-secondary">Continue in Browser</a>
        
        <script>
            // Attempt automatic deep link redirect
            setTimeout(() => {
                window.location.href = "${deepLinkUrl}";
            }, 1000);
            
            // Fallback: redirect to success page after 5 seconds
            setTimeout(() => {
                if (document.visibilityState === 'visible') {
                    window.location.href = "${successUrl.toString()}";
                }
            }, 5000);
        </script>
    </div>
</body>
</html>`;

    res.setHeader('Content-Type', 'text/html');
    return res.status(200).send(html);

  } catch (error) {
    console.error("❌ Error in Figma OAuth callback:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
