"use client";

import {
  Plus,
  FileText,
  Users,
  Upload,
  Settings,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";

interface QuickAction {
  title: string;
  description: string;
  icon: React.ElementType;
  iconColor: string;
  iconBgColor: string;
  href: string;
}

const quickActions: QuickAction[] = [
  {
    title: "إنشاء حدث جديد",
    description: "ابدأ بإنشاء استبيان أو نموذج",
    icon: Plus,
    iconColor: "text-blue-600",
    iconBgColor: "bg-blue-100",
    href: "/dashboard/events/new",
  },
  {
    title: "استخدام قالب",
    description: "اختر من القوالب الجاهزة",
    icon: FileText,
    iconColor: "text-purple-600",
    iconBgColor: "bg-purple-100",
    href: "/dashboard/events/templates",
  },
  {
    title: "إضافة جهات اتصال",
    description: "أضف أو استورد جهات اتصال",
    icon: Users,
    iconColor: "text-green-600",
    iconBgColor: "bg-green-100",
    href: "/dashboard/contacts",
  },
  {
    title: "استيراير بيانات",
    description: "استورد من Excel أو CSV",
    icon: Upload,
    iconColor: "text-orange-600",
    iconBgColor: "bg-orange-100",
    href: "/dashboard/contacts?action=import",
  },
  {
    title: "الإعدادات",
    description: "تخصيص حسابك",
    icon: Settings,
    iconColor: "text-gray-600",
    iconBgColor: "bg-gray-100",
    href: "/dashboard/settings",
  },
];

export default function QuickActions() {
  const router = useRouter();

  return (
    <Card className="p-6 shadow-sm border border-gray-200 hover:border-gray-300 transition-all duration-300">
      <h3 className="text-lg font-bold text-gray-900 mb-4">
        إجراءات سريعة
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {quickActions.map((action) => {
          const Icon = action.icon;

          return (
            <button
              key={action.href}
              onClick={() => router.push(action.href)}
              className="flex items-start gap-4 p-4 rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all duration-300 text-right group"
            >
              {/* الأيقونة */}
              <div
                className={`w-12 h-12 rounded-lg flex items-center justify-center ${action.iconBgColor} group-hover:scale-105 transition-transform duration-300`}
              >
                <Icon className={`w-6 h-6 ${action.iconColor}`} />
              </div>

              {/* المحتوى */}
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-gray-900 mb-1 group-hover:text-[#1a56db] transition-colors duration-300">
                  {action.title}
                </h4>
                <p className="text-sm text-gray-500">{action.description}</p>
                {/* الخط الزخرفي */}
                <div className={`h-0.5 w-0 group-hover:w-10 ${action.iconBgColor} rounded-full transition-all duration-500 mt-2`}></div>
              </div>
            </button>
          );
        })}
      </div>
    </Card>
  );
}

