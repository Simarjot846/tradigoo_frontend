"use client";

import React from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ThemeToggle } from '@/components/theme-toggle';
import { AuroraBackground } from '@/components/landing/aurora-background';
import { SectionSkeleton } from '@/components/landing/section-skeleton';

// ✅ Proper dynamic loading with skeletons
const FeaturesSection = dynamic(
  () => import('@/components/landing/features-section').then(mod => mod.FeaturesSection),
  { loading: () => <SectionSkeleton /> }
);

const CTASection = dynamic(
  () => import('@/components/landing/cta-section').then(mod => mod.CTASection),
  { loading: () => <SectionSkeleton /> }
);

const Footer = dynamic(
  () => import('@/components/landing/footer').then(mod => mod.Footer),
  { loading: () => <SectionSkeleton /> }
);

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground dark:text-white overflow-x-hidden transition-colors duration-300">

      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-white/80 dark:bg-black/40 backdrop-blur-xl">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center font-bold text-2xl text-white">T</div>
            <span className="text-2xl font-bold">Tradigoo</span>
          </div>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link href="/auth/login" className="hidden sm:block text-sm">Log in</Link>
            <Button asChild className="rounded-full px-8">
              <Link href="/auth/signup">Get Started</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative pt-40 pb-32 px-6 overflow-hidden">
        <AuroraBackground />

        {/* 👇 important for fast paint before motion loads */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>

          <div className="container mx-auto max-w-6xl text-center relative z-10">

            <Badge className="mb-6 bg-blue-500 text-white">New V2.0</Badge>

            <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-8">
              Sourcing <span className="text-blue-600">Reimagined.</span>
            </h1>

            <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
              AI-powered platform connecting retailers directly with verified manufacturers.
            </p>

            <div className="flex gap-6 justify-center">
              <Button asChild size="lg" className="h-16 px-10 rounded-full">
                <Link href="/auth/signup">
                  Start Sourcing
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>

              <Button asChild size="lg" variant="outline" className="h-16 px-10 rounded-full">
                <Link href="#features">Watch Demo</Link>
              </Button>
            </div>

          </div>
        </motion.div>
      </section>

      {/* TRUST BAR */}
      <section className="py-16 border-y border-zinc-200 dark:border-white/5 bg-zinc-50/50 dark:bg-white/[0.01]">
        <div className="container mx-auto px-6 text-center">
          <p className="text-sm text-zinc-500">Trusted by 2,000+ modern teams</p>
        </div>
      </section>

      {/* LAZY SECTIONS WITH PERFECT SKELETON */}
      <FeaturesSection />
      <CTASection />
      <Footer />

    </div>
  );
}
