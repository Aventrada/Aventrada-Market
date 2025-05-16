"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"

export default function ContactHeader() {
  return (
    <section className="relative min-h-[500px] overflow-hidden bg-gradient-to-br from-[#B46CFF]/5 to-[#F94892]/5">
      <SiteHeader />

      <div className="container relative z-10 mx-auto px-4 pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="grid items-center gap-8 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center md:text-left"
          >
            <h1 className="mb-4 text-3xl font-bold md:text-4xl lg:text-5xl">
              <span className="bg-gradient-to-r from-[#B46CFF] to-[#F94892] bg-clip-text text-transparent">
                Contacto
              </span>
            </h1>
            <p className="mb-6 text-lg text-gray-700 md:text-xl">
              ¿Necesitas ayuda? Estamos aquí para ti. Completa el formulario o escríbenos directamente.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4 md:justify-start">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="rounded-lg bg-white p-4 shadow-sm"
              >
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-green-500"></div>
                  <span className="text-sm font-medium text-gray-700">Soporte disponible</span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="rounded-lg bg-white p-4 shadow-sm"
              >
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-purple-500"></div>
                  <span className="text-sm font-medium text-gray-700">Respuesta rápida</span>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-8"
            >
              <Link
                href="https://www.aventrada.com/"
                className="inline-flex items-center gap-2 text-[#B46CFF] transition-colors hover:text-[#F94892]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m12 19-7-7 7-7"></path>
                  <path d="M19 12H5"></path>
                </svg>
                <span>Volver al Inicio</span>
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hidden md:block"
          >
            <div className="relative h-[400px] w-full">
              <Image
                src="/customer-support-purple-pink.png"
                alt="Soporte al cliente"
                fill
                className="object-contain"
                priority
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute left-0 top-0 h-full w-full overflow-hidden">
        <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-purple-300 opacity-10 blur-3xl"></div>
        <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-pink-300 opacity-10 blur-3xl"></div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 w-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          className="h-16 w-full fill-white md:h-20"
          preserveAspectRatio="none"
        >
          <path d="M0,288L48,272C96,256,192,224,288,213.3C384,203,480,213,576,229.3C672,245,768,267,864,261.3C960,256,1056,224,1152,208C1248,192,1344,192,1392,192L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>
    </section>
  )
}
