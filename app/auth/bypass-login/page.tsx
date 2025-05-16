"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { createClientSupabaseClient } from "@/lib/supabase"

export default function BypassLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setMessage(null)
    setIsLoading(true)

    try {
      const supabase = createClientSupabaseClient()

      // Direct login without registration check
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (signInError) {
        throw signInError
      }

      // Set admin cookie to bypass middleware
      document.cookie = "admin_authenticated=true; path=/; max-age=86400"

      setMessage("Inicio de sesión exitoso. Redirigiendo...")

      // Redirect to dashboard
      setTimeout(() => {
        router.push("/dashboard")
      }, 1500)
    } catch (error: any) {
      console.error("Error de inicio de sesión:", error)
      setError(error?.message || "Error al iniciar sesión")
    } finally {
      setIsLoading(false)
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

          <h1 className="text-2xl font-bold text-white text-center mb-6">Acceso Directo</h1>

          {error && (
            <Alert variant="destructive" className="mb-6 bg-red-500/10 border-red-500/20 text-red-500">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {message && (
            <Alert className="mb-6 bg-green-500/10 border-green-500/20 text-green-500">
              <AlertDescription>{message}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">
                Correo electrónico
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@ejemplo.com"
                required
                className="border-gray-700 bg-black/50 text-white placeholder:text-gray-500 focus:border-purple-500 focus:ring-purple-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-white">
                Contraseña
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="border-gray-700 bg-black/50 text-white placeholder:text-gray-500 focus:border-purple-500 focus:ring-purple-500"
              />
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
                  Accediendo...
                </span>
              ) : (
                "Acceder"
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
