"use client"

import { useState } from "react"
import { Menu, X, Home, Calendar, Users, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import Link from "next/link"
import { usePathname, useParams } from "next/navigation"
import { useTranslation } from "@/hooks/useTranslation"

export function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const params = useParams()
  const { t } = useTranslation()
  const locale = params.locale as string

  const navigationItems = [
    {
      title: t("nav.dashboard"),
      href: `/${locale}/dashboard`,
      icon: Home,
    },
    {
      title: t("sidebar.schedule"),
      href: `/${locale}/dashboard/schedule`,
      icon: Calendar,
    },
    {
      title: t("sidebar.professionals"),
      href: `/${locale}/dashboard/professionals`,
      icon: Users,
    },
    {
      title: t("sidebar.settings"),
      href: `/${locale}/dashboard/tenant-settings`,
      icon: Settings,
    },
  ]

  const isActive = (href: string) => {
    if (href === `/${locale}/dashboard`) {
      return pathname === `/${locale}/dashboard`
    }
    return pathname.startsWith(href)
  }

  return (
    <div className="md:hidden">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="text-gray-600">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Open navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <Link
                  href={`/${locale}/dashboard`}
                  className="flex items-center space-x-3"
                  onClick={() => setIsOpen(false)}
                >
                  <img src="/kalender-logo.png" alt="Logo" className="h-8 w-8" />
                </Link>
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="text-gray-500">
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-2">
              {navigationItems.map((item) => {
                const Icon = item.icon
                const active = isActive(item.href)

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center px-3 py-3 rounded-lg text-sm font-medium transition-colors ${
                      active ? "bg-primary text-white" : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <Icon className="h-5 w-5 mr-3" />
                    {item.title}
                  </Link>
                )
              })}
            </nav>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
