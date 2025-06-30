'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getSupabaseBrowserClient } from '@/lib/supabase';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [tokenReady, setTokenReady] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const supabase = getSupabaseBrowserClient();

  useEffect(() => {
    const hash = window.location.hash;

    // Ensure access_token and type=recovery are present
    if (hash.includes('access_token') && hash.includes('type=recovery')) {
      setTokenReady(true);
    } else {
      setError('Invalid or missing password reset token.');
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setIsLoading(true);

    if (typeof window === "undefined") return;
  const { supabase } = await import("@/lib/supabase-browser");
  const { error: updateError } = await supabase.auth.updateUser({ password });

    if (updateError) {
      setError(updateError.message || 'Failed to reset password.');
    } else {
      setMessage('Password reset successful. Redirecting to login...');
      setTimeout(() => router.push('/login'), 2000);
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-900 p-6 rounded-lg shadow">
        <h1 className="text-xl font-semibold mb-4 text-center">Reset Your Password</h1>

        {!tokenReady && !error && (
          <p className="text-sm text-gray-500 text-center">Validating token...</p>
        )}

        {error && <p className="text-sm text-red-600 mb-4 text-center">{error}</p>}

        {tokenReady && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                type="password"
                placeholder="New password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div>
              <Input
                type="password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            {message && (
              <p className="text-sm text-green-600 text-center">{message}</p>
            )}

            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                'Reset Password'
              )}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
