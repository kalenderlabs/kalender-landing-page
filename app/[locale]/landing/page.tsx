"use client"
import { useState } from "react"
import type React from "react"

import Link from "next/link"
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
  Check,
  Crown,
  Building2,
  Users,
  Shield,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { LanguageSwitcher } from "@/components/language-switcher"
import { useTranslation } from "@/hooks/useTranslation"

export default function LandingPage() {
  const { t, locale } = useTranslation()
  const [selectedProfessionals, setSelectedProfessionals] = useState(1)
  const [isAnnual, setIsAnnual] = useState(true)

  // Tabela de preços
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
        "1 profissional",
        t("features.smart_scheduling"),
        "WhatsApp automático",
        "Página personalizada",
        "Relatórios básicos",
        "Suporte por email",
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
        "Até 3 profissionais",
        "Tudo do plano Start",
        "Google Calendar sync",
        "Lembretes automáticos",
        "Relatórios avançados",
        "Suporte prioritário",
        "Integração com ERPs",
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
        "Até 10 profissionais",
        "Tudo do plano Essencial",
        "Multi-localização",
        "API personalizada",
        "Relatórios personalizados",
        "Suporte por telefone",
        "Treinamento incluído",
        "Backup automático",
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
        "Até 20 profissionais",
        "Tudo do plano Avançado",
        "Gerente dedicado",
        "SLA garantido",
        "Integrações ilimitadas",
        "Suporte 24/7",
        "Consultoria mensal",
        "White label",
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

  return (
    <div className="min-h-screen bg-white font-nethead">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href={`/${locale}`} className="flex items-center space-x-3">
              <img src="/kalender-logo.png" alt="Kalender" className="h-10 w-10" />
              <span className="text-2xl font-bold bg-brand-gradient bg-clip-text text-transparent tracking-tight">
                Kalender
              </span>
            </Link>

            {/* Navigation Menu */}
            <nav className="hidden md:flex items-center space-x-8">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="text-gray-700 hover:text-gray-900 font-medium">
                    {t("header.platform")}
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white border-gray-200">
                  <DropdownMenuItem className="text-gray-700 hover:bg-gray-100">
                    <Link href={`/${locale}/dashboard`} className="w-full">
                      {t("nav.dashboard")}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-gray-700 hover:bg-gray-100">
                    <Link href={`/${locale}/dashboard/schedule`} className="w-full">
                      {t("nav.schedule")}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-gray-700 hover:bg-gray-100">
                    <Link href={`/${locale}/dashboard/professionals`} className="w-full">
                      {t("nav.team_management")}
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="text-gray-700 hover:text-gray-900 font-medium">
                    {t("header.features")}
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white border-gray-200">
                  <DropdownMenuItem className="text-gray-700 hover:bg-gray-100">
                    <Link href="#" className="w-full">
                      {t("nav.whatsapp_bot")}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-gray-700 hover:bg-gray-100">
                    <Link href="#" className="w-full">
                      {t("nav.integrations")}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-gray-700 hover:bg-gray-100">
                    <Link href="#" className="w-full">
                      {t("nav.reports")}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-gray-700 hover:bg-gray-100">
                    <Link href="#" className="w-full">
                      {t("nav.api")}
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="text-gray-700 hover:text-gray-900 font-medium">
                    {t("header.segments")}
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white border-gray-200">
                  <DropdownMenuItem className="text-gray-700 hover:bg-gray-100">
                    <Link href="#" className="w-full">
                      {t("nav.beauty_salons")}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-gray-700 hover:bg-gray-100">
                    <Link href="#" className="w-full">
                      {t("nav.clinics")}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-gray-700 hover:bg-gray-100">
                    <Link href="#" className="w-full">
                      {t("nav.spas")}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-gray-700 hover:bg-gray-100">
                    <Link href="#" className="w-full">
                      {t("nav.gyms")}
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Button variant="ghost" asChild className="text-gray-700 hover:text-gray-900 font-medium">
                <a href="#pricing">{t("header.pricing")}</a>
              </Button>
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-4">
              <LanguageSwitcher />
              <Button
                variant="outline"
                asChild
                className="hidden md:flex border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                <Link href={`/${locale}/login`}>{t("header.login")}</Link>
              </Button>
              <Button asChild className="bg-primary hover:bg-primary/90 text-white font-semibold">
                <Link href={`/${locale}/register-tenant`}>
                  {t("header.free_trial")}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section - Modern CTA Banner */}
      <section className="py-20 bg-gray-900 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="relative z-10">
              {/* Badge */}
              <div className="inline-flex items-center px-4 py-2 rounded-full border border-gray-700 bg-gray-800/50 backdrop-blur-sm mb-8">
                <div className="w-2 h-2 bg-accent rounded-full mr-3 animate-pulse"></div>
                <span className="text-gray-300 text-sm font-medium">{t("hero.badge")}</span>
              </div>

              {/* Headline */}
              <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight tracking-tight">
                {t("hero.title")}
                <span className="bg-brand-gradient bg-clip-text text-transparent block">
                  {t("hero.title_highlight")}
                </span>
              </h1>

              {/* Description */}
              <p className="text-xl text-gray-300 mb-8 leading-relaxed font-light">{t("hero.description")}</p>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-8 mb-8">
                <div>
                  <div className="text-3xl font-bold text-white mb-1">{t("hero.setup_time")}</div>
                  <div className="text-gray-400 text-sm font-medium">{t("hero.setup_description")}</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-white mb-1">{t("hero.uptime")}</div>
                  <div className="text-gray-400 text-sm font-medium">{t("hero.uptime_description")}</div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-4 relative z-20">
                <Button
                  size="lg"
                  asChild
                  className="bg-gradient-to-r from-accent to-primary hover:from-accent/90 hover:to-primary/90 text-white font-bold h-14 px-8 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all cursor-pointer"
                >
                  <Link href={`/${locale}/register-tenant`} className="no-underline">
                    {t("hero.start_free_trial")}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="h-14 px-8 text-lg border-primary text-primary hover:bg-primary hover:text-white font-semibold cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    const pricingSection = document.getElementById("pricing")
                    if (pricingSection) {
                      pricingSection.scrollIntoView({ behavior: "smooth" })
                    }
                  }}
                >
                  {t("hero.view_pricing")}
                </Button>
              </div>
              <p className="text-gray-400 text-sm font-medium">{t("hero.free_trial_note")}</p>
            </div>

            {/* Right Visual Elements - Mantém o mesmo conteúdo visual */}
            <div className="relative z-5">
              {/* Main Dashboard Mockup */}
              <div className="relative z-10 bg-white rounded-2xl shadow-2xl p-6 transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <div className="bg-gray-100 rounded-lg p-4 mb-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-sm font-bold text-gray-900">Agenda de Hoje</div>
                    <div className="text-xs text-gray-500 font-medium">18 Jan 2024</div>
                  </div>
                  <div className="space-y-2">
                    <div className="bg-accent/10 border-l-4 border-accent p-2 rounded">
                      <div className="text-xs font-bold text-accent-foreground">09:00 - Maria Silva</div>
                      <div className="text-xs text-primary font-medium">Corte + Escova</div>
                    </div>
                    <div className="bg-primary/10 border-l-4 border-primary p-2 rounded">
                      <div className="text-xs font-bold text-primary-foreground">11:00 - João Santos</div>
                      <div className="text-xs text-secondary font-medium">Massagem</div>
                    </div>
                    <div className="bg-secondary/10 border-l-4 border-secondary p-2 rounded">
                      <div className="text-xs font-bold text-secondary-foreground">14:00 - Ana Costa</div>
                      <div className="text-xs text-brand-blue-dark font-medium">Manicure</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Revenue Card */}
              <div className="absolute -top-4 -right-4 bg-white rounded-xl shadow-lg p-4 z-20 transform -rotate-6 hover:rotate-0 transition-transform duration-500">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <TrendingUp className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 font-medium">Receita</div>
                    <div className="text-sm font-bold text-primary">+40% em 3 meses</div>
                  </div>
                </div>
              </div>

              {/* Mobile App Mockup */}
              <div className="absolute -bottom-8 -left-8 bg-gray-900 rounded-2xl p-3 shadow-xl z-15 transform rotate-12 hover:rotate-6 transition-transform duration-500">
                <div className="bg-white rounded-xl p-3 w-32">
                  <div className="text-xs font-bold text-gray-900 mb-2">WhatsApp Bot</div>
                  <div className="space-y-1">
                    <div className="bg-primary text-white text-xs p-1 rounded font-medium">
                      Oi! Gostaria de agendar?
                    </div>
                    <div className="bg-gray-100 text-xs p-1 rounded font-medium">Sim, para amanhã às 14h</div>
                    <div className="bg-primary text-white text-xs p-1 rounded font-medium">Perfeito! Agendado ✅</div>
                  </div>
                </div>
              </div>

              {/* Calendar Widget */}
              <div className="absolute top-8 right-8 bg-white rounded-lg shadow-lg p-3 z-15 transform -rotate-12 hover:-rotate-6 transition-transform duration-500">
                <div className="text-xs font-bold text-gray-900 mb-2">Janeiro 2024</div>
                <div className="grid grid-cols-7 gap-1 text-xs">
                  {["D", "S", "T", "Q", "Q", "S", "S"].map((day, i) => (
                    <div key={i} className="text-center text-gray-500 font-bold">
                      {day}
                    </div>
                  ))}
                  {Array.from({ length: 31 }, (_, i) => (
                    <div
                      key={i}
                      className={`text-center p-1 font-medium ${i === 17 ? "bg-primary text-white rounded" : "text-gray-700"}`}
                    >
                      {i + 1}
                    </div>
                  ))}
                </div>
              </div>

              {/* Background Glow */}
              <div className="absolute inset-0 bg-brand-gradient opacity-20 rounded-3xl blur-3xl -z-10"></div>
            </div>
          </div>

          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}
            ></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">{t("features.title")}</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto font-light">{t("features.subtitle")}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-xl text-gray-900 font-bold">{t("features.smart_scheduling")}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 font-light">{t("features.smart_scheduling_desc")}</p>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Smartphone className="h-8 w-8 text-accent" />
                </div>
                <CardTitle className="text-xl text-gray-900 font-bold">{t("features.whatsapp_telegram")}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 font-light">{t("features.whatsapp_telegram_desc")}</p>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="bg-secondary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="h-8 w-8 text-secondary" />
                </div>
                <CardTitle className="text-xl text-gray-900 font-bold">{t("features.integrations")}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 font-light">{t("features.integrations_desc")}</p>
              </CardContent>
            </Card>
          </div>

          {/* Additional Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-start space-x-3">
              <div className="bg-accent/10 p-2 rounded-lg">
                <Smartphone className="h-5 w-5 text-accent" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900">{t("nav.whatsapp_bot")}</h4>
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
              <div className="bg-brand-blue-light/10 p-2 rounded-lg">
                <TrendingUp className="h-5 w-5 text-brand-blue-light" />
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
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6 tracking-tight">{t("benefits.title")}</h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <CheckCircle className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">{t("benefits.revenue_increase")}</h3>
                    <p className="text-gray-600 font-light">{t("benefits.revenue_increase_desc")}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <CheckCircle className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">{t("benefits.no_shows_reduction")}</h3>
                    <p className="text-gray-600 font-light">{t("benefits.no_shows_reduction_desc")}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <CheckCircle className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">{t("benefits.time_savings")}</h3>
                    <p className="text-gray-600 font-light">{t("benefits.time_savings_desc")}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <CheckCircle className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">{t("benefits.satisfaction")}</h3>
                    <p className="text-gray-600 font-light">{t("benefits.satisfaction_desc")}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-xl">
              <div className="text-center mb-6">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2 tracking-tight">{t("benefits.setup_title")}</h3>
                <p className="text-gray-600 font-light">{t("benefits.setup_subtitle")}</p>
              </div>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                    1
                  </div>
                  <span className="text-gray-700 font-medium">{t("benefits.step1")}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                    2
                  </div>
                  <span className="text-gray-700 font-medium">{t("benefits.step2")}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                    3
                  </div>
                  <span className="text-gray-700 font-medium">{t("benefits.step3")}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gradient-to-br from-gray-50 via-white to-primary/5">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-6 tracking-tight">
              {t("pricing.title")}
              <span className="bg-brand-gradient bg-clip-text text-transparent block">
                {t("pricing.title_highlight")}
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light leading-relaxed">
              {t("pricing.subtitle")}
            </p>

            {/* Annual/Monthly Toggle */}
            <div className="flex items-center justify-center space-x-4 mt-8 mb-4">
              <span className={`font-semibold ${!isAnnual ? "text-gray-900" : "text-gray-500"}`}>
                {t("pricing.monthly")}
              </span>
              <Switch checked={isAnnual} onCheckedChange={setIsAnnual} className="data-[state=checked]:bg-primary" />
              <span className={`font-semibold ${isAnnual ? "text-gray-900" : "text-gray-500"}`}>
                {t("pricing.annual")}
              </span>
              <Badge className="bg-accent text-white font-bold animate-pulse">{t("pricing.save_30")}</Badge>
            </div>

            {isAnnual && (
              <div className="bg-gradient-to-r from-accent/10 to-primary/10 rounded-2xl p-6 max-w-2xl mx-auto border border-accent/20 mb-8">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <Zap className="h-5 w-5 text-accent" />
                  <span className="font-bold text-gray-900 text-lg">{t("pricing.annual_savings")}</span>
                </div>
                <p className="text-gray-700 font-medium mb-4">{t("pricing.annual_description")}</p>
                <div className="bg-white/80 rounded-lg p-4 border border-orange-200">
                  <div className="flex items-start space-x-2">
                    <div className="text-orange-500 mt-0.5">⚠️</div>
                    <div className="text-sm text-gray-700">
                      <strong>Importante:</strong> {t("pricing.important_note")}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Professional Selector */}
          <div className="max-w-4xl mx-auto mb-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">{t("pricing.professionals_question")}</h3>

            <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0">
              <CardContent className="p-8">
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-semibold text-gray-500">1 profissional</span>
                    <span className="text-sm font-semibold text-gray-500">20+ profissionais</span>
                  </div>

                  <div className="relative mb-6">
                    <div
                      className="absolute -top-12 transform -translate-x-1/2 bg-primary text-white px-3 py-2 rounded-lg text-sm font-bold z-10 shadow-lg"
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
                      className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                      style={{
                        background: getSliderBackground(),
                      }}
                    />
                  </div>

                  <div className="flex items-center justify-center space-x-4">
                    <label htmlFor="professionals-input" className="text-sm font-semibold text-gray-700">
                      {t("pricing.professionals_input")}
                    </label>
                    <Input
                      id="professionals-input"
                      type="number"
                      min="1"
                      max="20"
                      value={selectedProfessionals > 20 ? 20 : selectedProfessionals}
                      onChange={handleInputChange}
                      className="w-24 text-center font-semibold border-primary/20 focus:border-primary"
                    />
                    <span className="text-sm text-gray-500 font-medium">{t("pricing.professionals_unit")}</span>
                  </div>
                </div>

                {/* Recommended Plan Preview */}
                {recommendedPlan && (
                  <div className="text-center">
                    <div className="inline-flex items-center px-6 py-3 rounded-full bg-primary/10 text-primary border border-primary/20">
                      <Crown className="h-5 w-5 mr-2" />
                      <span className="font-bold text-lg">
                        {t("pricing.recommended_plan")} {recommendedPlan.name} -{" "}
                        {isAnnual
                          ? `${formatPrice(recommendedPlan.monthlyEquivalent)}/mês (anual)`
                          : `${formatPrice(recommendedPlan.monthlyPrice)}/mês`}
                      </span>
                    </div>
                  </div>
                )}

                {isUnlimited && (
                  <div className="text-center">
                    <div className="inline-flex items-center px-6 py-3 rounded-full bg-brand-purple/10 text-brand-purple border border-brand-purple/20">
                      <Building2 className="h-5 w-5 mr-2" />
                      <span className="font-bold text-lg">{t("pricing.enterprise_plan")}</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Pricing Cards */}
          {!isUnlimited ? (
            <div className="max-w-7xl mx-auto mb-16">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
                {pricingTiers.map((tier) => {
                  const isRecommended = recommendedPlan?.name === tier.name
                  const showPlan = selectedProfessionals <= tier.maxProfessionals || tier.name === t("plans.pro.name")

                  if (!showPlan) return null

                  // Define color schemes for each plan
                  const getCardStyle = () => {
                    if (isRecommended) {
                      return {
                        border: "border-2 border-primary",
                        badge: "bg-primary text-white",
                        badgeText: "🎯 Recomendado",
                        button: "bg-primary hover:bg-primary/90 text-white",
                      }
                    } else if (tier.popular && isAnnual) {
                      return {
                        border: "border-2 border-accent",
                        badge: "bg-accent text-white",
                        badgeText: "🔥 Mais Popular",
                        button: "bg-accent hover:bg-accent/90 text-white",
                      }
                    } else {
                      return {
                        border: "border border-gray-200",
                        badge: "",
                        badgeText: "",
                        button: "bg-white border-2 border-primary text-primary hover:bg-primary hover:text-white",
                      }
                    }
                  }

                  const cardStyle = getCardStyle()

                  return (
                    <div key={tier.name} className="flex">
                      <Card
                        className={`relative bg-white shadow-lg transition-all hover:shadow-xl w-full h-full flex flex-col ${cardStyle.border}`}
                      >
                        {/* Badge */}
                        {cardStyle.badgeText && (
                          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
                            <Badge className={`font-bold px-4 py-2 text-sm whitespace-nowrap ${cardStyle.badge}`}>
                              {cardStyle.badgeText}
                            </Badge>
                          </div>
                        )}

                        <CardHeader className="text-center pb-4 pt-8 flex-shrink-0">
                          <CardTitle className="text-2xl font-bold text-gray-900 mb-2">{tier.name}</CardTitle>
                          <p className="text-gray-600 text-sm font-medium mb-4">{tier.description}</p>

                          {/* Pricing Display */}
                          <div className="space-y-2">
                            {isAnnual ? (
                              <>
                                <div className="text-4xl font-bold text-gray-900">
                                  {formatPrice(tier.monthlyEquivalent)}
                                  <span className="text-lg text-gray-600 font-normal">{t("pricing.per_month")}</span>
                                </div>
                                <div className="text-sm text-gray-500">
                                  <span className="line-through">{formatPrice(tier.monthlyPrice)}/mês</span>
                                  <span className="ml-2 text-accent font-bold">{t("pricing.save_30")}</span>
                                </div>
                                <div className="text-sm font-semibold text-primary">
                                  {formatPrice(tier.annualPrice)} {t("pricing.billed_annually")}
                                </div>
                              </>
                            ) : (
                              <>
                                <div className="text-4xl font-bold text-gray-900">
                                  {formatPrice(tier.monthlyPrice)}
                                  <span className="text-lg text-gray-600 font-normal">{t("pricing.per_month")}</span>
                                </div>
                                <div className="text-sm text-accent font-semibold">
                                  Economize {formatPrice(tier.monthlyPrice * 12 - tier.annualPrice)} por ano no plano
                                  anual
                                </div>
                              </>
                            )}
                          </div>

                          <div className="text-xs text-gray-500 font-medium mt-2">{t("pricing.free_trial_note")}</div>
                        </CardHeader>

                        <CardContent className="flex flex-col flex-1 px-6 pb-6">
                          {/* Features List */}
                          <div className="space-y-3 flex-1">
                            {tier.features.map((feature, index) => (
                              <div key={index} className="flex items-start space-x-3">
                                <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                <span className="text-sm text-gray-700 font-medium">{feature}</span>
                              </div>
                            ))}
                          </div>

                          {/* CTA Button - Sempre no final */}
                          <div className="mt-6 pt-4 border-t border-gray-100">
                            <Button
                              asChild
                              className={`w-full h-12 font-bold text-base transition-all ${cardStyle.button}`}
                            >
                              <Link href={`/${locale}/register-tenant`}>
                                {t("pricing.start_free_trial")}
                                <span className="ml-2">→</span>
                              </Link>
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
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
                    <h3 className="text-3xl font-bold text-gray-900 mb-3 tracking-tight">20+ Profissionais</h3>
                    <p className="text-xl text-gray-600 mb-6 font-light">{t("plans.enterprise.description")}</p>
                    <div className="bg-white rounded-lg p-6 mb-6">
                      <h4 className="font-bold text-gray-900 mb-4">Recursos Exclusivos Enterprise:</h4>
                      <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
                        <div className="flex items-center space-x-2">
                          <Check className="h-4 w-4 text-primary" />
                          <span className="font-medium">Profissionais ilimitados</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Check className="h-4 w-4 text-primary" />
                          <span className="font-medium">Multi-localização</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Check className="h-4 w-4 text-primary" />
                          <span className="font-medium">API personalizada</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Check className="h-4 w-4 text-primary" />
                          <span className="font-medium">Gerente dedicado</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Check className="h-4 w-4 text-primary" />
                          <span className="font-medium">SLA garantido 99.9%</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Check className="h-4 w-4 text-primary" />
                          <span className="font-medium">Treinamento personalizado</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Check className="h-4 w-4 text-primary" />
                          <span className="font-medium">Suporte 24/7</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Check className="h-4 w-4 text-primary" />
                          <span className="font-medium">White label disponível</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Button className="bg-brand-purple text-white hover:bg-brand-purple/90 font-bold px-8 py-4 text-lg h-auto">
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
              Todos os planos incluem essas funcionalidades
            </h3>
            <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6">
              <div className="text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="h-8 w-8 text-primary" />
                </div>
                <h4 className="font-bold text-gray-900 mb-2">{t("features.smart_scheduling")}</h4>
                <p className="text-sm text-gray-600 font-light">IA otimiza automaticamente</p>
              </div>
              <div className="text-center">
                <div className="bg-secondary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Smartphone className="h-8 w-8 text-secondary" />
                </div>
                <h4 className="font-bold text-gray-900 mb-2">{t("nav.whatsapp_bot")}</h4>
                <p className="text-sm text-gray-600 font-light">Agendamento automático</p>
              </div>
              <div className="text-center">
                <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-accent" />
                </div>
                <h4 className="font-bold text-gray-900 mb-2">Gestão de Clientes</h4>
                <p className="text-sm text-gray-600 font-light">Histórico completo</p>
              </div>
              <div className="text-center">
                <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="h-8 w-8 text-emerald-600" />
                </div>
                <h4 className="font-bold text-gray-900 mb-2">{t("nav.reports")}</h4>
                <p className="text-sm text-gray-600 font-light">Análises detalhadas</p>
              </div>
              <div className="text-center">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-purple-600" />
                </div>
                <h4 className="font-bold text-gray-900 mb-2">Segurança</h4>
                <p className="text-sm text-gray-600 font-light">Dados protegidos</p>
              </div>
              <div className="text-center">
                <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Building2 className="h-8 w-8 text-orange-600" />
                </div>
                <h4 className="font-bold text-gray-900 mb-2">Página Própria</h4>
                <p className="text-sm text-gray-600 font-light">Link personalizado</p>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="max-w-4xl mx-auto mb-16">
            <h3 className="text-3xl font-bold text-gray-900 text-center mb-12 tracking-tight">Perguntas Frequentes</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="bg-white/80 backdrop-blur-sm border-gray-200">
                <CardContent className="p-6">
                  <h4 className="font-bold text-gray-900 mb-2">Como funciona o teste grátis?</h4>
                  <p className="text-gray-600 font-light">
                    Você tem 15 dias para testar todas as funcionalidades gratuitamente. Precisamos do seu cartão de
                    crédito para garantir a continuidade do serviço, mas você só será cobrado após o período de teste.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-white/80 backdrop-blur-sm border-gray-200">
                <CardContent className="p-6">
                  <h4 className="font-bold text-gray-900 mb-2">Posso cancelar a qualquer momento?</h4>
                  <p className="text-gray-600 font-light">
                    Você pode testar todos os planos por 15 dias gratuitamente. Após esse período, o valor do plano
                    anual é cobrado integralmente e não reembolsável. O cancelamento pode ser feito a qualquer momento,
                    mas a assinatura permanecerá ativa até o fim do período contratado.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-white/80 backdrop-blur-sm border-gray-200">
                <CardContent className="p-6">
                  <h4 className="font-bold text-gray-900 mb-2">Como funciona o pagamento anual?</h4>
                  <p className="text-gray-600 font-light">
                    Após o teste grátis, você paga o valor total à vista (boleto ou cartão) e economiza 30%. O sistema
                    fica ativo por 12 meses completos. O valor não é reembolsável após a cobrança.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-white/80 backdrop-blur-sm border-gray-200">
                <CardContent className="p-6">
                  <h4 className="font-bold text-gray-900 mb-2">Posso mudar de plano depois?</h4>
                  <p className="text-gray-600 font-light">
                    Sim! Você pode fazer upgrade a qualquer momento com cobrança proporcional. Para downgrade, a
                    alteração será aplicada apenas na próxima renovação.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Final CTA */}
          <div className="text-center">
            <Card className="max-w-4xl mx-auto bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
              <CardContent className="p-12">
                <h3 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">
                  Pronto para transformar seu negócio?
                </h3>
                <p className="text-xl text-gray-600 mb-8 font-light">
                  Junte-se a milhares de estabelecimentos que já aumentaram sua receita com o Kalender
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    asChild
                    className="bg-primary hover:bg-primary/90 text-white font-bold px-8 py-4 text-lg h-auto shadow-lg hover:shadow-xl transition-all"
                  >
                    <Link href={`/${locale}/register-tenant`}>
                      {t("pricing.start_free_trial")}
                      <span className="ml-2">→</span>
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    asChild
                    className="border-2 border-primary text-primary hover:bg-primary hover:text-white font-bold px-8 py-4 text-lg h-auto"
                  >
                    <Link href={`/${locale}/login`}>Já tenho conta</Link>
                  </Button>
                </div>
                <p className="text-sm text-gray-500 mt-4 font-medium">{t("pricing.free_trial_note")}</p>
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
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <img src="/kalender-logo.png" alt="Kalender" className="h-8 w-8 filter brightness-0 invert" />
                <span className="text-xl font-bold bg-brand-gradient bg-clip-text text-transparent">Kalender</span>
              </div>
              <p className="text-gray-400 font-light">
                A plataforma completa de agendamento inteligente para empresas que querem crescer.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Produto</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href={`/${locale}/dashboard`} className="hover:text-white transition-colors">
                    {t("nav.dashboard")}
                  </Link>
                </li>
                <li>
                  <Link href={`/${locale}/dashboard/schedule`} className="hover:text-white transition-colors">
                    {t("nav.schedule")}
                  </Link>
                </li>
                <li>
                  <Link href={`/${locale}/dashboard/professionals`} className="hover:text-white transition-colors">
                    {t("nav.team_management")}
                  </Link>
                </li>
                <li>
                  <a href="#pricing" className="hover:text-white transition-colors">
                    {t("header.pricing")}
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">{t("header.features")}</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    {t("nav.whatsapp_bot")}
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    {t("nav.integrations")}
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    {t("nav.reports")}
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    {t("nav.api")}
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Empresa</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Sobre
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Contato
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Suporte
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Kalender. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
