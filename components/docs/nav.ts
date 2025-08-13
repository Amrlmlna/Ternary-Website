export type NavGroup = {
  id: string
  title: string
  items: { id: string; title: string }[]
}

import { releases } from "@/components/docs/releases"

export function getNavigationStructure(): NavGroup[] {
  return [
    {
      id: "getting-started",
      title: "Getting Started",
      items: [
        { id: "overview", title: "Overview" },
        { id: "quickstart", title: "Quickstart" },
      ],
    },
    {
      id: "guides",
      title: "Guides",
      items: [
        { id: "ai-models", title: "AI Models" },
        { id: "local-models", title: "Local Models" },
        { id: "chatting", title: "Chatting" },
        { id: "debugging", title: "Debugging" },
        { id: "previewing", title: "Previewing" },
        { id: "versioning", title: "Versioning" },
        { id: "importing", title: "Importing" },
        { id: "mobile-app", title: "Mobile App" },
      ],
    },
    {
      id: "pro",
      title: "Pro",
      items: [
        { id: "pro-overview", title: "Pro Overview" },
        { id: "pro-modes", title: "Pro Modes" },
        { id: "maximize-credits", title: "Maximize AI Credits" },
      ],
    },
    {
      id: "integrations",
      title: "Integrations",
      items: [
        { id: "github", title: "GitHub" },
        { id: "supabase", title: "Supabase" },
      ],
    },
    {
      id: "reference",
      title: "Reference",
      items: [
        { id: "api", title: "API Reference" },
        { id: "faq", title: "FAQ" },
        { id: "roadmap", title: "Roadmap" },
      ],
    },
    {
      id: "release",
      title: "Release",
      items: releases.map((r) => ({ id: r.id, title: r.title })),
    },
    {
      id: "policies",
      title: "Policies",
      items: [
        { id: "privacy-policy", title: "Privacy Policy" },
        { id: "terms", title: "Terms of Service" },
        { id: "cancellation", title: "Cancellation" },
        { id: "refund", title: "Refund" },
        { id: "abuse", title: "Abuse" },
      ],
    },
  ]
}

export function findCategoryBySectionId(sectionId: string): NavGroup | undefined {
  const nav = getNavigationStructure()
  return nav.find((g) => g.items.some((it) => it.id === sectionId))
}
