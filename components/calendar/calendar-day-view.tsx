"use client"

import { useMemo } from "react"
import { Badge } from "@/components/ui/badge"
import {
  type CalendarEvent,
  type Professional,
  isToday,
  getEventsForDay,
  formatTime,
  generateTimeSlots,
  getStatusColor,
} from "@/lib/calendar-utils"

interface CalendarDayViewProps {
  currentDate: Date
  events: CalendarEvent[]
  professionals: Professional[]
  onEventClick: (event: CalendarEvent) => void
}

export function CalendarDayView({ currentDate, events, professionals, onEventClick }: CalendarDayViewProps) {
  const timeSlots = useMemo(() => generateTimeSlots(8, 20, 30), [])
  const dayEvents = useMemo(() => getEventsForDay(events, currentDate), [events, currentDate])
  const isTodayDate = isToday(currentDate)

  const getEventPosition = (event: CalendarEvent) => {
    const startHour = event.start.getHours()
    const startMinute = event.start.getMinutes()
    const endHour = event.end.getHours()
    const endMinute = event.end.getMinutes()

    const startPosition = (startHour - 8) * 60 + startMinute
    const duration = (endHour - startHour) * 60 + (endMinute - startMinute)

    return {
      top: `${(startPosition / 30) * 30}px`,
      height: `${Math.max((duration / 30) * 30, 30)}px`,
    }
  }

  return (
    <div className="flex h-[700px]">
      {/* Time Labels */}
      <div className="w-20 border-r border-gray-200">
        <div className="h-16 border-b border-gray-200 p-2">
          <div
            className={`
            text-sm font-medium
            ${isTodayDate ? "text-primary" : "text-gray-900"}
          `}
          >
            {currentDate.toLocaleDateString("pt-BR", {
              weekday: "long",
              day: "numeric",
              month: "long",
            })}
          </div>
        </div>

        <div className="overflow-y-auto">
          {timeSlots.map((time) => (
            <div key={time} className="h-[30px] p-1 text-xs text-gray-600 border-b border-gray-100">
              {time}
            </div>
          ))}
        </div>
      </div>

      {/* Day Content */}
      <div className="flex-1 relative">
        {/* Header */}
        <div
          className={`
          h-16 border-b border-gray-200 p-4 flex items-center justify-between
          ${isTodayDate ? "bg-primary/5" : ""}
        `}
        >
          <div>
            <Badge variant="outline">{dayEvents.length} agendamentos</Badge>
          </div>
        </div>

        {/* Time Grid */}
        <div className="relative overflow-y-auto">
          {timeSlots.map((time) => (
            <div key={time} className="h-[30px] border-b border-gray-100 hover:bg-gray-50 cursor-pointer" />
          ))}

          {/* Events */}
          {dayEvents.map((event) => {
            const professional = professionals.find((p) => p.id === event.professionalId)
            const position = getEventPosition(event)

            return (
              <div
                key={event.id}
                className="absolute left-2 right-2 p-2 rounded-lg cursor-pointer hover:shadow-md transition-shadow z-10 border-l-4"
                style={{
                  ...position,
                  backgroundColor: `${professional?.color}20` || "#6B728020",
                  borderLeftColor: professional?.color || "#6B7280",
                }}
                onClick={() => onEventClick(event)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-gray-900 truncate">{event.clientName}</div>
                    <div className="text-sm text-gray-600 truncate">{event.serviceName}</div>
                    <div className="text-xs text-gray-500">
                      {formatTime(event.start)} - {formatTime(event.end)}
                    </div>
                    <div className="text-xs text-gray-500">{professional?.name}</div>
                  </div>
                  <Badge className={`ml-2 ${getStatusColor(event.status)} text-white text-xs`}>{event.status}</Badge>
                </div>

                {event.notes && <div className="text-xs text-gray-600 mt-1 truncate">{event.notes}</div>}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
