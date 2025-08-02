export interface CalendarEvent {
  id: string
  title: string
  start: Date
  end: Date
  clientName: string
  clientPhone?: string
  serviceName: string
  servicePrice: number
  professionalId: string
  professionalName: string
  status: "confirmed" | "pending" | "cancelled" | "completed"
  notes?: string
  color?: string
}

export interface Professional {
  id: string
  name: string
  email: string
  phone: string
  specialties: string[]
  color: string
  avatar?: string
  workingHours: {
    [key: string]: { start: string; end: string; available: boolean }
  }
}

export const CALENDAR_VIEWS = {
  MONTH: "month",
  WEEK: "week",
  DAY: "day",
  AGENDA: "agenda",
} as const

export type CalendarView = (typeof CALENDAR_VIEWS)[keyof typeof CALENDAR_VIEWS]

export function formatTime(date: Date): string {
  return date.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  })
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  })
}

export function getWeekDays(date: Date): Date[] {
  const week = []
  const startOfWeek = new Date(date)
  const day = startOfWeek.getDay()
  const diff = startOfWeek.getDate() - day

  startOfWeek.setDate(diff)

  for (let i = 0; i < 7; i++) {
    const day = new Date(startOfWeek)
    day.setDate(startOfWeek.getDate() + i)
    week.push(day)
  }

  return week
}

export function getMonthDays(date: Date): Date[] {
  const year = date.getFullYear()
  const month = date.getMonth()

  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)

  const startDate = new Date(firstDay)
  startDate.setDate(startDate.getDate() - firstDay.getDay())

  const endDate = new Date(lastDay)
  endDate.setDate(endDate.getDate() + (6 - lastDay.getDay()))

  const days = []
  const currentDate = new Date(startDate)

  while (currentDate <= endDate) {
    days.push(new Date(currentDate))
    currentDate.setDate(currentDate.getDate() + 1)
  }

  return days
}

export function isSameDay(date1: Date, date2: Date): boolean {
  return date1.toDateString() === date2.toDateString()
}

export function isToday(date: Date): boolean {
  return isSameDay(date, new Date())
}

export function getEventsForDay(events: CalendarEvent[], date: Date): CalendarEvent[] {
  return events.filter((event) => isSameDay(event.start, date))
}

export function getStatusColor(status: CalendarEvent["status"]): string {
  switch (status) {
    case "confirmed":
      return "bg-green-500"
    case "pending":
      return "bg-yellow-500"
    case "cancelled":
      return "bg-red-500"
    case "completed":
      return "bg-blue-500"
    default:
      return "bg-gray-500"
  }
}

export function generateTimeSlots(startHour = 8, endHour = 18, interval = 30): string[] {
  const slots = []
  for (let hour = startHour; hour < endHour; hour++) {
    for (let minute = 0; minute < 60; minute += interval) {
      const time = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`
      slots.push(time)
    }
  }
  return slots
}

/* ------------------------------------------------------------------
 * Mock data for development / preview
 * -----------------------------------------------------------------*/

/**
 * Professionals used for local previews and Storybook stories.
 * These can be replaced or extended in real environments.
 */
export const mockProfessionals: Professional[] = [
  {
    id: "p1",
    name: "Ana Costa",
    email: "ana.costa@example.com",
    phone: "+55 11 91234-5678",
    specialties: ["Cabelo", "Coloração"],
    color: "#f87171", // Tailwind rose-400
    avatar: "/placeholder.svg?height=64&width=64",
    workingHours: {
      monday: { start: "09:00", end: "18:00", available: true },
      tuesday: { start: "09:00", end: "18:00", available: true },
      wednesday: { start: "09:00", end: "18:00", available: true },
      thursday: { start: "09:00", end: "18:00", available: true },
      friday: { start: "09:00", end: "18:00", available: true },
      saturday: { start: "10:00", end: "16:00", available: true },
      sunday: { start: "00:00", end: "00:00", available: false },
    },
  },
  {
    id: "p2",
    name: "Bruno Lima",
    email: "bruno.lima@example.com",
    phone: "+55 21 99876-5432",
    specialties: ["Barba", "Corte Masculino"],
    color: "#60a5fa", // Tailwind blue-400
    avatar: "/placeholder.svg?height=64&width=64",
    workingHours: {
      monday: { start: "10:00", end: "19:00", available: true },
      tuesday: { start: "10:00", end: "19:00", available: true },
      wednesday: { start: "10:00", end: "19:00", available: true },
      thursday: { start: "10:00", end: "19:00", available: true },
      friday: { start: "10:00", end: "19:00", available: true },
      saturday: { start: "09:00", end: "15:00", available: true },
      sunday: { start: "00:00", end: "00:00", available: false },
    },
  },
]

/**
 * Calendar events used for local previews and Storybook stories.
 * Feel free to extend or replace them with real data in production.
 */
export const mockEvents: CalendarEvent[] = [
  {
    id: "e1",
    title: "Corte de Cabelo",
    start: new Date(),
    end: new Date(Date.now() + 60 * 60 * 1000), // +1 h
    clientName: "João Silva",
    clientPhone: "+55 11 90000-0000",
    serviceName: "Corte",
    servicePrice: 60,
    professionalId: "p1",
    professionalName: "Ana Costa",
    status: "confirmed",
    notes: "Cliente prefere corte degradê.",
    color: "#f87171",
  },
  {
    id: "e2",
    title: "Barba Completa",
    start: new Date(Date.now() + 2 * 60 * 60 * 1000), // +2 h
    end: new Date(Date.now() + 3 * 60 * 60 * 1000), // +3 h
    clientName: "Carlos Pereira",
    clientPhone: "+55 21 95555-5555",
    serviceName: "Barba",
    servicePrice: 45,
    professionalId: "p2",
    professionalName: "Bruno Lima",
    status: "pending",
    notes: "",
    color: "#60a5fa",
  },
]
