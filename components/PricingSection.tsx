import { createContext, useState, useContext, useEffect } from "react";
import { useAuth } from "../src/contexts/AuthContext";
import { CheckoutIntentContext } from "./_CheckoutIntentContext";

export const AuthModalContext = createContext<{
  openAuthModal: (tab?: "oauth" | "email", forceGoogleOneTap?: boolean) => void;
}>({ openAuthModal: () => {} });

const checkStyle = {
  color: "var(--neu-text)",
  fontWeight: 700,
  fontSize: "1.1em",
};
const xStyle = { color: "#e74c3c", fontWeight: 700, fontSize: "1.1em" };
const featureStyle = { color: "var(--neu-text)" };

const PricingSection = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState<string | null>(null);
  const { openAuthModal } = useContext(AuthModalContext);
  const {
    pendingPlan,
    setPendingPlan,
    clearPendingPlan,
    triggerCheckout,
    setTriggerCheckout,
  } = useContext(CheckoutIntentContext);

  useEffect(() => {
    setTriggerCheckout(handleCheckout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    if (user && pendingPlan) {
      triggerCheckout(pendingPlan);
      clearPendingPlan();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, pendingPlan]);

  async function handleCheckout(plan: string) {
    if (!user) {
      setPendingPlan(plan);
      openAuthModal("oauth", true);
      return;
    }
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
  }

  return (
    <section className="w-full flex justify-center mb-14 px-2 md:px-6">
      <div className="max-w-screen-xl w-full neu-shadow neu-radius neu-bg p-8 text-center">
        <h2 className="text-2xl font-bold mb-8 font-sans">Choose Your Plan</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
          {/* Hobby Plan */}
          <div className="neu-bg neu-radius p-6 neu-shadow-inset flex flex-col items-center border border-[var(--neu-border)]">
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
              className="neu-btn font-semibold px-5 py-2 disabled:opacity-60 font-sans"
              disabled={!!loading}
              onClick={() => handleCheckout("hobby")}
            >
              {loading === "hobby" ? "Processing..." : "Get Started"}
            </button>
          </div>
          {/* Pro Plan */}
          <div className="neu-bg neu-radius p-6 neu-shadow-inset flex flex-col items-center border border-[var(--neu-border)]">
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
              className="neu-btn font-semibold px-5 py-2 disabled:opacity-60 font-sans"
              disabled={!!loading}
              onClick={() => handleCheckout("pro")}
            >
              {loading === "pro" ? "Processing..." : "Buy Now"}
            </button>
          </div>
          {/* Ultra Plan */}
          <div className="neu-bg neu-radius p-6 neu-shadow-inset flex flex-col items-center border border-[var(--neu-border)]">
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
              className="neu-btn font-semibold px-5 py-2 disabled:opacity-60 font-sans"
              disabled={!!loading}
              onClick={() => handleCheckout("ultra")}
            >
              {loading === "ultra" ? "Processing..." : "Buy Now"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
