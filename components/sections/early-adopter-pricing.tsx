"use client"

import { useTranslation } from "@/contexts/translation-context"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle, Lock, Users, Star, MessageCircle } from "lucide-react"

const ONBOARDING_URL = "https://app.kalender.com.br/onboarding"
const WHATSAPP_URL = "https://wa.me/5511956060047"

export interface PlanDetails {
  id: number
  name: string
  description: string
  price: number
  annualPrice: number
  isActive: boolean
  isRecommended: boolean
  featureDescriptions: string[]
}

function formatPrice(price: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)
}

interface EarlyAdopterPricingSectionProps {
  plans: PlanDetails[]
}

export function EarlyAdopterPricingSection({ plans }: EarlyAdopterPricingSectionProps) {
  const { t } = useTranslation()

  // Show the first plan (Early Adopter) or empty state
  const plan = plans.length > 0 ? plans[0] : null

  const founderBenefits = [
    { icon: Lock, text: t("landing.pricing_benefit1") },
    { icon: Users, text: t("landing.pricing_benefit2") },
    { icon: Star, text: t("landing.pricing_benefit3") },
  ]

  return (
    <section id="pricing" className="py-20 bg-white dark:bg-zinc-950 scroll-mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-on-scroll">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-zinc-900 dark:text-white tracking-tight mb-4">
            {t("landing.pricing_title")}
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 text-lg max-w-2xl mx-auto">
            {t("landing.pricing_subtitle")}
          </p>
        </div>

        {plan ? (
          <div className="max-w-lg mx-auto animate-on-scroll-scale">
            {/* Main Card */}
            <div className="relative rounded-2xl bg-white dark:bg-zinc-950 border-2 border-primary ring-1 ring-primary/20 shadow-md overflow-hidden">
              {/* Header badge */}
              <div className="bg-primary/5 dark:bg-primary/10 px-6 py-3 text-center">
                <span className="text-primary text-sm font-semibold">{t("landing.pricing_badge")}</span>
              </div>

              <div className="p-8 text-center">
                <h3 className="text-2xl font-extrabold text-zinc-900 dark:text-white mb-1">
                  {plan.name}
                </h3>
                <p className="text-zinc-500 dark:text-zinc-400 text-sm mb-6">{plan.description}</p>

                <div className="mb-6">
                  <div className="text-5xl font-extrabold text-zinc-900 dark:text-white">
                    {formatPrice(plan.price)}
                    <span className="text-base font-normal text-zinc-500">{t("landing.pricing_per_month")}</span>
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-2.5 mb-8 text-left">
                  {plan.featureDescriptions.map((feature, fi) => (
                    <div key={fi} className="flex items-start gap-2.5">
                      <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-zinc-700 dark:text-zinc-300">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button
                  size="lg"
                  className="w-full bg-primary hover:bg-primary/90 text-white font-semibold h-12 text-base rounded-xl transition-colors mb-3"
                  onClick={() => (window.location.href = ONBOARDING_URL)}
                >
                  {t("landing.pricing_cta")}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>

                <p className="text-xs text-zinc-400">{t("landing.pricing_note")}</p>
              </div>
            </div>

            {/* Founder Benefits */}
            <div className="mt-8 grid sm:grid-cols-3 gap-4">
              {founderBenefits.map((benefit, i) => {
                const Icon = benefit.icon
                return (
                  <div key={i} className="text-center">
                    <Icon className="h-5 w-5 text-primary mx-auto mb-2" />
                    <span className="text-xs text-zinc-500 dark:text-zinc-400">{benefit.text}</span>
                  </div>
                )
              })}
            </div>

            <p className="text-center text-xs text-zinc-400 mt-6">{t("landing.pricing_payment_methods")}</p>
          </div>
        ) : (
          /* Empty state - API didn't return plans */
          <div className="text-center py-12 animate-on-scroll">
            <div className="max-w-md mx-auto rounded-2xl border border-zinc-200 dark:border-zinc-500/25 bg-white dark:bg-zinc-950 p-8">
              <p className="text-zinc-600 dark:text-zinc-400 mb-4">{t("landing.pricing_empty")}</p>
              <Button
                className="bg-primary hover:bg-primary/90 text-white rounded-xl px-6"
                onClick={() => window.open(WHATSAPP_URL, "_blank")}
              >
                <MessageCircle className="mr-2 h-4 w-4" />
                {t("landing.pricing_empty_cta")}
              </Button>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
