"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { translations, type Locale } from "@/lib/translations"

interface TranslationContextType {
  language: Locale
  setLanguage: (lang: Locale) => void
  t: (key: string) => string
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined)

export function TranslationProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Locale>("pt")

  // Carregar idioma do localStorage
  useEffect(() => {
    const savedLanguage = localStorage.getItem("kalender-language") as Locale
    if (savedLanguage && (savedLanguage === "pt" || savedLanguage === "en" || savedLanguage === "es")) {
      setLanguage(savedLanguage)
    }
  }, [])

  // Salvar idioma no localStorage
  useEffect(() => {
    localStorage.setItem("kalender-language", language)
  }, [language])

  const t = (key: string): string => {
    // Navegar através de objetos aninhados usando notação de ponto
    const keys = key.split(".")
    let value: any = translations[language]

    for (const k of keys) {
      value = value?.[k]
      if (value === undefined) break
    }

    // Fallback para português se não encontrar
    if (value === undefined) {
      value = translations.pt
      for (const k of keys) {
        value = value?.[k]
        if (value === undefined) break
      }
    }

    return value || key
  }

  return <TranslationContext.Provider value={{ language, setLanguage, t }}>{children}</TranslationContext.Provider>
}

export function useTranslation() {
  const context = useContext(TranslationContext)
  if (context === undefined) {
    throw new Error("useTranslation must be used within a TranslationProvider")
  }
  return context
}
