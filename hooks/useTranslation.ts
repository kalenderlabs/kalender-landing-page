"use client"

import { useParams, useRouter, usePathname } from "next/navigation"
import { translations } from "@/lib/translations"

type Locale = "pt-BR" | "en-US" | "es-ES"

export function useTranslation() {
  const params = useParams()
  const router = useRouter()
  const pathname = usePathname()

  const locale = (params?.locale as Locale) || "pt-BR"

  const t = (key: string): string => {
    const keys = key.split(".")
    let value: any = translations[locale]

    for (const k of keys) {
      value = value?.[k]
    }

    return value || key
  }

  const changeLanguage = (newLocale: Locale) => {
    // Remove o locale atual do pathname e adiciona o novo
    const pathWithoutLocale = pathname.replace(`/${locale}`, "")
    const newPath = `/${newLocale}${pathWithoutLocale}`
    router.push(newPath)
  }

  // Helper para gerar URLs com locale
  const getLocalizedPath = (path: string) => {
    // Remove barra inicial se existir
    const cleanPath = path.startsWith("/") ? path.slice(1) : path
    return `/${locale}/${cleanPath}`
  }

  return {
    t,
    locale,
    changeLanguage,
    getLocalizedPath,
  }
}
