"use client"

import Link from "next/link"
import { useTheme } from "next-themes"
import { AventradaLogoSVG } from "./icons/aventrada-logo-svg"
import { AventradaLogoDark } from "./icons/aventrada-logo-dark"

interface AventradaLogoThemeProps {
  href?: string
  size?: "small" | "medium" | "large"
  withText?: boolean
  className?: string
  lightColor?: string
  darkColor?: string
}

export function AventradaLogoTheme({
  href = "/",
  size = "medium",
  withText = true,
  className = "",
  lightColor = "#6366F1",
  darkColor = "#818CF8",
}: AventradaLogoThemeProps) {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  const sizes = {
    small: { width: 24, height: 24, textSize: "text-lg" },
    medium: { width: 32, height: 32, textSize: "text-xl" },
    large: { width: 40, height: 40, textSize: "text-2xl" },
  }

  const { width, height, textSize } = sizes[size]

  const LogoComponent = isDark ? AventradaLogoDark : AventradaLogoSVG
  const color = isDark ? darkColor : lightColor

  const logoContent = (
    <div className={`flex items-center gap-2 ${className}`}>
      <LogoComponent
        width={width}
        height={height}
        color={color}
        className="transition-transform duration-300 ease-in-out group-hover:scale-110"
        aria-hidden="true"
      />
      {withText && (
        <span className={`font-bold ${textSize} ${isDark ? "text-gray-100" : "text-gray-900"}`}>Aventrada</span>
      )}
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
