export interface CustomLink {
  id: string
  tenantId: string
  name: string
  slug: string
  type: "professional" | "service" | "package" | "booking"
  title: string
  description?: string
  urlPattern: string
  targetIds: string[]

  // Visual customization
  branding: {
    primaryColor: string
    secondaryColor: string
    backgroundColor: string
    logo?: string
    customCSS?: string
  }

  // Behavior configuration
  behavior: {
    requireAuth: boolean
    allowGuestBooking: boolean
    showPricing: boolean
    showAvailability: boolean
    autoConfirm: boolean
    sendNotifications: boolean
    redirectAfterBooking?: string
  }

  // Access control
  accessControl: {
    isPublic: boolean
    passwordProtected?: boolean
    password?: string
    maxUses?: number
    currentUses: number
    expiresAt?: Date
    allowedDomains?: string[]
  }

  // Analytics
  analytics: {
    trackViews: boolean
    trackConversions: boolean
    views?: number
    conversions?: number
  }

  status: "active" | "inactive" | "draft"
  createdAt: Date
  updatedAt: Date
  createdBy: string
}

export interface LinkTemplate {
  id: string
  name: string
  description: string
  category: "professional" | "service" | "package" | "booking"
  urlPattern: string
  defaultBranding: Partial<CustomLink["branding"]>
  defaultBehavior: Partial<CustomLink["behavior"]>
}

export const linkTemplates: LinkTemplate[] = [
  {
    id: "professional-booking",
    name: "Agendamento com Profissional",
    description: "Link direto para agendamento com um profissional específico",
    category: "professional",
    urlPattern: "/{locale}/{tenant}/book/professional/{slug}",
    defaultBranding: {
      primaryColor: "#3B82F6",
      secondaryColor: "#1E40AF",
      backgroundColor: "#F8FAFC",
    },
    defaultBehavior: {
      requireAuth: false,
      allowGuestBooking: true,
      showPricing: true,
      showAvailability: true,
      autoConfirm: false,
      sendNotifications: true,
    },
  },
  {
    id: "service-booking",
    name: "Agendamento de Serviço",
    description: "Link para agendamento de serviços específicos",
    category: "service",
    urlPattern: "/{locale}/{tenant}/book/service/{slug}",
    defaultBranding: {
      primaryColor: "#10B981",
      secondaryColor: "#047857",
      backgroundColor: "#F0FDF4",
    },
    defaultBehavior: {
      requireAuth: false,
      allowGuestBooking: true,
      showPricing: true,
      showAvailability: true,
      autoConfirm: true,
      sendNotifications: true,
    },
  },
  {
    id: "package-booking",
    name: "Pacote de Serviços",
    description: "Link para agendamento de pacotes promocionais",
    category: "package",
    urlPattern: "/{locale}/{tenant}/book/package/{slug}",
    defaultBranding: {
      primaryColor: "#8B5CF6",
      secondaryColor: "#7C3AED",
      backgroundColor: "#FAF5FF",
    },
    defaultBehavior: {
      requireAuth: false,
      allowGuestBooking: true,
      showPricing: true,
      showAvailability: true,
      autoConfirm: false,
      sendNotifications: true,
    },
  },
  {
    id: "general-booking",
    name: "Agendamento Geral",
    description: "Link flexível para agendamento geral",
    category: "booking",
    urlPattern: "/{locale}/{tenant}/book/{slug}",
    defaultBranding: {
      primaryColor: "#F59E0B",
      secondaryColor: "#D97706",
      backgroundColor: "#FFFBEB",
    },
    defaultBehavior: {
      requireAuth: false,
      allowGuestBooking: true,
      showPricing: true,
      showAvailability: true,
      autoConfirm: false,
      sendNotifications: true,
    },
  },
]

export function generateCustomSlug(name: string, existingSlugs: string[]): string {
  const baseSlug = name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")

  let slug = baseSlug
  let counter = 1

  while (existingSlugs.includes(slug)) {
    slug = `${baseSlug}-${counter}`
    counter++
  }

  return slug
}

export function validateCustomLink(link: Partial<CustomLink>): { isValid: boolean; errors: string[] } {
  const errors: string[] = []

  if (!link.name?.trim()) {
    errors.push("Nome é obrigatório")
  }

  if (!link.slug?.trim()) {
    errors.push("Slug é obrigatório")
  } else if (!/^[a-z0-9-]+$/.test(link.slug)) {
    errors.push("Slug deve conter apenas letras minúsculas, números e hífens")
  }

  if (!link.type) {
    errors.push("Tipo é obrigatório")
  }

  if (!link.title?.trim()) {
    errors.push("Título é obrigatório")
  }

  if (!link.targetIds?.length) {
    errors.push("Pelo menos um alvo deve ser selecionado")
  }

  if (link.accessControl?.passwordProtected && !link.accessControl?.password) {
    errors.push("Senha é obrigatória quando proteção por senha está ativada")
  }

  if (link.accessControl?.maxUses && link.accessControl.maxUses < 1) {
    errors.push("Máximo de usos deve ser maior que zero")
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}

export function buildCustomUrl(link: CustomLink, baseUrl = "", locale = "pt-BR", tenant: string): string {
  return link.urlPattern
    .replace("{locale}", locale)
    .replace("{tenant}", tenant)
    .replace("{slug}", link.slug)
    .replace(/^\//, baseUrl ? `${baseUrl}/` : "/")
}
