"use client"

import { useState } from "react"
import { createClientSupabaseClient } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2, CheckCircle, XCircle, AlertTriangle, Info } from "lucide-react"

export default function AccountDiagnosticPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [results, setResults] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [fixResult, setFixResult] = useState<any>(null)
  const [isFixing, setIsFixing] = useState(false)

  async function checkAccount() {
    if (!email) return

    setIsLoading(true)
    setError(null)
    setResults(null)
    setFixResult(null)

    try {
      const supabase = createClientSupabaseClient()
      const normalizedEmail = email.toLowerCase().trim()

      // Check auth system
      const { data: authUser, error: authError } = await supabase.auth.admin.getUserByEmail(normalizedEmail)

      // Check registrations table with exact match
      const { data: exactRegistration, error: exactError } = await supabase
        .from("registrations")
        .select("*")
        .eq("email", normalizedEmail)
        .maybeSingle()

      // Check registrations table with case-insensitive match
      const { data: caseInsensitiveRegistration, error: caseError } = await supabase
        .from("registrations")
        .select("*")
        .ilike("email", normalizedEmail)
        .neq("email", normalizedEmail) // Exclude exact match
        .maybeSingle()

      // Check for similar emails
      const { data: similarEmails, error: similarError } = await supabase
        .from("registrations")
        .select("email, status, created_at")
        .ilike("email", `%${normalizedEmail.split("@")[0]}%`)
        .limit(5)

      setResults({
        authUser: authUser,
        exactRegistration,
        caseInsensitiveRegistration,
        similarEmails: similarEmails?.filter((e) => e.email !== normalizedEmail) || [],
        normalizedEmail,
      })
    } catch (err: any) {
      console.error("Error checking account:", err)
      setError(err.message || "Error al verificar la cuenta")
    } finally {
      setIsLoading(false)
    }
  }

  async function fixAccount() {
    if (!email) return

    setIsFixing(true)
    setFixResult(null)
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

        setFixResult({
          success: true,
          message: "Se ha creado un nuevo registro para este correo electrónico",
          registration: newReg,
        })
      } else {
        // If registration exists but not approved, approve it
        if (existingReg.status !== "approved") {
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

          setFixResult({
            success: true,
            message: "El registro existente ha sido aprobado",
            registration: {
              ...existingReg,
              status: "approved",
            },
          })
        } else {
          setFixResult({
            success: true,
            message: "El registro ya existe y está aprobado",
            registration: existingReg,
          })
        }
      }

      // Refresh results
      checkAccount()
    } catch (err: any) {
      console.error("Error fixing account:", err)
      setError(err.message || "Error al arreglar la cuenta")
      setFixResult({
        success: false,
        message: err.message || "Error al arreglar la cuenta",
      })
    } finally {
      setIsFixing(false)
    }
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Diagnóstico de Cuenta</CardTitle>
          <CardDescription>Verifica el estado de una cuenta y soluciona problemas de inicio de sesión</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Correo Electrónico</Label>
              <div className="flex gap-2">
                <Input
                  id="email"
                  placeholder="usuario@ejemplo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1"
                />
                <Button onClick={checkAccount} disabled={isLoading || !email}>
                  {isLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                  Verificar
                </Button>
              </div>
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {results && (
              <Tabs defaultValue="summary" className="mt-6">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="summary">Resumen</TabsTrigger>
                  <TabsTrigger value="details">Detalles</TabsTrigger>
                  <TabsTrigger value="similar">Emails Similares</TabsTrigger>
                </TabsList>

                <TabsContent value="summary" className="space-y-4">
                  <div className="rounded-lg border p-4 mt-4">
                    <h3 className="font-medium mb-2">Estado de la Cuenta</h3>

                    <div className="space-y-2">
                      <div className="flex items-center">
                        <div className="w-8">
                          {results.exactRegistration ? (
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          ) : (
                            <XCircle className="h-5 w-5 text-red-500" />
                          )}
                        </div>
                        <span>Registro en base de datos</span>
                      </div>

                      {results.exactRegistration && (
                        <div className="flex items-center">
                          <div className="w-8">
                            {results.exactRegistration.status === "approved" ? (
                              <CheckCircle className="h-5 w-5 text-green-500" />
                            ) : (
                              <AlertTriangle className="h-5 w-5 text-amber-500" />
                            )}
                          </div>
                          <span>
                            Estado:{" "}
                            {results.exactRegistration.status === "approved" ? "Aprobado" : "Pendiente de aprobación"}
                          </span>
                        </div>
                      )}

                      <div className="flex items-center">
                        <div className="w-8">
                          {results.authUser ? (
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          ) : (
                            <XCircle className="h-5 w-5 text-red-500" />
                          )}
                        </div>
                        <span>Cuenta de autenticación</span>
                      </div>

                      {results.caseInsensitiveRegistration && (
                        <div className="flex items-center">
                          <div className="w-8">
                            <AlertTriangle className="h-5 w-5 text-amber-500" />
                          </div>
                          <span>
                            Encontrado registro con diferente formato: {results.caseInsensitiveRegistration.email}
                          </span>
                        </div>
                      )}

                      {results.similarEmails && results.similarEmails.length > 0 && (
                        <div className="flex items-center">
                          <div className="w-8">
                            <Info className="h-5 w-5 text-blue-500" />
                          </div>
                          <span>Encontrados {results.similarEmails.length} emails similares</span>
                        </div>
                      )}
                    </div>

                    {!results.exactRegistration && (
                      <div className="mt-4">
                        <Button onClick={fixAccount} disabled={isFixing}>
                          {isFixing ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                          Crear registro para este email
                        </Button>
                      </div>
                    )}

                    {results.exactRegistration && results.exactRegistration.status !== "approved" && (
                      <div className="mt-4">
                        <Button onClick={fixAccount} disabled={isFixing}>
                          {isFixing ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                          Aprobar registro
                        </Button>
                      </div>
                    )}

                    {fixResult && (
                      <Alert
                        className={
                          fixResult.success
                            ? "bg-green-50 border-green-200 text-green-800 mt-4"
                            : "bg-red-50 border-red-200 text-red-800 mt-4"
                        }
                      >
                        {fixResult.success ? (
                          <CheckCircle className="h-4 w-4" />
                        ) : (
                          <AlertTriangle className="h-4 w-4" />
                        )}
                        <AlertTitle>{fixResult.success ? "Éxito" : "Error"}</AlertTitle>
                        <AlertDescription>{fixResult.message}</AlertDescription>
                      </Alert>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="details">
                  <div className="rounded-lg border p-4 mt-4">
                    <h3 className="font-medium mb-2">Detalles del Registro</h3>

                    {results.exactRegistration ? (
                      <div className="space-y-2 text-sm">
                        <div className="grid grid-cols-3 gap-2 py-1 border-b">
                          <span className="font-medium">ID:</span>
                          <span className="col-span-2">{results.exactRegistration.id}</span>
                        </div>
                        <div className="grid grid-cols-3 gap-2 py-1 border-b">
                          <span className="font-medium">Email:</span>
                          <span className="col-span-2">{results.exactRegistration.email}</span>
                        </div>
                        <div className="grid grid-cols-3 gap-2 py-1 border-b">
                          <span className="font-medium">Nombre:</span>
                          <span className="col-span-2">{results.exactRegistration.full_name}</span>
                        </div>
                        <div className="grid grid-cols-3 gap-2 py-1 border-b">
                          <span className="font-medium">Teléfono:</span>
                          <span className="col-span-2">{results.exactRegistration.phone_number}</span>
                        </div>
                        <div className="grid grid-cols-3 gap-2 py-1 border-b">
                          <span className="font-medium">Estado:</span>
                          <span className="col-span-2">{results.exactRegistration.status}</span>
                        </div>
                        <div className="grid grid-cols-3 gap-2 py-1 border-b">
                          <span className="font-medium">Creado:</span>
                          <span className="col-span-2">
                            {new Date(results.exactRegistration.created_at).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    ) : (
                      <p className="text-red-600">No se encontró ningún registro para este email.</p>
                    )}

                    <h3 className="font-medium mb-2 mt-6">Detalles de Autenticación</h3>

                    {results.authUser ? (
                      <div className="space-y-2 text-sm">
                        <div className="grid grid-cols-3 gap-2 py-1 border-b">
                          <span className="font-medium">ID:</span>
                          <span className="col-span-2">{results.authUser.id}</span>
                        </div>
                        <div className="grid grid-cols-3 gap-2 py-1 border-b">
                          <span className="font-medium">Email:</span>
                          <span className="col-span-2">{results.authUser.email}</span>
                        </div>
                        <div className="grid grid-cols-3 gap-2 py-1 border-b">
                          <span className="font-medium">Confirmado:</span>
                          <span className="col-span-2">{results.authUser.email_confirmed_at ? "Sí" : "No"}</span>
                        </div>
                        <div className="grid grid-cols-3 gap-2 py-1 border-b">
                          <span className="font-medium">Último inicio:</span>
                          <span className="col-span-2">
                            {results.authUser.last_sign_in_at
                              ? new Date(results.authUser.last_sign_in_at).toLocaleString()
                              : "Nunca"}
                          </span>
                        </div>
                      </div>
                    ) : (
                      <p className="text-red-600">No se encontró ninguna cuenta de autenticación para este email.</p>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="similar">
                  <div className="rounded-lg border p-4 mt-4">
                    <h3 className="font-medium mb-2">Emails Similares</h3>

                    {results.similarEmails && results.similarEmails.length > 0 ? (
                      <div className="space-y-2">
                        {results.similarEmails.map((email: any, index: number) => (
                          <div key={index} className="p-2 border rounded flex justify-between items-center">
                            <div>
                              <div className="font-medium">{email.email}</div>
                              <div className="text-sm text-gray-500">
                                Estado: {email.status} | Creado: {new Date(email.created_at).toLocaleDateString()}
                              </div>
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setEmail(email.email)
                                checkAccount()
                              }}
                            >
                              Verificar
                            </Button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-600">No se encontraron emails similares.</p>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => window.history.back()}>
            Volver
          </Button>
          {results && results.exactRegistration && (
            <Button
              onClick={() =>
                (window.location.href = "/auth/signin?email=" + encodeURIComponent(results.exactRegistration.email))
              }
            >
              Ir a Iniciar Sesión
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}
