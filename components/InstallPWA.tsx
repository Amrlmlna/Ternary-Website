import React from "react";
import { Download, X, Wifi, WifiOff } from "lucide-react";
import { usePWA } from "../src/hooks/usePWA";
import { useToastContext } from "../src/contexts/ToastContext";

export default function InstallPWA() {
  const { isInstallable, isInstalled, isOnline, installApp } = usePWA();
  const { success, error } = useToastContext();

  const handleInstall = async () => {
    try {
      await installApp();
      success("Aplikasi berhasil diinstal!");
    } catch (err) {
      error("Gagal menginstal aplikasi");
    }
  };

  // Don't show if already installed or not installable
  if (isInstalled || !isInstallable) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="neu-bg neu-shadow neu-radius p-4 max-w-sm">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 neu-shadow-inset neu-radius flex items-center justify-center flex-shrink-0">
            <Download size={20} className="text-accent" />
          </div>

          <div className="flex-1">
            <h3 className="font-semibold text-[var(--neu-text)] mb-1">
              Install Ternary Premium
            </h3>
            <p className="text-sm text-[var(--neu-text)] opacity-70 mb-3">
              Install aplikasi untuk pengalaman yang lebih baik
            </p>

            <div className="flex items-center gap-2 mb-3">
              {isOnline ? (
                <Wifi size={14} className="text-green-500" />
              ) : (
                <WifiOff size={14} className="text-red-500" />
              )}
              <span className="text-xs text-[var(--neu-text)] opacity-70">
                {isOnline ? "Online" : "Offline"}
              </span>
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleInstall}
                className="neu-btn-accent flex items-center gap-2 px-3 py-2 text-sm"
              >
                <Download size={14} />
                Install
              </button>

              <button
                onClick={() => {
                  // Hide install prompt (you might want to store this preference)
                }}
                className="neu-btn flex items-center gap-2 px-3 py-2 text-sm"
              >
                <X size={14} />
                Nanti
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
