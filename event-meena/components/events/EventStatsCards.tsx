"use client";

import { Event } from "@/types/event";
import { Card } from "@/components/ui/card";
import { Users, Eye, CheckCircle, Clock, TrendingUp, TrendingDown } from "lucide-react";

interface EventStatsCardsProps {
  event: Event;
}

export default function EventStatsCards({ event }: EventStatsCardsProps) {
  const stats = [
    {
      id: "responses",
      label: "إجمالي الردود",
      value: event.stats.totalResponses,
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      trend: "+12%",
      trendUp: true,
    },
    {
      id: "views",
      label: "المشاهدات",
      value: event.stats.views || 0,
      icon: Eye,
      color: "text-green-600",
      bgColor: "bg-green-50",
      trend: "+8%",
      trendUp: true,
    },
    {
      id: "completion",
      label: "نسبة الإكمال",
      value: `${event.stats.completionRate}%`,
      icon: CheckCircle,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      trend: "+5%",
      trendUp: true,
    },
    {
      id: "avgTime",
      label: "متوسط الوقت",
      value: event.stats.averageTime,
      icon: Clock,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      trend: "-2 دقيقة",
      trendUp: false,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => {
        const Icon = stat.icon;
        const TrendIcon = stat.trendUp ? TrendingUp : TrendingDown;

        return (
          <Card
            key={stat.id}
            className="p-6 hover:shadow-lg transition-all duration-300 hover:border-primary/20"
          >
            {/* Icon & Label */}
            <div className="flex items-start justify-between mb-4">
              <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                <Icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div
                className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${
                  stat.trendUp
                    ? "bg-green-50 text-green-600"
                    : "bg-red-50 text-red-600"
                }`}
              >
                <TrendIcon className="w-3 h-3" />
                {stat.trend}
              </div>
            </div>

            {/* Value */}
            <div className="mb-1">
              <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
            </div>

            {/* Label */}
            <p className="text-sm text-gray-600">{stat.label}</p>
          </Card>
        );
      })}
    </div>
  );
}

