"use client"

import { Globe, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useTranslation } from "@/hooks/useTranslation"

interface LanguageSwitcherProps {
  variant?: "default" | "outline" | "ghost"
  size?: "default" | "sm" | "lg"
  showText?: boolean
}

const languages = [
  { code: "pt-BR", name: "Português", flag: "🇧🇷", short: "PT" },
  { code: "en-US", name: "English", flag: "🇺🇸", short: "EN" },
  { code: "es-ES", name: "Español", flag: "🇪🇸", short: "ES" },
] as const

export function LanguageSwitcher({ variant = "outline", size = "default", showText = true }: LanguageSwitcherProps) {
  const { locale, changeLanguage } = useTranslation()

  const currentLanguage = languages.find((lang) => lang.code === locale) || languages[0]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="default"
          className="
            h-10 px-4 py-2
            bg-white 
            border border-gray-200 
            rounded-lg
            hover:bg-gray-50 
            hover:border-gray-300
            focus:bg-gray-50 
            focus:border-blue-300 
            focus:ring-2 
            focus:ring-blue-100
            active:bg-gray-100 
            active:border-gray-400
            transition-all 
            duration-200 
            ease-in-out
            shadow-sm
            hover:shadow-md
            flex 
            items-center 
            justify-between 
            gap-2
            min-w-[100px]
            font-medium
            text-gray-700
            hover:text-gray-900
          "
        >
          <div className="flex items-center gap-2">
            <Globe className="h-4 w-4 text-gray-500" />
            <span className="text-lg leading-none">{currentLanguage.flag}</span>
            {showText && <span className="text-sm font-medium">{currentLanguage.short}</span>}
          </div>
          <ChevronDown className="h-4 w-4 text-gray-400 transition-transform duration-200 group-data-[state=open]:rotate-180" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="
          bg-white 
          border 
          border-gray-200 
          rounded-lg 
          shadow-lg 
          min-w-[140px]
          p-1
        "
      >
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => changeLanguage(language.code as any)}
            className={`
              flex 
              items-center 
              gap-3 
              px-3 
              py-2.5
              cursor-pointer 
              rounded-md
              transition-colors
              duration-150
              hover:bg-gray-50
              focus:bg-gray-50
              ${locale === language.code ? "bg-blue-50 text-blue-700 font-medium" : "text-gray-700 hover:text-gray-900"}
            `}
          >
            <span className="text-lg leading-none">{language.flag}</span>
            <div className="flex flex-col">
              <span className="text-sm font-medium">{language.short}</span>
              <span className="text-xs text-gray-500">{language.name}</span>
            </div>
            {locale === language.code && <div className="ml-auto w-2 h-2 bg-blue-500 rounded-full" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
