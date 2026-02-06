// 'use client';

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { AuthLayout } from '@/components/auth/auth-layout';
// import Link from 'next/link';
// import { motion } from 'framer-motion';

// export default function LoginPage() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const router = useRouter();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError('');
//     setLoading(true);

//     try {
//       const res = await fetch('http://localhost:8080/auth/login', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email, password }),
//       });

//       if (!res.ok) throw new Error('Invalid email or password');

//       const data = await res.json();

//       // Save JWT for later API calls
//       localStorage.setItem('token', data.token);
//       localStorage.setItem('role', data.role);

//       if (data.role === 'wholesaler') {
//         router.push('/wholesaler/dashboard');
//       } else if (data.role === 'retailer') {
//         router.push('/retailer/marketplace');
//       } else {
//         router.push('/dashboard');
//       }
//     } catch (err: any) {
//       setError(err.message);
//       setLoading(false);
//     }
//   };

//   return (
//     <AuthLayout>
//       <div className="mb-8 text-center lg:text-left">
//         <Link href="/" className="inline-flex items-center text-sm text-zinc-500 hover:text-zinc-900 mb-8 transition-colors">
//           ← Back to home
//         </Link>
//         <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
//           <div className="w-12 h-12 bg-zinc-900 rounded-xl flex items-center justify-center mb-6 mx-auto lg:mx-0 shadow-lg">
//             <span className="text-white font-bold text-xl">T</span>
//           </div>
//           <h1 className="text-3xl font-bold tracking-tight text-zinc-900 mb-2">Welcome back</h1>
//           <p className="text-zinc-500">Enter your details to access your account.</p>
//         </motion.div>
//       </div>

//       <motion.div className="space-y-6">
//         {error && (
//           <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm border border-red-100">
//             {error}
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div className="space-y-2">
//             <Label htmlFor="email">Email</Label>
//             <Input
//               id="email"
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="password">Password</Label>
//             <Input
//               id="password"
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>

//           <Button type="submit" className="w-full" disabled={loading}>
//             {loading ? 'Logging in...' : 'Sign in'}
//           </Button>
//         </form>

//         <p className="text-center text-sm text-zinc-600">
//           Don't have an account?{' '}
//           <Link href="/auth/signup" className="text-blue-600 hover:underline">
//             Sign up
//           </Link>
//         </p>
//       </motion.div>
//     </AuthLayout>
//   );
// }

// 'use client';

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';
// import { motion } from 'framer-motion';

// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { AuthLayout } from '@/components/auth/auth-layout';
// import { useAuth } from '@/lib/auth-context';


// export default function LoginPage() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const router = useRouter();
//   const { signIn } = useAuth();


//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError('');
//     setLoading(true);

//     try {
//       const res = await fetch('http://localhost:8080/auth/login', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email, password }),
//       });

//       if (!res.ok) throw new Error('Invalid email or password');

//       const data = await res.json();
//       localStorage.setItem('token', data.token);
//       localStorage.setItem('role', data.role);

//           router.replace('/dashboard'); 

//     } catch (err: any) {
//       setError(err.message || 'Login failed');
//       setLoading(false);
//     }
//   };

//   return (
//     <AuthLayout>
//       {/* BACK TO HOME */}
//       <div className="mb-6">
//         <Link
//           href="/"
//           className="group inline-flex items-center gap-1 text-sm font-medium text-zinc-500 transition-all duration-300 hover:text-blue-600"
//         >
//           <span className="transform transition-transform duration-300 group-hover:-translate-x-1">
//             ←
//           </span>
//           <span className="relative">
//             Back to home
//             <span className="absolute left-0 -bottom-0.5 h-px w-0 bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-300 group-hover:w-full" />
//           </span>
//         </Link>
//       </div>

//       {/* GLASS CARD */}
//       <motion.div
//         initial={{ opacity: 0, y: 30 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6, ease: 'easeOut' }}
//         className="relative rounded-3xl p-8 bg-white/65 backdrop-blur-2xl border border-white/50 shadow-[0_20px_60px_rgba(0,0,0,0.15)]"
//       >
//         {/* glow */}
//         <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-blue-400/20 via-indigo-400/20 to-purple-400/20 blur-xl -z-10" />

//         {/* HEADER */}
//         <motion.div
//           initial={{ opacity: 0, y: 10 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="mb-8 text-center lg:text-left"
//         >
//           <div className="w-12 h-12 bg-zinc-900 rounded-xl flex items-center justify-center mb-6 mx-auto lg:mx-0 shadow-lg">
//             <span className="text-white font-bold text-xl">T</span>
//           </div>
//           <h1 className="text-3xl font-bold tracking-tight text-zinc-900 mb-2">
//             Welcome back
//           </h1>
//           <p className="text-zinc-500">
//             Enter your details to access your account.
//           </p>
//         </motion.div>

