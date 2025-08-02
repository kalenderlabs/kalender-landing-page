import type { CustomLink, LinkTemplate } from "./custom-links"

export class CustomLinksService {
  private baseUrl: string

  constructor(baseUrl = "/api") {
    this.baseUrl = baseUrl
  }

  // CRUD Operations
  async createLink(tenantId: string, linkData: Partial<CustomLink>): Promise<CustomLink> {
    const response = await fetch(`${this.baseUrl}/tenants/${tenantId}/custom-links`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(linkData),
    })

    if (!response.ok) {
      throw new Error(`Failed to create link: ${response.statusText}`)
    }

    return response.json()
  }

  async getLinks(
    tenantId: string,
    filters?: {
      type?: string
      status?: string
      search?: string
    },
  ): Promise<CustomLink[]> {
    const params = new URLSearchParams()
    if (filters?.type) params.append("type", filters.type)
    if (filters?.status) params.append("status", filters.status)
    if (filters?.search) params.append("search", filters.search)

    const response = await fetch(`${this.baseUrl}/tenants/${tenantId}/custom-links?${params}`)

    if (!response.ok) {
      throw new Error(`Failed to fetch links: ${response.statusText}`)
    }

    return response.json()
  }

  async getLink(tenantId: string, linkId: string): Promise<CustomLink> {
    const response = await fetch(`${this.baseUrl}/tenants/${tenantId}/custom-links/${linkId}`)

    if (!response.ok) {
      throw new Error(`Failed to fetch link: ${response.statusText}`)
    }

    return response.json()
  }

  async updateLink(tenantId: string, linkId: string, updates: Partial<CustomLink>): Promise<CustomLink> {
    const response = await fetch(`${this.baseUrl}/tenants/${tenantId}/custom-links/${linkId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    })

    if (!response.ok) {
      throw new Error(`Failed to update link: ${response.statusText}`)
    }

    return response.json()
  }

  async deleteLink(tenantId: string, linkId: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/tenants/${tenantId}/custom-links/${linkId}`, {
      method: "DELETE",
    })

    if (!response.ok) {
      throw new Error(`Failed to delete link: ${response.statusText}`)
    }
  }

  // Analytics
  async getLinkAnalytics(tenantId: string, linkId: string, period: "7d" | "30d" | "90d" = "30d") {
    const response = await fetch(
      `${this.baseUrl}/tenants/${tenantId}/custom-links/${linkId}/analytics?period=${period}`,
    )

    if (!response.ok) {
      throw new Error(`Failed to fetch analytics: ${response.statusText}`)
    }

    return response.json()
  }

  // Templates
  async getTemplates(): Promise<LinkTemplate[]> {
    const response = await fetch(`${this.baseUrl}/custom-links/templates`)

    if (!response.ok) {
      throw new Error(`Failed to fetch templates: ${response.statusText}`)
    }

    return response.json()
  }

  // Validation
  async validateSlug(tenantId: string, slug: string, excludeId?: string): Promise<{ available: boolean }> {
    const params = new URLSearchParams({ slug })
    if (excludeId) params.append("exclude", excludeId)

    const response = await fetch(`${this.baseUrl}/tenants/${tenantId}/custom-links/validate-slug?${params}`)

    if (!response.ok) {
      throw new Error(`Failed to validate slug: ${response.statusText}`)
    }

    return response.json()
  }

  // Preview
  async previewLink(tenantId: string, linkData: Partial<CustomLink>): Promise<{ url: string; preview: string }> {
    const response = await fetch(`${this.baseUrl}/tenants/${tenantId}/custom-links/preview`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(linkData),
    })

    if (!response.ok) {
      throw new Error(`Failed to generate preview: ${response.statusText}`)
    }

    return response.json()
  }
}

export const customLinksService = new CustomLinksService()
