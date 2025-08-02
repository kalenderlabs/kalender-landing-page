"use client"

import type React from "react"

import { useState } from "react"
import { Calendar, Clock, User, Phone, DollarSign, FileText } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { type CalendarEvent, type Professional, formatDate } from "@/lib/calendar-utils"

interface NewEventModalProps {
  professionals: Professional[]
  selectedDate: Date
  open: boolean
  onOpenChange: (open: boolean) => void
  onCreate: (event: Omit<CalendarEvent, "id">) => void
}

export function NewEventModal({ professionals, selectedDate, open, onOpenChange, onCreate }: NewEventModalProps) {
  const [formData, setFormData] = useState({
    clientName: "",
    clientPhone: "",
    serviceName: "",
    servicePrice: "",
    professionalId: "",
    date: formatDate(selectedDate),
    startTime: "09:00",
    endTime: "10:00",
    notes: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const [startHour, startMinute] = formData.startTime.split(":").map(Number)
    const [endHour, endMinute] = formData.endTime.split(":").map(Number)

    const startDate = new Date(selectedDate)
    startDate.setHours(startHour, startMinute, 0, 0)

    const endDate = new Date(selectedDate)
    endDate.setHours(endHour, endMinute, 0, 0)

    const professional = professionals.find((p) => p.id === formData.professionalId)

    const newEvent: Omit<CalendarEvent, "id"> = {
      title: `${formData.clientName} - ${formData.serviceName}`,
      start: startDate,
      end: endDate,
      clientName: formData.clientName,
      clientPhone: formData.clientPhone || undefined,
      serviceName: formData.serviceName,
      servicePrice: Number.parseFloat(formData.servicePrice) || 0,
      professionalId: formData.professionalId,
      professionalName: professional?.name || "",
      status: "pending",
      notes: formData.notes || undefined,
      color: professional?.color,
    }

    onCreate(newEvent)

    // Reset form
    setFormData({
      clientName: "",
      clientPhone: "",
      serviceName: "",
      servicePrice: "",
      professionalId: "",
      date: formatDate(selectedDate),
      startTime: "09:00",
      endTime: "10:00",
      notes: "",
    })
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Novo Agendamento</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Client Info */}
          <div className="space-y-3">
            <div>
              <Label htmlFor="clientName">Nome do Cliente *</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  id="clientName"
                  value={formData.clientName}
                  onChange={(e) => handleInputChange("clientName", e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="clientPhone">Telefone</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  id="clientPhone"
                  value={formData.clientPhone}
                  onChange={(e) => handleInputChange("clientPhone", e.target.value)}
                  className="pl-10"
                  placeholder="(11) 99999-9999"
                />
              </div>
            </div>
          </div>

          {/* Service Info */}
          <div className="space-y-3">
            <div>
              <Label htmlFor="serviceName">Serviço *</Label>
              <Input
                id="serviceName"
                value={formData.serviceName}
                onChange={(e) => handleInputChange("serviceName", e.target.value)}
                placeholder="Ex: Corte + Escova"
                required
              />
            </div>

            <div>
              <Label htmlFor="servicePrice">Preço (R$)</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  id="servicePrice"
                  type="number"
                  step="0.01"
                  value={formData.servicePrice}
                  onChange={(e) => handleInputChange("servicePrice", e.target.value)}
                  className="pl-10"
                  placeholder="0,00"
                />
              </div>
            </div>
          </div>

          {/* Professional */}
          <div>
            <Label>Profissional *</Label>
            <Select
              value={formData.professionalId}
              onValueChange={(value) => handleInputChange("professionalId", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecionar profissional" />
              </SelectTrigger>
              <SelectContent>
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
          </div>

          {/* Date & Time */}
          <div className="space-y-3">
            <div>
              <Label htmlFor="date">Data</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleInputChange("date", e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="startTime">Início</Label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="startTime"
                    type="time"
                    value={formData.startTime}
                    onChange={(e) => handleInputChange("startTime", e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="endTime">Fim</Label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="endTime"
                    type="time"
                    value={formData.endTime}
                    onChange={(e) => handleInputChange("endTime", e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div>
            <Label htmlFor="notes">Observações</Label>
            <div className="relative">
              <FileText className="absolute left-3 top-3 text-gray-400 h-4 w-4" />
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => handleInputChange("notes", e.target.value)}
                className="pl-10"
                placeholder="Observações adicionais..."
                rows={3}
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex space-x-3 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
              Cancelar
            </Button>
            <Button type="submit" className="flex-1">
              Criar Agendamento
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
