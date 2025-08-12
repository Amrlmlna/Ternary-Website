"use client"

import { Check } from "lucide-react"
import { useState } from "react"

interface PricingSectionProps {
  darkMode: boolean
}

export default function PricingSection({ darkMode }: PricingSectionProps) {
  const [loading, setLoading] = useState<string | null>(null)

  const plans = [
    {
      name: "Hobby",
      price: "$0",
      period: "forever",
      description: "Perfect for getting started with AI website building",
      features: ["100 requests/month", "Unique API Key", "Basic dashboard", "Priority support", "Export to HTML/CSS"],
      popular: false,
      planId: "hobby",
    },
    {
      name: "Pro",
      price: "$20",
      period: "per month",
      description: "For professionals and growing businesses",
      features: [
        "100,000 requests/month",
        "Unique API Key",
        "Full dashboard",
        "Priority support",
        "Export to React/Next.js",
        "Advanced AI features",
        "Team collaboration",
      ],
      popular: true,
      planId: "pro",
    },
    {
      name: "Ultra",
      price: "$75",
      period: "per month",
      description: "For large teams and organizations",
      features: [
        "1,000,000 requests/month",
        "Unique API Key",
        "All Pro features",
        "Dedicated support",
        "Advanced analytics",
        "Custom integrations",
        "Custom AI training",
      ],
      popular: false,
      planId: "ultra",
    },
  ]

  const handleCheckout = async (planId: string) => {
    setLoading(planId)
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: planId }),
      })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        alert(data.error || "Failed to create payment session")
      }
    } catch (err) {
      alert("Error during payment process")
    }
    setLoading(null)
  }

  return (
    <div className="container mx-auto px-6 py-20">
      <div className="text-center mb-16">
        <h2 className={`text-4xl font-bold mb-4 ${darkMode ? "text-white" : "text-black"}`}>
          Simple, Transparent Pricing
        </h2>
        <p className={`text-lg opacity-60 max-w-2xl mx-auto ${darkMode ? "text-white" : "text-black"}`}>
          Choose the perfect plan for your needs. Start free and upgrade as you grow.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`relative p-8 rounded-2xl transition-all duration-300 hover:scale-105 ${
              plan.popular
                ? `ring-2 ring-white ${
                    darkMode
                      ? "bg-[#212121] shadow-[6px_6px_12px_#000,-6px_-6px_12px_#2f2f2f]"
                      : "bg-[#e8e8e8] shadow-[6px_6px_12px_#c5c5c5,-6px_-6px_12px_#ffffff]"
                  }`
                : darkMode
                  ? "bg-[#212121] shadow-[6px_6px_12px_#000,-6px_-6px_12px_#2f2f2f]"
                  : "bg-[#e8e8e8] shadow-[6px_6px_12px_#c5c5c5,-6px_-6px_12px_#ffffff]"
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-white text-black px-4 py-1 rounded-full text-sm font-semibold">Most Popular</span>
              </div>
            )}

            <div className="text-center mb-8">
              <h3 className={`text-2xl font-bold mb-2 ${darkMode ? "text-white" : "text-black"}`}>{plan.name}</h3>
              <div className="mb-2">
                <span className={`text-4xl font-bold ${darkMode ? "text-white" : "text-black"}`}>{plan.price}</span>
                <span className={`text-sm opacity-60 ml-1 ${darkMode ? "text-white" : "text-black"}`}>
                  /{plan.period}
                </span>
              </div>
              <p className={`text-sm opacity-70 ${darkMode ? "text-white" : "text-black"}`}>{plan.description}</p>
            </div>

            <ul className="space-y-4 mb-8">
              {plan.features.map((feature, featureIndex) => (
                <li key={featureIndex} className="flex items-center gap-3">
                  <div
                    className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${
                      darkMode ? "bg-white/20" : "bg-black/10"
                    }`}
                  >
                    <Check className={`w-3 h-3 ${darkMode ? "text-white" : "text-black"}`} />
                  </div>
                  <span className={`text-sm opacity-80 ${darkMode ? "text-white" : "text-black"}`}>{feature}</span>
                </li>
              ))}
            </ul>

            <button
              className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300 disabled:opacity-60 ${
                plan.popular
                  ? "bg-white text-black hover:shadow-lg"
                  : darkMode
                    ? "bg-[#212121] text-white shadow-[6px_6px_12px_#000,-6px_-6px_12px_#2f2f2f] hover:shadow-[inset_4px_4px_12px_#000,inset_-4px_-4px_12px_#1f1f1f]"
                    : "bg-[#e8e8e8] text-gray-900 shadow-[6px_6px_12px_#c5c5c5,-6px_-6px_12px_#ffffff] hover:shadow-[inset_4px_4px_12px_#c5c5c5,inset_-4px_-4px_12px_#ffffff]"
              }`}
              disabled={!!loading}
              onClick={() => handleCheckout(plan.planId)}
            >
              {loading === plan.planId ? "Processing..." : plan.name === "Hobby" ? "Get Started" : "Buy Now"}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
