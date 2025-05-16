import { createServerSupabaseClient } from "@/lib/supabase"
import { RegistrationTable } from "./components/registration-table"
import { RegistrationStats } from "./components/registration-stats"
import { RegistrationFilters } from "./components/registration-filters"
import { AdminHeader } from "./components/admin-header"
import { AdminDashboard } from "./components/admin-dashboard"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Mail } from "lucide-react"

export type Registration = {
  id: string
  created_at: string
  full_name: string
  email: string
  phone_number: string
  status: "pending" | "approved" | "rejected"
  notes: string | null
  preferences: string | null
}

export type RegistrationFiltersType = {
  status?: "all" | "pending" | "approved" | "rejected"
  search?: string
  sortBy?: string
  sortDirection?: "asc" | "desc"
  preferences?: string
}

const PAGE_SIZE = 10

export default async function AdminPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const supabase = createServerSupabaseClient()

  // Get URL parameters
  const status = searchParams.status as string | undefined
  const search = searchParams.search as string | undefined
  const sortBy = (searchParams.sortBy as string) || "created_at"
  const sortDirection = (searchParams.sortDirection as "asc" | "desc") || "desc"
  const page = Number.parseInt((searchParams.page as string) || "1", 10)
  const preferences = searchParams.preferences as string | undefined

  // Calculate start and end range for pagination
  const startIndex = (page - 1) * PAGE_SIZE
  const endIndex = startIndex + PAGE_SIZE - 1

  // Fetch registrations with filters
  let query = supabase
    .from("registrations")
    .select("*", { count: "exact" })
    .order(sortBy, { ascending: sortDirection === "asc" })

  if (status && status !== "all") {
    query = query.eq("status", status)
  }

  if (search) {
    query = query.or(`full_name.ilike.%${search}%,email.ilike.%${search}%`)
  }

  if (preferences) {
    query = query.ilike("preferences", `%${preferences}%`)
  }

  const { data: registrations, error, count } = await query.range(startIndex, endIndex)

  if (error) {
    console.error("Error fetching registrations:", error)
    throw new Error("No se pudieron cargar los registros")
  }

  // Fetch stats
  const { data: totalData } = await supabase.from("registrations").select("id", { count: "exact" })
  const { data: pendingData } = await supabase
    .from("registrations")
    .select("id", { count: "exact" })
    .eq("status", "pending")
  const { data: approvedData } = await supabase
    .from("registrations")
    .select("id", { count: "exact" })
    .eq("status", "approved")
  const { data: rejectedData } = await supabase
    .from("registrations")
    .select("id", { count: "exact" })
    .eq("status", "rejected")

  // Fetch daily stats for the last 7 days
  const sevenDaysAgo = new Date()
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
  const sevenDaysAgoStr = sevenDaysAgo.toISOString()

  const { data: dailyRegistrations } = await supabase
    .from("registrations")
    .select("created_at, status")
    .gte("created_at", sevenDaysAgoStr)
    .order("created_at", { ascending: true })

  // Process daily stats
  const dailyStats = []
  if (dailyRegistrations) {
    const dailyMap = new Map()

    // Initialize the last 7 days
    for (let i = 0; i < 7; i++) {
      const date = new Date()
      date.setDate(date.getDate() - i)
      const dateStr = date.toISOString().split("T")[0]
      dailyMap.set(dateStr, { date: dateStr, total: 0, pending: 0, approved: 0, rejected: 0 })
    }

    // Count registrations by day and status
    dailyRegistrations.forEach((reg) => {
      const dateStr = new Date(reg.created_at).toISOString().split("T")[0]
      if (!dailyMap.has(dateStr)) {
        dailyMap.set(dateStr, { date: dateStr, total: 0, pending: 0, approved: 0, rejected: 0 })
      }
      const dayStats = dailyMap.get(dateStr)
      dayStats.total++
      dayStats[reg.status]++
    })

    // Convert map to array and sort by date
    dailyStats.push(...Array.from(dailyMap.values()).sort((a, b) => a.date.localeCompare(b.date)))
  }

  // Fetch top preferences
  const { data: preferencesData } = await supabase.from("registrations").select("preferences")

  // Process preferences data
  const preferencesCount = new Map()
  if (preferencesData) {
    preferencesData.forEach((reg) => {
      if (reg.preferences) {
        const prefs = reg.preferences.split(",").map((p) => p.trim())
        prefs.forEach((pref) => {
          preferencesCount.set(pref, (preferencesCount.get(pref) || 0) + 1)
        })
      }
    })
  }

  // Convert preferences map to array and sort by count
  const topPreferences = Array.from(preferencesCount.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5)

  // Fetch email stats summary
  const { data: emailStats } = await supabase.from("email_stats").select("id, status", { count: "exact" })
  const emailCount = emailStats?.length || 0

  const stats = {
    total: totalData?.length || 0,
    pending: pendingData?.length || 0,
    approved: approvedData?.length || 0,
    rejected: rejectedData?.length || 0,
    dailyStats,
    topPreferences,
  }

  const totalPages = Math.ceil(Number(count) || 0 / PAGE_SIZE)

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminHeader />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <AdminDashboard stats={stats} />

        {emailCount > 0 && (
          <div className="mt-6 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-medium text-gray-900">Estadísticas de Correos</h3>
                <p className="text-sm text-gray-500">
                  Se han enviado {emailCount} correos electrónicos. Consulta las estadísticas detalladas para obtener
                  más información.
                </p>
              </div>
              <Link href="/admin/email-stats">
                <Button className="bg-purple-600 hover:bg-purple-700">
                  <Mail className="mr-2 h-4 w-4" />
                  Ver estadísticas de correos
                </Button>
              </Link>
            </div>
          </div>
        )}

        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Gestión de Registros</h2>
          <RegistrationStats stats={stats} />
          <RegistrationFilters
            initialFilters={{
              status: status !== "all" ? status : undefined,
              search,
              sortBy,
              sortDirection: sortDirection as "asc" | "desc",
              preferences,
            }}
          />

          <div className="mt-4">
            <RegistrationTable
              registrations={registrations || []}
              pagination={{
                totalItems: count || 0,
                totalPages,
                currentPage: page,
                pageSize: PAGE_SIZE,
              }}
            />
          </div>
        </div>
      </main>
    </div>
  )
}
