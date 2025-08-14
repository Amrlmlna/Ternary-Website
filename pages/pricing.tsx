"use client";

import { Check } from "lucide-react";
import { useState } from "react";

interface PricingSectionProps {
  darkMode: boolean;
}

export default function PricingSection({ darkMode }: PricingSectionProps) {
  const [loading, setLoading] = useState<string | null>(null);

  const plans = [
    {
      name: "Hobby",
      price: "$0",
      period: "forever",
      description: "Perfect for getting started with AI website building",
      features: [
        "100 requests/month",
        "Unique API Key",
        "Basic dashboard",
        "Priority support",
        "Export to HTML/CSS",
      ],
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
  ];

  const handleCheckout = async (planId: string) => {
    setLoading(planId);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: planId }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert(data.error || "Failed to create payment session");
      }
    } catch (err) {
      alert("Error during payment process");
    }
    setLoading(null);
  };

  return (
    <div className="container mx-auto px-6 py-20">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold mb-4 text-[var(--neu-text)]">
          Simple, Transparent Pricing
        </h2>
        <p className="text-lg opacity-80 max-w-2xl mx-auto text-[var(--neu-text)]">
          Choose the perfect plan for your needs. Start free and upgrade as you
          grow.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`relative p-8 neu-radius neu-bg neu-shadow neu-transition ${
              plan.popular ? "ring-2 ring-[var(--neu-border)]" : ""
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="px-4 py-1 neu-radius text-sm font-semibold neu-bg neu-shadow text-[var(--neu-text)]">
                  Most Popular
                </span>
              </div>
            )}

            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-2 text-[var(--neu-text)]">
                {plan.name}
              </h3>
              <div className="mb-2">
                <span className="text-4xl font-bold text-[var(--neu-text)]">
                  {plan.price}
                </span>
                <span className="text-sm opacity-70 ml-1 text-[var(--neu-text)]">
                  /{plan.period}
                </span>
              </div>
              <p className="text-sm opacity-80 text-[var(--neu-text)]">
                {plan.description}
              </p>
            </div>

            <ul className="space-y-4 mb-8">
              {plan.features.map((feature, featureIndex) => (
                <li key={featureIndex} className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-5 h-5 neu-radius flex items-center justify-center neu-bg neu-shadow-inset">
                    <Check className="w-3 h-3 text-[var(--neu-text)]" />
                  </div>
                  <span className="text-sm opacity-80 text-[var(--neu-text)]">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            <button
              className={`w-full py-3 px-6 neu-radius font-semibold neu-transition disabled:opacity-60 neu-bg neu-shadow ${
                plan.popular ? "ring-2 ring-[var(--neu-border)]" : ""
              }`}
              disabled={!!loading}
              onClick={() => handleCheckout(plan.planId)}
            >
              {loading === plan.planId
                ? "Processing..."
                : plan.name === "Hobby"
                ? "Get Started"
                : "Buy Now"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
