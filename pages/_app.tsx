import "../src/styles/globals.css";
import { useEffect, useState, useCallback } from "react";
import type { AppProps } from "next/app";
import Head from "next/head";
import { AuthProvider } from "../src/contexts/AuthContext";
import { ToastProvider } from "../src/contexts/ToastContext";
import ToastContainer from "../components/ToastContainer";
import ErrorBoundary from "../src/components/ErrorBoundary";
import InstallPWA from "../components/InstallPWA";
import AuthModal from "../components/AuthModal";
import { AuthModalContext } from "../components/PricingSection";
import { CheckoutIntentProvider } from "../components/_CheckoutIntentContext";

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Auto dark mode by system preference
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, []);

  // Global AuthModal state
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<"oauth" | "email">("oauth");
  const [forceGoogleOneTap, setForceGoogleOneTap] = useState(false);

  const openAuthModal = useCallback(
    (tab: "oauth" | "email" = "oauth", forceGoogle = false) => {
      setAuthModalTab(tab);
      setForceGoogleOneTap(forceGoogle);
      setIsAuthModalOpen(true);
    },
    []
  );

  return (
    <ErrorBoundary>
      <AuthProvider>
        <ToastProvider>
          <CheckoutIntentProvider>
            <AuthModalContext.Provider value={{ openAuthModal }}>
              <Head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link
                  rel="preconnect"
                  href="https://fonts.gstatic.com"
                  crossOrigin=""
                />
                <link
                  href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700&family=Space+Grotesk:wght@400;500;700&display=swap"
                  rel="stylesheet"
                />
                {/* Google One Tap Script */}
                <script
                  src="https://accounts.google.com/gsi/client"
                  async
                  defer
                ></script>
              </Head>
              <Component {...pageProps} />
              <AuthModal
                isOpen={isAuthModalOpen}
                onClose={() => setIsAuthModalOpen(false)}
                initialTab={authModalTab}
                forceGoogleOneTap={forceGoogleOneTap}
              />
              <ToastContainer />
              <InstallPWA />
            </AuthModalContext.Provider>
          </CheckoutIntentProvider>
        </ToastProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}
