import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"
import { AuthLayout } from "../components/auth-layout"
import { AuthHeader } from "../components/auth-header"
import { AuthFooter } from "../components/auth-footer"

interface SuccessProps {
  message: string
  showLoginButton?: boolean
  email?: string
}

export function Success({ message, showLoginButton = false, email = "" }: SuccessProps) {
  return (
    <AuthLayout>
      <AuthHeader />

      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-gradient-to-br from-purple-100 to-pink-100 opacity-50" />
          <div className="absolute -bottom-24 -left-24 w-48 h-48 rounded-full bg-gradient-to-tr from-purple-100 to-pink-100 opacity-50" />

          <div className="relative flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">¡Registro Exitoso!</h2>

            <p className="text-gray-600 mb-6">{message}</p>

            {showLoginButton && (
              <div className="space-y-4 w-full">
                <Button
                  asChild
                  className="w-full py-6 bg-gradient-to-r from-[#B46CFF] to-[#F94892] hover:from-[#A55BEE] hover:to-[#E83781] text-white font-medium rounded-xl transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  <Link href={`/auth/signin${email ? `?email=${encodeURIComponent(email)}` : ""}`}>
                    Iniciar sesión ahora
                  </Link>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  className="w-full py-6 text-gray-700 font-medium rounded-xl border-gray-200 hover:bg-gray-50"
                >
                  <Link href="/">Ir a la página principal</Link>
                </Button>
              </div>
            )}

            {!showLoginButton && (
              <Button
                asChild
                className="w-full py-6 bg-gradient-to-r from-[#B46CFF] to-[#F94892] hover:from-[#A55BEE] hover:to-[#E83781] text-white font-medium rounded-xl transition-all duration-300 shadow-md hover:shadow-lg"
              >
                <Link href="/">Volver a la página principal</Link>
              </Button>
            )}
          </div>
        </div>
      </div>

      <AuthFooter />
    </AuthLayout>
  )
}
