"use client";

import { Card } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { format, subDays } from "date-fns";
import { ar } from "date-fns/locale";

interface EventResponsesChartProps {
  eventId: string;
}

export default function EventResponsesChart({
  eventId,
}: EventResponsesChartProps) {
  // Generate mock data for last 7 days
  const generateChartData = () => {
    const data = [];
    for (let i = 6; i >= 0; i--) {
      const date = subDays(new Date(), i);
      data.push({
        date: format(date, "d MMM", { locale: ar }),
        responses: Math.floor(Math.random() * 50) + 10,
      });
    }
    return data;
  };

  const chartData = generateChartData();

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-blue-50">
            <TrendingUp className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">الردود اليومية</h3>
            <p className="text-sm text-gray-500">آخر 7 أيام</p>
          </div>
        </div>
      </div>

      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              dataKey="date"
              stroke="#9ca3af"
              style={{ fontSize: "12px" }}
            />
            <YAxis stroke="#9ca3af" style={{ fontSize: "12px" }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                padding: "8px 12px",
              }}
              labelStyle={{ color: "#374151", fontWeight: "600" }}
              itemStyle={{ color: "#1a56db" }}
            />
            <Line
              type="monotone"
              dataKey="responses"
              stroke="#1a56db"
              strokeWidth={3}
              dot={{ fill: "#1a56db", r: 4 }}
              activeDot={{ r: 6 }}
              name="الردود"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

