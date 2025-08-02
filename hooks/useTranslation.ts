"use client"

import { useState, useEffect } from "react"
import { translations, type Locale, type TranslationKey, getTranslation } from "@/lib/translations"

export function useTranslation() {
  const [locale, setLocale] = useState<Locale>("pt")

  useEffect(() => {
    // Get locale from URL or localStorage
    const path = window.location.pathname
    const urlLocale = path.split("/")[1] as Locale

    if (urlLocale && translations[urlLocale]) {
      setLocale(urlLocale)
      localStorage.setItem("kalender-locale", urlLocale)
    } else {
      const savedLocale = localStorage.getItem("kalender-locale") as Locale
      if (savedLocale && translations[savedLocale]) {
        setLocale(savedLocale)
      }
    }
  }, [])

  const t = (key: TranslationKey): string => {
    return getTranslation(locale, key)
  }

  const changeLocale = (newLocale: Locale) => {
    setLocale(newLocale)
    localStorage.setItem("kalender-locale", newLocale)

    // Update URL
    const currentPath = window.location.pathname
    const pathWithoutLocale = currentPath.replace(/^\/[a-z]{2}(-[A-Z]{2})?/, "") || "/"
    const newPath = `/${newLocale}${pathWithoutLocale}`
    window.history.pushState({}, "", newPath)
    window.location.reload()
  }

  return { t, locale, changeLocale }
}
