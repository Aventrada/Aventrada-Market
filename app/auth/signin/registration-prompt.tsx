"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, UserPlus } from "lucide-react"

interface RegistrationPromptProps {
  email: string
  similarEmail?: string | null
  onBack?: () => void
  onUseSimilarEmail?: () => void
}

export function RegistrationPrompt({ email, similarEmail, onBack, onUseSimilarEmail }: RegistrationPromptProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 relative overflow-hidden">
      {/* Decorative Element */}
      <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-gradient-to-br from-purple-100 to-pink-100 opacity-50" />
      <div className="absolute -bottom-24 -left-24 w-48 h-48 rounded-full bg-gradient-to-tr from-purple-100 to-pink-100 opacity-50" />

      <div className="relative">
        <div className="flex justify-center mb-4">
          <div className="bg-amber-100 rounded-full p-3">
            <UserPlus className="h-6 w-6 text-amber-600" />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 text-center mb-2">Cuenta no encontrada</h1>
        <p className="text-gray-600 text-center mb-6">
          No encontramos ninguna cuenta asociada a <strong>{email}</strong>
        </p>

        {similarEmail && (
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-6">
            <p className="text-blue-800 text-sm">
              ¿Quisiste decir <strong>{similarEmail}</strong>?{" "}
              <button onClick={onUseSimilarEmail} className="text-blue-600 hover:text-blue-800 underline font-medium">
                Usar este correo
              </button>
            </p>
          </div>
        )}

        <div className="space-y-4">
          <Button
            asChild
            className="w-full py-6 bg-gradient-to-r from-[#B46CFF] to-[#F94892] hover:from-[#A55BEE] hover:to-[#E83781] text-white font-medium rounded-xl transition-all duration-300 shadow-md hover:shadow-lg"
          >
            <Link href={`/auth/signup?email=${encodeURIComponent(email)}`}>Registrarme ahora</Link>
          </Button>

          <Button
            variant="outline"
            onClick={onBack}
            className="w-full py-6 text-gray-700 font-medium rounded-xl transition-all duration-300"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver al inicio de sesión
          </Button>
        </div>

        <div className="mt-6 text-center text-sm text-gray-500">
          Si crees que esto es un error, por favor{" "}
          <Link href="/contacto" className="text-purple-600 hover:text-purple-700 font-medium">
            contáctanos
          </Link>
          .
        </div>
      </div>
    </div>
  )
}
