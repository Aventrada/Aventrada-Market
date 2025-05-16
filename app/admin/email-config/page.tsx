"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, CheckCircle, Loader2 } from "lucide-react"

export default function EmailConfigPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [config, setConfig] = useState<{
    resendApiKey: boolean
    emailApiKey: boolean
    gmailEmail: boolean
    gmailAppPassword: boolean
  }>({
    resendApiKey: false,
    emailApiKey: false,
    gmailEmail: false,
    gmailAppPassword: false,
  })

  useEffect(() => {
    async function checkConfig() {
      try {
        const response = await fetch("/api/check-email-config")
        const data = await response.json()
        setConfig(data)
      } catch (error) {
        console.error("Error checking config:", error)
      } finally {
        setIsLoading(false)
      }
    }

    checkConfig()
  }, [])

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Configuración de Email</CardTitle>
          <CardDescription>Verificación de las variables de entorno para el envío de emails.</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
            </div>
          ) : (
            <div className="space-y-4">
              <Alert variant={config.resendApiKey ? "default" : "destructive"}>
                {config.resendApiKey ? <CheckCircle className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
                <AlertTitle>RESEND_API_KEY</AlertTitle>
                <AlertDescription>
                  {config.resendApiKey
                    ? "Configurada correctamente"
                    : "No configurada. Esta variable es necesaria para usar Resend."}
                </AlertDescription>
              </Alert>

              <Alert variant={config.emailApiKey ? "default" : "destructive"}>
                {config.emailApiKey ? <CheckCircle className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
                <AlertTitle>EMAIL_API_KEY</AlertTitle>
                <AlertDescription>
                  {config.emailApiKey
                    ? "Configurada correctamente"
                    : "No configurada. Esta variable es una alternativa a RESEND_API_KEY."}
                </AlertDescription>
              </Alert>

              <Alert variant={config.gmailEmail ? "default" : "warning"}>
                {config.gmailEmail ? <CheckCircle className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
                <AlertTitle>GMAIL_EMAIL</AlertTitle>
                <AlertDescription>
                  {config.gmailEmail
                    ? "Configurada correctamente"
                    : "No configurada. Esta variable es opcional y solo necesaria si usas Nodemailer."}
                </AlertDescription>
              </Alert>

              <Alert variant={config.gmailAppPassword ? "default" : "warning"}>
                {config.gmailAppPassword ? <CheckCircle className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
                <AlertTitle>GMAIL_APP_PASSWORD</AlertTitle>
                <AlertDescription>
                  {config.gmailAppPassword
                    ? "Configurada correctamente"
                    : "No configurada. Esta variable es opcional y solo necesaria si usas Nodemailer."}
                </AlertDescription>
              </Alert>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => window.history.back()}>
            Volver
          </Button>
          <Button onClick={() => window.location.reload()}>Actualizar</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
