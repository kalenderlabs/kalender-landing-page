"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { Calendar, Users, Briefcase, TrendingUp, Clock, DollarSign, Star, Plus } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import DashboardLayout from "@/components/dashboard/layout"

interface User {
  id: string
  name: string
  email: string
  phone: string
  organization: {
    id: string
    name: string
    description: string
  }
  tenant: {
    id: string
    name: string
    slug: string
    description: string
  }
  role: string
  createdAt: string
}

export default function LocalizedDashboardPage() {
  const router = useRouter()
  const params = useParams()
  const locale = params.locale as string

  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check authentication
    const checkAuth = () => {
      try {
        const userData = localStorage.getItem("kalender_user")
        const token = localStorage.getItem("kalender_token")

        console.log("Checking auth - userData:", userData)
        console.log("Checking auth - token:", token)

        if (!userData || !token) {
          console.log("No auth data found, redirecting to localized login...")
          router.push(`/${locale}/login`)
          return
        }

        const parsedUser = JSON.parse(userData)
        console.log("Parsed user:", parsedUser)
        setUser(parsedUser)
      } catch (error) {
        console.error("Auth check error:", error)
        router.push(`/${locale}/login`)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [router, locale])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando dashboard...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null // Will redirect to login
  }

  const stats = [
    {
      title: "Agendamentos Hoje",
      value: "12",
      description: "+2 desde ontem",
      icon: Calendar,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Clientes Ativos",
      value: "248",
      description: "+12% este mês",
      icon: Users,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Receita Mensal",
      value: "R$ 15.420",
      description: "+8% vs mês anterior",
      icon: DollarSign,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "Avaliação Média",
      value: "4.8",
      description: "Baseado em 156 avaliações",
      icon: Star,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
    },
  ]

  const recentAppointments = [
    {
      id: 1,
      client: "Maria Silva",
      service: "Corte + Escova",
      time: "09:00",
      status: "confirmed",
      professional: "Ana Costa",
    },
    {
      id: 2,
      client: "João Santos",
      service: "Barba",
      time: "10:30",
      status: "in-progress",
      professional: "Carlos Lima",
    },
    {
      id: 3,
      client: "Fernanda Oliveira",
      service: "Manicure",
      time: "14:00",
      status: "pending",
      professional: "Lucia Mendes",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800"
      case "in-progress":
        return "bg-blue-100 text-blue-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "confirmed":
        return "Confirmado"
      case "in-progress":
        return "Em Andamento"
      case "pending":
        return "Pendente"
      default:
        return "Desconhecido"
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white">
          <h1 className="text-2xl font-bold mb-2">Olá, {user.name}! 👋</h1>
          <p className="text-blue-100 mb-4">Bem-vindo ao painel do {user.tenant.name}</p>
          <div className="flex flex-wrap gap-4">
            <Button variant="secondary" size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Novo Agendamento
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-white border-white hover:bg-white hover:text-blue-600 bg-transparent"
            >
              <Calendar className="w-4 h-4 mr-2" />
              Ver Agenda
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</p>
                    <p className="text-xs text-gray-500">{stat.description}</p>
                  </div>
                  <div className={`p-3 rounded-full ${stat.bgColor}`}>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Appointments */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Agendamentos de Hoje
              </CardTitle>
              <CardDescription>Próximos agendamentos para hoje</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentAppointments.map((appointment) => (
                  <div key={appointment.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-medium text-gray-900">{appointment.client}</p>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}
                        >
                          {getStatusText(appointment.status)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{appointment.service}</p>
                      <p className="text-xs text-gray-500">com {appointment.professional}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">{appointment.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4 bg-transparent">
                Ver Todos os Agendamentos
              </Button>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="w-5 h-5" />
                Ações Rápidas
              </CardTitle>
              <CardDescription>Acesso rápido às principais funcionalidades</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  className="h-20 flex flex-col items-center justify-center gap-2 bg-transparent"
                >
                  <Calendar className="w-6 h-6" />
                  <span className="text-sm">Nova Agenda</span>
                </Button>
                <Button
                  variant="outline"
                  className="h-20 flex flex-col items-center justify-center gap-2 bg-transparent"
                >
                  <Users className="w-6 h-6" />
                  <span className="text-sm">Novo Cliente</span>
                </Button>
                <Button
                  variant="outline"
                  className="h-20 flex flex-col items-center justify-center gap-2 bg-transparent"
                >
                  <Briefcase className="w-6 h-6" />
                  <span className="text-sm">Novo Serviço</span>
                </Button>
                <Button
                  variant="outline"
                  className="h-20 flex flex-col items-center justify-center gap-2 bg-transparent"
                >
                  <TrendingUp className="w-6 h-6" />
                  <span className="text-sm">Relatórios</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Organization Info */}
        <Card>
          <CardHeader>
            <CardTitle>Informações da Organização</CardTitle>
            <CardDescription>Detalhes da sua organização e estabelecimento</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Organização</h3>
                <p className="text-lg font-medium text-blue-600 mb-1">{user.organization.name}</p>
                <p className="text-sm text-gray-600">{user.organization.description}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Estabelecimento</h3>
                <p className="text-lg font-medium text-purple-600 mb-1">{user.tenant.name}</p>
                <p className="text-sm text-gray-600 mb-2">{user.tenant.description}</p>
                <p className="text-xs text-gray-500">URL: kalender.app/{user.tenant.slug}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
