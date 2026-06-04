"use client"

import { useTranslation } from "@/contexts/translation-context"

export function ProblemSection() {
  const { t } = useTranslation()

  const moments = [
    { time: "9h", text: t("landing.problem_9h") },
    { time: "14h", text: t("landing.problem_14h") },
    { time: "22h", text: t("landing.problem_22h") },
  ]

  return (
    <section id="problem" className="py-20 bg-zinc-100 dark:bg-zinc-950 scroll-mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12 animate-on-scroll">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-zinc-900 dark:text-white tracking-tight mb-4">
              {t("landing.problem_title")}
            </h2>
          </div>

          <div className="space-y-8 stagger-children">
            {moments.map((moment, i) => (
              <div key={i} className="animate-on-scroll">
                <div className="flex gap-4 sm:gap-6">
                  <div className="flex-shrink-0 w-14 sm:w-16">
                    <span className="inline-block text-2xl sm:text-3xl font-extrabold text-primary">
                      {moment.time}
                    </span>
                  </div>
                  <div className="flex-1 border-l-2 border-zinc-200 dark:border-zinc-800 pl-4 sm:pl-6">
                    <p className="text-zinc-600 dark:text-zinc-400 text-base sm:text-lg leading-relaxed">
                      {moment.text}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12 animate-on-scroll">
            <p className="text-lg text-zinc-500 dark:text-zinc-400">
              {t("landing.problem_closing")}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
