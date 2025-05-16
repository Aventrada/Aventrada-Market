"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import {
  BarChart3,
  Box,
  CreditCard,
  FilePlus,
  Flag,
  LayoutDashboard,
  Settings,
  ShieldAlert,
  ShoppingCart,
  UserCheck,
} from "lucide-react"

export function MobileNav() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  const navItems = [
    {
      title: "Panel Principal",
      href: "/dashboard",
      icon: <LayoutDashboard className="mr-2 h-4 w-4" />,
    },
    {
      title: "Inventario",
      href: "/dashboard/inventory",
      icon: <Box className="mr-2 h-4 w-4" />,
    },
    {
      title: "Añadir Boleto",
      href: "/dashboard/add-ticket",
      icon: <FilePlus className="mr-2 h-4 w-4" />,
    },
    {
      title: "Órdenes",
      href: "/dashboard/orders",
      icon: <ShoppingCart className="mr-2 h-4 w-4" />,
      alert: 2,
    },
    {
      title: "Verificación",
      href: "/dashboard/verification",
      icon: <UserCheck className="mr-2 h-4 w-4" />,
    },
    {
      title: "Pagos",
      href: "/dashboard/payouts",
      icon: <CreditCard className="mr-2 h-4 w-4" />,
    },
    {
      title: "Alertas de Seguridad",
      href: "/dashboard/security-alerts",
      icon: <ShieldAlert className="mr-2 h-4 w-4" />,
      alert: 1,
    },
    {
      title: "Reportes",
      href: "/dashboard/reports",
      icon: <Flag className="mr-2 h-4 w-4" />,
    },
    {
      title: "Estadísticas",
      href: "/dashboard/stats",
      icon: <BarChart3 className="mr-2 h-4 w-4" />,
    },
    {
      title: "Configuración",
      href: "/dashboard/settings",
      icon: <Settings className="mr-2 h-4 w-4" />,
    },
  ]

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="pr-0">
        <div className="px-7">
          <Link href="/" className="flex items-center" onClick={() => setOpen(false)}>
            <span className="font-bold text-xl">Aventrada</span>
          </Link>
        </div>
        <div className="mt-8 px-4">
          <nav className="grid gap-2">
            {navItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center gap-2 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                  pathname === item.href && "bg-muted text-primary",
                )}
              >
                {item.icon}
                <span>{item.title}</span>
                {item.alert && (
                  <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                    {item.alert}
                  </span>
                )}
              </Link>
            ))}
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  )
}
