export const locales = ["pt-BR", "en-US", "es-ES"] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = "pt-BR"

export function getLocaleFromPathname(pathname: string): Locale {
  const segments = pathname.split("/")
  const potentialLocale = segments[1]

  if (locales.includes(potentialLocale as Locale)) {
    return potentialLocale as Locale
  }

  return defaultLocale
}
