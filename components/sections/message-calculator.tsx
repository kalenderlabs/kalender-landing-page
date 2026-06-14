"use client"

import { useEffect, useState, useCallback, useMemo } from "react"
import { Badge } from "@/components/ui/badge"

// ─── Types ──────────────────────────────────────────────────────────────────

interface ChannelConfig {
  code: string
  label: string
  icon: string
  defaultVolume: number
  step: number
}

interface CalculatorConfig {
  enabled: boolean
  title: string
  subtitle: string
  channels: ChannelConfig[]
}

interface QuotaInfo {
  included: number
  overagePriceTier1: number
  overagePriceTier2: number
  overagePriceTier3: number
  tier1Limit: number
  tier2Limit: number
}

interface PlanData {
  id: number
  name: string
  monthlyPrice: number
  annualPrice: number
  isRecommended: boolean
  displayOrder: number
  quotas: Record<string, QuotaInfo>
}

interface CalculatorResponse {
  config: CalculatorConfig
  plans: PlanData[]
}

// ─── Helpers ────────────────────────────────────────────────────────────────

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://api.kalender.com.br"

function formatPrice(price: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price)
}

function calculateOverageCost(volume: number, quota: QuotaInfo): number {
  const overage = Math.max(0, volume - quota.included)
  if (overage === 0) return 0

  let cost = 0
  if (overage <= quota.tier1Limit) {
    cost = overage * quota.overagePriceTier1
  } else if (overage <= quota.tier2Limit) {
    cost =
      quota.tier1Limit * quota.overagePriceTier1 +
      (overage - quota.tier1Limit) * quota.overagePriceTier2
  } else {
    cost =
      quota.tier1Limit * quota.overagePriceTier1 +
      (quota.tier2Limit - quota.tier1Limit) * quota.overagePriceTier2 +
      (overage - quota.tier2Limit) * quota.overagePriceTier3
  }
  return cost
}

function getChannelIcon(icon: string): React.ReactNode {
  switch (icon) {
    case "whatsapp":
      return (
        <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      )
    case "instagram":
      return (
        <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
        </svg>
      )
    case "sms":
      return (
        <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
          <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.17L4 17.17V4h16v12zM7 9h2v2H7V9zm4 0h2v2h-2V9zm4 0h2v2h-2V9z" />
        </svg>
      )
    case "email":
      return (
        <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
          <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
        </svg>
      )
    case "ai":
      return (
        <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
          <path d="M21 10.975V8a2 2 0 00-2-2h-6V4.688c.305-.274.5-.668.5-1.11a1.5 1.5 0 00-3 0c0 .442.195.836.5 1.11V6H5a2 2 0 00-2 2v2.998l-.072.005A.999.999 0 002 12v2a1 1 0 001 1v5a2 2 0 002 2h14a2 2 0 002-2v-5a1 1 0 001-1v-2a1 1 0 00-1-1.025zM9 13.5a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm6 0a1.5 1.5 0 110-3 1.5 1.5 0 010 3z" />
        </svg>
      )
    default:
      return (
        <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
          <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
        </svg>
      )
  }
}

