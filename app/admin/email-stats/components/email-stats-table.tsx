"use client"

import type React from "react"

import { useState, useTransition } from "react"
import { useRouter, usePathname, useSearchParams } from "next/navigation"
import {
  Search,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  Eye,
  MousePointer,
  Send,
  AlertTriangle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import type { EmailStat, EmailStatsFiltersType } from "../page"

type PaginationProps = {
  totalItems: number
  totalPages: number
  currentPage: number
  pageSize: number
}

export function EmailStatsTable({
  emailStats,
  pagination,
  initialFilters,
}: {
  emailStats: EmailStat[]
  pagination: PaginationProps
  initialFilters: EmailStatsFiltersType
}) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [filters, setFilters] = useState<EmailStatsFiltersType>(initialFilters)
  const [isOpen, setIsOpen] = useState(false)
  const [selectedEmail, setSelectedEmail] = useState<EmailStat | null>(null)
  const [showMetadata, setShowMetadata] = useState(false)
  const [isPending, startTransition] = useTransition()

  function applyFilters() {
    startTransition(() => {
      const searchParams = new URLSearchParams()

      if (filters.status) {
        searchParams.set("status", filters.status)
      }

      if (filters.template_type) {
        searchParams.set("template_type", filters.template_type)
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

      if (filters.timeframe) {
        searchParams.set("timeframe", filters.timeframe)
      }

      router.push(`${pathname}?${searchParams.toString()}`)
      setIsOpen(false)
    })
  }

  function resetFilters() {
    setFilters({
      status: undefined,
      template_type: undefined,
      search: "",
      sortBy: "sent_at",
      sortDirection: "desc",
      timeframe: "all",
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

  function handlePageChange(page: number) {
    const current = new URLSearchParams(Array.from(searchParams.entries()))
    current.set("page", page.toString())

    const search = current.toString()
    const query = search ? `?${search}` : ""

    router.push(`${pathname}${query}`)
  }

  function formatDate(dateString: string | null): string {
    if (!dateString) return "—"
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("es", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  function getStatusBadge(status: string) {
    switch (status) {
      case "sent":
        return (
          <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
            <Send className="h-3 w-3 mr-1" /> Enviado
          </Badge>
        )
      case "opened":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <Eye className="h-3 w-3 mr-1" /> Abierto
          </Badge>
        )
      case "clicked":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            <MousePointer className="h-3 w-3 mr-1" /> Clic
          </Badge>
        )
      case "failed":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            <AlertTriangle className="h-3 w-3 mr-1" /> Fallido
          </Badge>
        )
      default:
        return (
          <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
            {status}
          </Badge>
        )
    }
  }

  function getTemplateTypeName(type: string): string {
    switch (type) {
      case "approval":
        return "Aprobación"
      case "rejection":
        return "Rechazo"
      case "welcome":
        return "Bienvenida"
      case "generic":
        return "Genérico"
      default:
        return type
    }
  }

  return (
    <>
      <div className="border-b border-gray-200 bg-white p-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <form onSubmit={handleSearch} className="relative w-full sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="search"
              placeholder="Buscar por destinatario o asunto..."
              className="pl-10"
              value={filters.search || ""}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            />
          </form>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Select
              value={filters.status || ""}
              onValueChange={(value) => {
                setFilters({ ...filters, status: value || undefined })
                startTransition(() => {
                  const searchParams = new URLSearchParams(window.location.search)
                  if (!value) {
                    searchParams.delete("status")
                  } else {
                    searchParams.set("status", value)
                  }
                  router.push(`${pathname}?${searchParams.toString()}`)
                })
              }}
            >
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los estados</SelectItem>
                <SelectItem value="sent">Enviados</SelectItem>
                <SelectItem value="opened">Abiertos</SelectItem>
                <SelectItem value="clicked">Con clics</SelectItem>
                <SelectItem value="failed">Fallidos</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={filters.timeframe || "all"}
              onValueChange={(value: "today" | "week" | "month" | "all") => {
                setFilters({ ...filters, timeframe: value })
                startTransition(() => {
                  const searchParams = new URLSearchParams(window.location.search)
                  searchParams.set("timeframe", value)
                  router.push(`${pathname}?${searchParams.toString()}`)
                })
              }}
            >
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Período" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todo el tiempo</SelectItem>
                <SelectItem value="today">Hoy</SelectItem>
                <SelectItem value="week">Última semana</SelectItem>
                <SelectItem value="month">Último mes</SelectItem>
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
                  <SheetDescription>Configura los filtros para encontrar correos específicos.</SheetDescription>
                </SheetHeader>

                <div className="space-y-6 py-6">
                  <div className="space-y-2">
                    <Label htmlFor="template_type">Tipo de plantilla</Label>
                    <Select
                      value={filters.template_type || ""}
                      onValueChange={(value) => setFilters({ ...filters, template_type: value || undefined })}
                    >
                      <SelectTrigger id="template_type">
                        <SelectValue placeholder="Selecciona un tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todas las plantillas</SelectItem>
                        <SelectItem value="approval">Aprobación</SelectItem>
                        <SelectItem value="rejection">Rechazo</SelectItem>
                        <SelectItem value="welcome">Bienvenida</SelectItem>
                        <SelectItem value="generic">Genérico</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="sortBy">Ordenar por</Label>
                    <Select
                      value={filters.sortBy || "sent_at"}
                      onValueChange={(value) => setFilters({ ...filters, sortBy: value })}
                    >
                      <SelectTrigger id="sortBy">
                        <SelectValue placeholder="Selecciona un campo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sent_at">Fecha de envío</SelectItem>
                        <SelectItem value="recipient">Destinatario</SelectItem>
                        <SelectItem value="subject">Asunto</SelectItem>
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
                        <SelectItem value="desc">Descendente (más reciente primero)</SelectItem>
                        <SelectItem value="asc">Ascendente (más antiguo primero)</SelectItem>
                      </SelectContent>
                    </Select>
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

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
              >
                Destinatario
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
              >
                Asunto
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
              >
                Plantilla
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
              >
                Estado
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
              >
                Enviado
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
              >
                Abierto
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500"
              >
                Detalles
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {emailStats.length > 0 ? (
              emailStats.map((email) => (
                <tr key={email.id} className="hover:bg-gray-50">
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="text-sm text-gray-900">{email.recipient}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 max-w-xs truncate">{email.subject}</div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="text-sm text-gray-900">{getTemplateTypeName(email.template_type)}</div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">{getStatusBadge(email.status)}</td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{formatDate(email.sent_at)}</td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{formatDate(email.opened_at)}</td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 text-center">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-blue-600"
                          onClick={() => setSelectedEmail(email)}
                        >
                          Ver detalles
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-3xl">
                        <DialogHeader>
                          <DialogTitle>Detalles del correo</DialogTitle>
                          <DialogDescription>Información detallada sobre el correo enviado</DialogDescription>
                        </DialogHeader>
                        {selectedEmail && (
                          <div className="space-y-4 mt-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <h3 className="text-sm font-medium text-gray-500">ID del correo</h3>
                                <p className="mt-1 text-sm text-gray-900">{selectedEmail.email_id}</p>
                              </div>
                              <div>
                                <h3 className="text-sm font-medium text-gray-500">Estado</h3>
                                <p className="mt-1">{getStatusBadge(selectedEmail.status)}</p>
                              </div>
                              <div>
                                <h3 className="text-sm font-medium text-gray-500">Destinatario</h3>
                                <p className="mt-1 text-sm text-gray-900">{selectedEmail.recipient}</p>
                              </div>
                              <div>
                                <h3 className="text-sm font-medium text-gray-500">Asunto</h3>
                                <p className="mt-1 text-sm text-gray-900">{selectedEmail.subject}</p>
                              </div>
                              <div>
                                <h3 className="text-sm font-medium text-gray-500">Tipo de plantilla</h3>
                                <p className="mt-1 text-sm text-gray-900">
                                  {getTemplateTypeName(selectedEmail.template_type)}
                                </p>
                              </div>
                              <div>
                                <h3 className="text-sm font-medium text-gray-500">ID de registro</h3>
                                <p className="mt-1 text-sm text-gray-900">{selectedEmail.registration_id || "—"}</p>
                              </div>
                              <div>
                                <h3 className="text-sm font-medium text-gray-500">Fecha de envío</h3>
                                <p className="mt-1 text-sm text-gray-900">{formatDate(selectedEmail.sent_at)}</p>
                              </div>
                              <div>
                                <h3 className="text-sm font-medium text-gray-500">Fecha de apertura</h3>
                                <p className="mt-1 text-sm text-gray-900">{formatDate(selectedEmail.opened_at)}</p>
                              </div>
                            </div>

                            <div>
                              <h3 className="text-sm font-medium text-gray-500 mb-2">Metadatos</h3>
                              <div className="bg-gray-50 p-3 rounded-md">
                                <pre className="text-xs overflow-auto max-h-40">
                                  {JSON.stringify(selectedEmail.metadata, null, 2)}
                                </pre>
                              </div>
                            </div>
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="px-6 py-4 text-center text-sm text-gray-500">
                  No se encontraron registros de correos
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Paginación */}
      {pagination.totalPages > 1 && (
        <div className="px-6 py-4 flex items-center justify-between border-t border-gray-200">
          <div className="flex-1 flex justify-between sm:hidden">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(pagination.currentPage - 1)}
              disabled={pagination.currentPage <= 1}
            >
              Anterior
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(pagination.currentPage + 1)}
              disabled={pagination.currentPage >= pagination.totalPages}
            >
              Siguiente
            </Button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Mostrando <span className="font-medium">{(pagination.currentPage - 1) * pagination.pageSize + 1}</span>{" "}
                a{" "}
                <span className="font-medium">
                  {Math.min(pagination.currentPage * pagination.pageSize, pagination.totalItems)}
                </span>{" "}
                de <span className="font-medium">{pagination.totalItems}</span> resultados
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-l-md"
                  onClick={() => handlePageChange(pagination.currentPage - 1)}
                  disabled={pagination.currentPage <= 1}
                >
                  <span className="sr-only">Anterior</span>
                  <ChevronLeft className="h-4 w-4" />
                </Button>

                {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant={page === pagination.currentPage ? "default" : "outline"}
                    size="sm"
                    onClick={() => handlePageChange(page)}
                    className="hidden md:inline-flex"
                  >
                    {page}
                  </Button>
                ))}

                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-r-md"
                  onClick={() => handlePageChange(pagination.currentPage + 1)}
                  disabled={pagination.currentPage >= pagination.totalPages}
                >
                  <span className="sr-only">Siguiente</span>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </nav>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
