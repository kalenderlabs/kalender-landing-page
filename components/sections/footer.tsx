"use client"

import { useTranslation } from "@/contexts/translation-context"
import { KalenderLogo } from "@/components/kalender-logo"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import type { Locale } from "@/lib/translations"
import { Globe, ChevronDown } from "lucide-react"

const LANGUAGES: { code: Locale; label: string; flag: string }[] = [
  { code: "pt", label: "Português", flag: "🇧🇷" },
  { code: "en", label: "English", flag: "🇺🇸" },
  { code: "es", label: "Español", flag: "🇪🇸" },
]

export function FooterSection() {
  const { t, language, setLanguage } = useTranslation()

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: "smooth" })
    } else {
      window.location.href = `/#${id}`
    }
  }

  const currentLang = LANGUAGES.find((l) => l.code === language) || LANGUAGES[0]

  return (
    <footer className="bg-white dark:bg-zinc-950 text-zinc-500 dark:text-zinc-400 pt-16 pb-8 border-t border-zinc-200 dark:border-zinc-500/25">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5 mb-12">
          {/* Brand Column */}
          <div className="col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <KalenderLogo width={28} height={28} />
              <span className="text-zinc-900 dark:text-white font-bold text-lg">Kalender</span>
            </div>
            <p className="text-sm leading-relaxed mb-5 max-w-xs">
              {t("landing.footer_description")}
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://instagram.com/kalenderapp"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
              </a>
              <a
                href="https://linkedin.com/company/kalender"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-zinc-900 dark:text-white font-semibold mb-4 text-xs uppercase tracking-wider">{t("landing.footer_product")}</h4>
            <ul className="space-y-2.5">
              {[
                { label: t("landing.footer_solution"), action: () => scrollTo("solution") },
                { label: t("landing.footer_pricing"), action: () => scrollTo("pricing") },
                { label: t("landing.footer_faq"), action: () => scrollTo("faq") },
              ].map((item, i) => (
                <li key={i}>
                  <button
                    onClick={item.action}
                    className="text-sm hover:text-zinc-900 dark:hover:text-white transition-colors"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-zinc-900 dark:text-white font-semibold mb-4 text-xs uppercase tracking-wider">{t("landing.footer_company")}</h4>
            <ul className="space-y-2.5">
              <li>
                <a href="/contact" className="text-sm hover:text-zinc-900 dark:hover:text-white transition-colors">
                  {t("landing.footer_contact")}
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-zinc-900 dark:text-white font-semibold mb-4 text-xs uppercase tracking-wider">{t("landing.footer_legal")}</h4>
            <ul className="space-y-2.5">
              <li>
                <a href="/termos" className="text-sm hover:text-zinc-900 dark:hover:text-white transition-colors">
                  {t("landing.footer_terms")}
                </a>
              </li>
              <li>
                <a href="/privacidade" className="text-sm hover:text-zinc-900 dark:hover:text-white transition-colors">
                  {t("landing.footer_privacy")}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-zinc-200 dark:border-zinc-500/25 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-zinc-400 dark:text-zinc-500">{t("landing.footer_copyright")}</p>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-sm font-medium border border-zinc-200 dark:border-zinc-500/25 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
                <Globe className="h-3.5 w-3.5" />
                <span>{currentLang.flag}</span>
                <span className="text-xs">{currentLang.code.toUpperCase()}</span>
                <ChevronDown className="h-3 w-3 opacity-50" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-44">
              {LANGUAGES.map((lang) => (
                <DropdownMenuItem
                  key={lang.code}
                  onClick={() => setLanguage(lang.code)}
                  className={`flex items-center gap-2.5 cursor-pointer ${
                    language === lang.code ? "bg-primary/10 text-primary font-medium" : ""
                  }`}
                >
                  <span className="text-base">{lang.flag}</span>
                  <span>{lang.label}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </footer>
  )
}
