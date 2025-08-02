/**
 * Utility functions for handling static assets correctly across locales
 */

/**
 * Ensures asset paths are always absolute and not affected by locale routing
 * @param path - The asset path (with or without leading slash)
 * @returns Absolute path to the asset
 */
export function getAssetPath(path: string): string {
  // Remove any locale prefixes that might have been accidentally added
  const cleanPath = path.replace(/^\/(pt-BR|en-US|es-ES)/, "")

  // Ensure the path starts with a slash for absolute referencing
  return cleanPath.startsWith("/") ? cleanPath : `/${cleanPath}`
}

/**
 * Get the correct image source for any environment
 * @param imageName - Name of the image file
 * @param folder - Optional folder within public directory
 * @returns Correct absolute path to the image
 */
export function getImageSrc(imageName: string, folder?: string): string {
  const basePath = folder ? `/${folder}` : ""
  return getAssetPath(`${basePath}/${imageName}`)
}

/**
 * Preload critical images to avoid loading delays
 * @param imagePaths - Array of image paths to preload
 */
export function preloadImages(imagePaths: string[]): void {
  if (typeof window !== "undefined") {
    imagePaths.forEach((path) => {
      const img = new Image()
      img.src = getAssetPath(path)
    })
  }
}
