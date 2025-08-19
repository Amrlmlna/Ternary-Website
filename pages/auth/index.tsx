import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../../src/contexts/AuthContext";
import { Loader2 } from "lucide-react";

export default function AuthEntry() {
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    const handleAuthEntry = async () => {
      const { return_to, state } = router.query;

      // Store parameters for callback page
      if (return_to && typeof return_to === "string") {
        sessionStorage.setItem("auth_return_to", return_to);
      }
      if (state && typeof state === "string") {
        sessionStorage.setItem("auth_state", state);
      }

      // If already authenticated, go directly to callback
      if (user) {
        router.push("/auth/callback");
        return;
      }

      // Otherwise redirect to sign-in with Google (most common flow)
      // User can also use the auth modal if they prefer email/GitHub
      const redirectUrl = `${window.location.origin}/auth/callback`;
      const { supabase } = await import("../../src/lib/supabase");
      
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: redirectUrl,
        },
      });

      if (error) {
        console.error("OAuth error:", error);
        // Fallback: redirect to home with auth modal
        router.push("/?auth=true");
      }
    };

    if (router.isReady) {
      handleAuthEntry();
    }
  }, [router, user]);

  return (
    <div className="min-h-screen flex items-center justify-center neu-bg">
      <div className="neu-shadow neu-radius p-8 max-w-md w-full mx-4 text-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 size={48} className="animate-spin text-accent" />
          <h2 className="text-xl font-bold text-[var(--neu-text)]">
            Menghubungkan ke Ternary...
          </h2>
          <p className="text-sm text-[var(--neu-text)] opacity-70">
            Mohon tunggu sebentar
          </p>
        </div>
      </div>
    </div>
  );
}
