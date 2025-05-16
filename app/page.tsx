import SignUpForm from "@/components/sign-up-form"
import { MobileMenu } from "@/components/mobile-menu"
import { EventCategories } from "@/components/event-categories"
import { FAQSection } from "@/components/faq-section"
import { SocialSharing } from "@/components/social-sharing"
import Link from "next/link"
import { Shield, Clock, Star } from "lucide-react"

export default function Home() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-black">
      {/* Animated background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 h-[500px] w-[500px] rounded-full bg-purple-600/20 blur-[100px]" />
        <div className="absolute bottom-0 left-0 h-[500px] w-[500px] rounded-full bg-pink-600/20 blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-fuchsia-600/20 blur-[100px]" />
      </div>

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-6 py-4 md:px-12">
        <Link href="https://home.aventrada.com/" className="flex items-center gap-2">
          <div className="h-10 w-10">
            <img src="/aventrada-logo.png" alt="Aventrada Logo" className="h-full w-full object-contain" />
          </div>
          <span className="text-xl font-bold text-white">Aventrada</span>
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/auth/signin" className="text-white hover:text-purple-300 transition-colors">
            Iniciar sesión
          </Link>
          <Link
            href="/auth/signup"
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all"
          >
            Registrarse
          </Link>
          <MobileMenu />
        </div>
      </header>

      {/* Main content */}
      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-80px)] max-w-7xl flex-col items-center justify-center px-4 py-12 md:px-6">
        <div className="grid w-full max-w-6xl gap-8 md:grid-cols-2">
          <div className="flex flex-col justify-center">
            <h1 className="mb-4 text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
              Únete a la experiencia{" "}
              <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                Aventrada
              </span>
            </h1>
            <p className="mb-6 text-lg text-gray-300">
              Estamos abriendo el acceso por grupos limitados. Regístrate para ser de los primeros en vivir una nueva
              forma de disfrutar los eventos en Puerto Rico.
            </p>
          </div>

          <div className="flex items-center justify-center">
            <SignUpForm />
          </div>
        </div>

        {/* ¿Por qué Aventrada? Section */}
        <section className="w-full max-w-6xl mx-auto mt-24 mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">¿Por qué elegir Aventrada?</h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Tu plataforma confiable para comprar y revender boletos de eventos en Puerto Rico.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-purple-500/30 transition-all">
              <div className="bg-gradient-to-br from-purple-500 to-pink-500 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Garantía de Autenticidad</h3>
              <p className="text-gray-300">Todos nuestros boletos son verificados. Tu compra está 100% protegida.</p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-purple-500/30 transition-all">
              <div className="bg-gradient-to-br from-purple-500 to-pink-500 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Clock className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Proceso Simple y Rápido</h3>
              <p className="text-gray-300">Compra o vende tus boletos en minutos. Sin complicaciones.</p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-purple-500/30 transition-all">
              <div className="bg-gradient-to-br from-purple-500 to-pink-500 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Star className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Eventos Exclusivos</h3>
              <p className="text-gray-300">Accede a los mejores conciertos, obras y deportes en la isla.</p>
            </div>
          </div>

          {/* Testimonial */}
          <div className="mt-16 bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
            <blockquote className="text-xl md:text-2xl text-white italic mb-4">
              "Aventrada me ayudó a conseguir boletos agotados en segundos. Súper fácil y confiable."
            </blockquote>
            <div className="flex justify-end">
              <p className="text-gray-300">— Usuario verificado ✓</p>
            </div>
          </div>

          {/* CTA Button */}
          <div className="mt-12 text-center">
            <Link
              href="/eventos"
              className="inline-block py-3 px-8 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-medium rounded-xl transition-all"
            >
              Explora eventos
            </Link>
          </div>
        </section>

        <EventCategories />
        <FAQSection />
        <SocialSharing />

        <footer className="w-full mt-16 py-8 border-t border-white/10 text-center text-sm text-gray-400">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8">
              <Link href="https://home.aventrada.com/" className="flex items-center">
                <img src="/aventrada-logo.png" alt="Aventrada Logo" className="h-8 w-8 inline-block mr-2" />
                <span>© 2025 Aventrada. Todos los derechos reservados.</span>
              </Link>
              <div className="flex gap-4">
                <Link href="/politica-de-privacidad" className="hover:text-white transition-colors">
                  Política de Privacidad
                </Link>
                <Link href="/terminos-y-condiciones" className="hover:text-white transition-colors">
                  Términos y Condiciones
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </main>
  )
}
