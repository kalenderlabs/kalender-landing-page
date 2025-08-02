import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Configuração Inicial - Kalender",
  description: "Configure sua conta Kalender em poucos passos simples",
}

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary/5">{children}</div>
}