//         {error && (
//           <div className="bg-red-50/80 text-red-600 p-3 rounded-xl text-sm border border-red-200 mb-4">
//             {error}
//           </div>
//         )}

//         {/* FORM */}
//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div className="space-y-1">
//             <Label className="text-zinc-700 text-sm font-medium">
//               Email
//             </Label>
//             <Input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//               className="h-11 rounded-xl bg-white/70 backdrop-blur-md border-zinc-300 focus:bg-white focus:ring-2 focus:ring-blue-500/30 transition"
//             />
//           </div>

//           <div className="space-y-1">
//             <Label className="text-zinc-700 text-sm font-medium">
//               Password
//             </Label>
//             <Input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               className="h-11 rounded-xl bg-white/70 backdrop-blur-md border-zinc-300 focus:bg-white focus:ring-2 focus:ring-blue-500/30 transition"
//             />
//           </div>

//           <Button
//             type="submit"
//             disabled={loading}
//             className="w-full h-12 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-semibold shadow-xl hover:scale-[1.02] transition-all"
//           >
//             {loading ? 'Logging in…' : 'Sign in'}
//           </Button>
//         </form>

//         <p className="text-center text-sm text-zinc-600 mt-6">
//           Don&apos;t have an account?{' '}
//           <Link
//             href="/auth/signup"
//             className="text-blue-600 hover:underline font-medium"
//           >
//             Sign up
//           </Link>
//         </p>
//       </motion.div>
//     </AuthLayout>
//   );
// }



// 'use client';

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';
// import { motion } from 'framer-motion';

// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { AuthLayout } from '@/components/auth/auth-layout';
// import { useAuth } from '@/lib/auth-context';

// export default function LoginPage() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);

//   const router = useRouter();
//   const { signIn } = useAuth();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError('');
//     setLoading(true);

//     try {
//       // ✅ ONLY THIS LINE MATTERS
//       await signIn(email, password);

//       // ✅ AuthProvider now has user + role
//       router.replace('/dashboard');
//     } catch (err: any) {
//       setError(err.message || 'Login failed');
//       setLoading(false);
//     }
//   };

//   return (
//     <AuthLayout>
//       {/* BACK TO HOME */}
//       <div className="mb-6">
//         <Link
//           href="/"
//           className="group inline-flex items-center gap-1 text-sm font-medium text-zinc-500 transition-all duration-300 hover:text-blue-600"
//         >
//           <span className="transform transition-transform duration-300 group-hover:-translate-x-1">
//             ←
//           </span>
//           <span className="relative">
//             Back to home
//             <span className="absolute left-0 -bottom-0.5 h-px w-0 bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-300 group-hover:w-full" />
//           </span>
//         </Link>
//       </div>

//       {/* GLASS CARD */}
//       <motion.div
//         initial={{ opacity: 0, y: 30 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6, ease: 'easeOut' }}
//         className="relative rounded-3xl p-8 bg-white/65 backdrop-blur-2xl border border-white/50 shadow-[0_20px_60px_rgba(0,0,0,0.15)]"
//       >
//         {/* glow */}
//         <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-blue-400/20 via-indigo-400/20 to-purple-400/20 blur-xl -z-10" />

//         {/* HEADER */}
//         <motion.div
//           initial={{ opacity: 0, y: 10 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="mb-8 text-center lg:text-left"
//         >
//           <div className="w-12 h-12 bg-zinc-900 rounded-xl flex items-center justify-center mb-6 mx-auto lg:mx-0 shadow-lg">
//             <span className="text-white font-bold text-xl">T</span>
//           </div>
//           <h1 className="text-3xl font-bold tracking-tight text-zinc-900 mb-2">
//             Welcome back
//           </h1>
//           <p className="text-zinc-500">
//             Enter your details to access your account.
//           </p>
//         </motion.div>

//         {error && (
//           <div className="bg-red-50/80 text-red-600 p-3 rounded-xl text-sm border border-red-200 mb-4">
//             {error}
//           </div>
//         )}

//         {/* FORM */}
//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div className="space-y-1">
//             <Label className="text-zinc-700 text-sm font-medium">Email</Label>
//             <Input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//               className="h-11 rounded-xl bg-white/70 backdrop-blur-md border-zinc-300 focus:bg-white focus:ring-2 focus:ring-blue-500/30 transition"
//             />
//           </div>

//           <div className="space-y-1">
//             <Label className="text-zinc-700 text-sm font-medium">Password</Label>
//             <Input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               className="h-11 rounded-xl bg-white/70 backdrop-blur-md border-zinc-300 focus:bg-white focus:ring-2 focus:ring-blue-500/30 transition"
//             />
//           </div>

