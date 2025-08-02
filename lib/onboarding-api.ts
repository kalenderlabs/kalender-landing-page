interface OnboardingData {
  organizationName: string
  organizationType: string
  organizationSize: string
  tenantName: string
  tenantDomain: string
  tenantDescription: string
  firstName: string
  lastName: string
  email: string
  role: string
  serviceName: string
  serviceType: string
  serviceDescription: string
}

export class OnboardingAPI {
  static async submitOnboarding(data: OnboardingData) {
    const response = await fetch("/api/onboarding", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error("Failed to submit onboarding data")
    }

    return response.json()
  }

  static async validateDomain(domain: string) {
    const response = await fetch(`/api/onboarding/validate-domain?domain=${domain}`)

    if (!response.ok) {
      throw new Error("Failed to validate domain")
    }

    return response.json()
  }
}
