import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
    title: "ORDEX - Design System",
    description: "Visual DNA of ORDEX Architecture",
};

import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { DashboardLayout } from "@/components/shared/DashboardLayout";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${inter.variable} ${outfit.variable} font-sans antialiased text-inter`}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="light"
                    enableSystem
                    disableTransitionOnChange
                >
                    <DashboardLayout>
                        {children}
                    </DashboardLayout>
                </ThemeProvider>
            </body>
        </html>
    );
}
