import { createServerSupabaseClient } from "@/lib/supabase"
import { AdminHeader } from "../components/admin-header"
import { EmailStatsTable } from "./components/email-stats-table"
import { EmailStatsDashboard } from "./components/email-stats-dashboard"

export type EmailStat = {
  id: string
  email_id: string
  recipient: string
  subject: string
  template_type: string
  status: string
  sent_at: string
  opened_at: string | null
  clicked_at: string | null
  registration_id: string | null
  metadata: any
  created_at: string
  updated_at: string
}

export type EmailStatsFiltersType = {
  status?: string
  template_type?: string
  search?: string
  sortBy?: string
  sortDirection?: "asc" | "desc"
  timeframe?: "today" | "week" | "month" | "all"
}

const PAGE_SIZE = 10

export default async function EmailStatsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const supabase = createServerSupabaseClient()

  // Get URL parameters
  const status = searchParams.status as string | undefined
  const templateType = searchParams.template_type as string | undefined
  const search = searchParams.search as string | undefined
  const sortBy = (searchParams.sortBy as string) || "sent_at"
  const sortDirection = (searchParams.sortDirection as "asc" | "desc") || "desc"
  const page = Number.parseInt((searchParams.page as string) || "1", 10)
  const timeframe = (searchParams.timeframe as "today" | "week" | "month" | "all" | undefined) || "all"

  // Calculate start and end range for pagination
  const startIndex = (page - 1) * PAGE_SIZE
  const endIndex = startIndex + PAGE_SIZE - 1

  // Fetch email stats with filters
  let query = supabase
    .from("email_stats")
    .select("*", { count: "exact" })
    .order(sortBy, { ascending: sortDirection === "asc" })

  if (status) {
    query = query.eq("status", status)
  }

  if (templateType) {
    query = query.eq("template_type", templateType)
  }

  if (search) {
    query = query.or(`recipient.ilike.%${search}%,subject.ilike.%${search}%`)
  }

  // Apply timeframe filter
  if (timeframe && timeframe !== "all") {
    const now = new Date()
    let startDate: Date

    switch (timeframe) {
      case "today":
        startDate = new Date(now.setHours(0, 0, 0, 0))
        break
      case "week":
        startDate = new Date(now.setDate(now.getDate() - 7))
        break
      case "month":
        startDate = new Date(now.setMonth(now.getMonth() - 1))
        break
      default:
        startDate = new Date(0) // Epoch time for "all"
    }

    query = query.gte("sent_at", startDate.toISOString())
  }

  const { data: emailStats, error, count } = await query.range(startIndex, endIndex)

  if (error) {
    console.error("Error fetching email stats:", error)
    throw new Error("No se pudieron cargar las estadísticas de correos")
  }

  // Fetch summary stats
  const { data: totalSent } = await supabase.from("email_stats").select("id", { count: "exact" }).eq("status", "sent")

  const { data: totalOpened } = await supabase
    .from("email_stats")
    .select("id", { count: "exact" })
    .eq("status", "opened")

  const { data: totalClicked } = await supabase
    .from("email_stats")
    .select("id", { count: "exact" })
    .eq("status", "clicked")

  const { data: totalFailed } = await supabase
    .from("email_stats")
    .select("id", { count: "exact" })
    .eq("status", "failed")

  // Calculate open and click rates
  const totalEmails = totalSent?.length || 0
  const openRate = totalEmails > 0 ? ((totalOpened?.length || 0) / totalEmails) * 100 : 0
  const clickRate = totalEmails > 0 ? ((totalClicked?.length || 0) / totalEmails) * 100 : 0

  // Fetch stats by template type using our new function
  const { data: templateStats, error: templateStatsError } = await supabase.rpc("get_email_stats_by_template")

  if (templateStatsError) {
    console.error("Error fetching template stats:", templateStatsError)
  }

  // Fetch stats by day for the last 7 days
  const sevenDaysAgo = new Date()
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
  const sevenDaysAgoStr = sevenDaysAgo.toISOString()

  const { data: dailyStats } = await supabase
    .from("email_stats")
    .select("sent_at, status")
    .gte("sent_at", sevenDaysAgoStr)
    .order("sent_at", { ascending: true })

  // Process daily stats
  const dailyStatsMap = new Map()
  if (dailyStats) {
    // Initialize the last 7 days
    for (let i = 0; i < 7; i++) {
      const date = new Date()
      date.setDate(date.getDate() - i)
      const dateStr = date.toISOString().split("T")[0]
      dailyStatsMap.set(dateStr, { date: dateStr, sent: 0, opened: 0, clicked: 0, failed: 0 })
    }

    // Count emails by day and status
    dailyStats.forEach((stat) => {
      const dateStr = new Date(stat.sent_at).toISOString().split("T")[0]
      if (!dailyStatsMap.has(dateStr)) {
        dailyStatsMap.set(dateStr, { date: dateStr, sent: 0, opened: 0, clicked: 0, failed: 0 })
      }
      const dayStat = dailyStatsMap.get(dateStr)

      switch (stat.status) {
        case "sent":
          dayStat.sent++
          break
        case "opened":
          dayStat.opened++
          break
        case "clicked":
          dayStat.clicked++
          break
        case "failed":
          dayStat.failed++
          break
      }
    })
  }

  // Convert map to array and sort by date
  const processedDailyStats = Array.from(dailyStatsMap.values()).sort((a, b) => a.date.localeCompare(b.date))

  const stats = {
    total: totalEmails,
    opened: totalOpened?.length || 0,
    clicked: totalClicked?.length || 0,
    failed: totalFailed?.length || 0,
    openRate,
    clickRate,
    templateStats: templateStats || [],
    dailyStats: processedDailyStats,
  }

  const totalPages = Math.ceil(Number(count) || 0 / PAGE_SIZE)

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminHeader />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Estadísticas de Correos</h1>

        <EmailStatsDashboard stats={stats} />

        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Historial de Correos</h2>

          <EmailStatsTable
            emailStats={emailStats || []}
            pagination={{
              totalItems: count || 0,
              totalPages,
              currentPage: page,
              pageSize: PAGE_SIZE,
            }}
            initialFilters={{
              status,
              template_type: templateType,
              search,
              sortBy,
              sortDirection: sortDirection as "asc" | "desc",
              timeframe,
            }}
          />
        </div>
      </main>
    </div>
  )
}
