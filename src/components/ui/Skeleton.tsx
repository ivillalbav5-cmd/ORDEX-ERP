import { cn } from "@/lib/utils";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> { }

export function Skeleton({ className, ...props }: SkeletonProps) {
    return (
        <div
            className={cn(
                "animate-pulse rounded-[16px] bg-[#E2E8F0] dark:bg-[color-mix(in_srgb,#DBF227,transparent_80%)] relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/50 dark:before:via-[#DBF227]/10 before:to-transparent",
                className
            )}
            {...props}
        />
    );
}
