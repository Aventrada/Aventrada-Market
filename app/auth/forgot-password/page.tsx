"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, Mail } from "lucide-react"
import { createClientSupabaseClient } from "@/lib/supabase"
import { AuthLayout } from "../components/auth-layout"

export default function ForgotPasswordPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  useEffect(() => {
    if (successMessage) {
      // Hacer scroll suave hacia el mensaje de éxito
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }, [successMessage])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setSuccessMessage(null)
    setIsLoading(true)

    try {
      const supabase = createClientSupabaseClient()

      // Normalize email (trim whitespace and convert to lowercase)
      const normalizedEmail = email.trim().toLowerCase()

      // Check if the email exists in registrations
      const { data: registration, error: registrationError } = await supabase
        .from("registrations")
        .select("id, status, email")
        .eq("email", normalizedEmail)
        .maybeSingle()

      if (registrationError) {
        console.error("Error checking registration:", registrationError)
        throw new Error("Error al verificar el registro. Por favor, inténtalo de nuevo.")
      }

      // If no registration found, show clear message
      if (!registration) {
        setError("No se encontró ninguna cuenta con este correo electrónico. Por favor, regístrate primero.")
        setIsLoading(false)
        return
      }

      // If registration exists but not approved
      if (registration.status !== "approved") {
        setError(
          "Tu registro está pendiente de aprobación. No puedes restablecer tu contraseña hasta que sea aprobado.",
        )
        setIsLoading(false)
        return
      }

      // If registration is approved, send password reset email
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(normalizedEmail, {
        redirectTo: `${window.location.origin}/auth/confirm?next=/auth/reset-password`,
      })

      if (resetError) {
        throw resetError
      }

      setSuccessMessage(
        "Hemos enviado un enlace para restablecer tu contraseña. Por favor, revisa tu correo electrónico.",
      )
    } catch (error: any) {
      console.error("Password reset error:", error)
      setError(error?.message || "Error al enviar el enlace. Por favor, inténtalo de nuevo.")
    } finally {
      setIsLoading(false)
    }
  }

  const validateEmail = (email: string) => {
    return email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
  }

  return (
    <AuthLayout>
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 relative overflow-hidden">
        {/* Decorative Element */}
        <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-gradient-to-br from-purple-100 to-pink-100 opacity-50" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 rounded-full bg-gradient-to-tr from-purple-100 to-pink-100 opacity-50" />

        <div className="relative">
          <h1 className="text-2xl font-bold text-gray-900 text-center mb-2">Restablecer contraseña</h1>
          <p className="text-gray-500 text-center mb-6">
            Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña. El enlace será
            válido por 24 horas.
          </p>

          {error && (
            <Alert
              variant="destructive"
              className="mb-6 bg-red-50 border-red-200 text-red-600"
              role="alert"
              aria-live="assertive"
            >
              <AlertCircle className="h-4 w-4" />
              <AlertDescription id="email-error">{error}</AlertDescription>
            </Alert>
          )}

          {successMessage && (
            <Alert className="mb-6 bg-green-50 border-green-200 text-green-600" role="status" aria-live="polite">
              <AlertDescription>{successMessage}</AlertDescription>
            </Alert>
          )}

          {!successMessage && (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700 font-medium">
                  Correo electrónico
                </Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                    <Mail size={18} />
                  </div>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={(e) => {
                      if (e.target.value && !validateEmail(e.target.value)) {
                        setError("Por favor, ingresa un correo electrónico válido")
                      } else {
                        setError(null)
                      }
                    }}
                    placeholder="tu@ejemplo.com"
                    required
                    aria-describedby="email-error"
                    className={`pl-10 border-gray-200 focus:border-purple-500 focus:ring-purple-500 ${
                      error && error.includes("correo electrónico válido") ? "border-red-300" : ""
                    }`}
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full py-5 sm:py-6 bg-gradient-to-r from-[#B46CFF] to-[#F94892] hover:from-[#A55BEE] hover:to-[#E83781] text-white font-medium rounded-xl transition-all duration-300 shadow-md hover:shadow-lg"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Enviando enlace...
                  </span>
                ) : (
                  "Enviar enlace"
                )}
              </Button>

              <div className="text-center text-sm text-gray-500">
                <Link href="/auth/signin" className="text-purple-600 hover:text-purple-700 font-medium">
                  Volver a iniciar sesión
                </Link>
              </div>
            </form>
          )}

          {successMessage && (
            <div className="text-center mt-6">
              <Button
                variant="outline"
                className="border-gray-200 text-gray-700 hover:bg-gray-50"
                onClick={() => router.push("/auth/signin")}
              >
                Volver a iniciar sesión
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Trust Badges */}
      <div className="mt-6 pb-4 flex justify-center items-center">
        <div className="flex space-x-8">
          <div className="flex items-center text-gray-500 text-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-1.5 text-purple-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
            Proceso seguro
          </div>
          <div className="flex items-center text-gray-500 text-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-1.5 text-purple-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
            Privacidad protegida
          </div>
        </div>
      </div>
    </AuthLayout>
  )
}
