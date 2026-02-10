import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const Tabs = TabsPrimitive.Root

const tabsListVariants = cva(
  "inline-flex items-center justify-center p-1 rounded-[20px] bg-muted/20 gap-2",
  {
    variants: {
      size: {
        large: "h-14 px-2",
        medium: "h-11 px-1.5",
        small: "h-8 px-1",
      },
    },
    defaultVariants: {
      size: "medium",
    },
  }
)

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List> & VariantProps<typeof tabsListVariants>
>(({ className, size, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(tabsListVariants({ size, className }))}
    {...props}
  />
))
TabsList.displayName = TabsPrimitive.List.displayName

const tabsTriggerVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap px-6 transition-all duration-200 rounded-[16px] peer",
  {
    variants: {
      size: {
        large: "h-10 text-[16px]",
        medium: "h-8 text-[14px]",
        small: "h-6 text-[12px]",
      },
    },
    defaultVariants: {
      size: "medium",
    },
  }
)

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> & { size?: "large" | "medium" | "small" }
>(({ className, size = "medium", ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      tabsTriggerVariants({ size }),
      "font-inter font-medium text-[color-mix(in_srgb,var(--primary),transparent_40%)]",
      "hover:outline hover:outline-1 hover:outline-primary/20",
      "data-[state=active]:bg-[#052940] data-[state=active]:text-white dark:data-[state=active]:bg-[#DBF227] dark:data-[state=active]:text-[#052940]",
      "data-[state=active]:font-poppins data-[state=active]:font-bold data-[state=active]:outline-none",
      className
    )}
    {...props}
  />
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-4 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    )}
    {...props}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent }
