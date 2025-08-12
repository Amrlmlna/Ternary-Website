import type { NextApiRequest, NextApiResponse } from "next";

// Configure your repo here or via env vars
const OWNER = process.env.TERNARY_RELEASE_OWNER || "TernaryStudio";
const REPO = process.env.TERNARY_RELEASE_REPO || "Ternary-App";

export type DownloadAsset = {
  name: string;
  url: string;
  size?: number;
  contentType?: string;
};

export type DownloadsResponse = {
  version: string;
  tag: string;
  publishedAt: string | null;
  htmlUrl: string;
  assets: DownloadAsset[];
  platforms: {
    windowsExe?: DownloadAsset;
    windowsNupkg?: DownloadAsset;
    macArm64?: DownloadAsset;
    macX64?: DownloadAsset;
    debAmd64?: DownloadAsset;
    rpmX86_64?: DownloadAsset;
    releasesFile?: DownloadAsset; // Squirrel RELEASES file
  };
};

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const token = process.env.GITHUB_TOKEN;
    const headers: Record<string, string> = {
      "User-Agent": "ternary-website",
      Accept: "application/vnd.github+json",
    };
    if (token) headers.Authorization = `token ${token}`;

    // Try 1: releases/latest (published, non-draft; may 404 if none exists)
    let resp = await fetch(
      `https://api.github.com/repos/${OWNER}/${REPO}/releases/latest`,
      { headers }
    );

    // Try 2: specific tag (e.g., latest-stable) if provided or default
    if (resp.status === 404) {
      const tag = process.env.TERNARY_RELEASE_TAG || "latest-stable";
      const byTag = await fetch(
        `https://api.github.com/repos/${OWNER}/${REPO}/releases/tags/${encodeURIComponent(
          tag
        )}`,
        { headers }
      );
      if (byTag.ok) {
        resp = byTag;
      } else if (byTag.status !== 404) {
        const text = await byTag.text();
        return res
          .status(byTag.status)
          .json({ error: `GitHub error ${byTag.status}: ${text}` });
      }
    }

    // Try 3: list releases and pick the first non-draft entry
    if (resp.status === 404) {
      const list = await fetch(
        `https://api.github.com/repos/${OWNER}/${REPO}/releases`,
        { headers }
      );
      if (!list.ok) {
        const text = await list.text();
        return res
          .status(list.status)
          .json({ error: `GitHub error ${list.status}: ${text}` });
      }
      const releases = (await list.json()) as any[];
      const first = releases.find((r) => r && r.draft === false) || releases[0];
      if (!first) {
        return res.status(404).json({ error: "No releases found" });
      }
      // Simulate the same shape as a normal release fetch
      const release = first;
      const assets = Array.isArray(release.assets) ? release.assets : [];
      const pick = (predicate: (n: string) => boolean): DownloadAsset | undefined => {
        const a = assets.find((x: any) => predicate(x.name));
        if (!a) return undefined;
        return {
          name: a.name,
          url: a.browser_download_url,
          size: a.size,
          contentType: a.content_type,
        };
      };
      const data: DownloadsResponse = {
        version: (release.name as string) || (release.tag_name as string) || "",
        tag: release.tag_name || "",
        publishedAt: release.published_at || null,
        htmlUrl: release.html_url,
        assets: assets.map((a: any) => ({
          name: a.name,
          url: a.browser_download_url,
          size: a.size,
          contentType: a.content_type,
        })),
        platforms: {
          windowsExe: pick((n) => n.toLowerCase().endsWith(".setup.exe")),
          windowsNupkg: pick((n) => n.toLowerCase().endsWith("-full.nupkg")),
          macArm64: pick((n) => n.startsWith("ternary-darwin-arm64") && n.endsWith(".zip")),
          macX64: pick((n) => n.startsWith("ternary-darwin-x64") && n.endsWith(".zip")),
          debAmd64: pick((n) => n.endsWith("_amd64.deb")),
          rpmX86_64: pick((n) => n.endsWith(".x86_64.rpm")),
          releasesFile: pick((n) => n === "RELEASES"),
        },
      };
      res.setHeader("Cache-Control", "s-maxage=300, stale-while-revalidate=600");
      return res.status(200).json(data);
    }

    if (!resp.ok) {
      const text = await resp.text();
      return res
        .status(resp.status)
        .json({ error: `GitHub error ${resp.status}: ${text}` });
    }

    const release = await resp.json();
    const assets = Array.isArray(release.assets) ? release.assets : [];

    const pick = (predicate: (n: string) => boolean): DownloadAsset | undefined => {
      const a = assets.find((x: any) => predicate(x.name));
      if (!a) return undefined;
      return {
        name: a.name,
        url: a.browser_download_url,
        size: a.size,
        contentType: a.content_type,
      };
    };

    const data: DownloadsResponse = {
      version: (release.name as string) || (release.tag_name as string) || "",
      tag: release.tag_name || "",
      publishedAt: release.published_at || null,
      htmlUrl: release.html_url,
      assets: assets.map((a: any) => ({
        name: a.name,
        url: a.browser_download_url,
        size: a.size,
        contentType: a.content_type,
      })),
      platforms: {
        windowsExe: pick((n) => n.toLowerCase().endsWith(".setup.exe")),
        windowsNupkg: pick((n) => n.toLowerCase().endsWith("-full.nupkg")),
        macArm64: pick((n) => n.startsWith("ternary-darwin-arm64") && n.endsWith(".zip")),
        macX64: pick((n) => n.startsWith("ternary-darwin-x64") && n.endsWith(".zip")),
        debAmd64: pick((n) => n.endsWith("_amd64.deb")),
        rpmX86_64: pick((n) => n.endsWith(".x86_64.rpm")),
        releasesFile: pick((n) => n === "RELEASES"),
      },
    };

    res.setHeader("Cache-Control", "s-maxage=300, stale-while-revalidate=600");
    return res.status(200).json(data);
  } catch (e: any) {
    return res.status(500).json({ error: e?.message || "Internal error" });
  }
}

export default handler;
