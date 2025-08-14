"use client";

import { useParams, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
 
import { getReleaseById } from "../../../components/docs/releases";

// Page shell only. All content and styling come from release content modules.

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
            <p className="mt-4 opacity-70">Check the version id or visit the releases index.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen neu-bg neu-transition text-[var(--neu-text)]">
        <main className="max-w-4xl mx-auto p-6 space-y-6">
          {/* Render only release-provided content */}
          {release.content.title ? (
            <h1 className="sr-only">{release.content.title}</h1>
          ) : null}
          {release.content.description ? (
            <p className="sr-only">{release.content.description}</p>
          ) : null}
          {release.content.items.map((item, idx) => (
            <div key={idx}>{item.content}</div>
          ))}
        </main>
      </div>
    </div>
  );
}
