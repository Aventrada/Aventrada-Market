"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, CheckCircle, Loader2 } from "lucide-react"
import { Resend } from "resend"
import { getApprovalEmailTemplate } from "@/lib/email"

export default function TestEmailPage() {
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [apiKey, setApiKey] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsLoading(true)
    setResult(null)

    try {
      // Usar la API key ingresada por el usuario
      if (!apiKey) {
        throw new Error("Por favor, ingresa una API key de Resend")
      }

      const resend = new Resend(apiKey)

      const { data, error } = await resend.emails.send({
        from: "Aventrada <onboarding@resend.dev>",
        to: [email],
        subject: "Prueba de email - Aventrada",
        html: getApprovalEmailTemplate(name),
      })

      if (error) {
        throw new Error(error.message)
      }

      setResult({
        success: true,
        message: `Email enviado correctamente con ID: ${data?.id}`,
      })
    } catch (error: any) {
      setResult({
        success: false,
        message: error.message || "Error desconocido al enviar el email",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Prueba de envío de email</CardTitle>
          <CardDescription>Utiliza este formulario para probar la configuración de envío de emails.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="apiKey">API Key de Resend</Label>
              <Input
                id="apiKey"
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="re_123..."
                required
              />
              <p className="text-xs text-gray-500">
                Obtén tu API key en{" "}
                <a
                  href="https://resend.com/api-keys"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  resend.com/api-keys
                </a>
              </p>
            </div>

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

            {result && (
              <Alert variant={result.success ? "default" : "destructive"} className="mt-4">
                {result.success ? <CheckCircle className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
                <AlertTitle>{result.success ? "Éxito" : "Error"}</AlertTitle>
                <AlertDescription>{result.message}</AlertDescription>
              </Alert>
            )}

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Enviando...
                </>
              ) : (
                "Enviar email de prueba"
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => window.history.back()}>
            Volver
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
