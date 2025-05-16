"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { createClientSupabaseClient } from "@/lib/supabase"
import { Loader2, ArrowRight, Calendar, Users, Settings, Bell, CheckCircle } from "lucide-react"

export default function WelcomePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [userName, setUserName] = useState("")

  useEffect(() => {
    async function getUserProfile() {
      try {
        const supabase = createClientSupabaseClient()

        // Get current user
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser()

        if (userError || !user) {
          console.error("Error getting user:", userError)
          router.push("/auth/signin")
          return
        }

        // Get user metadata or profile
        const firstName = user.user_metadata?.first_name || ""
        const lastName = user.user_metadata?.last_name || ""

        if (firstName || lastName) {
          setUserName(`${firstName} ${lastName}`.trim())
        } else {
          // Fallback to email
          setUserName(user.email?.split("@")[0] || "")
        }

        setLoading(false)
      } catch (error) {
        console.error("Error in welcome page:", error)
        setLoading(false)
      }
    }

    getUserProfile()
  }, [router])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
      </div>
    )
  }

  return (
    <div className="container max-w-5xl mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <div className="inline-flex items-center justify-center p-2 bg-purple-100 rounded-full mb-4">
          <CheckCircle className="h-6 w-6 text-purple-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">¡Bienvenido a Aventrada, {userName}!</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Tu cuenta ha sido creada exitosamente. Ahora puedes comenzar a explorar todas las funcionalidades que
          Aventrada tiene para ofrecerte.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-purple-600" />
              Próximos eventos
            </CardTitle>
            <CardDescription>Descubre eventos que podrían interesarte</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Explora nuestra selección de eventos destacados y encuentra experiencias únicas.
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/eventos">
                Ver eventos <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="h-5 w-5 mr-2 text-purple-600" />
              Completa tu perfil
            </CardTitle>
            <CardDescription>Personaliza tu experiencia</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Añade más información a tu perfil para mejorar tus recomendaciones y conectar con otros.
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/perfil">
                Editar perfil <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Próximos pasos</h2>
        <ul className="space-y-3">
          <li className="flex items-start">
            <div className="flex-shrink-0 h-6 w-6 rounded-full bg-purple-100 flex items-center justify-center mr-3 mt-0.5">
              <span className="text-sm font-medium text-purple-600">1</span>
            </div>
            <div>
              <p className="text-gray-700 font-medium">Explora el dashboard</p>
              <p className="text-gray-600 text-sm">Familiarízate con las diferentes secciones y funcionalidades</p>
            </div>
          </li>
          <li className="flex items-start">
            <div className="flex-shrink-0 h-6 w-6 rounded-full bg-purple-100 flex items-center justify-center mr-3 mt-0.5">
              <span className="text-sm font-medium text-purple-600">2</span>
            </div>
            <div>
              <p className="text-gray-700 font-medium">Configura tus preferencias</p>
              <p className="text-gray-600 text-sm">Personaliza las notificaciones y ajustes según tus necesidades</p>
            </div>
          </li>
          <li className="flex items-start">
            <div className="flex-shrink-0 h-6 w-6 rounded-full bg-purple-100 flex items-center justify-center mr-3 mt-0.5">
              <span className="text-sm font-medium text-purple-600">3</span>
            </div>
            <div>
              <p className="text-gray-700 font-medium">Descubre eventos</p>
              <p className="text-gray-600 text-sm">Busca y participa en eventos que se ajusten a tus intereses</p>
            </div>
          </li>
        </ul>
      </div>

      <div className="flex flex-col md:flex-row gap-4 justify-center">
        <Button asChild className="bg-purple-600 hover:bg-purple-700">
          <Link href="/dashboard">
            Ir al dashboard <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/configuracion">
            <Settings className="mr-2 h-4 w-4" /> Configurar cuenta
          </Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/notificaciones">
            <Bell className="mr-2 h-4 w-4" /> Gestionar notificaciones
          </Link>
        </Button>
      </div>
    </div>
  )
}
