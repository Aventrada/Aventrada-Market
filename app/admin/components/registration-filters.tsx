"use client"

import type React from "react"

import { useState, useTransition } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Search, SlidersHorizontal, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import type { RegistrationFiltersType } from "../page"

export function RegistrationFilters({ initialFilters }: { initialFilters: RegistrationFiltersType }) {
  const router = useRouter()
  const pathname = usePathname()
  const [isPending, startTransition] = useTransition()

  const [filters, setFilters] = useState<RegistrationFiltersType>({
    status: initialFilters.status || "all",
    search: initialFilters.search || "",
    sortBy: initialFilters.sortBy || "created_at",
    sortDirection: initialFilters.sortDirection || "desc",
    preferences: initialFilters.preferences || "",
  })

  const [isOpen, setIsOpen] = useState(false)

  function applyFilters() {
    startTransition(() => {
      const searchParams = new URLSearchParams()

      if (filters.status && filters.status !== "all") {
        searchParams.set("status", filters.status)
      }

      if (filters.search) {
        searchParams.set("search", filters.search)
      }

      if (filters.sortBy) {
        searchParams.set("sortBy", filters.sortBy)
      }

      if (filters.sortDirection) {
        searchParams.set("sortDirection", filters.sortDirection)
      }

      if (filters.preferences) {
        searchParams.set("preferences", filters.preferences)
      }

      router.push(`${pathname}?${searchParams.toString()}`)
      setIsOpen(false)
    })
  }

  function resetFilters() {
    setFilters({
      status: "all",
      search: "",
      sortBy: "created_at",
      sortDirection: "desc",
      preferences: "",
    })

    startTransition(() => {
      router.push(pathname)
      setIsOpen(false)
    })
  }

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    applyFilters()
  }

  return (
    <div className="border-b border-gray-200 bg-white p-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <form onSubmit={handleSearch} className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="search"
            placeholder="Buscar por nombre o email..."
            className="pl-10"
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          />
        </form>

        <div className="flex items-center gap-2">
          <Select
            value={filters.status || "all"}
            onValueChange={(value) => {
              setFilters({ ...filters, status: value })
              startTransition(() => {
                const searchParams = new URLSearchParams(window.location.search)
                if (value === "all") {
                  searchParams.delete("status")
                } else {
                  searchParams.set("status", value)
                }
                router.push(`${pathname}?${searchParams.toString()}`)
              })
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filtrar por estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los estados</SelectItem>
              <SelectItem value="pending">Pendientes</SelectItem>
              <SelectItem value="approved">Aprobados</SelectItem>
              <SelectItem value="rejected">Rechazados</SelectItem>
            </SelectContent>
          </Select>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <SlidersHorizontal className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Filtros avanzados</SheetTitle>
                <SheetDescription>Configura los filtros para encontrar registros específicos.</SheetDescription>
              </SheetHeader>

              <div className="space-y-6 py-6">
                <div className="space-y-2">
                  <Label htmlFor="sortBy">Ordenar por</Label>
                  <Select
                    value={filters.sortBy || "created_at"}
                    onValueChange={(value) => setFilters({ ...filters, sortBy: value })}
                  >
                    <SelectTrigger id="sortBy">
                      <SelectValue placeholder="Selecciona un campo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="created_at">Fecha de registro</SelectItem>
                      <SelectItem value="full_name">Nombre</SelectItem>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="status">Estado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sortDirection">Dirección</Label>
                  <Select
                    value={filters.sortDirection || "desc"}
                    onValueChange={(value) => setFilters({ ...filters, sortDirection: value as "asc" | "desc" })}
                  >
                    <SelectTrigger id="sortDirection">
                      <SelectValue placeholder="Selecciona dirección" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="desc">Descendente (Z-A)</SelectItem>
                      <SelectItem value="asc">Ascendente (A-Z)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Estado</Label>
                  <Select
                    value={filters.status || "all"}
                    onValueChange={(value) => setFilters({ ...filters, status: value })}
                  >
                    <SelectTrigger id="status">
                      <SelectValue placeholder="Selecciona estado" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos los estados</SelectItem>
                      <SelectItem value="pending">Pendientes</SelectItem>
                      <SelectItem value="approved">Aprobados</SelectItem>
                      <SelectItem value="rejected">Rechazados</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="preferences">Preferencias</Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                      <Tag className="h-4 w-4" />
                    </div>
                    <Input
                      id="preferences"
                      placeholder="Conciertos, Teatro, etc."
                      className="pl-10"
                      value={filters.preferences || ""}
                      onChange={(e) => setFilters({ ...filters, preferences: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={resetFilters}>
                  Restablecer
                </Button>
                <Button onClick={applyFilters} disabled={isPending}>
                  {isPending ? "Aplicando..." : "Aplicar filtros"}
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  )
}
