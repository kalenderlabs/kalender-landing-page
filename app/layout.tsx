import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Kalender - Agenda, Comanda e Comissão para Salões e Barbearias",
  description: "Sistema de agenda, comanda e comissão para barbearias, salões e estéticas no Brasil. Confirmação automática no WhatsApp, IA que agenda sozinha e controle de comissão por profissional. Teste grátis.",
  keywords: "sistema salão de beleza, agenda barbearia, sistema barbearia, agenda salão, comissão profissional, comanda digital salão, agendamento WhatsApp, IA WhatsApp salão, sistema estética, agenda online salão",
  authors: [{ name: "Kalender" }],
  creator: "Kalender",
  publisher: "Kalender",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://kalender.com.br"),
  alternates: {
    canonical: "/",
    languages: {
      "pt-BR": "/",
      "en": "/en",
      "es": "/es",
    },
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://kalender.com.br",
    title: "Kalender - Agenda, Comanda e Comissão para Salões e Barbearias",
    description: "Sistema de agenda, comanda e comissão para barbearias, salões e estéticas no Brasil. Confirmação automática no WhatsApp incluída. Teste grátis.",
    siteName: "Kalender",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Kalender - Revenue OS para Negócios com Atendimento",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kalender - Agenda, Comanda e Comissão para Salões e Barbearias",
    description: "Sistema de agenda, comanda e comissão para barbearias, salões e estéticas no Brasil. Confirmação automática no WhatsApp incluída.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
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
  // verification: {
  //   google: "GOOGLE_SEARCH_CONSOLE_ID",
  // },
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Kalender",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web, iOS, Android",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "BRL",
      priceValidUntil: "2026-12-31",
      description: "Teste grátis por 7 dias"
    },
    description: "Sistema de agenda, comanda e comissão para barbearias, salões e estéticas no Brasil. Confirmação automática no WhatsApp e IA que agenda sozinha.",
    featureList: [
      "Agenda por profissional com confirmação automática",
      "IA no WhatsApp que agenda sozinha",
      "Comanda digital e comissão automática",
      "Controle de caixa e relatórios",
      "Link de agendamento para clientes",
      "Suporte offline",
      "Conformidade LGPD"
    ],
    screenshot: "https://kalender.com.br/og-image.png",
    url: "https://kalender.com.br",
    publisher: {
      "@type": "Organization",
      name: "Kalender",
      logo: {
        "@type": "ImageObject",
        url: "https://kalender.com.br/kalender-logo.png"
      }
    }
  }

  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/kalender-logo.png" type="image/png" />
        <link rel="shortcut icon" href="/kalender-logo.png" type="image/png" />
        <link rel="apple-touch-icon" href="/kalender-logo.png" />
        <meta name="theme-color" content="#0EA5E9" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
          <Toaster />
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
