"use client"

import type React from "react"
import { AventradaNewLogo } from "@/components/aventrada-new-logo"

export function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="border-b border-gray-100 bg-white">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <AventradaNewLogo size="medium" href="/" withText />
          <a
            href="https://www.aventrada.com/"
            className="text-sm text-gray-600 hover:text-purple-600 flex items-center gap-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-chevron-left"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
            Volver al inicio
          </a>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4">{children}</main>

      <footer className="py-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Aventrada. Todos los derechos reservados.
      </footer>
    </div>
  )
}

export default AuthLayout
