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
      <div className={darkMode ? "dark" : ""}>
        <div className="min-h-screen flex items-center justify-center p-8 neu-bg text-[var(--neu-text)]">
          <div className="text-center p-8 neu-radius neu-bg neu-shadow-inset">
            <h1 className="text-2xl font-semibold mb-2">Release not found</h1>
            <p className="opacity-70">No release notes found for id: {id}</p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 mt-4 px-6 py-3 neu-radius font-medium neu-bg neu-shadow neu-transition"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen neu-bg neu-transition text-[var(--neu-text)]">
      {!hideHeader && (
        <header
          className={"w-full border-b border-[var(--neu-border)]"}
        >
          <div className="max-w-4xl mx-auto p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Link
                  href="/"
                  className={"p-2 neu-radius neu-bg neu-shadow neu-transition"}
                >
                  <ArrowLeft className="w-5 h-5" />
                </Link>
                <div>
                  <h1 className="text-2xl font-bold">Release Notes</h1>
                  <p className="text-sm opacity-70">
                    What's new in Ternary
                  </p>
                </div>
              </div>
              <div
                className={"flex items-center gap-2 px-4 py-2 neu-radius neu-bg neu-shadow-inset"}
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
          className={"p-8 neu-radius mb-8 neu-bg neu-shadow"}
        >
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-3xl font-bold mb-2">
                {release.content.title}
              </h2>
              <div className="flex items-center gap-2 text-sm opacity-70">
                <Calendar className="w-4 h-4" />
                <span>{release.date}</span>
              </div>
            </div>
          </div>
          <p className="text-lg leading-relaxed mb-6 opacity-80">
            {release.content.description}
          </p>

          <div
            className={"neu-radius overflow-hidden neu-shadow-inset"}
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
              className={"p-6 neu-radius neu-bg neu-shadow neu-transition"}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`p-3 neu-radius ${getItemColor(item.type, darkMode)} neu-bg neu-shadow-inset`}
                >
                  {getItemIcon(item.type)}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                  <div className="leading-relaxed opacity-80">
                    {item.content}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div
          className={"mt-12 p-6 neu-radius text-center neu-bg neu-shadow-inset"}
        >
          <p className={"opacity-70"}>Have feedback about this release? Let us know in our community.</p>
          <Link
            href="/community"
            className={"inline-flex items-center gap-2 mt-4 px-6 py-3 neu-radius font-medium neu-bg neu-shadow neu-transition"}
          >
            Join Community
          </Link>
        </div>
      </main>
      </div>
    </div>
  );
}
