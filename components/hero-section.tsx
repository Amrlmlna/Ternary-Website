"use client";

import { useState, useEffect, useRef } from "react";
import { Download, Monitor, ArrowRight } from "lucide-react";
import BackgroundPaths from "./ui/background-paths";

interface DownloadAsset {
  name: string;
  url: string;
  size?: number;
  contentType?: string;
}

interface DownloadsResponse {
  version: string;
  tag: string;
  publishedAt: string | null;
  htmlUrl: string;
  assets: DownloadAsset[];
  platforms: {
    windowsExe?: DownloadAsset;
    windowsNupkg?: DownloadAsset;
    macArm64?: DownloadAsset;
    macX64?: DownloadAsset;
    debAmd64?: DownloadAsset;
    rpmX86_64?: DownloadAsset;
    releasesFile?: DownloadAsset;
  };
}

interface HeroSectionProps {
  darkMode: boolean;
}

export default function HeroSection({ darkMode }: HeroSectionProps) {
  const [userOS, setUserOS] = useState<string>("");
  const [release, setRelease] = useState<DownloadsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const downloadSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Detect user's operating system
    const detectOS = () => {
      const userAgent = window.navigator.userAgent;
      if (userAgent.includes("Windows")) return "Windows";
      if (userAgent.includes("Mac")) return "macOS";
      if (userAgent.includes("Linux")) return "Linux";
      return "Unknown";
    };

    setUserOS(detectOS());

    const fetchRelease = async () => {
      try {
        const response = await fetch("/api/downloads");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setRelease(data);
      } catch (error) {
        console.error("Failed to fetch release:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRelease();
  }, []);

  const getAllDownloadOptions = () => {
    if (!release || !release.platforms) return [];

    const options = [];
    const { platforms } = release;

    // Windows options
    if (platforms.windowsExe) {
      options.push({
        os: "Windows",
        asset: platforms.windowsExe,
        isDetected: userOS === "Windows",
      });
    }

    // macOS options
    if (platforms.macArm64) {
      options.push({
        os: "macOS (Apple Silicon)",
        asset: platforms.macArm64,
        isDetected: userOS === "macOS",
      });
    }
    if (platforms.macX64) {
      options.push({
        os: "macOS (Intel)",
        asset: platforms.macX64,
        isDetected: userOS === "macOS",
      });
    }

    // Linux options
    if (platforms.debAmd64) {
      options.push({
        os: "Linux (DEB)",
        asset: platforms.debAmd64,
        isDetected: userOS === "Linux",
      });
    }
    if (platforms.rpmX86_64) {
      options.push({
        os: "Linux (RPM)",
        asset: platforms.rpmX86_64,
        isDetected: userOS === "Linux",
      });
    }

    return options;
  };

  const formatFileSize = (bytes?: number) => {
    if (!bytes) return "Unknown size";
    const mb = bytes / (1024 * 1024);
    return `${mb.toFixed(1)} MB`;
  };

  const downloadOptions = getAllDownloadOptions();

  return (
    <div className="relative overflow-hidden min-h-screen flex py-20 items-start justify-center px-0 border-0 flex-row text-left leading-7">
      {/* Left content container */}
      <div className="flex-1 max-w-4xl ml-8 text-left my-0 z-10 mb-0 py-[75px] px-[77px]">
        <h1
          className={`text-6xl font-bold mb-6 text-left md:text-9xl ${
            darkMode ? "text-white" : "text-black"
          }`}
        >
          Ternary
        </h1>

        <p
          className={`text-xl md:text-2xl opacity-80 leading-relaxed text-left mb-[52px] mr-[21px] ${
            darkMode ? "text-white" : "text-gray-900"
          }`}
        >
          Code Smarter. Build Faster. Ship Better.
        </p>

        <div
          ref={downloadSectionRef}
          className={`inline-block p-4 rounded-xl border-0 px-[50px] py-[16px] ${
            darkMode
              ? "bg-[#212121] shadow-[6px_6px_12px_#000,-6px_-6px_12px_#2f2f2f]"
              : "bg-[#e8e8e8] shadow-[6px_6px_12px_#c5c5c5,-6px_-6px_12px_#ffffff]"
          }`}
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <Monitor className="w-4 h-4 opacity-60" />
            <span
              className={`text-sm opacity-60 ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Detected:{" "}
              <span
                className={`font-semibold ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                {userOS}
              </span>
            </span>
          </div>

          {loading ? (
            <div className="animate-pulse">
              <div
                className={`h-10 w-56 rounded-xl mx-auto ${
                  darkMode ? "bg-[#2a2a2a]" : "bg-[#d0d0d0]"
                }`}
              ></div>
            </div>
          ) : downloadOptions.length > 0 ? (
            <div className="space-y-2">
              {downloadOptions.map((option, index) => (
                <a
                  key={index}
                  href={option.asset.url}
                  className={`flex items-center gap-3 px-5 py-2 rounded-lg font-semibold text-sm transition-all duration-300 ${
                    option.isDetected
                      ? "bg-white text-black" // Highlighted style for detected OS
                      : darkMode
                      ? "bg-[#2a2a2a] text-white hover:bg-[#333]"
                      : "bg-[#d0d0d0] text-gray-900 hover:bg-[#c0c0c0]"
                  } ${
                    darkMode
                      ? "shadow-[4px_4px_8px_#000,-4px_-4px_8px_#2f2f2f] hover:shadow-[inset_2px_2px_8px_rgba(0,0,0,0.3)]"
                      : "shadow-[4px_4px_8px_#c5c5c5,-4px_-4px_8px_#ffffff] hover:shadow-[inset_2px_2px_8px_rgba(0,0,0,0.1)]"
                  }`}
                >
                  <Download className="w-4 h-4" />
                  <span className="flex-1 text-left">{option.os}</span>
                  <span className="text-xs opacity-60">
                    {formatFileSize(option.asset.size)}
                  </span>
                  {option.isDetected && <ArrowRight className="w-4 h-4" />}
                </a>
              ))}
              <p
                className={`text-xs opacity-60 text-center mt-2 ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                v{release?.version} • Free & Open Source
              </p>
            </div>
          ) : (
            <p className="text-red-500">Unable to load downloads</p>
          )}
        </div>
      </div>

      {/* Right side container with background animation */}
      <div className="flex-1 relative h-full min-h-screen">
        <BackgroundPaths darkMode={darkMode} />
      </div>
    </div>
  );
}
