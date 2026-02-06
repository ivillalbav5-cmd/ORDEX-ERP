"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const inputVariants = cva(
    "peer block w-full px-4 pt-6 pb-2 text-sm font-medium bg-surface border rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-transparent",
    {
        variants: {
            state: {
                default: "border-border focus:border-primary",
                error: "border-red-400 bg-red-50 dark:bg-red-900/20 text-red-600 focus:border-red-500 focus:ring-red-500/20",
                success: "border-green-400 bg-green-50 dark:bg-green-900/20 text-green-600 focus:border-green-500 focus:ring-green-500/20",
            },
        },
        defaultVariants: {
            state: "default",
        },
    }
);

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
    label: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, state, label, id, placeholder = " ", ...props }, ref) => {
        return (
            <div className="relative group">
                <input
                    id={id}
                    className={cn(inputVariants({ state, className }))}
                    placeholder={placeholder}
                    ref={ref}
                    {...props}
                />
                <label
                    htmlFor={id}
                    className={cn(
                        "absolute text-xs font-medium duration-200 transform -translate-y-3 scale-90 top-4 z-10 origin-[0] left-4 transition-all",
                        "peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-sm",
                        "peer-focus:scale-90 peer-focus:-translate-y-3",
                        state === "default" ? "text-muted-foreground peer-focus:text-primary" :
                            state === "error" ? "text-red-500" : "text-green-500"
                    )}
                >
                    {label}
                </label>
            </div>
        );
    }
);
Input.displayName = "Input";

export { Input };
