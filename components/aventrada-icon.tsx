import type { SVGProps } from "react"
import Link from "next/link"

interface AventradaIconProps extends SVGProps<SVGSVGElement> {
  href?: string
  size?: "small" | "medium" | "large" | number
  className?: string
  color?: string
}

export function AventradaIcon({
  href,
  size = "medium",
  className = "",
  color = "#0f0524",
  ...props
}: AventradaIconProps) {
  // Determine size
  let width: number

  if (typeof size === "number") {
    width = size
  } else {
    const sizes = {
      small: 24,
      medium: 32,
      large: 40,
    }
    width = sizes[size]
  }

  const logoContent = (
    <div className={`flex items-center ${className}`}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={width}
        viewBox="0 0 150 150"
        className="transition-transform duration-300 ease-in-out group-hover:scale-105"
        aria-label="Aventrada Icon"
        role="img"
        {...props}
      >
        <path
          fill={color}
          d="M75,10c-35.9,0-65,29.1-65,65s29.1,65,65,65s65-29.1,65-65S110.9,10,75,10z M103.3,105.8
          c-3.3,3.3-8.7,3.3-12,0L70.4,85c-7.8,3.9-17.2,2.8-23.7-3.7c-8.3-8.3-8.3-21.9,0-30.2s21.9-8.3,30.2,0
          c6.5,6.5,7.6,15.9,3.7,23.7L101.4,96c3.3,3.3,3.3,8.7,0,12L103.3,105.8z"
        />
        <circle fill={color} cx="60" cy="60" r="15" />
      </svg>
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
