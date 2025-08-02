"use client"

import type React from "react"

import { useState } from "react"
import { getAssetPath } from "@/lib/asset-utils"

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string
  fallback?: React.ReactNode
  onLoadError?: () => void
}

export function SafeImage({ src, fallback, onLoadError, className = "", alt = "", ...props }: SafeImageProps) {
  const [hasError, setHasError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const handleError = () => {
    setHasError(true)
    setIsLoading(false)
    onLoadError?.()
    console.warn(`Failed to load image: ${src}`)
  }

  const handleLoad = () => {
    setIsLoading(false)
  }

  // Use our utility to ensure correct path
  const safeSrc = getAssetPath(src)

  if (hasError && fallback) {
    return <>{fallback}</>
  }

  return (
    <>
      {isLoading && <div className={`bg-gray-200 animate-pulse ${className}`} />}
      <img
        {...props}
        src={safeSrc || "/placeholder.svg"}
        alt={alt}
        className={`${className} ${isLoading ? "opacity-0" : "opacity-100"} transition-opacity`}
        onError={handleError}
        onLoad={handleLoad}
        style={{ display: hasError ? "none" : "block" }}
      />
    </>
  )
}
