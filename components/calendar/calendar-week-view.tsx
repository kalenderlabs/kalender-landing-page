"use client"

import { useMemo } from "react"
import {
  type CalendarEvent,
  type Professional,
  getWeekDays,
  isToday,
  getEventsForDay,
  formatTime,
  generateTimeSlots,
} from "@/lib/calendar-utils"

interface CalendarWeekViewProps {
  currentDate: Date
  events: CalendarEvent[]
  professionals: Professional[]
  onEventClick: (event: CalendarEvent) => void
}

export function CalendarWeekView({ currentDate, events, professionals, onEventClick }: CalendarWeekViewProps) {
  const weekDays = useMemo(() => getWeekDays(currentDate), [currentDate])
  const timeSlots = useMemo(() => generateTimeSlots(8, 20, 60), [])

  const getEventPosition = (event: CalendarEvent) => {
    const startHour = event.start.getHours()
    const startMinute = event.start.getMinutes()
    const endHour = event.end.getHours()
    const endMinute = event.end.getMinutes()

    const startPosition = (startHour - 8) * 60 + startMinute
    const duration = (endHour - startHour) * 60 + (endMinute - startMinute)

    return {
      top: `${(startPosition / 60) * 60}px`,
      height: `${(duration / 60) * 60}px`,
    }
  }

  return (
    <div className="flex flex-col h-[600px]">
      {/* Week Header */}
      <div className="flex border-b border-gray-200">
        <div className="w-20 p-2"></div>
        {weekDays.map((date, index) => {
          const isTodayDate = isToday(date)
          return (
            <div
              key={index}
              className={`
                flex-1 p-2 text-center border-l border-gray-200
                ${isTodayDate ? "bg-primary/5" : ""}
              `}
            >
              <div className="text-sm text-gray-600">{date.toLocaleDateString("pt-BR", { weekday: "short" })}</div>
              <div
                className={`
                text-lg font-semibold
                ${isTodayDate ? "text-primary" : "text-gray-900"}
              `}
              >
                {date.getDate()}
              </div>
            </div>
          )
        })}
      </div>

      {/* Time Grid */}
      <div className="flex-1 overflow-y-auto">
        <div className="flex">
          {/* Time Labels */}
          <div className="w-20">
            {timeSlots.map((time) => (
              <div key={time} className="h-[60px] p-2 text-xs text-gray-600 border-b border-gray-100">
                {time}
              </div>
            ))}
          </div>

          {/* Days Grid */}
          {weekDays.map((date, dayIndex) => {
            const dayEvents = getEventsForDay(events, date)
            const isTodayDate = isToday(date)

            return (
              <div
                key={dayIndex}
                className={`
                  flex-1 relative border-l border-gray-200
                  ${isTodayDate ? "bg-primary/5" : ""}
                `}
              >
                {/* Time Slots */}
                {timeSlots.map((time) => (
                  <div key={time} className="h-[60px] border-b border-gray-100 hover:bg-gray-50 cursor-pointer" />
                ))}

                {/* Events */}
                {dayEvents.map((event) => {
                  const professional = professionals.find((p) => p.id === event.professionalId)
                  const position = getEventPosition(event)

                  return (
                    <div
                      key={event.id}
                      className="absolute left-1 right-1 p-1 rounded cursor-pointer hover:opacity-80 transition-opacity z-10"
                      style={{
                        ...position,
                        backgroundColor: professional?.color || "#6B7280",
                        color: "white",
                      }}
                      onClick={() => onEventClick(event)}
                    >
                      <div className="text-xs font-medium truncate">{event.clientName}</div>
                      <div className="text-xs truncate opacity-90">{event.serviceName}</div>
                      <div className="text-xs opacity-75">
                        {formatTime(event.start)} - {formatTime(event.end)}
                      </div>
                    </div>
                  )
                })}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
