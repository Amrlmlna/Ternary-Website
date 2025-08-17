import { GetServerSideProps } from "next";
import { useState, useEffect } from "react";
import { CheckCircle, ExternalLink } from "lucide-react";
import Navbar from "@/components/Navbar";

interface FigmaSuccessProps {
  token: string | null;
  refreshToken: string | null;
  expiresIn: string | null;
  userId: string | null;
  error?: string;
}

export default function FigmaSuccessPage({
  token,
  refreshToken,
  expiresIn,
  userId,
  error: errorProp,
}: FigmaSuccessProps) {
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState<boolean>(!token);
  const [localError, setLocalError] = useState<string | undefined>(errorProp);

  // Auto-redirect if tokens are present (following Stripe pattern)
  useEffect(() => {
    if (token && refreshToken && expiresIn && userId) {
      // Deep link to desktop app with Figma tokens
      const deepLinkParams = new URLSearchParams({
        token,
        refreshToken,
        expiresIn,
        userId,
      });
      const deepLinkUrl = `ternary://figma-oauth-return?${deepLinkParams.toString()}`;
      
      window.location.href = deepLinkUrl;
      setLoading(false);
      return;
    }

    // if nothing to do
    setLoading(false);
  }, [token, refreshToken, expiresIn, userId]);

  const openTernaryApp = () => {
    if (token && refreshToken && expiresIn && userId) {
      const deepLinkParams = new URLSearchParams({
        token,
        refreshToken,
        expiresIn,
        userId,
      });
      const deepLinkUrl = `ternary://figma-oauth-return?${deepLinkParams.toString()}`;
      window.location.href = deepLinkUrl;
    }
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const hasValidTokens = token && refreshToken && expiresIn && userId;

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
                {hasValidTokens
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
              ) : !hasValidTokens ? (
                <div className="p-4 neu-radius mb-6 neu-bg neu-shadow neu-transition">
                  <p className="text-sm text-red-500">
                    {localError || "Missing Figma tokens. Please ensure you reached this page via the Figma OAuth flow."}
                  </p>
                </div>
              ) : null}

              <div className="space-y-3">
                <button
                  onClick={openTernaryApp}
                  disabled={loading || !hasValidTokens}
                  className={`w-full py-3 px-6 neu-radius font-medium neu-transition flex items-center justify-center gap-2 neu-bg neu-shadow ${
                    loading || !hasValidTokens ? "opacity-50 cursor-not-allowed" : ""
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
  
  const token = query.token as string | undefined;
  const refreshToken = query.refreshToken as string | undefined;
  const expiresIn = query.expiresIn as string | undefined;
  const userId = query.userId as string | undefined;

  if (token && refreshToken && expiresIn && userId) {
    return { 
      props: { 
        token, 
        refreshToken, 
        expiresIn, 
        userId 
      } 
    };
  }

  return {
    props: {
      token: null,
      refreshToken: null,
      expiresIn: null,
      userId: null,
      error: "Figma tokens not available. Please try connecting to Figma again.",
    },
  };
};
