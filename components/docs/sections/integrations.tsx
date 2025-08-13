import { Github, Database } from "lucide-react"

export const integrationSections = [
  {
    id: "github",
    title: "GitHub",
    icon: <Github className="w-4 h-4" />,
    content: {
      title: "GitHub Integration",
      description: "Learn how to sync your code to GitHub",
      items: [
        {
          title: "Built-in GitHub Integration",
          content:
            "Ternary has built-in integration with GitHub, making it easy to push your local changes to a GitHub project. The integration handles the core workflow automatically.",
        },
        {
          title: "Git Tools",
          content:
            "For most use cases, you don't need to use other Git tools—Ternary handles the core workflow. But for advanced workflows, you may want to use:\n\n• GitHub Desktop: Great for beginners with a user-friendly interface\n• Git CLI: Suited for power users comfortable with command line",
        },
        {
          title: "Troubleshooting",
          content:
            "Common sync issues and solutions:\n\n• Push timed out: Check your internet connection and try again\n• HTTP Error 500: Verify your GitHub permissions and repository access\n• Push rejected (not fast-forward): Use force push option or resolve conflicts manually",
        },
        {
          title: "Reset Git History",
          content:
            "If you want to reset your app's Git history, make a copy of the app without history. Go to the app details screen, click the overflow menu, and select 'Copy app without history'.",
        },
        {
          title: "Repository Access",
          content:
            "When you first connect Ternary to GitHub, you grant access to specific organizations. To add access to more orgs later:\n1. Go to Settings page\n2. Click 'Disconnect from GitHub'\n3. Reconnect and grant access to desired organizations",
        },
      ],
    },
  },
  {
    id: "supabase",
    title: "Supabase",
    icon: <Database className="w-4 h-4" />,
    content: {
      title: "Supabase Integration",
      description: "Use Supabase for auth, database and server functions.",
      items: [
        {
          title: "What is Supabase",
          content:
            "Supabase is an open-source backend platform that offers auth, a PostgreSQL database, edge functions, and more—all with a generous free tier. It's a great choice for quickly launching and scaling new projects.",
        },
        {
          title: "Setup",
          content:
            "Connecting to Supabase only takes a couple of minutes. When you chat in Ternary and request a backend-related feature, Ternary will ask if you'd like to connect to Supabase.\n\nClick the Connect Supabase button, choose your Supabase organization, and grant permissions. Your access token is securely stored locally on your computer.",
        },
        {
          title: "Selecting a Project",
          content:
            "For each Ternary app you want to use with Supabase, you'll need to choose a Supabase project. While you can reuse the same project across multiple apps, it's usually simpler and safer to create a separate project for each one.",
        },
        {
          title: "Authentication",
          content:
            "Supabase Auth is straightforward, especially with the default email/password method. You can ask Ternary to add authentication like: 'Add auth and make users login'\n\nBy default, Supabase requires email confirmation when users sign up. You can disable this in your Supabase dashboard settings.",
        },
        {
          title: "Database",
          content:
            "Supabase Database lets you store and manage data. It also supports Row-Level Security (RLS), which allows secure, fine-grained access directly from the browser based on customizable policies.\n\nTernary usually generates reasonable default RLS policies, but you should review and adjust them to fit your specific needs.",
        },
        {
          title: "Server Functions",
          content:
            "Supabase Edge Functions run on Supabase's servers rather than in the browser. They're especially useful for tasks requiring private API keys (like calling the OpenAI API) because they keep sensitive keys out of the browser, avoiding common security issues.",
        },
      ],
    },
  },
] as const
