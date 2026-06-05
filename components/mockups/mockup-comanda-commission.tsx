import { COMANDA, COMMISSIONS } from "./mockup-data"

function ComandaCard() {
  return (
    <div className="bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 p-3 h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-2.5">
        <div className="flex items-center gap-1.5">
          <span className="text-[11px] font-bold text-zinc-800 dark:text-white">
            Comanda {COMANDA.ticket}
          </span>
        </div>
        <span className="text-[8px] font-semibold px-1.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400">
          Pago
        </span>
      </div>

      {/* Client */}
      <div className="text-[10px] text-zinc-500 dark:text-zinc-400 mb-2">
        Cliente: <span className="text-zinc-700 dark:text-zinc-200 font-medium">{COMANDA.client}</span>
      </div>

      {/* Items */}
      <div className="space-y-1.5 flex-1">
        {COMANDA.items.map((item, i) => (
          <div key={i} className="flex items-center justify-between">
            <div className="min-w-0">
              <div className="text-[10px] font-medium text-zinc-700 dark:text-zinc-200 truncate">
                {item.service}
              </div>
              <div className="text-[8px] text-zinc-400 dark:text-zinc-500">
                {item.professional}
              </div>
            </div>
            <span className="text-[10px] font-medium text-zinc-700 dark:text-zinc-200 flex-shrink-0 ml-2">
              R$ {item.value}
            </span>
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className="border-t border-zinc-200 dark:border-zinc-700 my-2" />

      {/* Total */}
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-bold text-zinc-800 dark:text-white">Total</span>
        <span className="text-[12px] font-bold text-zinc-800 dark:text-white">
          R$ {COMANDA.total},00
        </span>
      </div>

      {/* Payment method */}
      <div className="flex items-center gap-1 mt-1.5">
        <svg
          viewBox="0 0 24 24"
          className="w-3 h-3 text-[#32BCAD]"
          fill="currentColor"
        >
          <path d="M9.5 4.5L6 8l3.5 3.5M14.5 4.5L18 8l-3.5 3.5M6 16l3.5-3.5M18 16l-3.5-3.5M4.5 12h15" />
        </svg>
        <span className="text-[9px] text-zinc-500 dark:text-zinc-400 font-medium">PIX</span>
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
    <div className="bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 p-3 h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-2.5">
        <span className="text-[11px] font-bold text-zinc-800 dark:text-white">Comissões</span>
        <span className="text-[10px] font-semibold text-zinc-600 dark:text-zinc-300">
          R$ {COMMISSIONS.total.toLocaleString("pt-BR")}
        </span>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-3 gap-1.5 mb-3">
        {COMMISSIONS.kpis.map((kpi) => {
          const style = KPI_STYLES[kpi.color]
          return (
            <div
              key={kpi.label}
              className={`${style.bg} rounded-lg px-2 py-1.5 text-center`}
            >
              <div className={`text-[10px] font-bold ${style.text}`}>
                R$ {kpi.value.toLocaleString("pt-BR")}
              </div>
              <div className="text-[8px] text-zinc-500 dark:text-zinc-400 mt-0.5">
                {kpi.label}
              </div>
            </div>
          )
        })}
      </div>

      {/* Professional ranking */}
      <div className="space-y-2 flex-1">
        {COMMISSIONS.professionals.map((prof, i) => (
          <div key={prof.name} className="flex items-center gap-2">
            {/* Avatar */}
            <div className="w-6 h-6 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center flex-shrink-0">
              <span className="text-[8px] font-bold text-primary">{prof.initials}</span>
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-medium text-zinc-700 dark:text-zinc-200 truncate">
                  {prof.name}
                </span>
                <span className="text-[10px] font-semibold text-zinc-700 dark:text-zinc-200 flex-shrink-0 ml-1">
                  R$ {prof.value.toLocaleString("pt-BR")}
                </span>
              </div>
              <div className="flex items-center gap-1.5 mt-0.5">
                <div className="flex-1 h-1 bg-zinc-100 dark:bg-zinc-700 rounded-full overflow-hidden">
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
      className="w-full h-full p-3 flex items-center"
      aria-hidden="true"
      role="img"
      aria-label="Comanda e comissões"
    >
      <div className="grid grid-cols-2 gap-2.5 w-full">
        <ComandaCard />
        <CommissionsCard />
      </div>
    </div>
  )
}
