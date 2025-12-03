"use client";

import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  iconColor: string;
  iconBgColor: string;
}

export default function StatsCard({
  title,
  value,
  icon: Icon,
  iconColor,
  iconBgColor,
}: StatsCardProps) {
  return (
    <Card className="group p-6 shadow-sm hover:shadow-md border border-gray-200 hover:border-gray-300 transition-all duration-300">
      <div className="flex items-start justify-between">
        {/* المحتوى */}
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-2">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
        </div>

        {/* الأيقونة */}
        <div
          className={`w-14 h-14 rounded-xl flex items-center justify-center ${iconBgColor} group-hover:scale-105 transition-transform duration-300`}
        >
          <Icon className={`w-7 h-7 ${iconColor}`} />
        </div>
      </div>

      {/* الخط الزخرفي */}
      <div className="mt-4 pt-3 border-t border-gray-100">
        <div className={`h-0.5 w-0 group-hover:w-12 ${iconBgColor} rounded-full transition-all duration-500`}></div>
      </div>
    </Card>
  );
}

