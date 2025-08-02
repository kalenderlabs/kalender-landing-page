import { NextRequest, NextResponse } from "next/server"

interface OnboardingData {
  organizationName: string
  organizationDescription: string
  tenantName: string
  tenantSlug: string
  tenantDescription: string
  userName: string
  userEmail: string
  userPhone: string
  userPassword: string
  serviceName: string
  serviceDescription: string
  servicePrice: string
  serviceDuration: string
}

export async function POST(request: NextRequest) {
  try {
    const data: OnboardingData = await request.json()

    // Validate required fields
    const requiredFields = [
      'organizationName',
      'organizationDescription',
      'tenantName',
      'tenantSlug',
      'tenantDescription',
      'userName',
      'userEmail',
      'userPhone',
      'userPassword',
      'serviceName',
      'serviceDescription',
      'servicePrice',
      'serviceDuration'
    ]

    for (const field of requiredFields) {
      if (!data[field as keyof OnboardingData]?.trim()) {
        return NextResponse.json(
          { error: `${getFieldLabel(field)} é obrigatório` },
          { status: 400 }
        )
      }
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(data.userEmail)) {
      return NextResponse.json(
        { error: "E-mail inválido" },
        { status: 400 }
      )
    }

    // Validate slug format
    const slugRegex = /^[a-z0-9-]+$/
    if (!slugRegex.test(data.tenantSlug)) {
      return NextResponse.json(
        { error: "Slug deve conter apenas letras minúsculas, números e hífens" },
        { status: 400 }
      )
    }

    // Validate price and duration
    const price = parseFloat(data.servicePrice)
    const duration = parseInt(data.serviceDuration)

    if (isNaN(price) || price <= 0) {
      return NextResponse.json(
        { error: "Preço deve ser um número válido maior que zero" },
        { status: 400 }
      )
    }

    if (isNaN(duration) || duration <= 0) {
      return NextResponse.json(
        { error: "Duração deve ser um número válido maior que zero" },
        { status: 400 }
      )
    }

    // Simulate API processing delay
    await new Promise(resolve => setTimeout(resolve, 2000))

    // Mock successful response
    const mockUser = {
      id: Math.floor(Math.random() * 1000) + 1,
      name: data.userName,
      email: data.userEmail,
      phone: data.userPhone,
      organizationId: Math.floor(Math.random() * 100) + 1,
      tenantId: Math.floor(Math.random() * 100) + 1,
      role: "admin",
      organizationName: data.organizationName,
      tenantName: data.tenantName,
      tenantSlug: data.tenantSlug,
      createdAt: new Date().toISOString(),
      picture: "/placeholder.svg"
    }

    return NextResponse.json({
      success: true,
      message: "Onboarding concluído com sucesso!",
      user: mockUser,
      token: "demo-token-" + Date.now(),
      organization: {
        id: mockUser.organizationId,
        name: data.organizationName,
        description: data.organizationDescription
      },
      tenant: {
        id: mockUser.tenantId,
        name: data.tenantName,
        slug: data.tenantSlug,
        description: data.tenantDescription,
        organizationId: mockUser.organizationId
      },
      service: {
        id: Math.floor(Math.random() * 100) + 1,
        name: data.serviceName,
        description: data.serviceDescription,
        price: price,
        duration: duration,
        tenantId: mockUser.tenantId
      }
    })

  } catch (error) {
    console.error("Onboarding API error:", error)
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    )
  }
}

function getFieldLabel(field: string): string {
  const labels: Record<string, string> = {
    organizationName: "Nome da organização",
    organizationDescription: "Descrição da organização",
    tenantName: "Nome do estabelecimento",
    tenantSlug: "Slug do estabelecimento",
    tenantDescription: "Descrição do estabelecimento",
    userName: "Nome do usuário",
    userEmail: "E-mail",
    userPhone: "Telefone",
    userPassword: "Senha",
    serviceName: "Nome do serviço",
    serviceDescription: "Descrição do serviço",
    servicePrice: "Preço do serviço",
    serviceDuration: "Duração do serviço"
  }
  return labels[field] || field
}
