import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
    "inline-flex items-center justify-center font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
    {
        variants: {
            variant: {
                // Primary: Navy bg/White text (Light) → Lime bg/Black text (Dark)
                primary: "bg-primary text-primary-foreground hover:opacity-90 shadow-sm",
                // Accent: Lime bg/Navy text (Light) → Navy bg/Lime text (Dark)
                accent: "bg-accent text-accent-foreground hover:opacity-90 shadow-sm",
                // Outline: 1px mode-aware border
                outline: "border border-border bg-transparent text-foreground hover:bg-muted",
                // Ghost: Minimal
                ghost: "text-foreground/60 hover:text-foreground hover:bg-muted",
            },
            size: {
                sm: "h-8 px-4 text-xs rounded-lg", // 32px
                default: "h-[42px] px-6 text-sm rounded-xl", // 42px
                lg: "h-14 px-8 text-base rounded-xl", // 56px
                icon: "h-10 w-10 rounded-xl",
            },
        },
        defaultVariants: {
            variant: "primary",
            size: "default",
        },
    }
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> { }

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, ...props }, ref) => {
        return (
            <button
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            />
        );
    }
);
Button.displayName = "Button";

export { Button, buttonVariants };
