import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

interface ExchangeTicketRequest {
  ticket: string;
}

interface UserProfile {
  id: string;
  email: string;
  name: string;
}

interface PlanInfo {
  tier: "free" | "pro" | "plus";
  source: string;
  current_period_end?: string;
}

interface Entitlements {
  figma_import: boolean;
  branded_model: boolean;
  premium_templates: boolean;
  workflow_runner: boolean;
  team_features: boolean;
}

interface ExchangeTicketResponse {
  user: UserProfile;
  plan: PlanInfo;
  entitlements: Entitlements;
}

// In-memory store for used ticket JTIs (in production, use Redis)
const usedTickets = new Set<string>();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ExchangeTicketResponse | { error: string }>
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { ticket } = req.body as ExchangeTicketRequest;

    if (!ticket) {
      return res.status(400).json({ error: "Ticket required" });
    }

    // Verify and decode ticket
    const secret = process.env.JWT_SECRET || process.env.SUPABASE_JWT_SECRET;
    if (!secret) {
      console.error("No JWT secret available");
      return res.status(500).json({ error: "Server configuration error" });
    }

    let payload: any;
    try {
      payload = jwt.verify(ticket, secret, { algorithms: ["HS256"] });
    } catch (jwtError) {
      return res.status(401).json({ error: "Invalid or expired ticket" });
    }

    // Check audience
    if (payload.audience !== "desktop-app") {
      return res.status(401).json({ error: "Invalid ticket audience" });
    }

    // Check one-time use
    if (usedTickets.has(payload.jti)) {
      return res.status(401).json({ error: "Ticket already used" });
    }

    // Mark ticket as used
    usedTickets.add(payload.jti);

    // Clean up old tickets periodically (simple cleanup)
    if (usedTickets.size > 1000) {
      usedTickets.clear();
    }

    // Return user profile and entitlements
    const response: ExchangeTicketResponse = {
      user: {
        id: payload.sub,
        email: payload.email,
        name: payload.name,
      },
      plan: payload.plan,
      entitlements: payload.entitlements,
    };

    res.status(200).json(response);
  } catch (error) {
    console.error("Exchange ticket error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
