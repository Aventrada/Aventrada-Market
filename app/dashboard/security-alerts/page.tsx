import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ShieldAlert, AlertTriangle, Info, CheckCircle, Clock } from "lucide-react"

export default function SecurityAlertsPage() {
  const alerts = [
    {
      id: 1,
      title: "Intento de inicio de sesión sospechoso",
      description:
        "Se detectó un intento de inicio de sesión desde una ubicación desconocida (San Francisco, CA, USA).",
      severity: "high",
      date: "05/05/2024",
      time: "14:32",
      status: "active",
      icon: <ShieldAlert className="h-5 w-5" />,
    },
    {
      id: 2,
      title: "Cambio de contraseña requerido",
      description:
        "Tu contraseña no se ha actualizado en los últimos 90 días. Te recomendamos cambiarla por seguridad.",
      severity: "medium",
      date: "03/05/2024",
      time: "09:15",
      status: "active",
      icon: <AlertTriangle className="h-5 w-5" />,
    },
    {
      id: 3,
      title: "Actualización de política de seguridad",
      description: "Hemos actualizado nuestra política de seguridad. Por favor, revisa los cambios.",
      severity: "low",
      date: "28/04/2024",
      time: "11:45",
      status: "active",
      icon: <Info className="h-5 w-5" />,
    },
    {
      id: 4,
      title: "Verificación de dispositivo completada",
      description: "Tu nuevo dispositivo ha sido verificado correctamente.",
      severity: "info",
      date: "25/04/2024",
      time: "16:20",
      status: "resolved",
      icon: <CheckCircle className="h-5 w-5" />,
    },
    {
      id: 5,
      title: "Actividad inusual en la cuenta",
      description: "Se detectó un patrón de actividad inusual en tu cuenta. Revisa tus recientes acciones.",
      severity: "medium",
      date: "20/04/2024",
      time: "08:45",
      status: "resolved",
      icon: <AlertTriangle className="h-5 w-5" />,
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Alertas de Seguridad</h2>
        <Button variant="outline">Marcar todo como leído</Button>
      </div>

      <Card className="border-red-200 bg-red-50">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-bold text-red-700 flex items-center">
            <ShieldAlert className="h-5 w-5 mr-2" />
            Alerta de Seguridad Crítica
          </CardTitle>
          <CardDescription className="text-red-600">Se requiere tu atención inmediata</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-red-700">
            Se ha detectado un intento de inicio de sesión desde una ubicación desconocida (San Francisco, CA, USA). Si
            no fuiste tú, te recomendamos cambiar tu contraseña inmediatamente y activar la autenticación de dos
            factores.
          </p>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="destructive">Resolver ahora</Button>
          <Button variant="outline" className="border-red-200 text-red-700">
            Ignorar
          </Button>
        </CardFooter>
      </Card>

      <Tabs defaultValue="active" className="w-full">
        <TabsList>
          <TabsTrigger value="active">Alertas Activas (3)</TabsTrigger>
          <TabsTrigger value="resolved">Resueltas (2)</TabsTrigger>
          <TabsTrigger value="all">Todas (5)</TabsTrigger>
        </TabsList>
        <TabsContent value="active" className="space-y-4">
          {alerts
            .filter((alert) => alert.status === "active")
            .map((alert) => (
              <Card key={alert.id} className="mb-4">
                <CardHeader className="pb-2 flex flex-row items-start justify-between">
                  <div>
                    <CardTitle className="text-lg font-medium flex items-center">
                      {alert.icon}
                      <span className="ml-2">{alert.title}</span>
                    </CardTitle>
                    <CardDescription>
                      {alert.date} • {alert.time}
                    </CardDescription>
                  </div>
                  <Badge
                    variant={
                      alert.severity === "high" ? "destructive" : alert.severity === "medium" ? "default" : "outline"
                    }
                  >
                    {alert.severity === "high"
                      ? "Alta"
                      : alert.severity === "medium"
                        ? "Media"
                        : alert.severity === "low"
                          ? "Baja"
                          : "Info"}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{alert.description}</p>
                </CardContent>
                <CardFooter className="flex justify-end gap-2">
                  <Button variant="outline" size="sm">
                    Ignorar
                  </Button>
                  <Button size="sm">Resolver</Button>
                </CardFooter>
              </Card>
            ))}
        </TabsContent>
        <TabsContent value="resolved" className="space-y-4">
          {alerts
            .filter((alert) => alert.status === "resolved")
            .map((alert) => (
              <Card key={alert.id} className="mb-4 bg-muted/30">
                <CardHeader className="pb-2 flex flex-row items-start justify-between">
                  <div>
                    <CardTitle className="text-lg font-medium flex items-center text-muted-foreground">
                      <CheckCircle className="h-5 w-5 mr-2" />
                      <span>{alert.title}</span>
                    </CardTitle>
                    <CardDescription>
                      {alert.date} • {alert.time}
                    </CardDescription>
                  </div>
                  <Badge variant="outline">Resuelta</Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{alert.description}</p>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button variant="ghost" size="sm">
                    Ver detalles
                  </Button>
                </CardFooter>
              </Card>
            ))}
        </TabsContent>
        <TabsContent value="all" className="space-y-4">
          {/* All alerts would be listed here */}
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Configuración de Alertas</CardTitle>
          <CardDescription>Personaliza qué alertas quieres recibir y cómo</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-md">
            <div className="flex items-center gap-3">
              <ShieldAlert className="h-8 w-8 text-muted-foreground" />
              <div>
                <h3 className="font-medium">Alertas de Inicio de Sesión</h3>
                <p className="text-sm text-muted-foreground">
                  Recibe alertas cuando alguien inicie sesión en tu cuenta desde un nuevo dispositivo o ubicación
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                Configurar
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 border rounded-md">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-8 w-8 text-muted-foreground" />
              <div>
                <h3 className="font-medium">Alertas de Actividad Sospechosa</h3>
                <p className="text-sm text-muted-foreground">
                  Recibe alertas cuando detectemos actividad inusual en tu cuenta
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                Configurar
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 border rounded-md">
            <div className="flex items-center gap-3">
              <Clock className="h-8 w-8 text-muted-foreground" />
              <div>
                <h3 className="font-medium">Recordatorios de Seguridad</h3>
                <p className="text-sm text-muted-foreground">
                  Recibe recordatorios periódicos para actualizar tu contraseña y revisar la seguridad de tu cuenta
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                Configurar
              </Button>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="ml-auto">Guardar Preferencias</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
