"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle, Copy, ExternalLink } from "lucide-react";
import Navbar from "@/components/Navbar";

export default function SuccessPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    // Simulate API key generation
    const generateApiKey = () => {
      const key = `ternary_${Math.random()
        .toString(36)
        .substring(2, 15)}_${Math.random().toString(36).substring(2, 15)}`;
      setApiKey(key);
      setLoading(false);
    };

    setTimeout(generateApiKey, 1500);
  }, []);

  const copyApiKey = () => {
    navigator.clipboard.writeText(apiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const openTernaryApp = () => {
    window.location.href = `ternary://auth?apiKey=${apiKey}`;
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
            <p
              className={`mb-8 ${darkMode ? "text-gray-300" : "text-gray-600"}`}
            >
              Welcome to Ternary Pro! Your API key has been generated.
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
            ) : (
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
            )}

            <div className="space-y-3">
              <button
                onClick={openTernaryApp}
                disabled={loading}
                className={`w-full py-3 px-6 rounded-2xl font-medium transition-all flex items-center justify-center gap-2 ${
                  loading
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
