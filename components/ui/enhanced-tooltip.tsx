"use client"

import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"
import { cn } from "@/lib/utils"

const EnhancedTooltipProvider = TooltipPrimitive.Provider

const EnhancedTooltip = TooltipPrimitive.Root

const EnhancedTooltipTrigger = TooltipPrimitive.Trigger

const EnhancedTooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content> & {
    variant?: "default" | "success" | "warning" | "error"
  }
>(({ className, sideOffset = 4, variant = "default", ...props }, ref) => {
  const variantStyles = {
    default: "bg-primary text-primary-foreground",
    success: "bg-green-600 text-white",
    warning: "bg-yellow-600 text-white",
    error: "bg-red-600 text-white",
  }

  return (
    <TooltipPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "z-50 overflow-hidden rounded-md px-3 py-1.5 text-sm shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        variantStyles[variant],
        className,
      )}
      {...props}
    />
  )
})
EnhancedTooltipContent.displayName = TooltipPrimitive.Content.displayName

export { EnhancedTooltip, EnhancedTooltipTrigger, EnhancedTooltipContent, EnhancedTooltipProvider }
