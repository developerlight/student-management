'use client';

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    const supabase = createClientComponentClient();

    useEffect(() => {
        const getUser = async () => {
            setLoading(true);
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);
            setLoading(false);
        };

        getUser();
    }, []);



    useEffect(() => {
        if (user) {
            console.log('Redirecting to /admin');
            router.push('/admin');
        }
    }, [user, router]);

    const handleSignUp = async () => {
        const res = await supabase.auth.signUp({
            email,
            password,
            options: {
                emailRedirectTo: `${location.origin}/auth/callback`,
            }
        });

        if (res.error) {
            console.error('Sign up error:', res.error.message);
            return;
        }

        console.log('res', res);
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
        if (sessionError) {
            console.error('Session error:', sessionError.message);
        } else {
            console.log('Session data:', sessionData);
        }
        setUser(res.data.user);
        setEmail('');
        setPassword('');
        router.refresh();
    };

    const handleSignIn = async () => {
        const res = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (res.error) {
            console.error('Login error:', res.error.message);
            return;
        }

        console.log('res login', res);

        setUser(res.data.user);
        setEmail('');
        setPassword('');
        router.refresh();
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.refresh();
        setUser(null);
    }

    // console.log({loading, user});
    if (loading) {
        return <div className="flex items-center justify-center h-screen bg-gray-800">Loading...</div>;
    }

    return (
        <main className="h-screen flex items-center justify-center bg-gradient-to-br from-gray-800 via-gray-900 to-black">
            <div className="bg-gray-800 p-8 rounded-lg shadow-2xl w-full max-w-md">
                <h2 className="text-3xl font-bold text-white text-center mb-6">Welcome Back</h2>
                <p className="text-gray-400 text-center mb-8">Please sign in or create an account</p>
                <div className="space-y-4">
                    <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email Address"
                        className="w-full p-3 rounded-lg border border-gray-700 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className="w-full p-3 rounded-lg border border-gray-700 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mt-6 space-y-4">
                    <button
                        onClick={handleSignIn}
                        className="w-full p-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                    >
                        Sign In
                    </button>
                    <button
                        onClick={handleSignUp}
                        className="w-full p-3 rounded-lg bg-gray-700 text-white font-semibold hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-300"
                    >
                        Sign Up
                    </button>
                </div>
                <p className="text-gray-500 text-center mt-6 text-sm">
                    By signing in, you agree to our{" "}
                    <a href="#" className="text-blue-500 hover:underline">
                        Terms of Service
                    </a>{" "}
                    and{" "}
                    <a href="#" className="text-blue-500 hover:underline">
                        Privacy Policy
                    </a>.
                </p>
            </div>
        </main>
    );
}

export default Login;