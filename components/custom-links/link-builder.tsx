"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"

import { Link, Copy, Settings, Palette, Shield, ExternalLink, Save } from "lucide-react"

import type { CustomLink, LinkTemplate } from "@/lib/custom-links"
import { customLinksService } from "@/lib/custom-links-api"
import { generateCustomSlug } from "@/lib/custom-links"

const linkSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  slug: z
    .string()
    .min(1, "Slug é obrigatório")
    .regex(/^[a-z0-9-]+$/, "Slug inválido"),
  type: z.enum(["professional", "service", "package", "booking"]),
  title: z.string().min(1, "Título é obrigatório"),
  description: z.string().optional(),
  targetIds: z.array(z.string()).min(1, "Selecione pelo menos um alvo"),
})

interface LinkBuilderProps {
  tenantId: string
  locale: string
  link?: CustomLink
  onSave: (link: CustomLink) => void
  onCancel: () => void
}

export function LinkBuilder({ tenantId, locale, link, onSave, onCancel }: LinkBuilderProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [templates, setTemplates] = useState<LinkTemplate[]>([])
  const [selectedTemplate, setSelectedTemplate] = useState<LinkTemplate | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string>("")
  const [professionals, setProfessionals] = useState<any[]>([])
  const [services, setServices] = useState<any[]>([])

  const form = useForm<z.infer<typeof linkSchema>>({
    resolver: zodResolver(linkSchema),
    defaultValues: link
      ? {
          name: link.name,
          slug: link.slug,
          type: link.type,
          title: link.title,
          description: link.description || "",
          targetIds: link.targetIds,
        }
      : {
          name: "",
          slug: "",
          type: "booking",
          title: "",
          description: "",
          targetIds: [],
        },
  })

  const [branding, setBranding] = useState<CustomLink["branding"]>(
    link?.branding || {
      primaryColor: "#3B82F6",
      secondaryColor: "#1E40AF",
      backgroundColor: "#F8FAFC",
    },
  )

  const [behavior, setBehavior] = useState<CustomLink["behavior"]>(
    link?.behavior || {
      requireAuth: false,
      allowGuestBooking: true,
      showPricing: true,
      showAvailability: true,
      autoConfirm: false,
      sendNotifications: true,
    },
  )

  const [accessControl, setAccessControl] = useState<CustomLink["accessControl"]>(
    link?.accessControl || {
      isPublic: true,
      passwordProtected: false,
      currentUses: 0,
    },
  )

  useEffect(() => {
    loadTemplates()
    loadProfessionals()
    loadServices()
  }, [])

  useEffect(() => {
    const subscription = form.watch((value) => {
      if (value.name && value.slug && value.type) {
        updatePreview()
      }
    })
    return () => subscription.unsubscribe()
  }, [form.watch])

  const loadTemplates = async () => {
    try {
      const data = await customLinksService.getTemplates()
      setTemplates(data)
    } catch (error) {
      console.error("Failed to load templates:", error)
    }
  }

  const loadProfessionals = async () => {
    // Mock data - replace with actual API call
    setProfessionals([
      { id: "1", name: "Ana Costa", specialties: ["Corte", "Escova"] },
      { id: "2", name: "Carlos Lima", specialties: ["Corte Masculino", "Barba"] },
      { id: "3", name: "Beatriz Souza", specialties: ["Manicure", "Pedicure"] },
    ])
  }

  const loadServices = async () => {
    // Mock data - replace with actual API call
    setServices([
      { id: "1", name: "Corte de Cabelo", price: 35, duration: 45 },
      { id: "2", name: "Escova", price: 25, duration: 30 },
      { id: "3", name: "Manicure", price: 20, duration: 30 },
      { id: "4", name: "Coloração", price: 80, duration: 90 },
    ])
  }

  const updatePreview = async () => {
    try {
      const formData = form.getValues()
      const mockLink: Partial<CustomLink> = {
        ...formData,
        tenantId,
        urlPattern: selectedTemplate?.urlPattern || "/{locale}/{tenant}/book/{slug}",
        branding,
        behavior,
        accessControl,
      }

      const preview = await customLinksService.previewLink(tenantId, mockLink)
      setPreviewUrl(preview.url)
    } catch (error) {
      console.error("Failed to generate preview:", error)
    }
  }

  const handleTemplateSelect = (template: LinkTemplate) => {
    setSelectedTemplate(template)
    setBranding({ ...branding, ...template.defaultBranding })
    setBehavior({ ...behavior, ...template.defaultBehavior })
    form.setValue("type", template.category as any)
  }

  const generateSlug = () => {
    const name = form.getValues("name")
    if (name) {
      const slug = generateCustomSlug(name, [])
      form.setValue("slug", slug)
    }
  }

  const copyPreviewUrl = () => {
    if (previewUrl) {
      navigator.clipboard.writeText(previewUrl)
    }
  }

  const handleSubmit = async (data: z.infer<typeof linkSchema>) => {
    setIsLoading(true)
    try {
      const linkData: Partial<CustomLink> = {
        ...data,
        tenantId,
        urlPattern: selectedTemplate?.urlPattern || "/{locale}/{tenant}/book/{slug}",
        branding,
        behavior,
        accessControl,
        status: "active",
        analytics: {
          trackViews: true,
          trackConversions: true,
        },
      }

      const savedLink = link
        ? await customLinksService.updateLink(tenantId, link.id, linkData)
        : await customLinksService.createLink(tenantId, linkData)

      onSave(savedLink)
    } catch (error) {
      console.error("Failed to save link:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {link ? "Editar Link Customizado" : "Criar Link Customizado"}
          </h1>
          <p className="text-gray-600">Configure um link personalizado para seus serviços ou profissionais</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
          <Button onClick={form.handleSubmit(handleSubmit)} disabled={isLoading}>
            <Save className="h-4 w-4 mr-2" />
            {isLoading ? "Salvando..." : "Salvar"}
          </Button>
        </div>
      </div>

      {/* Template Selection */}
      {!link && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Link className="h-5 w-5" />
              <span>Escolha um Template</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {templates.map((template) => (
                <div
                  key={template.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    selectedTemplate?.id === template.id
                      ? "border-primary bg-primary/5"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => handleTemplateSelect(template)}
                >
                  <h3 className="font-semibold text-gray-900">{template.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{template.description}</p>
                  <Badge variant="secondary" className="mt-2">
                    {template.category}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <Tabs defaultValue="basic" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="basic">Básico</TabsTrigger>
            <TabsTrigger value="targets">Alvos</TabsTrigger>
            <TabsTrigger value="branding">Visual</TabsTrigger>
            <TabsTrigger value="behavior">Comportamento</TabsTrigger>
            <TabsTrigger value="access">Acesso</TabsTrigger>
          </TabsList>

          {/* Basic Configuration */}
          <TabsContent value="basic" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Informações Básicas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Nome do Link</Label>
                    <Input id="name" {...form.register("name")} placeholder="Ex: Agendamento Rápido" />
                    {form.formState.errors.name && (
                      <p className="text-sm text-red-600 mt-1">{form.formState.errors.name.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="slug">Slug da URL</Label>
                    <div className="flex space-x-2">
                      <Input id="slug" {...form.register("slug")} placeholder="agendamento-rapido" />
                      <Button type="button" variant="outline" onClick={generateSlug}>
                        Gerar
                      </Button>
                    </div>
                    {form.formState.errors.slug && (
                      <p className="text-sm text-red-600 mt-1">{form.formState.errors.slug.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="title">Título da Página</Label>
                  <Input id="title" {...form.register("title")} placeholder="Agende seu horário conosco" />
                </div>

                <div>
                  <Label htmlFor="description">Descrição</Label>
                  <Textarea
                    id="description"
                    {...form.register("description")}
                    placeholder="Descrição opcional para SEO e compartilhamento"
                    rows={3}
                  />
                </div>

                {/* Preview */}
                {previewUrl && (
                  <Alert>
                    <ExternalLink className="h-4 w-4" />
                    <AlertDescription>
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-sm">{previewUrl}</span>
                        <Button size="sm" variant="ghost" onClick={copyPreviewUrl}>
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Target Selection */}
          <TabsContent value="targets" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Selecionar Alvos</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Tipo de Alvo</Label>
                  <Select value={form.watch("type")} onValueChange={(value) => form.setValue("type", value as any)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="professional">Profissional</SelectItem>
                      <SelectItem value="service">Serviço</SelectItem>
                      <SelectItem value="package">Pacote</SelectItem>
                      <SelectItem value="booking">Agendamento Geral</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {form.watch("type") === "professional" && (
                  <div>
                    <Label>Profissionais</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                      {professionals.map((prof) => (
                        <div key={prof.id} className="flex items-center space-x-2 p-3 border rounded-lg">
                          <input
                            type="checkbox"
                            id={`prof-${prof.id}`}
                            checked={form.watch("targetIds").includes(prof.id)}
                            onChange={(e) => {
                              const current = form.getValues("targetIds")
                              if (e.target.checked) {
                                form.setValue("targetIds", [...current, prof.id])
                              } else {
                                form.setValue(
                                  "targetIds",
                                  current.filter((id) => id !== prof.id),
                                )
                              }
                            }}
                          />
                          <label htmlFor={`prof-${prof.id}`} className="flex-1">
                            <div className="font-medium">{prof.name}</div>
                            <div className="text-sm text-gray-600">{prof.specialties.join(", ")}</div>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {form.watch("type") === "service" && (
                  <div>
                    <Label>Serviços</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                      {services.map((service) => (
                        <div key={service.id} className="flex items-center space-x-2 p-3 border rounded-lg">
                          <input
                            type="checkbox"
                            id={`service-${service.id}`}
                            checked={form.watch("targetIds").includes(service.id)}
                            onChange={(e) => {
                              const current = form.getValues("targetIds")
                              if (e.target.checked) {
                                form.setValue("targetIds", [...current, service.id])
                              } else {
                                form.setValue(
                                  "targetIds",
                                  current.filter((id) => id !== service.id),
                                )
                              }
                            }}
                          />
                          <label htmlFor={`service-${service.id}`} className="flex-1">
                            <div className="font-medium">{service.name}</div>
                            <div className="text-sm text-gray-600">
                              R$ {service.price} • {service.duration}min
                            </div>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Branding */}
          <TabsContent value="branding" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Palette className="h-5 w-5" />
                  <span>Personalização Visual</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="primaryColor">Cor Primária</Label>
                    <div className="flex space-x-2">
                      <Input
                        id="primaryColor"
                        type="color"
                        value={branding.primaryColor}
                        onChange={(e) => setBranding({ ...branding, primaryColor: e.target.value })}
                        className="w-16 h-10"
                      />
                      <Input
                        value={branding.primaryColor}
                        onChange={(e) => setBranding({ ...branding, primaryColor: e.target.value })}
                        placeholder="#3B82F6"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="secondaryColor">Cor Secundária</Label>
                    <div className="flex space-x-2">
                      <Input
                        id="secondaryColor"
                        type="color"
                        value={branding.secondaryColor}
                        onChange={(e) => setBranding({ ...branding, secondaryColor: e.target.value })}
                        className="w-16 h-10"
                      />
                      <Input
                        value={branding.secondaryColor}
                        onChange={(e) => setBranding({ ...branding, secondaryColor: e.target.value })}
                        placeholder="#1E40AF"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="backgroundColor">Cor de Fundo</Label>
                    <div className="flex space-x-2">
                      <Input
                        id="backgroundColor"
                        type="color"
                        value={branding.backgroundColor}
                        onChange={(e) => setBranding({ ...branding, backgroundColor: e.target.value })}
                        className="w-16 h-10"
                      />
                      <Input
                        value={branding.backgroundColor}
                        onChange={(e) => setBranding({ ...branding, backgroundColor: e.target.value })}
                        placeholder="#F8FAFC"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor="logo">Logo (URL)</Label>
                  <Input
                    id="logo"
                    value={branding.logo || ""}
                    onChange={(e) => setBranding({ ...branding, logo: e.target.value })}
                    placeholder="https://exemplo.com/logo.png"
                  />
                </div>

                <div>
                  <Label htmlFor="customCSS">CSS Customizado</Label>
                  <Textarea
                    id="customCSS"
                    value={branding.customCSS || ""}
                    onChange={(e) => setBranding({ ...branding, customCSS: e.target.value })}
                    placeholder="/* CSS personalizado */"
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Behavior */}
          <TabsContent value="behavior" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="h-5 w-5" />
                  <span>Comportamento</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="requireAuth">Requer Autenticação</Label>
                      <Switch
                        id="requireAuth"
                        checked={behavior.requireAuth}
                        onCheckedChange={(checked) => setBehavior({ ...behavior, requireAuth: checked })}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="allowGuestBooking">Permitir Agendamento de Convidados</Label>
                      <Switch
                        id="allowGuestBooking"
                        checked={behavior.allowGuestBooking}
                        onCheckedChange={(checked) => setBehavior({ ...behavior, allowGuestBooking: checked })}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="showPricing">Mostrar Preços</Label>
                      <Switch
                        id="showPricing"
                        checked={behavior.showPricing}
                        onCheckedChange={(checked) => setBehavior({ ...behavior, showPricing: checked })}
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="showAvailability">Mostrar Disponibilidade</Label>
                      <Switch
                        id="showAvailability"
                        checked={behavior.showAvailability}
                        onCheckedChange={(checked) => setBehavior({ ...behavior, showAvailability: checked })}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="autoConfirm">Confirmação Automática</Label>
                      <Switch
                        id="autoConfirm"
                        checked={behavior.autoConfirm}
                        onCheckedChange={(checked) => setBehavior({ ...behavior, autoConfirm: checked })}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="sendNotifications">Enviar Notificações</Label>
                      <Switch
                        id="sendNotifications"
                        checked={behavior.sendNotifications}
                        onCheckedChange={(checked) => setBehavior({ ...behavior, sendNotifications: checked })}
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <Label htmlFor="redirectAfterBooking">Redirecionamento Após Agendamento</Label>
                  <Input
                    id="redirectAfterBooking"
                    value={behavior.redirectAfterBooking || ""}
                    onChange={(e) => setBehavior({ ...behavior, redirectAfterBooking: e.target.value })}
                    placeholder="https://exemplo.com/obrigado"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Access Control */}
          <TabsContent value="access" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="h-5 w-5" />
                  <span>Controle de Acesso</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="isPublic">Link Público</Label>
                  <Switch
                    id="isPublic"
                    checked={accessControl.isPublic}
                    onCheckedChange={(checked) => setAccessControl({ ...accessControl, isPublic: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="passwordProtected">Protegido por Senha</Label>
                  <Switch
                    id="passwordProtected"
                    checked={accessControl.passwordProtected || false}
                    onCheckedChange={(checked) => setAccessControl({ ...accessControl, passwordProtected: checked })}
                  />
                </div>

                {accessControl.passwordProtected && (
                  <div>
                    <Label htmlFor="password">Senha</Label>
                    <Input
                      id="password"
                      type="password"
                      value={accessControl.password || ""}
                      onChange={(e) => setAccessControl({ ...accessControl, password: e.target.value })}
                      placeholder="Digite a senha"
                    />
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="maxUses">Máximo de Usos</Label>
                    <Input
                      id="maxUses"
                      type="number"
                      value={accessControl.maxUses || ""}
                      onChange={(e) =>
                        setAccessControl({ ...accessControl, maxUses: Number.parseInt(e.target.value) || undefined })
                      }
                      placeholder="Ilimitado"
                    />
                  </div>

                  <div>
                    <Label htmlFor="expiresAt">Data de Expiração</Label>
                    <Input
                      id="expiresAt"
                      type="datetime-local"
                      value={
                        accessControl.expiresAt ? new Date(accessControl.expiresAt).toISOString().slice(0, 16) : ""
                      }
                      onChange={(e) =>
                        setAccessControl({
                          ...accessControl,
                          expiresAt: e.target.value ? new Date(e.target.value) : undefined,
                        })
                      }
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="allowedDomains">Domínios Permitidos</Label>
                  <Textarea
                    id="allowedDomains"
                    value={accessControl.allowedDomains?.join("\n") || ""}
                    onChange={(e) =>
                      setAccessControl({
                        ...accessControl,
                        allowedDomains: e.target.value.split("\n").filter((d) => d.trim()),
                      })
                    }
                    placeholder="exemplo.com&#10;outro-site.com"
                    rows={3}
                  />
                  <p className="text-sm text-gray-600 mt-1">Um domínio por linha. Deixe vazio para permitir todos.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </form>
    </div>
  )
}
