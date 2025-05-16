"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, Lock, ArrowLeft, Eye, EyeOff, CheckCircle2 } from "lucide-react"
import { createClientSupabaseClient } from "@/lib/supabase"

export default function ResetPasswordPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState({
    length: false,
    hasNumber: false,
    hasSpecial: false,
    hasUppercase: false,
  })

  // Check if we have a valid session when the component mounts
  useEffect(() => {
    const checkSession = async () => {
      const supabase = createClientSupabaseClient()
      const { data } = await supabase.auth.getSession()

      if (!data.session) {
        setError(
          "La sesión ha expirado o no es válida. Por favor, solicita un nuevo enlace para restablecer tu contraseña.",
        )
      }
    }

    checkSession()
  }, [])

  // Check password strength
  useEffect(() => {
    setPasswordStrength({
      length: password.length >= 8,
      hasNumber: /\d/.test(password),
      hasSpecial: /[!@#$%^&*(),.?":{}|<>]/.test(password),
      hasUppercase: /[A-Z]/.test(password),
    })
  }, [password])

  // Calculate overall strength
  const getPasswordStrengthPercentage = () => {
    const { length, hasNumber, hasSpecial, hasUppercase } = passwordStrength
    const criteria = [length, hasNumber, hasSpecial, hasUppercase]
    const metCriteria = criteria.filter(Boolean).length
    return (metCriteria / criteria.length) * 100
  }

  const strengthPercentage = getPasswordStrengthPercentage()

  const getStrengthColor = () => {
    if (strengthPercentage <= 25) return "bg-red-500"
    if (strengthPercentage <= 50) return "bg-orange-500"
    if (strengthPercentage <= 75) return "bg-yellow-500"
    return "bg-green-500"
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    // Validate passwords
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden")
      return
    }

    if (password.length < 8) {
      setError("La contraseña debe tener al menos 8 caracteres")
      return
    }

    setIsLoading(true)

    try {
      const supabase = createClientSupabaseClient()

      const { error } = await supabase.auth.updateUser({
        password: password,
      })

      if (error) throw error

      setSuccess(true)

      // Redirect after 3 seconds
      setTimeout(() => {
        router.push("/auth/signin")
      }, 3000)
    } catch (error: any) {
      console.error("Error updating password:", error)
      setError(error?.message || "Error al actualizar la contraseña. Por favor, inténtalo de nuevo.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <header className="w-full p-4 flex items-center justify-between bg-white border-b">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/aventrada-logo.png" alt="Logo de Aventrada" width={32} height={32} />
          <span className="font-bold text-xl text-gray-900">Aventrada</span>
        </Link>
        <Link href="/auth/signin" className="text-sm text-gray-600 hover:text-purple-600 flex items-center gap-1">
          <ArrowLeft size={16} />
          Volver a iniciar sesión
        </Link>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          {/* Background Elements */}
          <div className="absolute top-0 right-0 -z-10 h-[300px] w-[300px] rounded-full bg-purple-100 blur-[100px] opacity-60" />
          <div className="absolute bottom-0 left-0 -z-10 h-[300px] w-[300px] rounded-full bg-pink-100 blur-[100px] opacity-60" />

          {/* Card */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 relative overflow-hidden">
            {/* Decorative Element */}
            <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-gradient-to-br from-purple-100 to-pink-100 opacity-50" />
            <div className="absolute -bottom-24 -left-24 w-48 h-48 rounded-full bg-gradient-to-tr from-purple-100 to-pink-100 opacity-50" />

            <div className="relative">
              <h1 className="text-2xl font-bold text-gray-900 text-center mb-2">Restablecer contraseña</h1>

              {!success && !error && (
                <p className="text-gray-500 text-center mb-6">Crea una nueva contraseña segura para tu cuenta.</p>
              )}

              {error && (
                <Alert variant="destructive" className="mb-6 bg-red-50 border-red-200 text-red-600">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {success && (
                <Alert className="mb-6 bg-green-50 border-green-200 text-green-600">
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  <AlertDescription>
                    Tu contraseña ha sido actualizada correctamente. Serás redirigido a la página de inicio de sesión en
                    unos segundos.
                  </AlertDescription>
                </Alert>
              )}

              {!success && !error && (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-gray-700 font-medium">
                      Nueva contraseña
                    </Label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                        <Lock size={18} />
                      </div>
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        required
                        className="pl-10 pr-10 border-gray-200 focus:border-purple-500 focus:ring-purple-500"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>

                    {/* Password strength indicator */}
                    <div className="space-y-2 mt-2">
                      <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${getStrengthColor()} transition-all duration-300`}
                          style={{ width: `${strengthPercentage}%` }}
                        ></div>
                      </div>
                      <ul className="text-xs space-y-1 text-gray-500">
                        <li className={`flex items-center gap-1 ${passwordStrength.length ? "text-green-600" : ""}`}>
                          {passwordStrength.length ? <CheckCircle2 size={12} /> : <AlertCircle size={12} />}
                          Al menos 8 caracteres
                        </li>
                        <li
                          className={`flex items-center gap-1 ${passwordStrength.hasUppercase ? "text-green-600" : ""}`}
                        >
                          {passwordStrength.hasUppercase ? <CheckCircle2 size={12} /> : <AlertCircle size={12} />}
                          Al menos una letra mayúscula
                        </li>
                        <li className={`flex items-center gap-1 ${passwordStrength.hasNumber ? "text-green-600" : ""}`}>
                          {passwordStrength.hasNumber ? <CheckCircle2 size={12} /> : <AlertCircle size={12} />}
                          Al menos un número
                        </li>
                        <li
                          className={`flex items-center gap-1 ${passwordStrength.hasSpecial ? "text-green-600" : ""}`}
                        >
                          {passwordStrength.hasSpecial ? <CheckCircle2 size={12} /> : <AlertCircle size={12} />}
                          Al menos un carácter especial
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-gray-700 font-medium">
                      Confirmar contraseña
                    </Label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                        <Lock size={18} />
                      </div>
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="••••••••"
                        required
                        className={`pl-10 pr-10 border-gray-200 focus:border-purple-500 focus:ring-purple-500 ${
                          confirmPassword && password !== confirmPassword ? "border-red-300" : ""
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600"
                      >
                        {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                    {confirmPassword && password !== confirmPassword && (
                      <p className="text-xs text-red-500 mt-1">Las contraseñas no coinciden</p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading || password !== confirmPassword || password.length < 8}
                    className="w-full py-6 bg-gradient-to-r from-[#B46CFF] to-[#F94892] hover:from-[#A55BEE] hover:to-[#E83781] text-white font-medium rounded-xl transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
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
                        Actualizando...
                      </span>
                    ) : (
                      "Actualizar contraseña"
                    )}
                  </Button>
                </form>
              )}

              {error && (
                <div className="text-center mt-6">
                  <Link href="/auth/forgot-password">
                    <Button variant="outline" className="border-gray-200 text-gray-700 hover:bg-gray-50">
                      Solicitar nuevo enlace
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Trust Badges */}
          <div className="mt-8 flex justify-center space-x-6">
            <div className="flex items-center text-gray-500 text-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-1 text-purple-600"
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
                className="h-5 w-5 mr-1 text-purple-600"
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
      </main>

      {/* Footer */}
      <footer className="w-full p-4 text-center text-sm text-gray-500 border-t">
        <p>© 2024 Aventrada. Todos los derechos reservados.</p>
      </footer>
    </div>
  )
}
