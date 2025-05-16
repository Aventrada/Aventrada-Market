import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DollarSign, Download, CreditCard, AlertCircle, Info } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function PayoutsPage() {
  const payouts = [
    {
      id: "PAY-001",
      date: "01/05/2024",
      amount: "$250.00",
      status: "completed",
      reference: "REF123456",
    },
    {
      id: "PAY-002",
      date: "15/04/2024",
      amount: "$189.00",
      status: "completed",
      reference: "REF789012",
    },
    {
      id: "PAY-003",
      date: "01/04/2024",
      amount: "$99.00",
      status: "completed",
      reference: "REF345678",
    },
    {
      id: "PAY-004",
      date: "15/05/2024",
      amount: "$299.00",
      status: "pending",
      reference: "REF901234",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Pagos</h2>
        <Button>
          <Download className="mr-2 h-4 w-4" /> Descargar Historial
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Balance Disponible</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$652.00</div>
            <p className="text-xs text-muted-foreground">Disponible para retiro</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pagos Pendientes</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$299.00</div>
            <p className="text-xs text-muted-foreground">Disponible en 3 días</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Pagado (2024)</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$1,452.00</div>
            <p className="text-xs text-muted-foreground">Desde el 01/01/2024</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Solicitar Pago</CardTitle>
            <CardDescription>Transfiere fondos a tu cuenta bancaria</CardDescription>
          </div>
          <Button>Solicitar Pago</Button>
        </CardHeader>
        <CardContent>
          <Alert>
            <Info className="h-4 w-4" />
            <AlertTitle>Información de Pago</AlertTitle>
            <AlertDescription>
              Los pagos se procesan cada lunes y jueves. Las solicitudes realizadas antes de las 12:00 PM se procesarán
              en el siguiente ciclo de pago.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      <Tabs defaultValue="history" className="w-full">
        <TabsList>
          <TabsTrigger value="history">Historial de Pagos</TabsTrigger>
          <TabsTrigger value="pending">Pagos Pendientes</TabsTrigger>
          <TabsTrigger value="settings">Configuración de Pagos</TabsTrigger>
        </TabsList>
        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Historial de Pagos</CardTitle>
              <CardDescription>Registro de todos los pagos recibidos</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Monto</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Referencia</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payouts.map((payout) => (
                    <TableRow key={payout.id}>
                      <TableCell className="font-medium">{payout.id}</TableCell>
                      <TableCell>{payout.date}</TableCell>
                      <TableCell>{payout.amount}</TableCell>
                      <TableCell>
                        <Badge
                          variant={payout.status === "completed" ? "outline" : "default"}
                          className={payout.status === "completed" ? "bg-green-50 text-green-700 border-green-200" : ""}
                        >
                          {payout.status === "completed" ? "Completado" : "Pendiente"}
                        </Badge>
                      </TableCell>
                      <TableCell>{payout.reference}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="pending">
          <Card>
            <CardHeader>
              <CardTitle>Pagos Pendientes</CardTitle>
              <CardDescription>Pagos en proceso que aún no han sido depositados</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Monto</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Fecha Estimada</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payouts
                    .filter((payout) => payout.status === "pending")
                    .map((payout) => (
                      <TableRow key={payout.id}>
                        <TableCell className="font-medium">{payout.id}</TableCell>
                        <TableCell>{payout.date}</TableCell>
                        <TableCell>{payout.amount}</TableCell>
                        <TableCell>
                          <Badge>Pendiente</Badge>
                        </TableCell>
                        <TableCell>18/05/2024</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Configuración de Pagos</CardTitle>
              <CardDescription>Administra tus métodos de pago y preferencias</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-md">
                <div>
                  <h3 className="font-medium">Cuenta Bancaria</h3>
                  <p className="text-sm text-muted-foreground">Banco Popular **** 5678</p>
                </div>
                <Button variant="outline">Editar</Button>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-md">
                <div>
                  <h3 className="font-medium">Frecuencia de Pagos</h3>
                  <p className="text-sm text-muted-foreground">Automático (cuando el balance supere $100)</p>
                </div>
                <Button variant="outline">Editar</Button>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-md">
                <div>
                  <h3 className="font-medium">Notificaciones de Pago</h3>
                  <p className="text-sm text-muted-foreground">Email y SMS</p>
                </div>
                <Button variant="outline">Editar</Button>
              </div>

              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Importante</AlertTitle>
                <AlertDescription>
                  Cualquier cambio en tu información bancaria requerirá verificación adicional y puede demorar los pagos
                  pendientes.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
