"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, Mail, User, Lock, Phone, Loader2 } from "lucide-react"
import { createClientSupabaseClient } from "@/lib/supabase"
import { AuthLayout } from "../components/auth-layout"

export default function SignUpPage() {
  const router = useRouter()
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isSuccess, setIsSuccess] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    // Validación básica
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden")
      setIsLoading(false)
      return
    }

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres")
      setIsLoading(false)
      return
    }

    try {
      const supabase = createClientSupabaseClient()
      const normalizedEmail = email.toLowerCase().trim()

      // 1. Verificar si el email ya existe en registrations
      const { data: existingRegistration, error: checkError } = await supabase
        .from("registrations")
        .select("id, status, email")
        .eq("email", normalizedEmail)
        .maybeSingle()

      if (checkError) {
        console.error("Error checking existing registration:", checkError)
        throw new Error(`Error al verificar el registro: ${checkError.message}`)
      }

      // 2. Crear o actualizar el registro
      let registrationId

      if (existingRegistration) {
        // Actualizar registro existente
        const { error: updateError } = await supabase
          .from("registrations")
          .update({
            first_name: firstName,
            last_name: lastName,
            phone_number: phoneNumber || "No proporcionado",
            status: "approved", // Siempre aprobado
            updated_at: new Date().toISOString(),
          })
          .eq("id", existingRegistration.id)

        if (updateError) {
          console.error("Error updating registration:", updateError)
          throw new Error(`Error al actualizar el registro: ${updateError.message}`)
        }

        registrationId = existingRegistration.id
      } else {
        // Crear nuevo registro
        const { data: newRegistration, error: insertError } = await supabase
          .from("registrations")
          .insert({
            email: normalizedEmail,
            first_name: firstName,
            last_name: lastName,
            phone_number: phoneNumber || "No proporcionado",
            status: "approved", // Siempre aprobado
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          })
          .select()

        if (insertError) {
          console.error("Error creating registration:", insertError)
          throw new Error(`Error al crear el registro: ${insertError.message}`)
        }

        registrationId = newRegistration?.[0]?.id
      }

      // 3. Crear cuenta de autenticación
      const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email: normalizedEmail,
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
            registration_id: registrationId,
          },
        },
      })

      if (signUpError) {
        console.error("Error creating auth account:", signUpError)
        throw new Error(`Error al crear la cuenta: ${signUpError.message}`)
      }

      // 4. Iniciar sesión automáticamente
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: normalizedEmail,
        password,
      })

      if (signInError) {
        console.error("Error signing in:", signInError)
        throw new Error(`Error al iniciar sesión: ${signInError.message}`)
      }

      // 5. Redirigir al dashboard
      router.push("/dashboard")
    } catch (error: any) {
      console.error("Error en el registro:", error)
      setError(error?.message || "Error al crear la cuenta. Por favor, inténtalo de nuevo.")
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
          <h1 className="text-2xl font-bold text-gray-900 text-center mb-2">Crear una cuenta</h1>
          <p className="text-gray-500 text-center mb-6">Únete a la comunidad de Aventrada</p>

          {error && (
            <Alert variant="destructive" className="mb-6 bg-red-50 border-red-200 text-red-600">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-gray-700 font-medium">
                  Nombre
                </Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                    <User size={18} />
                  </div>
                  <Input
                    id="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Juan"
                    required
                    className="pl-10 border-gray-200 focus:border-purple-500 focus:ring-purple-500"
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-gray-700 font-medium">
                  Apellido
                </Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                    <User size={18} />
                  </div>
                  <Input
                    id="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Pérez"
                    required
                    className="pl-10 border-gray-200 focus:border-purple-500 focus:ring-purple-500"
                    disabled={isLoading}
                  />
                </div>
              </div>
            </div>

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
                  placeholder="tu@ejemplo.com"
                  required
                  className="pl-10 border-gray-200 focus:border-purple-500 focus:ring-purple-500"
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phoneNumber" className="text-gray-700 font-medium">
                Número de teléfono
              </Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                  <Phone size={18} />
                </div>
                <Input
                  id="phoneNumber"
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="+34 612 345 678"
                  required
                  className="pl-10 border-gray-200 focus:border-purple-500 focus:ring-purple-500"
                  disabled={isLoading}
                />
              </div>
              <p className="text-xs text-gray-500">Formato recomendado: +34 612 345 678</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700 font-medium">
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
                  className="pl-10 border-gray-200 focus:border-purple-500 focus:ring-purple-500"
                  disabled={isLoading}
                />
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
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="pl-10 border-gray-200 focus:border-purple-500 focus:ring-purple-500"
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="text-sm text-gray-500">
              Al registrarte, aceptas nuestros{" "}
              <Link href="/terminos-y-condiciones" className="text-purple-600 hover:text-purple-700">
                Términos y Condiciones
              </Link>{" "}
              y{" "}
              <Link href="/politica-de-privacidad" className="text-purple-600 hover:text-purple-700">
                Política de Privacidad
              </Link>
              .
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full py-6 bg-gradient-to-r from-[#B46CFF] to-[#F94892] hover:from-[#A55BEE] hover:to-[#E83781] text-white font-medium rounded-xl transition-all duration-300 shadow-md hover:shadow-lg"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" />
                  Creando cuenta...
                </span>
              ) : (
                "Crear cuenta"
              )}
            </Button>

            <div className="text-center text-sm text-gray-500">
              ¿Ya tienes una cuenta?{" "}
              <Link href="/auth/signin" className="text-purple-600 hover:text-purple-700 font-medium">
                Iniciar sesión
              </Link>
            </div>
          </form>
        </div>
      </div>
    </AuthLayout>
  )
}
