import { TranslationProvider } from "@/contexts/translation-context"
import { LandingPageContent, type PlanDetails } from "@/components/landing-page-content"

// Re-export PlanDetails for external consumers
export type { PlanDetails }

export const dynamic = 'force-dynamic'

const API_PUBLIC_PLANS_URL = "https://api.kalender.com.br/billing/plans/public"
const API_PUBLIC_SETTINGS_URL = "https://api.kalender.com.br/billing/settings/public"

// Fallback to legacy endpoint if public endpoint is not yet deployed
const API_LEGACY_PLANS_URL = "https://api.kalender.com.br/billing/plans/details"

interface PublicPlan {
  id: number
  name: string
  price: number
  annualPrice: number
  isRecommended: boolean
  tagline: string
  displayOrder: number
  ctaText: string
  quotas: { resourceCode: string; limit: number; formattedLabel: string }[]
  features: { code: string; name: string; enabled: boolean }[]
}

function isRawLabel(label: string): boolean {
  return /^[A-Z_]+:?\s*\d*$/.test(label.trim()) || /[A-Z]{2,}_[A-Z]/.test(label)
}

function transformPublicPlan(api: PublicPlan): PlanDetails {
  const featureDescriptions: string[] = []

  for (const q of api.quotas || []) {
    if (q.resourceCode === "API_CALLS_MONTH") continue
    if (q.formattedLabel && !isRawLabel(q.formattedLabel)) {
      featureDescriptions.push(q.formattedLabel)
    } else {
      const fn = QUOTA_LABELS[q.resourceCode]
      if (fn) {
        const label = fn(q.limit)
        if (label) featureDescriptions.push(label)
      }
    }
  }
  for (const f of api.features || []) {
    if (f.enabled) featureDescriptions.push(f.name)
  }

  return {
    id: api.id,
    name: api.name,
    description: api.tagline || "",
    price: api.price,
    annualPrice: api.annualPrice,
    isActive: true,
    isRecommended: api.isRecommended,
    featureDescriptions,
    displayOrder: api.displayOrder,
  }
}

// Legacy types for fallback
interface LegacyPlan {
  id: number
  name: string
  description: string
  price: string
  isActive: boolean
  features: { featureId: number; enabled: boolean }[]
  quotas: { resourceCode: string; limit: number }[]
}

const QUOTA_LABELS: Record<string, (limit: number) => string> = {
  MAX_UNITS: (n) => `Até ${n} ${n === 1 ? "unidade" : "unidades"}`,
  MAX_USERS: (n) => `Até ${n} usuários`,
  MAX_APPOINTMENTS_MONTH: (n) =>
    n >= 10000 ? "Agendamentos ilimitados" : `Até ${n.toLocaleString("pt-BR")} agendamentos/mês`,
  API_CALLS_MONTH: (n) =>
    n >= 100000 ? "API ilimitada" : `${n.toLocaleString("pt-BR")} chamadas API/mês`,
  STORAGE_MB: (n) =>
    n >= 10240 ? `${Math.round(n / 1024)} GB de armazenamento` : `${n} MB de armazenamento`,
  SALVY_PHONE_NUMBERS: (n) =>
    n <= 0 ? "" : `${n} ${n === 1 ? "número virtual WhatsApp incluso" : "números virtuais WhatsApp inclusos"}`,
}

const FEATURE_LABELS: Record<number, string> = {
  1: "Gestão de clientes (CRM)",
  2: "Relatórios e insights",
  3: "Integrações avançadas",
  4: "WhatsApp Business",
  5: "Comissionamento",
  6: "Controle financeiro",
  7: "Pacotes e promoções",
  8: "Programa de fidelidade",
  9: "Suporte prioritário",
  10: "Agendamento online",
  11: "Gestão de profissionais",
}

function transformLegacyPlan(api: LegacyPlan): PlanDetails {
  const featureDescriptions: string[] = []
  for (const q of api.quotas) {
    const fn = QUOTA_LABELS[q.resourceCode]
    if (fn) {
      const label = fn(q.limit)
      if (label) featureDescriptions.push(label)
    }
  }
  for (const f of api.features) {
    if (f.enabled && FEATURE_LABELS[f.featureId]) {
      featureDescriptions.push(FEATURE_LABELS[f.featureId])
    }
  }
  const monthlyPrice = parseFloat(api.price)
  return {
    id: api.id,
    name: api.name,
    description: api.description,
    price: monthlyPrice,
    annualPrice: Math.round(monthlyPrice * 10),
    isActive: api.isActive,
    isRecommended: api.id === 2,
    featureDescriptions,
  }
}

async function getPlans(): Promise<PlanDetails[]> {
  // Try the new public endpoint first
  try {
    const res = await fetch(API_PUBLIC_PLANS_URL, { cache: "no-store" })
    if (res.ok) {
      const data: PublicPlan[] = await res.json()
      if (Array.isArray(data) && data.length > 0) {
        return data.map(transformPublicPlan)
      }
    }
  } catch {
    // Fall through to legacy
  }

  // Fallback to legacy endpoint
  try {
    const res = await fetch(API_LEGACY_PLANS_URL, { cache: "no-store" })
    if (!res.ok) return []
    const data: LegacyPlan[] = await res.json()
    if (!Array.isArray(data)) return []
    return data.filter((p) => p.isActive).map(transformLegacyPlan)
  } catch {
    return []
  }
}

async function getTrialDays(): Promise<number> {
  try {
    const res = await fetch(API_PUBLIC_SETTINGS_URL, { cache: "no-store" })
    if (res.ok) {
      const data = await res.json()
      if (data?.trialDays && typeof data.trialDays === "number" && data.trialDays >= 1 && data.trialDays <= 90) {
        return data.trialDays
      }
    }
  } catch {
    // fallback
  }
  return 14
}

export default async function LandingPage() {
  const [allPlans, trialDays] = await Promise.all([getPlans(), getTrialDays()])
  const plans = allPlans.sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0))

  return (
    <TranslationProvider trialDays={trialDays}>
      <LandingPageContent initialPlans={plans} />
    </TranslationProvider>
  )
}
