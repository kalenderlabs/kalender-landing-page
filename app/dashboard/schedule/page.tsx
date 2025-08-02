"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Clock, User, Phone, Mail, Plus, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { DashboardLayout } from "@/components/dashboard/layout"

interface Professional {
  id: string
  name: string
  avatar: string
  specialties: string[]
  department?: string
}

interface AppointmentStatus {
  status: "confirmed" | "pending" | "cancelled" | "completed" | "no-show"
  statusHistory: {
    status: string
    timestamp: Date
    userId: string
    notes?: string
  }[]
}

interface Appointment {
  id: string
  clientName: string
  clientPhone: string
  clientEmail: string
  service: string
  professionalId: string
  date: string
  time: string
  duration: number
  price: number
  statusInfo: AppointmentStatus
  unitId: string // Adicionar referência à unidade
  internalNotes: string[] // Notas internas da equipe
  category: string
}

export default function SchedulePage() {
  const [currentDate, setCurrentDate] = useState(new Date(2024, 0, 18))
  const [selectedDate, setSelectedDate] = useState(new Date(2024, 0, 18))
  const [selectedProfessional, setSelectedProfessional] = useState<string>("all")
  const [selectedDepartment, setSelectedDepartment] = useState<string>("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [viewMode, setViewMode] = useState<"timeline" | "grid">("timeline")
  const [viewType, setViewType] = useState<"team" | "individual">("team")
  const [selectedIndividualProfessional, setSelectedIndividualProfessional] = useState<string>("")

  // Mock professionals data
  const professionals: Professional[] = [
    {
      id: "1",
      name: "Maria Silva",
      avatar: "/placeholder.svg?height=40&width=40",
      specialties: ["Cortes", "Coloração"],
      department: "Cabelo",
    },
    {
      id: "4",
      name: "Carla Lima",
      avatar: "/placeholder.svg?height=40&width=40",
      specialties: ["Tratamentos"],
      department: "Cabelo",
    },
    {
      id: "3",
      name: "Julia Costa",
      avatar: "/placeholder.svg?height=40&width=40",
      specialties: ["Coloração"],
      department: "Cabelo",
    },
    {
      id: "6",
      name: "João Santos",
      avatar: "/placeholder.svg?height=40&width=40",
      specialties: ["Massagem"],
      department: "Estética",
    },
    {
      id: "10",
      name: "Beatriz Costa",
      avatar: "/placeholder.svg?height=40&width=40",
      specialties: ["Manicure"],
      department: "Unhas",
    },
    {
      id: "14",
      name: "Isabela Nunes",
      avatar: "/placeholder.svg?height=40&width=40",
      specialties: ["Sobrancelhas"],
      department: "Sobrancelhas",
    },
  ]

  // Mock appointments with categories
  const appointments: Appointment[] = [
    // Maria Silva
    {
      id: "1",
      clientName: "Ana Beatriz",
      clientPhone: "(11) 99887-6543",
      clientEmail: "anabeatriz@gmail.com",
      service: "Corte + Escova",
      professionalId: "1",
      date: "2024-01-18",
      time: "08:30",
      duration: 90,
      price: 85,
      statusInfo: {
        status: "confirmed",
        statusHistory: [],
      },
      unitId: "123",
      internalNotes: [],
      category: "corte",
    },
    {
      id: "2",
      clientName: "Carla Mendes",
      clientPhone: "(11) 98765-4321",
      clientEmail: "carla.mendes@hotmail.com",
      service: "Coloração Completa",
      professionalId: "1",
      date: "2024-01-18",
      time: "10:30",
      duration: 180,
      price: 220,
      statusInfo: {
        status: "confirmed",
        statusHistory: [],
      },
      unitId: "123",
      internalNotes: [],
      category: "coloracao",
    },
    {
      id: "3",
      clientName: "Juliana Costa",
      clientPhone: "(11) 97654-3210",
      clientEmail: "ju.costa@yahoo.com",
      service: "Corte Feminino",
      professionalId: "1",
      date: "2024-01-18",
      time: "14:00",
      duration: 60,
      price: 65,
      statusInfo: {
        status: "pending",
        statusHistory: [],
      },
      unitId: "123",
      internalNotes: [],
      category: "corte",
    },
  ]

  // Adicionar função para alterar status
  const handleStatusChange = async (appointmentId: string, newStatus: string, notes?: string) => {
    // API call para alterar status
  }

  // Generate time slots from 8:00 to 18:00
  const generateTimeSlots = () => {
    const slots = []
    for (let hour = 8; hour < 18; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const time = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`
        slots.push(time)
      }
    }
    return slots
  }

  const timeSlots = generateTimeSlots()

  // Sistema de cores moderno com UI Kit
  const getAppointmentColors = (appointment: Appointment) => {
    const now = new Date()
    const appointmentDateTime = new Date(`${appointment.date}T${appointment.time}`)
    const hoursUntil = (appointmentDateTime.getTime() - now.getTime()) / (1000 * 60 * 60)

    let urgencyLevel = "normal"
    if (hoursUntil <= 1 && hoursUntil > 0) urgencyLevel = "urgent"
    else if (hoursUntil <= 0.5 && hoursUntil > -0.5) urgencyLevel = "critical"
    else if (hoursUntil < 0) urgencyLevel = "overdue"

    const colorSchemes = {
      confirmed: {
        normal: {
          bg: "bg-primary/5 border-primary/20",
          accent: "border-l-primary",
          text: "text-gray-900",
          price: "text-primary",
        },
        urgent: {
          bg: "bg-yellow-50 border-yellow-200",
          accent: "border-l-yellow-500",
          text: "text-yellow-900",
          price: "text-yellow-700",
        },
        critical: {
          bg: "bg-orange-50 border-orange-200",
          accent: "border-l-orange-500",
          text: "text-orange-900",
          price: "text-orange-700",
        },
        overdue: {
          bg: "bg-red-50 border-red-200",
          accent: "border-l-red-500",
          text: "text-red-900",
          price: "text-red-700",
        },
      },
      pending: {
        normal: {
          bg: "bg-accent/5 border-accent/20",
          accent: "border-l-accent",
          text: "text-gray-900",
          price: "text-accent",
        },
        urgent: {
          bg: "bg-yellow-100 border-yellow-300",
          accent: "border-l-yellow-500",
          text: "text-yellow-900",
          price: "text-yellow-800",
        },
        critical: {
          bg: "bg-orange-100 border-orange-300",
          accent: "border-l-orange-500",
          text: "text-orange-900",
          price: "text-orange-800",
        },
        overdue: {
          bg: "bg-red-100 border-red-300",
          accent: "border-l-red-500",
          text: "text-red-900",
          price: "text-red-800",
        },
      },
      cancelled: {
        normal: {
          bg: "bg-gray-50 border-gray-200",
          accent: "border-l-gray-300",
          text: "text-gray-500",
          price: "text-gray-400",
        },
      },
    }

    const statusColors = colorSchemes[appointment.statusInfo.status as keyof typeof colorSchemes]
    if (appointment.statusInfo.status === "cancelled") {
      return statusColors.normal
    }

    return statusColors[urgencyLevel as keyof typeof statusColors] || statusColors.normal
  }

  const getStatusBadge = (appointment: Appointment) => {
    const now = new Date()
    const appointmentDateTime = new Date(`${appointment.date}T${appointment.time}`)
    const hoursUntil = (appointmentDateTime.getTime() - now.getTime()) / (1000 * 60 * 60)

    if (appointment.statusInfo.status === "cancelled") {
      return { text: "Cancelado", variant: "secondary" as const, className: "bg-gray-200 text-gray-600" }
    }

    if (hoursUntil < 0) {
      return { text: "Atrasado", variant: "destructive" as const, className: "bg-red-600 text-white" }
    } else if (hoursUntil <= 0.5) {
      return { text: "Agora", variant: "destructive" as const, className: "bg-red-500 text-white" }
    } else if (hoursUntil <= 1) {
      return { text: "Urgente", variant: "default" as const, className: "bg-orange-500 text-white" }
    } else if (appointment.statusInfo.status === "pending") {
      return {
        text: "Pendente",
        variant: "outline" as const,
        className: "border-accent text-accent bg-accent/10",
      }
    } else {
      return { text: "Confirmado", variant: "default" as const, className: "bg-primary text-white" }
    }
  }

  const getFilteredProfessionals = () => {
    return professionals.filter((professional) => {
      const matchesSearch =
        professional.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        professional.specialties.some((s) => s.toLowerCase().includes(searchTerm.toLowerCase()))
      const matchesDepartment = selectedDepartment === "all" || professional.department === selectedDepartment
      return matchesSearch && matchesDepartment
    })
  }

  const getDisplayProfessionals = () => {
    if (viewType === "individual" && selectedIndividualProfessional) {
      const professional = professionals.find((p) => p.id === selectedIndividualProfessional)
      return professional ? [professional] : []
    }
    return getFilteredProfessionals()
  }

  const getDisplayAppointments = () => {
    const dateStr = selectedDate.toISOString().split("T")[0]

    if (viewType === "individual" && selectedIndividualProfessional) {
      return appointments.filter((app) => app.date === dateStr && app.professionalId === selectedIndividualProfessional)
    }

    const filteredProfessionals = getFilteredProfessionals()
    const professionalIds =
      selectedProfessional === "all" ? filteredProfessionals.map((p) => p.id) : [selectedProfessional]

    return appointments.filter((app) => app.date === dateStr && professionalIds.includes(app.professionalId))
  }

  const getProfessionalById = (id: string) => {
    return professionals.find((p) => p.id === id)
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("pt-BR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date)
  }

  const navigateDate = (direction: "prev" | "next") => {
    const newDate = new Date(selectedDate)
    newDate.setDate(newDate.getDate() + (direction === "next" ? 1 : -1))
    setSelectedDate(newDate)
  }

  const displayAppointments = getDisplayAppointments()
  const displayProfessionals = getDisplayProfessionals()

  const handleSlotClick = (appointment: Appointment) => {
    setSelectedAppointment(appointment)
    setIsDialogOpen(true)
  }

  const getAppointmentStyle = (appointment: Appointment) => {
    const [hours, minutes] = appointment.time.split(":").map(Number)
    const startMinutes = (hours - 8) * 60 + minutes
    const top = (startMinutes / 30) * 40
    const height = (appointment.duration / 30) * 40

    return {
      top: `${top}px`,
      height: `${height}px`,
      minHeight: "32px",
    }
  }

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="max-w-full mx-auto">
          {/* Page Header */}
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Agenda - {formatDate(selectedDate)}</h1>
                <p className="text-gray-600">
                  {displayAppointments.length} agendamento(s) • {displayProfessionals.length} profissional(is) •
                  Receita: R$ {displayAppointments.reduce((acc, app) => acc + app.price, 0).toFixed(2)}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => navigateDate("prev")}
                  className="border-gray-300 text-gray-600 hover:bg-gray-100"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => navigateDate("next")}
                  className="border-gray-300 text-gray-600 hover:bg-gray-100"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <Button className="bg-primary text-white hover:bg-primary/90 font-semibold">
                  <Plus className="h-4 w-4 mr-2" />
                  Novo Agendamento
                </Button>
              </div>
            </div>
          </div>

          {/* View Mode Toggle */}
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Button
                variant={viewMode === "timeline" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("timeline")}
                className={
                  viewMode === "timeline"
                    ? "bg-primary text-white hover:bg-primary/90"
                    : "border-gray-300 text-gray-600 hover:bg-gray-100"
                }
              >
                Timeline
              </Button>
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className={
                  viewMode === "grid"
                    ? "bg-primary text-white hover:bg-primary/90"
                    : "border-gray-300 text-gray-600 hover:bg-gray-100"
                }
              >
                Grade
              </Button>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Buscar profissional..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64 bg-white border-gray-300"
                />
              </div>
              <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                <SelectTrigger className="w-48 bg-white border-gray-300">
                  <SelectValue placeholder="Departamento" />
                </SelectTrigger>
                <SelectContent className="bg-white border-gray-300">
                  <SelectItem value="all">Todos os Departamentos</SelectItem>
                  <SelectItem value="Cabelo">Cabelo</SelectItem>
                  <SelectItem value="Estética">Estética</SelectItem>
                  <SelectItem value="Unhas">Unhas</SelectItem>
                  <SelectItem value="Sobrancelhas">Sobrancelhas</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Timeline View */}
          {viewMode === "timeline" && (
            <Card className="bg-white border-gray-200">
              <CardContent className="p-0">
                <div className="flex">
                  {/* Time Column */}
                  <div className="w-20 bg-gray-50 border-r border-gray-300">
                    <div className="h-16 border-b border-gray-300 flex items-center justify-center text-sm font-semibold text-gray-700">
                      Horário
                    </div>
                    {timeSlots.map((time) => (
                      <div
                        key={time}
                        className="h-10 border-b border-gray-200 flex items-center justify-center text-xs text-gray-500"
                      >
                        {time}
                      </div>
                    ))}
                  </div>

                  {/* Professionals Columns */}
                  <div className="flex-1 overflow-x-auto">
                    <div className="flex min-w-max">
                      {displayProfessionals.map((professional) => {
                        const professionalAppointments = displayAppointments.filter(
                          (app) => app.professionalId === professional.id,
                        )

                        return (
                          <div key={professional.id} className="w-48 border-r border-gray-200 relative">
                            {/* Professional Header */}
                            <div className="h-16 border-b border-gray-300 bg-gray-50 p-3 flex items-center space-x-2">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={professional.avatar || "/placeholder.svg"} />
                                <AvatarFallback className="text-xs bg-primary text-white">
                                  {professional.name.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold truncate text-gray-900">{professional.name}</p>
                                <p className="text-xs text-gray-600 truncate">{professional.department}</p>
                              </div>
                              <Badge variant="outline" className="text-xs border-primary/20 text-primary">
                                {professionalAppointments.length}
                              </Badge>
                            </div>

                            {/* Time Grid */}
                            <div className="relative" style={{ height: `${timeSlots.length * 40}px` }}>
                              {/* Grid Lines */}
                              {timeSlots.map((time, index) => (
                                <div
                                  key={time}
                                  className="absolute w-full border-b border-gray-100"
                                  style={{ top: `${index * 40}px`, height: "40px" }}
                                />
                              ))}

                              {/* Appointments */}
                              {professionalAppointments.map((appointment) => {
                                const colors = getAppointmentColors(appointment)
                                const statusBadge = getStatusBadge(appointment)

                                return (
                                  <div
                                    key={appointment.id}
                                    className={`absolute left-1 right-1 rounded-md p-2 cursor-pointer transition-all hover:shadow-md border-l-4 ${colors.bg} ${colors.accent}`}
                                    style={getAppointmentStyle(appointment)}
                                    onClick={() => handleSlotClick(appointment)}
                                  >
                                    <div className="flex items-center justify-between mb-1">
                                      <div className={`text-xs font-semibold truncate ${colors.text}`}>
                                        {appointment.clientName}
                                      </div>
                                      <Badge
                                        variant={statusBadge.variant}
                                        className={`text-xs scale-75 ${statusBadge.className || ""}`}
                                      >
                                        {statusBadge.text}
                                      </Badge>
                                    </div>
                                    <div className={`text-xs ${colors.text} opacity-75 truncate`}>
                                      {appointment.service}
                                    </div>
                                    <div className={`text-xs font-semibold ${colors.price}`}>
                                      R$ {appointment.price}
                                    </div>
                                    <div className={`text-xs ${colors.text} opacity-60`}>
                                      {appointment.time} ({appointment.duration}min)
                                    </div>
                                  </div>
                                )
                              })}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Grid View */}
          {viewMode === "grid" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {displayProfessionals.map((professional) => {
                const professionalAppointments = displayAppointments.filter(
                  (app) => app.professionalId === professional.id,
                )

                return (
                  <Card key={professional.id} className="hover:shadow-md transition-shadow bg-white border-gray-200">
                    <CardHeader className="pb-3">
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarImage src={professional.avatar || "/placeholder.svg"} />
                          <AvatarFallback className="bg-primary text-white">
                            {professional.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <CardTitle className="text-base text-gray-900">{professional.name}</CardTitle>
                          <CardDescription className="text-xs text-gray-600">{professional.department}</CardDescription>
                        </div>
                        <Badge variant="outline" className="text-xs border-primary/20 text-primary">
                          {professionalAppointments.length}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="space-y-2">
                        {professionalAppointments.length === 0 ? (
                          <div className="text-center py-4 text-gray-500 text-sm">Nenhum agendamento</div>
                        ) : (
                          professionalAppointments
                            .sort((a, b) => a.time.localeCompare(b.time))
                            .slice(0, 4)
                            .map((appointment) => {
                              const colors = getAppointmentColors(appointment)
                              return (
                                <div
                                  key={appointment.id}
                                  onClick={() => handleSlotClick(appointment)}
                                  className={`flex items-center justify-between p-2 rounded cursor-pointer hover:opacity-80 transition-colors ${colors.bg}`}
                                >
                                  <div className="flex items-center space-x-2">
                                    <div
                                      className={`w-3 h-3 rounded-full ${colors.accent.replace("border-l-", "bg-")}`}
                                    />
                                    <span className={`text-sm font-semibold ${colors.text}`}>{appointment.time}</span>
                                  </div>
                                  <div className="text-right">
                                    <p className={`text-xs font-semibold truncate max-w-20 ${colors.text}`}>
                                      {appointment.clientName}
                                    </p>
                                    <p className={`text-xs ${colors.price}`}>R$ {appointment.price}</p>
                                  </div>
                                </div>
                              )
                            })
                        )}
                        {professionalAppointments.length > 4 && (
                          <div className="text-center text-xs text-gray-500 pt-1">
                            +{professionalAppointments.length - 4} mais
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          )}
        </div>

        {/* Color Legend */}
        <Card className="mt-6 bg-white border-gray-200">
          <CardHeader>
            <CardTitle className="text-sm text-gray-900">Legenda de Cores - Sistema UI Kit</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-primary/5 border border-primary/20 border-l-4 border-l-primary rounded"></div>
                <span className="text-gray-700 font-medium">Confirmado - Normal</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-accent/5 border border-accent/20 border-l-4 border-l-accent rounded"></div>
                <span className="text-gray-700 font-medium">Pendente - Normal</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-yellow-50 border border-yellow-200 border-l-4 border-l-yellow-500 rounded"></div>
                <span className="text-gray-700 font-medium">🟡 Próximo (1h)</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-red-50 border border-red-200 border-l-4 border-l-red-500 rounded"></div>
                <span className="text-gray-700 font-medium">🔴 Atrasado</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Appointment Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px] bg-white border-gray-300">
          <DialogHeader>
            <DialogTitle className="text-gray-900">Detalhes do Agendamento</DialogTitle>
            <DialogDescription className="text-gray-600">
              {selectedAppointment && `${selectedAppointment.time} - ${formatDate(selectedDate)}`}
            </DialogDescription>
          </DialogHeader>

          {selectedAppointment && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className={`w-4 h-4 rounded-full bg-primary`} />
                  <Badge className="bg-primary text-white">
                    {selectedAppointment.statusInfo.status === "confirmed"
                      ? "Confirmado"
                      : selectedAppointment.statusInfo.status === "pending"
                        ? "Pendente"
                        : "Cancelado"}
                  </Badge>
                </div>
                <span className="text-lg font-bold text-primary">R$ {selectedAppointment.price.toFixed(2)}</span>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Informações do Cliente</h4>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-gray-700">
                      <User className="h-4 w-4 mr-2 text-gray-500" />
                      {selectedAppointment.clientName}
                    </div>
                    <div className="flex items-center text-sm text-gray-700">
                      <Phone className="h-4 w-4 mr-2 text-gray-500" />
                      {selectedAppointment.clientPhone}
                    </div>
                    <div className="flex items-center text-sm text-gray-700">
                      <Mail className="h-4 w-4 mr-2 text-gray-500" />
                      {selectedAppointment.clientEmail}
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Detalhes do Serviço</h4>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-700 font-medium">{selectedAppointment.service}</p>
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="h-4 w-4 mr-1" />
                      {selectedAppointment.duration} minutos
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <User className="h-4 w-4 mr-1" />
                      {getProfessionalById(selectedAppointment.professionalId)?.name}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-4 border-t border-gray-200">
                {selectedAppointment.statusInfo.status === "pending" && (
                  <Button className="bg-primary hover:bg-primary/90 text-white font-semibold">
                    Confirmar Agendamento
                  </Button>
                )}
                <Button variant="outline" className="border-gray-300 text-gray-600 hover:bg-gray-100">
                  Editar
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                  className="border-gray-300 text-gray-600 hover:bg-gray-100"
                >
                  Fechar
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  )
}
