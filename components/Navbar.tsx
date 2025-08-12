"use client";

import { useState } from "react";
import { Menu, X, Github, LogIn, User, Sun, Moon } from "lucide-react";
import Image from "next/image";
import AuthModal from "./AuthModal";
import { useAuth } from "../src/contexts/AuthContext";
import { useRouter } from "next/router";

interface NavbarProps {
  darkMode: boolean;
  onDownloadClick: () => void;
  onThemeToggle: () => void;
}

export default function Navbar({
  darkMode,
  onDownloadClick,
  onThemeToggle,
}: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { user, signOut, loading } = useAuth();
  const isAuthenticated = !!user;
  const router = useRouter();

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Pricing", href: "#pricing" },
    { name: "Documentation", href: "/docs" },
    { name: "Community", href: "/community" },
    { name: "Support", href: "/support" },
  ];

  const handleLogin = () => {
    setIsAuthModalOpen(true);
  };

  const handleLogout = () => {
    // Use Supabase auth signOut
    signOut()
      .then(() => {
        // ensure UI updates and route resets
        router.push("/");
      })
      .catch((e) => console.error("Sign out error:", e));
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-40 backdrop-blur-md transition-all duration-300 ${
          darkMode ? "bg-[#1a1a1a]/80" : "bg-[#f0f0f0]/80"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-14 sm:h-16">
            {/* Logo */}
            <div className="flex items-center gap-2 sm:gap-3">
              <div
                className={`flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl ${
                  darkMode
                    ? "bg-[#212121] shadow-[2px_2px_4px_#000,-2px_-2px_4px_#2f2f2f] sm:shadow-[3px_3px_6px_#000,-3px_-3px_6px_#2f2f2f]"
                    : "bg-[#e8e8e8] shadow-[2px_2px_4px_#c5c5c5,-2px_-2px_4px_#ffffff] sm:shadow-[3px_3px_6px_#c5c5c5,-3px_-3px_6px_#ffffff]"
                }`}
              >
                <Image
                  src="/logo_transparent.png"
                  alt="Ternary"
                  width={20}
                  height={20}
                  className="w-5 h-5 sm:w-6 sm:h-6"
                />
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-6 xl:gap-8">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-sm font-medium opacity-70 hover:opacity-100 transition-opacity duration-200"
                >
                  {item.name}
                </a>
              ))}
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-2 sm:gap-4">
              <button
                onClick={onThemeToggle}
                className={`p-1.5 sm:p-2 rounded-lg transition-all duration-300 ${
                  darkMode
                    ? "bg-[#212121] shadow-[2px_2px_4px_#000,-2px_-2px_4px_#2f2f2f] sm:shadow-[3px_3px_6px_#000,-3px_-3px_6px_#2f2f2f] hover:shadow-[inset_2px_2px_4px_#000,inset_-2px_-2px_4px_#1f1f1f]"
                    : "bg-[#e8e8e8] shadow-[2px_2px_4px_#c5c5c5,-2px_-2px_4px_#ffffff] sm:shadow-[3px_3px_6px_#c5c5c5,-3px_-3px_6px_#ffffff] hover:shadow-[inset_2px_2px_4px_#c5c5c5,inset_-2px_-2px_4px_#ffffff]"
                }`}
              >
                {darkMode ? (
                  <Sun className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                ) : (
                  <Moon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                )}
              </button>
              <a
                href="https://github.com/TernaryStudio/Ternary-App"
                target="_blank"
                rel="noopener noreferrer"
                className={`p-1.5 sm:p-2 rounded-lg transition-all duration-300 ${
                  darkMode
                    ? "bg-[#212121] shadow-[2px_2px_4px_#000,-2px_-2px_4px_#2f2f2f] sm:shadow-[3px_3px_6px_#000,-3px_-3px_6px_#2f2f2f] hover:shadow-[inset_2px_2px_4px_#000,inset_-2px_-2px_4px_#1f1f1f]"
                    : "bg-[#e8e8e8] shadow-[2px_2px_4px_#c5c5c5,-2px_-2px_4px_#ffffff] sm:shadow-[3px_3px_6px_#c5c5c5,-3px_-3px_6px_#ffffff] hover:shadow-[inset_2px_2px_4px_#c5c5c5,inset_-2px_-2px_4px_#ffffff]"
                }`}
              >
                <Github className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </a>
              {/* Avoid flicker while auth state is loading */}
              {loading ? null : isAuthenticated ? (
                <div className="relative group">
                  <button
                    className={`flex items-center gap-1.5 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-300 ${
                      darkMode
                        ? "bg-[#212121] shadow-[2px_2px_4px_#000,-2px_-2px_4px_#2f2f2f] sm:shadow-[3px_3px_6px_#000,-3px_-3px_6px_#2f2f2f] hover:shadow-[inset_2px_2px_4px_#000,inset_-2px_-2px_4px_#1f1f1f]"
                        : "bg-[#e8e8e8] shadow-[2px_2px_4px_#c5c5c5,-2px_-2px_4px_#ffffff] sm:shadow-[3px_3px_6px_#c5c5c5,-3px_-3px_6px_#ffffff] hover:shadow-[inset_2px_2px_4px_#c5c5c5,inset_-2px_-2px_4px_#ffffff]"
                    }`}
                  >
                    <User className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    <span className="hidden sm:inline">
                      {
                        ((user as any)?.user_metadata?.full_name ||
                          (user as any)?.user_metadata?.name ||
                          user?.email ||
                          "Profile") as string
                      }
                    </span>
                  </button>
                  <div
                    className={`absolute right-0 top-full mt-2 w-40 sm:w-48 py-2 rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ${
                      darkMode
                        ? "bg-[#212121] shadow-[8px_8px_16px_#000,-8px_-8px_16px_#2f2f2f]"
                        : "bg-[#e8e8e8] shadow-[8px_8px_16px_#c5c5c5,-8px_-8px_16px_#ffffff]"
                    }`}
                  >
                    <a
                      href="/profile"
                      className="block px-4 py-2 text-xs sm:text-sm hover:opacity-70"
                    >
                      Profile
                    </a>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-xs sm:text-sm hover:opacity-70"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={handleLogin}
                  className={`flex items-center gap-1.5 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-300 ${
                    darkMode
                      ? "bg-[#212121] shadow-[2px_2px_4px_#000,-2px_-2px_4px_#2f2f2f] sm:shadow-[3px_3px_6px_#000,-3px_-3px_6px_#2f2f2f] hover:shadow-[inset_2px_2px_4px_#000,inset_-2px_-2px_4px_#1f1f1f]"
                      : "bg-[#e8e8e8] shadow-[2px_2px_4px_#c5c5c5,-2px_-2px_4px_#ffffff] sm:shadow-[3px_3px_6px_#c5c5c5,-3px_-3px_6px_#ffffff] hover:shadow-[inset_2px_2px_4px_#c5c5c5,inset_-2px_-2px_4px_#ffffff]"
                  }`}
                >
                  <LogIn className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span className="hidden sm:inline">Login</span>
                </button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`md:hidden p-1.5 sm:p-2 rounded-lg transition-all duration-300 ${
                darkMode
                  ? "bg-[#212121] shadow-[2px_2px_4px_#000,-2px_-2px_4px_#2f2f2f] hover:shadow-[inset_2px_2px_4px_#000,inset_-2px_-2px_4px_#1f1f1f]"
                  : "bg-[#e8e8e8] shadow-[2px_2px_4px_#c5c5c5,-2px_-2px_4px_#ffffff] hover:shadow-[inset_2px_2px_4px_#c5c5c5,inset_-2px_-2px_4px_#ffffff]"
              }`}
            >
              {isMenuOpen ? (
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              ) : (
                <Menu className="w-4 h-4 sm:w-5 sm:h-5" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          <div
            className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
              isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div
              className={`py-4 border-t ${
                darkMode ? "border-gray-700" : "border-gray-300"
              }`}
            >
              <div className="flex flex-col gap-3">
                {/* Navigation Links */}
                <div className="flex flex-col gap-2">
                  {navItems.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="text-sm font-medium opacity-70 hover:opacity-100 transition-opacity duration-200 py-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </a>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between pt-3 border-t border-opacity-20 border-gray-500">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => {
                        onThemeToggle();
                        setIsMenuOpen(false);
                      }}
                      className={`p-2 rounded-lg transition-all duration-300 ${
                        darkMode
                          ? "bg-[#212121] shadow-[2px_2px_4px_#000,-2px_-2px_4px_#2f2f2f] hover:shadow-[inset_2px_2px_4px_#000,inset_-2px_-2px_4px_#1f1f1f]"
                          : "bg-[#e8e8e8] shadow-[2px_2px_4px_#c5c5c5,-2px_-2px_4px_#ffffff] hover:shadow-[inset_2px_2px_4px_#c5c5c5,inset_-2px_-2px_4px_#ffffff]"
                      }`}
                    >
                      {darkMode ? (
                        <Sun className="w-4 h-4" />
                      ) : (
                        <Moon className="w-4 h-4" />
                      )}
                    </button>
                    <a
                      href="https://github.com/TernaryStudio/Ternary-App"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-2 rounded-lg transition-all duration-300 ${
                        darkMode
                          ? "bg-[#212121] shadow-[2px_2px_4px_#000,-2px_-2px_4px_#2f2f2f] hover:shadow-[inset_2px_2px_4px_#000,inset_-2px_-2px_4px_#1f1f1f]"
                          : "bg-[#e8e8e8] shadow-[2px_2px_4px_#c5c5c5,-2px_-2px_4px_#ffffff] hover:shadow-[inset_2px_2px_4px_#c5c5c5,inset_-2px_-2px_4px_#ffffff]"
                      }`}
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  </div>

                  {isAuthenticated ? (
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMenuOpen(false);
                      }}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                        darkMode
                          ? "bg-[#212121] shadow-[2px_2px_4px_#000,-2px_-2px_4px_#2f2f2f] hover:shadow-[inset_2px_2px_4px_#000,inset_-2px_-2px_4px_#1f1f1f]"
                          : "bg-[#e8e8e8] shadow-[2px_2px_4px_#c5c5c5,-2px_-2px_4px_#ffffff] hover:shadow-[inset_2px_2px_4px_#c5c5c5,inset_-2px_-2px_4px_#ffffff]"
                      }`}
                    >
                      <User className="w-4 h-4" />
                      Logout
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        handleLogin();
                        setIsMenuOpen(false);
                      }}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                        darkMode
                          ? "bg-[#212121] shadow-[2px_2px_4px_#000,-2px_-2px_4px_#2f2f2f] hover:shadow-[inset_2px_2px_4px_#000,inset_-2px_-2px_4px_#1f1f1f]"
                          : "bg-[#e8e8e8] shadow-[2px_2px_4px_#c5c5c5,-2px_-2px_4px_#ffffff] hover:shadow-[inset_2px_2px_4px_#c5c5c5,inset_-2px_-2px_4px_#ffffff]"
                      }`}
                    >
                      <LogIn className="w-4 h-4" />
                      Login
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        darkMode={darkMode}
      />
    </>
  );
}
