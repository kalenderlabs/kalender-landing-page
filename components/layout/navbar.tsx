"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { KalenderLogo } from "@/components/kalender-logo"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useTranslation } from "@/contexts/translation-context"
import type { Locale } from "@/lib/translations"
import { ArrowRight, ChevronDown, Globe, Menu, Monitor, Moon, Sun, X } from "lucide-react"

const LOGIN_URL = "https://app.kalender.com.br/login"
const ONBOARDING_URL = "https://app.kalender.com.br/onboarding"

const LANGUAGES: { code: Locale; label: string; flag: string }[] = [
  { code: "pt", label: "Português", flag: "🇧🇷" },
  { code: "en", label: "English", flag: "🇺🇸" },
  { code: "es", label: "Español", flag: "🇪🇸" },
]

const NAV_SECTIONS = ["solution", "ai-whatsapp", "pricing", "faq"] as const

interface NavbarProps {
  /** Force the "scrolled" (solid bg) appearance — use on pages with white backgrounds */
  solid?: boolean
}

export function Navbar({ solid = false }: NavbarProps) {
  const { t, language, setLanguage } = useTranslation()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [scrolled, setScrolled] = useState(solid)
  const [activeSection, setActiveSection] = useState<string>("")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => setMounted(true), [])

  useEffect(() => {
    if (solid) return
    let ticking = false
    const handleScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 20)

        let current = ""
        for (const id of NAV_SECTIONS) {
          const el = document.getElementById(id)
          if (el) {
            const rect = el.getBoundingClientRect()
            if (rect.top <= 120 && rect.bottom > 120) {
              current = id
            }
          }
        }
        setActiveSection(current)
        ticking = false
      })
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [solid])

  useEffect(() => {
    if (!mobileMenuOpen) return
    const close = () => setMobileMenuOpen(false)
    window.addEventListener("scroll", close, { passive: true })
    return () => window.removeEventListener("scroll", close)
  }, [mobileMenuOpen])

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false)
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: "smooth" })
    } else {
      window.location.href = `/#${id}`
    }
  }

  const navItems = [
    { label: t("landing.nav_solution"), id: "solution" },
    { label: t("landing.nav_ai"), id: "ai-whatsapp" },
    { label: t("landing.nav_pricing"), id: "pricing" },
    { label: t("landing.nav_faq"), id: "faq" },
  ]

  const currentLang = LANGUAGES.find((l) => l.code === language) || LANGUAGES[0]

  const cycleTheme = () => {
    if (theme === "light") setTheme("dark")
    else if (theme === "dark") setTheme("system")
    else setTheme("light")
  }

  const ThemeToggle = () => {
    if (!mounted) return <div className="w-8 h-8" />
    const Icon = theme === "dark" ? Moon : theme === "system" ? Monitor : Sun
    return (
      <button
        onClick={cycleTheme}
        className="flex items-center justify-center w-8 h-8 rounded-lg text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200/60 dark:hover:bg-zinc-800 transition-colors"
        aria-label="Toggle theme"
        title={theme === "light" ? "Light" : theme === "dark" ? "Dark" : "System"}
      >
        <Icon className="h-4 w-4" />
      </button>
    )
  }

  const LanguageSelector = () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-sm font-medium transition-colors border border-zinc-200 dark:border-zinc-500/25 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800">
          <Globe className="h-3.5 w-3.5" />
          <span>{currentLang.flag}</span>
          <span className="hidden sm:inline text-xs">{currentLang.code.toUpperCase()}</span>
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
  )

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || mobileMenuOpen
          ? "bg-white/80 dark:bg-zinc-950/80 backdrop-blur-lg border-b border-zinc-200/60 dark:border-zinc-700/60"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-2.5 hover:opacity-80 transition-opacity"
          >
            <KalenderLogo width={32} height={32} />
            <span className="text-lg font-extrabold tracking-tight hidden sm:block text-zinc-900 dark:text-white">
              Kalender
            </span>
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`relative inline-block px-4 py-2 text-sm font-medium transition-colors ${
                  activeSection === item.id
                    ? "text-zinc-900 dark:text-white before:content-[''] before:absolute before:left-2 before:right-2 before:bottom-[7px] before:h-1 before:bg-primary/40 before:rounded-sm"
                    : "text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <LanguageSelector />
            <Button
              variant="ghost"
              className="hidden md:inline-flex text-sm font-medium text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800"
              onClick={() => (window.location.href = LOGIN_URL)}
            >
              {t("landing.nav_login")}
            </Button>
            <Button
              className="hidden md:inline-flex bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-sm rounded-xl px-5"
              onClick={() => (window.location.href = ONBOARDING_URL)}
            >
              {t("landing.nav_cta")}
              <ArrowRight className="ml-1.5 h-4 w-4" />
            </Button>

            {/* Mobile Hamburger */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-zinc-700 dark:text-zinc-300"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-out ${
            mobileMenuOpen ? "max-h-96 opacity-100 mt-3" : "max-h-0 opacity-0 mt-0"
          }`}
        >
          <div className="pt-4 pb-2 border-t border-zinc-200/50 dark:border-zinc-700/50">
            <nav className="flex flex-col gap-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`relative text-left py-2.5 px-3 rounded-lg font-medium text-sm transition-colors ${
                    activeSection === item.id
                      ? "text-zinc-900 dark:text-white before:content-[''] before:absolute before:left-3 before:right-3 before:bottom-2 before:h-1 before:bg-primary/40 before:rounded-sm"
                      : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <div className="border-t border-zinc-100 dark:border-zinc-500/25 mt-2 pt-2 flex flex-col gap-2">
                <Button
                  variant="outline"
                  className="justify-start"
                  onClick={() => {
                    setMobileMenuOpen(false)
                    window.location.href = LOGIN_URL
                  }}
                >
                  {t("landing.nav_login")}
                </Button>
                <Button
                  className="justify-start bg-primary text-primary-foreground"
                  onClick={() => {
                    setMobileMenuOpen(false)
                    window.location.href = ONBOARDING_URL
                  }}
                >
                  {t("landing.nav_cta")} <ArrowRight className="ml-1.5 h-4 w-4" />
                </Button>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
  )
}
