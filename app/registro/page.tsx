"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, Mail, Lock, User } from "lucide-react"
import { createClientSupabaseClient } from "@/lib/supabase"

export default function RegistroPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [fullName, setFullName] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [showResendButton, setShowResendButton] = useState(false)
  const [resendLoading, setResendLoading] = useState(false)
  const [debugInfo, setDebugInfo] = useState<any>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setSuccessMessage(null)
    setShowResendButton(false)
    setIsLoading(true)
    setDebugInfo(null)

    try {
      // Validaciones básicas
      if (password !== confirmPassword) {
        throw new Error("Las contraseñas no coinciden")
      }

      if (password.length < 8) {
        throw new Error("La contraseña debe tener al menos 8 caracteres")
      }

      const supabase = createClientSupabaseClient()

      // Normalize email - more aggressive normalization
      const normalizedEmail = email.trim().toLowerCase()

      // DIRECT API APPROACH - Bypass potential RLS issues
      const response = await fetch("/api/check-approved-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: normalizedEmail }),
      })

      const result = await response.json()

      // Store debug info for potential troubleshooting
      setDebugInfo(result)

      if (!response.ok || !result.approved) {
        if (result.exists && result.status !== "approved") {
          throw new Error(
            `Tu solicitud de registro está en estado "${result.status}". Te notificaremos por correo cuando sea aprobada.`,
          )
        } else {
          throw new Error(
            "No se encontró una solicitud de registro aprobada con este correo electrónico. Por favor, solicita acceso primero.",
          )
        }
      }

      // Registration is approved, proceed with account creation
      const { data, error } = await supabase.auth.signUp({
        email: normalizedEmail,
        password,
        options: {
          data: {
            full_name: fullName,
            registration_id: result.id,
          },
          emailRedirectTo: `${window.location.origin}/auth/login`,
        },
      })

      if (error) {
        // Check if the error is because the user already exists
        if (error.message.includes("already registered")) {
          throw new Error(
            "Este correo ya está registrado. Si es tuyo, intenta iniciar sesión o recuperar tu contraseña.",
          )
        }
        throw error
      }

      setSuccessMessage(
        "¡Cuenta creada con éxito! Por favor, revisa tu correo electrónico para verificar tu cuenta. " +
          "Revisa también tu carpeta de spam si no lo encuentras en la bandeja de entrada.",
      )
      setShowResendButton(true)
    } catch (error: any) {
      console.error("Error en el registro:", error)
      setError(error?.message || "Error al crear la cuenta. Por favor, inténtalo de nuevo.")
    } finally {
      setIsLoading(false)
    }
  }

  async function handleResendEmail() {
    setResendLoading(true)
    setError(null)

    try {
      const supabase = createClientSupabaseClient()
      const { error } = await supabase.auth.resend({
        type: "signup",
        email: email.trim().toLowerCase(),
        options: {
          emailRedirectTo: `${window.location.origin}/auth/login`,
        },
      })

      if (error) throw error

      setSuccessMessage("¡Correo de verificación reenviado! Por favor, revisa tu bandeja de entrada y carpeta de spam.")
    } catch (error: any) {
      console.error("Error al reenviar el correo:", error)
      setError(error?.message || "Error al reenviar el correo. Por favor, inténtalo de nuevo.")
    } finally {
      setResendLoading(false)
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

          <h1 className="text-2xl font-bold text-white text-center mb-6">Crear Cuenta</h1>

          {error && (
            <Alert variant="destructive" className="mb-6 bg-red-500/10 border-red-500/20 text-red-500">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {successMessage && (
            <Alert className="mb-6 bg-green-500/10 border-green-500/20 text-green-500">
              <AlertDescription>{successMessage}</AlertDescription>
            </Alert>
          )}

          {showResendButton ? (
            <div className="space-y-4">
              <p className="text-white text-center">
                Si no recibiste el correo de verificación o el enlace expiró, puedes solicitar uno nuevo:
              </p>
              <Button
                onClick={handleResendEmail}
                disabled={resendLoading}
                className="w-full py-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-medium rounded-xl"
              >
                {resendLoading ? (
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
                    Reenviando correo...
                  </span>
                ) : (
                  "Reenviar correo de verificación"
                )}
              </Button>
              <div className="text-center">
                <a href="/auth/login" className="text-purple-400 hover:text-purple-300">
                  Volver a iniciar sesión
                </a>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">
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
                    placeholder="tu@ejemplo.com"
                    required
                    className="border-gray-700 bg-black/50 pl-10 text-white placeholder:text-gray-500 focus:border-purple-500 focus:ring-purple-500"
                  />
                </div>
                <p className="text-xs text-gray-400">Usa el mismo correo electrónico con el que solicitaste acceso</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-white">
                  Nombre completo
                </Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                    <User size={18} />
                  </div>
                  <Input
                    id="fullName"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Tu nombre completo"
                    required
                    className="border-gray-700 bg-black/50 pl-10 text-white placeholder:text-gray-500 focus:border-purple-500 focus:ring-purple-500"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-white">
                  Contraseña
                </Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                    <Lock size={18} />
                  </div>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    minLength={8}
                    className="border-gray-700 bg-black/50 pl-10 text-white placeholder:text-gray-500 focus:border-purple-500 focus:ring-purple-500"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-white">
                  Confirmar contraseña
                </Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                    <Lock size={18} />
                  </div>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="border-gray-700 bg-black/50 pl-10 text-white placeholder:text-gray-500 focus:border-purple-500 focus:ring-purple-500"
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full py-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-medium rounded-xl"
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
                    Creando cuenta...
                  </span>
                ) : (
                  "Crear cuenta"
                )}
              </Button>

              <div className="text-center text-sm text-gray-400">
                ¿Ya tienes una cuenta?{" "}
                <a href="/auth/login" className="text-purple-400 hover:text-purple-300">
                  Iniciar sesión
                </a>
              </div>
            </form>
          )}

          {/* Debug info - only visible in development */}
          {process.env.NODE_ENV === "development" && debugInfo && (
            <div className="mt-4 p-2 bg-gray-800 rounded text-xs text-gray-300 overflow-auto max-h-40">
              <pre>{JSON.stringify(debugInfo, null, 2)}</pre>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
