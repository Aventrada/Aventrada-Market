"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"

export default function SimplePage() {
  const router = useRouter()

  function handleLogout() {
    // Eliminar la cookie de autenticación
    document.cookie = "admin_authenticated=; path=/; max-age=0"
    // Redirigir al login
    router.push("/auth/login")
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-xl font-bold text-gray-900">Panel de Administración</h1>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Cerrar sesión
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white shadow-sm rounded-lg p-6">
          <h2 className="text-lg font-medium mb-4">Acceso exitoso</h2>
          <p>Has accedido correctamente al panel de administración simplificado.</p>
          <p className="mt-2">
            Esta es una versión simplificada para verificar que la autenticación funciona correctamente.
          </p>
        </div>
      </main>
    </div>
  )
}
