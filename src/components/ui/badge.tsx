import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center justify-center transition-all focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground shadow-sm hover:bg-primary/90",
        secondary:
          "border-border bg-background text-foreground hover:bg-muted/50",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline: "border-border text-foreground bg-transparent",
        dot: "min-w-[8px] h-[8px] p-0 rounded-full border-transparent bg-primary",
        // UI Guardian: Status variants — WCAG AA dual-mode contrast
        success:
          "border-transparent bg-emerald-100 text-emerald-800 dark:bg-emerald-500/15 dark:text-emerald-300",
        warning:
          "border-transparent bg-amber-100 text-amber-800 dark:bg-amber-500/15 dark:text-amber-300",
        info:
          "border-transparent bg-sky-100 text-sky-800 dark:bg-sky-500/15 dark:text-sky-300",
        neutral:
          "border-transparent bg-slate-200/70 text-slate-700 dark:bg-slate-500/15 dark:text-slate-300",
      },
      size: {
        default: "min-w-[18px] h-[18px] px-1 rounded-full text-[10px] font-bold font-inter",
        dot: "w-2 h-2 p-0 rounded-full",
      },
      overlap: {
        true: "absolute -top-1 -right-1 translate-x-1/2 -translate-y-1/2 border-2 border-background",
        false: "",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      overlap: false,
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof badgeVariants> {
  count?: number;
  max?: number;
}

function Badge({ className, variant, size, overlap, count, max = 99, children, ...props }: BadgeProps) {
  const displayValue = count !== undefined ? (count > max ? `${max}+` : count) : children;

  return (
    <div
      className={cn(badgeVariants({ variant: variant === 'dot' ? 'dot' : variant, size: variant === 'dot' ? 'dot' : size, overlap }), className)}
      {...props}
    >
      {variant !== 'dot' && displayValue}
    </div>
  )
}


export { Badge, badgeVariants }
