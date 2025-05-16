"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export function HomeRedirect() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to the home page
    window.location.href = "https://home.aventrada.com/"
  }, [])

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <p className="text-lg">Redirigiendo a la página de inicio...</p>
    </div>
  )
}
