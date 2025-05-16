"use client"

import { useState } from "react"
import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { Check, X, MoreHorizontal, Loader2, Mail, Edit, Save, Download, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { toast } from "@/components/ui/use-toast"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Registration } from "../page"
import { updateRegistrationStatus, updateRegistrationNotes, deleteRegistration, exportRegistrations } from "../actions"

type PaginationProps = {
  totalItems: number
  totalPages: number
  currentPage: number
  pageSize: number
}

export function RegistrationTable({
  registrations,
  pagination,
}: {
  registrations: Registration[]
  pagination: PaginationProps
}) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [isUpdating, setIsUpdating] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState<string | null>(null)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [selectedRegistration, setSelectedRegistration] = useState<Registration | null>(null)
  const [editingNotes, setEditingNotes] = useState<{ id: string; notes: string } | null>(null)
  const [isExporting, setIsExporting] = useState(false)
  const [exportFormat, setExportFormat] = useState<"csv" | "json">("csv")

  async function handleUpdateStatus(id: string, status: "approved" | "rejected") {
    setIsUpdating(id)

    try {
      console.log(`Actualizando estado del registro ${id} a ${status}...`)
      const result = await updateRegistrationStatus(id, status)
      console.log("Resultado de la actualización:", result)

      if (!result.success) {
        throw new Error(result.message)
      }

      // Mostrar mensaje de éxito con información sobre el email si es relevante
      if (status === "approved") {
        if (result.emailSent === false) {
          toast({
            title: "Estado actualizado",
            description: `El registro ha sido aprobado, pero hubo un problema al enviar el email: ${result.emailError || "Error desconocido"}`,
            variant: "destructive",
          })
        } else {
          toast({
            title: "Estado actualizado",
            description: "El registro ha sido aprobado y se ha enviado un email de notificación.",
          })
        }
      } else {
        toast({
          title: "Estado actualizado",
          description: `El registro ha sido ${status === "approved" ? "aprobado" : "rechazado"} correctamente.`,
        })
      }

      // Recargar la página para ver los cambios
      router.refresh()
    } catch (error: any) {
      console.error("Error updating status:", error)
      toast({
        title: "Error",
        description: error.message || "No se pudo actualizar el estado del registro.",
        variant: "destructive",
      })
    } finally {
      setIsUpdating(null)
    }
  }

  async function handleDeleteRegistration(id: string) {
    setIsDeleting(id)

    try {
      const result = await deleteRegistration(id)

      if (!result.success) {
        throw new Error(result.message)
      }

      toast({
        title: "Registro eliminado",
        description: "El registro ha sido eliminado correctamente.",
      })

      // Recargar la página para ver los cambios
      router.refresh()
    } catch (error: any) {
      console.error("Error deleting registration:", error)
      toast({
        title: "Error",
        description: error.message || "No se pudo eliminar el registro.",
        variant: "destructive",
      })
    } finally {
      setIsDeleting(null)
      setShowDeleteDialog(false)
    }
  }

  async function handleSaveNotes() {
    if (!editingNotes) return

    setIsUpdating(editingNotes.id)

    try {
      const result = await updateRegistrationNotes(editingNotes.id, editingNotes.notes)

      if (!result.success) {
        throw new Error(result.message)
      }

      toast({
        title: "Notas actualizadas",
        description: "Las notas han sido actualizadas correctamente.",
      })

      // Recargar la página para ver los cambios
      router.refresh()
    } catch (error: any) {
      console.error("Error updating notes:", error)
      toast({
        title: "Error",
        description: error.message || "No se pudieron actualizar las notas.",
        variant: "destructive",
      })
    } finally {
      setIsUpdating(null)
      setEditingNotes(null)
    }
  }

  async function handleExport() {
    setIsExporting(true)

    try {
      const result = await exportRegistrations(exportFormat)

      if (!result.success) {
        throw new Error(result.message)
      }

      // Crear un enlace para descargar el archivo
      const blob = new Blob([result.data], {
        type: exportFormat === "csv" ? "text/csv" : "application/json",
      })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `aventrada-registrations.${exportFormat}`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)

      toast({
        title: "Exportación completada",
        description: `Los datos han sido exportados en formato ${exportFormat.toUpperCase()}.`,
      })
    } catch (error: any) {
      console.error("Error exporting data:", error)
      toast({
        title: "Error",
        description: error.message || "No se pudieron exportar los datos.",
        variant: "destructive",
      })
    } finally {
      setIsExporting(false)
    }
  }

  function confirmDelete(registration: Registration) {
    setSelectedRegistration(registration)
    setShowDeleteDialog(true)
  }

  function getStatusBadge(status: string) {
    switch (status) {
      case "pending":
        return (
          <span className="inline-flex rounded-full bg-yellow-100 px-2 text-xs font-semibold leading-5 text-yellow-800">
            Pendiente
          </span>
        )
      case "approved":
        return (
          <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
            Aprobado
          </span>
        )
      case "rejected":
        return (
          <span className="inline-flex rounded-full bg-red-100 px-2 text-xs font-semibold leading-5 text-red-800">
            Rechazado
          </span>
        )
      default:
        return (
          <span className="inline-flex rounded-full bg-gray-100 px-2 text-xs font-semibold leading-5 text-gray-800">
            {status}
          </span>
        )
    }
  }

  function formatDate(dateString: string) {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("es", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  function handlePageChange(page: number) {
    const current = new URLSearchParams(Array.from(searchParams.entries()))
    current.set("page", page.toString())

    const search = current.toString()
    const query = search ? `?${search}` : ""

    router.push(`${pathname}${query}`)
  }

  async function handleResendEmail(registration: Registration) {
    if (!registration || !registration.email) {
      toast({
        title: "Error",
        description: "No se pudo obtener la información del registro.",
        variant: "destructive",
      })
      return
    }

    setIsUpdating(registration.id)

    try {
      console.log(`Reenviando email al registro ${registration.id}...`)
      // Volver a llamar a updateRegistrationStatus con "approved" para reenviar el email
      const result = await updateRegistrationStatus(registration.id, "approved")
      console.log("Resultado del reenvío:", result)

      if (!result.success) {
        throw new Error(result.message)
      }

      if (result.emailSent === false) {
        toast({
          title: "Error al reenviar",
          description: `No se pudo reenviar el email: ${result.emailError || "Error desconocido"}`,
          variant: "destructive",
        })
      } else {
        toast({
          title: "Email reenviado",
          description: `Se ha reenviado el email de confirmación a ${registration.email}`,
        })
      }
    } catch (error: any) {
      console.error("Error resending email:", error)
      toast({
        title: "Error",
        description: error.message || "No se pudo reenviar el email.",
        variant: "destructive",
      })
    } finally {
      setIsUpdating(null)
    }
  }

  return (
    <>
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <div className="text-sm text-gray-500">
          Mostrando <span className="font-medium">{registrations.length}</span> de{" "}
          <span className="font-medium">{pagination.totalItems}</span> registros
        </div>

        <div className="flex items-center space-x-2">
          <Select value={exportFormat} onValueChange={(value: "csv" | "json") => setExportFormat(value)}>
            <SelectTrigger className="w-[100px]">
              <SelectValue placeholder="Formato" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="csv">CSV</SelectItem>
              <SelectItem value="json">JSON</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" size="sm" onClick={handleExport} disabled={isExporting}>
            {isExporting ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Download className="h-4 w-4 mr-2" />}
            Exportar
          </Button>
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
                Nombre
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
              >
                Correo
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
              >
                Teléfono
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
              >
                Preferencias
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
                Notas
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
              >
                Fecha
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500"
              >
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {registrations.length > 0 ? (
              registrations.map((registration) => (
                <tr key={registration.id}>
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{registration.full_name}</div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="text-sm text-gray-500">{registration.email}</div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="text-sm text-gray-500">{registration.phone_number}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-500">
                      {registration.preferences ? (
                        <div className="flex flex-wrap gap-1">
                          {registration.preferences.split(",").map((pref, index) => (
                            <span
                              key={index}
                              className="inline-flex rounded-full bg-purple-100 px-2 text-xs font-medium text-purple-800"
                            >
                              {pref.trim()}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-gray-400">No especificadas</span>
                      )}
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">{getStatusBadge(registration.status)}</td>
                  <td className="px-6 py-4">
                    {editingNotes && editingNotes.id === registration.id ? (
                      <div className="flex flex-col space-y-2">
                        <Textarea
                          value={editingNotes.notes}
                          onChange={(e) => setEditingNotes({ ...editingNotes, notes: e.target.value })}
                          className="text-sm"
                          rows={3}
                        />
                        <div className="flex justify-end space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setEditingNotes(null)}
                            className="h-7 px-2 text-xs"
                          >
                            Cancelar
                          </Button>
                          <Button
                            size="sm"
                            onClick={handleSaveNotes}
                            disabled={isUpdating === registration.id}
                            className="h-7 px-2 text-xs"
                          >
                            {isUpdating === registration.id ? (
                              <Loader2 className="h-3 w-3 animate-spin" />
                            ) : (
                              <Save className="h-3 w-3 mr-1" />
                            )}
                            Guardar
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="group relative text-sm text-gray-500">
                        <div className="max-h-16 overflow-hidden text-ellipsis">
                          {registration.notes || <span className="text-gray-400 italic">Sin notas</span>}
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setEditingNotes({ id: registration.id, notes: registration.notes || "" })}
                          className="absolute right-0 top-0 opacity-0 group-hover:opacity-100 h-6 w-6 p-0"
                        >
                          <Edit className="h-3 w-3" />
                        </Button>
                      </div>
                    )}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                    {formatDate(registration.created_at)}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      {registration.status === "pending" && (
                        <>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-green-600 hover:text-green-700"
                            onClick={() => handleUpdateStatus(registration.id, "approved")}
                            disabled={isUpdating === registration.id}
                            title="Aprobar registro"
                          >
                            {isUpdating === registration.id ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <Check className="h-4 w-4" />
                            )}
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-600 hover:text-red-700"
                            onClick={() => handleUpdateStatus(registration.id, "rejected")}
                            disabled={isUpdating === registration.id}
                            title="Rechazar registro"
                          >
                            {isUpdating === registration.id ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <X className="h-4 w-4" />
                            )}
                          </Button>
                        </>
                      )}
                      {registration.status === "approved" && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-blue-600 hover:text-blue-700"
                          onClick={() => handleResendEmail(registration)}
                          disabled={isUpdating === registration.id}
                          title="Reenviar email de confirmación"
                        >
                          {isUpdating === registration.id ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Mail className="h-4 w-4" />
                          )}
                        </Button>
                      )}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => confirmDelete(registration)}>Eliminar</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="px-6 py-4 text-center text-sm text-gray-500">
                  No se encontraron registros
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

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. Se eliminará permanentemente el registro de{" "}
              <span className="font-medium">{selectedRegistration?.full_name}</span>.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => selectedRegistration && handleDeleteRegistration(selectedRegistration.id)}
              className="bg-red-600 hover:bg-red-700"
              disabled={!!isDeleting}
            >
              {isDeleting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Eliminando...
                </>
              ) : (
                "Eliminar"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
