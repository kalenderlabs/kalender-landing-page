"use client"
import { Plus, Edit, Trash2, User, Calendar, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DashboardLayout } from "@/components/dashboard/layout"
import { useTranslation } from "@/hooks/useTranslation"

export default function ProfessionalsPage() {
  const { t } = useTranslation()

  // Mock professionals data
  const professionals = [
    {
      id: 1,
      name: "Ana Costa",
      email: "ana@kalender.app",
      phone: "(11) 99999-1111",
      specialties: ["Corte Feminino", "Escova", "Coloração"],
      avatar: "/placeholder.svg?height=40&width=40",
      active: true,
      rating: 4.9,
      appointmentsThisMonth: 45,
      revenue: 2250.0,
    },
    {
      id: 2,
      name: "Carlos Lima",
      email: "carlos@kalender.app",
      phone: "(11) 99999-2222",
      specialties: ["Corte Masculino", "Barba", "Bigode"],
      avatar: "/placeholder.svg?height=40&width=40",
      active: true,
      rating: 4.8,
      appointmentsThisMonth: 38,
      revenue: 1900.0,
    },
    {
      id: 3,
      name: "Beatriz Souza",
      email: "beatriz@kalender.app",
      phone: "(11) 99999-3333",
      specialties: ["Manicure", "Pedicure", "Nail Art"],
      avatar: "/placeholder.svg?height=40&width=40",
      active: true,
      rating: 4.7,
      appointmentsThisMonth: 52,
      revenue: 1560.0,
    },
    {
      id: 4,
      name: "Diego Santos",
      email: "diego@kalender.app",
      phone: "(11) 99999-4444",
      specialties: ["Limpeza de Pele", "Massagem"],
      avatar: "/placeholder.svg?height=40&width=40",
      active: false,
      rating: 4.6,
      appointmentsThisMonth: 0,
      revenue: 0,
    },
  ]

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{t("sidebar.professionals")}</h1>
              <p className="text-gray-600">Gerencie a equipe do seu estabelecimento</p>
            </div>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="h-4 w-4 mr-2" />
              Novo Profissional
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Total de Profissionais</CardTitle>
                <div className="bg-primary/10 p-2 rounded-lg">
                  <User className="h-4 w-4 text-primary" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{professionals.length}</div>
                <p className="text-xs text-gray-600">{professionals.filter((p) => p.active).length} ativos</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Agendamentos Este Mês</CardTitle>
                <div className="bg-secondary/10 p-2 rounded-lg">
                  <Calendar className="h-4 w-4 text-secondary" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {professionals.reduce((acc, p) => acc + p.appointmentsThisMonth, 0)}
                </div>
                <p className="text-xs text-gray-600">Total da equipe</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Receita Este Mês</CardTitle>
                <div className="bg-accent/10 p-2 rounded-lg">
                  <span className="text-accent font-bold">R$</span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  R$ {professionals.reduce((acc, p) => acc + p.revenue, 0).toFixed(2)}
                </div>
                <p className="text-xs text-gray-600">Total da equipe</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Avaliação Média</CardTitle>
                <div className="bg-yellow-100 p-2 rounded-lg">
                  <Star className="h-4 w-4 text-yellow-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {(professionals.reduce((acc, p) => acc + p.rating, 0) / professionals.length).toFixed(1)}
                </div>
                <p className="text-xs text-gray-600">Média da equipe</p>
              </CardContent>
            </Card>
          </div>

          {/* Professionals Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {professionals.map((professional) => (
              <Card key={professional.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={professional.avatar || "/placeholder.svg"} alt={professional.name} />
                        <AvatarFallback className="bg-primary text-white">{professional.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg">{professional.name}</CardTitle>
                        <p className="text-sm text-gray-600">{professional.email}</p>
                        <p className="text-sm text-gray-600">{professional.phone}</p>
                      </div>
                    </div>
                    <Badge
                      variant={professional.active ? "default" : "secondary"}
                      className={professional.active ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}
                    >
                      {professional.active ? t("common.active") : t("common.inactive")}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  {/* Specialties */}
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Especialidades:</h4>
                    <div className="flex flex-wrap gap-1">
                      {professional.specialties.map((specialty, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="text-center">
                      <div className="flex items-center justify-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-500" />
                        <span className="font-semibold">{professional.rating}</span>
                      </div>
                      <p className="text-xs text-gray-600">Avaliação</p>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold">{professional.appointmentsThisMonth}</div>
                      <p className="text-xs text-gray-600">Agendamentos</p>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold">R$ {professional.revenue.toFixed(0)}</div>
                      <p className="text-xs text-gray-600">Receita</p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Edit className="h-4 w-4 mr-1" />
                      {t("common.edit")}
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
