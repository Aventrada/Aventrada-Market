import type { ReactNode } from "react"
import { DashboardNav } from "@/components/dashboard/dashboard-nav"
import { UserAccountNav } from "@/components/dashboard/user-account-nav"
import { MobileNav } from "@/components/dashboard/mobile-nav"
import { AlertsPanel } from "@/components/dashboard/alerts-panel"

interface DashboardLayoutProps {
  children: ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <MobileNav />
            <a href="/dashboard" className="flex items-center gap-2">
              <span className="font-bold text-xl">Aventrada</span>
            </a>
          </div>
          <div className="flex items-center gap-4">
            <AlertsPanel />
            <UserAccountNav />
          </div>
        </div>
      </header>
      <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr] lg:grid-cols-[240px_1fr]">
        <aside className="hidden w-[200px] flex-col md:flex lg:w-[240px]">
          <DashboardNav />
        </aside>
        <main className="flex w-full flex-1 flex-col overflow-hidden pt-6">{children}</main>
      </div>
    </div>
  )
}
