import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MoreHorizontal, Plus, Search, Filter } from "lucide-react"

export default function InventoryPage() {
  const tickets = [
    {
      id: "TICKET-001",
      event: "Bad Bunny - San Juan",
      date: "15/06/2024",
      section: "VIP",
      row: "A",
      seat: "12",
      price: "$250.00",
      status: "active",
    },
    {
      id: "TICKET-002",
      event: "Bad Bunny - San Juan",
      date: "15/06/2024",
      section: "VIP",
      row: "A",
      seat: "13",
      price: "$250.00",
      status: "active",
    },
    {
      id: "TICKET-003",
      event: "Daddy Yankee - Ponce",
      date: "22/07/2024",
      section: "General",
      row: "C",
      seat: "45",
      price: "$189.00",
      status: "sold",
    },
    {
      id: "TICKET-004",
      event: "Myke Towers - Mayagüez",
      date: "05/08/2024",
      section: "General",
      row: "F",
      seat: "22",
      price: "$99.00",
      status: "flagged",
    },
    {
      id: "TICKET-005",
      event: "Myke Towers - Mayagüez",
      date: "05/08/2024",
      section: "General",
      row: "F",
      seat: "23",
      price: "$99.00",
      status: "active",
    },
  ]

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Inventario de Boletos</h2>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Añadir Boleto
        </Button>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Buscar boletos..." className="w-[300px] pl-8" />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            Exportar
          </Button>
          <Button variant="outline" size="sm">
            Imprimir
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">Todos (5)</TabsTrigger>
          <TabsTrigger value="active">Activos (3)</TabsTrigger>
          <TabsTrigger value="sold">Vendidos (1)</TabsTrigger>
          <TabsTrigger value="flagged">Marcados (1)</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">ID</TableHead>
                    <TableHead>Evento</TableHead>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Sección</TableHead>
                    <TableHead>Fila</TableHead>
                    <TableHead>Asiento</TableHead>
                    <TableHead>Precio</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tickets.map((ticket) => (
                    <TableRow key={ticket.id}>
                      <TableCell className="font-medium">{ticket.id}</TableCell>
                      <TableCell>{ticket.event}</TableCell>
                      <TableCell>{ticket.date}</TableCell>
                      <TableCell>{ticket.section}</TableCell>
                      <TableCell>{ticket.row}</TableCell>
                      <TableCell>{ticket.seat}</TableCell>
                      <TableCell>{ticket.price}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            ticket.status === "active"
                              ? "default"
                              : ticket.status === "sold"
                                ? "outline"
                                : "destructive"
                          }
                        >
                          {ticket.status === "active" ? "Activo" : ticket.status === "sold" ? "Vendido" : "Marcado"}
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
                            <DropdownMenuItem>Ver detalles</DropdownMenuItem>
                            <DropdownMenuItem>Editar boleto</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">Eliminar boleto</DropdownMenuItem>
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
        <TabsContent value="active">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">ID</TableHead>
                    <TableHead>Evento</TableHead>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Sección</TableHead>
                    <TableHead>Fila</TableHead>
                    <TableHead>Asiento</TableHead>
                    <TableHead>Precio</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tickets
                    .filter((ticket) => ticket.status === "active")
                    .map((ticket) => (
                      <TableRow key={ticket.id}>
                        <TableCell className="font-medium">{ticket.id}</TableCell>
                        <TableCell>{ticket.event}</TableCell>
                        <TableCell>{ticket.date}</TableCell>
                        <TableCell>{ticket.section}</TableCell>
                        <TableCell>{ticket.row}</TableCell>
                        <TableCell>{ticket.seat}</TableCell>
                        <TableCell>{ticket.price}</TableCell>
                        <TableCell>
                          <Badge>Activo</Badge>
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
                              <DropdownMenuItem>Ver detalles</DropdownMenuItem>
                              <DropdownMenuItem>Editar boleto</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600">Eliminar boleto</DropdownMenuItem>
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
        <TabsContent value="sold">{/* Similar table for sold tickets */}</TabsContent>
        <TabsContent value="flagged">{/* Similar table for flagged tickets */}</TabsContent>
      </Tabs>
    </div>
  )
}
