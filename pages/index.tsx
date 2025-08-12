"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import PricingSection from "@/components/PricingSection";

export default function TernaryLanding() {
  const [darkMode, setDarkMode] = useState(false);

  const scrollToDownload = () => {
    const heroSection = document.querySelector("#hero-section");
    heroSection?.scrollIntoView({ behavior: "smooth" });
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
        onDownloadClick={scrollToDownload}
        onThemeToggle={toggleTheme}
      />

      <div id="hero-section">
        <HeroSection darkMode={darkMode} />
      </div>

      <PricingSection darkMode={darkMode} />
    </div>
  );
}
