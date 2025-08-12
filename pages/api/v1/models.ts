import { NextApiRequest, NextApiResponse } from "next";
// Supabase removed. All model info now comes from LiteLLM only.

// --- Authentication Middleware ---
async function authenticateUser(req: NextApiRequest) {
  // No longer needed. Auth is handled by LiteLLM.
  return null;
}

// --- Model List ---
const MODELS = [
  {
    id: "gemini-2.5-pro",
    object: "model",
    created: 1710000000,
    owned_by: "google",
  },
  {
    id: "gemini-2.5-flash",
    object: "model",
    created: 1710000001,
    owned_by: "google",
  },
  {
    id: "gpt-4",
    object: "model",
    created: 1700000000,
    owned_by: "openai",
  },
  {
    id: "gpt-4o",
    object: "model",
    created: 1700000001,
    owned_by: "openai",
  },
  {
    id: "gpt-3.5-turbo",
    object: "model",
    created: 1690000000,
    owned_by: "openai",
  },
  {
    id: "claude-3-sonnet-20240229",
    object: "model",
    created: 1705000000,
    owned_by: "anthropic",
  },
  {
    id: "claude-3-haiku-20240307",
    object: "model",
    created: 1705000001,
    owned_by: "anthropic",
  },
  {
    id: "gemini-1.5-pro",
    object: "model",
    created: 1710000002,
    owned_by: "google",
  },
];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Always set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // Forward request to LiteLLM Proxy /v1/models
    const authHeader = req.headers.authorization || "";
    const apiKey = authHeader.replace("Bearer ", "");
    if (!apiKey) {
      throw new Error("No API key provided");
    }
    const proxyRes = await fetch(
      "https://ternary-gatewayy.up.railway.app/v1/models",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await proxyRes.json();
    if (!proxyRes.ok) {
      throw new Error(
        data.error?.message || "Failed to fetch models from LiteLLM"
      );
    }
    // Forward response to Ternary-app
    res.json(data);
  } catch (error: any) {
    res.status(401).json({
      error: {
        message: error.message || "Authentication failed",
        type: "authentication_error",
      },
    });
  }
}
