"use client";

import type React from "react";

import { useEffect, useRef, useState } from "react";
import { X, Mail, Github } from "lucide-react";
import { useAuth } from "../src/contexts/AuthContext";
import { useToastContext } from "../src/contexts/ToastContext";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  darkMode: boolean;
}

export default function AuthModal({
  isOpen,
  onClose,
  darkMode,
}: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { signInWithGoogle, signInWithGithub, signInWithEmail } = useAuth();
  const toast = useToastContext();
  const modalRef = useRef<HTMLDivElement>(null);

  // Close on Escape
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  // Close when clicking outside the modal card
  const handleBackdropMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!modalRef.current) return;
    if (e.target instanceof Node && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      // Current flow uses magic link (email OTP)
      await signInWithEmail(email);
      toast.success("Magic link telah dikirim. Periksa email Anda.");
    } catch (err) {
      console.error("Email sign-in error:", err);
      toast.error("Gagal mengirim magic link. Coba lagi.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onMouseDown={handleBackdropMouseDown}
    >
      <div
        ref={modalRef}
        className={`max-w-md w-full p-8 rounded-3xl relative ${
          darkMode
            ? "bg-[#1a1a1a] shadow-[inset_8px_8px_16px_#0f0f0f,inset_-8px_-8px_16px_#252525]"
            : "bg-[#f0f0f0] shadow-[inset_8px_8px_16px_#d1d1d1,inset_-8px_-8px_16px_#ffffff]"
        }`}
      >
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 p-2 rounded-full ${
            darkMode
              ? "bg-[#1a1a1a] shadow-[4px_4px_8px_#0f0f0f,-4px_-4px_8px_#252525] hover:shadow-[inset_4px_4px_8px_#0f0f0f,inset_-4px_-4px_8px_#252525]"
              : "bg-[#f0f0f0] shadow-[4px_4px_8px_#d1d1d1,-4px_-4px_8px_#ffffff] hover:shadow-[inset_4px_4px_8px_#d1d1d1,inset_-4px_-4px_8px_#ffffff]"
          }`}
        >
          <X className="w-4 h-4" />
        </button>

        <div className="text-center mb-8">
          <h2
            className={`text-2xl font-bold mb-2 ${
              darkMode ? "text-white" : "text-black"
            }`}
          >
            {isLogin ? "Welcome Back" : "Create Account"}
          </h2>
          <p className={`${darkMode ? "text-gray-300" : "text-gray-600"}`}>
            {isLogin ? "Sign in to your account" : "Join Ternary today"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full p-3 rounded-2xl ${
                darkMode
                  ? "bg-[#1a1a1a] shadow-[inset_4px_4px_8px_#0f0f0f,inset_-4px_-4px_8px_#252525] text-white placeholder-gray-400"
                  : "bg-[#f0f0f0] shadow-[inset_4px_4px_8px_#d1d1d1,inset_-4px_-4px_8px_#ffffff] text-black placeholder-gray-500"
              }`}
              required
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full p-3 rounded-2xl ${
                darkMode
                  ? "bg-[#1a1a1a] shadow-[inset_4px_4px_8px_#0f0f0f,inset_-4px_-4px_8px_#252525] text-white placeholder-gray-400"
                  : "bg-[#f0f0f0] shadow-[inset_4px_4px_8px_#d1d1d1,inset_-4px_-4px_8px_#ffffff] text-black placeholder-gray-500"
              }`}
              required
            />
          </div>

          <button
            type="submit"
            className={`w-full py-3 px-6 rounded-2xl font-medium transition-all ${
              darkMode
                ? "bg-[#1a1a1a] shadow-[8px_8px_16px_#0f0f0f,-8px_-8px_16px_#252525] hover:shadow-[inset_8px_8px_16px_#0f0f0f,inset_-8px_-8px_16px_#252525] text-white"
                : "bg-[#f0f0f0] shadow-[8px_8px_16px_#d1d1d1,-8px_-8px_16px_#ffffff] hover:shadow-[inset_8px_8px_16px_#d1d1d1,inset_-8px_-8px_16px_#ffffff] text-black"
            }`}
            disabled={submitting}
          >
            {submitting ? "Memproses..." : isLogin ? "Sign In" : "Create Account"}
          </button>
        </form>

        <div className="mt-6">
          <div
            className={`text-center text-sm mb-4 ${
              darkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            Or continue with
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={async () => {
                try {
                  setSubmitting(true);
                  await signInWithGoogle();
                  toast.success("Mengalihkan ke Google...");
                } catch (err) {
                  console.error("Google sign-in error:", err);
                  toast.error("Gagal masuk dengan Google.");
                } finally {
                  setSubmitting(false);
                }
              }}
              className={`flex items-center justify-center gap-2 py-3 px-4 rounded-2xl transition-all ${
                darkMode
                  ? "bg-[#1a1a1a] shadow-[8px_8px_16px_#0f0f0f,-8px_-8px_16px_#252525] hover:shadow-[inset_8px_8px_16px_#0f0f0f,inset_-8px_-8px_16px_#252525] text-white"
                  : "bg-[#f0f0f0] shadow-[8px_8px_16px_#d1d1d1,-8px_-8px_16px_#ffffff] hover:shadow-[inset_8px_8px_16px_#d1d1d1,inset_-8px_-8px_16px_#ffffff] text-black"
              }`}
              disabled={submitting}
            >
              <Mail className="w-4 h-4" />
              Google
            </button>

            <button
              type="button"
              onClick={async () => {
                try {
                  setSubmitting(true);
                  await signInWithGithub();
                  toast.success("Mengalihkan ke GitHub...");
                } catch (err) {
                  console.error("GitHub sign-in error:", err);
                  toast.error("Gagal masuk dengan GitHub.");
                } finally {
                  setSubmitting(false);
                }
              }}
              className={`flex items-center justify-center gap-2 py-3 px-4 rounded-2xl transition-all ${
                darkMode
                  ? "bg-[#1a1a1a] shadow-[8px_8px_16px_#0f0f0f,-8px_-8px_16px_#252525] hover:shadow-[inset_8px_8px_16px_#0f0f0f,inset_-8px_-8px_16px_#252525] text-white"
                  : "bg-[#f0f0f0] shadow-[8px_8px_16px_#d1d1d1,-8px_-8px_16px_#ffffff] hover:shadow-[inset_8px_8px_16px_#d1d1d1,inset_-8px_-8px_16px_#ffffff] text-black"
              }`}
              disabled={submitting}
            >
              <Github className="w-4 h-4" />
              GitHub
            </button>
          </div>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className={`text-sm ${
              darkMode
                ? "text-gray-400 hover:text-white"
                : "text-gray-600 hover:text-black"
            }`}
          >
            {isLogin
              ? "Don't have an account? Sign up"
              : "Already have an account? Sign in"}
          </button>
        </div>
      </div>
    </div>
  );
}
