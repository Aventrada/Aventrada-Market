import { ShieldCheck, Clock, MapPin, Smartphone } from "lucide-react"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { AventradaLogo } from "@/components/aventrada-logo"

export default function PorQueAventrada() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header/Navigation - Simplified without login/register buttons */}
      <SiteHeader />

      {/* Main content with padding for fixed header */}
      <div className="pt-20">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-white py-20">
          <div className="absolute inset-0 z-0 opacity-5">
            <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-gradient-to-r from-[#B46CFF] to-[#F94892]"></div>
            <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-gradient-to-r from-[#B46CFF] to-[#F94892]"></div>
          </div>
          <div className="container relative z-10 mx-auto px-4 text-center">
            <div className="mx-auto max-w-3xl">
              <h1 className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl lg:text-6xl">
                ¿Por qué elegir{" "}
                <span className="bg-gradient-to-r from-[#B46CFF] to-[#F94892] bg-clip-text text-transparent">
                  Aventrada
                </span>
                ?
              </h1>
              <p className="mx-auto mb-8 max-w-2xl text-xl text-gray-600">
                Una plataforma pensada para fans reales, eventos en Puerto Rico y revendedores confiables.
              </p>
              <div className="mx-auto h-1 w-24 rounded-full bg-gradient-to-r from-[#B46CFF] to-[#F94892]"></div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {/* Feature 1 */}
              <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:shadow-md">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-[#B46CFF] to-[#F94892] p-3">
                  <ShieldCheck className="h-8 w-8 text-white" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-gray-900">Compra Segura</h3>
                <p className="text-gray-600">Cada boleto es validado. Tu compra está protegida.</p>
              </div>

              {/* Feature 2 */}
              <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:shadow-md">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-[#B46CFF] to-[#F94892] p-3">
                  <Clock className="h-8 w-8 text-white" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-gray-900">Fácil y Rápido</h3>
                <p className="text-gray-600">Desde la selección hasta el pago en solo unos clics.</p>
              </div>

              {/* Feature 3 */}
              <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:shadow-md">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-[#B46CFF] to-[#F94892] p-3">
                  <MapPin className="h-8 w-8 text-white" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-gray-900">Eventos de Aquí</h3>
                <p className="text-gray-600">Conexión directa con los mejores shows en Puerto Rico.</p>
              </div>

              {/* Feature 4 */}
              <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:shadow-md">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-[#B46CFF] to-[#F94892] p-3">
                  <Smartphone className="h-8 w-8 text-white" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-gray-900">Tecnología Moderna</h3>
                <p className="text-gray-600">Interfaz clara, funciones intuitivas y soporte confiable.</p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <h2 className="mb-12 text-center text-3xl font-bold text-gray-900">Cómo funciona Aventrada</h2>
            <div className="grid gap-8 md:grid-cols-3">
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-[#B46CFF] to-[#F94892] text-2xl font-bold text-white">
                  1
                </div>
                <h3 className="mb-2 text-xl font-bold text-gray-900">Busca tu evento</h3>
                <p className="text-gray-600">Explora nuestra selección de eventos en Puerto Rico.</p>
              </div>
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-[#B46CFF] to-[#F94892] text-2xl font-bold text-white">
                  2
                </div>
                <h3 className="mb-2 text-xl font-bold text-gray-900">Selecciona tus boletos</h3>
                <p className="text-gray-600">Escoge los mejores asientos disponibles al precio que buscas.</p>
              </div>
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-[#B46CFF] to-[#F94892] text-2xl font-bold text-white">
                  3
                </div>
                <h3 className="mb-2 text-xl font-bold text-gray-900">Disfruta el evento</h3>
                <p className="text-gray-600">Recibe tus boletos verificados y vive la experiencia.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonial Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl rounded-2xl bg-white p-8 shadow-lg">
              <div className="mb-6 h-12 w-12">
                <svg viewBox="0 0 24 24" fill="none" className="h-full w-full text-[#B46CFF]">
                  <path
                    d="M7.39999 6.32003L15.89 3.49003C19.7 2.22003 21.77 4.30003 20.51 8.11003L17.68 16.6C15.78 22.31 12.66 22.31 10.76 16.6L9.91999 14.08L7.39999 13.24C1.68999 11.34 1.68999 8.23003 7.39999 6.32003Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M10.11 13.6501L13.69 10.0601"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <blockquote className="mb-6 text-xl italic text-gray-700 md:text-2xl">
                "Nunca pensé que conseguir boletos fuera tan fácil. Aventrada me resolvió."
              </blockquote>
              <div className="flex items-center">
                <div className="h-12 w-12 overflow-hidden rounded-full bg-gradient-to-r from-[#B46CFF] to-[#F94892]">
                  <div className="h-full w-full bg-gray-200 opacity-30"></div>
                </div>
                <div className="ml-4">
                  <p className="font-bold text-gray-900">Usuario real</p>
                  <div className="flex items-center">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 text-yellow-500">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 text-yellow-500">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 text-yellow-500">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 text-yellow-500">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 text-yellow-500">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <h2 className="mb-12 text-center text-3xl font-bold text-gray-900">Beneficios adicionales</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-xl bg-white p-6 shadow-sm">
                <h3 className="mb-3 text-xl font-bold text-gray-900">Precios transparentes</h3>
                <p className="text-gray-600">Sin cargos ocultos. Verás el precio final antes de completar tu compra.</p>
              </div>
              <div className="rounded-xl bg-white p-6 shadow-sm">
                <h3 className="mb-3 text-xl font-bold text-gray-900">Atención personalizada</h3>
                <p className="text-gray-600">
                  Nuestro equipo está disponible para ayudarte con cualquier duda o problema.
                </p>
              </div>
              <div className="rounded-xl bg-white p-6 shadow-sm">
                <h3 className="mb-3 text-xl font-bold text-gray-900">Transferencia segura</h3>
                <p className="text-gray-600">Los boletos se transfieren de forma segura y directa a tu cuenta.</p>
              </div>
              <div className="rounded-xl bg-white p-6 shadow-sm">
                <h3 className="mb-3 text-xl font-bold text-gray-900">Notificaciones de eventos</h3>
                <p className="text-gray-600">
                  Recibe alertas sobre nuevos eventos y cuando los boletos que buscas estén disponibles.
                </p>
              </div>
              <div className="rounded-xl bg-white p-6 shadow-sm">
                <h3 className="mb-3 text-xl font-bold text-gray-900">Plataforma local</h3>
                <p className="text-gray-600">
                  Creada por puertorriqueños para puertorriqueños. Entendemos tus necesidades.
                </p>
              </div>
              <div className="rounded-xl bg-white p-6 shadow-sm">
                <h3 className="mb-3 text-xl font-bold text-gray-900">Múltiples métodos de pago</h3>
                <p className="text-gray-600">
                  Acepta todas las tarjetas principales y otros métodos de pago populares en Puerto Rico.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="mb-6 text-3xl font-bold text-gray-900">¿Listo para encontrar tu próximo evento?</h2>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-600">
              Únete a miles de puertorriqueños que ya disfrutan de la forma más segura y conveniente de comprar boletos.
            </p>
            <Link
              href="https://www.aventrada.com/"
              className="inline-block rounded-full bg-gradient-to-r from-[#B46CFF] to-[#F94892] px-8 py-3 text-lg font-medium text-white transition-all hover:opacity-90"
            >
              Volver al Inicio
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-gray-200 bg-white py-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
              <AventradaLogo href="https://www.aventrada.com/" size="small" />
              <div className="flex flex-wrap gap-6">
                <Link href="/politica-de-privacidad" className="text-gray-600 hover:text-purple-600">
                  Política de Privacidad
                </Link>
                <Link href="/terminos-y-condiciones" className="text-gray-600 hover:text-purple-600">
                  Términos y Condiciones
                </Link>
                <Link href="/contacto" className="text-gray-600 hover:text-purple-600">
                  Contacto
                </Link>
              </div>
              <div className="text-gray-600">© 2025 Aventrada. Todos los derechos reservados.</div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
