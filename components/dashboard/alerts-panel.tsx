"use client"

import { useState } from "react"
import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

export function AlertsPanel() {
  const [open, setOpen] = useState(false)

  const alerts = [
    {
      id: 1,
      title: "Alerta de seguridad",
      message: "Actividad sospechosa detectada en tu cuenta",
      type: "security",
      read: false,
      time: "Hace 5 minutos",
    },
    {
      id: 2,
      title: "Boleto vendido",
      message: "Tu boleto para 'Bad Bunny' ha sido vendido",
      type: "sale",
      read: false,
      time: "Hace 2 horas",
    },
    {
      id: 3,
      title: "Pago recibido",
      message: "Has recibido un pago de $120.00",
      type: "payment",
      read: true,
      time: "Ayer",
    },
  ]

  const unreadCount = alerts.filter((alert) => !alert.read).length

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
              {unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="end">
        <div className="flex items-center justify-between border-b pb-2">
          <h4 className="font-medium">Notificaciones</h4>
          <Button variant="ghost" size="sm" className="text-xs">
            Marcar todo como leído
          </Button>
        </div>
        <div className="max-h-80 overflow-auto">
          {alerts.map((alert) => (
            <div key={alert.id} className={cn("border-b py-3 last:border-0", !alert.read && "bg-muted/50")}>
              <div className="flex justify-between">
                <h5 className="font-medium">{alert.title}</h5>
                <span className="text-xs text-muted-foreground">{alert.time}</span>
              </div>
              <p className="text-sm text-muted-foreground">{alert.message}</p>
            </div>
          ))}
        </div>
        <div className="mt-2 text-center">
          <Button variant="link" size="sm" className="text-xs">
            Ver todas las notificaciones
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
