import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/lib/auth-context";
import { RoleThemeProvider } from "@/lib/theme-context";
import { CartProvider } from "@/lib/cart-context";

import { Chatbot } from "@/components/chatbot";
import { Toaster } from "@/components/ui/sonner";
import { ThemePersistence } from "@/components/theme-persistence";
import ClientNavbar from "@/components/client-navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <RoleThemeProvider>
              <CartProvider>

                {/* ✅ Navbar (client side safe) */}
                <ClientNavbar />

                <ThemePersistence />

                {children}

                <Chatbot />
                <Toaster />

              </CartProvider>
            </RoleThemeProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
