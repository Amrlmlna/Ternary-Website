import { Code, Zap } from "lucide-react"

export const gettingStartedSections = [
  {
    id: "overview",
    title: "Overview",
    icon: <Code className="w-4 h-4" />,
    content: {
      title: "Welcome to Ternary",
      description: "Free, local, and open-source—Ternary is the beginner-friendly alternative to Bolt.diy.",
      items: [
        {
          title: "What is Ternary?",
          content:
            "Ternary is a free, local open-source AI app builder. It's an alternative to v0, Lovable or Bolt.new, but it runs on your computer, meaning there's no lock-in.",
        },
        {
          title: "What should I read?",
          content:
            "If you're a first time user, start with the quickstart guide. If you're looking to get the most out of Ternary, check out the guides—especially the chatting guide.",
        },
      ],
    },
  },
  {
    id: "quickstart",
    title: "Quickstart",
    icon: <Zap className="w-4 h-4" />,
    content: {
      title: "Quickstart",
      description: "Learn how to set up Ternary and start building your first app.",
      items: [
        {
          title: "Download Ternary",
          content:
            "If you haven't already, download Ternary and then open the app. If you are on Windows, you will see a big blue warning from Microsoft. Click 'More info,' then click 'Run anyway.' Not sure if Ternary is safe? Ternary is open-source, so anyone can inspect the source code that's being run.",
        },
        {
          title: "Install Node.js",
          content:
            "You'll need to install Node.js, which is the JavaScript runtime used to run your apps. If you have trouble with this step, please go to the node.js help page.",
        },
        {
          title: "Set up AI API Keys",
          content:
            "You'll typically want to access AI models via APIs like Google's Gemini, Anthropic's Claude, or OpenAI's. To get started, I recommend creating a Google Gemini API key, which offers a generous free tier (e.g., 250 messages/day for Gemini 2.5 Flash).",
        },
        {
          title: "Start Building",
          content:
            "Now that you've finished the setup steps, type something into the chat input, then click the send button or press Enter. If you're not sure what to build, you can try one of the suggestions below the chat input. Once you submit the chat input, Ternary will start building an app for you.",
        },
      ],
    },
  },
] as const
