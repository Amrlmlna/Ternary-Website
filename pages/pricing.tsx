import type { NextPage } from "next";
import { useState } from "react";

const Pricing: NextPage = () => {
  const [loading, setLoading] = useState<string | null>(null);
  const handleCheckout = async (plan: string) => {
    setLoading(plan);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan }),
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
    <main className="min-h-screen flex flex-col items-center justify-center neu-bg">
      <div className="neu-shadow neu-radius p-8 max-w-4xl w-full text-center mt-10">
        <h1 className="text-3xl font-bold mb-6 accent font-sans">
          Choose Your Plan
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          {/* Hobby Plan */}
          <div className="neu-shadow neu-radius p-6 neu-bg flex flex-col items-center border border-[var(--neu-border)]">
            <h3
              className="text-xl font-semibold mb-2 font-sans"
              style={{ color: "var(--neu-text)" }}
            >
              Hobby
            </h3>
            <div
              className="text-3xl font-bold mb-2 font-sans"
              style={{ color: "var(--neu-text)" }}
            >
              $0
            </div>
            <ul
              className="text-left text-sm mb-4 opacity-80 font-sans"
              style={{ color: "var(--neu-text)" }}
            >
              <li> 100 requests/month</li>
              <li> Unique API Key</li>
              <li> Basic dashboard</li>
              <li> Priority support</li>
            </ul>
            <button
              className="bg-accent neu-radius px-5 py-2 font-semibold shadow-lg transition hover:scale-105 disabled:opacity-60 font-sans"
              disabled={!!loading}
              onClick={() => handleCheckout("hobby")}
            >
              {loading === "hobby" ? "Processing..." : "Get Started"}
            </button>
          </div>
          {/* Pro Plan */}
          <div className="neu-shadow neu-radius p-6 neu-bg flex flex-col items-center border border-[var(--neu-border)]">
            <h3
              className="text-xl font-semibold mb-2 font-sans"
              style={{ color: "var(--neu-text)" }}
            >
              Pro
            </h3>
            <div
              className="text-3xl font-bold mb-2 font-sans"
              style={{ color: "var(--neu-text)" }}
            >
              $20
            </div>
            <ul
              className="text-left text-sm mb-4 opacity-80 font-sans"
              style={{ color: "var(--neu-text)" }}
            >
              <li> 100,000 requests/month</li>
              <li> Unique API Key</li>
              <li> Full dashboard</li>
              <li> Priority support</li>
            </ul>
            <button
              className="bg-accent neu-radius px-5 py-2 font-semibold shadow-lg transition hover:scale-105 disabled:opacity-60 font-sans"
              disabled={!!loading}
              onClick={() => handleCheckout("pro")}
            >
              {loading === "pro" ? "Processing..." : "Buy Now"}
            </button>
          </div>
          {/* Ultra Plan */}
          <div className="neu-shadow neu-radius p-6 neu-bg flex flex-col items-center border border-[var(--neu-border)]">
            <h3
              className="text-xl font-semibold mb-2 font-sans"
              style={{ color: "var(--neu-text)" }}
            >
              Ultra
            </h3>
            <div
              className="text-3xl font-bold mb-2 font-sans"
              style={{ color: "var(--neu-text)" }}
            >
              $75
            </div>
            <ul
              className="text-left text-sm mb-4 opacity-80 font-sans"
              style={{ color: "var(--neu-text)" }}
            >
              <li> 1,000,000 requests/month</li>
              <li> Unique API Key</li>
              <li> All Pro features</li>
              <li> Dedicated support</li>
            </ul>
            <button
              className="bg-accent neu-radius px-5 py-2 font-semibold shadow-lg transition hover:scale-105 disabled:opacity-60 font-sans"
              disabled={!!loading}
              onClick={() => handleCheckout("ultra")}
            >
              {loading === "ultra" ? "Processing..." : "Buy Now"}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Pricing;
