import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import SEO from "../src/components/SEO";
import SuccessMessage from "../components/SuccessMessage";
import LoadingSpinner from "../components/LoadingSpinner";
import { CheckCircle, Copy, ExternalLink, Rocket } from "lucide-react";

interface SuccessProps {
  apiKey: string | null;
  error?: string;
  sessionId?: string;
  plan?: string;
}

export default function Success({
  apiKey,
  error,
  sessionId,
  plan,
}: SuccessProps) {
  const [copied, setCopied] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [localApiKey, setLocalApiKey] = useState<string | null>(apiKey);
  const [localError, setLocalError] = useState<string | undefined>(error);
  const [isLoading, setIsLoading] = useState(false);

  // Auto-refresh untuk memeriksa status pembayaran jika ada sessionId
  useEffect(() => {
    setIsClient(true);

    if (localApiKey) {
      // Coba buka aplikasi secara otomatis dengan format deeplink yang benar
      window.location.href = `ternary://ternary-pro-return?key=${localApiKey}`;
      return;
    }

    // Jika tidak ada API key tapi ada session ID, cek status secara berkala
    if (sessionId && plan && !localApiKey) {
      const checkPaymentStatus = async () => {
        try {
          setIsLoading(true);
          const response = await fetch(
            `/api/check-payment-status?session_id=${sessionId}`
          );
          const data = await response.json();

          if (response.ok && data.apiKey) {
            setLocalApiKey(data.apiKey);
            setLocalError(undefined);
            // Redirect ke aplikasi dengan API key
            window.location.href = `ternary://ternary-pro-return?key=${data.apiKey}`;
          } else if (data.error) {
            setLocalError(data.error);
          }
        } catch (err) {
          console.error("Error checking payment status:", err);
        } finally {
          setIsLoading(false);
        }
      };

      // Periksa status segera
      checkPaymentStatus();

      // Kemudian periksa setiap 3 detik
      const intervalId = setInterval(checkPaymentStatus, 3000);

      return () => clearInterval(intervalId);
    }
  }, [localApiKey, sessionId, plan]);

  // Gunakan nilai lokal untuk API key dan error
  const displayApiKey = localApiKey || apiKey;
  const displayError = localError || error;

  const handleCopy = () => {
    if (displayApiKey) {
      navigator.clipboard.writeText(displayApiKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleOpenApp = () => {
    if (displayApiKey) {
      window.location.href = `ternary://ternary-pro-return?key=${displayApiKey}`;
    }
  };

  if (!isClient) {
    return <LoadingSpinner text="Menyiapkan halaman..." />;
  }

  if (isLoading && !displayApiKey) {
    return (
      <LoadingSpinner text="Memproses pembayaran dan menghasilkan API key..." />
    );
  }

  return (
    <>
      <SEO
        title="Pembayaran Berhasil - Ternary Premium"
        description="Pembayaran Anda berhasil. Dapatkan API Key dan mulai gunakan Ternary Premium."
      />
      <div className="min-h-screen flex items-center justify-center neu-bg px-4 py-12">
        <div className="neu-bg neu-shadow neu-radius p-8 max-w-md w-full mx-auto text-center animate-fade-in">
          <div className="flex flex-col items-center gap-4 mb-6">
            <img
              src="/logo.png"
              alt="Ternary Premium Logo"
              className="w-16 h-16 mb-2"
              onError={(e) => (e.currentTarget.style.display = "none")}
            />
            <CheckCircle size={48} className="text-green-500" />
            <h1 className="text-2xl font-bold text-[var(--neu-text)]">
              Pembayaran Berhasil!
            </h1>
            <p className="text-[var(--neu-text)] opacity-70">
              Terima kasih telah upgrade ke{" "}
              <span className="text-accent font-semibold">Ternary Premium</span>
              .<br />
              {displayApiKey
                ? "API Key Anda siap digunakan."
                : "API Key Anda akan segera tersedia."}
            </p>
          </div>

          {displayApiKey ? (
            <div className="mb-6">
              <div className="neu-bg neu-shadow-inset neu-radius p-4 flex items-center justify-between gap-2 mb-2">
                <span className="font-mono text-sm break-all select-all">
                  {displayApiKey}
                </span>
                <button
                  onClick={handleCopy}
                  className="neu-btn-accent flex items-center gap-1 px-2 py-1 text-xs"
                  aria-label="Copy API Key"
                >
                  <Copy size={14} />
                  {copied ? "Tersalin!" : "Copy"}
                </button>
              </div>
              <SuccessMessage message="Kunci API Anda telah disalin dan siap digunakan di aplikasi Ternary." />
            </div>
          ) : (
            <div className="mb-6">
              <p
                className={
                  displayError && displayError.includes("Menunggu konfirmasi")
                    ? "text-orange-500 font-medium"
                    : "text-red-600 font-medium"
                }
              >
                {displayError ||
                  "Gagal mengambil API Key. Silakan cek aplikasi, email, atau hubungi support."}
              </p>
              {sessionId && !isLoading && (
                <p className="text-sm text-gray-500 mt-2">
                  Halaman akan diperbarui otomatis setiap beberapa detik...
                </p>
              )}
            </div>
          )}

          <div className="flex flex-col gap-3 mt-8">
            {displayApiKey && (
              <button
                onClick={handleOpenApp}
                className="neu-btn-accent flex items-center justify-center gap-2 text-base font-bold"
              >
                <Rocket size={18} />
                Buka di Aplikasi Ternary
              </button>
            )}
            <a
              href="/profile"
              className="neu-btn flex items-center justify-center gap-2 text-base"
            >
              <ExternalLink size={16} />
              Buka Dashboard
            </a>
            <a
              href="/"
              className="text-sm text-[var(--neu-text)] opacity-60 hover:opacity-100 transition-opacity"
            >
              Kembali ke Beranda
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query } = context;
  const apiKeyFromQuery = query.apiKey as string | undefined;

  if (apiKeyFromQuery) {
    return { props: { apiKey: apiKeyFromQuery } };
  }

  // Jika tidak ada apiKey di query, cek session_id
  const sessionId = query.session_id as string | undefined;
  const plan = query.plan as string | undefined;

  if (sessionId && plan) {
    try {
      // Coba ambil API key dari webhook secara langsung
      const response = await fetch(
        `${
          process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
        }/api/check-payment-status?session_id=${sessionId}`
      );
      const data = await response.json();

      if (response.ok && data.apiKey) {
        return {
          props: {
            apiKey: data.apiKey,
          },
        };
      }

      // Jika belum ada API key, tampilkan pesan menunggu dengan auto-refresh
      return {
        props: {
          apiKey: null,
          error:
            "Menunggu konfirmasi pembayaran. Halaman akan diperbarui otomatis dalam beberapa detik.",
          sessionId,
          plan,
        },
      };
    } catch (error) {
      console.error("Error checking payment status:", error);
      return {
        props: {
          apiKey: null,
          error:
            "Terjadi kesalahan saat memeriksa status pembayaran. Silakan refresh halaman ini.",
          sessionId,
          plan,
        },
      };
    }
  }

  // Jika tidak ada apiKey atau session_id, tampilkan pesan umum
  return {
    props: {
      apiKey: null,
      error:
        "API Key tidak tersedia. Silakan cek aplikasi atau hubungi support.",
    },
  };
};
