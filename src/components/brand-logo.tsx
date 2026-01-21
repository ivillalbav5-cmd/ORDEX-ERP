"use client";

import Image from "next/image";

export function BrandLogo() {
    return (
        <div className="relative h-[58px] w-[140px] flex items-center justify-center -translate-y-0.5">
            {/* Light Mode Logo */}
            <Image
                src="/ordex-logo-light.png"
                alt="ORDEX"
                fill
                className="object-contain dark:hidden"
                priority
            />
            {/* Dark Mode Logo */}
            <Image
                src="/ordex-logo.png"
                alt="ORDEX"
                fill
                className="object-contain hidden dark:block"
                priority
            />
        </div>
    );
}
