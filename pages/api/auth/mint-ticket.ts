import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { supabase } from "../../../src/lib/supabase";
import { createClient } from "@supabase/supabase-js";

// Create admin client for user lookup
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

interface MintTicketRequest {
  state?: string;
  audience: string;
}

interface MintTicketResponse {
  ticket: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<MintTicketResponse | { error: string }>
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // Get user session from cookies
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    
    if (sessionError || !session?.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { state, audience } = req.body as MintTicketRequest;

    if (audience !== "desktop-app") {
      return res.status(400).json({ error: "Invalid audience" });
    }

    // Get user profile and plan info
    const { data: profile, error: profileError } = await supabaseAdmin
      .from("profiles")
      .select("*")
      .eq("id", session.user.id)
      .single();

    // Default to free plan if no profile or error
    const planTier = profile?.plan_tier || "free";
    const planSource = profile?.plan_source || "default";

    // Create ticket payload
    const now = Math.floor(Date.now() / 1000);
    const payload = {
      sub: session.user.id,
      email: session.user.email,
      name: session.user.user_metadata?.full_name || session.user.email,
      plan: {
        tier: planTier,
        source: planSource,
        current_period_end: profile?.current_period_end,
      },
      entitlements: {
        // Basic entitlements based on plan
        figma_import: planTier !== "free",
        branded_model: planTier !== "free",
        premium_templates: planTier !== "free",
        workflow_runner: planTier === "plus",
        team_features: planTier === "plus",
      },
      state,
      audience,
      iat: now,
      exp: now + 60, // 60 seconds expiry
      jti: `ticket_${session.user.id}_${now}_${Math.random().toString(36).substr(2, 9)}`,
    };

    // Sign the ticket
    const secret = process.env.JWT_SECRET || process.env.SUPABASE_JWT_SECRET;
    if (!secret) {
      console.error("No JWT secret available");
      return res.status(500).json({ error: "Server configuration error" });
    }

    const ticket = jwt.sign(payload, secret, { algorithm: "HS256" });

    res.status(200).json({ ticket });
  } catch (error) {
    console.error("Mint ticket error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
