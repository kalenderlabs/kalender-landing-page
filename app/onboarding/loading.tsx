import { Loader2, Building2, Store, User, Briefcase } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export default function OnboardingLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary/5 flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardContent className="p-8 text-center">
          <div className="mb-6">
            <Loader2 className="h-12 w-12 animate-spin mx-auto text-primary" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Configurando sua conta...</h3>
          <p className="text-gray-600 text-sm">
            Estamos criando sua organização, estabelecimento e configurações iniciais.
          </p>
          <div className="mt-6 flex justify-center space-x-2">
            {[Building2, Store, User, Briefcase].map((Icon, index) => (
              <div
                key={index}
                className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center animate-pulse"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <Icon className="h-4 w-4 text-primary" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
