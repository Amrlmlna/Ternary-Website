import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "../src/contexts/AuthContext";
import AuthModal from "./AuthModal";
import { User, LogOut, Settings, LayoutDashboard } from "lucide-react";
import { cn } from "../src/lib/utils";
import { useClickOutside } from "../src/hooks/useClickOutside";
import ThemeToggle from "./ThemeToggle";
import { useRouter } from "next/router";
// import LanguageSelector from "./LanguageSelector";

const navItems = [
  { label: "Home", href: "#hero" },
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "FAQ", href: "#faq" },
  { label: "Pricing", href: "#pricing" },
];

export default function Navbar() {
  const { user, signOut, loading } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [justLoggedIn, setJustLoggedIn] = useState(false);

  useClickOutside(userMenuRef, () => {
    setIsUserMenuOpen(false);
  });

  // Redirect to /profile after login
  useEffect(() => {
    if (user && justLoggedIn) {
      setJustLoggedIn(false);
      router.push("/profile");
    }
  }, [user, justLoggedIn, router]);

  const handleSignOut = async () => {
    try {
      await signOut();
      setIsUserMenuOpen(false);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const handleSettings = () => {
    setIsUserMenuOpen(false);
    router.push("/profile");
  };

  return (
    <>
      <div className="w-full flex justify-center fixed top-8 left-0 z-50 pointer-events-none">
        <nav className="pointer-events-auto max-w-6xl w-full neu-bg neu-shadow neu-radius px-2 md:px-8 py-2 flex gap-2 md:gap-6 items-center justify-between backdrop-blur-md bg-opacity-80">
          {/* Navigation Items */}
          <div className="flex gap-2 md:gap-6 items-center">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-semibold text-[var(--neu-text)] px-2 py-1 rounded transition-all duration-200 hover:bg-accent hover:text-white hover:scale-105"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Auth Section */}
          <div className="flex items-center gap-4">
            <ThemeToggle />
            {/* <LanguageSelector /> */}
            {user && (
              <a
                href="/profile"
                className="neu-btn-accent flex items-center gap-2 px-3 py-2 text-sm font-semibold hover:bg-accent hover:text-white transition-all"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                <LayoutDashboard size={16} />
                Buka Dashboard
              </a>
            )}
            <div className="flex items-center gap-2">
              {loading ? (
                <div className="w-8 h-8 neu-shadow-inset neu-radius animate-pulse" />
              ) : user ? (
                <div className="relative" ref={userMenuRef}>
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center gap-2 neu-btn hover:bg-accent hover:text-white transition-all"
                  >
                    {user.user_metadata?.avatar_url ? (
                      <img
                        src={user.user_metadata.avatar_url}
                        alt={
                          user.user_metadata?.full_name || user.email || "User"
                        }
                        className="w-6 h-6 rounded-full"
                      />
                    ) : (
                      <User size={16} />
                    )}
                    <span className="hidden md:block text-sm font-medium">
                      {user.user_metadata?.full_name ||
                        user.email?.split("@")[0] ||
                        "User"}
                    </span>
                  </button>

                  {/* User Dropdown Menu */}
                  {isUserMenuOpen && (
                    <div className="absolute right-0 top-full mt-2 w-48 neu-bg neu-shadow neu-radius py-2 z-50">
                      <div className="px-4 py-2 border-b border-[var(--neu-border)]">
                        <p className="text-sm font-medium text-[var(--neu-text)]">
                          {user.user_metadata?.full_name || "User"}
                        </p>
                        <p className="text-xs text-[var(--neu-text)] opacity-70">
                          {user.email}
                        </p>
                      </div>

                      <button
                        onClick={handleSettings}
                        className="w-full px-4 py-2 text-left text-sm text-[var(--neu-text)] hover:bg-accent hover:text-white transition-colors flex items-center gap-2"
                      >
                        <Settings size={14} />
                        Settings
                      </button>

                      <button
                        onClick={handleSignOut}
                        className="w-full px-4 py-2 text-left text-sm text-[var(--neu-text)] hover:bg-accent hover:text-white transition-colors flex items-center gap-2"
                      >
                        <LogOut size={14} />
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => {
                    setIsAuthModalOpen(true);
                    setJustLoggedIn(true);
                  }}
                  className="neu-btn font-semibold px-4 py-2"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  Sign In
                </button>
              )}
            </div>
          </div>
        </nav>
      </div>

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </>
  );
}
