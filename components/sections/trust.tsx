"use client"

import { useTranslation } from "@/contexts/translation-context"
import { ShieldCheck, Headphones, DoorOpen } from "lucide-react"

export function TrustSection() {
  const { t } = useTranslation()

  const seals = [
    { icon: ShieldCheck, title: t("landing.trust_seal1_title"), desc: t("landing.trust_seal1_desc") },
    { icon: Headphones, title: t("landing.trust_seal2_title"), desc: t("landing.trust_seal2_desc") },
    { icon: DoorOpen, title: t("landing.trust_seal3_title"), desc: t("landing.trust_seal3_desc") },
  ]

  return (
    <section id="trust" className="py-20 bg-zinc-100 dark:bg-zinc-950 scroll-mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-on-scroll">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-zinc-900 dark:text-white tracking-tight mb-4">
            {t("landing.trust_title")}
          </h2>
        </div>

        <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto stagger-children">
          {seals.map((seal, i) => {
            const Icon = seal.icon
            return (
              <div
                key={i}
                className="animate-on-scroll-scale bg-white dark:bg-white/[0.04] rounded-2xl p-6 border border-zinc-200 dark:border-zinc-500/25 text-center"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 dark:bg-primary/15 mb-4">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-sm font-bold text-zinc-900 dark:text-white mb-2">
                  {seal.title}
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  {seal.desc}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
