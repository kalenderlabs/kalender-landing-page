"use client"

import { useState, useRef } from "react"
import { useTranslation } from "@/contexts/translation-context"
import { ChevronDown } from "lucide-react"

export function FAQSection() {
  const { t } = useTranslation()
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const faqRefs = useRef<(HTMLDivElement | null)[]>([])

  const faqCount = 8
  const faqs = Array.from({ length: faqCount }, (_, i) => ({
    q: t(`landing.faq_q${i + 1}`),
    a: t(`landing.faq_a${i + 1}`),
  }))

  return (
    <section id="faq" className="py-20 bg-zinc-100 dark:bg-zinc-950 scroll-mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12 animate-on-scroll">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-zinc-900 dark:text-white tracking-tight mb-4">
              {t("landing.faq_title")}
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => {
              const isOpen = openFaq === i
              return (
                <div key={i} className="animate-on-scroll">
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    className={`w-full flex items-center justify-between p-5 bg-white dark:bg-zinc-950 border transition-all duration-300 ease-in-out text-left ${
                      isOpen
                        ? "rounded-t-xl border-zinc-200 dark:border-zinc-500/25"
                        : "rounded-xl border-zinc-200 dark:border-zinc-500/25 hover:border-zinc-300 dark:hover:border-zinc-700"
                    }`}
                  >
                    <span
                      className={`font-semibold text-sm pr-4 transition-colors ${
                        isOpen ? "text-primary" : "text-zinc-900 dark:text-white"
                      }`}
                    >
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`h-5 w-5 flex-shrink-0 transition-transform duration-300 ${
                        isOpen ? "rotate-180 text-primary" : "text-zinc-400"
                      }`}
                    />
                  </button>
                  <div
                    ref={(el) => {
                      faqRefs.current[i] = el
                    }}
                    className="overflow-hidden transition-all duration-300 ease-out"
                    style={{
                      maxHeight: isOpen ? `${faqRefs.current[i]?.scrollHeight ?? 200}px` : "0px",
                      opacity: isOpen ? 1 : 0,
                    }}
                  >
                    <div className="px-5 pb-5 pt-2 bg-white dark:bg-zinc-950 rounded-b-xl border border-t-0 border-zinc-200 dark:border-zinc-500/25">
                      <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">{faq.a}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
