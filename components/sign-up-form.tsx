"use client"

import Link from "next/link"
import { useActionState } from "react"
import { useFormStatus } from "react-dom"
import { Button } from "@/components/ui/button"
import { submitRegistration } from "@/app/actions"
import { useState } from "react"

// Form submission button with loading state
function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button
      type="submit"
      disabled={pending}
      className="relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 py-6 text-lg font-medium text-white transition-all hover:from-purple-500 hover:to-pink-500 hover:shadow-lg hover:shadow-purple-500/30"
    >
      {pending ? (
        <span className="flex items-center justify-center">
          <svg className="mr-2 h-5 w-5 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Procesando...
        </span>
      ) : (
        "Solicitar acceso"
      )}
    </Button>
  )
}

export default function SignUpForm() {
  const initialState = {
    success: false,
    message: "",
    errors: {},
  }

  const [state, formAction] = useActionState(submitRegistration, initialState)
  const [isSubmitted, setIsSubmitted] = useState(false)

  // When form is successfully submitted, show success state
  if (state.success && !isSubmitted) {
    setIsSubmitted(true)
  }

  return (
    <div className="w-full max-w-md p-6 bg-black/40 backdrop-blur-lg rounded-xl border border-white/10">
      <h2 className="text-2xl font-bold text-white mb-6">Únete a Aventrada</h2>
      <p className="text-gray-300 mb-6">
        Regístrate para ser de los primeros en acceder a nuestra plataforma de eventos.
      </p>
      <Link
        href="/auth/signup"
        className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium rounded-lg flex items-center justify-center hover:from-purple-600 hover:to-pink-600 transition-all"
      >
        Crear una cuenta
      </Link>
    </div>
  )
}
