"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { createClientSupabaseClient } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Loader2, CheckCircle, AlertTriangle } from "lucide-react"

export default function AccountFixPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const email = searchParams.get("email") || ""

  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<any>(null)
  const [accountStatus, setAccountStatus] = useState<"checking" | "not_found" | "pending" | "approved" | "error">(
    "checking",
  )

  useEffect(() => {
    if (!email) {
      setError("No se proporcionó un correo electrónico")
      setIsLoading(false)
      return
    }

    checkAndFixAccount()
  }, [email])

  async function checkAndFixAccount() {
    setIsLoading(true)
    setError(null)

    try {
      const supabase = createClientSupabaseClient()
      const normalizedEmail = email.toLowerCase().trim()

      // Check if registration exists
      const { data: existingReg, error: checkError } = await supabase
        .from("registrations")
        .select("id, status, email")
        .ilike("email", normalizedEmail)
        .maybeSingle()

      if (checkError) {
        throw new Error(`Error verificando registro: ${checkError.message}`)
      }

      // If registration doesn't exist, create it
      if (!existingReg) {
        setAccountStatus("not_found")

        // Create registration
        const { data: newReg, error: createError } = await supabase
          .from("registrations")
          .insert({
            email: normalizedEmail,
            full_name: "Usuario Recuperado",
            phone_number: "No proporcionado",
            status: "approved",
            created_at: new Date().toISOString(),
          })
          .select("id")
          .single()

        if (createError) {
          throw new Error(`Error creando registro: ${createError.message}`)
        }

        setResult({
          success: true,
          message: "Se ha creado un nuevo registro para este correo electrónico",
          registration: newReg,
        })
        setAccountStatus("approved")
      } else {
        // If registration exists but not approved, approve it
        if (existingReg.status !== "approved") {
          setAccountStatus("pending")

          const { error: updateError } = await supabase
            .from("registrations")
            .update({
              status: "approved",
              updated_at: new Date().toISOString(),
            })
            .eq("id", existingReg.id)

          if (updateError) {
            throw new Error(`Error actualizando estado: ${updateError.message}`)
          }

          setResult({
            success: true,
            message: "El registro existente ha sido aprobado",
            registration: {
              ...existingReg,
              status: "approved",
            },
          })
          setAccountStatus("approved")
        } else {
          setAccountStatus("approved")
          setResult({
            success: true,
            message: "El registro ya existe y está aprobado",
            registration: existingReg,
          })
        }
      }
    } catch (err: any) {
      console.error("Error fixing account:", err)
      setError(err.message || "Error al arreglar la cuenta")
      setAccountStatus("error")
      setResult({
        success: false,
        message: err.message || "Error al arreglar la cuenta",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Reparación de Cuenta</CardTitle>
          <CardDescription>
            {isLoading ? "Verificando y reparando tu cuenta..." : "Resultado de la reparación de cuenta"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-8">
              <Loader2 className="h-12 w-12 animate-spin text-purple-600 mb-4" />
              <p className="text-gray-600">Verificando y reparando la cuenta...</p>
            </div>
          ) : error ? (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          ) : (
            <div className="space-y-4">
              <Alert className={result?.success ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"}>
                {result?.success ? (
                  <CheckCircle className="h-4 w-4 text-green-600" />
                ) : (
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                )}
                <AlertTitle className={result?.success ? "text-green-800" : "text-red-800"}>
                  {result?.success ? "Cuenta reparada con éxito" : "Error en la reparación"}
                </AlertTitle>
                <AlertDescription className={result?.success ? "text-green-700" : "text-red-700"}>
                  {result?.message}
                </AlertDescription>
              </Alert>

              <div className="rounded-lg border p-4">
                <h3 className="font-medium mb-2">Detalles</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <span className="font-medium w-24">Email:</span>
                    <span>{email}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-medium w-24">Estado:</span>
                    <span>
                      {accountStatus === "approved" && "Aprobado"}
                      {accountStatus === "pending" && "Pendiente (actualizado a aprobado)"}
                      {accountStatus === "not_found" && "No encontrado (creado nuevo)"}
                      {accountStatus === "error" && "Error"}
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-blue-800">
                <p className="text-sm">
                  <strong>Siguiente paso:</strong> Ahora puedes iniciar sesión con tu correo electrónico. Si no tienes
                  una contraseña, usa la opción "Olvidé mi contraseña" para crear una nueva.
                </p>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => router.push("/")}>
            Volver al inicio
          </Button>
          <Button
            onClick={() => router.push(`/auth/signin?email=${encodeURIComponent(email)}`)}
            disabled={isLoading || accountStatus === "error"}
          >
            Ir a iniciar sesión
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