//           <Button
//             type="submit"
//             disabled={loading}
//             className="w-full h-12 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-semibold shadow-xl hover:scale-[1.02] transition-all"
//           >
//             {loading ? 'Logging in…' : 'Sign in'}
//           </Button>
//         </form>

//         <p className="text-center text-sm text-zinc-600 mt-6">
//           Don&apos;t have an account?{' '}
//           <Link href="/auth/signup" className="text-blue-600 hover:underline font-medium">
//             Sign up
//           </Link>
//         </p>
//       </motion.div>
//     </AuthLayout>
//   );
// }


// 'use client';

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';
// import { motion } from 'framer-motion';

// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { AuthLayout } from '@/components/auth/auth-layout';
// import { useAuth } from '@/lib/auth-context';

// export default function LoginPage() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);

//   const router = useRouter();
//   const { signIn } = useAuth();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError('');
//     setLoading(true);

//     try {
//       await signIn(email, password);
//       router.replace('/dashboard');
//     } catch (err: any) {
//       setError(err.message || 'Login failed');
//       setLoading(false);
//     }
//   };

//   return (
//     <AuthLayout>
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="max-w-md mx-auto p-8 rounded-2xl bg-white shadow-xl"
//       >
//         <h1 className="text-2xl font-bold mb-6">Login</h1>

//         {error && (
//           <div className="mb-4 p-3 text-sm bg-red-100 text-red-600 rounded">
//             {error}
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <Label>Email</Label>
//             <Input value={email} onChange={e => setEmail(e.target.value)} />
//           </div>

//           <div>
//             <Label>Password</Label>
//             <Input
//               type="password"
//               value={password}
//               onChange={e => setPassword(e.target.value)}
//             />
//           </div>

//           <Button className="w-full" disabled={loading}>
//             {loading ? 'Logging in...' : 'Login'}
//           </Button>
//         </form>

//         <p className="mt-4 text-sm text-center">
//           Don’t have an account?{' '}
//           <Link href="/auth/signup" className="text-blue-600">
//             Sign up
//           </Link>
//         </p>
//       </motion.div>
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
import { useAuth } from '@/lib/auth-context';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { signIn } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signIn(email, password);
      router.replace('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Login failed');
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      {/* Background glow */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-500/10 via-indigo-500/10 to-purple-500/10 blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative max-w-md mx-auto p-8 rounded-3xl
                   bg-white/70 backdrop-blur-2xl
                   border border-white/40
                   shadow-[0_20px_60px_rgba(0,0,0,0.15)]"
      >
        {/* Gradient border glow */}
        <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-blue-400/30 via-indigo-400/30 to-purple-400/30 blur-xl -z-10" />

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8 text-center"
        >
          <div className="w-14 h-14 mx-auto mb-4 rounded-2xl
                          bg-gradient-to-br from-blue-600 to-indigo-600
                          flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-2xl">T</span>
          </div>

          <h1 className="text-3xl font-bold tracking-tight
                         bg-clip-text text-transparent
                         bg-gradient-to-r from-zinc-900 via-zinc-700 to-zinc-900">
            Welcome back
          </h1>

          <p className="text-zinc-500 mt-2">
            Sign in to continue to your dashboard
          </p>
        </motion.div>

        {/* Error */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-5 p-3 rounded-xl text-sm
                       bg-red-50/80 text-red-600
                       border border-red-200"
          >
            {error}
          </motion.div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-1">
            <Label className="text-sm font-medium text-zinc-700">
              Email
            </Label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="h-11 rounded-xl
                         bg-white/60 backdrop-blur-md
                         border-zinc-300
                         focus:bg-white
                         focus:ring-2 focus:ring-blue-500/30
                         transition"
            />
          </div>

          <div className="space-y-1">
            <Label className="text-sm font-medium text-zinc-700">
              Password
            </Label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="h-11 rounded-xl
                         bg-white/60 backdrop-blur-md
                         border-zinc-300
                         focus:bg-white
                         focus:ring-2 focus:ring-blue-500/30
                         transition"
            />
          </div>

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 rounded-xl
                         bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600
                         text-white font-semibold
                         shadow-xl
                         hover:shadow-2xl
                         transition-all"
            >
              {loading ? 'Logging in…' : 'Sign in'}
            </Button>
          </motion.div>
        </form>

        {/* Footer */}
        <p className="mt-6 text-sm text-center text-zinc-600">
          Don&apos;t have an account?{' '}
          <Link
            href="/auth/signup"
            className="font-medium text-blue-600 hover:underline"
          >
            Sign up
          </Link>
        </p>
      </motion.div>
    </AuthLayout>
  );
}

