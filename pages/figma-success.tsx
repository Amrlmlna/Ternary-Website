import { GetServerSideProps } from "next";
import { useState, useEffect } from "react";
import { CheckCircle, ExternalLink } from "lucide-react";
import Navbar from "@/components/Navbar";

interface FigmaSuccessProps {
  code: string | null;
  state: string | null;
  error?: string;
}

export default function FigmaSuccessPage({ code, state, error: errorProp }: FigmaSuccessProps) {
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState<boolean>(!code || !state);
  const [localError, setLocalError] = useState<string | undefined>(errorProp);

  // Auto-redirect if tokens are present (following Stripe pattern)
  useEffect(() => {
    if (code && state) {
      const deepLinkParams = new URLSearchParams({ code, state });
      const deepLinkUrl = `ternary://figma-oauth-return?${deepLinkParams.toString()}`;
      window.location.href = deepLinkUrl;
      setLoading(false);
      return;
    }
    setLoading(false);
  }, [code, state]);

  const openTernaryApp = () => {
    if (code && state) {
      const deepLinkParams = new URLSearchParams({ code, state });
      const deepLinkUrl = `ternary://figma-oauth-return?${deepLinkParams.toString()}`;
      window.location.href = deepLinkUrl;
    }
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const hasValidParams = code && state;

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen neu-bg neu-transition">
        <Navbar
          darkMode={darkMode}
          onDownloadClick={() => {}}
          onThemeToggle={toggleTheme}
        />

        <div className="min-h-screen flex items-center justify-center px-4">
          <div className="max-w-md w-full p-8 neu-radius neu-bg neu-shadow neu-transition">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 neu-radius flex items-center justify-center neu-bg neu-shadow">
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>

              <h1 className="text-2xl font-bold mb-2 text-[var(--neu-text)]">
                Figma Connected Successfully!
              </h1>
              <p className="mb-8 opacity-80 text-[var(--neu-text)]">
                {hasValidParams
                  ? "Your Figma account has been connected to Ternary. You can now access your Figma files in the app."
                  : localError || "We couldn't connect your Figma account. Please try again or contact support if this persists."}
              </p>

              {loading ? (
                <div className="p-4 neu-radius mb-6 neu-bg neu-shadow neu-transition">
                  <div className="animate-pulse">
                    <div className="h-4 rounded mb-2 bg-[var(--neu-border)]/60"></div>
                    <div className="h-4 rounded w-3/4 bg-[var(--neu-border)]/60"></div>
                  </div>
                </div>
              ) : !hasValidParams ? (
                <div className="p-4 neu-radius mb-6 neu-bg neu-shadow neu-transition">
                  <p className="text-sm text-red-500">
                    {localError || "Missing Figma parameters. Please ensure you reached this page via the Figma OAuth flow."}
                  </p>
                </div>
              ) : null}

              <div className="space-y-3">
                <button
                  onClick={openTernaryApp}
                  disabled={loading || !hasValidParams}
                  className={`w-full py-3 px-6 neu-radius font-medium neu-transition flex items-center justify-center gap-2 neu-bg neu-shadow ${
                    loading || !hasValidParams ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  <ExternalLink className="w-4 h-4" />
                  Open Ternary App
                </button>

                <button
                  onClick={() => (window.location.href = "/")}
                  className="w-full py-3 px-6 neu-radius font-medium neu-transition flex items-center justify-center gap-2 neu-bg neu-shadow"
                >
                  Back to Home
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query } = context;
  const code = query.code as string | undefined;
  const state = query.state as string | undefined;

  if (code && state) {
    return { props: { code, state } };
  }

  return {
    props: {
      code: null,
      state: null,
      error: "Figma parameters not available. Please try connecting to Figma again.",
    },
  };
};
