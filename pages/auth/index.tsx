import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../../src/contexts/AuthContext";
import { LogIn, Mail, Github, Chrome } from "lucide-react";

export default function AuthEntry() {
  const router = useRouter();
  const { user } = useAuth();
  const [ready, setReady] = useState(false);

  const redirectUrl = useMemo(
    () => (typeof window !== "undefined" ? `${window.location.origin}/auth/callback` : "/auth/callback"),
    []
  );

  useEffect(() => {
    if (!router.isReady) return;
    const { return_to, state } = router.query;
    if (return_to && typeof return_to === "string") {
      sessionStorage.setItem("auth_return_to", return_to);
    }
    if (state && typeof state === "string") {
      sessionStorage.setItem("auth_state", state);
    }
    setReady(true);
  }, [router.isReady, router.query]);

  const startOAuth = async (provider: "google" | "github") => {
    const { supabase } = await import("../../src/lib/supabase");
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: redirectUrl },
    });
    if (error) {
      console.error("OAuth error:", error);
      // fallback ke modal di home
      router.push("/?auth=true");
    }
  };

  const signInWithEmail = () => {
    // arahkan ke halaman home dengan auth modal email
    router.push("/?auth=true&method=email");
  };

  const continueIfSigned = () => router.push("/auth/callback");

  return (
    <div className="min-h-screen flex items-center justify-center neu-bg">
      <div className="neu-shadow neu-radius p-8 max-w-md w-full mx-4 text-center space-y-6">
        <h2 className="text-2xl font-bold text-[var(--neu-text)]">Masuk ke Ternary</h2>
        <p className="text-sm text-[var(--neu-text)] opacity-70">
          Silakan pilih metode autentikasi. Setelah selesai, Anda akan diarahkan otomatis.
        </p>

        <div className="flex flex-col gap-3">
          <button
            onClick={() => startOAuth("google")}
            className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-md border border-[var(--neu-border)] hover:bg-[var(--neu-elev)]"
            disabled={!ready}
          >
            <Chrome size={18} />
            <span>Lanjutkan dengan Google</span>
          </button>

          <button
            onClick={() => startOAuth("github")}
            className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-md border border-[var(--neu-border)] hover:bg-[var(--neu-elev)]"
            disabled={!ready}
          >
            <Github size={18} />
            <span>Lanjutkan dengan GitHub</span>
          </button>

          <button
            onClick={signInWithEmail}
            className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-md border border-[var(--neu-border)] hover:bg-[var(--neu-elev)]"
            disabled={!ready}
          >
            <Mail size={18} />
            <span>Masuk dengan Email</span>
          </button>
        </div>

        {user && (
          <button
            onClick={continueIfSigned}
            className="w-full inline-flex items-center justify-center gap-2 py-2 px-4 rounded-md bg-accent text-white"
          >
            <LogIn size={18} />
            <span>Lanjutkan</span>
          </button>
        )}

        {!user && (
          <p className="text-xs text-[var(--neu-text)] opacity-60">
            Sudah login di tab lain? Setelah login, klik tombol Lanjutkan.
          </p>
        )}
      </div>
    </div>
  );
}
