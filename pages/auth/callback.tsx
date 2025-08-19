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
        }

        // 2) Get current session
        const { data, error } = await supabase.auth.getSession();
        if (error) throw error;

        if (data.session) {
          // Create/update profile
          const { error: profileError } = await supabase
            .from('profiles')
            .upsert({
              id: data.session.user.id,
              email: data.session.user.email,
              full_name: data.session.user.user_metadata?.full_name,
              avatar_url: data.session.user.user_metadata?.avatar_url,
              updated_at: new Date().toISOString(),
            });

          if (profileError) {
            console.error('Profile upsert error:', profileError);
          }

          setStatus("success");
          
          // Handle app deeplink flow (no device-code)
          const deeplink = router.query.deeplink === '1';
          if (deeplink) {
            setMessage("Authentication successful! Redirecting back to app...");
            // Redirect to device authorization page, then deeplink back to app
            setTimeout(() => {
              // App listens for host "auth-success" and reads "email" from query
              const link = `ternary://auth-success?email=${encodeURIComponent(data.session.user.email || '')}`;
              window.location.href = link;
              // Fallback: redirect to device page if deeplink fails
              setTimeout(() => router.push("/"), 1000);
            }, 2000);
          } else {
            setMessage("Successfully signed in! Redirecting...");
            setTimeout(() => router.push("/"), 2000);
          }
          return;
        }

        // 3) Fallback: ensure user is fetched (covers some edge cases)
        const { error: userError } = await supabase.auth.getUser();
        if (userError) throw userError;

        setStatus("success");
        setMessage("Successfully signed in! Redirecting...");
        setTimeout(() => router.push("/"), 2000);
      } catch (error) {
        console.error("Auth callback error:", error);
        setStatus("error");
        setMessage("Authentication failed. Please try again.");
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
