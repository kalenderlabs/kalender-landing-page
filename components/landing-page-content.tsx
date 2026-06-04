"use client"

import { useEffect, useState } from "react"
import { ChevronDown } from "lucide-react"
import { useTranslation } from "@/contexts/translation-context"
import { Navbar } from "@/components/layout/navbar"
import { HeroSection } from "@/components/sections/hero"
import { CredibilityStripSection } from "@/components/sections/credibility-strip"
import { ProblemSection } from "@/components/sections/problem"
import { SolutionSection } from "@/components/sections/solution"
import { AIWhatsAppSection } from "@/components/sections/ai-whatsapp"
import { HowItWorksSection } from "@/components/sections/how-it-works"
import { TrustSection } from "@/components/sections/trust"
import { EarlyAdopterPricingSection } from "@/components/sections/early-adopter-pricing"
import { FAQSection } from "@/components/sections/faq"
import { CTASection } from "@/components/sections/cta"
import { FooterSection } from "@/components/sections/footer"

// Re-export PlanDetails so app/page.tsx import still works
export type { PlanDetails } from "@/components/sections/early-adopter-pricing"

// ─── Scroll Animation Hook ───────────────────────────────────────────────────

function useScrollAnimations() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-visible")
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.08 }
    )

    const elements = document.querySelectorAll(
      ".animate-on-scroll, .animate-on-scroll-scale"
    )
    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])
}

// ─── Back To Top Hook ────────────────────────────────────────────────────────

function useBackToTop() {
  const [showBackToTop, setShowBackToTop] = useState(false)

  useEffect(() => {
    let ticking = false
    const handleScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        setShowBackToTop(window.scrollY > 600)
        ticking = false
      })
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return showBackToTop
}

// ─── Landing Page Content ────────────────────────────────────────────────────

interface LandingPageContentProps {
  initialPlans: import("@/components/sections/early-adopter-pricing").PlanDetails[]
}

export function LandingPageContent({ initialPlans }: LandingPageContentProps) {
  const { t, language } = useTranslation()
  const showBackToTop = useBackToTop()
  useScrollAnimations()

  // Update html lang attribute when language changes
  useEffect(() => {
    const langMap: Record<string, string> = { pt: "pt-BR", en: "en", es: "es" }
    document.documentElement.lang = langMap[language] || "pt-BR"
  }, [language])

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 font-sans antialiased">
      <Navbar />
      <HeroSection />
      <CredibilityStripSection />
      <ProblemSection />
      <SolutionSection />
      <AIWhatsAppSection />
      <HowItWorksSection />
      <TrustSection />
      <EarlyAdopterPricingSection plans={initialPlans} />
      <FAQSection />
      <CTASection />
      <FooterSection />

      {/* Back to Top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`fixed bottom-6 right-6 z-40 bg-primary text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:bg-primary/90 ${
          showBackToTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        }`}
        aria-label={t("landing.back_to_top")}
      >
        <ChevronDown className="h-5 w-5 rotate-180" />
      </button>
    </div>
  )
}
