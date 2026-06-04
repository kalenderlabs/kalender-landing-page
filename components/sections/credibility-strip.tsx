"use client"

import { useTranslation } from "@/contexts/translation-context"
import { MessageCircle, Lightbulb, Tag } from "lucide-react"

export function CredibilityStripSection() {
  const { t } = useTranslation()

  const badges = [
    { icon: MessageCircle, text: t("landing.credibility_1") },
    { icon: Lightbulb, text: t("landing.credibility_2") },
    { icon: Tag, text: t("landing.credibility_3") },
  ]

  return (
    <section className="py-6 bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-500/25">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-4">
          {t("landing.credibility_headline")}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
          {badges.map((badge, i) => (
            <div key={i} className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
              <badge.icon className="h-4 w-4 text-primary flex-shrink-0" />
              <span>{badge.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
