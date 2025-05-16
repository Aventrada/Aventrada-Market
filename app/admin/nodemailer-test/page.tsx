"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, CheckCircle, Loader2 } from "lucide-react"

export default function NodemailerTestPage() {
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [gmailEmail, setGmailEmail] = useState("")
  const [gmailPassword, setGmailPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsLoading(true)
    setResult(null)

    try {
      const response = await fetch("/api/send-email-nodemailer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: email,
          name,
          gmailEmail,
          gmailPassword,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Error al enviar el email")
      }

      setResult({
        success: true,
        message: data.message || "Email enviado correctamente",
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
          <CardTitle>Prueba con Nodemailer</CardTitle>
          <CardDescription>
            Utiliza este formulario para probar el envío de emails con Nodemailer y Gmail.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="gmailEmail">Tu correo de Gmail</Label>
              <Input
                id="gmailEmail"
                type="email"
                value={gmailEmail}
                onChange={(e) => setGmailEmail(e.target.value)}
                placeholder="tu@gmail.com"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="gmailPassword">Contraseña de aplicación de Gmail</Label>
              <Input
                id="gmailPassword"
                type="password"
                value={gmailPassword}
                onChange={(e) => setGmailPassword(e.target.value)}
                placeholder="xxxx xxxx xxxx xxxx"
                required
              />
              <p className="text-xs text-gray-500">
                Genera una contraseña de aplicación en{" "}
                <a
                  href="https://myaccount.google.com/apppasswords"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  myaccount.google.com/apppasswords
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
                "Enviar email con Nodemailer"
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
