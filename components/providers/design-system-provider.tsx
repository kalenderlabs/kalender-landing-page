"use client"

import type React from "react"
import { KalenderProvider } from "@cerneo/kalender-ui"
import { useTheme } from "next-themes"

export function DesignSystemProvider({ children }: { children: React.ReactNode }) {
  const { theme, resolvedTheme } = useTheme()
  const appearance =
    theme === "dark" || theme === "light"
      ? theme
      : resolvedTheme === "dark" || resolvedTheme === "light"
        ? resolvedTheme
        : "system"

  return (
    <KalenderProvider appearance={appearance} density="comfortable">
      {children}
    </KalenderProvider>
  )
}
