import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const poppins = Poppins({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    variable: "--font-display",
});

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
            <body className={`${inter.variable} ${poppins.variable} font-sans antialiased text-inter`}>
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
