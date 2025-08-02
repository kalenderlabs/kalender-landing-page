"use client"

import type React from "react"

import { Sidebar } from "./sidebar"
import { MobileHeader } from "@/components/ui/mobile-header"
import { BreadcrumbNavigation } from "@/components/ui/breadcrumb-navigation"
import { OrganizationSelector } from "@/components/ui/organization-selector"

interface DashboardLayoutProps {
  children: React.ReactNode
  user?: {
    id: string
    name: string
    email: string
    picture: string
  }
  pageTitle?: string
  showMobileBreadcrumbs?: boolean
}

export function DashboardLayout({ children, user, pageTitle, showMobileBreadcrumbs = true }: DashboardLayoutProps) {
  const handleLogout = () => {
    // Implement logout logic
    console.log("Logout clicked")
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar user={user} onLogout={handleLogout} />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile Header */}
        <MobileHeader title={pageTitle} />

        {/* Desktop Breadcrumbs */}
        <div className="hidden md:block px-6 py-4 bg-white border-b border-gray-200">
          <div className="flex items-center justify-between">
            <BreadcrumbNavigation />
            <OrganizationSelector showCompact />
          </div>
        </div>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-4 md:p-6">{children}</main>
      </div>
    </div>
  )
}
