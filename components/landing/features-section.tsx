// "use client";

// import React from 'react';
// import { motion } from 'framer-motion';
// import { ShieldCheck, Zap, Globe, Lock, BarChart3, Search } from 'lucide-react';
// import { SpotlightCard } from './spotlight-card';

// export function FeaturesSection() {
//     return (
//         <section id="features" className="py-32 relative">
//             <div className="container mx-auto px-6 max-w-7xl">
//                 <div className="mb-24 text-center">
//                     <motion.h2
//                         initial={{ opacity: 0, y: 20 }}
//                         whileInView={{ opacity: 1, y: 0 }}
//                         viewport={{ once: true }}
//                         className="text-4xl md:text-6xl font-bold mb-8 tracking-tight"
//                     >
//                         Everything you need to <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">scale without limits.</span>
//                     </motion.h2>
//                     <p className="text-white/50 text-xl max-w-2xl mx-auto font-light leading-relaxed">
//                         We've replaced the fragmented, manual sourcing workflow with a single, intelligent operating system designed for modern brands.
//                     </p>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                     {[
//                         {
//                             icon: ShieldCheck,
//                             title: "Bank-Grade Escrow",
//                             desc: "Your funds are held securely in a licensed escrow account. Release payments only when you're satisfied with the goods.",
//                             color: "text-green-400"
//                         },
//                         {
//                             icon: Zap,
//                             title: "AI Supplier Matching",
//                             desc: "Our proprietary AI analyzes millions of data points to instantly connect you with manufacturers that match your exact specs.",
//                             color: "text-blue-400"
//                         },
//                         {
//                             icon: Globe,
//                             title: "End-to-End Logistics",
//                             desc: "From factory floor to your warehouse door. We handle customs, freight, and last-mile delivery with real-time tracking.",
//                             color: "text-purple-400"
//                         },
//                         {
//                             icon: Search,
//                             title: "Deep Vetting",
//                             desc: "We physically inspect factories and verify business licenses. Only the top 1% of manufacturers make it onto Tradigoo.",
//                             color: "text-orange-400"
//                         },
//                         {
//                             icon: Lock,
//                             title: "Smart Contracts",
//                             desc: "Automatically generate legally binding contracts that protect your IP and enforce quality standards.",
//                             color: "text-pink-400"
//                         },
//                         {
//                             icon: BarChart3,
//                             title: "Market Intelligence",
//                             desc: "Access real-time commodity pricing and manufacturing trends to negotiate better deals with data-backed confident.",
//                             color: "text-cyan-400"
//                         }
//                     ].map((feature, i) => (
//                         <motion.div
//                             key={i}
//                             initial={{ opacity: 0, y: 20 }}
//                             whileInView={{ opacity: 1, y: 0 }}
//                             viewport={{ once: true }}
//                             transition={{ delay: i * 0.1 }}
//                             whileHover={{ y: -8 }}
//                             className="h-full"
//                         >
//                             <SpotlightCard className="rounded-3xl p-10 h-full">
//                                 <div className={`h-14 w-14 rounded-2xl bg-black/5 dark:bg-white/5 ring-1 ring-black/5 dark:ring-white/10 flex items-center justify-center mb-8 ${feature.color}`}>
//                                     <feature.icon className="h-7 w-7" />
//                                 </div>
//                                 <h3 className="text-2xl font-bold mb-4 text-foreground dark:text-white tracking-tight">{feature.title}</h3>
//                                 <p className="text-muted-foreground dark:text-white/50 leading-relaxed text-lg">
//                                     {feature.desc}
//                                 </p>
//                             </SpotlightCard>
//                         </motion.div>
//                     ))}
//                 </div>
//             </div>
//         </section>
//     );
// }


// "use client";

// import React from "react";
// import { motion } from "framer-motion";
// import {
//   ShieldCheck,
//   Zap,
//   Globe,
//   Lock,
//   BarChart3,
//   Search,
// } from "lucide-react";
// import { SpotlightCard } from "./spotlight-card";

// export function FeaturesSection() {
//   return (
//     <section id="features" className="py-32 relative">
//       <div className="container mx-auto px-6 max-w-7xl">
//         {/* HEADER */}
//         <div className="mb-24 text-center">
//           <motion.h2
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             className="text-4xl md:text-6xl font-bold mb-8 tracking-tight text-foreground"
//           >
//             Everything you need to <br />
//             <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500">
//               scale without limits.
//             </span>
//           </motion.h2>

//           <p className="text-muted-foreground text-xl max-w-2xl mx-auto font-light leading-relaxed">
//             We've replaced fragmented sourcing workflows with a single,
//             intelligent operating system for modern brands.
//           </p>
//         </div>

