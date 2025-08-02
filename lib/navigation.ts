"use client"

import { useRouter } from "next/navigation"
import { useCallback } from "react"

export function useNavigation() {
  const router = useRouter()

  const navigate = useCallback(
    (path: string) => {
      // Clean any locale prefixes from the path
      const cleanPath = path.replace(/^\/(pt-BR|pt|en)/, "") || "/"

      // Ensure path starts with /
      const finalPath = cleanPath.startsWith("/") ? cleanPath : `/${cleanPath}`

      router.push(finalPath)
    },
    [router],
  )

  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }, [])

  return { navigate, scrollToSection }
}
