"use client"

import { useState, useEffect } from "react"
import { Plus, Search, MoreHorizontal, Eye, Edit, Trash2, Copy, BarChart3 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

import type { CustomLink } from "@/lib/custom-links"
import { customLinksService } from "@/lib/custom-links-api"
import { LinkBuilder } from "./link-builder"

interface LinksManagerProps {
  tenantId: string
  locale: string
}

export function LinksManager({ tenantId, locale }: LinksManagerProps) {
  const [links, setLinks] = useState<CustomLink[]>([])
  const [filteredLinks, setFilteredLinks] = useState<CustomLink[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [typeFilter, setTypeFilter] = useState<string>("all")
  const [showBuilder, setShowBuilder] = useState(false)
  const [editingLink, setEditingLink] = useState<CustomLink | null>(null)

  useEffect(() => {
    loadLinks()
  }, [tenantId])

  useEffect(() => {
    filterLinks()
  }, [links, searchTerm, statusFilter, typeFilter])

  const loadLinks = async () => {
    setIsLoading(true)
    try {
      const data = await customLinksService.getLinks(tenantId)
      setLinks(data)
    } catch (error) {
      console.error("Failed to load links:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const filterLinks = () => {
    let filtered = links

    if (searchTerm) {
      filtered = filtered.filter(
        (link) =>
          link.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          link.slug.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((link) => link.status === statusFilter)
    }

    if (typeFilter !== "all") {
      filtered = filtered.filter((link) => link.type === typeFilter)
    }

    setFilteredLinks(filtered)
  }

  const handleCreateLink = () => {
    setEditingLink(null)
    setShowBuilder(true)
  }

  const handleEditLink = (link: CustomLink) => {
    setEditingLink(link)
    setShowBuilder(true)
  }

  const handleDeleteLink = async (linkId: string) => {
    if (confirm("Tem certeza que deseja excluir este link?")) {
      try {
        await customLinksService.deleteLink(tenantId, linkId)
        await loadLinks()
      } catch (error) {
        console.error("Failed to delete link:", error)
      }
    }
  }

  const handleCopyLink = (link: CustomLink) => {
    const url = `${window.location.origin}/${locale}/${tenantId}/book/${link.slug}`
    navigator.clipboard.writeText(url)
  }

  const handleSaveLink = async (link: CustomLink) => {
    setShowBuilder(false)
    setEditingLink(null)
    await loadLinks()
  }

  const getStatusBadge = (status: CustomLink["status"]) => {
    const variants = {
      active: "default",
      inactive: "secondary",
      draft: "outline",
    } as const

    return (
      <Badge variant={variants[status]}>
        {status === "active" ? "Ativo" : status === "inactive" ? "Inativo" : "Rascunho"}
      </Badge>
    )
  }

  const getTypeBadge = (type: CustomLink["type"]) => {
    const labels = {
      professional: "Profissional",
      service: "Serviço",
      package: "Pacote",
      booking: "Agendamento",
    }

    return <Badge variant="outline">{labels[type]}</Badge>
  }

  if (showBuilder) {
    return (
      <LinkBuilder
        tenantId={tenantId}
        locale={locale}
        link={editingLink || undefined}
        onSave={handleSaveLink}
        onCancel={() => {
          setShowBuilder(false)
          setEditingLink(null)
        }}
      />
    )
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Links Customizados</h1>
          <p className="text-gray-600">Gerencie links personalizados para seus serviços</p>
        </div>
        <Button onClick={handleCreateLink}>
          <Plus className="h-4 w-4 mr-2" />
          Criar Link
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Buscar links..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os Status</SelectItem>
                <SelectItem value="active">Ativo</SelectItem>
                <SelectItem value="inactive">Inativo</SelectItem>
                <SelectItem value="draft">Rascunho</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os Tipos</SelectItem>
                <SelectItem value="professional">Profissional</SelectItem>
                <SelectItem value="service">Serviço</SelectItem>
                <SelectItem value="package">Pacote</SelectItem>
                <SelectItem value="booking">Agendamento</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Links List */}
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : filteredLinks.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <div className="text-gray-500">
              <Plus className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-semibold mb-2">Nenhum link encontrado</h3>
              <p className="mb-4">Crie seu primeiro link customizado para começar</p>
              <Button onClick={handleCreateLink}>
                <Plus className="h-4 w-4 mr-2" />
                Criar Primeiro Link
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredLinks.map((link) => (
            <Card key={link.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{link.name}</CardTitle>
                    <p className="text-sm text-gray-600 mt-1">/{link.slug}</p>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleCopyLink(link)}>
                        <Copy className="h-4 w-4 mr-2" />
                        Copiar Link
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Eye className="h-4 w-4 mr-2" />
                        Visualizar
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <BarChart3 className="h-4 w-4 mr-2" />
                        Analytics
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleEditLink(link)}>
                        <Edit className="h-4 w-4 mr-2" />
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDeleteLink(link.id)} className="text-red-600">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Excluir
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-2">
                  {getStatusBadge(link.status)}
                  {getTypeBadge(link.type)}
                </div>

                {link.description && <p className="text-sm text-gray-600 line-clamp-2">{link.description}</p>}

                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>Usos: {link.accessControl.currentUses}</span>
                  <span>{new Date(link.updatedAt).toLocaleDateString("pt-BR")}</span>
                </div>

                <div className="pt-2 border-t">
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" onClick={() => handleCopyLink(link)}>
                      <Copy className="h-3 w-3 mr-1" />
                      Copiar
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleEditLink(link)}>
                      <Edit className="h-3 w-3 mr-1" />
                      Editar
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
