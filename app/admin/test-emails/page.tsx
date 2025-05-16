"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, CheckCircle, Loader2 } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AdminHeader } from "../components/admin-header"
import Link from "next/link"

export default function TestEmailsPage() {
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [templateType, setTemplateType] = useState("approval")
  const [isLoading, setIsLoading] = useState(false)
  const [results, setResults] = useState<Array<{ success: boolean; message: string; id?: string }>>([])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch("/api/test-emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: email,
          name,
          templateType,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Error al enviar el email")
      }

      setResults([
        {
          success: true,
          message: data.message || "Email enviado correctamente",
          id: data.emailId,
        },
        ...results,
      ])
    } catch (error: any) {
      setResults([
        {
          success: false,
          message: error.message || "Error desconocido al enviar el email",
        },
        ...results,
      ])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminHeader />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Prueba de Envío de Correos</h1>
          <Link href="/admin/email-stats">
            <Button variant="outline">Ver Estadísticas</Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Enviar Correo de Prueba</CardTitle>
              <CardDescription>
                Utiliza este formulario para enviar correos de prueba con diferentes plantillas.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Correo electrónico de destino</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ejemplo@correo.com"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="name">Nombre del destinatario</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nombre Apellido"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="templateType">Tipo de plantilla</Label>
                  <Select value={templateType} onValueChange={setTemplateType}>
                    <SelectTrigger id="templateType">
                      <SelectValue placeholder="Selecciona una plantilla" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="approval">Aprobación</SelectItem>
                      <SelectItem value="rejection">Rechazo</SelectItem>
                      <SelectItem value="welcome">Bienvenida</SelectItem>
                      <SelectItem value="generic">Genérico</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    "Enviar correo de prueba"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Resultados</CardTitle>
              <CardDescription>Historial de correos enviados en esta sesión</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {results.length > 0 ? (
                  results.map((result, index) => (
                    <Alert key={index} variant={result.success ? "default" : "destructive"}>
                      {result.success ? <CheckCircle className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
                      <AlertTitle>{result.success ? "Éxito" : "Error"}</AlertTitle>
                      <AlertDescription>
                        {result.message}
                        {result.id && (
                          <div className="mt-2 text-xs">
                            <span className="font-semibold">ID del correo:</span> {result.id}
                          </div>
                        )}
                      </AlertDescription>
                    </Alert>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <p>No hay resultados para mostrar</p>
                    <p className="text-sm">Envía un correo de prueba para ver los resultados aquí</p>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <div className="text-sm text-gray-500 w-full text-center">
                Los correos enviados se registrarán en la base de datos y aparecerán en el panel de estadísticas
              </div>
            </CardFooter>
          </Card>
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Instrucciones</CardTitle>
            <CardDescription>Cómo verificar que los correos se registren correctamente</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-lg">1. Enviar correos de prueba</h3>
                <p className="text-gray-600">
                  Utiliza el formulario para enviar correos de prueba con diferentes plantillas. Puedes enviar varios
                  correos para generar datos suficientes para las estadísticas.
                </p>
              </div>

              <div>
                <h3 className="font-medium text-lg">2. Verificar en la base de datos</h3>
                <p className="text-gray-600">
                  Los correos enviados se registrarán automáticamente en la tabla <code>email_stats</code> de la base de
                  datos.
                </p>
              </div>

              <div>
                <h3 className="font-medium text-lg">3. Comprobar el panel de estadísticas</h3>
                <p className="text-gray-600">
                  Visita la página de{" "}
                  <Link href="/admin/email-stats" className="text-blue-600 hover:underline">
                    Estadísticas de Correos
                  </Link>{" "}
                  para ver los correos enviados y sus estadísticas.
                </p>
              </div>

              <div>
                <h3 className="font-medium text-lg">4. Simular aperturas y clics</h3>
                <p className="text-gray-600">
                  Para simular que un correo ha sido abierto, puedes visitar manualmente la URL del pixel de
                  seguimiento:
                </p>
                <code className="block bg-gray-100 p-2 rounded mt-2 text-sm">/api/email-tracking/[ID_DEL_CORREO]</code>
                <p className="text-gray-600 mt-2">
                  Reemplaza <code>[ID_DEL_CORREO]</code> con el ID del correo que se muestra en los resultados.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
