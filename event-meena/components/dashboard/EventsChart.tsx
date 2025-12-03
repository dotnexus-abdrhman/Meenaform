"use client";

import { Card } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface EventsChartProps {
  data: Array<{
    date: string;
    events: number;
    responses: number;
  }>;
}

export default function EventsChart({ data }: EventsChartProps) {
  return (
    <Card className="p-6 shadow-sm border border-gray-200 hover:border-gray-300 transition-all duration-300">
      <h3 className="text-lg font-bold text-gray-900 mb-6">
        إحصائيات الأحداث (آخر 7 أيام)
      </h3>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            dataKey="date"
            stroke="#6b7280"
            style={{ fontSize: "12px", fontFamily: "Cairo, sans-serif" }}
          />
          <YAxis
            stroke="#6b7280"
            style={{ fontSize: "12px", fontFamily: "Cairo, sans-serif" }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#fff",
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
              fontFamily: "Cairo, sans-serif",
            }}
            labelStyle={{ color: "#111827", fontWeight: "600" }}
          />
          <Legend
            wrapperStyle={{
              fontFamily: "Cairo, sans-serif",
              fontSize: "14px",
            }}
          />
          <Line
            type="monotone"
            dataKey="events"
            stroke="#1a56db"
            strokeWidth={3}
            name="الأحداث"
            dot={{ fill: "#1a56db", r: 4 }}
            activeDot={{ r: 6 }}
          />
          <Line
            type="monotone"
            dataKey="responses"
            stroke="#10b981"
            strokeWidth={3}
            name="الردود"
            dot={{ fill: "#10b981", r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
}

