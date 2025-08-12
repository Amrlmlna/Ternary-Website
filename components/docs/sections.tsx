import {
  Code,
  Zap,
  Terminal,
  MessageSquare,
  Rocket,
  HelpCircle,
  Brain,
  Smartphone,
  Download,
  Eye,
  GitBranch,
  Crown,
  Settings,
  CreditCard,
  Github,
  Database,
  Server,
  Shield,
  FileText,
  XCircle,
  RefreshCw,
  AlertTriangle,
} from "lucide-react"

export const docSections = [
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
  {
    id: "pro-overview",
    title: "Pro Overview",
    icon: <Crown className="w-4 h-4" />,
    content: {
      title: "Pro Overview",
      description: "Learn about Ternary Pro and how it can accelerate your app development",
      items: [
        {
          title: "What is Ternary Pro?",
          content:
            "Ternary Pro is a subscription service that gives Ternary users several perks on top of the core free Ternary product:\n\n• AI credits - Every month you'll receive 300 AI credits which give you access to all the leading AI models.\n• Pro modes - Pro modes are designed to maximize your AI credits and let you build faster and more efficiently.\n• Office hours - You'll get direct access to the creator of Ternary during office hours.\n• Learning content - Access exclusive learning content via Ternary Academy to level up your AI coding skills.",
        },
        {
          title: "Subscription Plans",
          content:
            "You can subscribe to Ternary Pro on the Plans & pricing page. Choose from monthly or annual billing options with different credit allowances to match your development needs.",
        },
      ],
    },
  },
  {
    id: "pro-modes",
    title: "Pro Modes",
    icon: <Settings className="w-4 h-4" />,
    content: {
      title: "Pro Modes",
      description: "Exclusive features to maximize your AI usage",
      items: [
        {
          title: "Turbo Edits",
          content:
            "Turbo Edits offloads routine code changes from the state-of-the-art model to a faster, more affordable model specialized in editing code.\n\nBenefits:\n• Up to 50% faster code generation, especially for large files\n• Up to 2× cheaper, saving your AI credits\n\nHow it works: Turbo Edits is powered by a secondary, lightweight model that excels at processing edits quickly. This allows the primary model to handle the heavy lifting while offloading routine tasks to the faster, cheaper model.",
        },
        {
          title: "Smart Context",
          content:
            "Smart Context automatically includes the most relevant files from your codebase in the chat context. This makes responses more efficient and is especially helpful for large projects.\n\nBenefits:\n• Significant cost savings, especially as your project grows\n• Enables Ternary to edit larger codebases\n\nHow it works: Ternary uses a lightweight model to identify the most relevant files from your codebase and feeds them into the larger model. This approach is far more efficient than including the entire codebase in the context.",
        },
        {
          title: "Smart Auto",
          content:
            "Smart Auto automatically chooses the most efficient AI model for your task—helping you balance speed, cost, and quality without manually switching models.\n\nBenefits:\n• Lower AI credit usage by using faster, cheaper models for simple tasks\n• Automatically uses leading models for complex tasks\n• No need to manage models manually\n\nHow it works: Smart Auto uses a classification engine to assess the complexity of each task before running it. For simple tasks, it uses fast, cost-effective models. For complex tasks, it automatically switches to more powerful models.",
        },
      ],
    },
  },
  {
    id: "maximize-credits",
    title: "Maximize AI Credits",
    icon: <CreditCard className="w-4 h-4" />,
    content: {
      title: "Maximize AI Credits",
      description: "Get the most out of your Ternary Pro AI credits",
      items: [
        {
          title: "How AI credits work",
          content:
            "Each time you use AI with your Ternary Pro key, you are using your monthly allotment of AI credits.\n\nAI credits basically boil down to two main things:\nNumber of tokens × Cost per token = AI credits used\n\nYou can think of a token as a unit of text like a word that an AI processes. The key to maximizing your AI credits is to use the most cost-efficient models and minimize the number of tokens you use.",
        },
        {
          title: "Choose the right model",
          content:
            "The best models have significantly different prices. For example, Claude Sonnet 4 is roughly twice as expensive as Gemini Pro 2.5 even though both are frontier models with similar performance.\n\nOpen-weight models like DeepSeek v3, DeepSeek R1, and Kimi K2 deliver excellent value at a fraction of the price of proprietary models.\n\nFor simple changes like UI adjustments, use smaller models like Gemini Flash 2.5 which delivers ~80% of the performance for a quarter of the cost.",
        },
        {
          title: "Use Smart Auto",
          content:
            "If model selection seems overwhelming, Ternary Pro offers Smart Auto which chooses the best, most cost-efficient model for you automatically based on task complexity.",
        },
        {
          title: "Optimize token usage",
          content:
            "Use Pro modes like Smart Context and Turbo Edits (enabled by default) to optimize your token usage.\n\nStart new chats when possible to keep context focused.\n\nUse manual context management for large projects to select only relevant files.",
        },
      ],
    },
  },
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
  {
    id: "privacy-policy",
    title: "Privacy Policy",
    icon: <Shield className="w-4 h-4" />,
    content: {
      title: "Privacy Policy",
      description: "Your data is yours — not ours — and its privacy is extremely important to us.",
      items: [
        {
          title: "TLDR",
          content:
            "Ternary uses opt-in telemetry to help us improve the product. You can turn telemetry on or off anytime from the Settings page by toggling the Telemetry switch.",
        },
        {
          title: "What We Collect",
          content:
            "With your consent, we collect basic telemetry to help us understand how Ternary is used and to identify errors. This includes anonymized data such as feature usage, error reports, model selection, and randomly generated identifiers. This does not include your chat messages, prompts, or code.",
        },
        {
          title: "How Your Data is Handled",
          content:
            "When using the free desktop version of Ternary, your data never passes through Ternary's servers. If you use API keys, your prompts and code are sent directly to the model providers. If you use a local model, everything stays on your device. With Ternary Pro, your prompts and code are proxied through Ternary servers before reaching model providers, but your data is never used to train any model.",
        },
        {
          title: "Your Rights",
          content:
            "You have the right to know what personal information is collected, access your data, request corrections, request erasure, restrict processing, object to processing, data portability, and not be subject to automated decision-making. Many of these rights can be exercised by updating your account information.",
        },
      ],
    },
  },
  {
    id: "terms",
    title: "Terms of Service",
    icon: <FileText className="w-4 h-4" />,
    content: {
      title: "Terms of Service",
      description: "Terms and conditions for using Ternary services.",
      items: [
        {
          title: "Account Responsibilities",
          content:
            "You are responsible for maintaining the security of your account and password. You may not use the Services for any purpose outlined in our Use Restrictions policy. You are responsible for all content posted to and activity that occurs under your account. You must be a human - accounts registered by bots or automated methods are not permitted.",
        },
        {
          title: "Payment Terms",
          content:
            "For paid Services that offer a free trial, you need to pay in advance to keep using the Service after the trial period. If you do not pay, we will freeze your account until you make payment. All fees are exclusive of taxes, which you are responsible for unless we are required to collect them.",
        },
        {
          title: "Cancellation",
          content:
            "You can cancel your account using the simple cancellation link in our Services. If you cancel before the end of your current paid month, your cancellation takes effect immediately and you will not be charged again. We may suspend or terminate accounts for violations of these Terms.",
        },
        {
          title: "Liability",
          content:
            "We provide Services on an 'as is' and 'as available' basis. The Company shall not be liable for any direct, indirect, incidental, lost profits, special, consequential, punitive or exemplary damages resulting from your use of the Services.",
        },
      ],
    },
  },
  {
    id: "cancellation",
    title: "Cancellation",
    icon: <XCircle className="w-4 h-4" />,
    content: {
      title: "Cancellation",
      description:
        "We want satisfied customers, not hostages. That's why we make it easy for you to cancel your account.",
      items: [
        {
          title: "How to Cancel",
          content:
            "You can cancel your Ternary subscription directly in the app - no phone calls required, no questions asked. Go to your account settings and look for the cancellation option. Our legal responsibility is to account owners, so we cannot cancel an account at the request of anyone else.",
        },
        {
          title: "What Happens When You Cancel",
          content:
            "If you cancel your subscription, you can keep using your account until your paid period expires. Then the account will be automatically downgraded to a free account. We won't bill you again once you cancel, and we don't automatically prorate unused time.",
        },
        {
          title: "Ternary-Initiated Cancellations",
          content:
            "We may cancel accounts if they have been inactive for an extended period. We also retain the right to suspend or terminate accounts for any reason at any time, as outlined in our Terms of Service. In practice, this generally means we will cancel your account without notice if we have evidence that you are using our products to engage in abusive behavior.",
        },
      ],
    },
  },
  {
    id: "refund",
    title: "Refund",
    icon: <RefreshCw className="w-4 h-4" />,
    content: {
      title: "Refund",
      description:
        "Bad refund policies are infuriating. We never want our customers to feel that way, so our refund policy is simple.",
      items: [
        {
          title: "Our Promise",
          content:
            "If you're ever unhappy with our products for any reason, just contact our support team and we'll take care of you. We believe in treating our customers fairly and making things right when they go wrong.",
        },
        {
          title: "Full Refunds",
          content:
            "Examples of full refunds we'd grant: If you were just charged for your next month of service but you meant to cancel, we're happy to refund that extra charge. We want you to feel confident in your purchase decisions.",
        },
        {
          title: "Partial Refunds or Credits",
          content:
            "Examples of partial refunds or credits we'd grant: If we had extended downtime (multiple hours in a day, or multiple days in a month), we'd issue a partial credit to your account to compensate for the service interruption.",
        },
        {
          title: "Get in Touch",
          content:
            "At the end of the day, nearly everything comes down to a case-by-case basis. Send us a note, tell us what's up, and we'll work with you to make sure you're happy. We're here to help and want you to have a great experience with Ternary.",
        },
      ],
    },
  },
  {
    id: "abuse",
    title: "Abuse",
    icon: <AlertTriangle className="w-4 h-4" />,
    content: {
      title: "Abuse",
      description: "Restricted purposes and prohibited uses of Ternary services.",
      items: [
        {
          title: "Restricted Purposes",
          content:
            "When you use any of Ternary's Services, you acknowledge that you may not: collect or extract information from accounts which do not belong to you, circumvent security features, trick or defraud users, upload malware or viruses, interfere with or disrupt the Services, harass or threaten others, disparage or harm Ternary, or use the Services inconsistent with applicable laws.",
        },
        {
          title: "Enforcement",
          content:
            "Accounts found to be in violation of any of the above restrictions are subject to cancellation without prior notice. We take these restrictions seriously to maintain a safe and secure environment for all users.",
        },
        {
          title: "Reporting Abuse",
          content:
            "If you encounter any abusive behavior or violations of these policies, please report them to our support team immediately. We investigate all reports and take appropriate action to protect our community.",
        },
      ],
    },
  },
]
