// src/components/reports/MethodEffectivenessChart.tsx
"use client";

import { useApp } from "@/context/AppContext";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

interface Props {
  dateRange: { from: Date; to: Date };
}

export function MethodEffectivenessChart({ dateRange }: Props) {
  const { state } = useApp();

  const COLORS = ["#3b82f6", "#10b981", "#6366f1", "#f59e0b", "#ef4444"];

  // Calculate effectiveness for each method
  const data = state.communicationMethods
    .map((method) => {
      const methodComms = state.communications.filter(
        (comm) =>
          comm.methodId === method.id &&
          new Date(comm.date) >= dateRange.from &&
          new Date(comm.date) <= dateRange.to
      );

      const total = methodComms.length;
      const completed = methodComms.filter(
        (comm) => comm.status === "COMPLETED"
      ).length;

      return {
        name: method.name,
        value: total > 0 ? (completed / total) * 100 : 0,
      };
    })
    .sort((a, b) => b.value - a.value);

  // currently using manually added mock data
  const data1 = [
    { name: "Email", value: 85 },
    { name: "Phone Call", value: 75 },
    { name: "Meeting", value: 65 },
  ];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data1}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={80}
          label={({
            cx,
            cy,
            midAngle,
            innerRadius,
            outerRadius,
            value,
            index,
          }) => {
            const RADIAN = Math.PI / 180;
            const radius = 25 + innerRadius + (outerRadius - innerRadius);
            const x = cx + radius * Math.cos(-midAngle * RADIAN);
            const y = cy + radius * Math.sin(-midAngle * RADIAN);

            return (
              <text
                x={x}
                y={y}
                fill={COLORS[index % COLORS.length]}
                textAnchor={x > cx ? "start" : "end"}
                dominantBaseline="central"
              >
                {`${value.toFixed(1)}%`}
              </text>
            );
          }}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Legend
          layout="vertical"
          align="right"
          verticalAlign="middle"
          wrapperStyle={{
            paddingLeft: "10px",
          }}
        />
        <Tooltip
          formatter={(value: number) => [
            `${value.toFixed(1)}%`,
            "Effectiveness",
          ]}
          contentStyle={{
            backgroundColor: "white",
            border: "1px solid #e5e7eb",
            borderRadius: "0.375rem",
            padding: "0.5rem",
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
