"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface PerformanceCardProps {
  title: string
  value: string | number
  subtitle?: string
  trend?: {
    value: number
    label: string
  }
  icon?: React.ReactNode
  variant?: "default" | "success" | "warning" | "error"
  className?: string
}

const PerformanceCard = React.forwardRef<HTMLDivElement, PerformanceCardProps>(
  ({ title, value, subtitle, trend, icon, variant = "default", className, ...props }, ref) => {
    const variantStyles = {
      default: "border-gray-200 bg-gradient-to-br from-gray-50 to-gray-100",
      success: "border-green-200 bg-gradient-to-br from-green-50 to-emerald-50",
      warning: "border-yellow-200 bg-gradient-to-br from-yellow-50 to-amber-50",
      error: "border-red-200 bg-gradient-to-br from-red-50 to-rose-50",
    }

    const getTrendColor = (value: number) => {
      if (value > 0) return "text-green-600 bg-green-100"
      if (value < 0) return "text-red-600 bg-red-100"
      return "text-gray-600 bg-gray-100"
    }

    return (
      <Card ref={ref} className={cn(variantStyles[variant], className)} {...props}>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-600">{title}</h3>
            {icon && <div className="text-gray-400">{icon}</div>}
          </div>

          <div className="space-y-2">
            <div className="text-3xl font-bold text-gray-900">{value}</div>

            {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}

            {trend && (
              <Badge className={cn("text-xs", getTrendColor(trend.value))}>
                {trend.value > 0 ? "+" : ""}
                {trend.value}% {trend.label}
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>
    )
  },
)
PerformanceCard.displayName = "PerformanceCard"

export { PerformanceCard }
