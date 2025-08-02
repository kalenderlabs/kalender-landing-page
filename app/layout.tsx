import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Kalender - Smart Scheduling Platform",
  description: "Complete AI-powered scheduling platform for businesses",
  icons: {
    icon: [
      {
        url: "/kalender-logo.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "/kalender-logo.png",
        sizes: "16x16",
        type: "image/png",
      },
    ],
    apple: [
      {
        url: "/kalender-logo.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
    shortcut: "/kalender-logo.png",
  },
    generator: 'v0.dev'
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="pt" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/kalender-logo.png" type="image/png" />
        <link rel="shortcut icon" href="/kalender-logo.png" type="image/png" />
        <link rel="apple-touch-icon" href="/kalender-logo.png" />
        <meta name="theme-color" content="#0EA5E9" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
