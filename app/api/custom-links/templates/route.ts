import { NextResponse, type NextRequest } from "next/server"

export const dynamic = "force-static" // templates raramente mudam

type LinkTemplate = {
  id: string
  name: string
  description: string
  category: "professional" | "service" | "package" | "booking"
  urlPattern: string
  defaultBranding: {
    primaryColor: string
    secondaryColor: string
    backgroundColor: string
  }
  defaultBehavior: {
    requireAuth: boolean
    allowGuestBooking: boolean
    showPricing: boolean
    showAvailability: boolean
    autoConfirm: boolean
    sendNotifications: boolean
  }
}

/**
 * Coleção estática de templates.
 * Em produção você pode trocar por leitura em banco de dados ou CMS.
 */
const templates: LinkTemplate[] = [
  {
    id: "tmpl_professional_basic",
    name: "Profissional - Básico",
    description: "Link individual para um profissional específico.",
    category: "professional",
    urlPattern: "/{locale}/{tenant}/book/{slug}",
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
    id: "tmpl_service_promo",
    name: "Serviço Promocional",
    description: "Divulgue um serviço com preço especial e confirmação automática.",
    category: "service",
    urlPattern: "/{locale}/{tenant}/promo/{slug}",
    defaultBranding: {
      primaryColor: "#F97316",
      secondaryColor: "#C2410C",
      backgroundColor: "#FFFBEB",
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
    id: "tmpl_package_bundle",
    name: "Pacote de Serviços",
    description: "Venda combos de serviços em um só link.",
    category: "package",
    urlPattern: "/{locale}/{tenant}/bundle/{slug}",
    defaultBranding: {
      primaryColor: "#10B981",
      secondaryColor: "#065F46",
      backgroundColor: "#F0FDF4",
    },
    defaultBehavior: {
      requireAuth: true,
      allowGuestBooking: false,
      showPricing: true,
      showAvailability: false,
      autoConfirm: false,
      sendNotifications: true,
    },
  },
  {
    id: "tmpl_booking_quick",
    name: "Agendamento Rápido",
    description: "Fluxo de reserva simplificado para qualquer serviço.",
    category: "booking",
    urlPattern: "/{locale}/{tenant}/book/{slug}",
    defaultBranding: {
      primaryColor: "#6366F1",
      secondaryColor: "#4338CA",
      backgroundColor: "#EEF2FF",
    },
    defaultBehavior: {
      requireAuth: false,
      allowGuestBooking: true,
      showPricing: false,
      showAvailability: true,
      autoConfirm: false,
      sendNotifications: false,
    },
  },
]

export async function GET(_req: NextRequest) {
  return NextResponse.json(templates)
}
