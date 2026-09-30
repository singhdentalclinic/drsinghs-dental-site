'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';

export default function ReceptionistLoginPage() {
    const supabase = createClient();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = async (event) => {
        event.preventDefault();

        setLoading(true);
        setError('');

        try {
            const {
                data,
                error: loginError,
            } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (loginError) {
                throw loginError;
            }

            console.log('Login successful:', data.user);

            const {
                data: sessionData,
            } = await supabase.auth.getSession();

            console.log(
                'Session after login:',
                sessionData.session
            );

            /*
             * Use full navigation so the next
             * server request includes the auth cookie.
             */
            window.location.href = '/receptionist';
        } catch (err) {
            console.error(
                'Receptionist login error:',
                err
            );

            setError(
                err?.message ||
                'Unable to sign in. Please check your email and password.'
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-background flex items-center justify-center px-4 py-20">
            <div className="w-full max-w-md bg-white rounded-xl shadow-elevation-lg p-6 md:p-8">
                <div className="text-center mb-8">
                    <h1 className="text-2xl md:text-3xl font-semibold text-text-primary">
                        Receptionist Login
                    </h1>

                    <p className="text-text-secondary mt-2">
                        Singh Dental Clinic
                    </p>
                </div>

                {error && (
                    <div className="mb-5 bg-red-50 border border-red-200 rounded-lg p-4 text-sm text-red-700">
                        {error}
                    </div>
                )}

                <form
                    onSubmit={handleLogin}
                    className="space-y-5"
                >
                    <div>
                        <label className="block text-sm font-medium text-text-primary mb-2">
                            Email
                        </label>

                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(event) =>
                                setEmail(event.target.value)
                            }
                            autoComplete="email"
                            className="w-full px-4 py-3 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-text-primary mb-2">
                            Password
                        </label>

                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(event) =>
                                setPassword(event.target.value)
                            }
                            autoComplete="current-password"
                            className="w-full px-4 py-3 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full px-5 py-3 bg-primary text-primary-foreground rounded-md font-semibold hover:bg-primary/90 disabled:opacity-50"
                    >
                        {loading
                            ? 'Signing in...'
                            : 'Sign In'}
                    </button>
                </form>
            </div>
        </div>
    );
}