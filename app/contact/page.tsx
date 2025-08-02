"use client"

import { useTranslation } from "@/contexts/translation-context"
import { TranslationProvider } from "@/contexts/translation-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { LanguageSwitcher } from "@/components/language-switcher"
import { KalenderLogo } from "@/components/kalender-logo"

function ContactPageContent() {
  const { t } = useTranslation()

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="absolute top-4 right-4">
        <LanguageSwitcher />
      </div>

      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <KalenderLogo width={56} height={56} className="object-contain" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{t("contact_title")}</h1>
          <p className="text-gray-600">{t("contact_subtitle")}</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{t("form_title")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            </div>
            <div>
              <label htmlFor="business" className="block text-sm font-medium text-gray-700 mb-1">
                {t("business")}
              </label>
              <Input id="business" type="text" placeholder={t("business")} className="w-full" />
            </div>
            <div>
              <label htmlFor="professionals" className="block text-sm font-medium text-gray-700 mb-1">
                {t("professionals")}
              </label>
              <Input id="professionals" type="number" placeholder="Ex: 25" className="w-full" />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                {t("message")}
              </label>
              <textarea
                id="message"
                rows={4}
                placeholder={t("message_placeholder")}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
              />
            </div>
            <Button className="w-full bg-primary hover:bg-primary/90">{t("submit")}</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default function ContactPage() {
  return (
    <TranslationProvider>
      <ContactPageContent />
    </TranslationProvider>
  )
}
