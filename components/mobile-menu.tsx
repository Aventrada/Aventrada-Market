"use client"

import { useState } from "react"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import Link from "next/link"
import Image from "next/image"

export function MobileMenu() {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden text-white">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Abrir menú</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="bg-black/95 border-r border-purple-900/30 text-white">
        <div className="flex flex-col space-y-6 mt-8">
          <Link
            href="https://www.aventrada.com/"
            className="flex items-center gap-2 mb-6"
            onClick={() => setOpen(false)}
          >
            <div className="h-10 w-10 relative">
              <Image src="/aventrada-logo.png" alt="Aventrada Logo" fill className="object-contain" priority />
            </div>
            <span className="text-xl font-bold text-white">Aventrada</span>
          </Link>

          <nav className="flex flex-col space-y-4">
            <Link
              href="https://www.aventrada.com/"
              className="text-gray-300 hover:text-white transition-colors"
              onClick={() => setOpen(false)}
            >
              Volver al Inicio
            </Link>
            <Link href="/por-que-aventrada" className="text-white font-medium" onClick={() => setOpen(false)}>
              ¿Por qué Aventrada?
            </Link>
            <Link
              href="/contacto"
              className="text-gray-300 hover:text-white transition-colors"
              onClick={() => setOpen(false)}
            >
              Contacto
            </Link>
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  )
}
