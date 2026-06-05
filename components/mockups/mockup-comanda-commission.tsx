import { COMANDA, COMMISSIONS } from "./mockup-data"

function ComandaCard() {
  return (
    <div className="bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 p-4 h-full flex flex-col shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-2.5">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
              <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
              <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
            </svg>
          </div>
          <span className="text-[13px] font-bold text-zinc-800 dark:text-white">
            Comanda {COMANDA.ticket}
          </span>
        </div>
        <span className="text-[9px] font-semibold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400">
          Pago
        </span>
      </div>

      {/* Client */}
      <div className="text-[10px] text-zinc-500 dark:text-zinc-400 mb-2.5">
        Cliente: <span className="text-zinc-700 dark:text-zinc-200 font-medium">{COMANDA.client}</span>
      </div>

      {/* Items */}
      <div className="space-y-2.5 flex-1">
        {COMANDA.items.map((item, i) => (
          <div key={i} className="flex items-center justify-between">
            <div className="min-w-0">
              <div className="text-[11px] font-medium text-zinc-700 dark:text-zinc-200 truncate">
                {item.service}
              </div>
              <div className="text-[9px] text-zinc-400 dark:text-zinc-500">
                {item.professional}
              </div>
            </div>
            <span className="text-[11px] font-semibold tabular-nums font-mono text-zinc-700 dark:text-zinc-200 flex-shrink-0 ml-2">
              R$ {item.value}
            </span>
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className="border-t border-zinc-200 dark:border-zinc-700 my-2.5" />

      {/* Total */}
      <div className="flex items-center justify-between">
        <span className="text-[12px] font-bold text-zinc-800 dark:text-white">Total</span>
        <span className="text-[14px] font-bold tabular-nums font-mono text-zinc-800 dark:text-white">
          R$ {COMANDA.total},00
        </span>
      </div>

      {/* Payment method */}
      <div className="flex items-center gap-1.5 mt-2">
        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#32BCAD]/10 text-[#32BCAD]">
          PIX
        </span>
        <span className="text-[9px] text-zinc-500 dark:text-zinc-400 font-medium">
          pagamento realizado
        </span>
      </div>
    </div>
  )
}

const KPI_STYLES = {
  emerald: {
    bg: "bg-emerald-50 dark:bg-emerald-500/10",
    text: "text-emerald-700 dark:text-emerald-400",
  },
  blue: {
    bg: "bg-blue-50 dark:bg-blue-500/10",
    text: "text-blue-700 dark:text-blue-400",
  },
  amber: {
    bg: "bg-amber-50 dark:bg-amber-500/10",
    text: "text-amber-700 dark:text-amber-400",
  },
} as const

const PROGRESS_COLORS = {
  0: "bg-primary",
  1: "bg-blue-500",
  2: "bg-amber-500",
} as Record<number, string>

function CommissionsCard() {
  return (
    <div className="bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 p-4 h-full flex flex-col shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-2.5">
        <span className="text-[13px] font-bold text-zinc-800 dark:text-white">Comissoes</span>
        <span className="text-[12px] font-bold tabular-nums font-mono text-emerald-600 dark:text-emerald-400">
          R$ {COMMISSIONS.total.toLocaleString("pt-BR")}
        </span>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-3 gap-2 mb-3">
        {COMMISSIONS.kpis.map((kpi) => {
          const style = KPI_STYLES[kpi.color]
          return (
            <div
              key={kpi.label}
              className={`${style.bg} rounded-lg px-2 py-2 text-center`}
            >
              <div className={`text-[11px] font-bold tabular-nums font-mono ${style.text}`}>
                R$ {kpi.value.toLocaleString("pt-BR")}
              </div>
              <div className="text-[9px] font-medium text-zinc-500 dark:text-zinc-400 mt-0.5">
                {kpi.label}
              </div>
            </div>
          )
        })}
      </div>

      {/* Professional ranking */}
      <div className="space-y-2.5 flex-1">
        {COMMISSIONS.professionals.map((prof, i) => (
          <div key={prof.name} className="flex items-center gap-2.5">
            {/* Avatar */}
            <div className="w-8 h-8 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center flex-shrink-0">
              <span className="text-[9px] font-bold text-primary">{prof.initials}</span>
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-medium text-zinc-700 dark:text-zinc-200 truncate">
                  {prof.name}
                </span>
                <span className="text-[11px] font-bold tabular-nums font-mono text-emerald-600 dark:text-emerald-400 flex-shrink-0 ml-1">
                  R$ {prof.value.toLocaleString("pt-BR")}
                </span>
              </div>
              <div className="flex items-center gap-1.5 mt-0.5">
                <div className="flex-1 h-1.5 bg-zinc-100 dark:bg-zinc-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${PROGRESS_COLORS[i] || "bg-zinc-400"}`}
                    style={{ width: `${prof.percent}%` }}
                  />
                </div>
                <span className="text-[8px] text-zinc-400 dark:text-zinc-500 flex-shrink-0">
                  {prof.appointments} atend.
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function MockupComandaCommission() {
  return (
    <div
      className="w-full h-full p-4 flex items-center"
      aria-hidden="true"
      role="img"
      aria-label="Comanda e comissoes"
    >
      <div className="grid grid-cols-2 gap-3 w-full">
        <ComandaCard />
        <CommissionsCard />
      </div>
    </div>
  )
}
