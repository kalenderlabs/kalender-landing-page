"use client"

import { useState } from "react"
import { Plus, Edit, Trash2, Clock, DollarSign } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DashboardLayout } from "@/components/dashboard/layout"
import { useTranslation } from "@/hooks/useTranslation"

export default function ServicesPage() {
  const { t } = useTranslation()

  // Mock services data
  const services = [
    {
      id: 1,
      name: "Corte Feminino",
      description: "Corte de cabelo feminino com lavagem",
      duration: 60,
      price: 45.0,
      category: "Cabelo",
      active: true,
    },
    {
      id: 2,
      name: "Corte Masculino",
      description: "Corte de cabelo masculino tradicional",
      duration: 30,
      price: 25.0,
      category: "Cabelo",
      active: true,
    },
    {
      id: 3,
      name: "Escova",
      description: "Escova modeladora com finalização",
      duration: 45,
      price: 35.0,
      category: "Cabelo",
      active: true,
    },
    {
      id: 4,
      name: "Manicure",
      description: "Cuidados completos para as unhas das mãos",
      duration: 45,
      price: 20.0,
      category: "Unhas",
      active: true,
    },
    {
      id: 5,
      name: "Pedicure",
      description: "Cuidados completos para as unhas dos pés",
      duration: 60,
      price: 25.0,
      category: "Unhas",
      active: true,
    },
    {
      id: 6,
      name: "Limpeza de Pele",
      description: "Limpeza facial profunda com extração",
      duration: 90,
      price: 80.0,
      category: "Estética",
      active: false,
    },
  ]

  const categories = ["Todos", "Cabelo", "Unhas", "Estética"]
  const [selectedCategory, setSelectedCategory] = useState("Todos")

  const filteredServices = services.filter(
    (service) => selectedCategory === "Todos" || service.category === selectedCategory,
  )

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{t("sidebar.services")}</h1>
              <p className="text-gray-600">Gerencie os serviços oferecidos pelo seu estabelecimento</p>
            </div>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="h-4 w-4 mr-2" />
              Novo Serviço
            </Button>
          </div>

          {/* Category Filter */}
          <div className="flex space-x-2 mb-6">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className="text-sm"
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Total de Serviços</CardTitle>
                <div className="bg-primary/10 p-2 rounded-lg">
                  <Plus className="h-4 w-4 text-primary" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{services.length}</div>
                <p className="text-xs text-gray-600">{services.filter((s) => s.active).length} ativos</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Preço Médio</CardTitle>
                <div className="bg-secondary/10 p-2 rounded-lg">
                  <DollarSign className="h-4 w-4 text-secondary" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  R$ {(services.reduce((acc, s) => acc + s.price, 0) / services.length).toFixed(2)}
                </div>
                <p className="text-xs text-gray-600">Média geral</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Duração Média</CardTitle>
                <div className="bg-accent/10 p-2 rounded-lg">
                  <Clock className="h-4 w-4 text-accent" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {Math.round(services.reduce((acc, s) => acc + s.duration, 0) / services.length)}min
                </div>
                <p className="text-xs text-gray-600">Tempo médio</p>
              </CardContent>
            </Card>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service) => (
              <Card key={service.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{service.name}</CardTitle>
                      <Badge variant="secondary" className="mt-1">
                        {service.category}
                      </Badge>
                    </div>
                    <Badge
                      variant={service.active ? "default" : "secondary"}
                      className={service.active ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}
                    >
                      {service.active ? t("common.active") : t("common.inactive")}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm mb-4">{service.description}</p>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{service.duration}min</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <DollarSign className="h-4 w-4 text-gray-400" />
                      <span className="text-lg font-semibold text-gray-900">R$ {service.price.toFixed(2)}</span>
                    </div>
                  </div>

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
