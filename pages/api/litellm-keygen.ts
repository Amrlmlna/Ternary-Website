import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return res.status(405).end();
  const { plan, email, key_alias } = req.body;
  if (!plan || !email)
    return res.status(400).json({ error: "Missing plan or email" });

  // user_id harus string tanpa karakter aneh, gunakan email jika yakin aman, atau hash/email tanpa @
  const userId = email.replace(/[^a-zA-Z0-9_-]/g, "_");
  const alias = key_alias || `pro-user-${userId}`;

  let keygenPayload: any = {
    user_id: userId,
    key_alias: alias,
    models: [], // Default to allow all models
    max_budget: 0,
    metadata: { email, plan },
    rpm_limit: 0,
    tpm_limit: 0,
    budget_duration: "30d",
    max_parallel_requests: 20,
  };

  if (plan === "hobby") {
    keygenPayload.max_budget = 100;
    keygenPayload.models = []; // Allow all models for hobby plan
    keygenPayload.rpm_limit = 60;
    keygenPayload.tpm_limit = 1000;
  } else if (plan === "pro") {
    keygenPayload.max_budget = 15;
    keygenPayload.models = []; // Allow all models for pro plan
    keygenPayload.rpm_limit = 30;
    keygenPayload.tpm_limit = 75000;
  } else if (plan === "ultra") {
    keygenPayload.max_budget = 60;
    keygenPayload.models = []; // Allow all models for ultra plan
    keygenPayload.rpm_limit = 75;
    keygenPayload.tpm_limit = 200000;
  } else {
    return res.status(400).json({ error: "Invalid plan" });
  }

  try {
    const response = await fetch(
      "https://ternary-gatewayy.up.railway.app/key/generate",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.LITELLM_ADMIN_KEY ?? ""}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(keygenPayload),
      }
    );
    const data = await response.json();

    if (!response.ok) {
      console.error("LiteLLM keygen error:", data);
      return res
        .status(500)
        .json({ error: "Failed to generate API key", details: data });
    }
    if (!data.key) {
      console.error("LiteLLM keygen missing key:", data);
      return res
        .status(500)
        .json({ error: "No API key returned", details: data });
    }
    const apiKey = data.key;

    // Check if this is an API call from stripe-webhook
    const isApiCall =
      req.headers["content-type"] === "application/json" &&
      req.headers["accept"] === "application/json";

    if (isApiCall) {
      // Return JSON response for API calls (from stripe-webhook)
      return res.status(200).json({ key: apiKey });
    } else {
      // Handle browser redirects
      const host = req.headers.host || "ternary.app";
      const protocol = /^localhost/.test(host) ? "http" : "https";
      const successUrl = new URL("/success", `${protocol}://${host}`);
      successUrl.searchParams.append("apiKey", apiKey);
      // Tidak perlu menambahkan email lagi

      // Redirect user to the success page with the new API key
      return res.redirect(successUrl.toString());
    }
  } catch (err: any) {
    console.error("Keygen exception:", err);
    return res
      .status(500)
      .json({ error: err.message || "Internal server error" });
  }
}
