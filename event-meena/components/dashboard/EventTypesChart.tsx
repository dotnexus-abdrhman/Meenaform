"use client";

import { Card } from "@/components/ui/card";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

interface EventTypesChartProps {
  data: Array<{
    name: string;
    value: number;
    color: string;
  }>;
}

const COLORS = {
  survey: "#1a56db", // أزرق
  poll: "#10b981", // أخضر
  form: "#f59e0b", // برتقالي
  quiz: "#8b5cf6", // بنفسجي
};

export default function EventTypesChart({ data }: EventTypesChartProps) {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <Card className="p-6 shadow-sm border border-gray-200 hover:border-gray-300 transition-all duration-300">
      <h3 className="text-lg font-bold text-gray-900 mb-6">
        توزيع أنواع الأحداث
      </h3>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={(props: any) =>
              `${props.name}: ${(props.percent * 100).toFixed(0)}%`
            }
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: "#fff",
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
              fontFamily: "Cairo, sans-serif",
            }}
          />
          <Legend
            wrapperStyle={{
              fontFamily: "Cairo, sans-serif",
              fontSize: "14px",
            }}
          />
        </PieChart>
      </ResponsiveContainer>

      {/* إحصائيات إضافية */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="grid grid-cols-2 gap-4">
          {data.map((item) => (
            <div key={item.name} className="flex items-center gap-3">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color }}
              ></div>
              <div className="flex-1">
                <p className="text-sm text-gray-600">{item.name}</p>
                <p className="text-lg font-bold text-gray-900">{item.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

