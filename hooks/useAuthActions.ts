import { useAuth } from '@/contexts/AuthContext';
import { getSupabaseBrowserClient } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

interface AuthResponse<T = any> {
    success: boolean;
    data?: T;
    error?: string;
}

export function useAuthActions() {
    const { setUser, setProfile } = useAuth();
    const router = useRouter();

    const signOut = async (): Promise<AuthResponse> => {
        try {
            // Call server-side logout to clear cookies properly
            const response = await fetch('/api/auth/logout', {
                method: 'POST',
            });

            if (!response.ok) {
                return {
                    success: false,
                    error: 'Failed to sign out',
                };
            }

            // Clear context state
            setUser(null);
            setProfile(null);

            router.push('/');
            router.refresh();

            return {
                success: true,
            };
        } catch (error) {
            console.error('Sign out error:', error);
            return {
                success: false,
                error: 'Network error. Please try again.',
            };
        }
    };

    const resetPassword = async (email: string): Promise<AuthResponse> => {
        try {
            const supabase = getSupabaseBrowserClient();
            const { error } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: `${window.location.origin}/reset-password`,
            });

            if (error) {
                return {
                    success: false,
                    error: 'Failed to send password reset email',
                };
            }

            return {
                success: true,
            };
        } catch (error) {
            console.error('Reset password error:', error);
            return {
                success: false,
                error: error instanceof Error ? error.message : 'Password reset failed',
            };
        }
    };

    return {
        signOut,
        resetPassword,
    };
}