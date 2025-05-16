"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Shield, Upload, Info } from "lucide-react"

export default function SettingsPage() {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Configuración</h2>
      </div>

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList>
          <TabsTrigger value="profile">Perfil</TabsTrigger>
          <TabsTrigger value="security">Seguridad</TabsTrigger>
          <TabsTrigger value="notifications">Notificaciones</TabsTrigger>
          <TabsTrigger value="preferences">Preferencias</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Información de Perfil</CardTitle>
              <CardDescription>Actualiza tu información personal</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src="/abstract-geometric-shapes.png" alt="Avatar" />
                  <AvatarFallback>VP</AvatarFallback>
                </Avatar>
                <div>
                  <Button variant="outline" size="sm">
                    <Upload className="mr-2 h-4 w-4" />
                    Cambiar foto
                  </Button>
                  <p className="text-xs text-muted-foreground mt-1">JPG, GIF o PNG. Máximo 1MB.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre Completo</Label>
                  <Input id="name" defaultValue="Vendedor Premium" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="username">Nombre de Usuario</Label>
                  <Input id="username" defaultValue="vendedor_premium" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Correo Electrónico</Label>
                  <Input id="email" defaultValue="vendedor@aventrada.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Teléfono</Label>
                  <Input id="phone" defaultValue="+1 (787) 555-1234" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Biografía</Label>
                <Textarea id="bio" placeholder="Cuéntanos un poco sobre ti..." className="min-h-[100px]" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Guardar Cambios</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Seguridad de la Cuenta</CardTitle>
              <CardDescription>Administra la seguridad de tu cuenta</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Contraseña Actual</Label>
                <Input id="current-password" type="password" />
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="new-password">Nueva Contraseña</Label>
                  <Input id="new-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirmar Contraseña</Label>
                  <Input id="confirm-password" type="password" />
                </div>
              </div>

              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <div className="flex items-center">
                    <Shield className="mr-2 h-4 w-4" />
                    <Label htmlFor="two-factor">Autenticación de Dos Factores</Label>
                  </div>
                  <p className="text-sm text-muted-foreground">Añade una capa adicional de seguridad a tu cuenta</p>
                </div>
                <Switch id="two-factor" checked={twoFactorEnabled} onCheckedChange={setTwoFactorEnabled} />
              </div>

              <Alert>
                <Info className="h-4 w-4" />
                <AlertTitle>Recomendación de Seguridad</AlertTitle>
                <AlertDescription>
                  Te recomendamos cambiar tu contraseña cada 90 días y utilizar una combinación de letras, números y
                  símbolos.
                </AlertDescription>
              </Alert>
            </CardContent>
            <CardFooter>
              <Button>Guardar Cambios</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Sesiones Activas</CardTitle>
              <CardDescription>Administra tus sesiones activas en diferentes dispositivos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div>
                    <p className="font-medium">Este dispositivo</p>
                    <p className="text-sm text-muted-foreground">
                      San Juan, Puerto Rico • Chrome en Windows • Activo ahora
                    </p>
                  </div>
                  <Button variant="outline" size="sm" disabled>
                    Actual
                  </Button>
                </div>
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div>
                    <p className="font-medium">iPhone 13</p>
                    <p className="text-sm text-muted-foreground">
                      San Juan, Puerto Rico • Safari en iOS • Hace 2 horas
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    Cerrar Sesión
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Preferencias de Notificaciones</CardTitle>
              <CardDescription>Configura cómo y cuándo quieres recibir notificaciones</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <h3 className="font-medium">Notificaciones por Correo Electrónico</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="email-sales">Ventas</Label>
                    <Switch id="email-sales" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="email-security">Alertas de Seguridad</Label>
                    <Switch id="email-security" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="email-marketing">Marketing y Promociones</Label>
                    <Switch id="email-marketing" />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="email-system">Actualizaciones del Sistema</Label>
                    <Switch id="email-system" defaultChecked />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium">Notificaciones Push</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="push-sales">Ventas</Label>
                    <Switch id="push-sales" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="push-security">Alertas de Seguridad</Label>
                    <Switch id="push-security" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="push-messages">Mensajes</Label>
                    <Switch id="push-messages" defaultChecked />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium">Notificaciones SMS</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="sms-sales">Ventas</Label>
                    <Switch id="sms-sales" />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="sms-security">Alertas de Seguridad</Label>
                    <Switch id="sms-security" defaultChecked />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Guardar Preferencias</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="preferences" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Preferencias de la Cuenta</CardTitle>
              <CardDescription>Personaliza tu experiencia en la plataforma</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <h3 className="font-medium">Idioma y Región</h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="language">Idioma</Label>
                    <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                      <option value="es">Español</option>
                      <option value="en">English</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Zona Horaria</Label>
                    <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                      <option value="ast">AST - Atlantic Standard Time (Puerto Rico)</option>
                      <option value="est">EST - Eastern Standard Time</option>
                      <option value="cst">CST - Central Standard Time</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium">Apariencia</h3>
                <div className="space-y-2">
                  <Label>Tema</Label>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="flex items-center justify-center rounded-md border border-input bg-background p-4 hover:bg-accent hover:text-accent-foreground">
                      <span>Claro</span>
                    </div>
                    <div className="flex items-center justify-center rounded-md border border-input bg-background p-4 hover:bg-accent hover:text-accent-foreground">
                      <span>Oscuro</span>
                    </div>
                    <div className="flex items-center justify-center rounded-md border-2 border-primary bg-background p-4">
                      <span>Sistema</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="marketing">Comunicaciones de Marketing</Label>
                    <p className="text-sm text-muted-foreground">Recibe ofertas especiales y actualizaciones</p>
                  </div>
                  <Switch id="marketing" />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Guardar Preferencias</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Eliminar Cuenta</CardTitle>
              <CardDescription>Elimina permanentemente tu cuenta y todos tus datos</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Una vez que elimines tu cuenta, no hay vuelta atrás. Por favor, asegúrate de que realmente quieres hacer
                esto.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="destructive">Eliminar Cuenta</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
