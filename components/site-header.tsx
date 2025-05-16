"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { AventradaNewLogo } from "@/components/aventrada-new-logo"

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-white/90 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <AventradaNewLogo href="https://www.aventrada.com/" size="large" withText={!scrolled} />

          <div className="hidden md:flex items-center gap-6">
            <Link
              href="https://www.aventrada.com/"
              className={`transition-colors duration-300 ${
                scrolled ? "text-gray-700 hover:text-gray-900" : "text-gray-200 hover:text-white"
              }`}
            >
              Volver al Inicio
            </Link>
            <Link
              href="/contacto"
              className={`transition-colors duration-300 ${
                scrolled ? "text-gray-700 hover:text-gray-900" : "text-gray-200 hover:text-white"
              }`}
            >
              Contacto
            </Link>
            <Link
              href="/por-que-aventrada"
              className={`transition-colors duration-300 ${
                scrolled ? "text-gray-700 hover:text-gray-900" : "text-gray-200 hover:text-white"
              }`}
            >
              ¿Por qué Aventrada?
            </Link>
          </div>

          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className={scrolled ? "text-gray-900" : "text-white"}>
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Abrir menú</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-white">
                <div className="flex flex-col space-y-6 mt-8">
                  <AventradaNewLogo href="https://www.aventrada.com/" size="medium" withText />

                  <nav className="flex flex-col space-y-4">
                    <Link
                      href="https://www.aventrada.com/"
                      className="text-gray-700 hover:text-gray-900 transition-colors"
                    >
                      Volver al Inicio
                    </Link>
                    <Link href="/contacto" className="text-gray-700 hover:text-gray-900 transition-colors">
                      Contacto
                    </Link>
                    <Link href="/por-que-aventrada" className="text-gray-700 hover:text-gray-900 transition-colors">
                      ¿Por qué Aventrada?
                    </Link>
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
