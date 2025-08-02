"use client"

import { useState } from "react"
import { Plus, Edit, Trash2, Clock, DollarSign, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { DashboardLayout } from "@/components/dashboard/layout"

interface Service {
  id: string
  name: string
  description: string
  duration: number
  price: number
  category: string
  active: boolean
}

interface ServicePackage {
  id: string
  name: string
  description: string
  serviceIds: string[]
  totalDuration: number
  originalPrice: number
  packagePrice: number
  discount: number
  active: boolean
  tenantId: string
}

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([
    {
      id: "1",
      name: "Corte de Cabelo",
      description: "Corte personalizado com lavagem e finalização",
      duration: 60,
      price: 50,
      category: "Cabelo",
      active: true,
    },
    {
      id: "2",
      name: "Manicure",
      description: "Cuidados completos para as unhas das mãos",
      duration: 45,
      price: 25,
      category: "Unhas",
      active: true,
    },
    {
      id: "3",
      name: "Massagem Relaxante",
      description: "Massagem terapêutica para alívio do estresse",
      duration: 90,
      price: 80,
      category: "Bem-estar",
      active: false,
    },
  ])

  // Adicionar estado para pacotes
  const [packages, setPackages] = useState<ServicePackage[]>([])

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingService, setEditingService] = useState<Service | null>(null)

  const handleAddService = () => {
    setEditingService(null)
    setIsDialogOpen(true)
  }

  const handleEditService = (service: Service) => {
    setEditingService(service)
    setIsDialogOpen(true)
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price)
  }

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    if (hours > 0) {
      return `${hours}h${mins > 0 ? ` ${mins}min` : ""}`
    }
    return `${mins}min`
  }

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="max-w-6xl mx-auto">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Gerenciar Serviços</h1>
                <p className="text-gray-600">Configure os serviços que seus clientes podem agendar</p>
              </div>
              <Button onClick={handleAddService} className="bg-primary hover:bg-primary/90 text-white font-semibold">
                <Plus className="h-4 w-4 mr-2" />
                Novo Serviço
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-white border-gray-200 hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Total de Serviços</CardTitle>
                <div className="bg-primary/10 p-2 rounded-lg">
                  <Users className="h-4 w-4 text-primary" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{services.length}</div>
                <p className="text-xs text-gray-500">{services.filter((s) => s.active).length} ativos</p>
              </CardContent>
            </Card>

            <Card className="bg-white border-gray-200 hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Preço Médio</CardTitle>
                <div className="bg-secondary/10 p-2 rounded-lg">
                  <DollarSign className="h-4 w-4 text-secondary" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">
                  {formatPrice(services.reduce((acc, s) => acc + s.price, 0) / services.length)}
                </div>
                <p className="text-xs text-gray-500">Por serviço</p>
              </CardContent>
            </Card>

            <Card className="bg-white border-gray-200 hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Duração Média</CardTitle>
                <div className="bg-accent/10 p-2 rounded-lg">
                  <Clock className="h-4 w-4 text-accent" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">
                  {formatDuration(services.reduce((acc, s) => acc + s.duration, 0) / services.length)}
                </div>
                <p className="text-xs text-gray-500">Por serviço</p>
              </CardContent>
            </Card>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <Card
                key={service.id}
                className={`bg-white border-gray-200 hover:shadow-md transition-shadow ${!service.active ? "opacity-60" : ""}`}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg text-gray-900 font-bold">{service.name}</CardTitle>
                      <Badge
                        variant={service.active ? "default" : "secondary"}
                        className={`mt-1 ${service.active ? "bg-primary text-white" : "bg-gray-200 text-gray-600"}`}
                      >
                        {service.category}
                      </Badge>
                    </div>
                    <div className="flex space-x-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEditService(service)}
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
                <CardContent>
                  <p className="text-gray-600 text-sm mb-4 font-light">{service.description}</p>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="h-4 w-4 mr-1" />
                        <span className="font-medium">{formatDuration(service.duration)}</span>
                      </div>
                      <div className="flex items-center text-sm font-bold text-primary">
                        <DollarSign className="h-4 w-4 mr-1" />
                        {formatPrice(service.price)}
                      </div>
                    </div>
                    <Badge
                      variant={service.active ? "default" : "secondary"}
                      className={service.active ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-600"}
                    >
                      {service.active ? "Ativo" : "Inativo"}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Empty State */}
          {services.length === 0 && (
            <Card className="text-center py-12 bg-white border-gray-200">
              <CardContent>
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Nenhum serviço cadastrado</h3>
                <p className="text-gray-600 mb-4 font-light">
                  Comece adicionando os serviços que seus clientes podem agendar
                </p>
                <Button onClick={handleAddService} className="bg-primary hover:bg-primary/90 text-white font-semibold">
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar Primeiro Serviço
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Add/Edit Service Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px] bg-white border-gray-300">
          <DialogHeader>
            <DialogTitle className="text-gray-900 font-bold">
              {editingService ? "Editar Serviço" : "Novo Serviço"}
            </DialogTitle>
            <DialogDescription className="text-gray-600 font-light">
              Configure as informações do serviço que aparecerão para seus clientes
            </DialogDescription>
          </DialogHeader>
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="serviceName" className="font-semibold">
                Nome do Serviço *
              </Label>
              <Input id="serviceName" placeholder="Ex: Corte de Cabelo" defaultValue={editingService?.name} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="serviceCategory" className="font-semibold">
                Categoria
              </Label>
              <Input
                id="serviceCategory"
                placeholder="Ex: Cabelo, Unhas, Estética"
                defaultValue={editingService?.category}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="serviceDescription" className="font-semibold">
                Descrição
              </Label>
              <Textarea
                id="serviceDescription"
                placeholder="Descreva o serviço para seus clientes"
                defaultValue={editingService?.description}
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="serviceDuration" className="font-semibold">
                  Duração (minutos) *
                </Label>
                <Input id="serviceDuration" type="number" placeholder="60" defaultValue={editingService?.duration} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="servicePrice" className="font-semibold">
                  Preço (R$) *
                </Label>
                <Input
                  id="servicePrice"
                  type="number"
                  step="0.01"
                  placeholder="50.00"
                  defaultValue={editingService?.price}
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
                {editingService ? "Salvar Alterações" : "Criar Serviço"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  )
}
