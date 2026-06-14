"use client"

import { useTranslation } from "@/contexts/translation-context"
import { UserPlus, Users, Share2, CalendarCheck } from "lucide-react"

export function HowItWorksSection() {
  const { t } = useTranslation()

  const steps = [
    { icon: UserPlus, title: t("landing.how_step1_title"), desc: t("landing.how_step1_desc") },
    { icon: Users, title: t("landing.how_step2_title"), desc: t("landing.how_step2_desc") },
    { icon: Share2, title: t("landing.how_step3_title"), desc: t("landing.how_step3_desc") },
    { icon: CalendarCheck, title: t("landing.how_step4_title"), desc: t("landing.how_step4_desc") },
  ]

  return (
    <section id="how-it-works" className="py-20 bg-white dark:bg-zinc-950 scroll-mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-on-scroll">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-zinc-900 dark:text-white tracking-tight mb-4">
            {t("landing.how_title")}
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 text-lg max-w-2xl mx-auto">
            {t("landing.how_subtitle")}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto stagger-children">
          {steps.map((step, i) => {
            const Icon = step.icon
            return (
              <div key={i} className="animate-on-scroll text-center">
                <div className="relative inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 dark:bg-primary/15 mb-4">
                  <Icon className="h-6 w-6 text-primary" />
                  <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
                    {i + 1}
                  </span>
                </div>
                <h3 className="text-base font-bold text-zinc-900 dark:text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
