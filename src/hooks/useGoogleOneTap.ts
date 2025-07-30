import { useEffect, useCallback } from "react";
import { useAuth } from "../contexts/AuthContext";

interface GoogleOneTapConfig {
  client_id: string;
  callback: (response: any) => void;
  auto_select?: boolean;
  cancel_on_tap_outside?: boolean;
}

export function useGoogleOneTap() {
  const { signInWithGoogle } = useAuth();

  const initializeGoogleOneTap = useCallback((config: GoogleOneTapConfig) => {
    if (typeof window !== "undefined" && window.google?.accounts?.id) {
      window.google.accounts.id.initialize(config);
    }
  }, []);

  const promptGoogleOneTap = useCallback(
    (callback?: (notification: any) => void) => {
      if (typeof window !== "undefined" && window.google?.accounts?.id) {
        window.google.accounts.id.prompt((notification) => {
          if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
            // One Tap not available, continue with normal flow
            console.log("Google One Tap not available");
          }
          if (callback) {
            callback(notification);
          }
        });
      }
    },
    []
  );

  const renderGoogleOneTap = useCallback((elementId: string) => {
    if (typeof window !== "undefined" && window.google?.accounts?.id) {
      window.google.accounts.id.renderButton(
        document.getElementById(elementId),
        {
          theme: "outline",
          size: "large",
          type: "standard",
          text: "signin_with",
          shape: "rectangular",
          logo_alignment: "left",
        }
      );
    }
  }, []);

  const handleGoogleOneTapSuccess = useCallback(
    async (response: any) => {
      try {
        await signInWithGoogle();
      } catch (error) {
        console.error("Google One Tap sign in failed:", error);
      }
    },
    [signInWithGoogle]
  );

  useEffect(() => {
    // Initialize Google One Tap when component mounts
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    if (clientId) {
      initializeGoogleOneTap({
        client_id: clientId,
        callback: handleGoogleOneTapSuccess,
        auto_select: false,
        cancel_on_tap_outside: true,
      });
    }
  }, [initializeGoogleOneTap, handleGoogleOneTapSuccess]);

  return {
    initializeGoogleOneTap,
    promptGoogleOneTap,
    renderGoogleOneTap,
    handleGoogleOneTapSuccess,
  };
}
