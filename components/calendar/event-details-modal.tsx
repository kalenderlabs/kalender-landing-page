"use client"

import { useState } from "react"
import { Calendar, Clock, User, Phone, DollarSign, FileText, Edit, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { type CalendarEvent, type Professional, formatTime, formatDate, getStatusColor } from "@/lib/calendar-utils"

interface EventDetailsModalProps {
  event: CalendarEvent
  professionals: Professional[]
  open: boolean
  onOpenChange: (open: boolean) => void
  onUpdate: (event: CalendarEvent) => void
  onDelete: (eventId: string) => void
}

export function EventDetailsModal({
  event,
  professionals,
  open,
  onOpenChange,
  onUpdate,
  onDelete,
}: EventDetailsModalProps) {
  const [isEditing, setIsEditing] = useState(false)

  const professional = professionals.find((p) => p.id === event.professionalId)

  const handleStatusChange = (newStatus: CalendarEvent["status"]) => {
    onUpdate({
      ...event,
      status: newStatus,
    })
  }

  const handleDelete = () => {
    if (confirm("Tem certeza que deseja excluir este agendamento?")) {
      onDelete(event.id)
    }
  }

  const getStatusText = (status: CalendarEvent["status"]) => {
    switch (status) {
      case "confirmed":
        return "Confirmado"
      case "pending":
        return "Pendente"
      case "cancelled":
        return "Cancelado"
      case "completed":
        return "Concluído"
      default:
        return status
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Detalhes do Agendamento</span>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                <Edit className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={handleDelete} className="text-red-600 hover:text-red-700">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Status */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-600">Status:</span>
            <div className="flex items-center space-x-2">
              <Badge className={`${getStatusColor(event.status)} text-white`}>{getStatusText(event.status)}</Badge>
              {event.status === "pending" && (
                <Button
                  size="sm"
                  onClick={() => handleStatusChange("confirmed")}
                  className="bg-green-600 hover:bg-green-700"
                >
                  Confirmar
                </Button>
              )}
            </div>
          </div>

          <Separator />

          {/* Client Info */}
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <User className="h-4 w-4 text-gray-500" />
              <div>
                <div className="font-semibold text-gray-900">{event.clientName}</div>
                {event.clientPhone && (
                  <div className="text-sm text-gray-600 flex items-center space-x-1">
                    <Phone className="h-3 w-3" />
                    <span>{event.clientPhone}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <Separator />

          {/* Service Info */}
          <div className="space-y-3">
            <div>
              <div className="font-semibold text-gray-900">{event.serviceName}</div>
              <div className="text-sm text-gray-600 flex items-center space-x-1">
                <DollarSign className="h-3 w-3" />
                <span>R$ {event.servicePrice.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Date & Time */}
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <Calendar className="h-4 w-4 text-gray-500" />
              <span className="text-gray-900">{formatDate(event.start)}</span>
            </div>
            <div className="flex items-center space-x-3">
              <Clock className="h-4 w-4 text-gray-500" />
              <span className="text-gray-900">
                {formatTime(event.start)} - {formatTime(event.end)}
              </span>
            </div>
          </div>

          <Separator />

          {/* Professional */}
          {professional && (
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: professional.color }} />
              <span className="text-gray-900">{professional.name}</span>
            </div>
          )}

          {/* Notes */}
          {event.notes && (
            <>
              <Separator />
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <FileText className="h-4 w-4 text-gray-500" />
                  <span className="text-sm font-medium text-gray-600">Observações:</span>
                </div>
                <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded-lg">{event.notes}</p>
              </div>
            </>
          )}

          {/* Action Buttons */}
          <div className="flex space-x-2 pt-4">
            {event.status === "confirmed" && (
              <Button variant="outline" onClick={() => handleStatusChange("completed")} className="flex-1">
                Marcar como Concluído
              </Button>
            )}
            {event.status !== "cancelled" && (
              <Button
                variant="outline"
                onClick={() => handleStatusChange("cancelled")}
                className="flex-1 text-red-600 hover:text-red-700"
              >
                Cancelar
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
