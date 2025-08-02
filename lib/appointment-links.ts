export interface CustomAppointmentLink {
  id: string
  name: string
  slug: string
  description?: string
  professionalId?: string
  serviceIds: string[]
  duration: number
  price?: number
  isActive: boolean
  createdAt: Date
  expiresAt?: Date
  customizations: {
    backgroundColor?: string
    primaryColor?: string
    logo?: string
    welcomeMessage?: string
    thankYouMessage?: string
  }
  restrictions?: {
    maxAdvanceDays?: number
    minAdvanceHours?: number
    allowedDays?: string[]
    allowedTimeSlots?: string[]
  }
}

export interface Service {
  id: string
  name: string
  description?: string
  duration: number
  price: number
  category: string
}

export function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim()
}

export function generateUniqueId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}

export function isLinkActive(link: CustomAppointmentLink): boolean {
  if (!link.isActive) return false
  if (link.expiresAt && new Date() > link.expiresAt) return false
  return true
}

export function getAvailableTimeSlots(
  date: Date,
  professional: any,
  existingEvents: any[],
  restrictions?: CustomAppointmentLink["restrictions"],
): string[] {
  const dayName = date.toLocaleDateString("en-US", { weekday: "lowercase" })
  const workingHours = professional.workingHours[dayName]

  if (!workingHours?.available) return []

  const slots = []
  const [startHour, startMinute] = workingHours.start.split(":").map(Number)
  const [endHour, endMinute] = workingHours.end.split(":").map(Number)

  for (let hour = startHour; hour < endHour; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      if (hour === endHour && minute >= endMinute) break

      const timeSlot = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`

      // Check restrictions
      if (restrictions?.allowedTimeSlots && !restrictions.allowedTimeSlots.includes(timeSlot)) {
        continue
      }

      // Check if slot is available (not booked)
      const slotDate = new Date(date)
      slotDate.setHours(hour, minute, 0, 0)

      const isBooked = existingEvents.some((event) => {
        return event.start <= slotDate && event.end > slotDate
      })

      if (!isBooked) {
        slots.push(timeSlot)
      }
    }
  }

  return slots
}