//         {/* FEATURES GRID */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {[
//             {
//               icon: ShieldCheck,
//               title: "Bank-Grade Escrow",
//               desc: "Your funds are held securely in licensed escrow accounts. Release payments only when goods meet expectations.",
//               color: "from-emerald-400 to-green-500",
//             },
//             {
//               icon: Zap,
//               title: "AI Supplier Matching",
//               desc: "Our AI analyzes millions of data points to match you with manufacturers that fit your exact needs.",
//               color: "from-blue-400 to-indigo-500",
//             },
//             {
//               icon: Globe,
//               title: "End-to-End Logistics",
//               desc: "From factory floor to warehouse door — customs, freight, and real-time tracking handled.",
//               color: "from-purple-400 to-indigo-500",
//             },
//             {
//               icon: Search,
//               title: "Deep Vetting",
//               desc: "Factories are physically inspected and verified. Only the top 1% make it onto Tradigoo.",
//               color: "from-orange-400 to-amber-500",
//             },
//             {
//               icon: Lock,
//               title: "Smart Contracts",
//               desc: "Legally binding contracts that protect IP, enforce quality, and reduce disputes automatically.",
//               color: "from-pink-400 to-rose-500",
//             },
//             {
//               icon: BarChart3,
//               title: "Market Intelligence",
//               desc: "Real-time pricing and manufacturing trends help you negotiate smarter, data-driven deals.",
//               color: "from-cyan-400 to-sky-500",
//             },
//           ].map((feature, i) => (
//             <motion.div
//               key={i}
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ delay: i * 0.08 }}
//               whileHover={{ y: -10 }}
//               className="relative h-full"
//             >
//               {/* BLUE GLOW */}
//               <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-blue-400/20 via-indigo-400/20 to-purple-400/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />

//               <SpotlightCard className="relative group rounded-3xl p-10 h-full bg-white/65 backdrop-blur-2xl border border-white/50 shadow-[0_20px_60px_rgba(0,0,0,0.12)] transition-all">
//                 {/* ICON */}
//                 <div
//                   className={`h-14 w-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-8 shadow-lg`}
//                 >
//                   <feature.icon className="h-7 w-7 text-white" />
//                 </div>

//                 {/* TITLE */}
//                 <h3 className="text-2xl font-bold mb-4 tracking-tight text-zinc-900">
//                   {feature.title}
//                 </h3>

//                 {/* DESCRIPTION */}
//                 <p className="text-zinc-600 leading-relaxed text-lg">
//                   {feature.desc}
//                 </p>
//               </SpotlightCard>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }


"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Zap,
  Globe,
  Lock,
  BarChart3,
  Search,
} from "lucide-react";
import { SpotlightCard } from "./spotlight-card";

export function FeaturesSection() {
  return (
    <section id="features" className="py-32 relative">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* HEADER */}
        <div className="mb-24 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-bold mb-8 tracking-tight text-zinc-500"
          >
            Everything you need to <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-indigo-100 to-sky-500">
              scale without limits.
            </span>
          </motion.h2>

          <p className="text-zinc-600 text-xl max-w-2xl mx-auto font-light leading-relaxed">
            One intelligent operating system to source, verify, pay, and scale —
            without friction.
          </p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: ShieldCheck,
              title: "Bank-Grade Escrow",
              desc: "Funds are secured until delivery is confirmed. Zero risk, full transparency.",
            },
            {
              icon: Zap,
              title: "AI Supplier Matching",
              desc: "AI connects you with manufacturers that meet your exact specs instantly.",
            },
            {
              icon: Globe,
              title: "End-to-End Logistics",
              desc: "We manage customs, freight, and delivery with real-time tracking.",
            },
            {
              icon: Search,
              title: "Deep Vetting",
              desc: "Factories are physically inspected. Only the top 1% are approved.",
            },
            {
              icon: Lock,
              title: "Smart Contracts",
              desc: "Auto-generated contracts protect your IP and quality standards.",
            },
            {
              icon: BarChart3,
              title: "Market Intelligence",
              desc: "Live pricing and demand trends help you negotiate smarter deals.",
            },
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -10 }}
              className="relative group"
            >
              {/* BLUE GLOW */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-blue-500/30 via-indigo-500/30 to-sky-500/30 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* BLUE GLASS CARD */}
              <SpotlightCard className="relative rounded-3xl p-10 h-full bg-blue-500/10 backdrop-blur-2xl border border-blue-500/20 shadow-[0_20px_60px_rgba(59,130,246,0.25)] transition-all">
                
                {/* ICON */}
                <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mb-8 shadow-lg shadow-blue-500/40">
                  <feature.icon className="h-7 w-7 text-white" />
                </div>

                {/* TITLE */}
                <h3 className="text-2xl font-bold mb-4 tracking-tight text-zinc-10">
                  {feature.title}
                </h3>

                {/* DESC */}
                <p className="text-zinc-500 leading-relaxed text-lg">
                  {feature.desc}
                </p>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
