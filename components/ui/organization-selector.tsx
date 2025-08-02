"use client"

import { useState } from "react"
import { Building2, MapPin } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { mockOrganization, mockTenant, mockUnits, type Unit } from "@/lib/organization-context"

interface OrganizationSelectorProps {
  selectedUnit?: Unit
  onUnitChange?: (unit: Unit) => void
  showCompact?: boolean
}

export function OrganizationSelector({ selectedUnit, onUnitChange, showCompact = false }: OrganizationSelectorProps) {
  const [currentUnit, setCurrentUnit] = useState<Unit>(selectedUnit || mockUnits[0])

  const handleUnitChange = (unitId: string) => {
    const unit = mockUnits.find((u) => u.id === unitId)
    if (unit) {
      setCurrentUnit(unit)
      onUnitChange?.(unit)
    }
  }

  if (showCompact) {
    return (
      <div className="flex items-center space-x-2">
        <Select value={currentUnit.id} onValueChange={handleUnitChange}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {mockUnits.map((unit) => (
              <SelectItem key={unit.id} value={unit.id}>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-3 w-3" />
                  <span>{unit.name}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    )
  }

  return (
    <Card className="bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
      <CardContent className="p-4">
        <div className="space-y-3">
          {/* Organization Level */}
          {mockOrganization && (
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <Building2 className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-gray-600">Rede:</span>
              </div>
              <div className="flex items-center space-x-2">
                <img
                  src={mockOrganization.logo || "/placeholder.svg"}
                  alt={mockOrganization.name}
                  className="h-5 w-5 rounded"
                />
                <span className="font-semibold text-gray-900">{mockOrganization.name}</span>
              </div>
            </div>
          )}

          {/* Tenant Level */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <Building2 className="h-4 w-4 text-secondary" />
              <span className="text-sm font-medium text-gray-600">Estabelecimento:</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="font-semibold text-gray-900">{mockTenant.name}</span>
              <Badge variant="outline" className="bg-green-100 text-green-700 border-green-200">
                {mockTenant.subscription.planName}
              </Badge>
            </div>
          </div>

          {/* Unit Level */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4 text-accent" />
              <span className="text-sm font-medium text-gray-600">Unidade:</span>
            </div>
            <Select value={currentUnit.id} onValueChange={handleUnitChange}>
              <SelectTrigger className="w-64">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {mockUnits.map((unit) => (
                  <SelectItem key={unit.id} value={unit.id}>
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-3 w-3" />
                        <span>{unit.name}</span>
                      </div>
                      <Badge
                        variant="outline"
                        className={
                          unit.status === "active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"
                        }
                      >
                        {unit.status === "active" ? "Ativa" : "Inativa"}
                      </Badge>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
