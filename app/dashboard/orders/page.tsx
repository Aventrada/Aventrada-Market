import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Filter, Download, Eye, MoreHorizontal } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function OrdersPage() {
  const orders = [
    {
      id: "ORD-001",
      date: "05/05/2024",
      buyer: "Juan Méndez",
      event: "Bad Bunny - San Juan",
      amount: "$250.00",
      status: "completed",
    },
    {
      id: "ORD-002",
      date: "28/04/2024",
      buyer: "Laura Rodríguez",
      event: "Daddy Yankee - Ponce",
      amount: "$189.00",
      status: "completed",
    },
    {
      id: "ORD-003",
      date: "15/04/2024",
      buyer: "Carlos Morales",
      event: "Myke Towers - Mayagüez",
      amount: "$99.00",
      status: "completed",
    },
    {
      id: "ORD-004",
      date: "10/05/2024",
      buyer: "Sofia Díaz",
      event: "Bad Bunny - San Juan",
      amount: "$299.00",
      status: "pending",
    },
    {
      id: "ORD-005",
      date: "12/05/2024",
      buyer: "Roberto Vega",
      event: "Myke Towers - Mayagüez",
      amount: "$99.00",
      status: "disputed",
    },
  ]

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Órdenes</h2>
        <Button>
          <Download className="mr-2 h-4 w-4" /> Exportar
        </Button>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Buscar órdenes..." className="w-[300px] pl-8" />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            Últimos 30 días
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">Todas (5)</TabsTrigger>
          <TabsTrigger value="completed">Completadas (3)</TabsTrigger>
          <TabsTrigger value="pending">Pendientes (1)</TabsTrigger>
          <TabsTrigger value="disputed">Disputas (1)</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">ID</TableHead>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Comprador</TableHead>
                    <TableHead>Evento</TableHead>
                    <TableHead>Monto</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>{order.date}</TableCell>
                      <TableCell>{order.buyer}</TableCell>
                      <TableCell>{order.event}</TableCell>
                      <TableCell>{order.amount}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            order.status === "completed"
                              ? "outline"
                              : order.status === "pending"
                                ? "default"
                                : "destructive"
                          }
                          className={order.status === "completed" ? "bg-green-50 text-green-700 border-green-200" : ""}
                        >
                          {order.status === "completed"
                            ? "Completada"
                            : order.status === "pending"
                              ? "Pendiente"
                              : "Disputa"}
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
                            <DropdownMenuItem>Contactar comprador</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">Reportar problema</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="completed">{/* Similar table for completed orders */}</TabsContent>
        <TabsContent value="pending">{/* Similar table for pending orders */}</TabsContent>
        <TabsContent value="disputed">{/* Similar table for disputed orders */}</TabsContent>
      </Tabs>
    </div>
  )
}
