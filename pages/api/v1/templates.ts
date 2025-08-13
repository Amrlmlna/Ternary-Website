import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";

// This shape must match the app's ApiTemplate in `src/shared/templates.ts`
// The desktop app merges these with its local official templates.
export type ApiTemplate = {
  githubOrg: string;
  githubRepo: string;
  title: string;
  description: string;
  imageUrl: string;
};

// If Supabase is configured via env, we will read/write templates there.
// Otherwise, we fall back to this curated static list to unblock end-to-end integration.
const FALLBACK_TEMPLATES: ApiTemplate[] = [
  {
    githubOrg: "TernaryStudio",
    githubRepo: "react-todo-template",
    title: "React Todo",
    description: "A minimalist Todo app starter.",
    imageUrl:
      "https://raw.githubusercontent.com/TernaryStudio/assets/main/templates/react-todo.png",
  },
  {
    githubOrg: "TernaryStudio",
    githubRepo: "next-blog-template",
    title: "Next Blog",
    description: "Blog starter with Next.js and MDX.",
    imageUrl:
      "https://raw.githubusercontent.com/TernaryStudio/assets/main/templates/next-blog.png",
  },
  {
    githubOrg: "TernaryStudio",
    githubRepo: "svelte-counter-template",
    title: "Svelte Counter",
    description: "Svelte + Vite counter example with tests.",
    imageUrl:
      "https://raw.githubusercontent.com/TernaryStudio/assets/main/templates/svelte-counter.png",
  },
];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiTemplate[] | ApiTemplate | { error: string }>
) {
  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const ADMIN_KEY = process.env.TEMPLATES_API_ADMIN_KEY; // used to protect POST

  const hasSupabase = Boolean(SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY);
  const supabase = hasSupabase
    ? createClient(SUPABASE_URL as string, SUPABASE_SERVICE_ROLE_KEY as string)
    : null;

  if (req.method === "GET") {
    try {
      // Cache for a minute to reduce cold-start costs
      res.setHeader("Cache-Control", "public, max-age=60");

      if (!hasSupabase || !supabase) {
        // Fallback to static data
        return res.status(200).json(FALLBACK_TEMPLATES);
      }

      // Optional future: org filter
      // const { org } = req.query;

      const { data, error } = await supabase
        .from("templates")
        .select("github_org, github_repo, title, description, image_url")
        .order("created_at", { ascending: false });
      if (error) throw error;

      const mapped: ApiTemplate[] = (data || []).map((t: any) => ({
        githubOrg: t.github_org,
        githubRepo: t.github_repo,
        title: t.title,
        description: t.description,
        imageUrl: t.image_url,
      }));
      return res.status(200).json(mapped);
    } catch (err: any) {
      // Fallback to static templates if DB fails
      return res.status(200).json(FALLBACK_TEMPLATES);
    }
  }

  if (req.method === "POST") {
    // Simple header-based protection for admin writes
    if (!ADMIN_KEY || req.headers["x-api-key"] !== ADMIN_KEY) {
      res.setHeader("Allow", "GET, POST");
      return res.status(401).json({ error: "Unauthorized" });
    }

    if (!hasSupabase || !supabase) {
      return res.status(500).json({ error: "Persistence not configured" });
    }

    const body = req.body as Partial<ApiTemplate>;
    // Minimal validation
    if (
      !body ||
      typeof body.githubOrg !== "string" ||
      typeof body.githubRepo !== "string" ||
      typeof body.title !== "string" ||
      typeof body.description !== "string" ||
      typeof body.imageUrl !== "string" ||
      !body.githubOrg.trim() ||
      !body.githubRepo.trim() ||
      !body.title.trim() ||
      !body.description.trim() ||
      !body.imageUrl.trim()
    ) {
      return res.status(400).json({ error: "Invalid payload" });
    }

    try {
      const { error } = await supabase.from("templates").insert({
        github_org: body.githubOrg,
        github_repo: body.githubRepo,
        title: body.title,
        description: body.description,
        image_url: body.imageUrl,
      });
      if (error) throw error;

      const created: ApiTemplate = {
        githubOrg: body.githubOrg,
        githubRepo: body.githubRepo,
        title: body.title,
        description: body.description,
        imageUrl: body.imageUrl,
      };
      return res.status(201).json(created);
    } catch (err: any) {
      return res.status(500).json({ error: "Failed to create template" });
    }
  }

  res.setHeader("Allow", "GET, POST");
  return res.status(405).json({ error: "Method Not Allowed" });
}
