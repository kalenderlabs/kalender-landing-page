"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { ChevronLeft, ChevronRight, Check, Building2, Users, User, Briefcase } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"

interface FormData {
  // Step 1: Organization
  organizationName: string
  organizationDescription: string

  // Step 2: Tenant
  tenantName: string
  tenantSlug: string
  tenantDescription: string

  // Step 3: User
  userName: string
  userEmail: string
  userPhone: string
  userPassword: string

  // Step 4: Service
  serviceName: string
  serviceDescription: string
  servicePrice: string
  serviceDuration: string
}

const initialFormData: FormData = {
  organizationName: "",
  organizationDescription: "",
  tenantName: "",
  tenantSlug: "",
  tenantDescription: "",
  userName: "",
  userEmail: "",
  userPhone: "",
  userPassword: "",
  serviceName: "",
  serviceDescription: "",
  servicePrice: "",
  serviceDuration: "",
}

export default function OnboardingPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [errors, setErrors] = useState<Partial<FormData>>({})
  const [isLoading, setIsLoading] = useState(false)

  const totalSteps = 4
  const progress = (currentStep / totalSteps) * 100

  const steps = [
    { number: 1, title: "Organização", icon: Building2, description: "Informações da sua empresa" },
    { number: 2, title: "Estabelecimento", icon: Users, description: "Detalhes do seu negócio" },
    { number: 3, title: "Usuário", icon: User, description: "Seus dados pessoais" },
    { number: 4, title: "Serviço", icon: Briefcase, description: "Primeiro serviço" },
  ]

  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  const validateStep = (step: number): boolean => {
    const newErrors: Partial<FormData> = {}

    switch (step) {
      case 1:
        if (!formData.organizationName.trim()) {
          newErrors.organizationName = "Nome da organização é obrigatório"
        }
        if (!formData.organizationDescription.trim()) {
          newErrors.organizationDescription = "Descrição da organização é obrigatória"
        }
        break

      case 2:
        if (!formData.tenantName.trim()) {
          newErrors.tenantName = "Nome do estabelecimento é obrigatório"
        }
        if (!formData.tenantSlug.trim()) {
          newErrors.tenantSlug = "Slug do estabelecimento é obrigatório"
        } else if (!/^[a-z0-9-]+$/.test(formData.tenantSlug)) {
          newErrors.tenantSlug = "Slug deve conter apenas letras minúsculas, números e hífens"
        }
        if (!formData.tenantDescription.trim()) {
          newErrors.tenantDescription = "Descrição do estabelecimento é obrigatória"
        }
        break

      case 3:
        if (!formData.userName.trim()) {
          newErrors.userName = "Nome do usuário é obrigatório"
        }
        if (!formData.userEmail.trim()) {
          newErrors.userEmail = "E-mail é obrigatório"
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.userEmail)) {
          newErrors.userEmail = "E-mail inválido"
        }
        if (!formData.userPhone.trim()) {
          newErrors.userPhone = "Telefone é obrigatório"
        }
        if (!formData.userPassword.trim()) {
          newErrors.userPassword = "Senha é obrigatória"
        } else if (formData.userPassword.length < 6) {
          newErrors.userPassword = "Senha deve ter pelo menos 6 caracteres"
        }
        break

      case 4:
        if (!formData.serviceName.trim()) {
          newErrors.serviceName = "Nome do serviço é obrigatório"
        }
        if (!formData.serviceDescription.trim()) {
          newErrors.serviceDescription = "Descrição do serviço é obrigatória"
        }
        if (!formData.servicePrice.trim()) {
          newErrors.servicePrice = "Preço do serviço é obrigatório"
        } else if (isNaN(Number(formData.servicePrice)) || Number(formData.servicePrice) <= 0) {
          newErrors.servicePrice = "Preço deve ser um número válido maior que zero"
        }
        if (!formData.serviceDuration.trim()) {
          newErrors.serviceDuration = "Duração do serviço é obrigatória"
        } else if (isNaN(Number(formData.serviceDuration)) || Number(formData.serviceDuration) <= 0) {
          newErrors.serviceDuration = "Duração deve ser um número válido maior que zero"
        }
        break
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < totalSteps) {
        setCurrentStep(currentStep + 1)
      } else {
        handleSubmit()
      }
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return

    setIsLoading(true)

    try {
      const response = await fetch("/api/onboarding", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Erro ao processar onboarding")
      }

      // Store user data for login
      localStorage.setItem("kalender_user", JSON.stringify(result.user))
      localStorage.setItem("kalender_token", result.token || "demo-token")

      // Redirect to success page
      router.push("/onboarding/success")
    } catch (error) {
      console.error("Onboarding error:", error)
      alert(`Erro no onboarding: ${error instanceof Error ? error.message : "Erro desconhecido"}`)
    } finally {
      setIsLoading(false)
    }
  }

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

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="organizationName">Nome da Organização *</Label>
              <Input
                id="organizationName"
                value={formData.organizationName}
                onChange={(e) => updateFormData("organizationName", e.target.value)}
                placeholder="Ex: Salão Beleza & Estilo"
                className={errors.organizationName ? "border-red-500" : ""}
              />
              {errors.organizationName && <p className="text-sm text-red-600 mt-1">{errors.organizationName}</p>}
            </div>

            <div>
              <Label htmlFor="organizationDescription">Descrição da Organização *</Label>
              <Textarea
                id="organizationDescription"
                value={formData.organizationDescription}
                onChange={(e) => updateFormData("organizationDescription", e.target.value)}
                placeholder="Descreva brevemente sua organização..."
                className={errors.organizationDescription ? "border-red-500" : ""}
              />
              {errors.organizationDescription && (
                <p className="text-sm text-red-600 mt-1">{errors.organizationDescription}</p>
              )}
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="tenantName">Nome do Estabelecimento *</Label>
              <Input
                id="tenantName"
                value={formData.tenantName}
                onChange={(e) => {
                  const value = e.target.value
                  updateFormData("tenantName", value)
                  // Auto-generate slug
                  if (value && !formData.tenantSlug) {
                    updateFormData("tenantSlug", generateSlug(value))
                  }
                }}
                placeholder="Ex: Beleza Milena"
                className={errors.tenantName ? "border-red-500" : ""}
              />
              {errors.tenantName && <p className="text-sm text-red-600 mt-1">{errors.tenantName}</p>}
            </div>

            <div>
              <Label htmlFor="tenantSlug">URL do Estabelecimento *</Label>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">kalender.app/</span>
                <Input
                  id="tenantSlug"
                  value={formData.tenantSlug}
                  onChange={(e) => updateFormData("tenantSlug", e.target.value.toLowerCase())}
                  placeholder="beleza-milena"
                  className={errors.tenantSlug ? "border-red-500" : ""}
                />
              </div>
              {errors.tenantSlug && <p className="text-sm text-red-600 mt-1">{errors.tenantSlug}</p>}
            </div>

            <div>
              <Label htmlFor="tenantDescription">Descrição do Estabelecimento *</Label>
              <Textarea
                id="tenantDescription"
                value={formData.tenantDescription}
                onChange={(e) => updateFormData("tenantDescription", e.target.value)}
                placeholder="Descreva seu estabelecimento..."
                className={errors.tenantDescription ? "border-red-500" : ""}
              />
              {errors.tenantDescription && <p className="text-sm text-red-600 mt-1">{errors.tenantDescription}</p>}
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="userName">Nome Completo *</Label>
              <Input
                id="userName"
                value={formData.userName}
                onChange={(e) => updateFormData("userName", e.target.value)}
                placeholder="Seu nome completo"
                className={errors.userName ? "border-red-500" : ""}
              />
              {errors.userName && <p className="text-sm text-red-600 mt-1">{errors.userName}</p>}
            </div>

            <div>
              <Label htmlFor="userEmail">E-mail *</Label>
              <Input
                id="userEmail"
                type="email"
                value={formData.userEmail}
                onChange={(e) => updateFormData("userEmail", e.target.value)}
                placeholder="seu@email.com"
                className={errors.userEmail ? "border-red-500" : ""}
              />
              {errors.userEmail && <p className="text-sm text-red-600 mt-1">{errors.userEmail}</p>}
            </div>

            <div>
              <Label htmlFor="userPhone">Telefone *</Label>
              <Input
                id="userPhone"
                value={formData.userPhone}
                onChange={(e) => updateFormData("userPhone", e.target.value)}
                placeholder="(11) 99999-9999"
                className={errors.userPhone ? "border-red-500" : ""}
              />
              {errors.userPhone && <p className="text-sm text-red-600 mt-1">{errors.userPhone}</p>}
            </div>

            <div>
              <Label htmlFor="userPassword">Senha *</Label>
              <Input
                id="userPassword"
                type="password"
                value={formData.userPassword}
                onChange={(e) => updateFormData("userPassword", e.target.value)}
                placeholder="Mínimo 6 caracteres"
                className={errors.userPassword ? "border-red-500" : ""}
              />
              {errors.userPassword && <p className="text-sm text-red-600 mt-1">{errors.userPassword}</p>}
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="serviceName">Nome do Serviço *</Label>
              <Input
                id="serviceName"
                value={formData.serviceName}
                onChange={(e) => updateFormData("serviceName", e.target.value)}
                placeholder="Ex: Corte de Cabelo"
                className={errors.serviceName ? "border-red-500" : ""}
              />
              {errors.serviceName && <p className="text-sm text-red-600 mt-1">{errors.serviceName}</p>}
            </div>

            <div>
              <Label htmlFor="serviceDescription">Descrição do Serviço *</Label>
              <Textarea
                id="serviceDescription"
                value={formData.serviceDescription}
                onChange={(e) => updateFormData("serviceDescription", e.target.value)}
                placeholder="Descreva o serviço oferecido..."
                className={errors.serviceDescription ? "border-red-500" : ""}
              />
              {errors.serviceDescription && <p className="text-sm text-red-600 mt-1">{errors.serviceDescription}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="servicePrice">Preço (R$) *</Label>
                <Input
                  id="servicePrice"
                  type="number"
                  step="0.01"
                  value={formData.servicePrice}
                  onChange={(e) => updateFormData("servicePrice", e.target.value)}
                  placeholder="50.00"
                  className={errors.servicePrice ? "border-red-500" : ""}
                />
                {errors.servicePrice && <p className="text-sm text-red-600 mt-1">{errors.servicePrice}</p>}
              </div>

              <div>
                <Label htmlFor="serviceDuration">Duração (min) *</Label>
                <Input
                  id="serviceDuration"
                  type="number"
                  value={formData.serviceDuration}
                  onChange={(e) => updateFormData("serviceDuration", e.target.value)}
                  placeholder="60"
                  className={errors.serviceDuration ? "border-red-500" : ""}
                />
                {errors.serviceDuration && <p className="text-sm text-red-600 mt-1">{errors.serviceDuration}</p>}
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Bem-vindo ao Kalender! 🎉</h1>
          <p className="text-gray-600">Vamos configurar sua conta em alguns passos simples</p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            {steps.map((step) => (
              <div key={step.number} className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                    step.number < currentStep
                      ? "bg-green-500 text-white"
                      : step.number === currentStep
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {step.number < currentStep ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    React.createElement(step.icon, { className: "h-5 w-5" })
                  )}
                </div>
                <div className="text-center mt-2">
                  <p className="text-xs font-medium text-gray-900">{step.title}</p>
                  <p className="text-xs text-gray-600 hidden sm:block">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Form Card */}
        <Card className="shadow-xl border-0">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center space-x-2">
              {React.createElement(steps[currentStep - 1].icon, { className: "h-6 w-6 text-blue-600" })}
              <span>
                Etapa {currentStep}: {steps[currentStep - 1].title}
              </span>
            </CardTitle>
            <CardDescription>{steps[currentStep - 1].description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {renderStep()}

            <Separator />

            {/* Navigation */}
            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={currentStep === 1 || isLoading}
                className="flex items-center space-x-2 bg-transparent"
              >
                <ChevronLeft className="h-4 w-4" />
                <span>Voltar</span>
              </Button>

              <Button onClick={handleNext} disabled={isLoading} className="flex items-center space-x-2">
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Processando...</span>
                  </>
                ) : currentStep === totalSteps ? (
                  <>
                    <span>Finalizar</span>
                    <Check className="h-4 w-4" />
                  </>
                ) : (
                  <>
                    <span>Próximo</span>
                    <ChevronRight className="h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-gray-600">
          <p>
            Já tem uma conta?{" "}
            <a href="/login" className="text-blue-600 hover:underline">
              Fazer login
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
