"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell } from "recharts"

type DailyStats = {
  date: string
  total: number
  pending: number
  approved: number
  rejected: number
}

type TopPreference = {
  name: string
  count: number
}

type AdminDashboardProps = {
  stats: {
    total: number
    pending: number
    approved: number
    rejected: number
    dailyStats: DailyStats[]
    topPreferences: TopPreference[]
  }
}

const COLORS = ["#8b5cf6", "#ec4899", "#3b82f6", "#10b981", "#f59e0b"]

export function AdminDashboard({ stats }: AdminDashboardProps) {
  // Formatear fechas para el gráfico
  const formattedDailyStats = stats.dailyStats.map((stat) => ({
    ...stat,
    date: new Date(stat.date).toLocaleDateString("es-ES", { day: "2-digit", month: "2-digit" }),
  }))

  // Calcular porcentajes para el gráfico circular
  const totalRegistrations = stats.total || 1 // Evitar división por cero
  const statusData = [
    { name: "Pendientes", value: stats.pending, percentage: Math.round((stats.pending / totalRegistrations) * 100) },
    { name: "Aprobados", value: stats.approved, percentage: Math.round((stats.approved / totalRegistrations) * 100) },
    { name: "Rechazados", value: stats.rejected, percentage: Math.round((stats.rejected / totalRegistrations) * 100) },
  ]

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Registros Totales</CardTitle>
            <CardDescription>Total de registros en el sistema</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Tasa de Aprobación</CardTitle>
            <CardDescription>Porcentaje de registros aprobados</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">
              {totalRegistrations > 0 ? Math.round((stats.approved / totalRegistrations) * 100) : 0}%
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Pendientes de Revisión</CardTitle>
            <CardDescription>Registros que requieren atención</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-yellow-600">{stats.pending}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Registros por Día</CardTitle>
            <CardDescription>Últimos 7 días</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={formattedDailyStats}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="pending" name="Pendientes" fill="#f59e0b" />
                <Bar dataKey="approved" name="Aprobados" fill="#10b981" />
                <Bar dataKey="rejected" name="Rechazados" fill="#ef4444" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Estado de Registros</CardTitle>
            <CardDescription>Distribución por estado</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percentage }) => `${name}: ${percentage}%`}
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 0 ? "#f59e0b" : index === 1 ? "#10b981" : "#ef4444"} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Preferencias Más Populares</CardTitle>
          <CardDescription>Top 5 categorías preferidas</CardDescription>
        </CardHeader>
        <CardContent className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart layout="vertical" data={stats.topPreferences} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <XAxis type="number" />
              <YAxis type="category" dataKey="name" width={150} />
              <Tooltip />
              <Bar dataKey="count" fill="#8b5cf6">
                {stats.topPreferences.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
