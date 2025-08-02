import { redirect } from "next/navigation"
import type { Locale } from "@/lib/i18n"

interface HomePageProps {
  params: { locale: Locale }
}

export default function HomePage({ params: { locale } }: HomePageProps) {
  // Redireciona diretamente para o login
  redirect(`/${locale}/login`)
}
