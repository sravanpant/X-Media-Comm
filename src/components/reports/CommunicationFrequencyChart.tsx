// src/components/reports/CommunicationFrequencyChart.tsx
"use client";

import { useApp } from "@/context/AppContext";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface Props {
  dateRange: { from: Date; to: Date };
}

export function CommunicationFrequencyChart({ dateRange }: Props) {
  const { state } = useApp();

  // Filter communications by date range
  const filteredCommunications = state.communications.filter((comm) => {
    const commDate = new Date(comm.date);
    return commDate >= dateRange.from && commDate <= dateRange.to;
  });

  // Count communications by method
  const data = state.communicationMethods.map((method) => ({ // eslint-disable-line
    name: method.name,
    count: filteredCommunications.filter((comm) => comm.methodId === method.id)
      .length,
  }));

  // currently using manually added mock data
  const data1 = state.communicationMethods.map((method) => ({
    name: method.name,
    count: method.count,
  }));

  const colors = [
    "#3b82f6", // blue
    "#10b981", // green
    "#6366f1", // indigo
    "#f59e0b", // amber
    "#ef4444", // red
  ];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data1}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" tick={{ fontSize: 12 }} interval={0} />
        <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
        <Tooltip
          contentStyle={{
            backgroundColor: "white",
            border: "1px solid #e5e7eb",
            borderRadius: "0.375rem",
            padding: "0.5rem",
          }}
        />
        <Legend />
        <Bar
          dataKey="count"
          name="Number of Communications"
          fill={colors[0]}
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
