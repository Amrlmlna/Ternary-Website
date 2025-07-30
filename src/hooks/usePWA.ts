import { useState, useEffect } from "react";

interface PWAState {
  isInstalled: boolean;
  isInstallable: boolean;
  isOnline: boolean;
  deferredPrompt: any;
}

export function usePWA() {
  const [pwaState, setPwaState] = useState<PWAState>({
    isInstalled: false,
    isInstallable: false,
    isOnline: navigator.onLine,
    deferredPrompt: null,
  });

  useEffect(() => {
    // Check if app is already installed
    const checkInstallation = () => {
      const isInstalled =
        window.matchMedia("(display-mode: standalone)").matches ||
        (window.navigator as any).standalone === true;

      setPwaState((prev) => ({ ...prev, isInstalled }));
    };

    // Handle online/offline status
    const handleOnlineStatus = () => {
      setPwaState((prev) => ({ ...prev, isOnline: navigator.onLine }));
    };

    // Handle beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setPwaState((prev) => ({
        ...prev,
        isInstallable: true,
        deferredPrompt: e,
      }));
    };

    // Handle appinstalled event
    const handleAppInstalled = () => {
      setPwaState((prev) => ({
        ...prev,
        isInstalled: true,
        isInstallable: false,
        deferredPrompt: null,
      }));
    };

    // Register service worker
    const registerServiceWorker = async () => {
      if ("serviceWorker" in navigator) {
        try {
          const registration = await navigator.serviceWorker.register("/sw.js");
          console.log("Service Worker registered:", registration);
        } catch (error) {
          console.error("Service Worker registration failed:", error);
        }
      }
    };

    // Initialize
    checkInstallation();
    registerServiceWorker();

    // Add event listeners
    window.addEventListener("online", handleOnlineStatus);
    window.addEventListener("offline", handleOnlineStatus);
    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);

    // Cleanup
    return () => {
      window.removeEventListener("online", handleOnlineStatus);
      window.removeEventListener("offline", handleOnlineStatus);
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  const installApp = async () => {
    if (pwaState.deferredPrompt) {
      pwaState.deferredPrompt.prompt();
      const { outcome } = await pwaState.deferredPrompt.userChoice;

      if (outcome === "accepted") {
        console.log("User accepted the install prompt");
      } else {
        console.log("User dismissed the install prompt");
      }

      setPwaState((prev) => ({
        ...prev,
        deferredPrompt: null,
        isInstallable: false,
      }));
    }
  };

  const requestNotificationPermission = async () => {
    if ("Notification" in window) {
      const permission = await Notification.requestPermission();
      return permission === "granted";
    }
    return false;
  };

  const sendNotification = (title: string, options?: NotificationOptions) => {
    if ("Notification" in window && Notification.permission === "granted") {
      new Notification(title, options);
    }
  };

  return {
    ...pwaState,
    installApp,
    requestNotificationPermission,
    sendNotification,
  };
}