function formatVolume(value: number): string {
  if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`
  if (value >= 1000) return `${(value / 1000).toFixed(value >= 10000 ? 0 : 1)}k`
  return value.toLocaleString("pt-BR")
}

// ─── Channel Volume Input ───────────────────────────────────────────────────

interface ChannelVolumeInputProps {
  channel: ChannelConfig
  volume: number
  onVolumeChange: (code: string, volume: number) => void
}

function ChannelVolumeInput({
  channel,
  volume,
  onVolumeChange,
}: ChannelVolumeInputProps) {
  const maxVolume = channel.defaultVolume * 10
  const percentage = (volume / maxVolume) * 100

  return (
    <div className="flex items-center gap-4 py-3">
      <div className="flex items-center gap-2.5 w-36 flex-shrink-0">
        <span className="text-primary">{getChannelIcon(channel.icon)}</span>
        <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
          {channel.label}
        </span>
      </div>

      <div className="flex-1 relative">
        <input
          type="range"
          min={0}
          max={maxVolume}
          step={channel.step}
          value={volume}
          onChange={(e) => onVolumeChange(channel.code, Number(e.target.value))}
          className="w-full h-2 rounded-full appearance-none cursor-pointer
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:h-5
            [&::-webkit-slider-thumb]:w-5
            [&::-webkit-slider-thumb]:rounded-full
            [&::-webkit-slider-thumb]:bg-primary
            [&::-webkit-slider-thumb]:shadow-md
            [&::-webkit-slider-thumb]:cursor-pointer
            [&::-webkit-slider-thumb]:border-2
            [&::-webkit-slider-thumb]:border-white
            [&::-webkit-slider-thumb]:dark:border-zinc-800
            [&::-webkit-slider-thumb]:transition-transform
            [&::-webkit-slider-thumb]:hover:scale-110
            [&::-moz-range-thumb]:h-5
            [&::-moz-range-thumb]:w-5
            [&::-moz-range-thumb]:rounded-full
            [&::-moz-range-thumb]:bg-primary
            [&::-moz-range-thumb]:shadow-md
            [&::-moz-range-thumb]:cursor-pointer
            [&::-moz-range-thumb]:border-2
            [&::-moz-range-thumb]:border-white
            [&::-moz-range-thumb]:dark:border-zinc-800"
          style={{
            background: `linear-gradient(to right, hsl(199 89% 48%) 0%, hsl(199 89% 48%) ${percentage}%, rgb(228 228 231) ${percentage}%, rgb(228 228 231) 100%)`,
          }}
          aria-label={`Volume de ${channel.label}`}
        />
      </div>

      <div className="w-28 flex-shrink-0">
        <input
          type="number"
          min={0}
          max={maxVolume}
          step={channel.step}
          value={volume}
          onChange={(e) => {
            const val = Math.max(0, Math.min(maxVolume, Number(e.target.value) || 0))
            onVolumeChange(channel.code, val)
          }}
          className="w-full px-3 py-1.5 text-sm text-right rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-colors"
          aria-label={`Volume exato de ${channel.label}`}
        />
      </div>
    </div>
  )
}

// ─── Plan Cost Card ─────────────────────────────────────────────────────────

interface PlanCostCardProps {
  plan: PlanData
  volumes: Record<string, number>
  channels: ChannelConfig[]
  isCheapest: boolean
}

function PlanCostCard({ plan, volumes, channels, isCheapest }: PlanCostCardProps) {
  const channelBreakdown = useMemo(() => {
    return channels.map((channel) => {
      const volume = volumes[channel.code] || 0
      const quota = plan.quotas[channel.code]
      if (!quota) {
        return {
          channel,
          volume,
          included: 0,
          overage: volume,
          overageCost: 0,
          hasQuota: false,
        }
      }
      const overageCost = calculateOverageCost(volume, quota)
      return {
        channel,
        volume,
        included: quota.included,
        overage: Math.max(0, volume - quota.included),
        overageCost,
        hasQuota: true,
      }
    })
  }, [plan, volumes, channels])

  const totalOverageCost = useMemo(
    () => channelBreakdown.reduce((sum, b) => sum + b.overageCost, 0),
    [channelBreakdown]
  )

  const estimatedTotal = plan.monthlyPrice + totalOverageCost

  return (
    <div
      className={`relative rounded-2xl bg-white dark:bg-zinc-950 p-6 transition-all duration-300 ease-in-out ${
        isCheapest
          ? "border-2 border-primary ring-1 ring-primary/20 shadow-lg"
          : "border border-zinc-200 dark:border-zinc-500/25 hover:shadow-md"
      }`}
    >
      {isCheapest && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <Badge className="bg-emerald-500 text-white font-semibold px-3 py-0.5 shadow-sm border-0">
            Mais econ&ocirc;mico
          </Badge>
        </div>
      )}

      {plan.isRecommended && !isCheapest && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <Badge className="bg-primary text-primary-foreground font-semibold px-3 py-0.5 shadow-sm border-0">
            Recomendado
          </Badge>
        </div>
      )}

      {/* Plan Header */}
      <div className="text-center mb-4">
        <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
          {plan.name}
        </h3>
        <div className="text-2xl font-extrabold text-zinc-900 dark:text-white mt-1">
          {formatPrice(plan.monthlyPrice)}
          <span className="text-sm font-normal text-zinc-500">/m&ecirc;s</span>
        </div>
      </div>

      {/* Channel Breakdown */}
      <div className="space-y-2 mb-4">
        {channelBreakdown.map((b) => (
          <div key={b.channel.code} className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5">
              <span className="text-zinc-400">{getChannelIcon(b.channel.icon)}</span>
              <span className="text-zinc-600 dark:text-zinc-400">{b.channel.label}</span>
            </div>
            <div className="text-right">
              {b.hasQuota ? (
                <>
                  {b.overage > 0 ? (
                    <span className="text-amber-600 dark:text-amber-400">
                      +{formatVolume(b.overage)} excedente ({formatPrice(b.overageCost)})
                    </span>
                  ) : (
                    <span className="text-emerald-600 dark:text-emerald-400">
                      Incluso ({formatVolume(b.included)})
                    </span>
                  )}
                </>
              ) : (
                <span className="text-zinc-400">--</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className="border-t border-zinc-100 dark:border-zinc-800 my-4" />

      {/* Total */}
      <div className="space-y-1.5">
        <div className="flex justify-between text-sm">
          <span className="text-zinc-500 dark:text-zinc-400">Plano base</span>
          <span className="text-zinc-700 dark:text-zinc-300">{formatPrice(plan.monthlyPrice)}</span>
        </div>
        {totalOverageCost > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-zinc-500 dark:text-zinc-400">Excedentes</span>
            <span className="text-amber-600 dark:text-amber-400">
              +{formatPrice(totalOverageCost)}
            </span>
          </div>
        )}
        <div className="flex justify-between text-base font-bold pt-1">
          <span className="text-zinc-900 dark:text-white">Total estimado</span>
          <span className={isCheapest ? "text-primary" : "text-zinc-900 dark:text-white"}>
            {formatPrice(estimatedTotal)}
          </span>
        </div>
      </div>
    </div>
  )
}

// ─── Main Section ───────────────────────────────────────────────────────────

export function MessageCalculatorSection() {
  const [data, setData] = useState<CalculatorResponse | null>(null)
  const [volumes, setVolumes] = useState<Record<string, number>>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  // Fetch calculator data
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`${API_BASE_URL}/billing/calculator/public`)
        if (!res.ok) throw new Error("Failed to fetch")
        const json: CalculatorResponse = await res.json()
        setData(json)

        // Initialize volumes from defaults
        const initialVolumes: Record<string, number> = {}
        json.config.channels.forEach((ch) => {
          initialVolumes[ch.code] = ch.defaultVolume
        })
        setVolumes(initialVolumes)
      } catch {
        setError(true)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const handleVolumeChange = useCallback((code: string, value: number) => {
    setVolumes((prev) => ({ ...prev, [code]: value }))
  }, [])

  // Calculate estimated totals per plan to find cheapest
  const planTotals = useMemo(() => {
    if (!data) return []
    return data.plans
      .sort((a, b) => a.displayOrder - b.displayOrder)
      .map((plan) => {
        const overageCost = data.config.channels.reduce((sum, ch) => {
          const volume = volumes[ch.code] || 0
          const quota = plan.quotas[ch.code]
          if (!quota) return sum
          return sum + calculateOverageCost(volume, quota)
        }, 0)
        return { plan, total: plan.monthlyPrice + overageCost }
      })
  }, [data, volumes])

  const cheapestPlanId = useMemo(() => {
    if (planTotals.length === 0) return null
    const min = planTotals.reduce((prev, curr) =>
      curr.total < prev.total ? curr : prev
    )
    return min.plan.id
  }, [planTotals])

  // Don't render if disabled, errored, or no data
  if (loading) return null
  if (error || !data) return null
  if (!data.config.enabled) return null

  return (
    <section className="py-20 bg-zinc-50 dark:bg-zinc-900/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 animate-on-scroll">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-zinc-900 dark:text-white tracking-tight mb-4">
            {data.config.title}
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 text-lg lg:text-xl max-w-2xl mx-auto">
            {data.config.subtitle}
          </p>
        </div>

        {/* Volume Inputs */}
        <div className="max-w-3xl mx-auto mb-12 animate-on-scroll">
          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-500/25 bg-white dark:bg-zinc-950 p-6 sm:p-8 shadow-sm">
            <h3 className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-4">
              Volume mensal estimado
            </h3>
            <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
              {data.config.channels.map((channel) => (
                <ChannelVolumeInput
                  key={channel.code}
                  channel={channel}
                  volume={volumes[channel.code] || 0}
                  onVolumeChange={handleVolumeChange}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Plan Comparison Grid */}
        <div className="animate-on-scroll">
          <div
            className={`grid gap-6 max-w-5xl mx-auto ${
              planTotals.length <= 2
                ? "md:grid-cols-2 max-w-3xl"
                : planTotals.length === 3
                ? "md:grid-cols-3"
                : "md:grid-cols-2 lg:grid-cols-4"
            }`}
          >
            {planTotals.map(({ plan }) => (
              <PlanCostCard
                key={plan.id}
                plan={plan}
                volumes={volumes}
                channels={data.config.channels}
                isCheapest={plan.id === cheapestPlanId}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
