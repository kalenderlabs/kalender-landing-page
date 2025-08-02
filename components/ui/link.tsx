import type React from "react"
import NextLink from "next/link"
import { forwardRef } from "react"

interface LinkProps extends React.ComponentProps<typeof NextLink> {
  children: React.ReactNode
  className?: string
}

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(({ href, children, className, ...props }, ref) => {
  // Ensure href doesn't have locale prefixes
  const cleanHref = typeof href === "string" ? href.replace(/^\/(pt-BR|pt|en)/, "") || "/" : href

  return (
    <NextLink href={cleanHref} ref={ref} className={className} {...props}>
      {children}
    </NextLink>
  )
})

Link.displayName = "Link"
