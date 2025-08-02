"use client"

import NextImage from "next/image"
import { useState } from "react"

interface KalenderLogoProps {
  width?: number
  height?: number
  className?: string
  alt?: string
}

export function KalenderLogo({ width = 32, height = 32, className = "", alt = "Kalender" }: KalenderLogoProps) {
  const [imageError, setImageError] = useState(false)

  // Sempre usar o caminho absoluto da raiz, sem verificações complexas
  const logoPath = "/kalender-logo.png"

  if (imageError) {
    // Fallback simples
    return (
      <div
        className={`flex items-center justify-center bg-gradient-to-r from-cyan-400 to-blue-600 text-white font-bold rounded ${className}`}
        style={{ width, height }}
      >
        K
      </div>
    )
  }

  return (
    <NextImage
      src={logoPath}
      alt={alt}
      width={width}
      height={height}
      className={`${className} object-contain`}
      priority
      onError={() => setImageError(true)}
    />
  )
}
