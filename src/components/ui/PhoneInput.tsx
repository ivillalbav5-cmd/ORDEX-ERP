"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/Input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export interface PhoneInputProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    countries: { code: string; label: string; flag: string; dial: string }[];
    defaultCountry?: string;
    id?: string;
    className?: string;
    helperText?: string;
    state?: "default" | "error" | "success";
}

export function PhoneInput({
    label,
    value,
    onChange,
    countries,
    defaultCountry = "AR",
    id,
    className,
    helperText,
    state = "default"
}: PhoneInputProps) {
    const [country, setCountry] = React.useState(defaultCountry);

    return (
        <div className={cn("flex flex-col gap-1.5 w-full", className)}>
            <div className="flex gap-2">
                <div className="w-[120px] shrink-0">
                    <Select value={country} onValueChange={setCountry}>
                        <SelectTrigger className="h-[56px] rounded-[16px] border-border bg-surface font-semibold font-inter pt-4">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl border-border bg-card">
                            {countries.map((c) => (
                                <SelectItem key={c.code} value={c.code}>
                                    <div className="flex items-center gap-2">
                                        <span>{c.flag}</span>
                                        <span>{c.dial}</span>
                                    </div>
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex-1">
                    <Input
                        id={id}
                        label={label}
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        placeholder="1234 5678"
                        state={state}
                        helperText={helperText}
                    />
                </div>
            </div>
        </div>
    );
}
