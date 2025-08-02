"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Check, Zap, Crown, Building2, Users, Calendar, BarChart3, Shield, Smartphone, ChevronDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function PricingPage() {
  const [selectedProfessionals, setSelectedProfessionals] = useState(1)
  const [isAnnual, setIsAnnual] = useState(true) // Sempre começar com anual

  // Tabela de preços conforme especificado
  const pricingTiers = [
    {
      name: "Start",
      maxProfessionals: 1,
      monthlyPrice: 49.0,
      annualPrice: 411.6,
      monthlyEquivalent: 34.3,
      popular: false,
      description: "Ideal para profissionais autônomos",
      features: [
        "1 profissional",
        "Agenda inteligente",
        "WhatsApp automático",
        "Página personalizada",
        "Relatórios básicos",
        "Suporte por email",
      ],
    },
    {
      name: "Essencial",
      maxProfessionals: 3,
      monthlyPrice: 119.0,
      annualPrice: 997.2,
      monthlyEquivalent: 83.1,
      popular: true,
      description: "Perfeito para pequenas equipes",
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
      name: "Avançado",
      maxProfessionals: 10,
      monthlyPrice: 219.0,
      annualPrice: 1839.6,
      monthlyEquivalent: 137.97,
      popular: false,
      description: "Para estabelecimentos em crescimento",
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
      name: "Pro",
      maxProfessionals: 20,
      monthlyPrice: 349.0,
      annualPrice: 2931.6,
      monthlyEquivalent: 209.4,
      popular: false,
      description: "Para grandes estabelecimentos",
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
    return null // Enterprise
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary/5 font-nethead">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3">
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
                    Plataforma
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white border-gray-200">
                  <DropdownMenuItem className="text-gray-700 hover:bg-gray-100">
                    <Link href="/dashboard" className="w-full">
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-gray-700 hover:bg-gray-100">
                    <Link href="/dashboard/schedule" className="w-full">
                      Agenda Inteligente
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-gray-700 hover:bg-gray-100">
                    <Link href="/dashboard/professionals" className="w-full">
                      Gestão de Equipe
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="text-gray-700 hover:text-gray-900 font-medium">
                    Recursos
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white border-gray-200">
                  <DropdownMenuItem className="text-gray-700 hover:bg-gray-100">
                    <Link href="#" className="w-full">
                      WhatsApp Bot
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-gray-700 hover:bg-gray-100">
                    <Link href="#" className="w-full">
                      Integrações
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-gray-700 hover:bg-gray-100">
                    <Link href="#" className="w-full">
                      Relatórios
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-gray-700 hover:bg-gray-100">
                    <Link href="#" className="w-full">
                      API
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="text-gray-700 hover:text-gray-900 font-medium">
                    Segmentos
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white border-gray-200">
                  <DropdownMenuItem className="text-gray-700 hover:bg-gray-100">
                    <Link href="#" className="w-full">
                      Salões de Beleza
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-gray-700 hover:bg-gray-100">
                    <Link href="#" className="w-full">
                      Clínicas
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-gray-700 hover:bg-gray-100">
                    <Link href="#" className="w-full">
                      Spas & Estética
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-gray-700 hover:bg-gray-100">
                    <Link href="#" className="w-full">
                      Academias
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Link
                href="/pricing"
                className="text-gray-700 hover:text-gray-900 font-medium px-4 py-2 rounded-lg hover:bg-gray-100"
              >
                Preços
              </Link>
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                asChild
                className="hidden md:flex border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                <Link href="/login">Entrar</Link>
              </Button>
              <Button asChild className="bg-primary hover:bg-primary/90 text-white font-semibold">
                <Link href="/register-tenant">Teste 15 Dias Grátis</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6 tracking-tight">
            Preços que crescem
            <span className="bg-brand-gradient bg-clip-text text-transparent block">com o seu negócio</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light leading-relaxed">
            Escolha o plano ideal para o seu estabelecimento. Todos incluem 15 dias grátis e podem ser cancelados a
            qualquer momento.
          </p>

          {/* Annual/Monthly Toggle */}
          <div className="flex items-center justify-center space-x-4 mt-8 mb-4">
            <span className={`font-semibold ${!isAnnual ? "text-gray-900" : "text-gray-500"}`}>Mensal</span>
            <Switch checked={isAnnual} onCheckedChange={setIsAnnual} className="data-[state=checked]:bg-primary" />
            <span className={`font-semibold ${isAnnual ? "text-gray-900" : "text-gray-500"}`}>Anual</span>
            <Badge className="bg-accent text-white font-bold animate-pulse">30% OFF</Badge>
          </div>

          {isAnnual && (
            <div className="bg-gradient-to-r from-accent/10 to-primary/10 rounded-2xl p-6 max-w-2xl mx-auto border border-accent/20 mb-8">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Zap className="h-5 w-5 text-accent" />
                <span className="font-bold text-gray-900 text-lg">🚀 Economize 30% com o plano anual!</span>
              </div>
              <p className="text-gray-700 font-medium mb-4">
                Pague uma vez e aproveite o Kalender o ano todo com tranquilidade — sem surpresas, sem mensalidades.
              </p>
              <div className="bg-white/80 rounded-lg p-4 border border-orange-200">
                <div className="flex items-start space-x-2">
                  <div className="text-orange-500 mt-0.5">⚠️</div>
                  <div className="text-sm text-gray-700">
                    <strong>Importante:</strong> Após os 15 dias de teste, o plano anual é cobrado integralmente e não é
                    reembolsável. O cancelamento evita apenas a renovação automática.
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Professional Selector */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Quantos profissionais você tem na sua equipe?
          </h2>

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
                    Ou digite o número:
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
                  <span className="text-sm text-gray-500 font-medium">profissionais</span>
                </div>
              </div>

              {/* Recommended Plan Preview */}
              {recommendedPlan && (
                <div className="text-center">
                  <div className="inline-flex items-center px-6 py-3 rounded-full bg-primary/10 text-primary border border-primary/20">
                    <Crown className="h-5 w-5 mr-2" />
                    <span className="font-bold text-lg">
                      Plano recomendado: {recommendedPlan.name} -{" "}
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
                    <span className="font-bold text-lg">Para 20+ profissionais: Plano Enterprise (sob consulta)</span>
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
                const showPlan = selectedProfessionals <= tier.maxProfessionals || tier.name === "Pro"

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
                                <span className="text-lg text-gray-600 font-normal">/mês</span>
                              </div>
                              <div className="text-sm text-gray-500">
                                <span className="line-through">{formatPrice(tier.monthlyPrice)}/mês</span>
                                <span className="ml-2 text-accent font-bold">30% OFF</span>
                              </div>
                              <div className="text-sm font-semibold text-primary">
                                {formatPrice(tier.annualPrice)} cobrado anualmente
                              </div>
                            </>
                          ) : (
                            <>
                              <div className="text-4xl font-bold text-gray-900">
                                {formatPrice(tier.monthlyPrice)}
                                <span className="text-lg text-gray-600 font-normal">/mês</span>
                              </div>
                              <div className="text-sm text-accent font-semibold">
                                Economize {formatPrice(tier.monthlyPrice * 12 - tier.annualPrice)} por ano no plano
                                anual
                              </div>
                            </>
                          )}
                        </div>

                        <div className="text-xs text-gray-500 font-medium mt-2">
                          ✅ 15 dias grátis (cartão necessário) • ⚠️ Plano anual não reembolsável
                        </div>
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
                            <Link href="/register-tenant">
                              Começar Teste Grátis
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
                    🏢 Plano Enterprise
                  </Badge>
                  <h3 className="text-3xl font-bold text-gray-900 mb-3 tracking-tight">20+ Profissionais</h3>
                  <p className="text-xl text-gray-600 mb-6 font-light">
                    Para grandes estabelecimentos e redes com múltiplas filiais. Preços personalizados e recursos
                    exclusivos.
                  </p>
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
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12 tracking-tight">
            Todos os planos incluem essas funcionalidades
          </h2>
          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6">
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-8 w-8 text-primary" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Agenda Inteligente</h4>
              <p className="text-sm text-gray-600 font-light">IA otimiza automaticamente</p>
            </div>
            <div className="text-center">
              <div className="bg-secondary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Smartphone className="h-8 w-8 text-secondary" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">WhatsApp Bot</h4>
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
              <h4 className="font-bold text-gray-900 mb-2">Relatórios</h4>
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
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12 tracking-tight">Perguntas Frequentes</h2>
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
                  Você pode testar todos os planos por 15 dias gratuitamente. Após esse período, o valor do plano anual
                  é cobrado integralmente e não reembolsável. O cancelamento pode ser feito a qualquer momento, mas a
                  assinatura permanecerá ativa até o fim do período contratado.
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
                  Sim! Você pode fazer upgrade a qualquer momento com cobrança proporcional. Para downgrade, a alteração
                  será aplicada apenas na próxima renovação.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center">
          <Card className="max-w-4xl mx-auto bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
            <CardContent className="p-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">
                Pronto para transformar seu negócio?
              </h2>
              <p className="text-xl text-gray-600 mb-8 font-light">
                Junte-se a milhares de estabelecimentos que já aumentaram sua receita com o Kalender
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  className="bg-primary hover:bg-primary/90 text-white font-bold px-8 py-4 text-lg h-auto shadow-lg hover:shadow-xl transition-all"
                >
                  <Link href="/register-tenant">
                    Começar Teste Grátis de 15 Dias
                    <span className="ml-2">→</span>
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  asChild
                  className="border-2 border-primary text-primary hover:bg-primary hover:text-white font-bold px-8 py-4 text-lg h-auto"
                >
                  <Link href="/login">Já tenho conta</Link>
                </Button>
              </div>
              <p className="text-sm text-gray-500 mt-4 font-medium">
                ✅ Cartão necessário para teste • ✅ Configuração em 5 minutos • ⚠️ Plano anual não reembolsável
              </p>
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
    </div>
  )
}
