"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { CheckCircle, ArrowRight, Calendar, Users, Settings, BarChart3 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function OnboardingSuccessPage() {
  const router = useRouter()
  const [countdown, setCountdown] = useState(10)

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          router.push("/dashboard")
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [router])

  const handleGoToDashboard = () => {
    router.push("/dashboard")
  }

  const nextSteps = [
    {
      icon: Calendar,
      title: "Configure seus horários",
      description: "Defina seus horários de funcionamento e disponibilidade",
      action: "Configurar horários",
    },
    {
      icon: Users,
      title: "Adicione mais serviços",
      description: "Crie outros serviços que você oferece",
      action: "Gerenciar serviços",
    },
    {
      icon: Settings,
      title: "Personalize seu perfil",
      description: "Complete as informações do seu estabelecimento",
      action: "Editar perfil",
    },
    {
      icon: BarChart3,
      title: "Acompanhe relatórios",
      description: "Veja estatísticas e relatórios do seu negócio",
      action: "Ver relatórios",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">🎉 Parabéns! Sua conta foi criada com sucesso!</h1>
          <p className="text-xl text-gray-600 mb-6">Tudo está pronto para você começar a usar o Kalender</p>

          {/* Auto redirect notice */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8 inline-block">
            <p className="text-blue-800 text-sm">
              Você será redirecionado para o dashboard em <strong>{countdown} segundos</strong>
            </p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-green-600">✓</div>
              <p className="text-sm text-gray-600">Organização criada</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-green-600">✓</div>
              <p className="text-sm text-gray-600">Estabelecimento configurado</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-green-600">✓</div>
              <p className="text-sm text-gray-600">Conta de usuário criada</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-green-600">✓</div>
              <p className="text-sm text-gray-600">Primeiro serviço adicionado</p>
            </CardContent>
          </Card>
        </div>

        {/* Next Steps */}
        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm mb-8">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-gray-900">Próximos Passos</CardTitle>
            <CardDescription className="text-base">
              Recomendamos que você complete estas configurações para aproveitar ao máximo o Kalender
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {nextSteps.map((step, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-4 p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50/50 transition-colors"
                >
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <step.icon className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">{step.title}</h3>
                    <p className="text-sm text-gray-600 mb-3">{step.description}</p>
                    <Button variant="outline" size="sm" className="text-xs bg-transparent">
                      {step.action}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="text-center space-y-4">
          <Button
            onClick={handleGoToDashboard}
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-lg"
          >
            Ir para o Dashboard
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>

          <div className="text-sm text-gray-500">Ou aguarde o redirecionamento automático</div>
        </div>

        {/* Help Section */}
        <div className="mt-12 text-center">
          <Card className="bg-gray-50 border-gray-200">
            <CardContent className="p-6">
              <h3 className="font-semibold text-gray-900 mb-2">Precisa de ajuda?</h3>
              <p className="text-sm text-gray-600 mb-4">Nossa equipe está aqui para ajudar você a começar</p>
              <div className="flex justify-center space-x-4">
                <Button variant="outline" size="sm">
                  Central de Ajuda
                </Button>
                <Button variant="outline" size="sm">
                  Falar com Suporte
                </Button>
                <Button variant="outline" size="sm">
                  Ver Tutoriais
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
