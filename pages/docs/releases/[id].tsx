"use client";

import { useParams, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import {
  ArrowLeft,
  Calendar,
  Tag,
  CheckCircle,
  Zap,
  Settings,
  Bug,
} from "lucide-react";
import Link from "next/link";

// Mock function - replace with actual implementation
function getReleaseById(id: string) {
  // This should be replaced with actual data fetching
  return {
    title: "1.2.0-beta",
    date: "2024-01-15",
    content: {
      title: "Major Template System & Workflow Updates",
      description:
        "Introducing comprehensive template features, enhanced workflows, and performance optimizations to streamline your development experience.",
      items: [
        {
          title: "Template Features",
          type: "feature",
          content:
            "Introducing the main upgrade with template features including two types: Official templates containing basic starter projects for Vite and Next.js, and Community templates supporting seamless sharing through publish-to-community functionality with easy modification capabilities.",
        },
        {
          title: "Enhanced Workflow",
          type: "improvement",
          content:
            "New workflow feature designed to make the UI more user-friendly with streamlined interactions and improved navigation patterns.",
        },
        {
          title: "Auto Fix Problem",
          type: "feature",
          content:
            "Intelligent auto-fix functionality for credit saving, automatically resolving common issues to optimize your development workflow.",
        },
        {
          title: "Performance Optimization",
          type: "improvement",
          content:
            "Significant performance improvements by utilizing native Git integration for faster operations and reduced resource usage.",
        },
        {
          title: "Error Handling Improvements",
          type: "fix",
          content:
            "Short-term mitigation to resolve error invoking issues when users reset the application, including instructions to restart the app and improved error parsing to keep chat messages clean.",
        },
        {
          title: "Design Panel Prototype",
          type: "feature",
          content:
            "Early prototype of the design panel featuring seamless drag and drop interactions for designing generated applications with visual feedback.",
        },
      ],
    },
  };
}

const getItemIcon = (type: string) => {
  switch (type) {
    case "feature":
      return <Zap className="w-5 h-5" />;
    case "improvement":
      return <Settings className="w-5 h-5" />;
    case "fix":
      return <Bug className="w-5 h-5" />;
    default:
      return <CheckCircle className="w-5 h-5" />;
  }
};

const getItemColor = (type: string, darkMode: boolean) => {
  const colors = {
    feature: darkMode ? "text-blue-400" : "text-blue-600",
    improvement: darkMode ? "text-green-400" : "text-green-600",
    fix: darkMode ? "text-orange-400" : "text-orange-600",
    default: darkMode ? "text-gray-400" : "text-gray-600",
  };
  return colors[type as keyof typeof colors] || colors.default;
};

export default function ReleasePage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const [darkMode, setDarkMode] = useState(false);

  const id = params?.id as string;
  const hideHeader = searchParams?.get("hideHeader") === "true";
  const theme = searchParams?.get("theme");

  useEffect(() => {
    setDarkMode(
      theme === "dark" ||
        (!theme && window.matchMedia("(prefers-color-scheme: dark)").matches)
    );
  }, [theme]);

  const release = getReleaseById(id);

  if (!release) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center p-8 ${
          darkMode ? "bg-[#0f0f0f] text-white" : "bg-[#f8f9fa] text-black"
        }`}
      >
        <div
          className={`text-center p-8 rounded-2xl ${
            darkMode
              ? "bg-[#0f0f0f] shadow-[inset_8px_8px_16px_#0a0a0a,inset_-8px_-8px_16px_#141414]"
              : "bg-[#f8f9fa] shadow-[inset_8px_8px_16px_#e1e5e9,inset_-8px_-8px_16px_#ffffff]"
          }`}
        >
          <h1 className="text-2xl font-semibold mb-2">Release not found</h1>
          <p className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>
            No release notes found for id: {id}
          </p>
          <Link
            href="/"
            className={`inline-flex items-center gap-2 mt-4 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
              darkMode
                ? "bg-[#0f0f0f] text-white shadow-[8px_8px_16px_#0a0a0a,-8px_-8px_16px_#141414] hover:shadow-[4px_4px_8px_#0a0a0a,-4px_-4px_8px_#141414]"
                : "bg-[#f8f9fa] text-black shadow-[8px_8px_16px_#e1e5e9,-8px_-8px_16px_#ffffff] hover:shadow-[4px_4px_8px_#e1e5e9,-4px_-4px_8px_#ffffff]"
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode ? "bg-[#0f0f0f] text-white" : "bg-[#f8f9fa] text-black"
      }`}
    >
      {!hideHeader && (
        <header
          className={`w-full border-b ${
            darkMode ? "border-gray-800" : "border-gray-200"
          }`}
        >
          <div className="max-w-4xl mx-auto p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Link
                  href="/"
                  className={`p-2 rounded-xl transition-all duration-200 ${
                    darkMode
                      ? "bg-[#0f0f0f] shadow-[4px_4px_8px_#0a0a0a,-4px_-4px_8px_#141414] hover:shadow-[2px_2px_4px_#0a0a0a,-2px_-2px_4px_#141414]"
                      : "bg-[#f8f9fa] shadow-[4px_4px_8px_#e1e5e9,-4px_-4px_8px_#ffffff] hover:shadow-[2px_2px_4px_#e1e5e9,-2px_-2px_4px_#ffffff]"
                  }`}
                >
                  <ArrowLeft className="w-5 h-5" />
                </Link>
                <div>
                  <h1 className="text-2xl font-bold">Release Notes</h1>
                  <p
                    className={`text-sm ${
                      darkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    What's new in Ternary
                  </p>
                </div>
              </div>
              <div
                className={`flex items-center gap-2 px-4 py-2 rounded-xl ${
                  darkMode
                    ? "bg-[#0f0f0f] shadow-[inset_4px_4px_8px_#0a0a0a,inset_-4px_-4px_8px_#141414]"
                    : "bg-[#f8f9fa] shadow-[inset_4px_4px_8px_#e1e5e9,inset_-4px_-4px_8px_#ffffff]"
                }`}
              >
                <Tag className="w-4 h-4" />
                <span className="font-medium">v{release.title}</span>
              </div>
            </div>
          </div>
        </header>
      )}

      <main className="max-w-4xl mx-auto p-6">
        {/* Release Header */}
        <div
          className={`p-8 rounded-2xl mb-8 ${
            darkMode
              ? "bg-[#0f0f0f] shadow-[8px_8px_16px_#0a0a0a,-8px_-8px_16px_#141414]"
              : "bg-[#f8f9fa] shadow-[8px_8px_16px_#e1e5e9,-8px_-8px_16px_#ffffff]"
          }`}
        >
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-3xl font-bold mb-2">
                {release.content.title}
              </h2>
              <div
                className={`flex items-center gap-2 text-sm ${
                  darkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                <Calendar className="w-4 h-4" />
                <span>{release.date}</span>
              </div>
            </div>
          </div>
          <p
            className={`text-lg leading-relaxed mb-6 ${
              darkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            {release.content.description}
          </p>

          <div
            className={`rounded-2xl overflow-hidden ${
              darkMode
                ? "shadow-[inset_4px_4px_8px_#0a0a0a,inset_-4px_-4px_8px_#141414]"
                : "shadow-[inset_4px_4px_8px_#e1e5e9,inset_-4px_-4px_8px_#ffffff]"
            }`}
          >
            <iframe
              src="https://app.supademo.com/demo/cmeai3enb009exn0ipp3blnf3?utm_source=linknow"
              width="100%"
              height="600"
              frameBorder="0"
              allowFullScreen
              className="w-full"
              title="Ternary 1.2.0-beta Demo"
            />
          </div>
        </div>

        {/* Release Items */}
        <div className="space-y-6">
          {release.content.items.map((item, idx) => (
            <div
              key={idx}
              className={`p-6 rounded-2xl transition-all duration-200 hover:scale-[1.02] ${
                darkMode
                  ? "bg-[#0f0f0f] shadow-[8px_8px_16px_#0a0a0a,-8px_-8px_16px_#141414] hover:shadow-[12px_12px_24px_#0a0a0a,-12px_-12px_24px_#141414]"
                  : "bg-[#f8f9fa] shadow-[8px_8px_16px_#e1e5e9,-8px_-8px_16px_#ffffff] hover:shadow-[12px_12px_24px_#e1e5e9,-12px_-12px_24px_#ffffff]"
              }`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`p-3 rounded-xl ${getItemColor(
                    item.type,
                    darkMode
                  )} ${
                    darkMode
                      ? "bg-[#0f0f0f] shadow-[inset_4px_4px_8px_#0a0a0a,inset_-4px_-4px_8px_#141414]"
                      : "bg-[#f8f9fa] shadow-[inset_4px_4px_8px_#e1e5e9,inset_-4px_-4px_8px_#ffffff]"
                  }`}
                >
                  {getItemIcon(item.type)}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                  <div
                    className={`leading-relaxed ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    {item.content}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div
          className={`mt-12 p-6 rounded-2xl text-center ${
            darkMode
              ? "bg-[#0f0f0f] shadow-[inset_8px_8px_16px_#0a0a0a,inset_-8px_-8px_16px_#141414]"
              : "bg-[#f8f9fa] shadow-[inset_8px_8px_16px_#e1e5e9,inset_-8px_-8px_16px_#ffffff]"
          }`}
        >
          <p className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>
            Have feedback about this release? Let us know in our community.
          </p>
          <Link
            href="/community"
            className={`inline-flex items-center gap-2 mt-4 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
              darkMode
                ? "bg-[#0f0f0f] text-white shadow-[8px_8px_16px_#0a0a0a,-8px_-8px_16px_#141414] hover:shadow-[4px_4px_8px_#0a0a0a,-4px_-4px_8px_#141414]"
                : "bg-[#f8f9fa] text-black shadow-[8px_8px_16px_#e1e5e9,-8px_-8px_16px_#ffffff] hover:shadow-[4px_4px_8px_#e1e5e9,-4px_-4px_8px_#ffffff]"
            }`}
          >
            Join Community
          </Link>
        </div>
      </main>
    </div>
  );
}
