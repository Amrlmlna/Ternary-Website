import { GetServerSideProps } from "next";
import { useState, useEffect } from "react";
import { CheckCircle, Copy, ExternalLink } from "lucide-react";
import Navbar from "@/components/Navbar";
interface SuccessProps {
  apiKey: string | null;
  error?: string;
  sessionId?: string;
  plan?: string;
}

export default function SuccessPage({
  apiKey: apiKeyProp,
  error: errorProp,
  sessionId,
  plan,
}: SuccessProps) {
  const [darkMode, setDarkMode] = useState(false);
  const [apiKey, setApiKey] = useState<string>(apiKeyProp || "");
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState<boolean>(!apiKeyProp);
  const [localError, setLocalError] = useState<string | undefined>(errorProp);

  // Auto-redirect if apiKey is present; else poll by sessionId
  useEffect(() => {
    if (apiKey) {
      // Deep link to desktop app
      window.location.href = `ternary://ternary-pro-return?key=${apiKey}`;
      setLoading(false);
      return;
    }

    if (!apiKey && sessionId && plan) {
      const checkPaymentStatus = async () => {
        try {
          setLoading(true);
          const response = await fetch(`/api/check-payment-status?session_id=${sessionId}`);
          const data = await response.json();
          if (response.ok && data.apiKey) {
            setApiKey(data.apiKey);
            setLocalError(undefined);
            // Redirect after acquiring key
            window.location.href = `ternary://ternary-pro-return?key=${data.apiKey}`;
          } else if (data.error) {
            setLocalError(data.error);
          }
        } catch (err) {
          console.error("Error checking payment status:", err);
        } finally {
          setLoading(false);
        }
      };

      // immediate then interval
      checkPaymentStatus();
      const id = setInterval(checkPaymentStatus, 3000);
      return () => clearInterval(id);
    }

    // if nothing to do
    setLoading(false);
  }, [apiKey, sessionId, plan]);

  const copyApiKey = () => {
    navigator.clipboard.writeText(apiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const openTernaryApp = () => {
    window.location.href = `ternary://ternary-pro-return?key=${apiKey}`;
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div
      className={`min-h-screen transition-all duration-500 ${
        darkMode ? "bg-[#1a1a1a] text-white" : "bg-[#f0f0f0] text-gray-900"
      }`}
    >
      <Navbar
        darkMode={darkMode}
        onDownloadClick={() => {}}
        onThemeToggle={toggleTheme}
      />

      <div className="min-h-screen flex items-center justify-center px-4">
        <div
          className={`max-w-md w-full p-8 rounded-3xl ${
            darkMode
              ? "bg-[#1a1a1a] shadow-[inset_8px_8px_16px_#0f0f0f,inset_-8px_-8px_16px_#252525]"
              : "bg-[#f0f0f0] shadow-[inset_8px_8px_16px_#d1d1d1,inset_-8px_-8px_16px_#ffffff]"
          }`}
        >
          <div className="text-center">
            <div
              className={`w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center ${
                darkMode
                  ? "bg-[#1a1a1a] shadow-[8px_8px_16px_#0f0f0f,-8px_-8px_16px_#252525]"
                  : "bg-[#f0f0f0] shadow-[8px_8px_16px_#d1d1d1,-8px_-8px_16px_#ffffff]"
              }`}
            >
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>

            <h1
              className={`text-2xl font-bold mb-2 ${
                darkMode ? "text-white" : "text-black"
              }`}
            >
              Payment Successful!
            </h1>
            <p className={`mb-8 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
              {apiKey
                ? "Welcome to Ternary Pro! Your API key is ready."
                : localError || "We couldn't find your API key on this page. Please return to the app or contact support if this persists."}
            </p>

            {loading ? (
              <div
                className={`p-4 rounded-2xl mb-6 ${
                  darkMode
                    ? "bg-[#1a1a1a] shadow-[inset_4px_4px_8px_#0f0f0f,inset_-4px_-4px_8px_#252525]"
                    : "bg-[#f0f0f0] shadow-[inset_4px_4px_8px_#d1d1d1,inset_-4px_-4px_8px_#ffffff]"
                }`}
              >
                <div className="animate-pulse">
                  <div
                    className={`h-4 rounded mb-2 ${
                      darkMode ? "bg-gray-700" : "bg-gray-300"
                    }`}
                  ></div>
                  <div
                    className={`h-4 rounded w-3/4 ${
                      darkMode ? "bg-gray-700" : "bg-gray-300"
                    }`}
                  ></div>
                </div>
              </div>
            ) : apiKey ? (
              <div
                className={`p-4 rounded-2xl mb-6 ${
                  darkMode
                    ? "bg-[#1a1a1a] shadow-[inset_4px_4px_8px_#0f0f0f,inset_-4px_-4px_8px_#252525]"
                    : "bg-[#f0f0f0] shadow-[inset_4px_4px_8px_#d1d1d1,inset_-4px_-4px_8px_#ffffff]"
                }`}
              >
                <p
                  className={`text-sm mb-2 ${
                    darkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  Your API Key:
                </p>
                <div className="flex items-center gap-2">
                  <code
                    className={`flex-1 text-sm p-2 rounded-lg font-mono ${
                      darkMode
                        ? "bg-gray-800 text-green-400"
                        : "bg-gray-100 text-green-600"
                    }`}
                  >
                    {apiKey}
                  </code>
                  <button
                    onClick={copyApiKey}
                    className={`p-2 rounded-lg transition-all ${
                      darkMode
                        ? "bg-[#1a1a1a] shadow-[4px_4px_8px_#0f0f0f,-4px_-4px_8px_#252525] hover:shadow-[inset_4px_4px_8px_#0f0f0f,inset_-4px_-4px_8px_#252525]"
                        : "bg-[#f0f0f0] shadow-[4px_4px_8px_#d1d1d1,-4px_-4px_8px_#ffffff] hover:shadow-[inset_4px_4px_8px_#d1d1d1,inset_-4px_-4px_8px_#ffffff]"
                    }`}
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
                {copied && (
                  <p className="text-green-500 text-sm mt-2">
                    Copied to clipboard!
                  </p>
                )}
              </div>
            ) : (
              <div
                className={`p-4 rounded-2xl mb-6 ${
                  darkMode
                    ? "bg-[#1a1a1a] shadow-[inset_4px_4px_8px_#0f0f0f,inset_-4px_-4px_8px_#252525]"
                    : "bg-[#f0f0f0] shadow-[inset_4px_4px_8px_#d1d1d1,inset_-4px_-4px_8px_#ffffff]"
                }`}
              >
                <p className={`text-sm ${darkMode ? "text-red-400" : "text-red-600"}`}>
                  {localError || "Missing API key. Please ensure you reached this page via the payment flow."}
                </p>
                {sessionId && !loading && (
                  <p className="text-sm mt-2 text-gray-500">
                    The page will auto-refresh while we confirm your payment...
                  </p>
                )}
              </div>
            )}

            <div className="space-y-3">
              <button
                onClick={openTernaryApp}
                disabled={loading || !apiKey}
                className={`w-full py-3 px-6 rounded-2xl font-medium transition-all flex items-center justify-center gap-2 ${
                  loading || !apiKey
                    ? "opacity-50 cursor-not-allowed"
                    : darkMode
                    ? "bg-[#1a1a1a] shadow-[8px_8px_16px_#0f0f0f,-8px_-8px_16px_#252525] hover:shadow-[inset_8px_8px_16px_#0f0f0f,inset_-8px_-8px_16px_#252525] text-white"
                    : "bg-[#f0f0f0] shadow-[8px_8px_16px_#d1d1d1,-8px_-8px_16px_#ffffff] hover:shadow-[inset_8px_8px_16px_#d1d1d1,inset_-8px_-8px_16px_#ffffff] text-black"
                }`}
              >
                <ExternalLink className="w-4 h-4" />
                Open Ternary App
              </button>

              <button
                onClick={() => (window.location.href = "/")}
                className={`w-full py-3 px-6 rounded-2xl font-medium transition-all flex items-center justify-center gap-2 ${
                  darkMode
                    ? "bg-[#1a1a1a] shadow-[8px_8px_16px_#0f0f0f,-8px_-8px_16px_#252525] hover:shadow-[inset_8px_8px_16px_#0f0f0f,inset_-8px_-8px_16px_#252525] text-white"
                    : "bg-[#f0f0f0] shadow-[8px_8px_16px_#d1d1d1,-8px_-8px_16px_#ffffff] hover:shadow-[inset_8px_8px_16px_#d1d1d1,inset_-8px_-8px_16px_#ffffff] text-black"
                }`}
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query } = context;
  const apiKeyFromQuery = query.apiKey as string | undefined;

  if (apiKeyFromQuery) {
    return { props: { apiKey: apiKeyFromQuery } };
  }

  const sessionId = query.session_id as string | undefined;
  const plan = query.plan as string | undefined;

  if (sessionId && plan) {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/check-payment-status?session_id=${sessionId}`
      );
      const data = await response.json();

      if (response.ok && data.apiKey) {
        return { props: { apiKey: data.apiKey } };
      }

      return {
        props: {
          apiKey: null,
          error:
            "Waiting for payment confirmation. This page will refresh automatically in a few seconds.",
          sessionId,
          plan,
        },
      };
    } catch (error) {
      console.error("Error checking payment status:", error);
      return {
        props: {
          apiKey: null,
          error:
            "An error occurred while checking payment status. Please refresh this page.",
          sessionId,
          plan,
        },
      };
    }
  }

  return {
    props: {
      apiKey: null,
      error: "API Key not available. Please check the app or contact support.",
    },
  };
};
