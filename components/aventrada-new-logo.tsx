import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface AventradaNewLogoProps {
  href?: string
  size?: "small" | "medium" | "large" | number
  className?: string
  withText?: boolean
}

export function AventradaNewLogo({ href, size = "medium", className = "", withText = false }: AventradaNewLogoProps) {
  // Determine dimensions based on size
  let width: number
  let height: number

  if (typeof size === "number") {
    width = size
    height = size
  } else {
    const sizes = {
      small: 32,
      medium: 48,
      large: 64,
    }
    width = sizes[size]
    height = width
  }

  const logoContent = (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="relative transition-transform duration-300 ease-in-out group-hover:scale-105">
        <Image
          src="/aventrada-logo-new.png"
          alt="Aventrada"
          width={width}
          height={height}
          className="object-contain"
          priority
        />
      </div>

      {withText && <span className="text-xl font-bold tracking-tight">Aventrada</span>}
    </div>
  )

  if (href) {
    return (
      <Link href={href} className="group">
        {logoContent}
      </Link>
    )
  }

  return logoContent
}
