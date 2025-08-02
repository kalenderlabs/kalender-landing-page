"use client"

import Link from "next/link"

import { MobileNavigation } from "./mobile-navigation"
import { BreadcrumbNavigation } from "./breadcrumb-navigation"

interface MobileHeaderProps {
  title?: string
  showBreadcrumbs?: boolean
}

export function MobileHeader({ title, showBreadcrumbs = true }: MobileHeaderProps) {
  return (
    <div className="md:hidden bg-white border-b border-gray-200 px-4 py-3 sticky top-0 z-40">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <MobileNavigation />
        </div>

        <Link href="/dashboard" className="flex items-center">
          <img src="/kalender-logo.png" alt="Logo" className="h-6 w-6" />
        </Link>
      </div>

      {title && <h1 className="text-lg font-semibold text-gray-900 mb-2">{title}</h1>}

      {showBreadcrumbs && <BreadcrumbNavigation />}
    </div>
  )
}
