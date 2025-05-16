"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

const data = [
  {
    name: "Ene",
    total: 580,
  },
  {
    name: "Feb",
    total: 690,
  },
  {
    name: "Mar",
    total: 1100,
  },
  {
    name: "Abr",
    total: 1200,
  },
  {
    name: "May",
    total: 900,
  },
  {
    name: "Jun",
    total: 1700,
  },
  {
    name: "Jul",
    total: 1400,
  },
  {
    name: "Ago",
    total: 1100,
  },
  {
    name: "Sep",
    total: 1600,
  },
  {
    name: "Oct",
    total: 1200,
  },
  {
    name: "Nov",
    total: 1400,
  },
  {
    name: "Dic",
    total: 2000,
  },
]

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
        />
        <Tooltip formatter={(value) => [`$${value}`, "Ventas"]} labelFormatter={(label) => `Mes: ${label}`} />
        <Bar dataKey="total" fill="#9333ea" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
