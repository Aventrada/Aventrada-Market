"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, Mail, ArrowLeft, Clock } from "lucide-react"
import { createClientSupabaseClient } from "@/lib/supabase"
import Link from "next/link"
import Captcha from "./captcha"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [cooldownActive, setCooldownActive] = useState(false)
  const [cooldownTime, setCooldownTime] = useState(0)
  const [captchaToken, setCaptchaToken] = useState<string | null>(null)
  const [showCaptcha, setShowCaptcha] = useState(false)

  // Check for existing cooldown on component mount
  useEffect(() => {
    const storedCooldownEnd = localStorage.getItem("passwordResetCooldownEnd")
    if (storedCooldownEnd) {
      const cooldownEndTime = Number.parseInt(storedCooldownEnd, 10)
      const currentTime = Date.now()

      if (cooldownEndTime > currentTime) {
        // Cooldown is still active
        setCooldownActive(true)
        setCooldownTime(Math.ceil((cooldownEndTime - currentTime) / 1000))

        // Start the countdown timer
        const timer = setInterval(() => {
          setCooldownTime((prevTime) => {
            if (prevTime <= 1) {
              clearInterval(timer)
              setCooldownActive(false)
              localStorage.removeItem("passwordResetCooldownEnd")
              return 0
            }
            return prevTime - 1
          })
        }, 1000)

        return () => clearInterval(timer)
      } else {
        // Cooldown has expired
        localStorage.removeItem("passwordResetCooldownEnd")
      }
    }

    // Check if we should show CAPTCHA based on previous attempts
    const trackingData = JSON.parse(localStorage.getItem("emailRequestTracking") || "{}")
    const emailTracking = trackingData[email]

    if (emailTracking && emailTracking.attempts >= 3) {
      setShowCaptcha(true)
    }
  }, [email])

  // Start cooldown timer
  const startCooldown = (seconds: number) => {
    setCooldownActive(true)
    setCooldownTime(seconds)

    // Store cooldown end time in localStorage
    const cooldownEndTime = Date.now() + seconds * 1000
    localStorage.setItem("passwordResetCooldownEnd", cooldownEndTime.toString())

    // Start countdown
    const timer = setInterval(() => {
      setCooldownTime((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer)
          setCooldownActive(false)
          localStorage.removeItem("passwordResetCooldownEnd")
          return 0
        }
        return prevTime - 1
      })
    }, 1000)
  }

  // Track email request attempts
  const trackEmailRequest = (email: string, success: boolean) => {
    // Get existing tracking data
    const trackingData = JSON.parse(localStorage.getItem("emailRequestTracking") || "{}")

    // Initialize tracking for this email if it doesn't exist
    if (!trackingData[email]) {
      trackingData[email] = {
        attempts: 0,
        lastAttempt: null,
        successCount: 0,
      }
    }

    // Update tracking data
    trackingData[email].attempts += 1
    trackingData[email].lastAttempt = Date.now()
    if (success) {
      trackingData[email].successCount += 1
    }

    // Store updated tracking data
    localStorage.setItem("emailRequestTracking", JSON.stringify(trackingData))

    // Check for potential abuse (many attempts in short time)
    if (trackingData[email].attempts > 5 && Date.now() - trackingData[email].lastAttempt < 3600000) {
      // If more than 5 attempts in the last hour, extend cooldown
      return true // Potential abuse detected
    }

    // Enable CAPTCHA after 3 attempts
    if (trackingData[email].attempts >= 3) {
      setShowCaptcha(true)
    }

    return false
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setSuccessMessage(null)
    setIsLoading(true)

    try {
      // Check if CAPTCHA is required but not completed
      if (showCaptcha && !captchaToken) {
        throw new Error("Por favor, completa el captcha para continuar.")
      }

      // Check if potential abuse is detected
      const potentialAbuse = trackEmailRequest(email, false)
      if (potentialAbuse) {
        // Extend cooldown for suspicious activity
        startCooldown(300) // 5 minutes cooldown for suspicious activity
        throw new Error(
          "Hemos detectado demasiados intentos. Por favor, espera 5 minutos antes de intentar nuevamente.",
        )
      }

      const supabase = createClientSupabaseClient()

      // Send password reset email with the correct redirect URL
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
        captchaToken: captchaToken || undefined,
      })

      if (error) {
        // Check if it's a rate limit error
        if (error.message.includes("rate limit") || error.status === 429) {
          startCooldown(60) // 60 seconds cooldown
          throw new Error(
            "Has alcanzado el límite de solicitudes. Por favor, espera un minuto antes de intentar nuevamente.",
          )
        }
        throw error
      }

      // Track successful request
      trackEmailRequest(email, true)

      // Start standard cooldown
      startCooldown(60) // 60 seconds cooldown

      setSuccessMessage(
        "Se ha enviado un enlace para restablecer tu contraseña. Por favor, revisa tu correo electrónico.",
      )
    } catch (error: any) {
      console.error("Error al enviar el correo de restablecimiento:", error)
      setError(error?.message || "Error al enviar el correo. Por favor, inténtalo de nuevo.")
    } finally {
      setIsLoading(false)
      setCaptchaToken(null) // Reset captcha token
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

          <h1 className="text-2xl font-bold text-white text-center mb-6">Recuperar contraseña</h1>

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

          {!successMessage ? (
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
                <p className="text-xs text-gray-400">
                  Ingresa el correo electrónico asociado a tu cuenta para recibir un enlace de recuperación.
                </p>
              </div>

              {showCaptcha && (
                <div className="mt-4">
                  <p className="text-sm text-gray-400 mb-2">Por seguridad, por favor completa el captcha:</p>
                  <Captcha onVerify={(token) => setCaptchaToken(token)} onExpire={() => setCaptchaToken(null)} />
                </div>
              )}

              <Button
                type="submit"
                disabled={isLoading || cooldownActive || (showCaptcha && !captchaToken)}
                className="w-full py-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-medium rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
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
                    Enviando...
                  </span>
                ) : cooldownActive ? (
                  <span className="flex items-center justify-center">
                    <Clock className="mr-2 h-4 w-4" />
                    Espera {cooldownTime} segundos
                  </span>
                ) : (
                  "Enviar enlace de recuperación"
                )}
              </Button>
            </form>
          ) : (
            <div className="text-center">
              <p className="text-white mb-6">
                Revisa tu bandeja de entrada y sigue las instrucciones en el correo electrónico.
              </p>
              <Button
                variant="outline"
                className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
                onClick={() => setSuccessMessage(null)}
              >
                Volver a intentar
              </Button>
            </div>
          )}

          <div className="mt-6 text-center">
            <Link href="/auth/login" className="text-purple-400 hover:text-purple-300 inline-flex items-center text-sm">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Volver al inicio de sesión
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
