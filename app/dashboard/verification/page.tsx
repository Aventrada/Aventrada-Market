"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CheckCircle2, AlertCircle, Upload, Shield, Info, CheckCircle } from "lucide-react"

export default function VerificationPage() {
  const [verificationProgress, setVerificationProgress] = useState(40)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Centro de Verificación</h2>
          <p className="text-muted-foreground">
            Completa la verificación para obtener el estatus de Vendedor Verificado
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-muted-foreground" />
          <div>
            <p className="text-sm font-medium">Estado de Verificación</p>
            <div className="flex items-center gap-2">
              <Progress value={verificationProgress} className="h-2 w-[100px]" />
              <span className="text-sm text-muted-foreground">{verificationProgress}%</span>
            </div>
          </div>
        </div>
      </div>

      <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>Verificación Requerida</AlertTitle>
        <AlertDescription>
          Para proteger a nuestra comunidad, requerimos que todos los vendedores completen el proceso de verificación
          antes de poder vender boletos.
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="identity" className="space-y-4">
        <TabsList className="grid grid-cols-4">
          <TabsTrigger value="identity">Identidad</TabsTrigger>
          <TabsTrigger value="contact">Contacto</TabsTrigger>
          <TabsTrigger value="payment">Pagos</TabsTrigger>
          <TabsTrigger value="security">Seguridad</TabsTrigger>
        </TabsList>

        <TabsContent value="identity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Verificación de Identidad</CardTitle>
              <CardDescription>Sube una identificación oficial con foto para verificar tu identidad</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="id-type">Tipo de Identificación</Label>
                  <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                    <option value="">Selecciona un tipo</option>
                    <option value="driver-license">Licencia de Conducir</option>
                    <option value="passport">Pasaporte</option>
                    <option value="id-card">Tarjeta de Identificación</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="id-number">Número de Identificación</Label>
                  <Input id="id-number" placeholder="Ingresa el número" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="id-front">Frente de la Identificación</Label>
                  <div className="border-2 border-dashed rounded-md p-6 text-center cursor-pointer hover:bg-muted/50">
                    <Upload className="h-8 w-8 mx-auto text-muted-foreground" />
                    <p className="mt-2 text-sm text-muted-foreground">Arrastra y suelta o haz clic para subir</p>
                    <Input id="id-front" type="file" className="hidden" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="id-back">Reverso de la Identificación</Label>
                  <div className="border-2 border-dashed rounded-md p-6 text-center cursor-pointer hover:bg-muted/50">
                    <Upload className="h-8 w-8 mx-auto text-muted-foreground" />
                    <p className="mt-2 text-sm text-muted-foreground">Arrastra y suelta o haz clic para subir</p>
                    <Input id="id-back" type="file" className="hidden" />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="selfie">Selfie con Identificación</Label>
                <div className="border-2 border-dashed rounded-md p-6 text-center cursor-pointer hover:bg-muted/50">
                  <Upload className="h-8 w-8 mx-auto text-muted-foreground" />
                  <p className="mt-2 text-sm text-muted-foreground">Toma una selfie sosteniendo tu identificación</p>
                  <Input id="selfie" type="file" className="hidden" />
                </div>
              </div>

              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Importante</AlertTitle>
                <AlertDescription>
                  Tu identificación debe ser válida y no estar vencida. Asegúrate de que todas las imágenes sean claras
                  y legibles.
                </AlertDescription>
              </Alert>
            </CardContent>
            <CardFooter>
              <Button className="ml-auto">Guardar y Continuar</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="contact" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Verificación de Contacto</CardTitle>
              <CardDescription>Verifica tu información de contacto para mayor seguridad</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="email">Correo Electrónico</Label>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    <CheckCircle className="mr-1 h-3 w-3" /> Verificado
                  </Badge>
                </div>
                <Input id="email" value="vendedor@aventrada.com" disabled />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="phone">Número de Teléfono</Label>
                  <Badge variant="outline">Pendiente</Badge>
                </div>
                <div className="flex gap-2">
                  <Input id="phone" placeholder="Ingresa tu número de teléfono" />
                  <Button>Verificar</Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Dirección</Label>
                <Input id="address" placeholder="Línea 1" />
                <Input placeholder="Línea 2 (opcional)" />
                <div className="grid grid-cols-2 gap-2">
                  <Input placeholder="Ciudad" />
                  <Input placeholder="Código Postal" />
                </div>
                <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                  <option value="">Selecciona un país</option>
                  <option value="pr">Puerto Rico</option>
                  <option value="us">Estados Unidos</option>
                </select>
              </div>

              <Alert>
                <Info className="h-4 w-4" />
                <AlertTitle>Verificación de Teléfono</AlertTitle>
                <AlertDescription>Recibirás un código por SMS para verificar tu número de teléfono.</AlertDescription>
              </Alert>
            </CardContent>
            <CardFooter>
              <Button className="ml-auto">Guardar y Continuar</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="payment" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Información de Pago</CardTitle>
              <CardDescription>Configura tu cuenta bancaria para recibir pagos</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="account-type">Tipo de Cuenta</Label>
                <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                  <option value="">Selecciona un tipo</option>
                  <option value="checking">Cuenta Corriente</option>
                  <option value="savings">Cuenta de Ahorros</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bank-name">Nombre del Banco</Label>
                <Input id="bank-name" placeholder="Ingresa el nombre del banco" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="routing-number">Número de Ruta</Label>
                  <Input id="routing-number" placeholder="Número de ruta" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="account-number">Número de Cuenta</Label>
                  <Input id="account-number" placeholder="Número de cuenta" type="password" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="account-holder">Titular de la Cuenta</Label>
                <Input id="account-holder" placeholder="Nombre completo del titular" />
              </div>

              <Alert>
                <Info className="h-4 w-4" />
                <AlertTitle>Verificación Bancaria</AlertTitle>
                <AlertDescription>
                  Realizaremos dos pequeños depósitos de prueba en tu cuenta para verificarla. Este proceso puede tomar
                  de 1 a 3 días hábiles.
                </AlertDescription>
              </Alert>
            </CardContent>
            <CardFooter>
              <Button className="ml-auto">Guardar y Continuar</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Configuración de Seguridad</CardTitle>
              <CardDescription>Configura opciones adicionales de seguridad para proteger tu cuenta</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-md">
                <div className="flex items-center gap-3">
                  <Shield className="h-8 w-8 text-muted-foreground" />
                  <div>
                    <h3 className="font-medium">Autenticación de Dos Factores</h3>
                    <p className="text-sm text-muted-foreground">Añade una capa adicional de seguridad a tu cuenta</p>
                  </div>
                </div>
                <Button variant="outline">Configurar</Button>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-md">
                <div className="flex items-center gap-3">
                  <AlertCircle className="h-8 w-8 text-muted-foreground" />
                  <div>
                    <h3 className="font-medium">Alertas de Seguridad</h3>
                    <p className="text-sm text-muted-foreground">Recibe notificaciones sobre actividad sospechosa</p>
                  </div>
                </div>
                <Button variant="outline">Configurar</Button>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-md">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-8 w-8 text-muted-foreground" />
                  <div>
                    <h3 className="font-medium">Verificación de Dispositivos</h3>
                    <p className="text-sm text-muted-foreground">
                      Administra los dispositivos que tienen acceso a tu cuenta
                    </p>
                  </div>
                </div>
                <Button variant="outline">Configurar</Button>
              </div>

              <Alert>
                <Info className="h-4 w-4" />
                <AlertTitle>Recomendación de Seguridad</AlertTitle>
                <AlertDescription>
                  Te recomendamos activar la autenticación de dos factores para proteger mejor tu cuenta.
                </AlertDescription>
              </Alert>
            </CardContent>
            <CardFooter>
              <Button className="ml-auto">Guardar y Continuar</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Estado de Verificación</CardTitle>
          <CardDescription>Tu progreso hacia convertirte en un Vendedor Verificado</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Progreso Total</span>
                <span className="text-sm font-medium">{verificationProgress}%</span>
              </div>
              <Progress value={verificationProgress} className="h-2" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Correo electrónico verificado</span>
                </div>
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  Completado
                </Badge>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-5 w-5 rounded-full border border-muted-foreground flex items-center justify-center text-xs">
                    2
                  </div>
                  <span>Verificación de identidad</span>
                </div>
                <Badge variant="outline">Pendiente</Badge>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-5 w-5 rounded-full border border-muted-foreground flex items-center justify-center text-xs">
                    3
                  </div>
                  <span>Verificación de teléfono</span>
                </div>
                <Badge variant="outline">Pendiente</Badge>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-5 w-5 rounded-full border border-muted-foreground flex items-center justify-center text-xs">
                    4
                  </div>
                  <span>Verificación bancaria</span>
                </div>
                <Badge variant="outline">Pendiente</Badge>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-5 w-5 rounded-full border border-muted-foreground flex items-center justify-center text-xs">
                    5
                  </div>
                  <span>Configuración de seguridad</span>
                </div>
                <Badge variant="outline">Pendiente</Badge>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button disabled className="ml-auto">
            Solicitar Verificación Final
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
