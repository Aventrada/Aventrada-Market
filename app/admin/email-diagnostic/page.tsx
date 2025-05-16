"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, CheckCircle, Loader2 } from "lucide-react"
import { getApprovalEmailTemplate } from "@/lib/email"

export default function EmailDiagnosticPage() {
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [apiKey, setApiKey] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [rawResponse, setRawResponse] = useState<string>("")

  // Modificar la función handleSubmit para usar la dirección de correo registrada en Resend
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsLoading(true)
    setResult(null)
    setRawResponse("")

    try {
      // Usar la API key ingresada por el usuario
      if (!apiKey) {
        throw new Error("Por favor, ingresa una API key de Resend")
      }

      const emailHtml = getApprovalEmailTemplate(name)

      // Usar fetch directamente para evitar problemas con la biblioteca
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          from: "Aventrada <notificaciones@aventrada.com>",
          to: ["developer@aventrada.com"], // Siempre enviar a la dirección registrada
          subject: `Prueba de diagnóstico - Aventrada (Destinatario original: ${email})`,
          html: emailHtml,
        }),
      })

      const responseText = await response.text()
      setRawResponse(responseText)

      let responseData
      try {
        responseData = JSON.parse(responseText)
      } catch (e) {
        responseData = { error: "No se pudo parsear la respuesta como JSON" }
      }

      if (!response.ok) {
        throw new Error(responseData?.error?.message || `Error ${response.status}: ${response.statusText}`)
      }

      setResult({
        success: true,
        message: `Email enviado correctamente a developer@aventrada.com (modo de prueba) con ID: ${responseData?.id}`,
        data: responseData,
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
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Diagnóstico avanzado de email</CardTitle>
          <CardDescription>
            Esta herramienta realiza una solicitud directa a la API de Resend para diagnosticar problemas de
            conectividad.
          </CardDescription>
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

            {rawResponse && (
              <div className="mt-4">
                <Label>Respuesta cruda de la API:</Label>
                <Textarea value={rawResponse} readOnly className="font-mono text-xs h-32 mt-1" />
              </div>
            )}

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Enviando...
                </>
              ) : (
                "Enviar email de diagnóstico"
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
