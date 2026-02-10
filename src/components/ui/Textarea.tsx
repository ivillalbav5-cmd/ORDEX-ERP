"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps
    extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label: string;
    helperText?: string;
    state?: "default" | "error" | "success";
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ className, label, helperText, state = "default", id, placeholder = " ", ...props }, ref) => {
        return (
            <div className="space-y-1.5 w-full">
                <div className="relative group">
                    <textarea
                        id={id}
                        className={cn(
                            "peer block w-full px-4 pt-6 pb-2 text-sm font-medium bg-surface text-foreground border rounded-[16px] appearance-none focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-transparent font-inter min-h-[120px] resize-none",
                            state === "default" && "border-input-border focus:border-primary dark:border-input-border dark:focus:border-primary",
                            state === "error" && "border-input-error-border bg-input-error-bg dark:bg-input-error-bg/10 text-foreground focus:border-input-error-border focus:ring-input-error-border/10",
                            state === "success" && "border-input-success-border bg-input-success-bg dark:bg-input-success-bg/10 text-foreground focus:border-input-success-border focus:ring-input-success-border/10",
                            className
                        )}
                        placeholder={placeholder}
                        ref={ref}
                        {...props}
                    />
                    <label
                        htmlFor={id}
                        className={cn(
                            "absolute text-[11px] font-semibold tracking-wide duration-200 transform -translate-y-3.5 top-5 z-10 origin-[0] left-4 transition-all",
                            "peer-placeholder-shown:text-[13px] peer-placeholder-shown:translate-y-0 peer-placeholder-shown:font-medium peer-placeholder-shown:tracking-normal",
                            "peer-focus:text-[11px] peer-focus:-translate-y-3.5 peer-focus:font-semibold peer-focus:tracking-wide text-muted-foreground",
                            state === "default" ? "peer-focus:text-primary" :
                                state === "error" ? "text-input-error-border" : "text-input-success-border"
                        )}
                    >
                        {label}
                    </label>
                </div>
                {helperText && (
                    <p className={cn(
                        "text-xs font-medium pl-1",
                        state === "error" ? "text-input-error-border" :
                            state === "success" ? "text-input-success-border" : "text-muted-foreground opacity-70"
                    )}>
                        {helperText}
                    </p>
                )}
            </div>
        );
    }
);
Textarea.displayName = "Textarea";

export { Textarea };
