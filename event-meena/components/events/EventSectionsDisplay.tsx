"use client";

import { Event } from "@/types/event";
import { Card } from "@/components/ui/card";
import {
  Layers,
  FileText,
  Star,
  Upload,
  Image as ImageIcon,
  Video,
  Link2,
  Table,
  PenTool,
  Type,
  HelpCircle,
} from "lucide-react";

interface EventSectionsDisplayProps {
  event: Event;
}

const componentTypeConfig: Record<string, {
  label: string;
  icon: any;
  color: string;
  bgColor: string;
}> = {
  question: {
    label: "سؤال",
    icon: HelpCircle,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  rating: {
    label: "تقييم",
    icon: Star,
    color: "text-yellow-600",
    bgColor: "bg-yellow-50",
  },
  pdf_upload: {
    label: "رفع PDF",
    icon: Upload,
    color: "text-red-600",
    bgColor: "bg-red-50",
  },
  image_upload: {
    label: "رفع صورة",
    icon: ImageIcon,
    color: "text-green-600",
    bgColor: "bg-green-50",
  },
  video_upload: {
    label: "رفع فيديو",
    icon: Video,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
  },
  link: {
    label: "رابط",
    icon: Link2,
    color: "text-cyan-600",
    bgColor: "bg-cyan-50",
  },
  table: {
    label: "جدول",
    icon: Table,
    color: "text-orange-600",
    bgColor: "bg-orange-50",
  },
  signature: {
    label: "توقيع",
    icon: PenTool,
    color: "text-pink-600",
    bgColor: "bg-pink-50",
  },
  text: {
    label: "نص",
    icon: Type,
    color: "text-gray-600",
    bgColor: "bg-gray-50",
  },
  display: {
    label: "عرض",
    icon: FileText,
    color: "text-indigo-600",
    bgColor: "bg-indigo-50",
  },
  // Question subtypes (for templates) - all use blue color
  short_text: {
    label: "نص قصير",
    icon: HelpCircle,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  long_text: {
    label: "نص طويل",
    icon: HelpCircle,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  single_choice: {
    label: "اختيار من متعدد",
    icon: HelpCircle,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  multiple_choice: {
    label: "اختيار متعدد",
    icon: HelpCircle,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  dropdown: {
    label: "قائمة منسدلة",
    icon: HelpCircle,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  yes_no: {
    label: "نعم/لا",
    icon: HelpCircle,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  linear_scale: {
    label: "مقياس خطي",
    icon: HelpCircle,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  choice_grid: {
    label: "شبكة اختيارات",
    icon: HelpCircle,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  number: {
    label: "رقم",
    icon: HelpCircle,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  email: {
    label: "بريد إلكتروني",
    icon: HelpCircle,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  phone: {
    label: "رقم جوال",
    icon: HelpCircle,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  date: {
    label: "تاريخ",
    icon: HelpCircle,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  time: {
    label: "وقت",
    icon: HelpCircle,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
};

export default function EventSectionsDisplay({
  event,
}: EventSectionsDisplayProps) {
  if (!event.sections || event.sections.length === 0) {
    return (
      <Card className="p-8 text-center">
        <div className="inline-flex p-4 rounded-full bg-gray-100 mb-4">
          <Layers className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          لا توجد أقسام بعد
        </h3>
        <p className="text-sm text-gray-500">
          ابدأ بإضافة أقسام ومكونات إلى الحدث
        </p>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-primary/10">
          <Layers className="w-5 h-5 text-primary" />
        </div>
        <h3 className="text-xl font-bold text-gray-900">
          أقسام الحدث ({event.sections.length})
        </h3>
      </div>

      <div className="space-y-4">
        {event.sections.map((section, index) => (
          <div
            key={section.id}
            className="p-4 rounded-lg border border-gray-200 hover:border-primary/30 hover:shadow-md transition-all"
          >
            {/* Section Header */}
            <div className="flex items-start gap-3 mb-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-bold">
                {index + 1}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-lg font-semibold text-gray-900 mb-1">
                  {section.title}
                </h4>
                {section.description && (
                  <p className="text-sm text-gray-600">{section.description}</p>
                )}
              </div>
            </div>

            {/* Components */}
            {section.components && section.components.length > 0 && (
              <div className="mr-11 space-y-2">
                <p className="text-xs font-semibold text-gray-500 uppercase mb-2">
                  المكونات ({section.components.length})
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {section.components.map((component) => {
                    // Safe fallback for unknown component types
                    const config = componentTypeConfig[component.type] || {
                      label: "مكون",
                      icon: HelpCircle,
                      color: "text-gray-600",
                      bgColor: "bg-gray-50",
                    };
                    const Icon = config.icon;

                    return (
                      <div
                        key={component.id}
                        className={`flex items-center gap-2 p-2 rounded-lg ${config.bgColor}`}
                      >
                        <Icon className={`w-4 h-4 ${config.color}`} />
                        <span className={`text-sm font-medium ${config.color}`}>
                          {config.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* No Components */}
            {(!section.components || section.components.length === 0) && (
              <div className="mr-11 text-sm text-gray-400 italic">
                لا توجد مكونات في هذا القسم
              </div>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
}

