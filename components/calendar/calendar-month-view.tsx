"use client"

import { useMemo } from "react"
import {
  type CalendarEvent,
  type Professional,
  getMonthDays,
  isToday,
  getEventsForDay,
  formatTime,
  getStatusColor,
} from "@/lib/calendar-utils"

interface CalendarMonthViewProps {
  currentDate: Date
  events: CalendarEvent[]
  professionals: Professional[]
  onEventClick: (event: CalendarEvent) => void
  onDateClick: (date: Date) => void
}

export function CalendarMonthView({
  currentDate,
  events,
  professionals,
  onEventClick,
  onDateClick,
}: CalendarMonthViewProps) {
  const monthDays = useMemo(() => getMonthDays(currentDate), [currentDate])
  const currentMonth = currentDate.getMonth()

  const weekDays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"]

  return (
    <div className="p-4">
      {/* Week Headers */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekDays.map((day) => (
          <div key={day} className="p-2 text-center text-sm font-medium text-gray-600">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {monthDays.map((date, index) => {
          const dayEvents = getEventsForDay(events, date)
          const isCurrentMonth = date.getMonth() === currentMonth
          const isTodayDate = isToday(date)

          return (
            <div
              key={index}
              className={`
                min-h-[120px] p-2 border border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors
                ${!isCurrentMonth ? "bg-gray-50 text-gray-400" : "bg-white"}
                ${isTodayDate ? "ring-2 ring-primary ring-inset" : ""}
              `}
              onClick={() => onDateClick(date)}
            >
              <div
                className={`
                text-sm font-medium mb-1
                ${isTodayDate ? "text-primary font-bold" : isCurrentMonth ? "text-gray-900" : "text-gray-400"}
              `}
              >
                {date.getDate()}
              </div>

              {/* Events */}
              <div className="space-y-1">
                {dayEvents.slice(0, 3).map((event) => {
                  const professional = professionals.find((p) => p.id === event.professionalId)
                  return (
                    <div
                      key={event.id}
                      className={`
                        text-xs p-1 rounded cursor-pointer hover:opacity-80 transition-opacity
                        ${getStatusColor(event.status)} text-white
                      `}
                      style={{ backgroundColor: professional?.color || "#6B7280" }}
                      onClick={(e) => {
                        e.stopPropagation()
                        onEventClick(event)
                      }}
                    >
                      <div className="font-medium truncate">
                        {formatTime(event.start)} - {event.clientName}
                      </div>
                      <div className="truncate opacity-90">{event.serviceName}</div>
                    </div>
                  )
                })}

                {dayEvents.length > 3 && (
                  <div className="text-xs text-gray-600 font-medium">+{dayEvents.length - 3} mais</div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
