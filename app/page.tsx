import { redirect } from "next/navigation"

export default function RootPage() {
  // Redireciona para o onboarding para novos usuários
  // Em produção, você verificaria se o usuário já completou o onboarding
  redirect("/onboarding")
}
