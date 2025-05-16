"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { createClientSupabaseClient } from "@/lib/supabase"

export default function FixRegistrationPage() {
  const [email, setEmail] = useState("")
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [registrations, setRegistrations] = useState<any[]>([])

  async function handleCheckRegistration() {
    if (!email) return

    setIsLoading(true)
    setResult(null)

    try {
      const supabase = createClientSupabaseClient()
      const normalizedEmail = email.trim().toLowerCase()

      // Check for registrations with this email (case insensitive)
      const { data, error } = await supabase.from("registrations").select("*").ilike("email", normalizedEmail)

      if (error) throw error

      setRegistrations(data || [])

      if (data && data.length > 0) {
        setResult({
          success: true,
          message: `Se encontraron ${data.length} registros para este correo.`,
        })
      } else {
        setResult({
          success: false,
          message: "No se encontraron registros para este correo.",
        })
      }
    } catch (error: any) {
      console.error("Error checking registration:", error)
      setResult({
        success: false,
        message: `Error: ${error.message || "Error desconocido"}`,
      })
    } finally {
      setIsLoading(false)
    }
  }

  async function handleFixRegistration() {
    if (!email) return

    setIsLoading(true)
    setResult(null)

    try {
      const supabase = createClientSupabaseClient()
      const normalizedEmail = email.trim().toLowerCase()

      // Check if registration exists
      const { data: existingReg } = await supabase
        .from("registrations")
        .select("id, status")
        .ilike("email", normalizedEmail)
        .maybeSingle()

      if (existingReg) {
        // Update existing registration to approved status
        const { error: updateError } = await supabase
          .from("registrations")
          .update({ status: "approved" })
          .eq("id", existingReg.id)

        if (updateError) throw updateError

        setResult({
          success: true,
          message: `Registro actualizado correctamente. Estado: aprobado.`,
        })
      } else {
        // Create new registration
        const { error: insertError } = await supabase.from("registrations").insert({
          email: normalizedEmail,
          full_name: "Usuario",
          status: "approved",
          phone_number: "",
        })

        if (insertError) throw insertError

        setResult({
          success: true,
          message: "Registro creado correctamente con estado aprobado.",
        })
      }

      // Refresh the registration list
      handleCheckRegistration()
    } catch (error: any) {
      console.error("Error fixing registration:", error)
      setResult({
        success: false,
        message: `Error: ${error.message || "Error desconocido"}`,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Herramienta de Reparación de Registros</CardTitle>
          <CardDescription>
            Verifica y repara registros de usuarios para solucionar problemas de inicio de sesión
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Correo electrónico</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="usuario@ejemplo.com"
            />
          </div>

          <div className="flex space-x-2">
            <Button onClick={handleCheckRegistration} disabled={isLoading || !email}>
              Verificar Registro
            </Button>
            <Button onClick={handleFixRegistration} disabled={isLoading || !email} variant="secondary">
              Crear/Aprobar Registro
            </Button>
          </div>

          {result && (
            <Alert variant={result.success ? "default" : "destructive"}>
              <AlertDescription>{result.message}</AlertDescription>
            </Alert>
          )}

          {registrations.length > 0 && (
            <div className="mt-4">
              <h3 className="text-lg font-medium mb-2">Registros encontrados:</h3>
              <div className="border rounded-md overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Estado
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Nombre
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {registrations.map((reg) => (
                      <tr key={reg.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{reg.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{reg.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              reg.status === "approved"
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {reg.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{reg.full_name}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
