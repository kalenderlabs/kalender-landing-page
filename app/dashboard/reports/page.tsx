"use client"

import { useState } from "react"
import {
  BarChart3,
  TrendingUp,
  Users,
  Calendar,
  DollarSign,
  Clock,
  Target,
  Award,
  Download,
  Filter,
  RefreshCw,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { DashboardLayout } from "@/components/dashboard/layout"
import { OrganizationSelector } from "@/components/ui/organization-selector"

export default function ReportsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("30d")
  const [selectedUnit, setSelectedUnit] = useState<string>("all")

  // Mock data for reports
  const operationalMetrics = {
    totalAppointments: 1247,
    completedAppointments: 1089,
    cancelledAppointments: 98,
    noShowAppointments: 60,
    occupationRate: 87.3,
    averageServiceTime: 45,
    clientRetentionRate: 73.2,
    newClientsRate: 26.8,
  }

  const financialMetrics = {
    totalRevenue: 89750.5,
    averageTicket: 82.45,
    revenueGrowth: 12.5,
    topServices: [
      { name: "Corte + Escova", revenue: 25680.0, appointments: 312 },
      { name: "Coloração", revenue: 18950.0, appointments: 95 },
      { name: "Tratamento Capilar", revenue: 15420.0, appointments: 154 },
    ],
  }

  const professionalMetrics = [
    {
      id: "1",
      name: "Ana Costa",
      appointments: 156,
      revenue: 12840.0,
      rating: 4.9,
      occupationRate: 92,
    },
    {
      id: "2",
      name: "Bruno Lima",
      appointments: 142,
      revenue: 11680.0,
      rating: 4.8,
      occupationRate: 88,
    },
    {
      id: "3",
      name: "Carla Santos",
      appointments: 134,
      revenue: 11020.0,
      rating: 4.7,
      occupationRate: 85,
    },
  ]

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Relatórios e Análises</h1>
            <p className="text-gray-600">Acompanhe o desempenho do seu negócio</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" className="border-gray-300">
              <RefreshCw className="h-4 w-4 mr-2" />
              Atualizar
            </Button>
            <Button className="bg-primary hover:bg-primary/90 text-white">
              <Download className="h-4 w-4 mr-2" />
              Exportar
            </Button>
          </div>
        </div>

        {/* Organization Context */}
        <OrganizationSelector />

        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-gray-500" />
                <span className="text-sm font-medium">Filtros:</span>
              </div>
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7d">Últimos 7 dias</SelectItem>
                  <SelectItem value="30d">Últimos 30 dias</SelectItem>
                  <SelectItem value="90d">Últimos 90 dias</SelectItem>
                  <SelectItem value="1y">Último ano</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedUnit} onValueChange={setSelectedUnit}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as unidades</SelectItem>
                  <SelectItem value="unit_vila_madalena">Vila Madalena</SelectItem>
                  <SelectItem value="unit_jardins">Jardins</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Reports Tabs */}
        <Tabs defaultValue="operational" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="operational">Operacional</TabsTrigger>
            <TabsTrigger value="financial">Financeiro</TabsTrigger>
            <TabsTrigger value="professionals">Profissionais</TabsTrigger>
            <TabsTrigger value="clients">Clientes</TabsTrigger>
          </TabsList>

          {/* Operational Reports */}
          <TabsContent value="operational" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total de Agendamentos</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{operationalMetrics.totalAppointments.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">+12% em relação ao período anterior</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Taxa de Ocupação</CardTitle>
                  <Target className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{operationalMetrics.occupationRate}%</div>
                  <Progress value={operationalMetrics.occupationRate} className="mt-2" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Tempo Médio de Serviço</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{operationalMetrics.averageServiceTime}min</div>
                  <p className="text-xs text-muted-foreground">-3min em relação ao período anterior</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Taxa de Retenção</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{operationalMetrics.clientRetentionRate}%</div>
                  <Progress value={operationalMetrics.clientRetentionRate} className="mt-2" />
                </CardContent>
              </Card>
            </div>

            {/* Appointment Status Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle>Status dos Agendamentos</CardTitle>
                <CardDescription>Distribuição dos agendamentos por status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{operationalMetrics.completedAppointments}</div>
                    <div className="text-sm text-green-700">Concluídos</div>
                    <div className="text-xs text-green-600">
                      {(
                        (operationalMetrics.completedAppointments / operationalMetrics.totalAppointments) *
                        100
                      ).toFixed(1)}
                      %
                    </div>
                  </div>
                  <div className="text-center p-4 bg-yellow-50 rounded-lg">
                    <div className="text-2xl font-bold text-yellow-600">{operationalMetrics.cancelledAppointments}</div>
                    <div className="text-sm text-yellow-700">Cancelados</div>
                    <div className="text-xs text-yellow-600">
                      {(
                        (operationalMetrics.cancelledAppointments / operationalMetrics.totalAppointments) *
                        100
                      ).toFixed(1)}
                      %
                    </div>
                  </div>
                  <div className="text-center p-4 bg-red-50 rounded-lg">
                    <div className="text-2xl font-bold text-red-600">{operationalMetrics.noShowAppointments}</div>
                    <div className="text-sm text-red-700">Não Compareceram</div>
                    <div className="text-xs text-red-600">
                      {((operationalMetrics.noShowAppointments / operationalMetrics.totalAppointments) * 100).toFixed(
                        1,
                      )}
                      %
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Financial Reports */}
          <TabsContent value="financial" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Receita Total</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    R$ {financialMetrics.totalRevenue.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </div>
                  <p className="text-xs text-green-600 flex items-center">
                    <TrendingUp className="h-3 w-3 mr-1" />+{financialMetrics.revenueGrowth}% vs período anterior
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Ticket Médio</CardTitle>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    R$ {financialMetrics.averageTicket.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </div>
                  <p className="text-xs text-muted-foreground">Por agendamento concluído</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Crescimento</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">+{financialMetrics.revenueGrowth}%</div>
                  <p className="text-xs text-muted-foreground">Crescimento da receita</p>
                </CardContent>
              </Card>
            </div>

            {/* Top Services */}
            <Card>
              <CardHeader>
                <CardTitle>Serviços Mais Rentáveis</CardTitle>
                <CardDescription>Top 3 serviços por receita gerada</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {financialMetrics.topServices.map((service, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center justify-center w-8 h-8 bg-primary text-white rounded-full text-sm font-bold">
                          {index + 1}
                        </div>
                        <div>
                          <div className="font-semibold">{service.name}</div>
                          <div className="text-sm text-gray-600">{service.appointments} agendamentos</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-green-600">
                          R$ {service.revenue.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                        </div>
                        <div className="text-sm text-gray-600">
                          R${" "}
                          {(service.revenue / service.appointments).toLocaleString("pt-BR", {
                            minimumFractionDigits: 2,
                          })}{" "}
                          / serviço
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Professional Reports */}
          <TabsContent value="professionals" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Ranking de Profissionais</CardTitle>
                <CardDescription>Performance dos profissionais no período selecionado</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {professionalMetrics.map((professional, index) => (
                    <div key={professional.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center justify-center w-10 h-10 bg-primary text-white rounded-full font-bold">
                          {index + 1}
                        </div>
                        <div>
                          <div className="font-semibold text-lg">{professional.name}</div>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <span>{professional.appointments} agendamentos</span>
                            <span>•</span>
                            <span className="flex items-center">
                              <Award className="h-3 w-3 mr-1" />
                              {professional.rating} ⭐
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right space-y-1">
                        <div className="font-bold text-green-600">
                          R$ {professional.revenue.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-600">Ocupação:</span>
                          <Badge
                            variant="outline"
                            className={
                              professional.occupationRate >= 90
                                ? "bg-green-100 text-green-700"
                                : professional.occupationRate >= 80
                                  ? "bg-yellow-100 text-yellow-700"
                                  : "bg-red-100 text-red-700"
                            }
                          >
                            {professional.occupationRate}%
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Client Reports */}
          <TabsContent value="clients" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Novos Clientes</CardTitle>
                  <CardDescription>Taxa de aquisição de novos clientes</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-primary mb-2">{operationalMetrics.newClientsRate}%</div>
                  <Progress value={operationalMetrics.newClientsRate} className="mb-2" />
                  <p className="text-sm text-gray-600">
                    {Math.round((operationalMetrics.totalAppointments * operationalMetrics.newClientsRate) / 100)} novos
                    clientes
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Retenção de Clientes</CardTitle>
                  <CardDescription>Taxa de clientes que retornaram</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-600 mb-2">
                    {operationalMetrics.clientRetentionRate}%
                  </div>
                  <Progress value={operationalMetrics.clientRetentionRate} className="mb-2" />
                  <p className="text-sm text-gray-600">
                    {Math.round((operationalMetrics.totalAppointments * operationalMetrics.clientRetentionRate) / 100)}{" "}
                    clientes recorrentes
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
