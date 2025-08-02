"use client"

import { useState, useMemo } from "react"
import { ChevronLeft, ChevronRight, Users, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarMonthView } from "./calendar-month-view"
import { CalendarWeekView } from "./calendar-week-view"
import { CalendarDayView } from "./calendar-day-view"
import { EventDetailsModal } from "./event-details-modal"
import { NewEventModal } from "./new-event-modal"
import {
  type CalendarEvent,
  type Professional,
  type CalendarView,
  CALENDAR_VIEWS,
  formatDate,
} from "@/lib/calendar-utils"
import { useTranslation } from "@/hooks/useTranslation"

interface CalendarProps {
  events: CalendarEvent[]
  professionals: Professional[]
  onEventCreate?: (event: Omit<CalendarEvent, "id">) => void
  onEventUpdate?: (event: CalendarEvent) => void
  onEventDelete?: (eventId: string) => void
}

export function Calendar({ events, professionals, onEventCreate, onEventUpdate, onEventDelete }: CalendarProps) {
  const { t } = useTranslation()
  const [currentDate, setCurrentDate] = useState(new Date())
  const [view, setView] = useState<CalendarView>(CALENDAR_VIEWS.MONTH)
  const [selectedProfessional, setSelectedProfessional] = useState<string>("all")
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null)
  const [showEventDetails, setShowEventDetails] = useState(false)
  const [showNewEvent, setShowNewEvent] = useState(false)

  const filteredEvents = useMemo(() => {
    if (selectedProfessional === "all") {
      return events
    }
    return events.filter((event) => event.professionalId === selectedProfessional)
  }, [events, selectedProfessional])

  const selectedProfessionalData = useMemo(() => {
    return professionals.find((p) => p.id === selectedProfessional)
  }, [professionals, selectedProfessional])

  const navigateDate = (direction: "prev" | "next") => {
    const newDate = new Date(currentDate)

    switch (view) {
      case CALENDAR_VIEWS.MONTH:
        newDate.setMonth(newDate.getMonth() + (direction === "next" ? 1 : -1))
        break
      case CALENDAR_VIEWS.WEEK:
        newDate.setDate(newDate.getDate() + (direction === "next" ? 7 : -7))
        break
      case CALENDAR_VIEWS.DAY:
        newDate.setDate(newDate.getDate() + (direction === "next" ? 1 : -1))
        break
    }

    setCurrentDate(newDate)
  }

  const getDateRangeText = () => {
    switch (view) {
      case CALENDAR_VIEWS.MONTH:
        return currentDate.toLocaleDateString("pt-BR", { month: "long", year: "numeric" })
      case CALENDAR_VIEWS.WEEK:
        const weekStart = new Date(currentDate)
        weekStart.setDate(currentDate.getDate() - currentDate.getDay())
        const weekEnd = new Date(weekStart)
        weekEnd.setDate(weekStart.getDate() + 6)
        return `${formatDate(weekStart)} - ${formatDate(weekEnd)}`
      case CALENDAR_VIEWS.DAY:
        return formatDate(currentDate)
      default:
        return ""
    }
  }

  const handleEventClick = (event: CalendarEvent) => {
    setSelectedEvent(event)
    setShowEventDetails(true)
  }

  const handleNewEvent = () => {
    setShowNewEvent(true)
  }

  const handleEventCreate = (eventData: Omit<CalendarEvent, "id">) => {
    onEventCreate?.(eventData)
    setShowNewEvent(false)
  }

  const handleEventUpdate = (event: CalendarEvent) => {
    onEventUpdate?.(event)
    setShowEventDetails(false)
  }

  const handleEventDelete = (eventId: string) => {
    onEventDelete?.(eventId)
    setShowEventDetails(false)
  }

  return (
    <div className="space-y-6">
      {/* Calendar Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={() => navigateDate("prev")}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={() => setCurrentDate(new Date())}>
              Hoje
            </Button>
            <Button variant="outline" size="sm" onClick={() => navigateDate("next")}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 capitalize">{getDateRangeText()}</h2>
        </div>

        <div className="flex items-center space-x-4">
          {/* Professional Filter */}
          <Select value={selectedProfessional} onValueChange={setSelectedProfessional}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Selecionar profissional" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4" />
                  <span>Todos os Profissionais</span>
                </div>
              </SelectItem>
              {professionals.map((professional) => (
                <SelectItem key={professional.id} value={professional.id}>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: professional.color }} />
                    <span>{professional.name}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* View Selector */}
          <Tabs value={view} onValueChange={(value) => setView(value as CalendarView)}>
            <TabsList>
              <TabsTrigger value={CALENDAR_VIEWS.MONTH}>Mês</TabsTrigger>
              <TabsTrigger value={CALENDAR_VIEWS.WEEK}>Semana</TabsTrigger>
              <TabsTrigger value={CALENDAR_VIEWS.DAY}>Dia</TabsTrigger>
            </TabsList>
          </Tabs>

          <Button onClick={handleNewEvent} className="bg-primary hover:bg-primary/90">
            <Plus className="h-4 w-4 mr-2" />
            Novo Agendamento
          </Button>
        </div>
      </div>

      {/* Professional Info */}
      {selectedProfessional !== "all" && selectedProfessionalData && (
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-4">
              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: selectedProfessionalData.color }} />
              <div>
                <h3 className="font-semibold text-gray-900">{selectedProfessionalData.name}</h3>
                <p className="text-sm text-gray-600">
                  Especialidades: {selectedProfessionalData.specialties.join(", ")}
                </p>
              </div>
              <div className="ml-auto">
                <Badge variant="outline">{filteredEvents.length} agendamentos</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Calendar Views */}
      <Card>
        <CardContent className="p-0">
          {view === CALENDAR_VIEWS.MONTH && (
            <CalendarMonthView
              currentDate={currentDate}
              events={filteredEvents}
              professionals={professionals}
              onEventClick={handleEventClick}
              onDateClick={(date) => {
                setCurrentDate(date)
                setView(CALENDAR_VIEWS.DAY)
              }}
            />
          )}

          {view === CALENDAR_VIEWS.WEEK && (
            <CalendarWeekView
              currentDate={currentDate}
              events={filteredEvents}
              professionals={professionals}
              onEventClick={handleEventClick}
            />
          )}

          {view === CALENDAR_VIEWS.DAY && (
            <CalendarDayView
              currentDate={currentDate}
              events={filteredEvents}
              professionals={professionals}
              onEventClick={handleEventClick}
            />
          )}
        </CardContent>
      </Card>

      {/* Event Details Modal */}
      {selectedEvent && (
        <EventDetailsModal
          event={selectedEvent}
          professionals={professionals}
          open={showEventDetails}
          onOpenChange={setShowEventDetails}
          onUpdate={handleEventUpdate}
          onDelete={handleEventDelete}
        />
      )}

      {/* New Event Modal */}
      <NewEventModal
        professionals={professionals}
        selectedDate={currentDate}
        open={showNewEvent}
        onOpenChange={setShowNewEvent}
        onCreate={handleEventCreate}
      />
    </div>
  )
}
