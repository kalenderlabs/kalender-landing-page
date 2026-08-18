"use client"

import type React from "react"
import { KalenderProvider } from "@cerneo/kalender-ui"
import { useTheme } from "next-themes"

export function DesignSystemProvider({ children }: { children: React.ReactNode }) {
  const { resolvedTheme } = useTheme()
  const appearance = resolvedTheme === "dark" ? "dark" : resolvedTheme === "light" ? "light" : "system"

  return (
    <KalenderProvider appearance={appearance} density="comfortable">
      {children}
    </KalenderProvider>
  )
}
