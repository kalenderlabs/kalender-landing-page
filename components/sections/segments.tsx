"use client"

import { useTranslation } from "@/contexts/translation-context"
import { Stethoscope, Sparkles, Check, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const ONBOARDING_URL = "https://app.kalender.com.br/onboarding"

export function SegmentsSection() {
  const { t } = useTranslation()

  const healthPoints = Array.from({ length: 5 }, (_, i) =>
    t(`landing.segment_health_point${i + 1}`)
  )
  const beautyPoints = Array.from({ length: 5 }, (_, i) =>
    t(`landing.segment_beauty_point${i + 1}`)
  )

  return (
    <section className="py-20 bg-zinc-100 dark:bg-zinc-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14 animate-on-scroll">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-zinc-900 dark:text-white tracking-tight mb-4">
            {t("landing.segments_title")}
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 text-lg lg:text-xl max-w-2xl mx-auto">
            {t("landing.segments_subtitle")}
          </p>
        </div>

        {/* Two segment cards */}
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-10 stagger-children">
          {/* Health */}
          <div className="animate-on-scroll rounded-2xl border border-zinc-200 dark:border-zinc-500/25 bg-white dark:bg-zinc-950 p-8">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-rose-100 dark:bg-rose-900/30 mb-5">
              <Stethoscope className="h-6 w-6 text-rose-600 dark:text-rose-400" />
            </div>
            <h3 className="text-xl font-extrabold text-zinc-900 dark:text-white mb-4">
              {t("landing.segment_health_title")}
            </h3>
            <ul className="space-y-3">
              {healthPoints.map((point, i) => (
                <li key={i} className="flex items-center gap-3">
                  <Check className="h-4 w-4 text-rose-500 flex-shrink-0" />
                  <span className="text-sm text-zinc-600 dark:text-zinc-300">{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Beauty */}
          <div className="animate-on-scroll rounded-2xl border border-zinc-200 dark:border-zinc-500/25 bg-white dark:bg-zinc-950 p-8">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-violet-100 dark:bg-violet-900/30 mb-5">
              <Sparkles className="h-6 w-6 text-violet-600 dark:text-violet-400" />
            </div>
            <h3 className="text-xl font-extrabold text-zinc-900 dark:text-white mb-4">
              {t("landing.segment_beauty_title")}
            </h3>
            <ul className="space-y-3">
              {beautyPoints.map((point, i) => (
                <li key={i} className="flex items-center gap-3">
                  <Check className="h-4 w-4 text-violet-500 flex-shrink-0" />
                  <span className="text-sm text-zinc-600 dark:text-zinc-300">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Price comparison banner */}
        <div className="animate-on-scroll max-w-5xl mx-auto rounded-2xl border border-primary/20 bg-primary/5 dark:bg-primary/5 p-8 text-center">
          <h3 className="text-xl sm:text-2xl font-extrabold text-zinc-900 dark:text-white mb-2">
            {t("landing.segment_price_title")}
          </h3>
          <p className="text-zinc-600 dark:text-zinc-300 mb-3 max-w-2xl mx-auto">
            {t("landing.segment_price_desc")}
          </p>
          <p className="text-sm font-semibold text-primary mb-6">
            {t("landing.segment_price_example")}
          </p>
          <Button
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl px-6 transition-colors"
            onClick={() => (window.location.href = ONBOARDING_URL)}
          >
            {t("landing.hero_cta_primary")}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  )
}
