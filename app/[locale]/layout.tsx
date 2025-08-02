import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import type { Locale } from "@/lib/i18n"
import "../globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Kalender - Agendamento Inteligente",
  description: "Plataforma completa de agendamento com IA para estabelecimentos",
}

interface RootLayoutProps {
  children: React.ReactNode
  params: { locale: Locale }
}

export default function RootLayout({ children, params: { locale } }: RootLayoutProps) {
  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
