import Link from "next/link"
import { AventradaLogoSVG } from "./icons/aventrada-logo-svg"

interface AventradaLogoProps {
  href?: string
  size?: "small" | "medium" | "large"
  withText?: boolean
  className?: string
  color?: string
}

export function AventradaLogo({
  href = "/",
  size = "medium",
  withText = true,
  className = "",
  color = "#6366F1",
}: AventradaLogoProps) {
  const sizes = {
    small: { width: 24, height: 24, textSize: "text-lg" },
    medium: { width: 32, height: 32, textSize: "text-xl" },
    large: { width: 40, height: 40, textSize: "text-2xl" },
  }

  const { width, height, textSize } = sizes[size]

  const logoContent = (
    <div className={`flex items-center gap-2 ${className}`}>
      <AventradaLogoSVG
        width={width}
        height={height}
        color={color}
        className="transition-transform duration-300 ease-in-out group-hover:scale-110"
        aria-hidden="true"
      />
      {withText && <span className={`font-bold text-gray-900 ${textSize}`}>Aventrada</span>}
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
