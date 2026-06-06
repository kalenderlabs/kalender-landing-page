"use client"

import { useState } from "react"
import { useTranslation } from "@/contexts/translation-context"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { CheckCircle, ArrowRight } from "lucide-react"

const ONBOARDING_URL = "https://app.kalender.com.br/onboarding"

export interface PlanDetails {
  id: number
  name: string
  description: string
  price: number
  annualPrice: number
  isActive: boolean
  isRecommended: boolean
  featureDescriptions: string[]
  displayOrder?: number
}

function formatPrice(price: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price)
}

interface PricingSectionProps {
  plans: PlanDetails[]
}

export function PricingSection({ plans }: PricingSectionProps) {
  const { t } = useTranslation()
  const [isAnnual, setIsAnnual] = useState(true)

  return (
    <section id="pricing" className="py-20 bg-zinc-100 dark:bg-zinc-950 scroll-mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-on-scroll">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-zinc-900 dark:text-white tracking-tight mb-4">
            {t("landing.pricing_title")}
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 text-lg lg:text-xl max-w-2xl mx-auto mb-8">
            {t("landing.pricing_subtitle")}
          </p>

          {/* Annual Toggle */}
          <div className="flex items-center justify-center gap-3">
            <span className={`text-sm font-medium transition-colors ${!isAnnual ? "text-zinc-900 dark:text-white" : "text-zinc-400"}`}>
              {t("landing.pricing_monthly")}
            </span>
            <Switch checked={isAnnual} onCheckedChange={setIsAnnual} className="data-[state=checked]:bg-primary" />
            <span className={`text-sm font-medium transition-colors ${isAnnual ? "text-zinc-900 dark:text-white" : "text-zinc-400"}`}>
              {t("landing.pricing_annual")}
            </span>
            {isAnnual && (
              <Badge className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border-0 text-xs">
                {t("landing.pricing_save")}
              </Badge>
            )}
          </div>
        </div>

        {/* Pricing Cards */}
        {plans.length === 0 ? (
          <div className="text-center py-12 animate-on-scroll">
            <div className="max-w-md mx-auto rounded-2xl border border-zinc-200 dark:border-zinc-500/25 bg-white dark:bg-zinc-950 p-8">
              <p className="text-zinc-500 dark:text-zinc-400 mb-4">{t("landing.pricing_subtitle")}</p>
              <Button
                className="bg-primary hover:bg-primary/90 text-white rounded-xl px-6"
                onClick={() => (window.location.href = "/contact")}
              >
                {t("landing.pricing_cta_enterprise")}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        ) : (
          <div
            className={`grid gap-6 max-w-4xl mx-auto stagger-children ${
              plans.length <= 2
                ? "md:grid-cols-2 max-w-3xl"
                : plans.length === 3
                ? "md:grid-cols-3 max-w-5xl"
                : "md:grid-cols-2 lg:grid-cols-4"
            }`}
          >
            {plans.map((plan) => {
              const monthlyPrice = isAnnual ? plan.annualPrice / 12 : plan.price
              const isEnterprise = plan.name.toLowerCase() === "enterprise"
              const isRecommended = plan.isRecommended

              return (
                <div
                  key={plan.id}
                  className={`animate-on-scroll-scale relative rounded-2xl bg-white dark:bg-zinc-950 transition-all duration-300 ease-in-out ${
                    isRecommended
                      ? "border-2 border-primary ring-1 ring-primary/20 shadow-md"
                      : "border border-zinc-200 dark:border-zinc-500/25 hover:shadow-md"
                  }`}
                >
                  {isRecommended && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                      <Badge className="bg-primary text-white font-semibold px-4 py-1 shadow-sm">
                        {t("landing.pricing_popular")}
                      </Badge>
                    </div>
                  )}

                  <div className="text-center pt-8 pb-2 px-6">
                    <h3 className="text-xl font-extrabold text-zinc-900 dark:text-white">{plan.name}</h3>
                    <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-1">{plan.description}</p>
                  </div>

                  <div className="px-6 pb-6">
                    <div className="text-center mb-6">
                      {isEnterprise ? (
                        <div className="text-2xl font-bold text-zinc-900 dark:text-white py-2">
                          {t("landing.pricing_custom")}
                        </div>
                      ) : (
                        <>
                          <div className="text-4xl font-extrabold text-zinc-900 dark:text-white">
                            {formatPrice(monthlyPrice)}
                            <span className="text-base font-normal text-zinc-500">
                              {t("landing.pricing_per_month")}
                            </span>
                          </div>
                          {isAnnual && (
                            <div className="text-xs text-zinc-400 mt-1">
                              {formatPrice(plan.annualPrice)} {t("landing.pricing_billed_annually")}
                            </div>
                          )}
                          {isAnnual && plan.price > 0 && (
                            <div className="text-xs text-emerald-600 dark:text-emerald-400 font-medium mt-1">
                              {t("landing.pricing_savings_prefix")} {formatPrice(plan.price * 12 - plan.annualPrice)}
                              {t("landing.pricing_savings_suffix")}
                            </div>
                          )}
                        </>
                      )}
                    </div>

                    {/* Features */}
                    <div className="space-y-2.5 mb-6">
                      {plan.featureDescriptions.map((feature, fi) => (
                        <div key={fi} className="flex items-start gap-2.5">
                          <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-zinc-700 dark:text-zinc-300">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <Button
                      className={`w-full rounded-xl font-semibold transition-colors ${
                        isRecommended
                          ? "bg-primary hover:bg-primary/90 text-white"
                          : isEnterprise
                          ? "bg-zinc-900 dark:bg-white hover:bg-zinc-800 dark:hover:bg-zinc-100 text-white dark:text-zinc-900"
                          : "bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-500/25 text-zinc-900 dark:text-white hover:border-primary hover:text-primary"
                      }`}
                      onClick={() =>
                        (window.location.href = isEnterprise ? "/contact" : ONBOARDING_URL)
                      }
                    >
                      {isEnterprise ? t("landing.pricing_cta_enterprise") : t("landing.pricing_cta")}
                    </Button>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        <p className="text-center text-xs text-zinc-400 mt-8">{t("landing.pricing_footnote")}</p>
      </div>
    </section>
  )
}
