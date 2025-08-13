import { Terminal, HelpCircle, Rocket } from "lucide-react"

export const referenceSections = [
  {
    id: "api",
    title: "API Reference",
    icon: <Terminal className="w-4 h-4" />,
    content: {
      title: "API Reference",
      description: "Complete reference for Ternary's API endpoints and integration options.",
      items: [
        {
          title: "Authentication",
          content:
            "All API requests require authentication using your API key. Include your API key in the Authorization header as a Bearer token.",
        },
        {
          title: "Generate Endpoint",
          content:
            "Use the /v1/generate endpoint to create applications from natural language descriptions. Supports multiple frameworks including React, Vue, and Angular.",
        },
        {
          title: "Models Endpoint",
          content:
            "Access available AI models through the /v1/models endpoint. Returns a list of supported models with their capabilities and pricing.",
        },
        {
          title: "Rate Limits",
          content:
            "API usage is subject to rate limits based on your subscription tier. Free tier: 100 requests/day, Pro tier: 1000 requests/day, Ultra tier: Unlimited requests.",
        },
      ],
    },
  },
  {
    id: "faq",
    title: "FAQ",
    icon: <HelpCircle className="w-4 h-4" />,
    content: {
      title: "Frequently Asked Questions",
      description: "Have a question? There's a good chance it's here!",
      items: [
        {
          title: "What is Ternary?",
          content: "Free, local, and open-source—Ternary is the beginner-friendly alternative to Bolt.diy.",
        },
        {
          title: "How much does it cost?",
          content:
            "Ternary is completely free to use. You only pay for the AI model usage through your chosen provider (Google, OpenAI, etc.).",
        },
        {
          title: "Do I need coding experience?",
          content:
            "No! Ternary is designed for beginners. You can build full applications using natural language descriptions.",
        },
        {
          title: "What can I build with Ternary?",
          content:
            "You can build web applications, mobile apps, dashboards, landing pages, and more. Ternary supports React, Vue, Angular, and other modern frameworks.",
        },
      ],
    },
  },
  {
    id: "roadmap",
    title: "Roadmap",
    icon: <Rocket className="w-4 h-4" />,
    content: {
      title: "Roadmap",
      description:
        "Curious about what we're building next? Please take the dates with a grain of salt, we're actively making Ternary better, but things may take longer than expected.",
      items: [
        {
          title: "Completed",
          content:
            "✅ Support local models\n✅ Supabase support\n✅ Linux support\n✅ Upload image\n✅ Use any AI model\n✅ Import existing projects\n✅ Support larger codebases\n✅ Next.js support\n✅ Copy app\n✅ Select UI to edit\n✅ Ask mode\n✅ Create mobile app with Capacitor\n✅ Auto-fix errors\n✅ Support other tech stacks besides React\n✅ Undo-able database",
        },
        {
          title: "Short-term (August 2025)",
          content:
            "🔄 Graduate Portal template from experimental\n🔄 Create a hub/marketplace to share prompts, templates, and plugins\n🔄 Run Ternary in Docker container",
        },
        {
          title: "Medium-term",
          content: "🔮 Prototype MCP support\n🔮 Planning support\n🔮 Support importing from Figma",
        },
      ],
    },
  },
] as const
