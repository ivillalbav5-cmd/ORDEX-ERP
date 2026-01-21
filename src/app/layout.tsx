"use client";

import { useState } from 'react';
import { Inter, Figtree } from "next/font/google";
import Image from "next/image";
import "./globals.css";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeProvider } from "@/components/theme-provider";

import {
  LayoutDashboard,
  Users,
  X
} from 'lucide-react';
import { Navbar } from "@/components/navbar";
import { BrandLogo } from "@/components/brand-logo";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
  display: "swap",
});

// ... existing imports

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();

  const getLinkClasses = (path: string) => {
    const isActive = path === '/' ? pathname === '/' : pathname?.startsWith(path);
    // Use semantic colors for active/inactive states
    const baseClasses = "flex items-center gap-3.5 rounded-xl px-5 py-3.5 text-sm font-semibold transition-all duration-200";
    const activeClasses = "bg-primary text-primary-foreground shadow-lg shadow-primary/10 hover:scale-[1.02] active:scale-95";
    const inactiveClasses = "text-muted-foreground hover:bg-secondary hover:text-primary hover:pl-6";

    return `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`;
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${figtree.variable} font-sans antialiased bg-background text-foreground`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex h-screen overflow-hidden">
            {/* Sidebar Overlay */}
            {isSidebarOpen && (
              <div
                className="fixed inset-0 z-20 bg-black/50 md:hidden"
                onClick={() => setIsSidebarOpen(false)}
              />
            )}

            {/* Sidebar */}
            {/* Sidebar */}
            <aside className={`
              fixed inset-y-0 left-0 z-30 flex w-64 flex-col bg-card border-r border-border shadow-xl md:shadow-none transition-transform duration-300 ease-in-out md:static md:translate-x-0
              ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
              <div className="relative flex h-20 items-center justify-center px-6 border-b border-border/40">
                <div className="px-6 py-3">
                  <BrandLogo />
                </div>
                <button
                  className="absolute right-4 md:hidden p-2 rounded-full hover:bg-muted text-muted-foreground transition-colors"
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <nav className="flex-1 overflow-y-auto px-6 py-6 space-y-3">
                <Link
                  href="/"
                  className={getLinkClasses('/')}
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <LayoutDashboard className="h-5 w-5" />
                  Dashboard
                </Link>
                <Link
                  href="/clients"
                  className={getLinkClasses('/clients')}
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <Users className="h-5 w-5" />
                  Clientes
                </Link>

  <Link
                  href="/clients"
                  className={getLinkClasses('/clients')}
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <Users className="h-5 w-5" />
                  Test Call
                </Link>

              </nav>
            </aside>

            {/* Main Content */}
            <div className="flex flex-1 flex-col overflow-hidden">
              {/* Topbar */}
              <Navbar onMenuClick={() => setIsSidebarOpen(true)} />

              {/* Page Content */}
              <main className="flex-1 overflow-y-auto px-8 py-8">
                {children}
              </main>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
