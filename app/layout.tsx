// import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
// import "./globals.css";

// import { ThemeProvider } from "@/components/theme-provider";
// import { AuthProvider } from "@/lib/auth-context";
// import { RoleThemeProvider } from "@/lib/theme-context";
// import { CartProvider } from "@/lib/cart-context";

// import { Chatbot } from "@/components/chatbot";
// import { Toaster } from "@/components/ui/sonner";
// import { ThemePersistence } from "@/components/theme-persistence";
// import ClientNavbar from "@/components/client-navbar";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// export const metadata: Metadata = {
//   title: "Tradigoo - Smart B2B Trading Platform",
//   description: "AI-powered secure B2B transaction platform for Indian retailers",
// };

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en" suppressHydrationWarning>
//       <body
//         className={`${geistSans.variable} ${geistMono.variable} antialiased`}
//       >
//         <ThemeProvider
//           attribute="class"
//           defaultTheme="dark"
//           enableSystem
//           disableTransitionOnChange
//         >
//           <AuthProvider>
//             <RoleThemeProvider>
//               <CartProvider>

//                 {/* ✅ Navbar (client side safe) */}
//                 <ClientNavbar />

//                 <ThemePersistence />

//                 {children}

//                 <Chatbot />
//                 <Toaster />

//               </CartProvider>
//             </RoleThemeProvider>
//           </AuthProvider>
//         </ThemeProvider>
//       </body>
//     </html>
//   );
// }



// import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
// import "./globals.css";
// import { AuthProvider } from "@/lib/auth-context";
// import { ChatbotWrapper } from "@/components/chatbot-wrapper";
// import { Toaster } from "@/components/ui/sonner";
// import { ThemeProvider } from "@/components/theme-provider";
// import { RoleThemeProvider } from "@/lib/theme-context";
// import { Navbar } from "@/components/navbar";
// import { ThemePersistence } from "@/components/theme-persistence";
// import { CartProvider } from "@/lib/cart-context";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
//   display: "swap",
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
//   display: "swap",
// });

// export const metadata: Metadata = {
//   title: "Tradigoo - Smart B2B Trading Platform",
//   description: "AI-powered secure B2B transaction platform for Indian retailers",
// };

// import { Suspense } from "react";

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en" suppressHydrationWarning>
//       <body
//         className={`${geistSans.variable} ${geistMono.variable} antialiased`}
//       >
//         <AuthProvider>
//           <ThemeProvider
//             attribute="class"
//             defaultTheme="dark"
//             enableSystem
//             disableTransitionOnChange
//           >
//             <CartProvider>
//               <RoleThemeProvider>
//                 <Suspense fallback={<div className="h-[72px] w-full bg-white dark:bg-[#0a0a0a]" />}>
//                   <Navbar />
//                 </Suspense>
//                 <ThemePersistence />
//                 {children}
//               </RoleThemeProvider>
//             </CartProvider>
//             <ChatbotWrapper />
//             <Toaster />
//           </ThemeProvider>
//         </AuthProvider>
//       </body>
//     </html>
//   );
// }



import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { AuthProvider } from "@/lib/auth-context";
import { CartProvider } from "@/lib/cart-context";
import { RoleThemeProvider } from "@/lib/theme-context";

import { ThemeProvider } from "@/components/theme-provider";
import { ThemePersistence } from "@/components/theme-persistence";
import { Navbar } from "@/components/navbar";
import { ChatbotWrapper } from "@/components/chatbot-wrapper";
import { Toaster } from "@/components/ui/sonner";

import { Suspense } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tradigoo - Smart B2B Trading Platform",
  description: "AI-powered secure B2B transaction platform for Indian retailers",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <CartProvider>
              <RoleThemeProvider>
                {/* ✅ Navbar only in Suspense */}
                <Suspense
                  fallback={
                    <div className="h-[106px] w-full bg-white dark:bg-[#0a0a0a] border-b border-zinc-200 dark:border-white/5" />
                  }
                >
                  <Navbar />
                </Suspense>

                {/* ✅ Theme persistence AFTER navbar */}
                <ThemePersistence />

                {/* ✅ Page content */}
                <main>{children}</main>
              </RoleThemeProvider>
            </CartProvider>

            {/* Global UI */}
            <ChatbotWrapper />
            <Toaster />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
