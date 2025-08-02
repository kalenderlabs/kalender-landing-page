"use client"

import { ChevronRight, Home } from "lucide-react"
import Link from "next/link"
import { usePathname, useParams } from "next/navigation"
import { useTranslation } from "@/hooks/useTranslation"

interface BreadcrumbItem {
  label: string
  href: string
  isActive?: boolean
}

export function BreadcrumbNavigation() {
  const pathname = usePathname()
  const params = useParams()
  const { t } = useTranslation()
  const locale = params.locale as string

  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const pathSegments = pathname.split("/").filter((segment) => segment && segment !== locale)
    const breadcrumbs: BreadcrumbItem[] = [
      {
        label: t("navigation.dashboard"),
        href: `/${locale}/dashboard`,
        isActive: pathSegments.length === 1 && pathSegments[0] === "dashboard",
      },
    ]

    let currentPath = `/${locale}/dashboard`

    for (let i = 1; i < pathSegments.length; i++) {
      const segment = pathSegments[i]
      currentPath += `/${segment}`

      const isActive = i === pathSegments.length - 1

      breadcrumbs.push({
        label: t(`navigation.${segment}`) || segment.charAt(0).toUpperCase() + segment.slice(1),
        href: currentPath,
        isActive,
      })
    }

    return breadcrumbs
  }

  const breadcrumbs = generateBreadcrumbs()

  if (breadcrumbs.length <= 1) return null

  return (
    <nav className="flex items-center space-x-1 text-sm text-gray-500 mb-4 overflow-x-auto">
      <Link href={`/${locale}/dashboard`} className="flex items-center hover:text-gray-700 transition-colors">
        <Home className="h-4 w-4" />
        <span className="sr-only">{t("navigation.home")}</span>
      </Link>

      {breadcrumbs.map((item, index) => (
        <div key={item.href} className="flex items-center space-x-1 whitespace-nowrap">
          <ChevronRight className="h-4 w-4 text-gray-400" />
          {item.isActive ? (
            <span className="font-medium text-gray-900">{item.label}</span>
          ) : (
            <Link href={item.href} className="hover:text-gray-700 transition-colors">
              {item.label}
            </Link>
          )}
        </div>
      ))}
    </nav>
  )
}
