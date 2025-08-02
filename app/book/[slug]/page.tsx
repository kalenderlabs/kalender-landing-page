"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Calendar, Clock, User, Phone, Mail, ArrowLeft, Check, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Alert, AlertDescription } from "@/components/ui/alert"
import type { CustomAppointmentLink, Service } from "@/lib/appointment-links"
import type { Professional, CalendarEvent } from "@/lib/calendar-utils"
import { getAvailableTimeSlots, isLinkActive } from "@/lib/appointment-links"

export default function BookingPage() {
  const params = useParams()
  const router = useRouter()
  const slug = params.slug as string

  const [step, setStep] = useState(1)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState<string>("")
  const [availableSlots, setAvailableSlots] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Mock data - in production this would come from API
  const [appointmentLink, setAppointmentLink] = useState<CustomAppointmentLink | null>(null)
  const [professional, setProfessional] = useState<Professional | null>(null)
  const [services, setServices] = useState<Service[]>([])
  const [existingEvents, setExistingEvents] = useState<CalendarEvent[]>([])

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    notes: "",
  })

  // Mock data initialization
  useEffect(() => {
    const mockLinks: CustomAppointmentLink[] = [
      {
        id: "1",
        name: "Corte Rápido",
        slug: "corte-rapido",
        description: "Agendamento rápido para corte de cabelo masculino",
        professionalId: "2",
        serviceIds: ["1"],
        duration: 45,
        price: 35,
        isActive: true,
        createdAt: new Date(),
        customizations: {
          backgroundColor: "#f8fafc",
          primaryColor: "#3b82f6",
          welcomeMessage: "Agende seu corte de cabelo conosco! Atendimento rápido e profissional.",
          thankYouMessage: "Obrigado por escolher nossos serviços! Aguardamos você.",
        },
      },
      {
        id: "2",
        name: "Pacote Completo Feminino",
        slug: "pacote-completo",
        description: "Corte + Escova + Hidratação para um visual completo",
        professionalId: "1",
        serviceIds: ["1", "2", "3"],
        duration: 120,
        price: 150,
        isActive: true,
        createdAt: new Date(),
        customizations: {
          backgroundColor: "#fef7ff",
          primaryColor: "#a855f7",
          welcomeMessage: "Transforme seu visual com nosso pacote completo! Você merece se sentir linda.",
          thankYouMessage: "Mal podemos esperar para cuidar de você! Até breve.",
        },
      },
    ]

    const mockProfessionals: Professional[] = [
      {
        id: "1",
        name: "Ana Costa",
        email: "ana@exemplo.com",
        phone: "(11) 99999-1111",
        specialties: ["Corte", "Escova", "Coloração"],
        color: "#3B82F6",
        avatar: "/placeholder.svg?height=100&width=100",
        workingHours: {
          monday: { start: "09:00", end: "18:00", available: true },
          tuesday: { start: "09:00", end: "18:00", available: true },
          wednesday: { start: "09:00", end: "18:00", available: true },
          thursday: { start: "09:00", end: "18:00", available: true },
          friday: { start: "09:00", end: "18:00", available: true },
          saturday: { start: "09:00", end: "16:00", available: true },
          sunday: { start: "00:00", end: "00:00", available: false },
        },
      },
      {
        id: "2",
        name: "Carlos Lima",
        email: "carlos@exemplo.com",
        phone: "(11) 99999-2222",
        specialties: ["Corte Masculino", "Barba", "Bigode"],
        color: "#10B981",
        avatar: "/placeholder.svg?height=100&width=100",
        workingHours: {
          monday: { start: "10:00", end: "19:00", available: true },
          tuesday: { start: "10:00", end: "19:00", available: true },
          wednesday: { start: "10:00", end: "19:00", available: true },
          thursday: { start: "10:00", end: "19:00", available: true },
          friday: { start: "10:00", end: "19:00", available: true },
          saturday: { start: "09:00", end: "17:00", available: true },
          sunday: { start: "00:00", end: "00:00", available: false },
        },
      },
    ]

    const mockServices: Service[] = [
      {
        id: "1",
        name: "Corte de Cabelo",
        description: "Corte personalizado",
        duration: 45,
        price: 35,
        category: "Cabelo",
      },
      { id: "2", name: "Escova", description: "Escova modeladora", duration: 30, price: 25, category: "Cabelo" },
      {
        id: "3",
        name: "Hidratação",
        description: "Tratamento hidratante",
        duration: 45,
        price: 40,
        category: "Tratamento",
      },
    ]

    // Find the appointment link
    const link = mockLinks.find((l) => l.slug === slug)
    if (link && isLinkActive(link)) {
      setAppointmentLink(link)

      // Find professional
      if (link.professionalId) {
        const prof = mockProfessionals.find((p) => p.id === link.professionalId)
        setProfessional(prof || null)
      }

      // Set services
      setServices(mockServices)
    }

    setIsLoading(false)
  }, [slug])

  // Update available slots when date changes
  useEffect(() => {
    if (selectedDate && professional) {
      const slots = getAvailableTimeSlots(selectedDate, professional, existingEvents, appointmentLink?.restrictions)
      setAvailableSlots(slots)
    }
  }, [selectedDate, professional, existingEvents, appointmentLink])

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date)
    setSelectedTime("")
    setStep(2)
  }

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time)
    setStep(3)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setStep(4)
    setIsSubmitting(false)
  }

  const getNextAvailableDates = (): Date[] => {
    const dates = []
    const today = new Date()

    for (let i = 0; i < 14; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() + i)

      // Skip if professional doesn't work on this day
      if (professional) {
        const dayName = date.toLocaleDateString("en-US", { weekday: "lowercase" })
        const workingHours = professional.workingHours[dayName]
        if (workingHours?.available) {
          dates.push(date)
        }
      } else {
        dates.push(date)
      }
    }

    return dates.slice(0, 10) // Show next 10 available dates
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!appointmentLink) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="p-8 text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Link não encontrado</h1>
            <p className="text-gray-600 mb-6">
              O link de agendamento que você está tentando acessar não existe ou foi desativado.
            </p>
            <Button onClick={() => router.push("/")}>Voltar ao início</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const customizations = appointmentLink.customizations

  return (
    <div className="min-h-screen py-8 px-4" style={{ backgroundColor: customizations.backgroundColor || "#f8fafc" }}>
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <img src="/kalender-logo.png" alt="Kalender" className="h-12 w-12 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{appointmentLink.name}</h1>
          {appointmentLink.description && <p className="text-gray-600 text-lg">{appointmentLink.description}</p>}
          {customizations.welcomeMessage && (
            <Alert className="mt-4" style={{ borderColor: customizations.primaryColor + "40" }}>
              <AlertDescription className="text-center">{customizations.welcomeMessage}</AlertDescription>
            </Alert>
          )}
        </div>

        {/* Professional Info */}
        {professional && (
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={professional.avatar || "/placeholder.svg"} />
                  <AvatarFallback style={{ backgroundColor: professional.color + "20", color: professional.color }}>
                    {professional.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{professional.name}</h3>
                  <p className="text-gray-600">Especialista em {professional.specialties.join(", ")}</p>
                  <div className="flex items-center space-x-1 mt-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                    <span className="text-sm text-gray-600 ml-2">4.9 (127 avaliações)</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Service Info */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Detalhes do Serviço</h3>
                <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{appointmentLink.duration} minutos</span>
                  </div>
                  {appointmentLink.price && (
                    <div className="flex items-center space-x-1">
                      <span>R$ {appointmentLink.price}</span>
                    </div>
                  )}
                </div>
              </div>
              <Badge
                style={{ backgroundColor: customizations.primaryColor + "20", color: customizations.primaryColor }}
              >
                Online
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Booking Steps */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <div className="flex items-center space-x-2">
                {[1, 2, 3].map((stepNumber) => (
                  <div key={stepNumber} className="flex items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                        step >= stepNumber ? "text-white" : "bg-gray-200 text-gray-600"
                      }`}
                      style={{
                        backgroundColor: step >= stepNumber ? customizations.primaryColor : undefined,
                      }}
                    >
                      {step > stepNumber ? <Check className="h-4 w-4" /> : stepNumber}
                    </div>
                    {stepNumber < 3 && <div className="w-8 h-0.5 bg-gray-200 mx-2" />}
                  </div>
                ))}
              </div>
              <span className="ml-4">
                {step === 1 && "Escolha a data"}
                {step === 2 && "Selecione o horário"}
                {step === 3 && "Seus dados"}
                {step === 4 && "Confirmado!"}
              </span>
            </CardTitle>
          </CardHeader>

          <CardContent className="p-6">
            {/* Step 1: Date Selection */}
            {step === 1 && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Escolha uma data disponível:</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {getNextAvailableDates().map((date) => (
                    <Button
                      key={date.toISOString()}
                      variant="outline"
                      className="p-4 h-auto flex flex-col items-center hover:border-primary"
                      onClick={() => handleDateSelect(date)}
                    >
                      <div className="text-sm text-gray-600">
                        {date.toLocaleDateString("pt-BR", { weekday: "short" })}
                      </div>
                      <div className="text-lg font-semibold">
                        {date.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" })}
                      </div>
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Time Selection */}
            {step === 2 && selectedDate && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">
                    Horários disponíveis para{" "}
                    {selectedDate.toLocaleDateString("pt-BR", {
                      weekday: "long",
                      day: "2-digit",
                      month: "long",
                    })}
                    :
                  </h3>
                  <Button variant="ghost" size="sm" onClick={() => setStep(1)}>
                    <ArrowLeft className="h-4 w-4 mr-1" />
                    Voltar
                  </Button>
                </div>

                {availableSlots.length > 0 ? (
                  <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                    {availableSlots.map((time) => (
                      <Button
                        key={time}
                        variant="outline"
                        className="p-3 hover:border-primary"
                        onClick={() => handleTimeSelect(time)}
                      >
                        {time}
                      </Button>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Nenhum horário disponível para esta data.</p>
                    <Button variant="ghost" onClick={() => setStep(1)} className="mt-2">
                      Escolher outra data
                    </Button>
                  </div>
                )}
              </div>
            )}

            {/* Step 3: Contact Form */}
            {step === 3 && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Seus dados para contato:</h3>
                  <Button variant="ghost" size="sm" onClick={() => setStep(2)}>
                    <ArrowLeft className="h-4 w-4 mr-1" />
                    Voltar
                  </Button>
                </div>

                {/* Booking Summary */}
                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                  <h4 className="font-semibold mb-2">Resumo do agendamento:</h4>
                  <div className="space-y-1 text-sm text-gray-600">
                    <div>
                      📅{" "}
                      {selectedDate?.toLocaleDateString("pt-BR", {
                        weekday: "long",
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })}
                    </div>
                    <div>🕐 {selectedTime}</div>
                    <div>💼 {appointmentLink.name}</div>
                    {professional && <div>👤 {professional.name}</div>}
                    {appointmentLink.price && <div>💰 R$ {appointmentLink.price}</div>}
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Nome completo *</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="phone">Telefone *</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                        className="pl-10"
                        placeholder="(11) 99999-9999"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">E-mail</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                        className="pl-10"
                        placeholder="seu@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="notes">Observações</Label>
                    <Textarea
                      id="notes"
                      value={formData.notes}
                      onChange={(e) => setFormData((prev) => ({ ...prev, notes: e.target.value }))}
                      placeholder="Alguma observação especial..."
                      rows={3}
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isSubmitting}
                    style={{ backgroundColor: customizations.primaryColor }}
                  >
                    {isSubmitting ? "Confirmando..." : "Confirmar Agendamento"}
                  </Button>
                </form>
              </div>
            )}

            {/* Step 4: Confirmation */}
            {step === 4 && (
              <div className="text-center py-8">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: customizations.primaryColor + "20" }}
                >
                  <Check className="h-8 w-8" style={{ color: customizations.primaryColor }} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Agendamento Confirmado!</h3>
                <p className="text-gray-600 mb-6">
                  {customizations.thankYouMessage || "Seu agendamento foi confirmado com sucesso!"}
                </p>

                <div className="bg-gray-50 p-6 rounded-lg mb-6 text-left">
                  <h4 className="font-semibold mb-4">Detalhes do seu agendamento:</h4>
                  <div className="space-y-2 text-sm">
                    <div>
                      <strong>Data:</strong>{" "}
                      {selectedDate?.toLocaleDateString("pt-BR", {
                        weekday: "long",
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })}
                    </div>
                    <div>
                      <strong>Horário:</strong> {selectedTime}
                    </div>
                    <div>
                      <strong>Serviço:</strong> {appointmentLink.name}
                    </div>
                    {professional && (
                      <div>
                        <strong>Profissional:</strong> {professional.name}
                      </div>
                    )}
                    <div>
                      <strong>Cliente:</strong> {formData.name}
                    </div>
                    <div>
                      <strong>Telefone:</strong> {formData.phone}
                    </div>
                    {formData.email && (
                      <div>
                        <strong>E-mail:</strong> {formData.email}
                      </div>
                    )}
                    {appointmentLink.price && (
                      <div>
                        <strong>Valor:</strong> R$ {appointmentLink.price}
                      </div>
                    )}
                  </div>
                </div>

                <Alert>
                  <AlertDescription>
                    <strong>Importante:</strong> Você receberá uma confirmação por WhatsApp em breve. Se precisar
                    remarcar ou cancelar, entre em contato conosco.
                  </AlertDescription>
                </Alert>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
