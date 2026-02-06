import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const cardVariants = cva(
    "rounded-xl border bg-surface text-foreground transition-all overflow-hidden",
    {
        variants: {
            variant: {
                default: "border-border shadow-sm",
                interactive: "border-border hover:border-primary/30 hover:shadow-lg hover:-translate-y-0.5 cursor-pointer transition-all duration-300",
                accent: "border-accent/20 bg-accent/5 backdrop-blur-sm shadow-sm",
            },
            padding: {
                none: "p-0",
                sm: "p-4",
                md: "p-6",
                lg: "p-8", // 24px as per spec (close to p-6 = 24px)
            },
        },
        defaultVariants: {
            variant: "default",
            padding: "lg", // User spec: 24px padding
        },
    }
);

export interface CardProps
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> { }

const Card = React.forwardRef<HTMLDivElement, CardProps>(
    ({ className, variant, padding, ...props }, ref) => (
        <div
            ref={ref}
            className={cn(cardVariants({ variant, padding, className }))}
            {...props}
        />
    )
);
Card.displayName = "Card";

export { Card, cardVariants };
