"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell } from "recharts"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

type EmailStatsDashboardProps = {
  stats: {
    total: number
    opened: number
    clicked: number
    failed: number
    openRate: number
    clickRate: number
    templateStats: Array<{
      template_type: string
      count: number
      opened: number
      clicked: number
    }>
    dailyStats: Array<{
      date: string
      sent: number
      opened: number
      clicked: number
      failed: number
    }>
  }
}

const COLORS = ["#8b5cf6", "#ec4899", "#3b82f6", "#10b981", "#f59e0b", "#ef4444"]
const STATUS_COLORS = {
  sent: "#8b5cf6",
  opened: "#10b981",
  clicked: "#3b82f6",
  failed: "#ef4444",
}

export function EmailStatsDashboard({ stats }: EmailStatsDashboardProps) {
  // Preparar datos para el gráfico circular de estado
  const statusData = [
    { name: "Enviados", value: stats.total - stats.opened - stats.clicked - stats.failed },
    { name: "Abiertos", value: stats.opened },
    { name: "Clics", value: stats.clicked },
    { name: "Fallidos", value: stats.failed },
  ].filter((item) => item.value > 0)

  // Preparar datos para el gráfico de plantillas
  const templateData = stats.templateStats.map((template) => ({
    name:
      template.template_type === "approval"
        ? "Aprobación"
        : template.template_type === "rejection"
          ? "Rechazo"
          : template.template_type === "welcome"
            ? "Bienvenida"
            : template.template_type,
    total: template.count,
    abiertos: template.opened,
    clics: template.clicked,
    "tasa de apertura": template.count > 0 ? Math.round((template.opened / template.count) * 100) : 0,
  }))

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Total de Correos</CardTitle>
            <CardDescription>Correos enviados en total</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Tasa de Apertura</CardTitle>
            <CardDescription>Porcentaje de correos abiertos</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">{stats.openRate.toFixed(1)}%</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Tasa de Clics</CardTitle>
            <CardDescription>Porcentaje de correos con clics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">{stats.clickRate.toFixed(1)}%</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Correos Fallidos</CardTitle>
            <CardDescription>Correos que no se pudieron enviar</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-600">{stats.failed}</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="daily" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="daily">Actividad Diaria</TabsTrigger>
          <TabsTrigger value="status">Estado de Correos</TabsTrigger>
          <TabsTrigger value="templates">Por Plantilla</TabsTrigger>
        </TabsList>

        <TabsContent value="daily">
          <Card>
            <CardHeader>
              <CardTitle>Actividad Diaria</CardTitle>
              <CardDescription>Correos enviados en los últimos 7 días</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats.dailyStats}>
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="sent" name="Enviados" fill={STATUS_COLORS.sent} />
                  <Bar dataKey="opened" name="Abiertos" fill={STATUS_COLORS.opened} />
                  <Bar dataKey="clicked" name="Clics" fill={STATUS_COLORS.clicked} />
                  <Bar dataKey="failed" name="Fallidos" fill={STATUS_COLORS.failed} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="status">
          <Card>
            <CardHeader>
              <CardTitle>Estado de Correos</CardTitle>
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
                    label={({ name, value, percent }) => `${name}: ${value} (${(percent * 100).toFixed(0)}%)`}
                  >
                    {statusData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={
                          entry.name === "Enviados"
                            ? STATUS_COLORS.sent
                            : entry.name === "Abiertos"
                              ? STATUS_COLORS.opened
                              : entry.name === "Clics"
                                ? STATUS_COLORS.clicked
                                : STATUS_COLORS.failed
                        }
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates">
          <Card>
            <CardHeader>
              <CardTitle>Rendimiento por Plantilla</CardTitle>
              <CardDescription>Estadísticas por tipo de plantilla</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={templateData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="total" name="Total" fill={COLORS[0]} />
                  <Bar dataKey="abiertos" name="Abiertos" fill={COLORS[3]} />
                  <Bar dataKey="clics" name="Clics" fill={COLORS[2]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
