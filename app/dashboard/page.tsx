import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ShieldAlert, TrendingUp, DollarSign, Ticket, AlertTriangle } from "lucide-react"
import { RecentSales } from "@/components/dashboard/recent-sales"
import { Overview } from "@/components/dashboard/overview"
import { SecurityAlerts } from "@/components/dashboard/security-alerts"

export default function DashboardPage() {
  return (
    <div className="flex-1 space-y-4">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Panel Principal</h2>
        <div className="flex items-center space-x-2">
          <Button>Descargar Reporte</Button>
        </div>
      </div>

      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Verificación pendiente</AlertTitle>
        <AlertDescription>
          Tu cuenta aún no está completamente verificada. Completa el proceso de verificación para acceder a todas las
          funciones.
          <Button variant="link" className="h-auto p-0 pl-2">
            Verificar ahora
          </Button>
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Resumen</TabsTrigger>
          <TabsTrigger value="analytics">Analíticas</TabsTrigger>
          <TabsTrigger value="security">Seguridad</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Ventas Totales</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$1,452.00</div>
                <p className="text-xs text-muted-foreground">+20.1% desde el mes pasado</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Boletos Activos</CardTitle>
                <Ticket className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">+3 desde la semana pasada</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pagos Pendientes</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$652.00</div>
                <p className="text-xs text-muted-foreground">Disponible en 3 días</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Alertas de Seguridad</CardTitle>
                <ShieldAlert className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1</div>
                <p className="text-xs text-red-500 font-medium">Requiere atención</p>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Resumen de Ventas</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <Overview />
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Ventas Recientes</CardTitle>
                <CardDescription>Has vendido 12 boletos este mes</CardDescription>
              </CardHeader>
              <CardContent>
                <RecentSales />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Rendimiento de Ventas</CardTitle>
                <CardDescription>Comparativa de ventas por mes</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <Overview />
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Eventos Populares</CardTitle>
                <CardDescription>Eventos con mayor demanda</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-full">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">Bad Bunny - San Juan</p>
                        <Badge>Alta demanda</Badge>
                      </div>
                      <div className="mt-2 h-2 w-full rounded-full bg-muted">
                        <div className="h-2 rounded-full bg-primary" style={{ width: "85%" }} />
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-full">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">Daddy Yankee - Ponce</p>
                        <Badge variant="outline">Media demanda</Badge>
                      </div>
                      <div className="mt-2 h-2 w-full rounded-full bg-muted">
                        <div className="h-2 rounded-full bg-primary" style={{ width: "65%" }} />
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-full">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">Myke Towers - Mayagüez</p>
                        <Badge variant="outline">Media demanda</Badge>
                      </div>
                      <div className="mt-2 h-2 w-full rounded-full bg-muted">
                        <div className="h-2 rounded-full bg-primary" style={{ width: "45%" }} />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="security" className="space-y-4">
          <SecurityAlerts />
        </TabsContent>
      </Tabs>
    </div>
  )
}
