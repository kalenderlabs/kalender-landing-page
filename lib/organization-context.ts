export interface Organization {
  id: string
  name: string
  slug: string
  logo?: string
  policies: {
    maxProfessionalsPerTenant?: number
    maxUnitsPerTenant?: number
    maxServicesPerTenant?: number
  }
}

export interface Tenant {
  id: string
  name: string
  slug: string
  organizationId?: string
  status: "active" | "inactive" | "suspended"
  subscription: {
    planId: string
    planName: string
    status: "active" | "cancelled" | "past_due"
    currentPeriodEnd: Date
    features: string[]
    limits: {
      maxUsers: number
      maxUnits: number
      maxProfessionals: number
    }
  }
  settings: {
    timezone: string
    currency: string
    language: string
  }
}

export interface Unit {
  id: string
  name: string
  tenantId: string
  address: string
  phone?: string
  email?: string
  status: "active" | "inactive"
  workingHours: {
    [key: string]: { start: string; end: string; available: boolean }
  }
}

export interface OrganizationContext {
  organization?: Organization
  tenant: Tenant
  units: Unit[]
  selectedUnit?: Unit
  setSelectedUnit: (unit: Unit) => void
}

// Mock data
export const mockOrganization: Organization = {
  id: "org_beauty_network",
  name: "Beauty Network",
  slug: "beauty-network",
  logo: "/placeholder.svg?height=40&width=40",
  policies: {
    maxProfessionalsPerTenant: 50,
    maxUnitsPerTenant: 10,
    maxServicesPerTenant: 100,
  },
}

export const mockTenant: Tenant = {
  id: "tenant_beleza_milena",
  name: "Beleza Milena",
  slug: "beleza-milena",
  organizationId: "org_beauty_network",
  status: "active",
  subscription: {
    planId: "plan_professional",
    planName: "Professional",
    status: "active",
    currentPeriodEnd: new Date("2024-02-18"),
    features: ["multi_unit", "advanced_reports", "api_access"],
    limits: {
      maxUsers: 15,
      maxUnits: 5,
      maxProfessionals: 25,
    },
  },
  settings: {
    timezone: "America/Sao_Paulo",
    currency: "BRL",
    language: "pt-BR",
  },
}

export const mockUnits: Unit[] = [
  {
    id: "unit_vila_madalena",
    name: "Vila Madalena",
    tenantId: "tenant_beleza_milena",
    address: "Rua das Flores, 123 - Vila Madalena, São Paulo - SP",
    phone: "(11) 99999-9999",
    email: "vilamadalena@belezamilena.com",
    status: "active",
    workingHours: {
      monday: { start: "09:00", end: "18:00", available: true },
      tuesday: { start: "09:00", end: "18:00", available: true },
      wednesday: { start: "09:00", end: "18:00", available: true },
      thursday: { start: "09:00", end: "18:00", available: true },
      friday: { start: "09:00", end: "18:00", available: true },
      saturday: { start: "10:00", end: "16:00", available: true },
      sunday: { start: "00:00", end: "00:00", available: false },
    },
  },
  {
    id: "unit_jardins",
    name: "Jardins",
    tenantId: "tenant_beleza_milena",
    address: "Av. Paulista, 456 - Jardins, São Paulo - SP",
    phone: "(11) 88888-8888",
    email: "jardins@belezamilena.com",
    status: "active",
    workingHours: {
      monday: { start: "08:00", end: "19:00", available: true },
      tuesday: { start: "08:00", end: "19:00", available: true },
      wednesday: { start: "08:00", end: "19:00", available: true },
      thursday: { start: "08:00", end: "19:00", available: true },
      friday: { start: "08:00", end: "19:00", available: true },
      saturday: { start: "09:00", end: "17:00", available: true },
      sunday: { start: "10:00", end: "15:00", available: true },
    },
  },
]
