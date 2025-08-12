import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "../../src/lib/supabase";
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react";

export default function AuthCallback() {
  const router = useRouter();
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [message, setMessage] = useState("");

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // 1) If the URL contains an OAuth/email OTP code, exchange it for a session
        const href = typeof window !== "undefined" ? window.location.href : "";
        if (href.includes("code=")) {
          const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(href);
          if (exchangeError) throw exchangeError;

          setStatus("success");
          setMessage("Berhasil masuk! Mengalihkan...");
          setTimeout(() => router.push("/"), 2000);
          return;
        }

        // 2) Otherwise check existing session
        const { data, error } = await supabase.auth.getSession();
        if (error) throw error;

        if (data.session) {
          setStatus("success");
          setMessage("Berhasil masuk! Mengalihkan...");
          setTimeout(() => router.push("/"), 2000);
          return;
        }

        // 3) Fallback: ensure user is fetched (covers some edge cases)
        const { error: userError } = await supabase.auth.getUser();
        if (userError) throw userError;

        setStatus("success");
        setMessage("Berhasil masuk! Mengalihkan...");
        setTimeout(() => router.push("/"), 2000);
      } catch (error) {
        console.error("Auth callback error:", error);
        setStatus("error");
        setMessage("Gagal masuk. Silakan coba lagi.");
      }
    };

    handleAuthCallback();
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center neu-bg">
      <div className="neu-shadow neu-radius p-8 max-w-md w-full mx-4 text-center">
        {status === "loading" && (
          <div className="flex flex-col items-center gap-4">
            <Loader2 size={48} className="animate-spin text-accent" />
            <h2 className="text-xl font-bold text-[var(--neu-text)]">
              Memproses autentikasi...
            </h2>
            <p className="text-sm text-[var(--neu-text)] opacity-70">
              Mohon tunggu sebentar
            </p>
          </div>
        )}

        {status === "success" && (
          <div className="flex flex-col items-center gap-4">
            <CheckCircle size={48} className="text-green-500" />
            <h2 className="text-xl font-bold text-[var(--neu-text)]">
              Berhasil!
            </h2>
            <p className="text-sm text-[var(--neu-text)] opacity-70">
              {message}
            </p>
          </div>
        )}

        {status === "error" && (
          <div className="flex flex-col items-center gap-4">
            <AlertCircle size={48} className="text-red-500" />
            <h2 className="text-xl font-bold text-[var(--neu-text)]">
              Gagal masuk
            </h2>
            <p className="text-sm text-[var(--neu-text)] opacity-70">
              {message}
            </p>
            <button
              onClick={() => router.push("/")}
              className="neu-btn-accent mt-4"
            >
              Kembali ke Beranda
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
