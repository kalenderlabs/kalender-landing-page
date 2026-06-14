"use client"

import { useTranslation } from "@/contexts/translation-context"
import { Button } from "@/components/ui/button"
import { ArrowRight, Bot, Check } from "lucide-react"

const ONBOARDING_URL = "https://app.kalender.com.br/onboarding"

export function AISection() {
  const { t } = useTranslation()

  const aiPoints = Array.from({ length: 6 }, (_, i) =>
    t(`landing.ai_point${i + 1}`)
  )

  return (
    <section className="py-20 bg-white dark:bg-zinc-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-6xl mx-auto">
          {/* Left: Chat Mockup */}
          <div className="animate-on-scroll order-2 lg:order-1">
            <div className="bg-white dark:bg-white/[0.04] rounded-2xl border border-zinc-200 dark:border-zinc-500/25 overflow-hidden shadow-sm dark:shadow-none">
              {/* Chat Header */}
              <div className="flex items-center gap-3 px-5 py-3.5 bg-zinc-50 dark:bg-white/[0.02] border-b border-zinc-200 dark:border-zinc-500/25">
                <div className="w-9 h-9 rounded-full bg-primary/10 dark:bg-primary/15 flex items-center justify-center">
                  <Bot className="h-4.5 w-4.5 text-primary" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-zinc-900 dark:text-white">{t("landing.ai_chat_name")}</div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span className="text-[11px] text-emerald-600 dark:text-emerald-400">{t("landing.ai_chat_status")}</span>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="p-4 space-y-3 min-h-[280px]">
                {/* Client message */}
                <div className="flex justify-end">
                  <div className="bg-primary text-primary-foreground text-sm rounded-2xl rounded-br-md px-4 py-2.5 max-w-[80%]">
                    {t("landing.ai_chat_msg1")}
                  </div>
                </div>
                {/* AI response */}
                <div className="flex justify-start">
                  <div className="bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 text-sm rounded-2xl rounded-bl-md px-4 py-2.5 max-w-[80%]">
                    {t("landing.ai_chat_msg2")}
                  </div>
                </div>
                {/* Client message */}
                <div className="flex justify-end">
                  <div className="bg-primary text-primary-foreground text-sm rounded-2xl rounded-br-md px-4 py-2.5 max-w-[80%]">
                    {t("landing.ai_chat_msg3")}
                  </div>
                </div>
                {/* AI response */}
                <div className="flex justify-start">
                  <div className="bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 text-sm rounded-2xl rounded-bl-md px-4 py-2.5 max-w-[80%]">
                    {t("landing.ai_chat_msg4")}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Content */}
          <div className="animate-on-scroll order-1 lg:order-2">
            <div className="inline-flex items-center px-3.5 py-1.5 rounded-full border border-violet-500/20 bg-violet-500/10 dark:bg-violet-500/5 mb-6">
              <span className="text-violet-600 dark:text-violet-400 text-sm font-medium">{t("landing.ai_badge")}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight mb-2">
              {t("landing.ai_title")}{" "}
              <span className="text-gradient">{t("landing.ai_title_highlight")}</span>
            </h2>

            <p className="text-zinc-500 dark:text-zinc-400 text-lg leading-relaxed mb-8 max-w-lg">
              {t("landing.ai_description")}
            </p>

            <ul className="space-y-3 mb-8">
              {aiPoints.map((point, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Check className="h-4.5 w-4.5 text-violet-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">{point}</span>
                </li>
              ))}
            </ul>

            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold h-12 px-7 text-base rounded-xl transition-colors"
              onClick={() => (window.location.href = ONBOARDING_URL)}
            >
              {t("landing.ai_cta")}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
