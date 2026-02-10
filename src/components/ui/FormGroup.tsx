import * as React from "react";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface FormGroupProps extends React.HTMLAttributes<HTMLDivElement> {
    label?: string;
    htmlFor?: string;
    children: React.ReactNode;
}

export function FormGroup({ label, htmlFor, children, className, ...props }: FormGroupProps) {
    return (
        <div className={cn("flex flex-col space-y-2", className)} {...props}>
            {label && (
                <Label htmlFor={htmlFor} className="text-sm font-semibold text-foreground">
                    {label}
                </Label>
            )}
            {children}
        </div>
    );
}
