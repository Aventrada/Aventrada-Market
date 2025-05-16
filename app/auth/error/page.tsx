"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

export default function AuthErrorPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const error = searchParams.get("error")

  // Translate error messages to Spanish
  const getErrorMessage = (errorCode: string | null) => {
    if (!errorCode) return "Ha ocurrido un error de autenticación desconocido."

    // Common Supabase error messages
    switch (errorCode) {
      case "invalid_token":
      case "expired_token":
        return "El enlace ha expirado o no es válido. Por favor, solicita un nuevo enlace de recuperación."
      case "missing_parameters":
        return "Faltan parámetros en la URL. Por favor, intenta nuevamente."
      case "Email link is invalid or has expired":
        return "El enlace de correo electrónico no es válido o ha expirado. Por favor, solicita un nuevo enlace."
      default:
        return errorCode
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 h-[500px] w-[500px] rounded-full bg-purple-600/20 blur-[100px]" />
        <div className="absolute bottom-0 left-0 h-[500px] w-[500px] rounded-full bg-pink-600/20 blur-[100px]" />
      </div>

      <div className="w-full max-w-md z-10">
        <div className="bg-black/40 backdrop-blur-xl p-8 rounded-2xl shadow-xl border border-white/10">
          <div className="flex justify-center mb-6">
            <div className="h-12 w-12">
              <img src="/aventrada-logo.png" alt="Aventrada Logo" className="h-full w-full object-contain" />
            </div>
          </div>

          <h1 className="text-2xl font-bold text-white text-center mb-6">Error de autenticación</h1>

          <Alert variant="destructive" className="mb-6 bg-red-500/10 border-red-500/20 text-red-500">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{getErrorMessage(error)}</AlertDescription>
          </Alert>

          <p className="text-gray-300 text-center mb-6">
            Ha ocurrido un error durante el proceso de autenticación. Por favor, intenta nuevamente o contacta a soporte
            si el problema persiste.
          </p>

          <div className="flex flex-col gap-3">
            <Button
              onClick={() => router.push("/auth/login")}
              className="w-full py-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-medium rounded-xl"
            >
              Volver al inicio de sesión
            </Button>

            <Button
              variant="outline"
              onClick={() => router.push("/auth/forgot-password")}
              className="w-full py-6 border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white rounded-xl"
            >
              Restablecer contraseña
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
