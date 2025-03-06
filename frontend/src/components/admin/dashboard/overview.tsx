"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

const data = [
  {
    name: "Mon",
    total: 1420,
  },
  {
    name: "Tue",
    total: 1530,
  },
  {
    name: "Wed",
    total: 1700,
  },
  {
    name: "Thu",
    total: 1290,
  },
  {
    name: "Fri",
    total: 1890,
  },
  {
    name: "Sat",
    total: 2390,
  },
  {
    name: "Sun",
    total: 3490,
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
        <Bar dataKey="total" fill="currentColor" radius={[4, 4, 0, 0]} className="fill-primary" />
      </BarChart>
    </ResponsiveContainer>
  )
}

