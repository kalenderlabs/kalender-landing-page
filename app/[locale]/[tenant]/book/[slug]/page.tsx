"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2 } from "lucide-react"

import type { CustomLink } from "@/lib/custom-links"
import { customLinksService } from "@/lib/custom-links-api"

export default function CustomLinkPage() {
  const params = useParams()
  const { locale, tenant, slug } = params as { locale: string; tenant: string; slug: string }

  const [link, setLink] = useState<CustomLink | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadLink()
  }, [tenant, slug])

  const loadLink = async () => {
    try {
      setIsLoading(true)
      // In a real implementation, you would fetch the link by tenant and slug
      // For now, we'll simulate this
      const links = await customLinksService.getLinks(tenant)
      const foundLink = links.find((l) => l.slug === slug)

      if (!foundLink) {
        setError("Link não encontrado")
        return
      }

      if (foundLink.status !== "active") {
        setError("Este link não está mais ativo")
        return
      }

      // Check access control
      if (!foundLink.accessControl.isPublic) {
        setError("Acesso negado")
        return
      }

      if (foundLink.accessControl.expiresAt && new Date() > foundLink.accessControl.expiresAt) {
        setError("Este link expirou")
        return
      }

      if (foundLink.accessControl.maxUses && foundLink.accessControl.currentUses >= foundLink.accessControl.maxUses) {
        setError("Este link atingiu o limite máximo de usos")
        return
      }

      setLink(foundLink)
    } catch (err) {
      setError("Erro ao carregar o link")
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardContent className="p-8 text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Oops!</h1>
            <p className="text-gray-600 mb-6">{error}</p>
            <Button onClick={() => window.history.back()}>Voltar</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!link) {
    return null
  }

  return (
    <div
      className="min-h-screen py-8 px-4"
      style={
        {
          backgroundColor: link.branding.backgroundColor,
          "--primary-color": link.branding.primaryColor,
          "--secondary-color": link.branding.secondaryColor,
        } as React.CSSProperties
      }
    >
      <div className="max-w-4xl mx-auto">
        {/* Custom CSS */}
        {link.branding.customCSS && <style dangerouslySetInnerHTML={{ __html: link.branding.customCSS }} />}

        {/* Header */}
        <div className="text-center mb-8">
          {link.branding.logo && (
            <img src={link.branding.logo || "/placeholder.svg"} alt="Logo" className="h-16 w-auto mx-auto mb-4" />
          )}
          <h1 className="text-4xl font-bold mb-4" style={{ color: link.branding.primaryColor }}>
            {link.title}
          </h1>
          {link.description && <p className="text-xl text-gray-600 max-w-2xl mx-auto">{link.description}</p>}
        </div>

        {/* Content */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>{link.name}</CardTitle>
              <div className="flex space-x-2">
                <Badge
                  style={{
                    backgroundColor: link.branding.primaryColor + "20",
                    color: link.branding.primaryColor,
                  }}
                >
                  {link.type === "professional"
                    ? "Profissional"
                    : link.type === "service"
                      ? "Serviço"
                      : link.type === "package"
                        ? "Pacote"
                        : "Agendamento"}
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Booking Interface would go here */}
              <Alert>
                <AlertDescription>
                  Interface de agendamento será renderizada aqui baseada na configuração do link. Tipo: {link.type},
                  Alvos: {link.targetIds.join(", ")}
                </AlertDescription>
              </Alert>

              <div className="flex justify-center">
                <Button
                  size="lg"
                  style={{
                    backgroundColor: link.branding.primaryColor,
                    borderColor: link.branding.primaryColor,
                  }}
                  className="text-white hover:opacity-90"
                >
                  Agendar Agora
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center text-sm text-gray-500">
          <p>Powered by Kalender</p>
        </div>
      </div>
    </div>
  )
}
