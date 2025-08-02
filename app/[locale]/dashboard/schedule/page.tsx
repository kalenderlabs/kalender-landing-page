"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard/layout"
import { Calendar } from "@/components/calendar/calendar"
import type { CalendarEvent, Professional } from "@/lib/calendar-utils"
import { useTranslation } from "@/hooks/useTranslation"

export default function SchedulePage() {
  const { t } = useTranslation()

  // Mock data - in production this would come from API
  const [professionals] = useState<Professional[]>([
    {
      id: "1",
      name: "Ana Costa",
      email: "ana@exemplo.com",
      phone: "(11) 99999-1111",
      specialties: ["Corte", "Escova", "Coloração"],
      color: "#3B82F6",
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
    {
      id: "3",
      name: "Beatriz Souza",
      email: "beatriz@exemplo.com",
      phone: "(11) 99999-3333",
      specialties: ["Manicure", "Pedicure", "Nail Art"],
      color: "#F59E0B",
      workingHours: {
        monday: { start: "08:00", end: "17:00", available: true },
        tuesday: { start: "08:00", end: "17:00", available: true },
        wednesday: { start: "08:00", end: "17:00", available: true },
        thursday: { start: "08:00", end: "17:00", available: true },
        friday: { start: "08:00", end: "17:00", available: true },
        saturday: { start: "08:00", end: "15:00", available: true },
        sunday: { start: "00:00", end: "00:00", available: false },
      },
    },
  ])

  const [events, setEvents] = useState<CalendarEvent[]>([
    {
      id: "1",
      title: "Maria Silva - Corte + Escova",
      start: new Date(2024, 0, 15, 9, 0),
      end: new Date(2024, 0, 15, 10, 30),
      clientName: "Maria Silva",
      clientPhone: "(11) 99999-0001",
      serviceName: "Corte + Escova",
      servicePrice: 80.0,
      professionalId: "1",
      professionalName: "Ana Costa",
      status: "confirmed",
      notes: "Cliente prefere corte mais curto",
    },
    {
      id: "2",
      title: "João Santos - Corte Masculino",
      start: new Date(2024, 0, 15, 10, 30),
      end: new Date(2024, 0, 15, 11, 15),
      clientName: "João Santos",
      clientPhone: "(11) 99999-0002",
      serviceName: "Corte Masculino",
      servicePrice: 35.0,
      professionalId: "2",
      professionalName: "Carlos Lima",
      status: "confirmed",
    },
    {
      id: "3",
      title: "Fernanda Oliveira - Manicure + Pedicure",
      start: new Date(2024, 0, 15, 14, 0),
      end: new Date(2024, 0, 15, 16, 0),
      clientName: "Fernanda Oliveira",
      clientPhone: "(11) 99999-0003",
      serviceName: "Manicure + Pedicure",
      servicePrice: 60.0,
      professionalId: "3",
      professionalName: "Beatriz Souza",
      status: "pending",
    },
    {
      id: "4",
      title: "Pedro Costa - Barba + Bigode",
      start: new Date(2024, 0, 16, 16, 0),
      end: new Date(2024, 0, 16, 16, 30),
      clientName: "Pedro Costa",
      serviceName: "Barba + Bigode",
      servicePrice: 25.0,
      professionalId: "2",
      professionalName: "Carlos Lima",
      status: "confirmed",
    },
  ])

  const handleEventCreate = (eventData: Omit<CalendarEvent, "id">) => {
    const newEvent: CalendarEvent = {
      ...eventData,
      id: Date.now().toString(),
    }
    setEvents((prev) => [...prev, newEvent])
  }

  const handleEventUpdate = (updatedEvent: CalendarEvent) => {
    setEvents((prev) => prev.map((event) => (event.id === updatedEvent.id ? updatedEvent : event)))
  }

  const handleEventDelete = (eventId: string) => {
    setEvents((prev) => prev.filter((event) => event.id !== eventId))
  }

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{t("sidebar.schedule")}</h1>
            <p className="text-gray-600">Visualize e gerencie todos os agendamentos do seu estabelecimento</p>
          </div>

          <Calendar
            events={events}
            professionals={professionals}
            onEventCreate={handleEventCreate}
            onEventUpdate={handleEventUpdate}
            onEventDelete={handleEventDelete}
          />
        </div>
      </div>
    </DashboardLayout>
  )
}
