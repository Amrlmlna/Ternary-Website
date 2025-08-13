import { RefreshCw } from "lucide-react"

export const releaseSections = [
  {
    id: "releases",
    title: "Releases",
    icon: <RefreshCw className="w-4 h-4" />,
    content: {
      title: "Releases",
      description: "Latest product updates, fixes, and improvements.",
      items: [
        {
          title: "v0.6.0",
          content:
            "Highlights:\n• Experimental mobile app support (Capacitor)\n• Improved local model performance and stability\n• UI polish and bug fixes across the app",
        },
        {
          title: "v0.5.x",
          content:
            "• Supabase integration enhancements\n• Better preview reliability and error surfacing\n• Quality-of-life improvements for editing flows",
        },
        {
          title: "Staying Up-to-Date",
          content:
            "We release frequently. Check the website or in-app announcements for the most recent updates and upgrade notes.",
        },
      ],
    },
  },
] as const
