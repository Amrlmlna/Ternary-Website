import { RefreshCw } from "lucide-react"

export const v_1_2_0_beta = {
  id: "1.2.0-beta",
  title: "1.2.0-beta",
  icon: <RefreshCw className="w-4 h-4" />,
  content: {
    title: "Release 1.2.0-beta",
    description: "Pre-release beta with significant improvements and fixes.",
    items: [
      {
        title: "Highlights",
        content:
          "• New dynamic docs routing with per-section URLs\n• Modular docs sections and Release versioning structure\n• UI/UX polish and performance improvements",
      },
      {
        title: "Improvements",
        content:
          "• Sidebar now supports categories; deep-linkable sections\n• Better code organization for docs content management",
      },
      {
        title: "Fixes",
        content: "• Minor content typos and layout inconsistencies",
      },
      {
        title: "Notes",
        content:
          "This is a beta release. Please report any issues you encounter so we can stabilize for the final 1.2.0.",
      },
    ],
  },
} as const
