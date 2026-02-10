"use client";

import * as React from "react";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
    const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

    return (
        <div className="min-h-screen bg-background text-foreground flex transition-colors">
            {/* Desktop Sidebar */}
            <div className="hidden lg:block">
                <React.Suspense fallback={null}>
                    <Sidebar
                        collapsed={sidebarCollapsed}
                        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
                    />
                </React.Suspense>
            </div>

            {/* Mobile Drawer (Overlay) */}
            {mobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-primary/40 backdrop-blur-sm z-[60] lg:hidden"
                    onClick={() => setMobileMenuOpen(false)}
                />
            )}

            {/* Mobile Sidebar */}
            <div className={cn(
                "fixed inset-y-0 left-0 w-72 z-[70] transition-transform duration-300 lg:hidden",
                mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
            )}>
                <React.Suspense fallback={null}>
                    <Sidebar
                        collapsed={false}
                        onToggle={() => setMobileMenuOpen(false)}
                    />
                </React.Suspense>
            </div>

            {/* Main Content Area */}
            <main className={cn(
                "flex-1 flex flex-col min-w-0 transition-all duration-300 h-screen overflow-hidden",
                sidebarCollapsed ? "lg:ml-20" : "lg:ml-72"
            )}>
                {/* Topbar without extra horizontal padding or margins */}
                <div className="w-full">
                    <Topbar />
                </div>

                {/* Dashboard Content - Full fluid area */}
                <div className="flex-1 overflow-auto scroll-smooth">
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 h-full">
                        {children}
                    </div>
                </div>
            </main>
        </div>
    );
}
