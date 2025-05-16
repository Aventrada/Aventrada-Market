"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
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

interface NavItem {
  title: string
  href: string
  icon: React.ReactNode
  alert?: number
}

export function DashboardNav() {
  const pathname = usePathname()

  const navItems: NavItem[] = [
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
    <nav className="grid items-start gap-2 text-sm font-medium">
      {navItems.map((item, index) => (
        <Link
          key={index}
          href={item.href}
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
  )
}
