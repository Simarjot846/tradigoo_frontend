// 'use client';

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { AuthLayout } from '@/components/auth/auth-layout';
// import Link from 'next/link';
// import { motion } from 'framer-motion';

// type UserRole = 'retailer' | 'wholesaler';

// export default function SignupPage() {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//     name: '',
//     phone: '',
//     business_name: '',
//     location: '',
//     role: 'retailer' as UserRole,
//   });

//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const router = useRouter();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError('');
//     setLoading(true);

//     try {
//       const res = await fetch('http://localhost:8080/auth/register', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(formData),
//       });

//       if (!res.ok) throw new Error('Failed to create account');

//       router.push('/auth/login');
//     } catch (err: any) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <AuthLayout>
//       {/* UI remains same — form below */}
//       <form onSubmit={handleSubmit} className="space-y-5">
//         {/* Role Selection */}
//         <div className="grid grid-cols-2 gap-4">
//           <button
//             type="button"
//             onClick={() => setFormData({ ...formData, role: 'retailer' })}
//             className={`p-4 border rounded-xl ${formData.role === 'retailer' ? 'border-blue-600' : ''}`}
//           >
//             Retailer
//           </button>
//           <button
//             type="button"
//             onClick={() => setFormData({ ...formData, role: 'wholesaler' })}
//             className={`p-4 border rounded-xl ${formData.role === 'wholesaler' ? 'border-green-600' : ''}`}
//           >
//             Wholesaler
//           </button>
//         </div>

//         <Input placeholder="Full Name" value={formData.name}
//           onChange={(e) => setFormData({ ...formData, name: e.target.value })} />

//         <Input placeholder="Phone" value={formData.phone}
//           onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />

//         <Input placeholder="Business Name" value={formData.business_name}
//           onChange={(e) => setFormData({ ...formData, business_name: e.target.value })} />

//         <Input placeholder="Location" value={formData.location}
//           onChange={(e) => setFormData({ ...formData, location: e.target.value })} />

//         <Input type="email" placeholder="Email" value={formData.email}
//           onChange={(e) => setFormData({ ...formData, email: e.target.value })} />

//         <Input type="password" placeholder="Password" value={formData.password}
//           onChange={(e) => setFormData({ ...formData, password: e.target.value })} />

//         <Button type="submit" disabled={loading}>
//           {loading ? 'Creating Account...' : 'Create Account'}
//         </Button>

//         <p className="text-center text-sm">
//           Already have an account? <Link href="/auth/login">Log in</Link>
//         </p>
//       </form>
//     </AuthLayout>
//   );
// }


'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AuthLayout } from '@/components/auth/auth-layout';

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

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Failed to create account');
      }

      router.push('/auth/login');
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      heroContent={
        <>
          <h1 className="text-5xl font-bold text-white mb-6 tracking-tight leading-tight">
            Grow your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-green-400 to-teal-400">
              Business
            </span>{' '}
            today.
          </h1>
          <p className="text-white/60 text-lg mb-8 max-w-md">
            Join Tradigoo and unlock wholesale prices directly from trusted manufacturers.
          </p>
        </>
      }
    >
      <div className="mb-6">
  <Link
    href="/"
    className="group inline-flex items-center gap-1 text-sm font-medium text-zinc-500 transition-all duration-300 hover:text-blue-600"
  >
    <span className="transform transition-transform duration-300 group-hover:-translate-x-1">
      ←
    </span>
    <span className="relative">
      Back to home
      <span className="absolute left-0 -bottom-0.5 h-px w-0 bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-300 group-hover:w-full" />
    </span>
  </Link>
</div>


      {/* GLASS CARD */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative rounded-3xl p-8 bg-white/65 backdrop-blur-2xl border border-white/50 shadow-[0_20px_60px_rgba(0,0,0,0.15)]"
      >
        {/* glow */}
        <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-blue-400/20 via-indigo-400/20 to-purple-400/20 blur-xl -z-10" />

        {error && (
          <div className="bg-red-50/80 text-red-600 p-3 rounded-xl text-sm border border-red-200 mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* ROLE SWITCH */}
          <div className="grid grid-cols-2 gap-4 relative">
            {(['retailer', 'wholesaler'] as UserRole[]).map((role) => {
              const active = formData.role === role;

              return (
                <motion.button
                  key={role}
                  type="button"
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setFormData({ ...formData, role })}
                  className={`
                    relative rounded-2xl px-5 py-4 text-left transition-all
                    backdrop-blur-xl border
                    ${
                      active
                        ? 'bg-gradient-to-br from-blue-500/25 to-indigo-500/25 border-blue-500 text-blue-700 shadow-lg'
                        : 'bg-white/50 border-white/60 text-zinc-600 hover:bg-blue-50/70'
                    }
                  `}
                >
                  {active && (
                    <span className="absolute inset-0 rounded-2xl ring-2 ring-blue-500/40 animate-pulse" />
                  )}
                  <div className="relative z-10">
                    <div className="font-semibold capitalize">{role}</div>
                    <div className="text-xs opacity-70">
                      {role === 'retailer'
                        ? 'Buy products at wholesale prices'
                        : 'Sell products to retailers'}
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* INPUTS */}
          {[
            ['name', 'Full Name'],
            ['phone', 'Phone'],
            ['business_name', 'Business Name'],
            ['location', 'Location'],
            ['email', 'Email'],
          ].map(([key, label]) => (
            <div key={key} className="space-y-1">
              <Label className="text-zinc-700 text-sm font-medium">
                {label}
              </Label>
              <Input
                className="h-11 rounded-xl bg-white/70 backdrop-blur-md border-zinc-300 focus:bg-white focus:ring-2 focus:ring-blue-500/30 transition"
                required
                value={(formData as any)[key]}
                onChange={(e) =>
                  setFormData({ ...formData, [key]: e.target.value })
                }
              />
            </div>
          ))}

          {/* PASSWORD */}
          <div className="space-y-1">
            <Label className="text-zinc-700 text-sm font-medium">
              Password
            </Label>
            <Input
              type="password"
              className="h-11 rounded-xl bg-white/70 backdrop-blur-md border-zinc-300 focus:bg-white focus:ring-2 focus:ring-blue-500/30 transition"
              required
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </div>

          {/* SUBMIT */}
          <Button
            type="submit"
            disabled={loading}
            className="w-full h-12 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-semibold shadow-xl hover:scale-[1.02] transition-all"
          >
            {loading ? 'Creating Account…' : 'Create Account'}
          </Button>
        </form>

        <p className="text-center text-sm text-zinc-600 mt-6">
          Already have an account?{' '}
          <Link href="/auth/login" className="text-blue-600 hover:underline font-medium">
            Log in
          </Link>
        </p>
      </motion.div>
    </AuthLayout>
  );
}
