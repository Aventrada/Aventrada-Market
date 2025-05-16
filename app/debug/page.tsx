"use client"

import { useState, useEffect } from "react"
import { createClientSupabaseClient } from "@/lib/supabase"

export default function DebugPage() {
  const [status, setStatus] = useState<string>("Verificando conexión...")
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function checkConnection() {
      try {
        const supabase = createClientSupabaseClient()

        // Intenta una operación simple para verificar la conexión
        const { data, error } = await supabase.from("registrations").select("count()", { count: "exact" }).limit(1)

        if (error) {
          throw error
        }

        setStatus(`Conexión exitosa. Registros encontrados: ${data.length}`)
      } catch (err: any) {
        setError(err.message || "Error desconocido")
        setStatus("Error de conexión")
      }
    }

    checkConnection()
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4">Diagnóstico de Supabase</h1>

        <div className="mb-4">
          <h2 className="font-semibold">Estado de conexión:</h2>
          <p className={error ? "text-red-500" : "text-green-500"}>{status}</p>
          {error && (
            <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded text-sm">
              <p className="font-semibold">Error:</p>
              <p className="font-mono text-xs break-all">{error}</p>
            </div>
          )}
        </div>

        <div className="mb-4">
          <h2 className="font-semibold">Variables de entorno:</h2>
          <p className="text-sm">
            NEXT_PUBLIC_SUPABASE_URL: {process.env.NEXT_PUBLIC_SUPABASE_URL ? "✅ Configurada" : "❌ No configurada"}
          </p>
          <p className="text-sm">
            NEXT_PUBLIC_SUPABASE_ANON_KEY:{" "}
            {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "✅ Configurada" : "❌ No configurada"}
          </p>
        </div>
      </div>
    </div>
  )
}
