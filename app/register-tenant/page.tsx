"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Building2, Mail, MapPin, ExternalLink, Check, Zap, Shield, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function RegisterTenantPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [slug, setSlug] = useState("")
  const [businessName, setBusinessName] = useState("")

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim()
  }

  const handleBusinessNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value
    setBusinessName(name)
    if (name && !slug) {
      setSlug(generateSlug(name))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      // Redirect to success page or login
      alert("Estabelecimento cadastrado com sucesso! Você receberá um e-mail com as instruções de acesso.")
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary/5 font-nethead">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <img src="/kalender-logo.png" alt="Kalender" className="h-10 w-10" />
            <span className="text-2xl font-bold bg-brand-gradient bg-clip-text text-transparent tracking-tight">
              Kalender
            </span>
          </div>
          <Button variant="ghost" asChild className="text-gray-600 hover:text-gray-900 font-medium">
            <Link href="/login" className="flex items-center space-x-2">
              <ArrowLeft className="h-4 w-4" />
              <span>Voltar ao Login</span>
            </Link>
          </Button>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Side - Benefits */}
            <div className="lg:col-span-1 space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 tracking-tight">
                  Crie sua página de
                  <span className="bg-brand-gradient bg-clip-text text-transparent block">agendamentos</span>
                </h2>
                <p className="text-gray-600 font-light">
                  Configure seu estabelecimento em poucos minutos e comece a receber agendamentos online.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="bg-primary/10 p-2 rounded-lg">
                    <Zap className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm">Configuração em 5 minutos</h4>
                    <p className="text-xs text-gray-600 font-light">Setup rápido e intuitivo</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="bg-secondary/10 p-2 rounded-lg">
                    <Users className="h-5 w-5 text-secondary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm">Página personalizada</h4>
                    <p className="text-xs text-gray-600 font-light">Seu link único para clientes</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="bg-accent/10 p-2 rounded-lg">
                    <Shield className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm">15 dias grátis</h4>
                    <p className="text-xs text-gray-600 font-light">Teste sem compromisso</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-xl p-4 border border-primary/10">
                <h4 className="font-bold text-gray-900 mb-2 text-sm">✨ O que você terá:</h4>
                <ul className="space-y-1 text-xs text-gray-700">
                  <li className="flex items-center">
                    <Check className="h-3 w-3 mr-2 text-primary" />
                    Página personalizada para agendamentos
                  </li>
                  <li className="flex items-center">
                    <Check className="h-3 w-3 mr-2 text-primary" />
                    Gestão completa de serviços
                  </li>
                  <li className="flex items-center">
                    <Check className="h-3 w-3 mr-2 text-primary" />
                    Integração com Google Calendar
                  </li>
                  <li className="flex items-center">
                    <Check className="h-3 w-3 mr-2 text-primary" />
                    Confirmações automáticas via WhatsApp
                  </li>
                </ul>
              </div>
            </div>

            {/* Right Side - Form */}
            <div className="lg:col-span-2">
              <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader className="text-center pb-6">
                  <div className="mx-auto bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                    <Building2 className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-3xl font-bold text-gray-900 tracking-tight">
                    Cadastre seu Estabelecimento
                  </CardTitle>
                  <CardDescription className="text-base text-gray-600 font-light">
                    Crie sua página de agendamentos personalizada em poucos passos
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  {/* Preview do Link */}
                  {slug && (
                    <Alert className="mb-6 border-primary/20 bg-primary/5">
                      <ExternalLink className="h-4 w-4 text-primary" />
                      <AlertDescription className="text-primary-foreground">
                        <strong className="text-gray-900">Seu link de agendamentos será:</strong>
                        <br />
                        <code className="bg-primary/10 px-2 py-1 rounded text-sm text-gray-800">
                          kalender.app/{slug}
                        </code>
                      </AlertDescription>
                    </Alert>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Informações Básicas */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-bold text-gray-900 flex items-center">
                        <Building2 className="h-5 w-5 mr-2 text-primary" />
                        Informações do Estabelecimento
                      </h3>

                      <div className="space-y-2">
                        <Label htmlFor="businessName" className="font-semibold text-gray-700">
                          Nome do Estabelecimento *
                        </Label>
                        <Input
                          id="businessName"
                          placeholder="Ex: Clínica Beleza & Bem-estar"
                          value={businessName}
                          onChange={handleBusinessNameChange}
                          className="h-12 border-gray-300 focus:border-primary focus:ring-primary"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="slug" className="font-semibold text-gray-700">
                          URL Personalizada *
                        </Label>
                        <div className="flex">
                          <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm font-medium">
                            kalender.app/
                          </span>
                          <Input
                            id="slug"
                            placeholder="seu-estabelecimento"
                            value={slug}
                            onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""))}
                            className="rounded-l-none h-12 border-gray-300 focus:border-primary focus:ring-primary"
                            required
                          />
                        </div>
                        <p className="text-xs text-gray-500 font-medium">
                          Este será o link que seus clientes usarão para fazer agendamentos
                        </p>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="businessType" className="font-semibold text-gray-700">
                          Tipo de Negócio *
                        </Label>
                        <Select required>
                          <SelectTrigger className="h-12 border-gray-300 focus:border-primary focus:ring-primary">
                            <SelectValue placeholder="Selecione o tipo de negócio" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="clinic">Clínica/Consultório</SelectItem>
                            <SelectItem value="salon">Salão de Beleza</SelectItem>
                            <SelectItem value="spa">Spa/Estética</SelectItem>
                            <SelectItem value="gym">Academia/Personal</SelectItem>
                            <SelectItem value="dental">Consultório Odontológico</SelectItem>
                            <SelectItem value="vet">Clínica Veterinária</SelectItem>
                            <SelectItem value="therapy">Terapias/Psicologia</SelectItem>
                            <SelectItem value="nutrition">Nutrição</SelectItem>
                            <SelectItem value="other">Outros</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="description" className="font-semibold text-gray-700">
                          Descrição (aparecerá na sua página de agendamentos)
                        </Label>
                        <Textarea
                          id="description"
                          placeholder="Descreva seus serviços e diferenciais para seus clientes..."
                          rows={3}
                          className="border-gray-300 focus:border-primary focus:ring-primary"
                        />
                      </div>
                    </div>

                    {/* Informações de Contato */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-bold text-gray-900 flex items-center">
                        <Mail className="h-5 w-5 mr-2 text-secondary" />
                        Informações de Contato
                      </h3>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="email" className="font-semibold text-gray-700">
                            E-mail *
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="contato@seuestablecimento.com"
                            className="h-12 border-gray-300 focus:border-primary focus:ring-primary"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone" className="font-semibold text-gray-700">
                            WhatsApp *
                          </Label>
                          <Input
                            id="phone"
                            placeholder="(11) 99999-9999"
                            className="h-12 border-gray-300 focus:border-primary focus:ring-primary"
                            required
                          />
                          <p className="text-xs text-gray-500 font-medium">
                            Usado para confirmações e lembretes de agendamento
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Localização */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-bold text-gray-900 flex items-center">
                        <MapPin className="h-5 w-5 mr-2 text-accent" />
                        Localização
                      </h3>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="city" className="font-semibold text-gray-700">
                            Cidade *
                          </Label>
                          <Input
                            id="city"
                            placeholder="São Paulo"
                            className="h-12 border-gray-300 focus:border-primary focus:ring-primary"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="state" className="font-semibold text-gray-700">
                            Estado *
                          </Label>
                          <Input
                            id="state"
                            placeholder="SP"
                            className="h-12 border-gray-300 focus:border-primary focus:ring-primary"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="address" className="font-semibold text-gray-700">
                          Endereço Completo
                        </Label>
                        <Input
                          id="address"
                          placeholder="Rua, número, bairro (opcional)"
                          className="h-12 border-gray-300 focus:border-primary focus:ring-primary"
                        />
                      </div>
                    </div>

                    {/* Administrador */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-bold text-gray-900">Dados do Responsável</h3>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="adminName" className="font-semibold text-gray-700">
                            Nome Completo *
                          </Label>
                          <Input
                            id="adminName"
                            placeholder="Seu nome completo"
                            className="h-12 border-gray-300 focus:border-primary focus:ring-primary"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="adminEmail" className="font-semibold text-gray-700">
                            E-mail de Acesso *
                          </Label>
                          <Input
                            id="adminEmail"
                            type="email"
                            placeholder="seu@email.com"
                            className="h-12 border-gray-300 focus:border-primary focus:ring-primary"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 pt-6">
                      <Button
                        type="submit"
                        className="flex-1 h-12 bg-primary hover:bg-primary/90 text-white font-bold shadow-lg hover:shadow-xl transition-all"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <div className="flex items-center space-x-2">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                            <span>Criando estabelecimento...</span>
                          </div>
                        ) : (
                          "Criar Minha Página de Agendamentos"
                        )}
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        className="flex-1 h-12 border-gray-300 text-gray-600 hover:bg-gray-50 font-semibold"
                        asChild
                      >
                        <Link href="/login">Cancelar</Link>
                      </Button>
                    </div>

                    <div className="text-center text-sm text-gray-600">
                      <p className="font-medium">
                        Ao criar uma conta, você concorda com nossos{" "}
                        <Link href="/terms" className="text-primary hover:text-primary/80 font-semibold">
                          Termos de Uso
                        </Link>{" "}
                        e{" "}
                        <Link href="/privacy" className="text-primary hover:text-primary/80 font-semibold">
                          Política de Privacidade
                        </Link>
                      </p>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Background Pattern */}
      <div className="fixed inset-0 -z-10 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%230EA5E9' fillOpacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>
    </div>
  )
}
