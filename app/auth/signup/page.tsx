'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AuthLayout } from '@/components/auth/auth-layout';
import Link from 'next/link';
import { motion } from 'framer-motion';

type UserRole = 'retailer' | 'wholesaler';

export default function SignupPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phone: '',
    business_name: '',
    location: '',
    role: 'retailer' as UserRole,
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('http://localhost:8080/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('Failed to create account');

      router.push('/auth/login');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      {/* UI remains same — form below */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Role Selection */}
        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => setFormData({ ...formData, role: 'retailer' })}
            className={`p-4 border rounded-xl ${formData.role === 'retailer' ? 'border-blue-600' : ''}`}
          >
            Retailer
          </button>
          <button
            type="button"
            onClick={() => setFormData({ ...formData, role: 'wholesaler' })}
            className={`p-4 border rounded-xl ${formData.role === 'wholesaler' ? 'border-green-600' : ''}`}
          >
            Wholesaler
          </button>
        </div>

        <Input placeholder="Full Name" value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })} />

        <Input placeholder="Phone" value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />

        <Input placeholder="Business Name" value={formData.business_name}
          onChange={(e) => setFormData({ ...formData, business_name: e.target.value })} />

        <Input placeholder="Location" value={formData.location}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })} />

        <Input type="email" placeholder="Email" value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })} />

        <Input type="password" placeholder="Password" value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })} />

        <Button type="submit" disabled={loading}>
          {loading ? 'Creating Account...' : 'Create Account'}
        </Button>

        <p className="text-center text-sm">
          Already have an account? <Link href="/auth/login">Log in</Link>
        </p>
      </form>
    </AuthLayout>
  );
}
