import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { createClient } from '@supabase/supabase-js';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function SignInPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already signed in
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        // Redirect based on where they came from
        const redirectTo = router.query.redirect_to as string | undefined;
        const deeplink = router.query.deeplink === '1';
        if (redirectTo) {
          const url = deeplink ? `${redirectTo}?deeplink=1` : redirectTo;
          router.push(url);
        } else {
          router.push('/profile');
        }
      }
      setLoading(false);
    };

    checkUser();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session) {
        // Create/update profile
        const { error } = await supabase
          .from('profiles')
          .upsert({
            id: session.user.id,
            email: session.user.email,
            full_name: session.user.user_metadata?.full_name,
            avatar_url: session.user.user_metadata?.avatar_url,
            updated_at: new Date().toISOString(),
          });

        if (error) {
          console.error('Profile upsert error:', error);
        }

        // Redirect after successful signin
        const redirectTo = router.query.redirect_to as string | undefined;
        const deeplink = router.query.deeplink === '1';
        if (redirectTo) {
          const url = deeplink ? `${redirectTo}?deeplink=1` : redirectTo;
          router.push(url);
        } else {
          router.push('/profile');
        }
      }
    });

    return () => subscription.unsubscribe();
  }, [router]);

  // Show the form even while loading to avoid blank page UX

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to Ternary
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Access your Pro features and sync across devices
          </p>
        </div>
        
        <div className="bg-white py-8 px-6 shadow rounded-lg">
          <Auth
            supabaseClient={supabase}
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: '#4f46e5',
                    brandAccent: '#4338ca',
                  },
                },
              },
            }}
            providers={['google', 'github']}
            redirectTo={`${window.location.origin}/auth/callback`}
            showLinks={true}
            view="sign_in"
          />
        </div>
      </div>
    </div>
  );
}
