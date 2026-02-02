'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AuthLayout } from '@/components/auth/auth-layout';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('http://localhost:8080/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) throw new Error('Invalid email or password');

      const data = await res.json();

      // Save JWT for later API calls
      localStorage.setItem('token', data.token);
      localStorage.setItem('role', data.role);

      if (data.role === 'wholesaler') {
        router.push('/wholesaler/dashboard');
      } else if (data.role === 'retailer') {
        router.push('/retailer/marketplace');
      } else {
        router.push('/dashboard');
      }
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="mb-8 text-center lg:text-left">
        <Link href="/" className="inline-flex items-center text-sm text-zinc-500 hover:text-zinc-900 mb-8 transition-colors">
          ← Back to home
        </Link>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="w-12 h-12 bg-zinc-900 rounded-xl flex items-center justify-center mb-6 mx-auto lg:mx-0 shadow-lg">
            <span className="text-white font-bold text-xl">T</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 mb-2">Welcome back</h1>
          <p className="text-zinc-500">Enter your details to access your account.</p>
        </motion.div>
      </div>

      <motion.div className="space-y-6">
        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm border border-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Logging in...' : 'Sign in'}
          </Button>
        </form>

        <p className="text-center text-sm text-zinc-600">
          Don't have an account?{' '}
          <Link href="/auth/signup" className="text-blue-600 hover:underline">
            Sign up
          </Link>
        </p>
      </motion.div>
    </AuthLayout>
  );
}
