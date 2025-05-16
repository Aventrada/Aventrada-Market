import Link from "next/link"
import { ArrowLeft, BarChart2, Mail } from "lucide-react"
import { LogoutButton } from "@/components/logout-button"

export function AdminHeader() {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center text-gray-500 hover:text-gray-700">
              <ArrowLeft className="h-5 w-5 mr-2" />
              <span>Volver al inicio</span>
            </Link>

            <nav className="flex space-x-4">
              <Link href="/admin" className="text-gray-500 hover:text-gray-700 flex items-center">
                <BarChart2 className="h-5 w-5 mr-1" />
                <span>Dashboard</span>
              </Link>
              <Link href="/admin/email-stats" className="text-gray-500 hover:text-gray-700 flex items-center">
                <Mail className="h-5 w-5 mr-1" />
                <span>Estadísticas de Correos</span>
              </Link>
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-purple-500 flex items-center justify-center text-white font-medium">
                A
              </div>
              <span className="ml-2 text-gray-700 font-medium">Admin</span>
            </div>
            <LogoutButton />
          </div>
        </div>
      </div>
    </header>
  )
}
