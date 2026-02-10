"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";

// ─── Ordex Smart Input ───────────────────────────────────────────────
// Typography: Inter only. Value 15px/400, Label 11px/500, Placeholder 15px/400/50%
// Layout: Flexbox, min-h-56px, pt-20px pb-8px px-16px
// Border: 1px #E2E8F0 default → 2px #052940 focus
// Label: translateY(-12px) 150ms ease-out

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    helperText?: string;
    leftElement?: React.ReactNode;
    rightElement?: React.ReactNode;
    isLoading?: boolean;
    state?: "default" | "error" | "success";
    variant?: "default" | "search";
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, state = "default", variant = "default", label, helperText, id, placeholder = " ", leftElement, rightElement, isLoading = false, ...props }, ref) => {
        const isSearch = variant === "search";

        const finalRightElement = isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin text-[color-mix(in_srgb,#052940,transparent_60%)]" />
        ) : rightElement;

        const isReadOnly = isLoading || props.readOnly;

        return (
            <div className="w-full space-y-1.5 font-inter">
                {/* ── Input Container ── */}
                <div
                    className={cn(
                        // Layout: flexbox, no fixed height
                        "relative w-full flex items-center",
                        "min-h-[56px] rounded-[16px] overflow-hidden",
                        // Padding
                        isSearch ? "px-4" : "px-[16px]",
                        // Border: 1px default → 2px focus (no shadows)
                        "border transition-all duration-150",
                        // Search variant bg
                        isSearch && "bg-white dark:bg-muted/10",
                        // State borders
                        state === "default" && "border-[#E2E8F0] focus-within:border-[2px] focus-within:border-[#052940] dark:border-border dark:focus-within:border-primary",
                        state === "error" && "border-[2px] border-red-500 bg-red-50/50 dark:bg-red-500/5 dark:border-red-400",
                        state === "success" && "border-[2px] border-emerald-500 bg-emerald-50/30 dark:bg-emerald-500/5 dark:border-emerald-400",
                        className
                    )}
                >
                    {/* Left Icon */}
                    {leftElement && (
                        <div className="mr-3 flex-shrink-0 flex items-center self-center text-[color-mix(in_srgb,#052940,transparent_50%)] dark:text-muted-foreground">
                            {leftElement}
                        </div>
                    )}

                    {/* ── Input + Floating Label wrapper ── */}
                    <div className="relative flex-1 flex flex-col justify-center">
                        {/* The input field */}
                        <input
                            id={id}
                            className={cn(
                                // Typography: 15px / Regular (400) / #052940
                                "peer block w-full bg-transparent font-inter appearance-none focus:outline-none",
                                "text-[15px] font-normal text-[#052940] dark:text-foreground",
                                // Padding to clear label space
                                label && !isSearch ? "pt-[20px] pb-[8px]" : "py-[16px]",
                                // Placeholder: 15px / 400 / 50% opacity
                                isSearch
                                    ? "placeholder:text-[#052940]/50 dark:placeholder:text-muted-foreground placeholder:font-normal"
                                    : "placeholder:text-transparent"
                            )}
                            placeholder={placeholder}
                            ref={ref}
                            readOnly={isReadOnly}
                            disabled={isLoading}
                            {...props}
                        />

                        {/* Floating Label */}
                        {label && !isSearch && (
                            <label
                                htmlFor={id}
                                className={cn(
                                    // Base: absolute positioned, pointer-events-none
                                    "absolute left-0 pointer-events-none origin-left",
                                    // Animation: 150ms ease-out
                                    "transition-all duration-150 ease-out",
                                    // Floated state (default): 11px / Medium (500)
                                    "text-[11px] font-medium -translate-y-[12px]",
                                    "text-[color-mix(in_srgb,#052940,transparent_40%)] dark:text-muted-foreground",
                                    // Resting state (placeholder shown): 15px / Regular (400) / centered
                                    "peer-placeholder-shown:text-[15px] peer-placeholder-shown:font-normal peer-placeholder-shown:translate-y-0",
                                    "peer-placeholder-shown:text-[#052940]/50 peer-placeholder-shown:dark:text-muted-foreground",
                                    // Focused: back to floated
                                    "peer-focus:text-[11px] peer-focus:font-medium peer-focus:-translate-y-[12px]",
                                    "peer-focus:text-[color-mix(in_srgb,#052940,transparent_40%)] peer-focus:dark:text-primary",
                                    // Filled (not placeholder shown): floated
                                    "peer-[:not(:placeholder-shown)]:text-[11px] peer-[:not(:placeholder-shown)]:font-medium peer-[:not(:placeholder-shown)]:-translate-y-[12px]",
                                    // State overrides
                                    state === "error" && "text-[#052940] peer-focus:text-[#052940]",
                                    state === "success" && "text-emerald-600 peer-focus:text-emerald-600 dark:text-emerald-400 dark:peer-focus:text-emerald-400"
                                )}
                            >
                                {label}
                            </label>
                        )}
                    </div>

                    {/* Right Icon / State Icons */}
                    {(finalRightElement || state !== "default") && (
                        <div className="ml-3 flex-shrink-0 flex items-center self-center">
                            {state === "error" && <AlertCircle className="h-[18px] w-[18px] text-red-500 dark:text-red-400" />}
                            {state === "success" && <CheckCircle2 className="h-[18px] w-[18px] text-emerald-500 dark:text-emerald-400" />}
                            {state === "default" && finalRightElement}
                        </div>
                    )}
                </div>

                {/* Helper Text: 12px / Regular (400) */}
                {helperText && (
                    <p className={cn(
                        "text-[12px] font-normal font-inter px-1",
                        state === "error" ? "text-[#052940] dark:text-red-300" :
                            state === "success" ? "text-emerald-600 dark:text-emerald-400" :
                                "text-[color-mix(in_srgb,#052940,transparent_40%)] dark:text-muted-foreground"
                    )}>
                        {helperText}
                    </p>
                )}
            </div>
        );
    }
);
Input.displayName = "Input";

export { Input };
