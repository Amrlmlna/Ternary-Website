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
    // Toggle the dark variables/utilities for all descendants
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen neu-bg neu-transition">
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
    </div>
  );
}
