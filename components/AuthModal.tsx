import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../src/contexts/AuthContext";
import { cn } from "../src/lib/utils";
import { X, Mail, Github, Chrome } from "lucide-react";
import LoadingSpinner from "./LoadingSpinner";
import ErrorMessage from "./ErrorMessage";
import SuccessMessage from "./SuccessMessage";
import { useClickOutside } from "../src/hooks/useClickOutside";
import { useKeyboard } from "../src/hooks/useKeyboard";

export interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: "oauth" | "email";
  forceGoogleOneTap?: boolean;
}

const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialTab = "oauth",
  forceGoogleOneTap = false,
}) => {
  const { signInWithGoogle, signInWithGithub, signInWithEmail } = useAuth();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState<"oauth" | "email">(
    initialTab || "oauth"
  );
  const [showFormFallback, setShowFormFallback] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useClickOutside(modalRef, () => {
    if (isOpen) onClose();
  });

  useKeyboard("Escape", () => {
    if (isOpen) onClose();
  });

  // Set initial tab when modal opens
  useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab);
    }
  }, [isOpen, initialTab]);

  // Google One Tap logic
  useEffect(() => {
    if (isOpen && forceGoogleOneTap) {
      setShowFormFallback(false); // reset fallback
      if (typeof window !== "undefined" && window.google) {
        window.google.accounts.id.initialize({
          client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
          callback: handleGoogleOneTapSuccess,
          auto_select: false,
          cancel_on_tap_outside: true,
        });
        window.google.accounts.id.prompt((notification) => {
          if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
            setShowFormFallback(true);
          }
        });
      } else {
        setShowFormFallback(true);
      }
    } else {
      setShowFormFallback(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, forceGoogleOneTap]);

  const handleGoogleOneTapSuccess = async (response: any) => {
    try {
      setIsLoading(true);
      setError("");
      await signInWithGoogle();
      onClose();
    } catch (err) {
      setError("Gagal masuk dengan Google One Tap");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      setError("");
      await signInWithGoogle();
      onClose();
    } catch (err) {
      setError("Gagal masuk dengan Google");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGithubSignIn = async () => {
    try {
      setIsLoading(true);
      setError("");
      await signInWithGithub();
      onClose();
    } catch (err) {
      setError("Gagal masuk dengan GitHub");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError("Email harus diisi");
      return;
    }
    try {
      setIsLoading(true);
      setError("");
      await signInWithEmail(email);
      setEmailSent(true);
    } catch (err) {
      setError("Gagal mengirim email magic link");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        ref={modalRef}
        className="relative neu-bg neu-shadow neu-radius p-8 max-w-md w-full mx-4"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[var(--neu-text)] hover:text-accent transition-colors"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-[var(--neu-text)] mb-2">
            Masuk ke Ternary Premium
          </h2>
          <p className="text-sm text-[var(--neu-text)] opacity-70">
            Pilih metode autentikasi yang Anda inginkan
          </p>
        </div>

        {/* Tabs */}
        <div className="flex mb-6 neu-shadow-inset neu-radius p-1">
          <button
            onClick={() => setActiveTab("oauth")}
            className={cn(
              "flex-1 py-2 px-4 text-sm font-medium rounded transition-all",
              activeTab === "oauth"
                ? "bg-accent text-white neu-shadow"
                : "text-[var(--neu-text)] hover:bg-[var(--neu-border)]"
            )}
          >
            OAuth
          </button>
          <button
            onClick={() => setActiveTab("email")}
            className={cn(
              "flex-1 py-2 px-4 text-sm font-medium rounded transition-all",
              activeTab === "email"
                ? "bg-accent text-white neu-shadow"
                : "text-[var(--neu-text)] hover:bg-[var(--neu-border)]"
            )}
          >
            Email
          </button>
        </div>

        {/* Error message */}
        {error && (
          <ErrorMessage
            message={error}
            onClose={() => setError("")}
            className="mb-4"
          />
        )}

        {/* Success message */}
        {emailSent && (
          <SuccessMessage
            message="Magic link telah dikirim ke email Anda. Silakan cek inbox Anda."
            className="mb-4"
          />
        )}

        {/* OAuth Tab */}
        {activeTab === "oauth" && (
          <div className="space-y-3">
            <button
              onClick={handleGoogleSignIn}
              disabled={isLoading}
              className="w-full neu-btn flex items-center justify-center gap-3 hover:bg-accent hover:text-white transition-all"
            >
              {isLoading ? <LoadingSpinner size="sm" /> : <Chrome size={20} />}
              Masuk dengan Google
            </button>

            <button
              onClick={handleGithubSignIn}
              disabled={isLoading}
              className="w-full neu-btn flex items-center justify-center gap-3 hover:bg-accent hover:text-white transition-all"
            >
              {isLoading ? <LoadingSpinner size="sm" /> : <Github size={20} />}
              Masuk dengan GitHub
            </button>
          </div>
        )}

        {/* Email Tab */}
        {activeTab === "email" && (
          <form onSubmit={handleEmailSignIn} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-[var(--neu-text)] mb-2"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Masukkan email Anda"
                className="w-full neu-btn"
                disabled={isLoading}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="neu-btn w-full font-semibold py-2 mt-4 flex items-center justify-center gap-2"
            >
              {isLoading ? <LoadingSpinner size="sm" /> : <Mail size={20} />}
              Kirim Magic Link
            </button>
          </form>
        )}

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-xs text-[var(--neu-text)] opacity-60">
            Dengan melanjutkan, Anda menyetujui{" "}
            <a href="/terms" className="text-accent hover:underline">
              Syarat & Ketentuan
            </a>{" "}
            dan{" "}
            <a href="/privacy" className="text-accent hover:underline">
              Kebijakan Privasi
            </a>{" "}
            kami.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
