import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-purple-600 mb-4">404</h1>
        <h2 className="text-3xl font-semibold text-gray-900 mb-6">Página no encontrada</h2>
        <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
          Lo sentimos, la página que estás buscando no existe o ha sido movida.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="https://home.aventrada.com/"
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all"
          >
            Volver al inicio
          </Link>
          <Link
            href="/por-que-aventrada"
            className="px-6 py-3 border border-purple-600 text-purple-600 font-medium rounded-lg hover:bg-purple-50 transition-all"
          >
            ¿Por qué Aventrada?
          </Link>
        </div>
      </div>
    </div>
  )
}
