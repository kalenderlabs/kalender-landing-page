"use client"

import { useState, useMemo } from "react"
import { Trophy, Medal, TrendingUp, Calendar, Users, Share, Star, Crown, Zap, Target } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { TooltipProvider } from "@/components/ui/tooltip"

import type { CalendarEvent, Professional } from "@/lib/calendar-utils"

interface EmployeeRankingProps {
  professionals: Professional[]
  events: CalendarEvent[]
}

interface ProfessionalStats {
  professional: Professional
  appointmentsCount: number
  revenue: number
  completionRate: number
  rank: number
  growth: number
  efficiency: number
}

export function EmployeeRanking({ professionals, events }: EmployeeRankingProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const currentMonth = new Date().getMonth()
  const currentYear = new Date().getFullYear()
  const previousMonth = currentMonth === 0 ? 11 : currentMonth - 1
  const previousYear = currentMonth === 0 ? currentYear - 1 : currentYear

  const professionalStats = useMemo(() => {
    const stats = professionals.map((professional) => {
      const currentEvents = events.filter(
        (event) =>
          event.professionalId === professional.id &&
          event.start.getMonth() === currentMonth &&
          event.start.getFullYear() === currentYear,
      )

      const previousEvents = events.filter(
        (event) =>
          event.professionalId === professional.id &&
          event.start.getMonth() === previousMonth &&
          event.start.getFullYear() === previousYear,
      )

      const completedEvents = currentEvents.filter((event) => event.status === "completed")
      const revenue = currentEvents.reduce((sum, event) => sum + event.servicePrice, 0)
      const completionRate = currentEvents.length > 0 ? (completedEvents.length / currentEvents.length) * 100 : 0

      const growth =
        previousEvents.length > 0
          ? ((currentEvents.length - previousEvents.length) / previousEvents.length) * 100
          : currentEvents.length > 0
            ? 100
            : 0

      const totalMinutes = currentEvents.reduce((sum, event) => sum + event.duration, 0)
      const efficiency = totalMinutes > 0 ? (completedEvents.length / (totalMinutes / 60)) * 100 : 0

      return {
        professional,
        appointmentsCount: currentEvents.length,
        revenue,
        completionRate,
        rank: 0,
        growth,
        efficiency,
      }
    })

    // Sort by appointments count and assign ranks
    stats.sort((a, b) => b.appointmentsCount - a.appointmentsCount)
    stats.forEach((stat, index) => {
      stat.rank = index + 1
    })

    return stats
  }, [professionals, events, currentMonth, currentYear, previousMonth, previousYear])

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-6 w-6 text-yellow-500" />
      case 2:
        return <Trophy className="h-6 w-6 text-gray-400" />
      case 3:
        return <Medal className="h-6 w-6 text-amber-600" />
      default:
        return (
          <div className="h-6 w-6 flex items-center justify-center text-sm font-bold text-gray-500 bg-gray-100 rounded-full">
            {rank}
          </div>
        )
    }
  }

  const getRankBadgeColor = (rank: number) => {
    switch (rank) {
      case 1:
        return "bg-gradient-to-r from-yellow-400 to-yellow-600 text-white"
      case 2:
        return "bg-gradient-to-r from-gray-300 to-gray-500 text-white"
      case 3:
        return "bg-gradient-to-r from-amber-400 to-amber-600 text-white"
      default:
        return "bg-gradient-to-r from-blue-400 to-blue-600 text-white"
    }
  }

  const getGrowthColor = (growth: number) => {
    if (growth > 0) return "text-green-600"
    if (growth < 0) return "text-red-600"
    return "text-gray-600"
  }

  const topPerformer = professionalStats[0]
  const maxAppointments = Math.max(...professionalStats.map((s) => s.appointmentsCount))

  return (
    <TooltipProvider>
      <div className="space-y-8">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              Rankings de Performance
            </h2>
            <p className="text-gray-600 mt-2">
              Acompanhe o desempenho da sua equipe em{" "}
              {new Date().toLocaleDateString("pt-BR", { month: "long", year: "numeric" })}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              <Share className="h-4 w-4 mr-2" />
              Compartilhar
            </Button>
          </div>
        </div>

        {/* Top Performer Highlight */}
        {topPerformer && topPerformer.appointmentsCount > 0 && (
          <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50 shadow-xl">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-yellow-200/30 to-amber-300/30 rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-orange-200/30 to-yellow-300/30 rounded-full translate-y-12 -translate-x-12"></div>

            <CardHeader className="relative">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full shadow-lg">
                  <Crown className="h-6 w-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-2xl text-amber-900">🏆 Destaque do Mês</CardTitle>
                  <p className="text-amber-700">Profissional com melhor performance</p>
                </div>
              </div>
            </CardHeader>

            <CardContent className="relative">
              <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
                <div className="flex items-center gap-4">
                  <Avatar className="h-20 w-20 border-4 border-yellow-300 shadow-lg">
                    <AvatarImage src={topPerformer.professional.avatar || "/placeholder.svg"} />
                    <AvatarFallback className="bg-gradient-to-r from-yellow-400 to-amber-500 text-white text-xl font-bold">
                      {topPerformer.professional.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-2xl font-bold text-amber-900">{topPerformer.professional.name}</h3>
                    <p className="text-amber-700">{topPerformer.professional.specialties.join(" • ")}</p>
                  </div>
                </div>

                <div className="flex-1 grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-white/60 rounded-xl backdrop-blur-sm">
                    <div className="text-3xl font-bold text-amber-800">{topPerformer.appointmentsCount}</div>
                    <div className="text-sm text-amber-600 font-medium">Agendamentos</div>
                  </div>
                  <div className="text-center p-4 bg-white/60 rounded-xl backdrop-blur-sm">
                    <div className="text-3xl font-bold text-amber-800">R$ {topPerformer.revenue.toFixed(0)}</div>
                    <div className="text-sm text-amber-600 font-medium">Receita</div>
                  </div>
                  <div className="text-center p-4 bg-white/60 rounded-xl backdrop-blur-sm">
                    <div className="text-3xl font-bold text-amber-800">{topPerformer.completionRate.toFixed(0)}%</div>
                    <div className="text-sm text-amber-600 font-medium">Conclusão</div>
                  </div>
                  <div className="text-center p-4 bg-white/60 rounded-xl backdrop-blur-sm">
                    <div className={`text-3xl font-bold ${getGrowthColor(topPerformer.growth)}`}>
                      {topPerformer.growth > 0 ? "+" : ""}
                      {topPerformer.growth.toFixed(0)}%
                    </div>
                    <div className="text-sm text-amber-600 font-medium">Crescimento</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Performance Metrics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-600 font-medium">Total de Agendamentos</p>
                  <p className="text-3xl font-bold text-blue-900">
                    {professionalStats.reduce((sum, stat) => sum + stat.appointmentsCount, 0)}
                  </p>
                </div>
                <Calendar className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-600 font-medium">Receita Total</p>
                  <p className="text-3xl font-bold text-green-900">
                    R$ {professionalStats.reduce((sum, stat) => sum + stat.revenue, 0).toFixed(0)}
                  </p>
                </div>
                <Target className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-600 font-medium">Taxa Média de Conclusão</p>
                  <p className="text-3xl font-bold text-purple-900">
                    {(
                      professionalStats.reduce((sum, stat) => sum + stat.completionRate, 0) /
                        professionalStats.length || 0
                    ).toFixed(0)}
                    %
                  </p>
                </div>
                <Zap className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-50 to-red-50 border-orange-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-600 font-medium">Profissionais Ativos</p>
                  <p className="text-3xl font-bold text-orange-900">{professionalStats.length}</p>
                </div>
                <Users className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Full Ranking */}
        <Card className="shadow-lg">
          <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 border-b">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl text-gray-900 flex items-center gap-3">
                <TrendingUp className="h-5 w-5 text-primary" />
                Ranking Completo de Profissionais
              </CardTitle>
              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                >
                  Grid
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                >
                  Lista
                </Button>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-6">
            {professionalStats.length === 0 ? (
              <div className="text-center py-12">
                <Users className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                <h3 className="text-lg font-semibold text-gray-600 mb-2">Nenhum agendamento encontrado</h3>
                <p className="text-gray-500 mb-6">Não há dados de performance para este mês.</p>
              </div>
            ) : (
              <div className={viewMode === "grid" ? "grid grid-cols-1 lg:grid-cols-2 gap-6" : "space-y-4"}>
                {professionalStats.map((stat, index) => (
                  <Card
                    key={stat.professional.id}
                    className={`group hover:shadow-lg transition-all duration-300 border-l-4 ${
                      stat.rank === 1
                        ? "border-l-yellow-400 bg-gradient-to-r from-yellow-50/50 to-transparent"
                        : stat.rank === 2
                          ? "border-l-gray-400 bg-gradient-to-r from-gray-50/50 to-transparent"
                          : stat.rank === 3
                            ? "border-l-amber-400 bg-gradient-to-r from-amber-50/50 to-transparent"
                            : "border-l-blue-400 bg-gradient-to-r from-blue-50/30 to-transparent"
                    }`}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <div className="relative">
                            {getRankIcon(stat.rank)}
                            {stat.rank <= 3 && (
                              <div className="absolute -top-1 -right-1">
                                <Star className="h-3 w-3 text-yellow-400 fill-current" />
                              </div>
                            )}
                          </div>

                          <Avatar className="h-14 w-14 border-2 border-white shadow-md">
                            <AvatarImage src={stat.professional.avatar || "/placeholder.svg"} />
                            <AvatarFallback
                              style={{
                                backgroundColor: stat.professional.color + "20",
                                color: stat.professional.color,
                                fontWeight: "bold",
                              }}
                            >
                              {stat.professional.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>

                          <div className="flex-1">
                            <h4 className="font-bold text-lg text-gray-900">{stat.professional.name}</h4>
                            <p className="text-sm text-gray-600">{stat.professional.specialties.join(" • ")}</p>
                            <Badge className={`mt-1 ${getRankBadgeColor(stat.rank)}`}>#{stat.rank} Posição</Badge>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                        <div className="text-center p-3 bg-blue-50 rounded-lg">
                          <div className="text-xl font-bold text-blue-700">{stat.appointmentsCount}</div>
                          <div className="text-xs text-blue-600">Agendamentos</div>
                        </div>
                        <div className="text-center p-3 bg-green-50 rounded-lg">
                          <div className="text-xl font-bold text-green-700">R$ {stat.revenue.toFixed(0)}</div>
                          <div className="text-xs text-green-600">Receita</div>
                        </div>
                        <div className="text-center p-3 bg-purple-50 rounded-lg">
                          <div className="text-xl font-bold text-purple-700">{stat.completionRate.toFixed(0)}%</div>
                          <div className="text-xs text-purple-600">Conclusão</div>
                        </div>
                        <div className="text-center p-3 bg-orange-50 rounded-lg">
                          <div className={`text-xl font-bold ${getGrowthColor(stat.growth)}`}>
                            {stat.growth > 0 ? "+" : ""}
                            {stat.growth.toFixed(0)}%
                          </div>
                          <div className="text-xs text-orange-600">Crescimento</div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <div className="flex items-center justify-between text-sm mb-1">
                            <span className="text-gray-600">Progresso vs. líder</span>
                            <span className="font-medium">
                              {maxAppointments > 0 ? Math.round((stat.appointmentsCount / maxAppointments) * 100) : 0}%
                            </span>
                          </div>
                          <Progress
                            value={maxAppointments > 0 ? (stat.appointmentsCount / maxAppointments) * 100 : 0}
                            className="h-2"
                          />
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t">
                          <div className="flex items-center gap-4 text-xs text-gray-500">
                            <span>Eficiência: {stat.efficiency.toFixed(1)}%</span>
                            <span>Atualizado: {new Date().toLocaleDateString("pt-BR")}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </TooltipProvider>
  )
}
