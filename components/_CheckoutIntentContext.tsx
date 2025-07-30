import React, { createContext, useState } from "react";

interface CheckoutIntentContextType {
  pendingPlan: string | null;
  setPendingPlan: (plan: string) => void;
  clearPendingPlan: () => void;
  triggerCheckout: (plan: string) => void;
  setTriggerCheckout: (fn: (plan: string) => void) => void;
}

export const CheckoutIntentContext = createContext<CheckoutIntentContextType>({
  pendingPlan: null,
  setPendingPlan: () => {},
  clearPendingPlan: () => {},
  triggerCheckout: () => {},
  setTriggerCheckout: () => {},
});

export function CheckoutIntentProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [pendingPlan, setPendingPlanState] = useState<string | null>(null);
  const [triggerCheckoutFn, setTriggerCheckoutFn] = useState<
    (plan: string) => void
  >(() => () => {});

  const setPendingPlan = (plan: string) => setPendingPlanState(plan);
  const clearPendingPlan = () => setPendingPlanState(null);
  const triggerCheckout = (plan: string) => {
    if (typeof triggerCheckoutFn === "function") {
      triggerCheckoutFn(plan);
    }
  };
  const setTriggerCheckout = (fn: (plan: string) => void) =>
    setTriggerCheckoutFn(() => fn);

  return (
    <CheckoutIntentContext.Provider
      value={{
        pendingPlan,
        setPendingPlan,
        clearPendingPlan,
        triggerCheckout,
        setTriggerCheckout,
      }}
    >
      {children}
    </CheckoutIntentContext.Provider>
  );
}
