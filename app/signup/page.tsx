"use client"

import { useTranslation } from "@/contexts/translation-context"
import { TranslationProvider } from "@/contexts/translation-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { LanguageSwitcher } from "@/components/language-switcher"
import { KalenderLogo } from "@/components/kalender-logo"

function SignupPageContent() {
  const { t } = useTranslation()

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="absolute top-4 right-4">
        <LanguageSwitcher />
      </div>

      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <KalenderLogo width={48} height={48} className="object-contain" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">{t("signup_title")}</CardTitle>
          <p className="text-gray-600">{t("signup_subtitle")}</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              {t("name")}
            </label>
            <Input id="name" type="text" placeholder={t("name")} className="w-full" />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              {t("email")}
            </label>
            <Input id="email" type="email" placeholder="seu@email.com" className="w-full" />
          </div>
          <div>
            <label htmlFor="business" className="block text-sm font-medium text-gray-700 mb-1">
              {t("business")}
            </label>
            <Input id="business" type="text" placeholder={t("business")} className="w-full" />
          </div>
          <Button className="w-full bg-primary hover:bg-primary/90">{t("signup_button")}</Button>
          <div className="text-center text-sm text-gray-600">
            {t("have_account")}{" "}
            <button
              onClick={() => (window.location.href = "/login")}
              className="text-primary hover:underline font-medium"
            >
              {t("login_link")}
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default function SignupPage() {
  return (
    <TranslationProvider>
      <SignupPageContent />
    </TranslationProvider>
  )
}
