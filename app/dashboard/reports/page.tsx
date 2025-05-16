import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Flag, AlertTriangle, Eye, MoreHorizontal } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function ReportsPage() {
  const flaggedItems = [
    {
      id: "TICKET-004",
      event: "Myke Towers - Mayagüez",
      date: "05/08/2024",
      reason: "Precio excesivo",
      reportedBy: "Sistema",
      status: "pending",
    },
    {
      id: "TICKET-006",
      event: "Bad Bunny - San Juan",
      date: "15/06/2024",
      reason: "Posible duplicado",
      reportedBy: "Usuario",
      status: "investigating",
    },
    {
      id: "TICKET-008",
      event: "Daddy Yankee - Ponce",
      date: "22/07/2024",
      reason: "Información incorrecta",
      reportedBy: "Administrador",
      status: "resolved",
    },
    {
      id: "TICKET-010",
      event: "Myke Towers - Mayagüez",
      date: "05/08/2024",
      reason: "Boleto no disponible",
      reportedBy: "Usuario",
      status: "dismissed",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Reportes y Boletos Marcados</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Flag className="mr-2 h-5 w-5 text-red-500" />
            Boletos Marcados
          </CardTitle>
          <CardDescription>Boletos que han sido marcados por el sistema o reportados por usuarios</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="w-full">
            <TabsList>
              <TabsTrigger value="all">Todos (4)</TabsTrigger>
              <TabsTrigger value="pending">Pendientes (1)</TabsTrigger>
              <TabsTrigger value="investigating">En Investigación (1)</TabsTrigger>
              <TabsTrigger value="resolved">Resueltos (2)</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="pt-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">ID</TableHead>
                    <TableHead>Evento</TableHead>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Motivo</TableHead>
                    <TableHead>Reportado Por</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {flaggedItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.id}</TableCell>
                      <TableCell>{item.event}</TableCell>
                      <TableCell>{item.date}</TableCell>
                      <TableCell>{item.reason}</TableCell>
                      <TableCell>{item.reportedBy}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            item.status === "pending" || item.status === "investigating"
                              ? "default"
                              : item.status === "resolved"
                                ? "outline"
                                : "secondary"
                          }
                          className={item.status === "resolved" ? "bg-green-50 text-green-700 border-green-200" : ""}
                        >
                          {item.status === "pending"
                            ? "Pendiente"
                            : item.status === "investigating"
                              ? "En Investigación"
                              : item.status === "resolved"
                                ? "Resuelto"
                                : "Descartado"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Abrir menú</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" /> Ver detalles
                            </DropdownMenuItem>
                            <DropdownMenuItem>Responder al reporte</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Marcar como resuelto</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
            <TabsContent value="pending">{/* Similar table for pending items */}</TabsContent>
            <TabsContent value="investigating">{/* Similar table for investigating items */}</TabsContent>
            <TabsContent value="resolved">{/* Similar table for resolved items */}</TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <AlertTriangle className="mr-2 h-5 w-5 text-amber-500" />
            Disputas Activas
          </CardTitle>
          <CardDescription>Disputas abiertas por compradores que requieren tu atención</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Disputa #DIS-001</h3>
                <p className="text-sm text-muted-foreground">
                  Boleto: TICKET-005 • Comprador: Roberto Vega • Fecha: 12/05/2024
                </p>
              </div>
              <Badge>En Proceso</Badge>
            </div>
            <div className="mt-4">
              <p className="text-sm">
                <span className="font-medium">Motivo:</span> El comprador alega que el boleto no es válido para el
                evento.
              </p>
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <Button variant="outline" size="sm">
                Ver detalles
              </Button>
              <Button size="sm">Responder</Button>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-muted-foreground">
            Las disputas deben resolverse dentro de las 48 horas para mantener tu calificación de vendedor.
          </p>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Guía de Prevención de Fraude</CardTitle>
          <CardDescription>Consejos para evitar problemas y mantener tu cuenta en buen estado</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-md bg-muted p-4">
            <h3 className="font-medium">Consejos para Evitar Marcas en tus Boletos:</h3>
            <ul className="mt-2 space-y-2 text-sm">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Asegúrate de que los boletos sean auténticos y provengan de fuentes verificables.</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>No vendas el mismo boleto en múltiples plataformas.</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Establece precios razonables que reflejen el valor real del boleto.</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Proporciona información precisa y completa sobre los boletos.</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Responde rápidamente a las consultas de los compradores.</span>
              </li>
            </ul>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="link" className="px-0">
            Ver guía completa de prevención de fraude
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
