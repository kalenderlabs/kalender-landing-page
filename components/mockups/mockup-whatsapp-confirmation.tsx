import { CheckCheck } from "lucide-react"
import { WHATSAPP_MESSAGES } from "./mockup-data"

function StatusBar() {
  return (
    <div className="flex items-center justify-between px-4 py-1 text-white text-[10px]">
      <span className="font-medium">14:30</span>
      <div className="flex items-center gap-1">
        {/* Signal bars */}
        <svg width="12" height="10" viewBox="0 0 12 10" fill="currentColor" className="opacity-80">
          <rect x="0" y="7" width="2" height="3" rx="0.5" />
          <rect x="3" y="5" width="2" height="5" rx="0.5" />
          <rect x="6" y="3" width="2" height="7" rx="0.5" />
          <rect x="9" y="0" width="2" height="10" rx="0.5" />
        </svg>
        {/* Battery */}
        <svg width="16" height="9" viewBox="0 0 16 9" fill="currentColor" className="opacity-80">
          <rect x="0" y="0" width="13" height="9" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1" />
          <rect x="1.5" y="1.5" width="8" height="6" rx="0.5" />
          <rect x="13" y="2.5" width="2" height="4" rx="0.5" />
        </svg>
      </div>
    </div>
  )
}

function ChatHeader() {
  return (
    <div className="bg-[#075E54] dark:bg-[#1F2C34] px-3 py-2 flex items-center gap-2.5">
      <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
        <span className="text-white text-[10px] font-bold">K</span>
      </div>
      <div className="min-w-0">
        <div className="text-white text-[11px] font-semibold leading-tight">Kalender</div>
        <div className="text-white/60 text-[9px] leading-tight">online</div>
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
    return (
      <div className="flex justify-start">
        <div className="max-w-[85%] rounded-xl rounded-tl-none bg-white dark:bg-[#1F2C34] px-3 py-2 shadow-sm">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5">
              <span className="text-[9px] text-zinc-500 dark:text-zinc-400">📋 Serviço:</span>
              <span className="text-[10px] font-medium text-zinc-700 dark:text-zinc-200">
                {message.service}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[9px] text-zinc-500 dark:text-zinc-400">📅 Data:</span>
              <span className="text-[10px] font-medium text-zinc-700 dark:text-zinc-200">
                {message.date}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[9px] text-zinc-500 dark:text-zinc-400">🕐 Horário:</span>
              <span className="text-[10px] font-medium text-zinc-700 dark:text-zinc-200">
                {message.time}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[9px] text-zinc-500 dark:text-zinc-400">💇 Profissional:</span>
              <span className="text-[10px] font-medium text-zinc-700 dark:text-zinc-200">
                {message.professional}
              </span>
            </div>
          </div>
          <div className="flex justify-end mt-1">
            <span className="text-[8px] text-zinc-400 dark:text-zinc-500">14:25</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`flex ${isClient ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[80%] rounded-xl px-2.5 py-1.5 shadow-sm ${
          isClient
            ? "bg-[#DCF8C6] dark:bg-[#005C4B] text-zinc-800 dark:text-white rounded-tr-none"
            : "bg-white dark:bg-[#1F2C34] text-zinc-800 dark:text-zinc-200 rounded-tl-none"
        }`}
      >
        <div className="text-[11px] leading-relaxed">{"text" in message ? message.text : ""}</div>
        <div className="flex items-center justify-end gap-0.5 mt-0.5">
          <span className="text-[8px] text-zinc-400 dark:text-zinc-500">
            {isClient ? "14:28" : "14:25"}
          </span>
          {isClient && <CheckCheck className="w-3 h-3 text-[#53BDEB]" />}
        </div>
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
      aria-label="Confirmação automática no WhatsApp"
    >
      {/* Phone frame */}
      <div className="w-full max-w-[240px] rounded-[1.5rem] border-[3px] border-zinc-800 dark:border-zinc-600 bg-zinc-900 overflow-hidden shadow-xl">
        <StatusBar />
        <ChatHeader />

        {/* Chat area */}
        <div className="bg-[#ECE5DD] dark:bg-[#0B141A] px-2 py-3 space-y-1.5 min-h-[180px]">
          {WHATSAPP_MESSAGES.map((msg, i) => (
            <MessageBubble key={i} message={msg} />
          ))}
        </div>

        {/* Input bar */}
        <div className="bg-[#F0F0F0] dark:bg-[#1F2C34] px-2.5 py-2">
          <div className="bg-white dark:bg-[#2A3942] rounded-full px-3 py-1.5 text-[10px] text-zinc-400">
            Mensagem
          </div>
        </div>
      </div>
    </div>
  )
}
