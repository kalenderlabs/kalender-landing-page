"use client"

import { useState } from "react"
import {
  Building2,
  Users,
  CreditCard,
  Globe,
  Shield,
  Palette,
  Save,
  Plus,
  Edit,
  Trash2,
  Crown,
  Mail,
  MapPin,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DashboardLayout } from "@/components/dashboard/layout"

interface TenantUser {
  id: string
  name: string
  email: string
  role: "admin" | "manager" | "staff"
  avatar: string
  active: boolean
  lastLogin: string
}

export default function TenantSettingsPage() {
  const [activeTab, setActiveTab] = useState("general")
  const [isUserDialogOpen, setIsUserDialogOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<TenantUser | null>(null)

  // Mock tenant data
  const [tenantData, setTenantData] = useState({
    name: "Beleza Milena",
    slug: "beleza-milena",
    description: "Salão de beleza especializado em cortes modernos e tratamentos estéticos",
    email: "contato@belezamilena.com",
    phone: "(11) 99999-9999",
    address: "Rua das Flores, 123 - Vila Madalena, São Paulo - SP",
    website: "https://belezamilena.com",
    logo: "/kalender-logo.png",
    plan: "Professional",
    maxUsers: 10,
    currentUsers: 4,
  })

  const [tenantUsers, setTenantUsers] = useState<TenantUser[]>([
    {
      id: "1",
      name: "João Silva",
      email: "joao@belezamilena.com",
      role: "admin",
      avatar: "/placeholder.svg?height=40&width=40",
      active: true,
      lastLogin: "2024-01-18 14:30",
    },
    {
      id: "2",
      name: "Maria Santos",
      email: "maria@belezamilena.com",
      role: "manager",
      avatar: "/placeholder.svg?height=40&width=40",
      active: true,
      lastLogin: "2024-01-18 09:15",
    },
    {
      id: "3",
      name: "Ana Costa",
      email: "ana@belezamilena.com",
      role: "staff",
      avatar: "/placeholder.svg?height=40&width=40",
      active: false,
      lastLogin: "2024-01-15 16:45",
    },
  ])

  const handleAddUser = () => {
    setEditingUser(null)
    setIsUserDialogOpen(true)
  }

  const handleEditUser = (user: TenantUser) => {
    setEditingUser(user)
    setIsUserDialogOpen(true)
  }

  const getRoleBadge = (role: string) => {
    const roleConfig = {
      admin: { label: "Administrador", className: "bg-red-100 text-red-700 border-red-200" },
      manager: { label: "Gerente", className: "bg-primary/10 text-primary border-primary/20" },
      staff: { label: "Funcionário", className: "bg-gray-100 text-gray-700 border-gray-200" },
    }
    const config = roleConfig[role as keyof typeof roleConfig]
    return (
      <Badge variant="outline" className={config.className}>
        {config.label}
      </Badge>
    )
  }

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="max-w-6xl mx-auto">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Configurações do Estabelecimento</h1>
                <p className="text-gray-600">Gerencie as configurações e usuários do seu estabelecimento</p>
              </div>
              <div className="flex items-center space-x-2">
                <Badge className="bg-primary text-white font-semibold">Plano {tenantData.plan}</Badge>
                <Button className="bg-primary hover:bg-primary/90 text-white font-semibold">
                  <Save className="h-4 w-4 mr-2" />
                  Salvar Alterações
                </Button>
              </div>
            </div>
          </div>

          {/* Tenant Info Card */}
          <Card className="mb-8 bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="bg-white p-3 rounded-full shadow-md">
                  <img src={tenantData.logo || "/placeholder.svg"} alt="Logo" className="h-12 w-12" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900">{tenantData.name}</h2>
                  <p className="text-gray-600 font-medium">kalender.app/{tenantData.slug}</p>
                  <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                    <span className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {tenantData.currentUsers}/{tenantData.maxUsers} usuários
                    </span>
                    <span className="flex items-center">
                      <Crown className="h-4 w-4 mr-1" />
                      Plano {tenantData.plan}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Settings Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-6 bg-gray-100">
              <TabsTrigger value="general" className="data-[state=active]:bg-white data-[state=active]:text-primary">
                <Building2 className="h-4 w-4 mr-2" />
                Geral
              </TabsTrigger>
              <TabsTrigger value="units" className="data-[state=active]:bg-white data-[state=active]:text-primary">
                <MapPin className="h-4 w-4 mr-2" />
                Unidades
              </TabsTrigger>
              <TabsTrigger value="users" className="data-[state=active]:bg-white data-[state=active]:text-primary">
                <Users className="h-4 w-4 mr-2" />
                Usuários
              </TabsTrigger>
              <TabsTrigger value="billing" className="data-[state=active]:bg-white data-[state=active]:text-primary">
                <CreditCard className="h-4 w-4 mr-2" />
                Planos
              </TabsTrigger>
              <TabsTrigger
                value="integrations"
                className="data-[state=active]:bg-white data-[state=active]:text-primary"
              >
                <Globe className="h-4 w-4 mr-2" />
                Integrações
              </TabsTrigger>
              <TabsTrigger value="security" className="data-[state=active]:bg-white data-[state=active]:text-primary">
                <Shield className="h-4 w-4 mr-2" />
                Segurança
              </TabsTrigger>
            </TabsList>

            {/* General Settings */}
            <TabsContent value="general" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="bg-white border-gray-200">
                  <CardHeader>
                    <CardTitle className="flex items-center text-gray-900">
                      <Building2 className="h-5 w-5 mr-2 text-primary" />
                      Informações Básicas
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="tenantName" className="font-semibold">
                        Nome do Estabelecimento
                      </Label>
                      <Input id="tenantName" value={tenantData.name} className="border-gray-300" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="tenantSlug" className="font-semibold">
                        URL Personalizada
                      </Label>
                      <div className="flex">
                        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                          kalender.app/
                        </span>
                        <Input id="tenantSlug" value={tenantData.slug} className="rounded-l-none border-gray-300" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="tenantDescription" className="font-semibold">
                        Descrição
                      </Label>
                      <Textarea
                        id="tenantDescription"
                        value={tenantData.description}
                        rows={3}
                        className="border-gray-300"
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white border-gray-200">
                  <CardHeader>
                    <CardTitle className="flex items-center text-gray-900">
                      <Mail className="h-5 w-5 mr-2 text-secondary" />
                      Informações de Contato
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="tenantEmail" className="font-semibold">
                        E-mail
                      </Label>
                      <Input id="tenantEmail" type="email" value={tenantData.email} className="border-gray-300" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="tenantPhone" className="font-semibold">
                        Telefone/WhatsApp
                      </Label>
                      <Input id="tenantPhone" value={tenantData.phone} className="border-gray-300" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="tenantAddress" className="font-semibold">
                        Endereço
                      </Label>
                      <Textarea id="tenantAddress" value={tenantData.address} rows={2} className="border-gray-300" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="tenantWebsite" className="font-semibold">
                        Website
                      </Label>
                      <Input id="tenantWebsite" value={tenantData.website} className="border-gray-300" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-white border-gray-200">
                <CardHeader>
                  <CardTitle className="flex items-center text-gray-900">
                    <Palette className="h-5 w-5 mr-2 text-accent" />
                    Personalização
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <Label className="font-semibold">Logo do Estabelecimento</Label>
                      <div className="flex items-center space-x-4">
                        <img
                          src={tenantData.logo || "/placeholder.svg"}
                          alt="Logo atual"
                          className="h-16 w-16 rounded-lg border border-gray-300"
                        />
                        <Button variant="outline" className="border-gray-300 text-gray-600 hover:bg-gray-50">
                          Alterar Logo
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="font-semibold">Cor Principal</Label>
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-primary rounded border border-gray-300"></div>
                        <Input value="#0EA5E9" className="border-gray-300" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="font-semibold">Cor Secundária</Label>
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-secondary rounded border border-gray-300"></div>
                        <Input value="#3B82F6" className="border-gray-300" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Units Management */}
            <TabsContent value="units" className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Gerenciar Unidades</h3>
                  <p className="text-gray-600">Configure e gerencie as unidades do seu estabelecimento</p>
                </div>
                <Button className="bg-primary hover:bg-primary/90 text-white font-semibold">
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar Unidade
                </Button>
              </div>

              <div className="grid gap-6">
                <Card className="bg-white border-gray-200">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                          <MapPin className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900">Vila Madalena</h4>
                          <p className="text-sm text-gray-600">Rua das Flores, 123 - Vila Madalena, São Paulo - SP</p>
                          <p className="text-xs text-gray-500">(11) 99999-9999 • vilamadalena@belezamilena.com</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className="bg-emerald-100 text-emerald-700">Ativa</Badge>
                        <Button variant="ghost" size="icon" className="text-gray-500 hover:text-primary">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Profissionais:</span>
                        <span className="ml-1 font-semibold">8</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Serviços:</span>
                        <span className="ml-1 font-semibold">15</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Agendamentos hoje:</span>
                        <span className="ml-1 font-semibold">23</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Receita mensal:</span>
                        <span className="ml-1 font-semibold text-green-600">R$ 52.450</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white border-gray-200">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                          <MapPin className="h-6 w-6 text-secondary" />
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900">Jardins</h4>
                          <p className="text-sm text-gray-600">Av. Paulista, 456 - Jardins, São Paulo - SP</p>
                          <p className="text-xs text-gray-500">(11) 88888-8888 • jardins@belezamilena.com</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className="bg-emerald-100 text-emerald-700">Ativa</Badge>
                        <Button variant="ghost" size="icon" className="text-gray-500 hover:text-primary">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Profissionais:</span>
                        <span className="ml-1 font-semibold">6</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Serviços:</span>
                        <span className="ml-1 font-semibold">12</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Agendamentos hoje:</span>
                        <span className="ml-1 font-semibold">18</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Receita mensal:</span>
                        <span className="ml-1 font-semibold text-green-600">R$ 37.300</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-gray-50 border-gray-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-gray-900">Limite de Unidades</h4>
                      <p className="text-sm text-gray-600">Você está usando 2 de 5 unidades disponíveis no seu plano</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">2/5</div>
                      <Button variant="outline" className="mt-2 border-primary/20 text-primary hover:bg-primary/5">
                        Aumentar Limite
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Users Management */}
            <TabsContent value="users" className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Gerenciar Usuários</h3>
                  <p className="text-gray-600">Controle quem tem acesso ao sistema do seu estabelecimento</p>
                </div>
                <Button onClick={handleAddUser} className="bg-primary hover:bg-primary/90 text-white font-semibold">
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar Usuário
                </Button>
              </div>

              <div className="grid gap-4">
                {tenantUsers.map((user) => (
                  <Card key={user.id} className={`bg-white border-gray-200 ${!user.active ? "opacity-60" : ""}`}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                            <AvatarFallback className="bg-primary text-white font-semibold">
                              {user.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center space-x-2 mb-1">
                              <h4 className="font-bold text-gray-900">{user.name}</h4>
                              {getRoleBadge(user.role)}
                              {user.role === "admin" && <Crown className="h-4 w-4 text-yellow-500" />}
                            </div>
                            <p className="text-sm text-gray-600">{user.email}</p>
                            <p className="text-xs text-gray-500">
                              Último acesso: {new Date(user.lastLogin).toLocaleString("pt-BR")}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge
                            variant={user.active ? "default" : "secondary"}
                            className={user.active ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-600"}
                          >
                            {user.active ? "Ativo" : "Inativo"}
                          </Badge>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEditUser(user)}
                            className="text-gray-500 hover:text-primary"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          {user.role !== "admin" && (
                            <Button variant="ghost" size="icon" className="text-gray-500 hover:text-red-500">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="bg-gray-50 border-gray-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-gray-900">Limite de Usuários</h4>
                      <p className="text-sm text-gray-600">
                        Você está usando {tenantData.currentUsers} de {tenantData.maxUsers} usuários disponíveis
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">
                        {tenantData.currentUsers}/{tenantData.maxUsers}
                      </div>
                      <Button variant="outline" className="mt-2 border-primary/20 text-primary hover:bg-primary/5">
                        Aumentar Limite
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Billing */}
            <TabsContent value="billing" className="space-y-6">
              <Card className="bg-white border-gray-200">
                <CardHeader>
                  <CardTitle className="flex items-center text-gray-900">
                    <CreditCard className="h-5 w-5 mr-2 text-primary" />
                    Plano Atual
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between p-6 bg-primary/5 rounded-lg border border-primary/20">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">Plano {tenantData.plan}</h3>
                      <p className="text-gray-600">Até {tenantData.maxUsers} usuários</p>
                      <p className="text-sm text-gray-500 mt-2">Próxima cobrança: 18 de Fevereiro, 2024</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">R$ 199,90</div>
                      <div className="text-sm text-gray-500">por mês</div>
                      <Button className="mt-2 bg-primary hover:bg-primary/90 text-white">Alterar Plano</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Integrations */}
            <TabsContent value="integrations" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="bg-white border-gray-200">
                  <CardHeader>
                    <CardTitle className="text-gray-900">WhatsApp Business</CardTitle>
                    <CardDescription>Integração com WhatsApp para confirmações automáticas</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                        <span className="text-sm font-semibold text-emerald-700">Conectado</span>
                      </div>
                      <Switch checked={true} />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white border-gray-200">
                  <CardHeader>
                    <CardTitle className="text-gray-900">Google Calendar</CardTitle>
                    <CardDescription>Sincronização automática com Google Calendar</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <span className="text-sm font-semibold text-red-700">Desconectado</span>
                      </div>
                      <Switch checked={false} />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Security */}
            <TabsContent value="security" className="space-y-6">
              <Card className="bg-white border-gray-200">
                <CardHeader>
                  <CardTitle className="flex items-center text-gray-900">
                    <Shield className="h-5 w-5 mr-2 text-primary" />
                    Configurações de Segurança
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-gray-900">Autenticação de Dois Fatores</h4>
                      <p className="text-sm text-gray-600">Adicione uma camada extra de segurança</p>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-gray-900">Login por IP</h4>
                      <p className="text-sm text-gray-600">Restringir acesso por endereços IP específicos</p>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-gray-900">Sessões Ativas</h4>
                      <p className="text-sm text-gray-600">Gerenciar dispositivos conectados</p>
                    </div>
                    <Button variant="outline" className="border-gray-300 text-gray-600 hover:bg-gray-50">
                      Ver Sessões
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Add/Edit User Dialog */}
      <Dialog open={isUserDialogOpen} onOpenChange={setIsUserDialogOpen}>
        <DialogContent className="sm:max-w-[425px] bg-white border-gray-300">
          <DialogHeader>
            <DialogTitle className="text-gray-900 font-bold">
              {editingUser ? "Editar Usuário" : "Adicionar Usuário"}
            </DialogTitle>
            <DialogDescription className="text-gray-600 font-light">
              Configure as informações e permissões do usuário
            </DialogDescription>
          </DialogHeader>
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="userName" className="font-semibold">
                Nome Completo *
              </Label>
              <Input id="userName" placeholder="Ex: Maria Silva" defaultValue={editingUser?.name} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="userEmail" className="font-semibold">
                E-mail *
              </Label>
              <Input id="userEmail" type="email" placeholder="maria@email.com" defaultValue={editingUser?.email} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="userRole" className="font-semibold">
                Função *
              </Label>
              <Select defaultValue={editingUser?.role || "staff"}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a função" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Administrador - Acesso total</SelectItem>
                  <SelectItem value="manager">Gerente - Gestão operacional</SelectItem>
                  <SelectItem value="staff">Funcionário - Acesso básico</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-end space-x-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsUserDialogOpen(false)}
                className="border-gray-300 text-gray-600 hover:bg-gray-100"
              >
                Cancelar
              </Button>
              <Button type="submit" className="bg-primary hover:bg-primary/90 text-white font-semibold">
                {editingUser ? "Salvar Alterações" : "Adicionar Usuário"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  )
}
