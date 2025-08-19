import type { NextApiRequest, NextApiResponse } from "next";

// Use the same owner/repo envs as the listing endpoint
const OWNER = process.env.TERNARY_RELEASE_OWNER || "TernaryStudio";
const REPO = process.env.TERNARY_RELEASE_REPO || "Ternary-App";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id, name } = req.query;
    if (!id || Array.isArray(id)) {
      res.status(400).json({ error: "Missing or invalid 'id' query param" });
      return;
    }

    const token = process.env.GITHUB_TOKEN;
    if (!token) {
      // Without a token, private assets cannot be accessed
      res.status(500).json({ error: "Server not configured with GITHUB_TOKEN" });
      return;
    }

    const headers: Record<string, string> = {
      "User-Agent": "ternary-website",
      Accept: "application/octet-stream",
      Authorization: `token ${token}`,
    };

    // Fire-and-forget PostHog tracking for the click
    try {
      const posthogApiKey = process.env.POSTHOG_API_KEY;
      const posthogHost = process.env.POSTHOG_HOST || "https://us.i.posthog.com";
      if (posthogApiKey) {
        const clientIp = (req.headers["x-forwarded-for"] as string)?.split(",")[0] ||
          (req.socket as any)?.remoteAddress ||
          undefined;
        const ua = req.headers["user-agent"] || "";
        const referer = req.headers["referer"] || "";
        const distinct = (Array.isArray(clientIp) ? clientIp[0] : clientIp) || "anonymous";
        const payload = {
          api_key: posthogApiKey,
          event: "download_clicked",
          distinct_id: distinct,
          properties: {
            assetId: String(id),
            assetName: Array.isArray(name) ? name[0] : name || undefined,
            userAgent: ua,
            url: referer,
            $ip: clientIp,
          },
        } as any;
        // Do not await to keep latency minimal
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        fetch(`${posthogHost.replace(/\/$/, "")}/capture/`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }).catch(() => {});
      }
    } catch {
      // ignore analytics errors
    }

    // Request the asset with octet-stream to get a 302 redirect to signed storage URL
    const url = `https://api.github.com/repos/${OWNER}/${REPO}/releases/assets/${encodeURIComponent(
      id as string
    )}`;

    // We want to manually handle redirects to expose a public URL without our token
    const resp = await fetch(url, { headers, redirect: "manual" as RequestRedirect });

    // GitHub returns 302 with Location to the real file
    const location = resp.headers.get("location");
    if (resp.status >= 300 && resp.status < 400 && location) {
      // Option A: just redirect the client to the signed URL
      res.setHeader("Cache-Control", "private, max-age=60");
      res.redirect(302, location);
      return;
    }

    if (resp.ok && resp.body) {
      // Some environments may not send a redirect, but the body could be the file
      // Forward headers when possible
      const contentType = resp.headers.get("content-type") || "application/octet-stream";
      const contentLength = resp.headers.get("content-length");
      if (contentLength) res.setHeader("Content-Length", contentLength);
      res.setHeader("Content-Type", contentType);
      res.setHeader("Cache-Control", "private, max-age=60");
      // @ts-ignore Node/Next supports piping from web ReadableStream via .arrayBuffer fallback
      const buffer = Buffer.from(await resp.arrayBuffer());
      res.status(200).send(buffer);
      return;
    }

    const text = await resp.text();
    res.status(resp.status || 500).json({ error: `GitHub error ${resp.status}: ${text}` });
  } catch (e: any) {
    res.status(500).json({ error: e?.message || "Internal error" });
  }
}
