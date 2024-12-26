// src/components/reports/CommunicationTrendsChart.tsx
"use client";

import { useApp } from "@/context/AppContext";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { format, eachDayOfInterval, isSameDay } from "date-fns";

interface Props {
  dateRange: { from: Date; to: Date };
}

export function CommunicationTrendsChart({ dateRange }: Props) {
  const { state } = useApp();

  // Generate array of dates in range
  const dates = eachDayOfInterval({ start: dateRange.from, end: dateRange.to });

  // Create data points for each date
  const data = dates.map((date) => {
    const dayComms = state.communications.filter((comm) =>
      isSameDay(new Date(comm.date), date)
    );

    return {
      date: format(date, "MMM d"),
      total: dayComms.length,
      completed: dayComms.filter((comm) => comm.status === "COMPLETED").length,
      scheduled: dayComms.filter((comm) => comm.status === "SCHEDULED").length,
    };
  });

  // currently using manually added mock data
  const data1 = [
    { date: "Oct 1", total: 50, completed: 30, scheduled: 20 },
    { date: "Oct 2", total: 60, completed: 40, scheduled: 20 },
    { date: "Oct 3", total: 70, completed: 50, scheduled: 20 },
    { date: "Oct 4", total: 80, completed: 60, scheduled: 20 },
    { date: "Oct 5", total: 90, completed: 70, scheduled: 20 },
    { date: "Oct 6", total: 100, completed: 80, scheduled: 20 },
    { date: "Oct 7", total: 110, completed: 90, scheduled: 20 },
  ];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data1}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="date"
          tick={{ fontSize: 12 }}
          interval={Math.ceil(data.length / 10)}
        />
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
        <Line
          type="monotone"
          dataKey="total"
          name="Total Communications"
          stroke="#3b82f6"
          strokeWidth={2}
          dot={false}
        />
        <Line
          type="monotone"
          dataKey="completed"
          name="Completed"
          stroke="#10b981"
          strokeWidth={2}
          dot={false}
        />
        <Line
          type="monotone"
          dataKey="scheduled"
          name="Scheduled"
          stroke="#f59e0b"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
