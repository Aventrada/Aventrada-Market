import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ShieldAlert, AlertTriangle, Info } from "lucide-react"

export function SecurityAlerts() {
  const alerts = [
    {
      id: 1,
      title: "Actividad sospechosa detectada",
      description:
        "Se ha detectado un intento de inicio de sesión desde una ubicación desconocida (San Francisco, CA, USA).",
      severity: "high",
      time: "Hace 5 minutos",
      icon: <ShieldAlert className="h-5 w-5" />,
    },
    {
      id: 2,
      title: "Cambio de contraseña requerido",
      description:
        "Tu contraseña no se ha actualizado en los últimos 90 días. Te recomendamos cambiarla por seguridad.",
      severity: "medium",
      time: "Hace 2 días",
      icon: <AlertTriangle className="h-5 w-5" />,
    },
    {
      id: 3,
      title: "Actualización de política de seguridad",
      description: "Hemos actualizado nuestra política de seguridad. Por favor, revisa los cambios.",
      severity: "low",
      time: "Hace 1 semana",
      icon: <Info className="h-5 w-5" />,
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1">
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
            Se ha detectado un intento de inicio de sesión desde una ubicación desconocida. Si no fuiste tú, te
            recomendamos cambiar tu contraseña inmediatamente y activar la autenticación de dos factores.
          </p>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="destructive">Resolver ahora</Button>
          <Button variant="outline" className="border-red-200 text-red-700">
            Ignorar
          </Button>
        </CardFooter>
      </Card>

      {alerts.map((alert) => (
        <Card key={alert.id} className="mb-4">
          <CardHeader className="pb-2 flex flex-row items-start justify-between">
            <div>
              <CardTitle className="text-lg font-medium flex items-center">
                {alert.icon}
                <span className="ml-2">{alert.title}</span>
              </CardTitle>
              <CardDescription>{alert.time}</CardDescription>
            </div>
            <Badge
              variant={alert.severity === "high" ? "destructive" : alert.severity === "medium" ? "default" : "outline"}
            >
              {alert.severity === "high" ? "Alta" : alert.severity === "medium" ? "Media" : "Baja"}
            </Badge>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{alert.description}</p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" className="ml-auto">
              Marcar como resuelto
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
