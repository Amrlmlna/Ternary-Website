import { Brain, Server, MessageSquare, Terminal, Eye, GitBranch, Download, Smartphone } from "lucide-react"

export const guideSections = [
  {
    id: "ai-models",
    title: "AI Models",
    icon: <Brain className="w-4 h-4" />,
    content: {
      title: "AI Models",
      description: "Setting up AI models and picking the right ones",
      items: [
        {
          title: "Auto Model Selection",
          content:
            "You might have noticed that the default model is simply called 'auto'. This means Ternary will pick the most suitable or available model depending on which AI providers you've set up. If you're just getting started, it's a good choice—but you can always switch to a specific model.",
        },
        {
          title: "Google Gemini",
          content:
            "Ternary recommends using Google Gemini because it has a generous free tier when you create an API key. But there are plenty of other options if you want something else. Keep in mind with the free tier, Google reserves the right to use your data for training.",
        },
        {
          title: "OpenRouter",
          content:
            "OpenRouter is an AI provider aggregator which means that with a single API key you can access (almost) any AI model publicly available. OpenRouter also provides free access to models like DeepSeek v3.",
        },
        {
          title: "Anthropic",
          content:
            "Anthropic is known for developing strong models for coding. However, their models are relatively pricey, and their API doesn't offer a free tier.",
        },
        {
          title: "OpenAI",
          content:
            "OpenAI provides a wide range of models that are typically more affordable than Anthropic's model while delivering comparable performance. Some OpenAI models like GPT 4.1 mini has a generous free tier, but most of them cost money.",
        },
        {
          title: "Local Models",
          content:
            "You can also use local models running on your computer through LM Studio or Ollama. Running local LLMs can be resource-intensive, especially with larger or more advanced models.",
        },
      ],
    },
  },
  {
    id: "local-models",
    title: "Local Models",
    icon: <Server className="w-4 h-4" />,
    content: {
      title: "Local Models",
      description: "Run AI models locally on your machine for privacy and cost savings.",
      items: [
        {
          title: "What are local models?",
          content:
            "Local models are AI models that run directly on your computer instead of being accessed through an API. This gives you complete privacy and eliminates per-request costs, though it requires more computational resources.",
        },
        {
          title: "Setting up local models",
          content:
            "To use local models with Ternary, you'll need to install either LM Studio or Ollama. Both are free applications that make it easy to download and run AI models locally.\n\nLM Studio: User-friendly GUI application\nOllama: Command-line tool with simple setup",
        },
        {
          title: "Recommended models",
          content:
            "For coding tasks, we recommend:\n• DeepSeek Coder (7B or 33B)\n• Code Llama (7B or 13B)\n• Mistral (7B)\n\nLarger models generally perform better but require more RAM and processing power.",
        },
        {
          title: "Performance considerations",
          content:
            "Local models require significant system resources. For best performance:\n• Use at least 16GB RAM for 7B models\n• 32GB+ RAM recommended for larger models\n• GPU acceleration can significantly improve speed\n• Expect slower response times compared to cloud APIs",
        },
      ],
    },
  },
  {
    id: "chatting",
    title: "Chatting",
    icon: <MessageSquare className="w-4 h-4" />,
    content: {
      title: "Chatting",
      description:
        "Tips on chatting with AI. Chatting with AI (aka 'prompting') is more of an art than a science, but here are a few tips to help you get more out of chatting with AI in Ternary.",
      items: [
        {
          title: "Use multiple chats",
          content:
            "Unlike most other AI app builders, Ternary allows you to create multiple chats (conversations) for the same app which gives you better control over the context. From a current chat for an app, you can create a new chat, which will create a clean context for the same app. This is helpful, for example, if your previous chat with the AI went off the rails or started going in circles.",
        },
        {
          title: "Detailed first prompts",
          content:
            "Be as specific as you can, particularly with the first prompt in building an app. This will help the AI understand what you're looking for rather than guessing.\n\nBad prompt: 'Build an AI food scanner app.'\n\nGood prompt: 'Build an AI food scanner app. It should have a welcome screen which is a carousel with a few different sections, each section should contain an image and a text explaining the benefit of the app. In the main screen, the user can upload an image which is sent to an AI which will predict what food it is and the number of calories and the user can confirm.'",
        },
        {
          title: "Review the change",
          content:
            "Even if you're not familiar with the code Ternary is generating, it should summarize the changes it's making to each file, as well as the overall update. Make sure these changes match your expectations. Sometimes Ternary may do too much—making changes you didn't request at all. If you're asking for a small tweak and it starts modifying several files, something likely went wrong and you should undo the change.",
        },
      ],
    },
  },
  {
    id: "debugging",
    title: "Debugging",
    icon: <Terminal className="w-4 h-4" />,
    content: {
      title: "Debugging",
      description:
        "Tips on debugging errors with AI. Debugging with AI to fix errors is one of the most important skills in using Ternary — or any other AI coding tool — effectively.",
      items: [
        {
          title: "Describe the issue clearly",
          content:
            "Imagine you're talking to a human co-worker. If you said there's a bug, you'd try to provide as many details as possible so they know what you're referring to. The same principle applies when you're working with AI.\n\nBad prompt: 'fix broken app'\nGood prompt: 'After I click the sign-up button, the page is blank.'",
        },
        {
          title: "Include detailed error messages",
          content:
            "Similar to the tip above, include error messages with as much detail as possible. If you see an error in the UI, copy and paste the error message and ask the AI to fix it. For many errors, you'll see a 'Fix with AI' button, but in some cases, you'll need to manually copy and paste them.",
        },
        {
          title: "Test often & use undo",
          content:
            "One challenge with AI is that it can make unexpected changes, so I recommend regularly testing your app's main flows in the preview panel to make sure nothing is broken (e.g., every few prompts). If something is off, use the undo feature.",
        },
        {
          title: "Try another model",
          content:
            "Often, trying the same prompt with a different model — especially a more powerful one like Gemini Pro 2.5 or Claude Sonnet 4 — can get you much better results. First, undo, then click the Retry button.",
        },
      ],
    },
  },
  {
    id: "previewing",
    title: "Previewing",
    icon: <Eye className="w-4 h-4" />,
    content: {
      title: "Previewing",
      description:
        "Tips on viewing your app. Ternary allows you to preview your app right next to your AI chat, so you can test things as you go.",
      items: [
        {
          title: "Preview Controls",
          content:
            "Restart: Restarts the Node.js server. It takes longer than a refresh but helps when the app is in a weird state.\n\nRefresh: Reloads the page (like a browser refresh). Ternary auto-reloads after edits, but a manual refresh can sometimes fix loading issues.\n\nAddress bar: You can change which page is shown the preview\n\nOpen new window: Opens the app in a new browser window.",
        },
        {
          title: "Troubleshooting Preview Issues",
          content:
            "If your app preview is taking a long time to load, check the System Messages (the drawer at the bottom of the preview side panel) for any relevant information. The first time you preview an app, Ternary installs npm packages, which can take a while depending on your internet speed and project.",
        },
      ],
    },
  },
  {
    id: "versioning",
    title: "Versioning",
    icon: <GitBranch className="w-4 h-4" />,
    content: {
      title: "Versioning",
      description:
        "Automatic versioning so you don't lose progress. Ternary automatically creates a new version every time it edits your code. This means you never have to worry about losing your progress if (and when) the AI makes a mistake.",
      items: [
        {
          title: "How to undo",
          content:
            "At the top of the chat panel, you'll see a button that looks like this: Version #. The # is whatever version your app is currently on. Clicking this button will open the version list. You can click on previous versions and the preview will update (it may take a second or so), which is useful for figuring out the last good version. Once you've selected a version from the list, you can click the undo button to revert your code to that state.",
        },
        {
          title: "How it works",
          content:
            "Every version in Ternary is essentially a git commit. The commit message is generated by the AI to summarize the changes. When you do an undo in Ternary, it creates a new commit similar to a git revert except it can revert multiple commits at once.",
        },
      ],
    },
  },
  {
    id: "importing",
    title: "Importing",
    icon: <Download className="w-4 h-4" />,
    content: {
      title: "Importing Apps",
      description:
        "If you have an existing app that you want to bring into Ternary. Importing apps is experimental as of v0.6.0.",
      items: [
        {
          title: "AI Rules",
          content:
            "Ternary relies on a file called AI_RULES.md in the root of your project. This file contains AI rules — instructions that guide Ternary as it edits your app. It should describe your app's tech stack and architecture so Ternary can make informed, meaningful changes. If your project doesn't already have an AI_RULES.md file, Ternary will automatically generate one when you import the app.",
        },
        {
          title: "Limitations",
          content:
            "JavaScript apps only: Ternary currently only supports Node.js-based JavaScript apps. You can't import apps built with non-JavaScript frameworks like Laravel (PHP) or Ruby on Rails.\n\nnpm run dev required: Ternary runs npm run dev by default to start the local development server. If your app doesn't include a dev script, you'll need to add one in package.json.",
        },
      ],
    },
  },
  {
    id: "mobile-app",
    title: "Mobile App",
    icon: <Smartphone className="w-4 h-4" />,
    content: {
      title: "Mobile App",
      description:
        "Turn your Ternary web app into a hybrid mobile app using Capacitor. Ternary has experimental support for mobile apps.",
      items: [
        {
          title: "Should you build a mobile app?",
          content:
            "Benefits: Deeper device integration, push notifications, offline access.\n\nDrawbacks: More complex tooling, cost to publish, hardware requirements.\n\nRecommendation: If you're unsure, we recommend starting with a web app using the default React template. You can always upgrade later to a hybrid mobile app.",
        },
        {
          title: "How to upgrade",
          content:
            "Go to the App Details page by clicking your app name in the top-left corner. At the bottom of that page, find the Upgrades section. Look for 'Upgrade to hybrid mobile app with Capacitor' and click Upgrade.",
        },
        {
          title: "Install IDEs",
          content: "For Android apps, install Android Studio. For iOS apps, install Xcode (Xcode runs only on macOS).",
        },
      ],
    },
  },
] as const
