"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { AlertCircle, ArrowRight, Check, Upload, Info } from "lucide-react"

export default function AddTicketPage() {
  const [step, setStep] = useState(1)
  const [ticketType, setTicketType] = useState("electronic")

  const handleNext = () => {
    setStep(step + 1)
  }

  const handleBack = () => {
    setStep(step - 1)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Añadir Nuevo Boleto</h2>
      </div>

      <div className="flex items-center space-x-2">
        <div
          className={`flex h-8 w-8 items-center justify-center rounded-full ${step >= 1 ? "bg-primary text-primary-foreground" : "border border-input"}`}
        >
          {step > 1 ? <Check className="h-4 w-4" /> : "1"}
        </div>
        <Separator className="flex-1" />
        <div
          className={`flex h-8 w-8 items-center justify-center rounded-full ${step >= 2 ? "bg-primary text-primary-foreground" : "border border-input"}`}
        >
          {step > 2 ? <Check className="h-4 w-4" /> : "2"}
        </div>
        <Separator className="flex-1" />
        <div
          className={`flex h-8 w-8 items-center justify-center rounded-full ${step >= 3 ? "bg-primary text-primary-foreground" : "border border-input"}`}
        >
          {step > 3 ? <Check className="h-4 w-4" /> : "3"}
        </div>
        <Separator className="flex-1" />
        <div
          className={`flex h-8 w-8 items-center justify-center rounded-full ${step >= 4 ? "bg-primary text-primary-foreground" : "border border-input"}`}
        >
          "4"
        </div>
      </div>

      {step === 1 && (
        <Card>
          <CardHeader>
            <CardTitle>Información del Evento</CardTitle>
            <CardDescription>Ingresa los detalles del evento para el boleto que deseas vender</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="event-name">Nombre del Evento</Label>
              <Input id="event-name" placeholder="Ej. Bad Bunny - San Juan" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="event-date">Fecha del Evento</Label>
                <Input id="event-date" type="date" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="event-time">Hora del Evento</Label>
                <Input id="event-time" type="time" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="event-venue">Lugar del Evento</Label>
              <Input id="event-venue" placeholder="Ej. Coliseo de Puerto Rico" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="event-category">Categoría</Label>
              <Select>
                <SelectTrigger id="event-category">
                  <SelectValue placeholder="Selecciona una categoría" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="concert">Concierto</SelectItem>
                  <SelectItem value="sports">Deportes</SelectItem>
                  <SelectItem value="theater">Teatro</SelectItem>
                  <SelectItem value="festival">Festival</SelectItem>
                  <SelectItem value="other">Otro</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" disabled>
              Atrás
            </Button>
            <Button onClick={handleNext}>
              Siguiente <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      )}

      {step === 2 && (
        <Card>
          <CardHeader>
            <CardTitle>Detalles del Boleto</CardTitle>
            <CardDescription>Ingresa la información específica de los asientos</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="ticket-type">Tipo de Boleto</Label>
              <Tabs defaultValue="electronic" onValueChange={setTicketType}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="electronic">Electrónico</TabsTrigger>
                  <TabsTrigger value="physical">Físico</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="ticket-section">Sección</Label>
                <Input id="ticket-section" placeholder="Ej. VIP" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ticket-row">Fila</Label>
                <Input id="ticket-row" placeholder="Ej. A" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ticket-seat">Asiento</Label>
                <Input id="ticket-seat" placeholder="Ej. 12" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="ticket-quantity">Cantidad</Label>
                <Input id="ticket-quantity" type="number" min="1" defaultValue="1" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ticket-face-value">Valor Nominal ($)</Label>
                <Input id="ticket-face-value" type="number" min="0" step="0.01" placeholder="0.00" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="ticket-price">Precio de Venta ($)</Label>
              <Input id="ticket-price" type="number" min="0" step="0.01" placeholder="0.00" />
            </div>

            <Alert>
              <Info className="h-4 w-4" />
              <AlertTitle>Información</AlertTitle>
              <AlertDescription>
                El precio de venta debe incluir todos los impuestos y tarifas aplicables.
              </AlertDescription>
            </Alert>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={handleBack}>
              Atrás
            </Button>
            <Button onClick={handleNext}>
              Siguiente <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      )}

      {step === 3 && (
        <Card>
          <CardHeader>
            <CardTitle>Verificación del Boleto</CardTitle>
            <CardDescription>Sube una imagen del boleto o ingresa el código de barras</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {ticketType === "electronic" ? (
              <>
                <div className="space-y-2">
                  <Label htmlFor="barcode">Código de Barras / QR</Label>
                  <Input id="barcode" placeholder="Ingresa el código de barras o QR" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ticket-source">Fuente del Boleto</Label>
                  <Select>
                    <SelectTrigger id="ticket-source">
                      <SelectValue placeholder="Selecciona la fuente" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ticketera">Ticketera</SelectItem>
                      <SelectItem value="ticketpop">TicketPop</SelectItem>
                      <SelectItem value="prticket">PRTicket</SelectItem>
                      <SelectItem value="other">Otro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmation-number">Número de Confirmación</Label>
                  <Input id="confirmation-number" placeholder="Número de confirmación o pedido" />
                </div>

                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="ticket-image">Imagen del Boleto</Label>
                  <div className="border-2 border-dashed rounded-md p-8 text-center cursor-pointer hover:bg-muted/50">
                    <Upload className="h-8 w-8 mx-auto text-muted-foreground" />
                    <p className="mt-2 text-sm text-muted-foreground">Arrastra y suelta o haz clic para subir</p>
                    <p className="text-xs text-muted-foreground">PNG, JPG o PDF (Max. 5MB)</p>
                    <Input id="ticket-image" type="file" className="hidden" />
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="ticket-front-image">Imagen Frontal del Boleto</Label>
                  <div className="border-2 border-dashed rounded-md p-8 text-center cursor-pointer hover:bg-muted/50">
                    <Upload className="h-8 w-8 mx-auto text-muted-foreground" />
                    <p className="mt-2 text-sm text-muted-foreground">Arrastra y suelta o haz clic para subir</p>
                    <p className="text-xs text-muted-foreground">PNG, JPG o PDF (Max. 5MB)</p>
                    <Input id="ticket-front-image" type="file" className="hidden" />
                  </div>
                </div>

                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="ticket-back-image">Imagen Trasera del Boleto</Label>
                  <div className="border-2 border-dashed rounded-md p-8 text-center cursor-pointer hover:bg-muted/50">
                    <Upload className="h-8 w-8 mx-auto text-muted-foreground" />
                    <p className="mt-2 text-sm text-muted-foreground">Arrastra y suelta o haz clic para subir</p>
                    <p className="text-xs text-muted-foreground">PNG, JPG o PDF (Max. 5MB)</p>
                    <Input id="ticket-back-image" type="file" className="hidden" />
                  </div>
                </div>

                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Importante</AlertTitle>
                  <AlertDescription>
                    Asegúrate de que las imágenes sean claras y legibles. No compartas boletos físicos hasta que se
                    confirme la venta.
                  </AlertDescription>
                </Alert>
              </>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={handleBack}>
              Atrás
            </Button>
            <Button onClick={handleNext}>
              Siguiente <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      )}

      {step === 4 && (
        <Card>
          <CardHeader>
            <CardTitle>Revisar y Publicar</CardTitle>
            <CardDescription>Revisa la información del boleto antes de publicarlo</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="rounded-md border p-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold text-sm text-muted-foreground">Evento</h3>
                  <p>Bad Bunny - San Juan</p>
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-muted-foreground">Fecha y Hora</h3>
                  <p>15/06/2024, 8:00 PM</p>
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-muted-foreground">Lugar</h3>
                  <p>Coliseo de Puerto Rico</p>
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-muted-foreground">Categoría</h3>
                  <p>Concierto</p>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <h3 className="font-semibold text-sm text-muted-foreground">Sección</h3>
                  <p>VIP</p>
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-muted-foreground">Fila</h3>
                  <p>A</p>
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-muted-foreground">Asiento</h3>
                  <p>12</p>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold text-sm text-muted-foreground">Tipo de Boleto</h3>
                  <p>{ticketType === "electronic" ? "Electrónico" : "Físico"}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-muted-foreground">Cantidad</h3>
                  <p>1</p>
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-muted-foreground">Valor Nominal</h3>
                  <p>$200.00</p>
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-muted-foreground">Precio de Venta</h3>
                  <p className="font-bold">$250.00</p>
                </div>
              </div>

              <Separator className="my-4" />

              <div>
                <h3 className="font-semibold text-sm text-muted-foreground">Verificación</h3>
                <div className="flex items-center mt-1">
                  <Badge variant="outline" className="mr-2">
                    Ticketera
                  </Badge>
                  <p className="text-sm">Confirmación: #TK12345678</p>
                </div>
              </div>
            </div>

            <Alert>
              <Info className="h-4 w-4" />
              <AlertTitle>Comisión de Servicio</AlertTitle>
              <AlertDescription>
                Se aplicará una comisión del 10% sobre el precio de venta cuando el boleto sea vendido.
              </AlertDescription>
            </Alert>

            <div className="flex items-center space-x-2">
              <input type="checkbox" id="terms" className="rounded border-gray-300" />
              <Label htmlFor="terms" className="text-sm">
                Confirmo que este boleto es auténtico y que tengo el derecho legal de venderlo. Acepto los{" "}
                <a href="#" className="text-primary underline">
                  Términos y Condiciones
                </a>{" "}
                de Aventrada.
              </Label>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={handleBack}>
              Atrás
            </Button>
            <Button>Publicar Boleto</Button>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}
