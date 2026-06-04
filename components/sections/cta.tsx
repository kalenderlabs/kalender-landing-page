"use client"

import { useTranslation } from "@/contexts/translation-context"
import { Button } from "@/components/ui/button"
import { ArrowRight, MessageCircle } from "lucide-react"

const ONBOARDING_URL = "https://app.kalender.com.br/onboarding"
const WHATSAPP_URL = "https://wa.me/5511956060047"

export function CTASection() {
  const { t } = useTranslation()

  return (
    <section className="py-20 bg-primary/5 dark:bg-primary/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-2xl mx-auto animate-on-scroll">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-zinc-900 dark:text-white tracking-tight mb-4">
            {t("landing.cta_title")}
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 text-lg lg:text-xl mb-8">
            {t("landing.cta_subtitle")}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white font-semibold h-12 px-8 text-base rounded-xl transition-colors"
              onClick={() => (window.location.href = ONBOARDING_URL)}
            >
              {t("landing.cta_primary")}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-12 px-8 text-base border-zinc-300 dark:border-zinc-700 text-zinc-800 hover:border-primary dark:text-white rounded-xl transition-all duration-300 ease-in-out"
              onClick={() => window.open(WHATSAPP_URL, "_blank")}
            >
              <MessageCircle className="mr-2 h-4 w-4" />
              {t("landing.cta_secondary")}
            </Button>
          </div>
          <p className="text-sm text-zinc-400 mt-5">{t("landing.cta_note")}</p>
        </div>
      </div>
    </section>
  )
}
