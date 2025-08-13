import { Crown, Settings, CreditCard } from "lucide-react"

export const proSections = [
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
] as const
