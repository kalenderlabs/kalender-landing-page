"use client"

import { TranslationProvider, useTranslation } from "@/contexts/translation-context"
import { LanguageSwitcher } from "@/components/language-switcher"
import { KalenderLogo } from "@/components/kalender-logo"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, Zap, Link as LinkIcon, Calendar, Users, Building2, Bell, CreditCard, BarChart3, Webhook, Shield, ChevronDown, ArrowRight, Menu, X } from "lucide-react"
import { useState } from "react"

function PlatformPageContent() {
  const { t } = useTranslation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-white/90 backdrop-blur border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button onClick={() => (window.location.href = "/")} className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
              <KalenderLogo width={36} height={36} className="object-contain" />
            </button>
            <nav className="hidden md:flex items-center space-x-8">
              <Button variant="ghost" className="text-gray-700 hover:text-gray-900 font-medium" onClick={() => (window.location.href = "/platform")}>
                {t("platform")}
                <ChevronDown className="ml-1 h-4 w-4" />
              </Button>
              <Button variant="ghost" className="text-gray-700 hover:text-gray-900 font-medium" onClick={() => (window.location.href = "/features")}>
                {t("features")}
                <ChevronDown className="ml-1 h-4 w-4" />
              </Button>
              <Button variant="ghost" className="text-gray-700 hover:text-gray-900 font-medium" onClick={() => (window.location.href = "/segments")}>
                {t("segments")}
                <ChevronDown className="ml-1 h-4 w-4" />
              </Button>
              <Button variant="ghost" className="text-gray-700 hover:text-gray-900 font-medium" onClick={() => (window.location.href = "/#pricing")}>
                {t("pricing")}
              </Button>
            </nav>
            <div className="flex items-center space-x-4">
              <LanguageSwitcher />
              <Button variant="outline" className="hidden md:flex border-gray-300 text-gray-700 hover:bg-gray-50" onClick={() => (window.location.href = "/login")}>
                {t("login")}
              </Button>
              <Button className="hidden md:flex bg-primary hover:bg-primary/90 text-white font-semibold" onClick={() => (window.location.href = "/signup")}>
                {t("free_trial")}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-gray-200 py-4">
              <nav className="flex flex-col space-y-2">
                <Button variant="ghost" className="justify-start text-gray-700 hover:text-gray-900 font-medium" onClick={() => (window.location.href = "/platform")}>
                  {t("platform")}
                </Button>
                <Button variant="ghost" className="justify-start text-gray-700 hover:text-gray-900 font-medium" onClick={() => (window.location.href = "/features")}>
                  {t("features")}
                </Button>
                <Button variant="ghost" className="justify-start text-gray-700 hover:text-gray-900 font-medium" onClick={() => (window.location.href = "/segments")}>
                  {t("segments")}
                </Button>
                <Button variant="ghost" className="justify-start text-gray-700 hover:text-gray-900 font-medium" onClick={() => (window.location.href = "/#pricing")}>
                  {t("pricing")}
                </Button>
                <Button variant="outline" className="justify-start border-gray-300 text-gray-700 hover:bg-gray-50" onClick={() => (window.location.href = "/login")}>
                  {t("login")}
                </Button>
                <Button className="justify-start bg-primary hover:bg-primary/90 text-white font-semibold" onClick={() => (window.location.href = "/signup")}>
                  {t("free_trial")}
                </Button>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero */}
      <section className="min-h-[600px] py-20 bg-gray-900 relative overflow-hidden flex items-center">
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="max-w-2xl">
              <div className="inline-flex items-center px-4 py-2 rounded-full border border-gray-700 bg-gray-800/50 backdrop-blur-sm mb-6">
                <div className="w-2 h-2 bg-accent rounded-full mr-3 animate-pulse"></div>
                <span className="text-gray-300 text-sm font-medium">Kalender Platform</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight tracking-tight">
                {t("platform_page.hero_title")}{" "}
                <span className="bg-brand-gradient bg-clip-text text-transparent">
                  {t("platform_page.hero_title_highlight")}
                </span>
              </h1>
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed font-light mb-8">{t("platform_page.hero_subtitle")}</p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-gradient-to-r from-accent to-primary hover:from-accent/90 hover:to-primary/90 text-white font-bold h-14 px-8 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all" onClick={() => (window.location.href = "/signup")}>
                  {t("platform_page.cta_start")}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline" className="h-14 px-8 text-lg border-primary text-primary hover:bg-primary hover:text-white font-semibold" onClick={() => (window.location.href = "/contact")}>
                  {t("platform_page.cta_contact")}
                </Button>
              </div>
            </div>

            {/* Right Visual */}
            <div className="relative lg:block hidden">
              <div className="relative bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-accent/20 rounded-full blur-2xl"></div>
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary/20 rounded-full blur-2xl"></div>

                {/* Mockup Content */}
                <div className="relative space-y-4">
                  <div className="flex items-center gap-3 bg-white/10 rounded-lg p-3">
                    <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                      <Zap className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="h-3 bg-white/30 rounded w-32 mb-2"></div>
                      <div className="h-2 bg-white/20 rounded w-24"></div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 bg-white/10 rounded-lg p-3">
                    <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                      <Calendar className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="h-3 bg-white/30 rounded w-40 mb-2"></div>
                      <div className="h-2 bg-white/20 rounded w-28"></div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 bg-white/10 rounded-lg p-3">
                    <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center">
                      <Users className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="h-3 bg-white/30 rounded w-36 mb-2"></div>
                      <div className="h-2 bg-white/20 rounded w-20"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} />
        </div>
      </section>

      {/* O que é a Kalender */}
      <section className="py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <div className="inline-block px-4 py-2 bg-primary/10 rounded-full mb-4">
              <span className="text-primary font-semibold text-sm">Sobre a Plataforma</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("platform_page.what_is_title")}</h2>
            <p className="text-gray-600 leading-relaxed">{t("platform_page.what_is_desc")}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {(t("platform_page.highlights_list") as unknown as string[]).map((item, index) => (
              <Card key={item} className="border-0 shadow-lg rounded-2xl hover:shadow-xl transition-all group">
                <CardContent className="p-6">
                  <div className="flex items-start gap-3">
                    <div className="bg-gradient-to-br from-primary to-accent rounded-lg p-2 group-hover:scale-110 transition-transform">
                      <CheckCircle className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-gray-800 font-medium flex-1">{item}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Principais funcionalidades */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <div className="inline-block px-4 py-2 bg-accent/10 rounded-full mb-4">
              <span className="text-accent font-semibold text-sm">Funcionalidades</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold">{t("platform_page.features_title")}</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
            <Card className="border-0 shadow-md rounded-xl hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className="bg-accent/10 p-2 rounded-lg">
                    <Zap className="h-5 w-5 text-accent" />
                  </div>
                  <CardTitle className="text-base">{t("platform_page.ai_agent_title")}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-gray-600 text-sm space-y-1">
                {(t("platform_page.ai_agent_points") as unknown as string[]).map((p) => (
                  <div key={p} className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                    <span>{p}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md rounded-xl hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-2 rounded-lg">
                    <Calendar className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-base">{t("platform_page.smart_calendar_title")}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-gray-600 text-sm space-y-1">
                {(t("platform_page.smart_calendar_points") as unknown as string[]).map((p) => (
                  <div key={p} className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>{p}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md rounded-xl hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className="bg-secondary/10 p-2 rounded-lg">
                    <LinkIcon className="h-5 w-5 text-secondary" />
                  </div>
                  <CardTitle className="text-base">{t("platform_page.booking_links_title")}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-gray-600 text-sm space-y-1">
                {(t("platform_page.booking_links_points") as unknown as string[]).map((p) => (
                  <div key={p} className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-secondary mt-0.5 flex-shrink-0" />
                    <span>{p}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md rounded-xl hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className="bg-accent/10 p-2 rounded-lg">
                    <Users className="h-5 w-5 text-accent" />
                  </div>
                  <CardTitle className="text-base">{t("platform_page.client_mgmt_title")}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-gray-600 text-sm space-y-1">
                {(t("platform_page.client_mgmt_points") as unknown as string[]).map((p) => (
                  <div key={p} className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                    <span>{p}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md rounded-xl hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className="bg-brand-purple/10 p-2 rounded-lg">
                    <Building2 className="h-5 w-5 text-brand-purple" />
                  </div>
                  <CardTitle className="text-base">{t("platform_page.teams_units_title")}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-gray-600 text-sm space-y-1">
                {(t("platform_page.teams_units_points") as unknown as string[]).map((p) => (
                  <div key={p} className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-brand-purple mt-0.5 flex-shrink-0" />
                    <span>{p}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md rounded-xl hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-2 rounded-lg">
                    <Bell className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-base">{t("platform_page.notifications_title")}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-gray-600 text-sm space-y-1">
                {(t("platform_page.notifications_points") as unknown as string[]).map((p) => (
                  <div key={p} className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>{p}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pagamentos, Relatórios, Integrações, Segurança */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <div className="inline-block px-4 py-2 bg-secondary/10 rounded-full mb-4">
              <span className="text-secondary font-semibold text-sm">Recursos Avançados</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold">Completo e Seguro</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
            <Card className="border-0 shadow-lg rounded-2xl hover:shadow-xl transition-all group bg-gradient-to-br from-white to-primary/5">
              <CardHeader className="flex-row items-center gap-3">
                <div className="bg-primary/10 rounded-lg p-2 group-hover:bg-primary group-hover:text-white transition-colors">
                  <CreditCard className="h-6 w-6 text-primary group-hover:text-white" />
                </div>
                <CardTitle className="text-base">{t("platform_page.billing_title")}</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-700 text-sm">{t("platform_page.billing_desc")}</CardContent>
            </Card>
            <Card className="border-0 shadow-lg rounded-2xl hover:shadow-xl transition-all group bg-gradient-to-br from-white to-accent/5">
              <CardHeader className="flex-row items-center gap-3">
                <div className="bg-accent/10 rounded-lg p-2 group-hover:bg-accent group-hover:text-white transition-colors">
                  <BarChart3 className="h-6 w-6 text-accent group-hover:text-white" />
                </div>
                <CardTitle className="text-base">{t("platform_page.reports_title")}</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-700 text-sm">{t("platform_page.reports_desc")}</CardContent>
            </Card>
            <Card className="border-0 shadow-lg rounded-2xl hover:shadow-xl transition-all group bg-gradient-to-br from-white to-secondary/5">
              <CardHeader className="flex-row items-center gap-3">
                <div className="bg-secondary/10 rounded-lg p-2 group-hover:bg-secondary group-hover:text-white transition-colors">
                  <Webhook className="h-6 w-6 text-secondary group-hover:text-white" />
                </div>
                <CardTitle className="text-base">{t("platform_page.integrations_title")}</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-700 text-sm">{t("platform_page.integrations_desc")}</CardContent>
            </Card>
            <Card className="border-0 shadow-lg rounded-2xl hover:shadow-xl transition-all group bg-gradient-to-br from-white to-brand-purple/5">
              <CardHeader className="flex-row items-center gap-3">
                <div className="bg-brand-purple/10 rounded-lg p-2 group-hover:bg-brand-purple group-hover:text-white transition-colors">
                  <Shield className="h-6 w-6 text-brand-purple group-hover:text-white" />
                </div>
                <CardTitle className="text-base">{t("platform_page.security_title")}</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-700 text-sm">{t("platform_page.security_desc")}</CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <Card className="max-w-4xl mx-auto bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
              <CardContent className="p-12">
                <h3 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">{t("final_title")}</h3>
                <p className="text-xl text-gray-600 mb-8 font-light">{t("final_subtitle")}</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    className="bg-primary hover:bg-primary/90 text-white font-bold px-8 py-4 text-lg h-auto shadow-lg hover:shadow-xl transition-all"
                    onClick={() => (window.location.href = "/signup")}
                  >
                    {t("start_free_trial")}
                    <span className="ml-2">→</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="border-2 border-primary text-primary hover:bg-primary hover:text-white font-bold px-8 py-4 text-lg h-auto"
                    onClick={() => (window.location.href = "/login")}
                  >
                    {t("have_account_button")}
                  </Button>
                </div>
                <p className="text-sm text-gray-500 mt-4 font-medium">{t("free_trial_note")}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <KalenderLogo width={32} height={32} className="object-contain" />
              </div>
              <p className="text-gray-400 font-light">{t("footer_company_description")}</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">{t("footer_product")}</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <button onClick={() => (window.location.href = "/platform")} className="hover:text-white transition-colors text-left">{t("platform")}</button>
                </li>
                <li>
                  <button onClick={() => (window.location.href = "/features")} className="hover:text-white transition-colors text-left">{t("features")}</button>
                </li>
                <li>
                  <button onClick={() => (window.location.href = "/segments")} className="hover:text-white transition-colors text-left">{t("segments")}</button>
                </li>
                <li>
                  <button onClick={() => (window.location.href = "/#pricing")} className="hover:text-white transition-colors text-left">{t("pricing")}</button>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">{t("footer_resources")}</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <button onClick={() => (window.location.href = "/features")} className="hover:text-white transition-colors text-left">{t("nav.whatsapp_bot")}</button>
                </li>
                <li>
                  <button onClick={() => (window.location.href = "/features")} className="hover:text-white transition-colors text-left">{t("nav.integrations")}</button>
                </li>
                <li>
                  <button onClick={() => (window.location.href = "/features")} className="hover:text-white transition-colors text-left">{t("nav.reports")}</button>
                </li>
                <li>
                  <button onClick={() => (window.location.href = "/features")} className="hover:text-white transition-colors text-left">{t("nav.api")}</button>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">{t("company")}</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <button onClick={() => (window.location.href = "/about")} className="hover:text-white transition-colors text-left">{t("about")}</button>
                </li>
                <li>
                  <button onClick={() => (window.location.href = "/blog")} className="hover:text-white transition-colors text-left">{t("blog")}</button>
                </li>
                <li>
                  <button onClick={() => (window.location.href = "/contact")} className="hover:text-white transition-colors text-left">{t("contact")}</button>
                </li>
                <li>
                  <button onClick={() => (window.location.href = "/support")} className="hover:text-white transition-colors text-left">{t("support")}</button>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>{t("footer_copyright")}</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default function PlatformPage() {
  return (
    <TranslationProvider>
      <PlatformPageContent />
    </TranslationProvider>
  )
}


