"use client"
import { useState } from "react"
import type React from "react"
import { useTranslation } from "@/contexts/translation-context"
import { TranslationProvider } from "@/contexts/translation-context"
import { KalenderLogo } from "@/components/kalender-logo"

import {
  Calendar,
  ArrowRight,
  BarChart3,
  CheckCircle,
  Zap,
  Clock,
  Globe,
  Smartphone,
  TrendingUp,
  ChevronDown,
  Crown,
  Building2,
  Menu,
  X,
  Users,
  Shield,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { LanguageSwitcher } from "@/components/language-switcher"

function LandingPageContent() {
  const { t } = useTranslation()
  const [selectedProfessionals, setSelectedProfessionals] = useState(1)
  const [isAnnual, setIsAnnual] = useState(true)

  // Pricing tiers data
  const pricingTiers = [
    {
      name: t("plans.start.name"),
      maxProfessionals: 1,
      monthlyPrice: 49.0,
      annualPrice: 411.6,
      monthlyEquivalent: 34.3,
      popular: false,
      description: t("plans.start.description"),
      features: [
        "1 " + t("professionals_unit"),
        t("plan_features.smart_scheduling"),
        t("plan_features.whatsapp_auto"),
        t("plan_features.custom_page"),
        t("plan_features.basic_reports"),
        t("plan_features.email_support"),
      ],
    },
    {
      name: t("plans.essential.name"),
      maxProfessionals: 3,
      monthlyPrice: 119.0,
      annualPrice: 997.2,
      monthlyEquivalent: 83.1,
      popular: true,
      description: t("plans.essential.description"),
      features: [
        t("up_to") + " 3 " + t("professionals_unit"),
        t("plan_features.everything_start"),
        t("plan_features.google_sync"),
        t("plan_features.auto_reminders"),
        t("plan_features.advanced_reports"),
        t("plan_features.priority_support"),
        t("plan_features.erp_integration"),
      ],
    },
    {
      name: t("plans.advanced.name"),
      maxProfessionals: 10,
      monthlyPrice: 219.0,
      annualPrice: 1839.6,
      monthlyEquivalent: 137.97,
      popular: false,
      description: t("plans.advanced.description"),
      features: [
        t("up_to") + " 10 " + t("professionals_unit"),
        t("plan_features.everything_essential"),
        t("plan_features.multi_location"),
        t("plan_features.custom_api"),
        t("plan_features.custom_reports"),
        t("plan_features.phone_support"),
        t("plan_features.training_included"),
        t("plan_features.auto_backup"),
      ],
    },
    {
      name: t("plans.pro.name"),
      maxProfessionals: 20,
      monthlyPrice: 349.0,
      annualPrice: 2931.6,
      monthlyEquivalent: 209.4,
      popular: false,
      description: t("plans.pro.description"),
      features: [
        t("up_to") + " 20 " + t("professionals_unit"),
        t("plan_features.everything_advanced"),
        t("plan_features.dedicated_manager"),
        t("plan_features.sla_guaranteed"),
        t("plan_features.unlimited_integrations"),
        t("plan_features.support_24_7"),
        t("plan_features.monthly_consulting"),
        t("plan_features.white_label"),
      ],
    },
  ]

  const getRecommendedPlan = () => {
    if (selectedProfessionals === 1) return pricingTiers[0]
    if (selectedProfessionals <= 3) return pricingTiers[1]
    if (selectedProfessionals <= 10) return pricingTiers[2]
    if (selectedProfessionals <= 20) return pricingTiers[3]
    return null
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price)
  }

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseInt(e.target.value)
    setSelectedProfessionals(value)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseInt(e.target.value) || 1
    const clampedValue = Math.max(1, Math.min(value, 20))
    setSelectedProfessionals(clampedValue)
  }

  const getSliderBackground = () => {
    const maxValue = 20
    const percentage = ((selectedProfessionals - 1) / (maxValue - 1)) * 100
    return `linear-gradient(to right, #0EA5E9 0%, #0EA5E9 ${percentage}%, #e5e7eb ${percentage}%, #e5e7eb 100%)`
  }

  const recommendedPlan = getRecommendedPlan()
  const isUnlimited = selectedProfessionals > 20

  // Mobile menu state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Navigation handlers
  const handleFeatureNavigation = (feature: string) => {
    alert(`Funcionalidade "${feature}" será implementada em breve!`)
  }

  const handleLoginClick = () => {
    window.location.href = "/login"
  }

  const handleSignupClick = () => {
    window.location.href = "/signup"
  }

  const handlePricingClick = () => {
    const element = document.getElementById("pricing")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Brand - Com Logo */}
            <button
              onClick={() => (window.location.href = "/")}
              className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
            >
              <KalenderLogo width={40} height={40} className="object-contain" />
            </button>

            {/* Navigation Menu */}
            <nav className="hidden md:flex items-center space-x-8">
              <Button
                variant="ghost"
                className="text-gray-700 hover:text-gray-900 font-medium"
                onClick={() => (window.location.href = "/platform")}
              >
                {t("platform")}
                <ChevronDown className="ml-1 h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                className="text-gray-700 hover:text-gray-900 font-medium"
                onClick={() => (window.location.href = "/features")}
              >
                {t("features")}
                <ChevronDown className="ml-1 h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                className="text-gray-700 hover:text-gray-900 font-medium"
                onClick={() => (window.location.href = "/segments")}
              >
                {t("segments")}
                <ChevronDown className="ml-1 h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                className="text-gray-700 hover:text-gray-900 font-medium"
                onClick={handlePricingClick}
              >
                {t("pricing")}
              </Button>
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-4">
              <LanguageSwitcher />
              <Button
                variant="outline"
                className="hidden md:flex border-gray-300 text-gray-700 hover:bg-gray-50"
                onClick={handleLoginClick}
              >
                {t("login")}
              </Button>
              <Button className="hidden md:flex bg-primary hover:bg-primary/90 text-white font-semibold" onClick={handleSignupClick}>
                {t("free_trial")}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-gray-200 py-4">
              <nav className="flex flex-col space-y-2">
                <Button
                  variant="ghost"
                  className="justify-start text-gray-700 hover:text-gray-900 font-medium"
                  onClick={() => {
                    window.location.href = "/platform"
                    setMobileMenuOpen(false)
                  }}
                >
                  {t("platform")}
                </Button>
                <Button
                  variant="ghost"
                  className="justify-start text-gray-700 hover:text-gray-900 font-medium"
                  onClick={() => {
                    window.location.href = "/features"
                    setMobileMenuOpen(false)
                  }}
                >
                  {t("features")}
                </Button>
                <Button
                  variant="ghost"
                  className="justify-start text-gray-700 hover:text-gray-900 font-medium"
                  onClick={() => {
                    window.location.href = "/segments"
                    setMobileMenuOpen(false)
                  }}
                >
                  {t("segments")}
                </Button>
                <Button
                  variant="ghost"
                  className="justify-start text-gray-700 hover:text-gray-900 font-medium"
                  onClick={() => {
                    handlePricingClick()
                    setMobileMenuOpen(false)
                  }}
                >
                  {t("pricing")}
                </Button>
                <div className="border-t border-gray-200 pt-2 mt-2 flex flex-col space-y-2">
                  <Button
                    variant="outline"
                    className="justify-start border-gray-300 text-gray-700"
                    onClick={() => {
                      handleLoginClick()
                      setMobileMenuOpen(false)
                    }}
                  >
                    {t("login")}
                  </Button>
                  <Button
                    className="justify-start bg-primary hover:bg-primary/90 text-white font-semibold"
                    onClick={() => {
                      handleSignupClick()
                      setMobileMenuOpen(false)
                    }}
                  >
                    {t("free_trial")}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="min-h-[600px] py-20 bg-gray-900 relative overflow-hidden flex items-center">
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="max-w-2xl">
              <div className="inline-flex items-center px-4 py-2 rounded-full border border-gray-700 bg-gray-800/50 backdrop-blur-sm mb-6">
                <div className="w-2 h-2 bg-accent rounded-full mr-3 animate-pulse"></div>
                <span className="text-gray-300 text-sm font-medium">{t("hero_badge")}</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight tracking-tight">
                {t("hero_title")}
                <span className="bg-brand-gradient bg-clip-text text-transparent block">
                  {t("hero_title_highlight")}
                </span>
              </h1>
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed font-light mb-8">{t("hero_description")}</p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-gradient-to-r from-accent to-primary hover:from-accent/90 hover:to-primary/90 text-white font-bold h-14 px-8 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all" onClick={handleSignupClick}>
                  {t("hero_start_free_trial")}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline" className="h-14 px-8 text-lg border-primary text-primary hover:bg-primary hover:text-white font-semibold" onClick={handlePricingClick}>
                  {t("hero_view_pricing")}
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

      {/* Features Section */}
      <section className="py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-2 bg-primary/10 rounded-full mb-4">
              <span className="text-primary font-semibold text-sm">Recursos Principais</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight">{t("features_title")}</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">{t("features_subtitle")}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 mb-12 max-w-6xl mx-auto">
            <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-all rounded-2xl group">
              <CardHeader className="pb-4">
                <div className="bg-gradient-to-br from-primary to-primary/80 w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Calendar className="h-7 w-7 text-white" />
                </div>
                <CardTitle className="text-lg text-gray-900 font-bold">{t("smart_scheduling")}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">{t("smart_scheduling_desc")}</p>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-all rounded-2xl group">
              <CardHeader className="pb-4">
                <div className="bg-gradient-to-br from-brand-purple to-brand-purple/80 w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <TrendingUp className="h-7 w-7 text-white" />
                </div>
                <CardTitle className="text-lg text-gray-900 font-bold">{t("lead_qualification")}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">{t("lead_qualification_desc")}</p>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-all rounded-2xl group">
              <CardHeader className="pb-4">
                <div className="bg-gradient-to-br from-secondary to-secondary/80 w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <BarChart3 className="h-7 w-7 text-white" />
                </div>
                <CardTitle className="text-lg text-gray-900 font-bold">{t("sales_funnel")}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">{t("sales_funnel_desc")}</p>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-all rounded-2xl group">
              <CardHeader className="pb-4">
                <div className="bg-gradient-to-br from-accent to-accent/80 w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Smartphone className="h-7 w-7 text-white" />
                </div>
                <CardTitle className="text-lg text-gray-900 font-bold">{t("whatsapp_telegram")}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">{t("whatsapp_telegram_desc")}</p>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-all rounded-2xl group">
              <CardHeader className="pb-4">
                <div className="bg-gradient-to-br from-primary to-primary/80 w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Zap className="h-7 w-7 text-white" />
                </div>
                <CardTitle className="text-lg text-gray-900 font-bold">{t("integrations")}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">{t("integrations_desc")}</p>
              </CardContent>
            </Card>
          </div>

          {/* Additional Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
            <div className="flex items-start space-x-3">
              <div className="bg-accent/10 p-2 rounded-lg">
                <Smartphone className="h-5 w-5 text-accent" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900">{t("whatsapp_bot")}</h4>
                <p className="text-sm text-gray-600 font-light">Agendamento por linguagem natural</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="bg-primary/10 p-2 rounded-lg">
                <Globe className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900">Google & Outlook</h4>
                <p className="text-sm text-gray-600 font-light">Sincronização automática</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="bg-secondary/10 p-2 rounded-lg">
                <Zap className="h-5 w-5 text-secondary" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900">Integrações ERP</h4>
                <p className="text-sm text-gray-600 font-light">SAP, Oracle, Protheus e mais</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="bg-brand-purple/10 p-2 rounded-lg">
                <TrendingUp className="h-5 w-5 text-brand-purple" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900">IA Avançada</h4>
                <p className="text-sm text-gray-600 font-light">Predição e otimização automática</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-10 items-center max-w-6xl mx-auto">
            <div>
              <div className="inline-block px-4 py-2 bg-accent/10 rounded-full mb-4">
                <span className="text-accent font-semibold text-sm">Benefícios</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 tracking-tight">{t("benefits_title")}</h2>
              <div className="space-y-5">
                <div className="flex items-start space-x-3">
                  <div className="bg-primary/10 p-1.5 rounded-lg mt-0.5">
                    <CheckCircle className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">{t("revenue_increase")}</h3>
                    <p className="text-gray-600 text-sm">{t("revenue_increase_desc")}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-primary/10 p-1.5 rounded-lg mt-0.5">
                    <CheckCircle className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">{t("no_shows_reduction")}</h3>
                    <p className="text-gray-600 text-sm">{t("no_shows_reduction_desc")}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-primary/10 p-1.5 rounded-lg mt-0.5">
                    <CheckCircle className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">{t("time_savings")}</h3>
                    <p className="text-gray-600 text-sm">{t("time_savings_desc")}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-primary/10 p-1.5 rounded-lg mt-0.5">
                    <CheckCircle className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">{t("satisfaction")}</h3>
                    <p className="text-gray-600 text-sm">{t("satisfaction_desc")}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl shadow-lg border border-gray-100">
              <div className="text-center mb-6">
                <div className="bg-gradient-to-br from-primary to-primary/80 w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 tracking-tight">{t("setup_title")}</h3>
                <p className="text-gray-600 text-sm">{t("setup_subtitle")}</p>
              </div>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 bg-white p-3 rounded-lg">
                  <div className="bg-gradient-to-br from-primary to-primary/80 text-white rounded-lg w-7 h-7 flex items-center justify-center text-sm font-bold flex-shrink-0">
                    1
                  </div>
                  <span className="text-gray-700 font-medium text-sm">{t("step1")}</span>
                </div>
                <div className="flex items-center space-x-3 bg-white p-3 rounded-lg">
                  <div className="bg-gradient-to-br from-primary to-primary/80 text-white rounded-lg w-7 h-7 flex items-center justify-center text-sm font-bold flex-shrink-0">
                    2
                  </div>
                  <span className="text-gray-700 font-medium text-sm">{t("step2")}</span>
                </div>
                <div className="flex items-center space-x-3 bg-white p-3 rounded-lg">
                  <div className="bg-gradient-to-br from-primary to-primary/80 text-white rounded-lg w-7 h-7 flex items-center justify-center text-sm font-bold flex-shrink-0">
                    3
                  </div>
                  <span className="text-gray-700 font-medium text-sm">{t("step3")}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 md:py-24 bg-gradient-to-br from-gray-50 via-white to-primary/5">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-block px-4 py-2 bg-secondary/10 rounded-full mb-4">
              <span className="text-secondary font-semibold text-xs md:text-sm">Planos e Preços</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 tracking-tight px-4">
              {t("pricing_title")}
              <span className="bg-brand-gradient bg-clip-text text-transparent block mt-2">
                {t("pricing_title_highlight")}
              </span>
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto font-light leading-relaxed px-4">
              {t("pricing_subtitle")}
            </p>

            {/* Annual/Monthly Toggle */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <span className={`font-semibold ${!isAnnual ? "text-gray-900" : "text-gray-500"}`}>
                {t("monthly")}
              </span>
              <Switch checked={isAnnual} onCheckedChange={setIsAnnual} className="data-[state=checked]:bg-primary" />
              <span className={`font-semibold ${isAnnual ? "text-gray-900" : "text-gray-500"}`}>
                {t("annual")}
              </span>
              <Badge className="bg-accent text-white font-bold">-30%</Badge>
            </div>
          </div>

          {/* Professional Selector */}
          <div className="max-w-3xl mx-auto mb-12">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{t("professionals_question")}</h3>
            </div>

            <Card className="bg-white shadow-md border border-gray-200">
              <CardContent className="p-8">
                <div className="space-y-6">
                  {/* Slider */}
                  <div className="relative">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-gray-600">1</span>
                      <span className="text-sm text-gray-600">20+</span>
                    </div>

                    <div className="relative mb-8">
                      <div
                        className="absolute -top-10 transform -translate-x-1/2 bg-primary text-white px-4 py-2 rounded-lg font-bold"
                        style={{
                          left: `${((selectedProfessionals - 1) / 19) * 100}%`,
                        }}
                      >
                        {selectedProfessionals > 20 ? "20+" : selectedProfessionals}
                      </div>

                      <input
                        type="range"
                        min="1"
                        max="21"
                        value={selectedProfessionals}
                        onChange={handleSliderChange}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        style={{
                          background: getSliderBackground(),
                        }}
                      />
                    </div>
                  </div>

                  {/* Recommended Plan */}
                  {recommendedPlan && (
                    <div className="text-center p-4 bg-primary/5 rounded-lg border border-primary/20">
                      <p className="text-sm text-gray-600 mb-1">Plano recomendado</p>
                      <p className="text-xl font-bold text-gray-900">
                        {recommendedPlan.name} - {isAnnual ? formatPrice(recommendedPlan.monthlyEquivalent) : formatPrice(recommendedPlan.monthlyPrice)}/mês
                      </p>
                    </div>
                  )}

                  {isUnlimited && (
                    <div className="text-center p-4 bg-brand-purple/5 rounded-lg border border-brand-purple/20">
                      <p className="text-xl font-bold text-brand-purple">Plano Enterprise</p>
                      <p className="text-sm text-gray-600">Entre em contato para saber mais</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Pricing Cards */}
          {!isUnlimited ? (
            <div className="max-w-7xl mx-auto mb-16">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {pricingTiers.map((tier) => {
                  const isRecommended = recommendedPlan?.name === tier.name
                  const showPlan = selectedProfessionals <= tier.maxProfessionals || tier.name === t("plan_pro")

                  if (!showPlan) return null

                  return (
                    <Card
                      key={tier.name}
                      className={`relative bg-white shadow-md hover:shadow-lg transition-shadow ${
                        isRecommended ? "border-2 border-primary" : "border border-gray-200"
                      }`}
                    >
                      {/* Badge */}
                      {isRecommended && (
                        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                          <Badge className="bg-primary text-white font-bold px-4 py-1">Recomendado</Badge>
                        </div>
                      )}

                      {tier.popular && isAnnual && !isRecommended && (
                        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                          <Badge className="bg-accent text-white font-bold px-4 py-1">Mais Popular</Badge>
                        </div>
                      )}

                      <CardHeader className="text-center pb-4 pt-8">
                        <CardTitle className="text-xl font-bold text-gray-900 mb-2">{tier.name}</CardTitle>
                        <p className="text-gray-600 text-sm mb-4">{tier.description}</p>

                        {/* Pricing */}
                        <div className="mb-4">
                          {isAnnual ? (
                            <>
                              <div className="text-4xl font-bold text-gray-900">
                                {formatPrice(tier.monthlyEquivalent)}
                                <span className="text-lg text-gray-600 font-normal">/mês</span>
                              </div>
                              <div className="text-sm text-gray-500 mt-1">
                                <span className="line-through">{formatPrice(tier.monthlyPrice)}</span>
                                <span className="ml-1 text-accent font-semibold">-30%</span>
                              </div>
                              <div className="text-xs text-gray-500 mt-1">
                                {formatPrice(tier.annualPrice)} cobrado anualmente
                              </div>
                            </>
                          ) : (
                            <>
                              <div className="text-4xl font-bold text-gray-900">
                                {formatPrice(tier.monthlyPrice)}
                                <span className="text-lg text-gray-600 font-normal">/mês</span>
                              </div>
                              <div className="text-sm text-accent font-semibold mt-1">
                                Economize {formatPrice(tier.monthlyPrice * 12 - tier.annualPrice)} no plano anual
                              </div>
                            </>
                          )}
                        </div>
                      </CardHeader>

                      <CardContent className="px-6 pb-6">
                        {/* Features */}
                        <div className="space-y-2 mb-6">
                          {tier.features.map((feature, index) => (
                            <div key={index} className="flex items-start gap-2">
                              <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                              <span className="text-sm text-gray-700">{feature}</span>
                            </div>
                          ))}
                        </div>

                        {/* CTA */}
                        <Button
                          className={`w-full ${
                            isRecommended
                              ? "bg-primary hover:bg-primary/90 text-white"
                              : "bg-white border-2 border-primary text-primary hover:bg-primary hover:text-white"
                          }`}
                          onClick={handleSignupClick}
                        >
                          {t("start_free_trial")}
                        </Button>

                        <p className="text-xs text-gray-500 text-center mt-3">{t("free_trial_note")}</p>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>
          ) : (
            /* Enterprise Plan */
            <div className="max-w-2xl mx-auto mb-16">
              <Card className="border-2 border-brand-purple bg-gradient-to-br from-brand-purple/5 to-secondary/5 shadow-2xl">
                <CardContent className="p-8 text-center">
                  <div className="mb-6">
                    <Badge className="bg-brand-purple text-white font-bold px-4 py-2 mb-4 text-lg">
                      🏢 {t("plans.enterprise.name")}
                    </Badge>
                    <h3 className="text-3xl font-bold text-gray-900 mb-3 tracking-tight">
                      20+ {t("professionals_unit")}
                    </h3>
                    <p className="text-xl text-gray-600 mb-6 font-light">{t("plans.enterprise.description")}</p>
                    <div className="bg-white rounded-lg p-6 mb-6">
                      <h4 className="font-bold text-gray-900 mb-4">Recursos Exclusivos Enterprise:</h4>
                      <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-primary" />
                          <span className="font-medium">Profissionais ilimitados</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-primary" />
                          <span className="font-medium">Multi-localização</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-primary" />
                          <span className="font-medium">API personalizada</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-primary" />
                          <span className="font-medium">Gerente dedicado</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-primary" />
                          <span className="font-medium">SLA garantido 99.9%</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-primary" />
                          <span className="font-medium">Treinamento personalizado</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-primary" />
                          <span className="font-medium">Suporte 24/7</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-primary" />
                          <span className="font-medium">White label disponível</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Button
                    className="bg-brand-purple text-white hover:bg-brand-purple/90 font-bold px-8 py-4 text-lg h-auto"
                    onClick={() => (window.location.href = "/contact")}
                  >
                    Falar com Especialista
                    <span className="ml-2">→</span>
                  </Button>
                  <p className="text-sm text-gray-600 mt-4 font-medium">
                    Nossa equipe entrará em contato em até 24h para uma proposta personalizada
                  </p>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Features Comparison */}
          <div className="max-w-6xl mx-auto mb-16">
            <h3 className="text-3xl font-bold text-gray-900 text-center mb-12 tracking-tight">
              {t("features_comparison_title")}
            </h3>
            <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6">
              <div className="text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="h-8 w-8 text-primary" />
                </div>
                <h4 className="font-bold text-gray-900 mb-2">{t("smart_scheduling")}</h4>
                <p className="text-sm text-gray-600 font-light">IA otimiza automaticamente</p>
              </div>
              <div className="text-center">
                <div className="bg-secondary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Smartphone className="h-8 w-8 text-secondary" />
                </div>
                <h4 className="font-bold text-gray-900 mb-2">{t("whatsapp_bot")}</h4>
                <p className="text-sm text-gray-600 font-light">Agendamento automático</p>
              </div>
              <div className="text-center">
                <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-accent" />
                </div>
                <h4 className="font-bold text-gray-900 mb-2">{t("client_management")}</h4>
                <p className="text-sm text-gray-600 font-light">{t("client_management_desc")}</p>
              </div>
              <div className="text-center">
                <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="h-8 w-8 text-emerald-600" />
                </div>
                <h4 className="font-bold text-gray-900 mb-2">{t("reports")}</h4>
                <p className="text-sm text-gray-600 font-light">{t("detailed_analytics")}</p>
              </div>
              <div className="text-center">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-purple-600" />
                </div>
                <h4 className="font-bold text-gray-900 mb-2">{t("security")}</h4>
                <p className="text-sm text-gray-600 font-light">{t("security_desc")}</p>
              </div>
              <div className="text-center">
                <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Building2 className="h-8 w-8 text-orange-600" />
                </div>
                <h4 className="font-bold text-gray-900 mb-2">{t("custom_page")}</h4>
                <p className="text-sm text-gray-600 font-light">{t("custom_page_desc")}</p>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="max-w-4xl mx-auto mb-16">
            <h3 className="text-3xl font-bold text-gray-900 text-center mb-12 tracking-tight">{t("faq_title")}</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="bg-white/80 backdrop-blur-sm border-gray-200">
                <CardContent className="p-6">
                  <h4 className="font-bold text-gray-900 mb-2">{t("faq_trial_question")}</h4>
                  <p className="text-gray-600 font-light">{t("faq_trial_answer")}</p>
                </CardContent>
              </Card>
              <Card className="bg-white/80 backdrop-blur-sm border-gray-200">
                <CardContent className="p-6">
                  <h4 className="font-bold text-gray-900 mb-2">{t("faq_cancel_question")}</h4>
                  <p className="text-gray-600 font-light">{t("faq_cancel_answer")}</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Final CTA */}
          <div className="text-center">
            <Card className="max-w-4xl mx-auto bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
              <CardContent className="p-12">
                <h3 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">{t("final_title")}</h3>
                <p className="text-xl text-gray-600 mb-8 font-light">{t("final_subtitle")}</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    className="bg-primary hover:bg-primary/90 text-white font-bold px-8 py-4 text-lg h-auto shadow-lg hover:shadow-xl transition-all"
                    onClick={handleSignupClick}
                  >
                    {t("start_free_trial")}
                    <span className="ml-2">→</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="border-2 border-primary text-primary hover:bg-primary hover:text-white font-bold px-8 py-4 text-lg h-auto"
                    onClick={handleLoginClick}
                  >
                    {t("have_account_button")}
                  </Button>
                </div>
                <p className="text-sm text-gray-500 mt-4 font-medium">{t("free_trial_note")}</p>
              </CardContent>
            </Card>
          </div>
        </div>

        <style jsx>{`
          .slider::-webkit-slider-thumb {
            appearance: none;
            height: 24px;
            width: 24px;
            border-radius: 50%;
            background: #0ea5e9;
            cursor: pointer;
            border: 3px solid #ffffff;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
          }

          .slider::-moz-range-thumb {
            height: 24px;
            width: 24px;
            border-radius: 50%;
            background: #0ea5e9;
            cursor: pointer;
            border: 3px solid #ffffff;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
          }
        `}</style>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start gap-8">
            <div className="max-w-md">
              <div className="flex items-center space-x-3 mb-4">
                <KalenderLogo width={32} height={32} className="object-contain" />
              </div>
              <p className="text-gray-400 font-light">{t("footer_company_description")}</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">{t("company")}</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <button
                    onClick={() => (window.location.href = "/about")}
                    className="hover:text-white transition-colors text-left"
                  >
                    {t("about")}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => (window.location.href = "/blog")}
                    className="hover:text-white transition-colors text-left"
                  >
                    {t("blog")}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => (window.location.href = "/contact")}
                    className="hover:text-white transition-colors text-left"
                  >
                    {t("contact")}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => (window.location.href = "/support")}
                    className="hover:text-white transition-colors text-left"
                  >
                    {t("support")}
                  </button>
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

export default function LandingPage() {
  return (
    <TranslationProvider>
      <LandingPageContent />
    </TranslationProvider>
  )
}
