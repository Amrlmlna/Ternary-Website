import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { createClient } from '@supabase/supabase-js';
import { useUser } from '@supabase/auth-helpers-react';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function DeviceAuthPage() {
  const [userCode, setUserCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const user = useUser();
  const router = useRouter();

  // Auto-fill code from URL if provided
  useEffect(() => {
    if (router.query.user_code) {
      setUserCode(router.query.user_code as string);
    }
  }, [router.query]);

  const handleAuthorize = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      setError('Please sign in first to authorize the device');
      return;
    }

    if (!userCode.trim()) {
      setError('Please enter the device code');
      return;
    }

    setLoading(true);
    setError('');
    setMessage('');

    try {
      // Find the device code record and approve it
      const { data: deviceRecord, error: fetchError } = await supabase
        .from('device_codes')
        .select('*')
        .eq('user_code', userCode.trim().toUpperCase())
        .single();

      if (fetchError || !deviceRecord) {
        setError('Invalid or expired device code');
        setLoading(false);
        return;
      }

      // Check if expired
      if (new Date(deviceRecord.expires_at) < new Date()) {
        setError('Device code has expired');
        setLoading(false);
        return;
      }

      // Check if already approved
      if (deviceRecord.user_id) {
        setError('Device code has already been used');
        setLoading(false);
        return;
      }

      // Approve the device code
      const { error: updateError } = await supabase
        .from('device_codes')
        .update({
          user_id: user.id,
          approved_at: new Date().toISOString(),
        })
        .eq('user_code', userCode.trim().toUpperCase());

      if (updateError) {
        console.error('Update error:', updateError);
        setError('Failed to authorize device');
        setLoading(false);
        return;
      }

      // Ensure user profile exists
      const { error: profileError } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          email: user.email,
          updated_at: new Date().toISOString(),
        });

      if (profileError) {
        console.error('Profile error:', profileError);
      }

      setMessage('Device authorized successfully! You can now close this page and return to the app.');
      setUserCode('');
    } catch (error) {
      console.error('Authorization error:', error);
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Sign in to authorize device
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              You need to be signed in to authorize a device
            </p>
          </div>
          <div className="text-center">
            <button
              onClick={() => {
                const currentUrl = window.location.href;
                const redirectUrl = `/auth/signin?redirect_to=${encodeURIComponent('/auth/callback?device_redirect=true')}`;
                router.push(redirectUrl);
              }}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Authorize Device
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Enter the code displayed in your Ternary app
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleAuthorize}>
          <div>
            <label htmlFor="user-code" className="sr-only">
              Device Code
            </label>
            <input
              id="user-code"
              name="user-code"
              type="text"
              required
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm text-center font-mono text-lg"
              placeholder="Enter 6-character code"
              value={userCode}
              onChange={(e) => setUserCode(e.target.value.toUpperCase())}
              maxLength={6}
            />
          </div>

          {error && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="text-sm text-red-700">{error}</div>
            </div>
          )}

          {message && (
            <div className="rounded-md bg-green-50 p-4">
              <div className="text-sm text-green-700">{message}</div>
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={loading || !userCode.trim()}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {loading ? 'Authorizing...' : 'Authorize Device'}
            </button>
          </div>
        </form>

        <div className="text-center text-sm text-gray-500">
          Signed in as: {user.email}
        </div>
      </div>
    </div>
  );
}
