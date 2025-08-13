import { Shield, FileText, XCircle, RefreshCw, AlertTriangle } from "lucide-react"

export const policySections = [
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
] as const
