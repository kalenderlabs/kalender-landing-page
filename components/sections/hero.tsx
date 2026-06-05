"use client"

import { useTranslation } from "@/contexts/translation-context"
import { Button } from "@/components/ui/button"
import { ArrowRight, MessageCircle } from "lucide-react"
import { MockupScheduleGrid } from "@/components/mockups/mockup-schedule-grid"

const ONBOARDING_URL = "https://app.kalender.com.br/onboarding"
const WHATSAPP_URL = "https://wa.me/5511956060047"

export function HeroSection() {
  const { t } = useTranslation()

  return (
    <section className="relative min-h-[92vh] flex items-center bg-zinc-100 dark:bg-zinc-950 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-28 pb-16 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Content */}
          <div className="max-w-xl">
            <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] xl:text-6xl font-extrabold text-zinc-800 dark:text-white mb-6 leading-[1.08] tracking-tight">
              {t("landing.hero_title")}
            </h1>

            <p className="text-lg lg:text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed mb-10 max-w-lg">
              {t("landing.hero_description")}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white font-semibold h-12 px-7 text-base rounded-xl transition-colors"
                onClick={() => (window.location.href = ONBOARDING_URL)}
              >
                {t("landing.hero_cta_primary")}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-12 px-7 text-base border-zinc-300 dark:border-zinc-700 text-zinc-800 hover:border-primary dark:text-white rounded-xl transition-all duration-300 ease-in-out"
                onClick={() => window.open(WHATSAPP_URL, "_blank")}
              >
                <MessageCircle className="mr-2 h-4 w-4" />
                {t("landing.hero_cta_secondary")}
              </Button>
            </div>

            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-zinc-500">
              <span>{t("landing.hero_note_1")}</span>
              <span className="text-zinc-300 dark:text-zinc-600">·</span>
              <span>{t("landing.hero_note_2")}</span>
              <span className="text-zinc-300 dark:text-zinc-600">·</span>
              <span>{t("landing.hero_note_3")}</span>
            </div>
          </div>

          {/* Right: Schedule Mockup */}
          <div className="relative hidden lg:block">
            <div className="relative bg-white dark:bg-white/[0.04] rounded-2xl border border-zinc-200 dark:border-zinc-500/25 shadow-sm dark:shadow-none overflow-hidden aspect-[4/3]">
              <MockupScheduleGrid variant="hero" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
