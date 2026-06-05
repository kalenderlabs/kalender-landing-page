import { CheckCheck } from "lucide-react"
import { WHATSAPP_MESSAGES } from "./mockup-data"

function DynamicIsland() {
  return (
    <div className="flex justify-center pt-2 pb-1 bg-zinc-900">
      <div className="w-20 h-5 bg-black rounded-full" />
    </div>
  )
}

function StatusBar() {
  return (
    <div className="flex items-center justify-between px-5 py-1 text-white text-[11px] bg-zinc-900">
      <span className="font-semibold">14:30</span>
      <div className="flex items-center gap-1.5">
        {/* Signal bars */}
        <svg width="16" height="12" viewBox="0 0 16 12" fill="currentColor" className="opacity-90">
          <rect x="0" y="9" width="3" height="3" rx="0.5" />
          <rect x="4" y="6" width="3" height="6" rx="0.5" />
          <rect x="8" y="3" width="3" height="9" rx="0.5" />
          <rect x="12" y="0" width="3" height="12" rx="0.5" />
        </svg>
        {/* WiFi */}
        <svg width="14" height="12" viewBox="0 0 14 12" fill="none" stroke="currentColor" strokeWidth="1.5" className="opacity-90">
          <path d="M1 4c3.3-3.3 8.7-3.3 12 0" strokeLinecap="round" />
          <path d="M3.5 6.5c1.9-1.9 5.1-1.9 7 0" strokeLinecap="round" />
          <path d="M6 9c0.6-0.6 1.4-0.6 2 0" strokeLinecap="round" />
        </svg>
        {/* Battery */}
        <svg width="20" height="10" viewBox="0 0 20 10" fill="currentColor" className="opacity-90">
          <rect x="0.5" y="0.5" width="16" height="9" rx="2" fill="none" stroke="currentColor" strokeWidth="1" />
          <rect x="2" y="2" width="10" height="6" rx="1" />
          <rect x="17" y="3" width="2" height="4" rx="0.5" />
        </svg>
      </div>
    </div>
  )
}

function ChatHeader() {
  return (
    <div className="bg-[#075E54] dark:bg-[#1F2C34] px-3 py-2.5 flex items-center gap-2.5">
      {/* Back arrow */}
      <svg width="10" height="16" viewBox="0 0 10 16" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 opacity-90">
        <path d="M8 2L2 8L8 14" />
      </svg>

      {/* Avatar */}
      <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
        <span className="text-white text-[12px] font-bold">K</span>
      </div>

      {/* Name / status */}
      <div className="min-w-0 flex-1">
        <div className="text-white text-[13px] font-semibold leading-tight">Kalender</div>
        <div className="text-white/60 text-[11px] leading-tight">online</div>
      </div>

      {/* Menu dots */}
      <svg width="4" height="16" viewBox="0 0 4 16" fill="white" className="flex-shrink-0 opacity-80">
        <circle cx="2" cy="2" r="1.5" />
        <circle cx="2" cy="8" r="1.5" />
        <circle cx="2" cy="14" r="1.5" />
      </svg>
    </div>
  )
}

function CardMessage({
  message,
}: {
  message: { service?: string; date?: string; time?: string; professional?: string }
}) {
  const fields = [
    { label: "Servico", value: message.service },
    { label: "Data", value: message.date },
    { label: "Horario", value: message.time },
    { label: "Profissional", value: message.professional },
  ]

  return (
    <div className="flex justify-start">
      <div className="max-w-[88%] rounded-lg rounded-tl-none bg-white dark:bg-[#1F2C34] shadow-sm overflow-hidden">
        {/* Title */}
        <div className="px-3 pt-2.5 pb-1.5">
          <div className="text-[13px] font-bold text-zinc-800 dark:text-white">
            Agendamento Confirmado
          </div>
        </div>

        {/* Fields */}
        <div className="px-3 pb-2">
          {fields.map((field, i) => (
            <div key={field.label}>
              {i > 0 && <div className="border-t border-zinc-100 dark:border-zinc-700/50" />}
              <div className="flex items-center py-1">
                <span className="w-[70px] text-[11px] text-zinc-500 dark:text-zinc-400 flex-shrink-0">
                  {field.label}
                </span>
                <span className="text-[12px] font-medium text-zinc-700 dark:text-zinc-200">
                  {field.value}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Timestamp */}
        <div className="flex justify-end px-3 pb-1.5">
          <span className="text-[10px] text-zinc-400 dark:text-zinc-500">14:25</span>
        </div>
      </div>
    </div>
  )
}

function MessageBubble({
  message,
}: {
  message: (typeof WHATSAPP_MESSAGES)[number]
}) {
  const isClient = message.from === "client"

  if ("isCard" in message && message.isCard) {
    return <CardMessage message={message} />
  }

  return (
    <div className={`flex ${isClient ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[82%] rounded-lg px-3 py-2 shadow-sm ${
          isClient
            ? "bg-[#DCF8C6] dark:bg-[#005C4B] text-zinc-800 dark:text-white rounded-tr-none"
            : "bg-white dark:bg-[#1F2C34] text-zinc-800 dark:text-zinc-200 rounded-tl-none"
        }`}
      >
        <div className="text-[13px] leading-relaxed">{"text" in message ? message.text : ""}</div>
        <div className="flex items-center justify-end gap-1 mt-0.5">
          <span className="text-[10px] text-zinc-400 dark:text-zinc-500">
            {isClient ? "14:28" : "14:25"}
          </span>
          {isClient && <CheckCheck className="w-3.5 h-3.5 text-[#53BDEB]" />}
        </div>
      </div>
    </div>
  )
}

function InputBar() {
  return (
    <div className="bg-[#F0F0F0] dark:bg-[#1F2C34] px-2.5 py-2 flex items-center gap-2">
      <div className="flex-1 bg-white dark:bg-[#2A3942] rounded-full px-3 py-1.5 text-[12px] text-zinc-400">
        Mensagem
      </div>
      {/* Send button */}
      <div className="w-8 h-8 rounded-full bg-[#075E54] flex items-center justify-center flex-shrink-0">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
          <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
        </svg>
      </div>
    </div>
  )
}

export function MockupWhatsAppConfirmation() {
  return (
    <div
      className="flex items-center justify-center w-full h-full"
      aria-hidden="true"
      role="img"
      aria-label="Confirmacao automatica no WhatsApp"
    >
      {/* Phone frame */}
      <div className="w-full max-w-[300px] rounded-[2.5rem] border-[4px] border-zinc-800 dark:border-zinc-600 bg-zinc-900 overflow-hidden shadow-2xl">
        <DynamicIsland />
        <StatusBar />
        <ChatHeader />

        {/* Chat area — messages pushed to bottom like real WhatsApp */}
        <div className="bg-[#ECE5DD] dark:bg-[#0B141A] px-3 py-3 flex flex-col justify-end min-h-[260px] space-y-2">
          {WHATSAPP_MESSAGES.map((msg, i) => (
            <MessageBubble key={i} message={msg} />
          ))}
        </div>

        <InputBar />

        {/* Bottom safe area */}
        <div className="h-4 bg-zinc-900" />
      </div>
    </div>
  )
}
