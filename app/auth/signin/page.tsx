"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Mail, Lock, Loader2 } from "lucide-react"
import { createClientSupabaseClient } from "@/lib/supabase"
import { AuthLayout } from "../components/auth-layout"
import { ErrorHandler } from "./error-handler"

export default function SignInPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const initialEmail = searchParams.get("email") || ""
  const redirectTo = searchParams.get("redirectTo") || "/dashboard"
  const errorMessage = searchParams.get("error")

  const [email, setEmail] = useState(initialEmail)
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(errorMessage)
  const [isCheckingEmail, setIsCheckingEmail] = useState(false)

  // Check if user is already logged in
  useEffect(() => {
    const checkSession = async () => {
      const supabase = createClientSupabaseClient()
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (session) {
        router.push("/dashboard")
      }
    }

    checkSession()
  }, [router])

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
    setError(null)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    try {
      const supabase = createClientSupabaseClient()
      const normalizedEmail = email.toLowerCase().trim()

      // First, check if the email exists in the registrations table
      const { data: registrationData, error: registrationError } = await supabase
        .from("registrations")
        .select("id, status, email")
        .ilike("email", normalizedEmail)
        .maybeSingle()

      if (registrationError) {
        console.error("Error checking registration:", registrationError)
        throw new Error(`Error al verificar el registro: ${registrationError.message}`)
      }

      if (!registrationData) {
        setError("No se encontró ningún registro para este correo electrónico. Por favor, regístrate primero.")
        setIsLoading(false)
        return
      }

      // If registration exists but is not approved, approve it automatically
      if (registrationData.status !== "approved") {
        const { error: updateError } = await supabase
          .from("registrations")
          .update({
            status: "approved",
            updated_at: new Date().toISOString(),
          })
          .eq("id", registrationData.id)

        if (updateError) {
          console.error("Error updating registration status:", updateError)
        }
      }

      // Use the exact email from the database for authentication
      const emailToUse = registrationData.email

      // Attempt to sign in with the exact email from the database
      const { data, error } = await supabase.auth.signInWithPassword({
        email: emailToUse,
        password,
      })

      if (error) {
        if (error.message.includes("Invalid login credentials")) {
          setError("Credenciales incorrectas. Por favor, verifica tu correo y contraseña.")
        } else {
          setError(`Error al iniciar sesión: ${error.message}`)
        }
        console.error("Error de inicio de sesión:", error)
        return
      }

      // Verify the session was created
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session) {
        setError("Error al crear la sesión. Por favor, inténtalo de nuevo.")
        return
      }

      // Redirect to dashboard or the original URL the user was trying to access
      router.push(redirectTo)
    } catch (error: any) {
      console.error("Error en el inicio de sesión:", error)
      setError(error?.message || "Error al iniciar sesión. Por favor, inténtalo de nuevo.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthLayout>
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 relative overflow-hidden">
        {/* Decorative Element */}
        <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-gradient-to-br from-purple-100 to-pink-100 opacity-50" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 rounded-full bg-gradient-to-tr from-purple-100 to-pink-100 opacity-50" />

        <div className="relative">
          <h1 className="text-2xl font-bold text-gray-900 text-center mb-2">Iniciar sesión</h1>
          <p className="text-gray-500 text-center mb-6">Accede a tu cuenta de Aventrada</p>

          {error && <ErrorHandler error={error} />}

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
                  onChange={handleEmailChange}
                  placeholder="tu@ejemplo.com"
                  required
                  className="pl-10 border-gray-200 focus:border-purple-500 focus:ring-purple-500"
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-gray-700 font-medium">
                  Contraseña
                </Label>
                <Link href="/auth/forgot-password" className="text-sm text-purple-600 hover:text-purple-700">
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>
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
                  className="pl-10 border-gray-200 focus:border-purple-500 focus:ring-purple-500"
                  disabled={isLoading}
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full py-6 bg-gradient-to-r from-[#B46CFF] to-[#F94892] hover:from-[#A55BEE] hover:to-[#E83781] text-white font-medium rounded-xl transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <Loader2 className="animate-spin mr-2 h-5 w-5" />
                  Iniciando sesión...
                </span>
              ) : (
                "Iniciar sesión"
              )}
            </Button>

            <div className="text-center text-sm text-gray-500">
              ¿No tienes cuenta?{" "}
              <Link href="/auth/signup" className="text-purple-600 hover:text-purple-700 font-medium">
                Regístrate
              </Link>
            </div>
          </form>
        </div>
      </div>
    </AuthLayout>
  )
}
