interface LogoProps {
  className?: string
  width?: number
  height?: number
}

export function Logo({ className = "h-10 w-10", width = 40, height = 40 }: LogoProps) {
  return <img src="/kalender-logo.png" alt="Kalender" width={width} height={height} className={className} />
}
