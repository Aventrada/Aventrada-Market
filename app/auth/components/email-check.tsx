"use client"
import { CheckCircle, AlertCircle } from "lucide-react"

interface EmailCheckProps {
  isChecking: boolean
  emailExists: boolean | null
  email: string
  similarEmail?: string | null
  onUseSimilarEmail?: () => void
}

export function EmailCheck({ isChecking, emailExists, email, similarEmail, onUseSimilarEmail }: EmailCheckProps) {
  if (isChecking || !email || email.length < 5 || !email.includes("@")) {
    return null
  }

  if (emailExists === true) {
    return (
      <div className="flex items-center mt-1 text-sm text-green-600">
        <CheckCircle className="h-4 w-4 mr-1" />
        <span>Correo electrónico encontrado</span>
      </div>
    )
  }

  if (emailExists === false) {
    return (
      <div className="mt-1">
        <div className="flex items-center text-sm text-amber-600">
          <AlertCircle className="h-4 w-4 mr-1" />
          <span>No encontramos este correo en nuestros registros</span>
        </div>
        {similarEmail && (
          <div className="mt-1 text-sm">
            <span className="text-gray-600">¿Quisiste decir </span>
            <button
              type="button"
              onClick={onUseSimilarEmail}
              className="text-purple-600 hover:text-purple-700 font-medium underline"
            >
              {similarEmail}
            </button>
            <span className="text-gray-600">?</span>
          </div>
        )}
      </div>
    )
  }

  return null
}
