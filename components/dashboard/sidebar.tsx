"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useParams, useRouter } from "next/navigation"
import { Calendar, Users, BarChart3, Settings, Home, Briefcase, CreditCard, Bell, HelpCircle, ChevronLeft, ChevronRight, LogOut, User, Menu, X } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LanguageSwitcher } from "@/components/language-switcher"
import { useTranslation } from "@/hooks/useTranslation"
import { SafeImage } from "@/components/ui/safe-image"
import { getAssetPath } from "@/lib/asset-utils"
import { cn } from "@/lib/utils"

interface SidebarProps {
  user?: {
    id: string
    name: string
    email: string
    picture: string
  }
  onLogout?: () => void
}

export function Sidebar({ user, onLogout }: SidebarProps) {
  const { t } = useTranslation()
  const router = useRouter()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [screenSize, setScreenSize] = useState<"mobile" | "tablet" | "desktop" | "large" | "xl">("desktop")
  const pathname = usePathname()
  const params = useParams()
  const locale = params.locale as string

  // Enhanced responsive behavior
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth

      if (width < 768) {
        setScreenSize("mobile")
        setIsMobileOpen(false)
      } else if (width < 1024) {
        setScreenSize("tablet")
        setIsCollapsed(true)
        setIsMobileOpen(false)
      } else if (width < 1280) {
        setScreenSize("desktop")
        setIsMobileOpen(false)
      } else if (width < 1536) {
        setScreenSize("large")
        setIsMobileOpen(false)
      } else {
        setScreenSize("xl")
        setIsMobileOpen(false)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    setIsMobileOpen(false)
  }, [pathname])

  const handleCollapse = () => {
    setIsTransitioning(true)
    setIsCollapsed(!isCollapsed)
    setTimeout(() => setIsTransitioning(false), 350)
  }

  const handleLogout = () => {
    try {
      // Log para debug
      console.log("🔴 Logout iniciado")

      // Limpar localStorage de forma simples
      if (typeof window !== "undefined") {
        localStorage.clear()
        sessionStorage.clear()
        console.log("✅ Storage limpo")
      }

      // Redirecionar imediatamente
      console.log("🔄 Redirecionando...")
      window.location.href = "/login"
    } catch (error) {
      console.error("❌ Erro no logout:", error)
      // Forçar redirecionamento mesmo com erro
      window.location.href = "/login"
    }
  }

  const getSidebarWidth = () => {
    if (screenSize === "mobile") return "w-80"
    if (screenSize === "tablet") return isCollapsed ? "w-16" : "w-64"
    if (screenSize === "desktop") return isCollapsed ? "w-20" : "w-72"
    if (screenSize === "large") return isCollapsed ? "w-20" : "w-80"
    return isCollapsed ? "w-24" : "w-96"
  }

  const mainMenuItems = [
    {
      title: "Dashboard",
      href: `/${locale}/dashboard`,
      icon: Home,
      badge: null,
      description: "Visão geral do sistema",
    },
    {
      title: "Agenda",
      href: `/${locale}/dashboard/schedule`,
      icon: Calendar,
      badge: "3",
      description: "Gerenciar agendamentos",
    },
    {
      title: "Serviços",
      href: `/${locale}/dashboard/services`,
      icon: Briefcase,
      badge: null,
      description: "Catálogo de serviços",
    },
    {
      title: "Profissionais",
      href: `/${locale}/dashboard/professionals`,
      icon: Users,
      badge: null,
      description: "Equipe e profissionais",
    },
  ]

  const managementItems = [
    {
      title: "Relatórios",
      href: `/${locale}/dashboard/reports`,
      icon: BarChart3,
      badge: null,
      description: "Relatórios e análises",
    },
    {
      title: "Financeiro",
      href: `/${locale}/dashboard/financial`,
      icon: CreditCard,
      badge: null,
      description: "Controle financeiro completo",
    },
  ]

  const supportItems = [
    {
      title: "Notificações",
      href: `/${locale}/dashboard/notifications`,
      icon: Bell,
      badge: "2",
      description: "Notificações do sistema",
    },
    {
      title: "Ajuda",
      href: `/${locale}/dashboard/help`,
      icon: HelpCircle,
      badge: null,
      description: "Central de ajuda",
    },
  ]

  const isActive = (href: string) => {
    if (href === `/${locale}/dashboard`) {
      return pathname === `/${locale}/dashboard`
    }
    return pathname.startsWith(href)
  }

  const renderMenuItem = (item: any) => {
    const Icon = item.icon
    const active = isActive(item.href)

    // Consistent padding that works for both states
    const getItemPadding = () => {
      if (isCollapsed) {
        return "px-3 py-3"
      }
      return "px-3 py-2.5"
    }

    // Fixed icon sizes that never disappear
    const getIconSize = () => {
      if (isCollapsed) {
        return "h-5 w-5" // Consistent size when collapsed
      }
      return "h-4 w-4 mr-3" // Smaller but visible when expanded
    }

    return (
      <Link key={item.href} href={item.href}>
        <div
          className={cn(
            "group relative flex items-center rounded-lg font-medium transition-all duration-300 ease-in-out",
            "hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 hover:shadow-sm",
            getItemPadding(),
            isCollapsed ? "justify-center" : "justify-start",
            active
              ? "bg-gradient-to-r from-primary to-primary/90 text-white shadow-md shadow-primary/20"
              : "text-gray-700 hover:text-gray-900",
            // Ensure minimum height for touch targets
            "min-h-[40px]",
          )}
          title={isCollapsed ? item.title : item.description}
        >
          {/* Icon - Always visible with consistent sizing */}
          <Icon
            className={cn(
              "transition-all duration-300 ease-in-out flex-shrink-0",
              getIconSize(),
              active ? "text-white" : "text-gray-500 group-hover:text-gray-700",
              // Ensure icon never gets too small
              "min-w-[16px] min-h-[16px]",
            )}
          />

          {/* Text container with smooth transitions */}
          <div
            className={cn(
              "flex items-center justify-between transition-all duration-300 ease-in-out min-w-0",
              isCollapsed ? "opacity-0 w-0 overflow-hidden ml-0" : "opacity-100 flex-1 ml-0",
            )}
          >
            <span
              className={cn(
                "truncate font-medium transition-all duration-200",
                // Reduced font sizes for better fit
                "text-xs", // Smaller base font size
                // Ensure text is always readable
                "leading-4",
              )}
            >
              {item.title}
            </span>
            {item.badge && (
              <Badge
                variant="secondary"
                className={cn(
                  "ml-2 text-xs font-medium transition-all duration-200 flex-shrink-0",
                  // Smaller badge for better proportions
                  "px-1.5 py-0.5 min-w-[18px] h-4",
                  active
                    ? "bg-white/20 text-white border-white/30"
                    : "bg-gray-200 text-gray-700 group-hover:bg-gray-300",
                )}
              >
                {item.badge}
              </Badge>
            )}
          </div>

          {/* Enhanced tooltip for collapsed state */}
          {isCollapsed && (
            <div
              className={cn(
                "absolute left-full ml-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none whitespace-nowrap z-50 shadow-lg",
                // Ensure tooltip doesn't interfere with layout
                "transform translate-x-1",
              )}
            >
              {item.title}
              <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-gray-900 rotate-45"></div>
            </div>
          )}
        </div>
      </Link>
    )
  }

  const SidebarContent = () => (
    <>
      {/* Header with consistent logo sizing */}
      <div
        className={cn("border-b border-gray-200 transition-all duration-300 ease-in-out", isCollapsed ? "p-3" : "p-4")}
      >
        <div className="flex items-center justify-between">
          <Link
            href={`/${locale}/dashboard`}
            className={cn(
              "flex items-center transition-all duration-300 ease-in-out group",
              isCollapsed ? "justify-center w-full" : "justify-start",
            )}
          >
            <div className="relative transition-all duration-300 ease-in-out group-hover:scale-105 p-1">
              <SafeImage
                src="kalender-logo.png"
                alt="Kalender Logo"
                className={cn(
                  "transition-all duration-300 ease-in-out drop-shadow-sm",
                  isCollapsed ? "h-8 w-8" : "h-7 w-7",
                )}
                fallback={
                  <div
                    className={cn(
                      "bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center shadow-md transition-all duration-300",
                      isCollapsed ? "h-8 w-8" : "h-7 w-7",
                    )}
                  >
                    <Home
                      className={cn("text-white transition-all duration-300", isCollapsed ? "h-4 w-4" : "h-3.5 w-3.5")}
                    />
                  </div>
                }
              />
            </div>
          </Link>

          {screenSize !== "mobile" && screenSize !== "tablet" && (
            <Button
              variant="ghost"
              size="icon"
              onClick={handleCollapse}
              className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-all duration-200 rounded-lg h-8 w-8"
            >
              {isCollapsed ? <ChevronRight className="h-3.5 w-3.5" /> : <ChevronLeft className="h-3.5 w-3.5" />}
            </Button>
          )}
        </div>
      </div>

      {/* User Profile with consistent sizing */}
      {user && (
        <div
          className={cn(
            "border-b border-gray-200 transition-all duration-300 ease-in-out",
            isCollapsed ? "p-3" : "p-4",
          )}
        >
          {isCollapsed ? (
            <div className="flex justify-center">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-10 w-10 rounded-lg hover:ring-2 hover:ring-primary/20 transition-all duration-200 group"
                  >
                    <Avatar className="h-10 w-10 ring-1 ring-gray-200 group-hover:ring-primary/30 transition-all duration-200">
                      <AvatarImage
                        src={user.picture ? getAssetPath(user.picture) : "/placeholder.svg"}
                        alt={user.name}
                      />
                      <AvatarFallback className="bg-gradient-to-br from-primary to-primary/80 text-white font-semibold text-sm">
                        {user.name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-white"></div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-white border-gray-200 shadow-xl" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal p-3">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none text-gray-900 truncate">{user.name}</p>
                      <p className="text-xs leading-none text-gray-500 truncate">{user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-gray-200" />
                  <DropdownMenuItem className="text-gray-700 hover:bg-gray-100 p-3 text-sm">
                    <User className="mr-2 h-4 w-4 flex-shrink-0" />
                    <span>Perfil</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="text-gray-700 hover:bg-gray-100 p-3 text-sm">
                    <Link href={`/${locale}/dashboard/tenant-settings`}>
                      <Settings className="mr-2 h-4 w-4 flex-shrink-0" />
                      <span>Configurações</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-gray-200" />
                  <DropdownMenuItem onClick={handleLogout} className="text-red-600 hover:bg-red-50 p-3 text-sm">
                    <LogOut className="mr-2 h-4 w-4 flex-shrink-0" />
                    <span>Sair</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-all duration-200 group">
              <div className="relative flex-shrink-0">
                <Avatar className="h-9 w-9 ring-1 ring-gray-200 group-hover:ring-primary/30 transition-all duration-200">
                  <AvatarImage src={user.picture ? getAssetPath(user.picture) : "/placeholder.svg"} alt={user.name} />
                  <AvatarFallback className="bg-gradient-to-br from-primary to-primary/80 text-white font-semibold text-sm">
                    {user.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute bottom-0 right-0 h-2.5 w-2.5 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-gray-900 truncate leading-4">{user.name}</p>
                <p className="text-xs text-gray-500 truncate leading-3">{user.email}</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Language Switcher */}
      {!isCollapsed && (
        <div className="px-4 py-3 border-b border-gray-200">
          <LanguageSwitcher variant="outline" size="sm" showText />
        </div>
      )}

      {/* Navigation with consistent spacing */}
      <nav className="flex-1 p-3 space-y-6 overflow-y-auto custom-scrollbar">
        {/* Main Menu */}
        <div className="space-y-1">
          {!isCollapsed && (
            <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3 flex items-center">
              <div className="h-px bg-gray-300 flex-1 mr-2"></div>
              Principal
              <div className="h-px bg-gray-300 flex-1 ml-2"></div>
            </h3>
          )}
          {mainMenuItems.map(renderMenuItem)}
        </div>

        {/* Management Section */}
        <div className="space-y-1">
          {!isCollapsed && (
            <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3 flex items-center">
              <div className="h-px bg-gray-300 flex-1 mr-2"></div>
              Gestão
              <div className="h-px bg-gray-300 flex-1 ml-2"></div>
            </h3>
          )}
          {managementItems.map(renderMenuItem)}
        </div>

        {/* Settings */}
        <div className="space-y-1">
          {!isCollapsed && (
            <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3 flex items-center">
              <div className="h-px bg-gray-300 flex-1 mr-2"></div>
              Configurações
              <div className="h-px bg-gray-300 flex-1 ml-2"></div>
            </h3>
          )}
          <Link href={`/${locale}/dashboard/tenant-settings`}>
            <div
              className={cn(
                "group relative flex items-center rounded-lg font-medium transition-all duration-300 ease-in-out min-h-[40px]",
                "hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 hover:shadow-sm",
                isCollapsed ? "px-3 py-3 justify-center" : "px-3 py-2.5",
                isActive(`/${locale}/dashboard/tenant-settings`)
                  ? "bg-gradient-to-r from-primary to-primary/90 text-white shadow-md shadow-primary/20"
                  : "text-gray-700 hover:text-gray-900",
              )}
            >
              <Settings
                className={cn(
                  "transition-all duration-300 ease-in-out flex-shrink-0 min-w-[16px] min-h-[16px]",
                  isCollapsed ? "h-5 w-5" : "h-4 w-4 mr-3",
                  isActive(`/${locale}/dashboard/tenant-settings`)
                    ? "text-white"
                    : "text-gray-500 group-hover:text-gray-700",
                )}
              />
              <div
                className={cn(
                  "transition-all duration-300 ease-in-out min-w-0",
                  isCollapsed ? "opacity-0 w-0 overflow-hidden ml-0" : "opacity-100 flex-1 ml-0",
                )}
              >
                <span className="font-medium truncate text-xs leading-4">Configurações</span>
              </div>

              {isCollapsed && (
                <div className="absolute left-full ml-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none whitespace-nowrap z-50 shadow-lg transform translate-x-1">
                  Configurações
                  <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-gray-900 rotate-45"></div>
                </div>
              )}
            </div>
          </Link>
        </div>

        {/* Support Section */}
        <div className="space-y-1">
          {!isCollapsed && (
            <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3 flex items-center">
              <div className="h-px bg-gray-300 flex-1 mr-2"></div>
              Suporte
              <div className="h-px bg-gray-300 flex-1 ml-2"></div>
            </h3>
          )}
          {supportItems.map(renderMenuItem)}
        </div>
      </nav>

      {/* Logout Button */}
      {!isCollapsed && (
        <div className="p-4 border-t border-gray-200">
          <Button
            onClick={handleLogout}
            variant="outline"
            className="w-full border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 font-medium transition-all duration-200 rounded-lg py-2.5 text-xs hover:shadow-sm"
          >
            <LogOut className="h-3.5 w-3.5 mr-2" />
            Sair da Conta
          </Button>
        </div>
      )}

      {/* Footer Status */}
      {!isCollapsed && (
        <div className="p-4">
          <div className="bg-gradient-to-r from-green-50 via-blue-50 to-green-50 rounded-lg p-3 border border-green-200 shadow-sm">
            <div className="flex items-center space-x-2 mb-1">
              <div className="relative">
                <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse"></div>
                <div className="absolute inset-0 w-2.5 h-2.5 bg-green-400 rounded-full animate-ping opacity-75"></div>
              </div>
              <span className="text-xs font-semibold text-gray-700">Sistema Online</span>
            </div>
            <p className="text-xs text-gray-600 leading-3">Todos os serviços operacionais</p>
          </div>
        </div>
      )}
    </>
  )

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsMobileOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-xl border border-gray-200 rounded-lg h-10 w-10 transition-all duration-200"
      >
        <Menu className="h-4 w-4" />
      </Button>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-all duration-300"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Desktop Sidebar */}
      <div
        className={cn(
          "hidden md:flex bg-white/95 backdrop-blur-sm border-r border-gray-200 transition-all duration-350 ease-in-out flex-col shadow-sm",
          getSidebarWidth(),
          isTransitioning && "overflow-hidden",
          "min-h-screen max-h-screen",
        )}
      >
        <SidebarContent />
      </div>

      {/* Mobile Sidebar */}
      <div
        className={cn(
          "md:hidden fixed inset-y-0 left-0 z-50 bg-white border-r border-gray-200 transform transition-all duration-300 ease-in-out flex flex-col shadow-2xl",
          "w-80 max-w-[85vw]",
          isMobileOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <Link href={`/${locale}/dashboard`} className="flex items-center group">
              <div className="relative p-1 group-hover:scale-105 transition-transform duration-200">
                <SafeImage
                  src="kalender-logo.png"
                  alt="Kalender Logo"
                  className="h-7 w-7 drop-shadow-sm"
                  fallback={
                    <div className="h-7 w-7 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center shadow-md">
                      <Home className="h-3.5 w-3.5 text-white" />
                    </div>
                  }
                />
              </div>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileOpen(false)}
              className="text-gray-500 hover:text-gray-700 rounded-lg h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <SidebarContent />
      </div>

      {/* Enhanced Custom Scrollbar Styles */}
      <style jsx global>{`
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #cbd5e1 transparent;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 2px;
          transition: background 0.2s ease;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }

        /* Prevent layout shifts and ensure minimum sizes */
        @media (min-width: 768px) {
          .sidebar-container {
            contain: layout style;
          }
        }

        /* Ensure icons never get too small */
        .sidebar-icon {
          min-width: 16px !important;
          min-height: 16px !important;
        }
      `}</style>
    </>
  )
}
