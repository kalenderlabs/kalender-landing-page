"use client"

import { useTranslation } from "@/contexts/translation-context"
import { CheckCircle } from "lucide-react"

export function AIWhatsAppSection() {
  const { t } = useTranslation()

  const points = [
    t("landing.ai_wa_point1"),
    t("landing.ai_wa_point2"),
    t("landing.ai_wa_point3"),
  ]

  const chatMessages = [
    { from: "client", text: t("landing.ai_wa_chat_msg1") },
    { from: "bot", text: t("landing.ai_wa_chat_msg2") },
    { from: "client", text: t("landing.ai_wa_chat_msg3") },
    { from: "bot", text: t("landing.ai_wa_chat_msg4") },
  ]

  return (
    <section id="ai-whatsapp" className="py-20 bg-zinc-100 dark:bg-zinc-950 scroll-mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div className="animate-on-scroll">
            <div className="inline-flex items-center px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-500/20 bg-emerald-50 dark:bg-emerald-500/10 mb-6">
              <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2 animate-pulse" />
              <span className="text-emerald-700 dark:text-emerald-400 text-sm font-medium">
                {t("landing.ai_wa_badge")}
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-zinc-900 dark:text-white tracking-tight mb-6">
              {t("landing.ai_wa_title")}
            </h2>

            <p className="text-zinc-600 dark:text-zinc-400 text-lg leading-relaxed mb-8">
              {t("landing.ai_wa_description")}
            </p>

            <div className="space-y-3">
              {points.map((point, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <span className="text-zinc-700 dark:text-zinc-300 text-sm">{point}</span>
                </div>
              ))}
            </div>
          </div>

          {/* WhatsApp Chat Mockup */}
          <div className="animate-on-scroll-scale">
            <div className="max-w-sm mx-auto">
              {/* Chat Header */}
              <div className="bg-[#075E54] dark:bg-[#1F2C34] rounded-t-2xl px-4 py-3 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
                  <span className="text-white text-sm font-bold">K</span>
                </div>
                <div>
                  <div className="text-white text-sm font-semibold">{t("landing.ai_wa_chat_name")}</div>
                  <div className="text-white/60 text-xs">{t("landing.ai_wa_chat_status")}</div>
                </div>
              </div>

              {/* Chat Body */}
              <div className="bg-[#ECE5DD] dark:bg-[#0B141A] px-3 py-4 space-y-2.5 min-h-[280px]">
                {chatMessages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex ${msg.from === "client" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-xl px-3.5 py-2 text-sm leading-relaxed ${
                        msg.from === "client"
                          ? "bg-[#DCF8C6] dark:bg-[#005C4B] text-zinc-800 dark:text-white rounded-tr-none"
                          : "bg-white dark:bg-[#1F2C34] text-zinc-800 dark:text-zinc-200 rounded-tl-none"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>

              {/* Chat Footer */}
              <div className="bg-[#F0F0F0] dark:bg-[#1F2C34] rounded-b-2xl px-4 py-3">
                <div className="bg-white dark:bg-[#2A3942] rounded-full px-4 py-2 text-sm text-zinc-400">
                  {t("landing.ai_wa_chat_input")}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
