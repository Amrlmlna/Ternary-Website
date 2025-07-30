import React, { useEffect, useState } from "react";
import { useAuth } from "../src/contexts/AuthContext";
import { ArrowRight, Sparkles, Zap, Shield } from "lucide-react";

const releases = [
  {
    name: "Ternary for Windows (.exe)",
    url: "https://github.com/ternary-ai/ternary-desktop/releases/latest/download/Ternary-Setup.exe",
    icon: "/assets/icon/logo.ico",
  },
  {
    name: "Ternary for Mac (.dmg)",
    url: "https://github.com/ternary-ai/ternary-desktop/releases/latest/download/Ternary.dmg",
    icon: "/assets/icon/logo.icns",
  },
  // Tambahkan format lain jika perlu
];

function detectOS() {
  if (typeof window === "undefined") return "other";
  const platform = window.navigator.platform.toLowerCase();
  if (platform.includes("win")) return "windows";
  if (platform.includes("mac")) return "mac";
  return "other";
}

const HomeSection = () => {
  const [os, setOS] = useState("other");
  const [showAll, setShowAll] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    setOS(detectOS());
  }, []);

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center px-4 py-20 mt-10"
    >
      <div className="max-w-6xl mx-auto text-center">
        {/* Hero Content */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 neu-bg neu-shadow neu-radius px-4 py-2 mb-6">
            <Sparkles size={16} className="text-accent" />
            <span className="text-sm font-medium text-[var(--neu-text)]">
              AI-Powered Code Generation
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-[var(--neu-text)] mb-6 leading-tight">
            Ternary{" "}
            <span className="bg-gradient-to-r from-accent to-purple-600 bg-clip-text text-transparent">
              Premium
            </span>
          </h1>

          <p className="text-lg md:text-xl text-[var(--neu-text)] opacity-80 mb-8 max-w-3xl mx-auto leading-relaxed">
            Platform AI terdepan untuk pengembangan aplikasi yang lebih cepat,
            lebih cerdas, dan lebih efisien. Dapatkan akses ke model AI terbaru
            dengan fitur-fitur eksklusif.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            {user ? (
              <a
                href="#pricing"
                className="neu-btn flex items-center gap-2 px-8 py-4 text-lg font-semibold"
              >
                Upgrade ke Premium
                <ArrowRight size={20} />
              </a>
            ) : null}

            <div className="flex flex-col md:flex-row gap-3 mt-6 justify-center">
              {os === "windows" && (
                <a
                  href={releases[0].url}
                  className="neu-btn flex items-center gap-2 px-4 py-2 font-semibold"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={releases[0].icon}
                    alt="Windows"
                    className="w-5 h-5"
                  />
                  Download for Windows
                </a>
              )}
              {os === "mac" && (
                <a
                  href={releases[1].url}
                  className="neu-btn flex items-center gap-2 px-4 py-2 font-semibold"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={releases[1].icon} alt="Mac" className="w-5 h-5" />
                  Download for Mac
                </a>
              )}
              <button
                className="neu-btn flex items-center gap-2 px-4 py-2 font-semibold"
                onClick={() => setShowAll(true)}
              >
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                  <path
                    stroke="currentColor"
                    strokeWidth="2"
                    d="M12 3v14m0 0l-4-4m4 4l4-4M4 21h16"
                  />
                </svg>
                All Downloads
              </button>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="neu-box text-center">
            <div className="w-12 h-12 neu-shadow-inset neu-radius flex items-center justify-center mx-auto mb-4">
              <Zap size={24} className="text-accent" />
            </div>
            <h3 className="text-lg font-semibold text-[var(--neu-text)] mb-2">
              Lightning Fast
            </h3>
            <p className="text-sm text-[var(--neu-text)] opacity-70">
              Generate kode dengan kecepatan yang luar biasa menggunakan AI
              terdepan
            </p>
          </div>

          <div className="neu-box text-center">
            <div className="w-12 h-12 neu-shadow-inset neu-radius flex items-center justify-center mx-auto mb-4">
              <Sparkles size={24} className="text-accent" />
            </div>
            <h3 className="text-lg font-semibold text-[var(--neu-text)] mb-2">
              Smart Context
            </h3>
            <p className="text-sm text-[var(--neu-text)] opacity-70">
              AI memahami konteks proyek Anda untuk hasil yang lebih akurat
            </p>
          </div>

          <div className="neu-box text-center">
            <div className="w-12 h-12 neu-shadow-inset neu-radius flex items-center justify-center mx-auto mb-4">
              <Shield size={24} className="text-accent" />
            </div>
            <h3 className="text-lg font-semibold text-[var(--neu-text)] mb-2">
              Enterprise Ready
            </h3>
            <p className="text-sm text-[var(--neu-text)] opacity-70">
              Keamanan tingkat enterprise dengan dukungan tim yang responsif
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-accent mb-1">
              10K+
            </div>
            <div className="text-sm text-[var(--neu-text)] opacity-70">
              Developer Aktif
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-accent mb-1">
              1M+
            </div>
            <div className="text-sm text-[var(--neu-text)] opacity-70">
              Baris Kode Generated
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-accent mb-1">
              99.9%
            </div>
            <div className="text-sm text-[var(--neu-text)] opacity-70">
              Uptime
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-accent mb-1">
              24/7
            </div>
            <div className="text-sm text-[var(--neu-text)] opacity-70">
              Support
            </div>
          </div>
        </div>
      </div>
      {showAll && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="neu-bg neu-radius p-6 min-w-[320px] max-w-[90vw] relative">
            <button
              className="absolute top-2 right-2 text-xl opacity-60 hover:opacity-100"
              onClick={() => setShowAll(false)}
              aria-label="Close"
            >
              ×
            </button>
            <h3 className="text-lg font-bold mb-4">All Downloads</h3>
            <ul className="space-y-3">
              {releases.map((rel) => (
                <li key={rel.name}>
                  <a
                    href={rel.url}
                    className="flex items-center gap-2 neu-btn px-3 py-2"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src={rel.icon} alt="icon" className="w-5 h-5" />
                    {rel.name}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="https://github.com/ternary-ai/ternary-desktop/releases/latest"
                  className="flex items-center gap-2 neu-btn px-3 py-2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
                    <path
                      stroke="currentColor"
                      strokeWidth="2"
                      d="M12 3v14m0 0l-4-4m4 4l4-4M4 21h16"
                    />
                  </svg>
                  Lihat semua riwayat release di GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </section>
  );
};

export default HomeSection;
