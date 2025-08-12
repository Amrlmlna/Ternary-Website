"use client";

import { useState } from "react";
import Navbar from "@/components/navbar";
import DocsSidebar from "@/components/docs/sidebar";
import DocsContent from "@/components/docs/content";

export default function Documentation() {
  const [darkMode, setDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState("overview");

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const scrollToDownload = () => {
    window.location.href = "/";
  };

  return (
    <div
      className={`min-h-screen transition-all duration-500 ${
        darkMode ? "bg-[#0f0f0f] text-white" : "bg-[#f0f0f0] text-gray-900"
      }`}
    >
      <Navbar
        darkMode={darkMode}
        onDownloadClick={scrollToDownload}
        onThemeToggle={toggleTheme}
      />

      <div className="pt-20">
        <DocsSidebar
          darkMode={darkMode}
          activeSection={activeSection}
          onSectionChange={setActiveSection}
        />
        <DocsContent darkMode={darkMode} activeSection={activeSection} />
      </div>
    </div>
  );
}
