"use client"

import { useState, useEffect } from "react"
import {
  Plus,
  Link2,
  Users,
  Briefcase,
  Calendar,
  Search,
  Filter,
  MoreHorizontal,
  Copy,
  Edit,
  Trash2,
  ExternalLink,
  TrendingUp,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import {
  EnhancedTooltip,
  EnhancedTooltipContent,
  EnhancedTooltipTrigger,
  EnhancedTooltipProvider,
} from "@/components/ui/enhanced-tooltip"

import { LinkBuilder } from "@/components/custom-links/link-builder"
import type { CustomLink } from "@/lib/custom-links"

interface AppointmentLinksProps {
  tenantId: string
  locale: string
}

const AppointmentLinks = ({ tenantId, locale }: AppointmentLinksProps) => {
  const [showLinkBuilder, setShowLinkBuilder] = useState(false)
  const [editingLink, setEditingLink] = useState<CustomLink | null>(null)
  const [links, setLinks] = useState<CustomLink[]>([])
  const [filteredLinks, setFilteredLinks] = useState<CustomLink[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [isLoading, setIsLoading] = useState(false)

  // Mock data - replace with actual API calls
  useEffect(() => {
    const mockLinks: CustomLink[] = [
      {
        id: "1",
        name: "Agendamento Rápido - Ana Costa",
        slug: "ana-costa-rapido",
        type: "professional",
        title: "Agende com Ana Costa",
        description: "Especialista em cortes femininos e coloração",
        tenantId,
        targetIds: ["ana-costa"],
        urlPattern: "/{locale}/{tenant}/book/{slug}",
        status: "active",
        branding: {
          primaryColor: "#3B82F6",
          secondaryColor: "#1E40AF",
          backgroundColor: "#F8FAFC",
        },
        behavior: {
          requireAuth: false,
          allowGuestBooking: true,
          showPricing: true,
          showAvailability: true,
          autoConfirm: false,
          sendNotifications: true,
        },
        accessControl: {
          isPublic: true,
          passwordProtected: false,
          currentUses: 47,
          maxUses: 100,
        },
        analytics: {
          trackViews: true,
          trackConversions: true,
          views: 156,
          conversions: 47,
        },
        createdAt: new Date("2024-01-15"),
        updatedAt: new Date("2024-01-20"),
      },
      {
        id: "2",
        name: "Pacote Beleza Completa",
        slug: "pacote-beleza-completa",
        type: "package",
        title: "Pacote Beleza Completa",
        description: "Corte + Escova + Manicure com desconto especial",
        tenantId,
        targetIds: ["package-1"],
        urlPattern: "/{locale}/{tenant}/book/{slug}",
        status: "active",
        branding: {
          primaryColor: "#10B981",
          secondaryColor: "#059669",
          backgroundColor: "#F0FDF4",
        },
        behavior: {
          requireAuth: false,
          allowGuestBooking: true,
          showPricing: true,
          showAvailability: true,
          autoConfirm: true,
          sendNotifications: true,
        },
        accessControl: {
          isPublic: true,
          passwordProtected: false,
          currentUses: 23,
          maxUses: 50,
        },
        analytics: {
          trackViews: true,
          trackConversions: true,
          views: 89,
          conversions: 23,
        },
        createdAt: new Date("2024-01-10"),
        updatedAt: new Date("2024-01-18"),
      },
    ]
    setLinks(mockLinks)
    setFilteredLinks(mockLinks)
  }, [tenantId])

  useEffect(() => {
    let filtered = links

    if (searchTerm) {
      filtered = filtered.filter(
        (link) =>
          link.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          link.slug.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (filterType !== "all") {
      filtered = filtered.filter((link) => link.type === filterType)
    }

    setFilteredLinks(filtered)
  }, [links, searchTerm, filterType])

  const handleCreateLink = () => {
    setEditingLink(null)
    setShowLinkBuilder(true)
  }

  const handleEditLink = (link: CustomLink) => {
    setEditingLink(link)
    setShowLinkBuilder(true)
  }

  const handleCopyLink = (link: CustomLink) => {
    const url = `${window.location.origin}/${locale}/${tenantId}/book/${link.slug}`
    navigator.clipboard.writeText(url)
    // Add toast notification here
  }

  const handleDeleteLink = async (linkId: string) => {
    if (confirm("Tem certeza que deseja excluir este link?")) {
      // API call to delete link
      setLinks(links.filter((link) => link.id !== linkId))
    }
  }

  const getTypeIcon = (type: CustomLink["type"]) => {
    const icons = {
      professional: Users,
      service: Briefcase,
      package: Calendar,
      booking: Link2,
    }
    const Icon = icons[type]
    return <Icon className="h-4 w-4" />
  }

  const getTypeLabel = (type: CustomLink["type"]) => {
    const labels = {
      professional: "Profissional",
      service: "Serviço",
      package: "Pacote",
      booking: "Agendamento",
    }
    return labels[type]
  }

  const getStatusBadge = (status: CustomLink["status"]) => {
    const variants = {
      active: { variant: "default" as const, label: "Ativo" },
      inactive: { variant: "secondary" as const, label: "Inativo" },
      draft: { variant: "outline" as const, label: "Rascunho" },
    }
    const config = variants[status]
    return <Badge variant={config.variant}>{config.label}</Badge>
  }

  const calculateConversionRate = (link: CustomLink) => {
    if (!link.analytics?.views || link.analytics.views === 0) return 0
    return Math.round((link.analytics.conversions / link.analytics.views) * 100)
  }

  return (
    <EnhancedTooltipProvider>
      <div className="space-y-6">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Links Personalizados</h2>
            <p className="text-gray-600">Crie e gerencie links customizados para seus serviços</p>
          </div>

          <Dialog open={showLinkBuilder} onOpenChange={setShowLinkBuilder}>
            <DialogTrigger asChild>
              <Button
                onClick={handleCreateLink}
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
              >
                <Plus className="h-5 w-5 mr-2" />
                Criar Link Personalizado
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingLink ? "Editar Link Personalizado" : "Criar Link Personalizado"}</DialogTitle>
              </DialogHeader>
              <LinkBuilder
                tenantId={tenantId}
                locale={locale}
                link={editingLink || undefined}
                onSave={(link) => {
                  setShowLinkBuilder(false)
                  setEditingLink(null)
                  // Update links list
                }}
                onCancel={() => {
                  setShowLinkBuilder(false)
                  setEditingLink(null)
                }}
              />
            </DialogContent>
          </Dialog>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-700">Total de Links</p>
                  <p className="text-2xl font-bold text-blue-900">{links.length}</p>
                </div>
                <Link2 className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-700">Links Ativos</p>
                  <p className="text-2xl font-bold text-green-900">
                    {links.filter((link) => link.status === "active").length}
                  </p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-purple-700">Total de Visualizações</p>
                  <p className="text-2xl font-bold text-purple-900">
                    {links.reduce((sum, link) => sum + (link.analytics?.views || 0), 0)}
                  </p>
                </div>
                <ExternalLink className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-orange-700">Conversões</p>
                  <p className="text-2xl font-bold text-orange-900">
                    {links.reduce((sum, link) => sum + (link.analytics?.conversions || 0), 0)}
                  </p>
                </div>
                <Calendar className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Buscar links por nome ou slug..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-full sm:w-[200px] transition-all duration-200 focus:ring-2 focus:ring-blue-500">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filtrar por tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os tipos</SelectItem>
                  <SelectItem value="professional">Profissional</SelectItem>
                  <SelectItem value="service">Serviço</SelectItem>
                  <SelectItem value="package">Pacote</SelectItem>
                  <SelectItem value="booking">Agendamento</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Links Grid */}
        {filteredLinks.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <div className="text-gray-500">
                <Link2 className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <h3 className="text-xl font-semibold mb-2">
                  {searchTerm || filterType !== "all" ? "Nenhum link encontrado" : "Nenhum link criado ainda"}
                </h3>
                <p className="mb-6 text-gray-600">
                  {searchTerm || filterType !== "all"
                    ? "Tente ajustar os filtros de busca"
                    : "Crie seu primeiro link personalizado para começar"}
                </p>
                {!searchTerm && filterType === "all" && (
                  <Button
                    onClick={handleCreateLink}
                    size="lg"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
                  >
                    <Plus className="h-5 w-5 mr-2" />
                    Criar Primeiro Link
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredLinks.map((link) => (
              <Card
                key={link.id}
                className="group hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1 border-l-4"
                style={{ borderLeftColor: link.branding.primaryColor }}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-2">
                        {getTypeIcon(link.type)}
                        <Badge variant="outline" className="text-xs">
                          {getTypeLabel(link.type)}
                        </Badge>
                        {getStatusBadge(link.status)}
                      </div>
                      <CardTitle className="text-lg truncate group-hover:text-blue-600 transition-colors">
                        {link.name}
                      </CardTitle>
                      <p className="text-sm text-gray-600 mt-1">/{link.slug}</p>
                    </div>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-gray-100"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuItem onClick={() => handleCopyLink(link)}>
                          <Copy className="h-4 w-4 mr-2" />
                          Copiar Link
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Visualizar
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEditLink(link)}>
                          <Edit className="h-4 w-4 mr-2" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDeleteLink(link.id)}
                          className="text-red-600 focus:text-red-600"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Excluir
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {link.description && <p className="text-sm text-gray-600 line-clamp-2">{link.description}</p>}

                  {/* Analytics */}
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div className="bg-blue-50 rounded-lg p-2">
                      <p className="text-xs text-blue-600 font-medium">Visualizações</p>
                      <p className="text-lg font-bold text-blue-900">{link.analytics?.views || 0}</p>
                    </div>
                    <div className="bg-green-50 rounded-lg p-2">
                      <p className="text-xs text-green-600 font-medium">Conversões</p>
                      <p className="text-lg font-bold text-green-900">{link.analytics?.conversions || 0}</p>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-2">
                      <p className="text-xs text-purple-600 font-medium">Taxa</p>
                      <p className="text-lg font-bold text-purple-900">{calculateConversionRate(link)}%</p>
                    </div>
                  </div>

                  {/* Usage Progress */}
                  {link.accessControl.maxUses && (
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs text-gray-600">
                        <span>
                          Usos: {link.accessControl.currentUses}/{link.accessControl.maxUses}
                        </span>
                        <span>{Math.round((link.accessControl.currentUses / link.accessControl.maxUses) * 100)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                          style={{
                            width: `${Math.min((link.accessControl.currentUses / link.accessControl.maxUses) * 100, 100)}%`,
                          }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex space-x-2 pt-2 border-t">
                    <EnhancedTooltip>
                      <EnhancedTooltipTrigger asChild>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleCopyLink(link)}
                          className="flex-1 hover:bg-blue-50 hover:border-blue-300 transition-all duration-200"
                        >
                          <Copy className="h-3 w-3 mr-1" />
                          Copiar
                        </Button>
                      </EnhancedTooltipTrigger>
                      <EnhancedTooltipContent>Copiar link para área de transferência</EnhancedTooltipContent>
                    </EnhancedTooltip>

                    <EnhancedTooltip>
                      <EnhancedTooltipTrigger asChild>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEditLink(link)}
                          className="flex-1 hover:bg-green-50 hover:border-green-300 transition-all duration-200"
                        >
                          <Edit className="h-3 w-3 mr-1" />
                          Editar
                        </Button>
                      </EnhancedTooltipTrigger>
                      <EnhancedTooltipContent>Editar configurações do link</EnhancedTooltipContent>
                    </EnhancedTooltip>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </EnhancedTooltipProvider>
  )
}

export { AppointmentLinks }
export default AppointmentLinks
