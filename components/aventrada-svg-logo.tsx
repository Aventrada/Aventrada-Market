import type { SVGProps } from "react"
import Link from "next/link"

interface AventradaLogoProps extends SVGProps<SVGSVGElement> {
  href?: string
  size?: "small" | "medium" | "large" | number
  withText?: boolean
  className?: string
  color?: string
}

export function AventradaSVGLogo({
  href,
  size = "medium",
  withText = true,
  className = "",
  color = "#0f0524",
  ...props
}: AventradaLogoProps) {
  // Determine dimensions based on size
  let width: number
  let height: number

  if (typeof size === "number") {
    width = size
    height = size * 0.558 // Maintain aspect ratio of the original SVG
  } else {
    const sizes = {
      small: 36,
      medium: 54,
      large: 72,
    }
    width = sizes[size]
    height = width * 0.558
  }

  const logoContent = (
    <div className={`flex items-center gap-2 ${className}`}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        viewBox="0 0 583.4 325.4"
        className="transition-transform duration-300 ease-in-out group-hover:scale-105"
        aria-label="Aventrada"
        role="img"
        {...props}
      >
        <path
          className={`${withText ? "hidden" : ""}`}
          fill={color}
          d="M291.7,169.1c8,0,14.7-5.6,16.3-13.2.5-2.1,2.4-3.5,4.5-3.5h16c2.6,0,4.7,2.1,4.7,4.7v23.9c0,6.6,5.3,11.9,11.9,11.9l41.6.2c7.2,0,12.3-6.9,10.2-13.8l-48.1-155.4C344.4,9.8,331.3.2,316.5.2h-49.7c-14.8,0-27.9,9.6-32.2,23.8l-48.1,155.4c-2.1,6.9,3,13.8,10.2,13.8l41.6-.2c6.6,0,11.9-5.4,11.9-11.9v-23.9c0-2.6,2.1-4.7,4.7-4.7h16c2.1,0,4.1,1.4,4.5,3.5,1.6,7.5,8.3,13.2,16.3,13.2Z"
        />
        <path
          fill={color}
          d="M255.6,92.1l-12.3-2.8c-4.1-.9-4.1-6.7,0-7.6l12.3-2.8c14.7-3.3,26.1-14.8,29.4-29.4l2.8-12.3c.5-2,2.1-3,3.8-3s3.4,1,3.8,3l2.8,12.3c3.3,14.6,14.8,26.1,29.4,29.4l12.3,2.8c4.1.9,4.1,6.7,0,7.6l-12.3,2.8c-14.7,3.3-26.1,14.8-29.4,29.4l-2.8,12.3c-.5,2-2.1,3-3.8,3s-3.4-1-3.8-3l-2.8-12.3c-3.3-14.7-14.8-26.1-29.4-29.4Z"
        />
        {withText && (
          <>
            <path
              fill={color}
              d="M37.1,235.4L.9,324h12.8l7.9-20h39.3l8,20h13l-36.1-88.5h-8.7ZM25.8,293.5l15.6-38.8,15.4,38.8h-31Z"
            />
            <polygon
              fill={color}
              points="104.3 306.1 85.7 263.4 73 263.4 100.8 324 107.5 324 135.3 263.4 123.1 263.4 104.3 306.1"
            />
            <path
              fill={color}
              d="M170.1,262.1c-17.6,0-31.2,13.8-31.2,31.5s13.8,31.6,32,31.6,18.2-3.7,24.1-10.5l-7.4-7.5c-4,4.8-9.9,7.1-16.7,7.1-10.8,0-18.5-6.4-20.3-16.5h47.4c.5-2.4.6-4.3.6-6.1,0-17.2-12-29.7-28.6-29.7ZM150.6,288.4c1.8-9.6,9.1-15.7,19.3-15.7s16.3,5.9,17.6,15.7h-36.9Z"
            />
            <path
              fill={color}
              d="M241.8,262.1c-8,0-14.8,3.4-19.1,9.2v-7.9h-11.5v60.6h11.5v-35.3c0-9.2,6.6-15.8,15.8-15.8s15.6,6.5,15.6,15.8v35.3h11.5v-37.6c0-12.6-9.8-24.2-23.7-24.2Z"
            />
            <polygon
              fill={color}
              points="301.1 238 289.6 238 289.6 263.4 274.7 263.4 274.7 273.8 289.6 273.8 289.6 324 301.1 324 301.1 273.8 316 273.8 316 263.4 301.1 263.4 301.1 238"
            />
            <path
              fill={color}
              d="M355.2,262.1c-7.4,0-13,3.1-16.5,8.4v-7.1h-11.5v60.6h11.5v-34.6c0-11,6-16.5,14.5-16.5s6.9,1.1,9.6,3.8l7.5-7.8c-4.2-4.8-9.1-6.9-15.2-6.9Z"
            />
            <path
              fill={color}
              d="M422.4,271.7c-4.3-6-11.6-9.6-20.2-9.6-16.7,0-29.6,13.9-29.6,31.6s12.9,31.5,29.6,31.5,15.8-3.6,20.2-9.4v8.2h11.6v-60.6h-11.6v8.3ZM404.2,314.4c-11.5,0-19.6-8.7-19.6-20.8s8-20.7,19.5-20.7,19.1,8.4,19.1,20.8-7.7,20.7-19,20.7Z"
            />
            <path
              fill={color}
              d="M496.6,271.8c-4.5-6-11.7-9.7-20.4-9.7-16.6,0-29.3,13.8-29.3,31.6s12.8,31.5,29.5,31.5,15.9-3.6,20.3-9.6v8.3h11.6v-91.1h-11.6v38.9ZM478.3,314.4c-11.5,0-19.5-8.5-19.5-20.8s8-20.7,19.4-20.7,19.3,8.5,19.3,20.8-7.8,20.7-19.1,20.7Z"
            />
            <path
              fill={color}
              d="M570.9,263.4v8.3c-4.3-6-11.6-9.6-20.2-9.6-16.7,0-29.6,13.9-29.6,31.6s12.9,31.5,29.6,31.5,15.8-3.6,20.2-9.4v8.2h11.6v-60.6h-11.6ZM552.6,314.4c-11.5,0-19.6-8.7-19.6-20.8s8-20.7,19.5-20.7,19.1,8.4,19.1,20.8-7.7,20.7-19,20.7Z"
            />
          </>
        )}
      </svg>
      {/* We don't need text alongside the SVG if withText is true, as the logo already contains the text */}
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
