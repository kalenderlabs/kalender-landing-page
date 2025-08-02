"use client"

import { useState } from "react"
import { Plus, Edit, Trash2, User, Mail, Phone, Clock, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DashboardLayout } from "@/components/dashboard/layout"

interface ProfessionalStatus {
  isCheckedIn: boolean
  checkedInAt?: Date
  checkedInUnit?: string
  lastCheckOut?: Date
}

interface Professional {
  id: string
  name: string
  email: string
  phone: string
  specialties: string[]
  bio: string
  avatar: string
  active: boolean
  workingHours: {
    start: string
    end: string
    days: string[]
  }
  services: string[]
  status: ProfessionalStatus
  unitIds: string[] // Unidades onde o profissional pode trabalhar
}

export default function ProfessionalsPage() {
  const [professionals, setProfessionals] = useState<Professional[]>([
    {
      id: "1",
      name: "Maria Silva",
      email: "maria@belezamilena.com",
      phone: "(11) 99999-9999",
      specialties: ["Cortes", "Coloração", "Tratamentos"],
      bio: "Cabeleireira com 10 anos de experiência em cortes modernos e coloração.",
      avatar: "/placeholder.svg?height=80&width=80",
      active: true,
      workingHours: {
        start: "08:00",
        end: "18:00",
        days: ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday"],
      },
      services: ["1", "2", "3"],
      status: {
        isCheckedIn: false,
      },
      unitIds: ["unit1", "unit2"],
    },
    {
      id: "2",
      name: "João Santos",
      email: "joao@belezamilena.com",
      phone: "(11) 88888-8888",
      specialties: ["Massagem", "Relaxamento", "Terapias"],
      bio: "Massoterapeuta especializado em técnicas de relaxamento e alívio de tensões.",
      avatar: "/placeholder.svg?height=80&width=80",
      active: true,
      workingHours: {
        start: "09:00",
        end: "17:00",
        days: ["tuesday", "wednesday", "thursday", "friday", "saturday"],
      },
      services: ["4", "5"],
      status: {
        isCheckedIn: true,
        checkedInAt: new Date(),
        checkedInUnit: "unit1",
      },
      unitIds: ["unit1"],
    },
    {
      id: "3",
      name: "Ana Costa",
      email: "ana@belezamilena.com",
      phone: "(11) 77777-7777",
      specialties: ["Manicure", "Pedicure", "Nail Art"],
      bio: "Especialista em cuidados com unhas e nail art criativa.",
      avatar: "/placeholder.svg?height=80&width=80",
      active: false,
      workingHours: {
        start: "10:00",
        end: "19:00",
        days: ["monday", "wednesday", "friday", "saturday"],
      },
      services: ["6"],
      status: {
        isCheckedIn: false,
      },
      unitIds: ["unit2", "unit3"],
    },
  ])

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingProfessional, setEditingProfessional] = useState<Professional | null>(null)

  const handleAddProfessional = () => {
    setEditingProfessional(null)
    setIsDialogOpen(true)
  }

  const handleEditProfessional = (professional: Professional) => {
    setEditingProfessional(professional)
    setIsDialogOpen(true)
  }

  const weekDays = [
    { id: "monday", label: "Segunda" },
    { id: "tuesday", label: "Terça" },
    { id: "wednesday", label: "Quarta" },
    { id: "thursday", label: "Quinta" },
    { id: "friday", label: "Sexta" },
    { id: "saturday", label: "Sábado" },
    { id: "sunday", label: "Domingo" },
  ]

  const getWorkingDaysText = (days: string[]) => {
    const dayLabels = days.map((day) => weekDays.find((d) => d.id === day)?.label).filter(Boolean)
    if (dayLabels.length === 0) return "Nenhum dia definido"
    if (dayLabels.length <= 3) return dayLabels.join(", ")
    return `${dayLabels.slice(0, 2).join(", ")} e mais ${dayLabels.length - 2}`
  }

  const handleCheckIn = async (professionalId: string, unitId: string) => {
    // API call para check-in
    console.log(`Check-in do profissional ${professionalId} na unidade ${unitId}`)
  }

  const handleCheckOut = async (professionalId: string) => {
    // API call para check-out
    console.log(`Check-out do profissional ${professionalId}`)
  }

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="max-w-6xl mx-auto">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Gerenciar Profissionais</h1>
                <p className="text-gray-600">Configure a equipe do seu estabelecimento</p>
              </div>
              <Button
                onClick={handleAddProfessional}
                className="bg-primary hover:bg-primary/90 text-white font-semibold"
              >
                <Plus className="h-4 w-4 mr-2" />
                Novo Profissional
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-white border-gray-200 hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Total de Profissionais</CardTitle>
                <div className="bg-primary/10 p-2 rounded-lg">
                  <Users className="h-4 w-4 text-primary" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{professionals.length}</div>
                <p className="text-xs text-gray-500">{professionals.filter((p) => p.active).length} ativos</p>
              </CardContent>
            </Card>

            <Card className="bg-white border-gray-200 hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Especialidades</CardTitle>
                <div className="bg-secondary/10 p-2 rounded-lg">
                  <User className="h-4 w-4 text-secondary" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">
                  {new Set(professionals.flatMap((p) => p.specialties)).size}
                </div>
                <p className="text-xs text-gray-500">Diferentes especialidades</p>
              </CardContent>
            </Card>

            <Card className="bg-white border-gray-200 hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Horário de Funcionamento</CardTitle>
                <div className="bg-accent/10 p-2 rounded-lg">
                  <Clock className="h-4 w-4 text-accent" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">8h - 19h</div>
                <p className="text-xs text-gray-500">Seg à Sáb</p>
              </CardContent>
            </Card>
          </div>

          {/* Professionals Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {professionals.map((professional) => (
              <Card
                key={professional.id}
                className={`bg-white border-gray-200 hover:shadow-md transition-shadow ${!professional.active ? "opacity-60" : ""}`}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={professional.avatar || "/placeholder.svg"} alt={professional.name} />
                        <AvatarFallback className="bg-primary text-white font-semibold">
                          {professional.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg text-gray-900 font-bold">{professional.name}</CardTitle>
                        <Badge
                          variant={professional.active ? "default" : "secondary"}
                          className={`mt-1 ${professional.active ? "bg-primary text-white" : "bg-gray-200 text-gray-600"}`}
                        >
                          {professional.active ? "Ativo" : "Inativo"}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex space-x-1">
                      {professional.status.isCheckedIn ? (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleCheckOut(professional.id)}
                          className="text-gray-500 hover:text-primary"
                        >
                          Check-out
                        </Button>
                      ) : (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleCheckIn(professional.id, professional.unitIds[0])} // Assuming first unit for simplicity
                          className="text-gray-500 hover:text-primary"
                        >
                          Check-in
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEditProfessional(professional)}
                        className="text-gray-500 hover:text-primary"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-gray-500 hover:text-red-500">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600 text-sm font-light">{professional.bio}</p>

                  <div>
                    <h4 className="text-sm font-bold text-gray-900 mb-2">Especialidades</h4>
                    <div className="flex flex-wrap gap-1">
                      {professional.specialties.map((specialty, index) => (
                        <Badge key={index} variant="outline" className="text-xs border-primary/20 text-primary">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-gray-900 mb-2">Contato</h4>
                    <div className="space-y-1">
                      <div className="flex items-center text-xs text-gray-500">
                        <Mail className="h-3 w-3 mr-2" />
                        <span className="font-medium">{professional.email}</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-500">
                        <Phone className="h-3 w-3 mr-2" />
                        <span className="font-medium">{professional.phone}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-gray-900 mb-2">Horário de Trabalho</h4>
                    <div className="text-xs text-gray-500">
                      <div className="font-medium">{getWorkingDaysText(professional.workingHours.days)}</div>
                      <div className="font-medium">
                        {professional.workingHours.start} às {professional.workingHours.end}
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-gray-900 mb-2">Serviços</h4>
                    <div className="text-xs text-gray-500 font-medium">
                      {professional.services.length} serviço(s) disponível(is)
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Empty State */}
          {professionals.length === 0 && (
            <Card className="text-center py-12 bg-white border-gray-200">
              <CardContent>
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Nenhum profissional cadastrado</h3>
                <p className="text-gray-600 mb-4 font-light">Comece adicionando os profissionais da sua equipe</p>
                <Button
                  onClick={handleAddProfessional}
                  className="bg-primary hover:bg-primary/90 text-white font-semibold"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar Primeiro Profissional
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Add/Edit Professional Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto bg-white border-gray-300">
          <DialogHeader>
            <DialogTitle className="text-gray-900 font-bold">
              {editingProfessional ? "Editar Profissional" : "Novo Profissional"}
            </DialogTitle>
            <DialogDescription className="text-gray-600 font-light">
              Configure as informações do profissional da sua equipe
            </DialogDescription>
          </DialogHeader>
          <form className="space-y-6">
            {/* Basic Info */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-900">Informações Básicas</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="professionalName" className="font-semibold">
                    Nome Completo *
                  </Label>
                  <Input id="professionalName" placeholder="Ex: Maria Silva" defaultValue={editingProfessional?.name} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="professionalEmail" className="font-semibold">
                    E-mail *
                  </Label>
                  <Input
                    id="professionalEmail"
                    type="email"
                    placeholder="maria@email.com"
                    defaultValue={editingProfessional?.email}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="professionalPhone" className="font-semibold">
                  Telefone/WhatsApp
                </Label>
                <Input id="professionalPhone" placeholder="(11) 99999-9999" defaultValue={editingProfessional?.phone} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="professionalBio" className="font-semibold">
                  Biografia/Apresentação
                </Label>
                <Textarea
                  id="professionalBio"
                  placeholder="Descreva a experiência e especialidades do profissional"
                  defaultValue={editingProfessional?.bio}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="professionalSpecialties" className="font-semibold">
                  Especialidades (separadas por vírgula)
                </Label>
                <Input
                  id="professionalSpecialties"
                  placeholder="Ex: Cortes, Coloração, Tratamentos"
                  defaultValue={editingProfessional?.specialties.join(", ")}
                />
              </div>
            </div>

            <div className="flex justify-end space-x-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
                className="border-gray-300 text-gray-600 hover:bg-gray-100"
              >
                Cancelar
              </Button>
              <Button type="submit" className="bg-primary hover:bg-primary/90 text-white font-semibold">
                {editingProfessional ? "Salvar Alterações" : "Criar Profissional"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  )
}
