"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface FloatingActionButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left"
  size?: "sm" | "md" | "lg"
  variant?: "default" | "primary" | "secondary"
}

const FloatingActionButton = React.forwardRef<HTMLButtonElement, FloatingActionButtonProps>(
  ({ className, position = "bottom-right", size = "md", variant = "primary", ...props }, ref) => {
    const positionStyles = {
      "bottom-right": "bottom-6 right-6",
      "bottom-left": "bottom-6 left-6",
      "top-right": "top-6 right-6",
      "top-left": "top-6 left-6",
    }

    const sizeStyles = {
      sm: "h-12 w-12",
      md: "h-14 w-14",
      lg: "h-16 w-16",
    }

    const variantStyles = {
      default: "bg-background text-foreground border shadow-lg hover:shadow-xl",
      primary:
        "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl",
      secondary:
        "bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white shadow-lg hover:shadow-xl",
    }

    return (
      <Button
        ref={ref}
        className={cn(
          "fixed z-50 rounded-full transition-all duration-200 hover:scale-110 active:scale-95",
          positionStyles[position],
          sizeStyles[size],
          variantStyles[variant],
          className,
        )}
        {...props}
      />
    )
  },
)
FloatingActionButton.displayName = "FloatingActionButton"

export { FloatingActionButton }
