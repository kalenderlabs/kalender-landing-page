"use client"

import { useTranslation } from "@/contexts/translation-context"
import { Calendar, MessageCircle, DollarSign } from "lucide-react"
import { MockupScheduleGrid } from "@/components/mockups/mockup-schedule-grid"
import { MockupWhatsAppConfirmation } from "@/components/mockups/mockup-whatsapp-confirmation"
import { MockupComandaCommission } from "@/components/mockups/mockup-comanda-commission"

export function SolutionSection() {
  const { t } = useTranslation()

  const pillars = [
    {
      icon: Calendar,
      title: t("landing.solution_pillar1_title"),
      description: t("landing.solution_pillar1_desc"),
      points: [
        t("landing.solution_pillar1_point1"),
        t("landing.solution_pillar1_point2"),
        t("landing.solution_pillar1_point3"),
      ],
      ariaLabel: t("landing.solution_pillar1_screenshot"),
      mockup: <MockupScheduleGrid variant="compact" />,
    },
    {
      icon: MessageCircle,
      title: t("landing.solution_pillar2_title"),
      description: t("landing.solution_pillar2_desc"),
      points: [
        t("landing.solution_pillar2_point1"),
        t("landing.solution_pillar2_point2"),
        t("landing.solution_pillar2_point3"),
      ],
      ariaLabel: t("landing.solution_pillar2_screenshot"),
      mockup: <MockupWhatsAppConfirmation />,
    },
    {
      icon: DollarSign,
      title: t("landing.solution_pillar3_title"),
      description: t("landing.solution_pillar3_desc"),
      points: [
        t("landing.solution_pillar3_point1"),
        t("landing.solution_pillar3_point2"),
        t("landing.solution_pillar3_point3"),
      ],
      ariaLabel: t("landing.solution_pillar3_screenshot"),
      mockup: <MockupComandaCommission />,
    },
  ]

  return (
    <section id="solution" className="py-20 bg-white dark:bg-zinc-950 scroll-mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-on-scroll">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-zinc-900 dark:text-white tracking-tight mb-4">
            {t("landing.solution_title")}
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 text-lg max-w-2xl mx-auto">
            {t("landing.solution_subtitle")}
          </p>
        </div>

        <div className="space-y-20 stagger-children">
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon
            const isReversed = i % 2 !== 0
            return (
              <div
                key={i}
                className={`animate-on-scroll grid lg:grid-cols-2 gap-10 lg:gap-16 items-center ${
                  isReversed ? "lg:[direction:rtl]" : ""
                }`}
              >
                {/* Content */}
                <div className={isReversed ? "lg:[direction:ltr]" : ""}>
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 dark:bg-primary/15 mb-4">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white mb-3">
                    {pillar.title}
                  </h3>
                  <p className="text-zinc-600 dark:text-zinc-400 text-base leading-relaxed mb-6">
                    {pillar.description}
                  </p>
                  <ul className="space-y-2.5">
                    {pillar.points.map((point, j) => (
                      <li key={j} className="flex items-start gap-2.5">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                        <span className="text-sm text-zinc-600 dark:text-zinc-400">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Mockup */}
                <div className={isReversed ? "lg:[direction:ltr]" : ""}>
                  <div
                    className="bg-zinc-100 dark:bg-white/[0.04] rounded-2xl border border-zinc-200 dark:border-zinc-500/25 overflow-hidden aspect-[4/3]"
                    aria-label={pillar.ariaLabel}
                  >
                    {pillar.mockup}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
