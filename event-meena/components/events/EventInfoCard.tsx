"use client";

import { Event } from "@/types/event";
import { Card } from "@/components/ui/card";
import {
  Calendar,
  Clock,
  User,
  FileText,
  Settings,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { format } from "date-fns";
import { ar } from "date-fns/locale";

interface EventInfoCardProps {
  event: Event;
}

export default function EventInfoCard({ event }: EventInfoCardProps) {
  const infoItems = [
    {
      icon: Calendar,
      label: "تاريخ الإنشاء",
      value: format(new Date(event.createdAt), "d MMMM yyyy", { locale: ar }),
    },
    {
      icon: Clock,
      label: "آخر تحديث",
      value: format(new Date(event.updatedAt), "d MMMM yyyy", { locale: ar }),
    },
    ...(event.startDate
      ? [
          {
            icon: Calendar,
            label: "تاريخ البداية",
            value: format(new Date(event.startDate), "d MMMM yyyy", {
              locale: ar,
            }),
          },
        ]
      : []),
    ...(event.endDate
      ? [
          {
            icon: Calendar,
            label: "تاريخ النهاية",
            value: format(new Date(event.endDate), "d MMMM yyyy", {
              locale: ar,
            }),
          },
        ]
      : []),
    {
      icon: FileText,
      label: "عدد الأقسام",
      value: `${event.sections?.length || 0} قسم`,
    },
    {
      icon: Settings,
      label: "يتطلب تسجيل دخول",
      value: event.settings.requireAuth ? "نعم" : "لا",
      icon2: event.settings.requireAuth ? CheckCircle : XCircle,
      color: event.settings.requireAuth ? "text-green-600" : "text-gray-400",
    },
    {
      icon: Settings,
      label: "السماح بتعديل الردود",
      value: event.settings.allowEdit ? "نعم" : "لا",
      icon2: event.settings.allowEdit ? CheckCircle : XCircle,
      color: event.settings.allowEdit ? "text-green-600" : "text-gray-400",
    },
    {
      icon: Settings,
      label: "عرض النتائج للمشاركين",
      value: event.settings.showResults ? "نعم" : "لا",
      icon2: event.settings.showResults ? CheckCircle : XCircle,
      color: event.settings.showResults ? "text-green-600" : "text-gray-400",
    },
  ];

  return (
    <Card className="p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-6">معلومات الحدث</h3>

      <div className="space-y-4">
        {infoItems.map((item, index) => {
          const Icon = item.icon;
          const Icon2 = item.icon2;

          return (
            <div
              key={index}
              className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gray-50">
                  <Icon className="w-5 h-5 text-gray-600" />
                </div>
                <span className="text-sm text-gray-600">{item.label}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-gray-900">
                  {item.value}
                </span>
                {Icon2 && (
                  <Icon2 className={`w-4 h-4 ${item.color || "text-gray-400"}`} />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

