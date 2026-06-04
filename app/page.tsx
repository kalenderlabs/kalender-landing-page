import { TranslationProvider } from "@/contexts/translation-context"
import { LandingPageContent, type PlanDetails } from "@/components/landing-page-content"

// Re-export PlanDetails for external consumers
export type { PlanDetails }

const API_PUBLIC_PLANS_URL = "https://api.kalender.com.br/billing/plans/public"

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

function transformPublicPlan(api: PublicPlan): PlanDetails {
  const featureDescriptions: string[] = []

  for (const q of api.quotas || []) {
    featureDescriptions.push(q.formattedLabel)
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
  9: "Pesquisas de satisfação",
  10: "Suporte prioritário",
  11: "Agendamento online",
  12: "Gestão de profissionais",
}

function transformLegacyPlan(api: LegacyPlan): PlanDetails {
  const featureDescriptions: string[] = []
  for (const q of api.quotas) {
    const fn = QUOTA_LABELS[q.resourceCode]
    if (fn) featureDescriptions.push(fn(q.limit))
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

export default async function LandingPage() {
  const allPlans = await getPlans()

  // Filter for Early Adopter plan (first recommended, or first active, or just the first one)
  const earlyAdopter = allPlans.find((p) => p.isRecommended) || allPlans[0]
  const plans = earlyAdopter ? [earlyAdopter] : []

  return (
    <TranslationProvider>
      <LandingPageContent initialPlans={plans} />
    </TranslationProvider>
  )
}
