"use client";

import { ComponentType } from "@/types/component";
import { Card } from "@/components/ui/card";
import {
  HelpCircle,
  Star,
  Upload,
  Image as ImageIcon,
  Video,
  Table,
  PenTool,
  Type,
  User,
  Monitor,
} from "lucide-react";

interface ComponentConfig {
  type: ComponentType;
  label: string;
  description: string;
  icon: any;
  color: string;
  bgColor: string;
}

const components: ComponentConfig[] = [
  {
    type: "question",
    label: "سؤال",
    description: "9 أنواع من الأسئلة",
    icon: HelpCircle,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    type: "rating",
    label: "تقييم",
    description: "نجوم، أرقام، إيموجي",
    icon: Star,
    color: "text-yellow-600",
    bgColor: "bg-yellow-50",
  },
  {
    type: "table",
    label: "جدول",
    description: "عادي أو بحسابات",
    icon: Table,
    color: "text-orange-600",
    bgColor: "bg-orange-50",
  },
  {
    type: "pdf_upload",
    label: "رفع PDF",
    description: "تحميل ملف PDF",
    icon: Upload,
    color: "text-red-600",
    bgColor: "bg-red-50",
  },
  {
    type: "image_upload",
    label: "رفع صورة",
    description: "تحميل صورة",
    icon: ImageIcon,
    color: "text-green-600",
    bgColor: "bg-green-50",
  },
  {
    type: "video_upload",
    label: "رفع فيديو",
    description: "تحميل فيديو",
    icon: Video,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
  },
  {
    type: "signature",
    label: "توقيع",
    description: "توقيع إلكتروني",
    icon: PenTool,
    color: "text-pink-600",
    bgColor: "bg-pink-50",
  },
  {
    type: "text",
    label: "نص",
    description: "نص غني بالتنسيق",
    icon: Type,
    color: "text-gray-600",
    bgColor: "bg-gray-50",
  },
  {
    type: "display",
    label: "عرض",
    description: "صورة، PDF، أو رابط",
    icon: Monitor,
    color: "text-indigo-600",
    bgColor: "bg-indigo-50",
  },
];

interface ComponentsPaletteProps {
  onAddComponent: (type: ComponentType) => void;
}

export default function ComponentsPalette({
  onAddComponent,
}: ComponentsPaletteProps) {
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-primary/10">
          <User className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-900">لوحة المكونات</h3>
          <p className="text-sm text-gray-600">
            اسحب المكون وأفلته في القسم
          </p>
        </div>
      </div>

      {/* Components Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-1 gap-2 lg:gap-3">
        {components.map((component) => {
          const Icon = component.icon;

          return (
            <Card
              key={component.type}
              className="p-3 lg:p-4 cursor-move hover:shadow-lg transition-all duration-200 hover:scale-105 active:scale-95"
              draggable
              onDragStart={(e) => {
                e.dataTransfer.setData("componentType", component.type);
                e.dataTransfer.effectAllowed = "copy";
              }}
              onClick={() => onAddComponent(component.type)}
            >
              <div className="flex flex-col lg:flex-row items-center lg:items-center gap-2 lg:gap-3">
                {/* Icon */}
                <div className={`p-2 rounded-lg ${component.bgColor}`}>
                  <Icon className={`w-5 h-5 ${component.color}`} />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0 text-center lg:text-right">
                  <h4 className="font-semibold text-gray-900 text-xs lg:text-sm">
                    {component.label}
                  </h4>
                  <p className="text-xs text-gray-500 hidden lg:block">
                    {component.description}
                  </p>
                </div>

                {/* Drag Indicator - Hidden on mobile */}
                <div className="hidden lg:flex flex-col gap-0.5">
                  <div className="w-1 h-1 rounded-full bg-gray-400"></div>
                  <div className="w-1 h-1 rounded-full bg-gray-400"></div>
                  <div className="w-1 h-1 rounded-full bg-gray-400"></div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Help Text */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-4">
        <p className="text-xs text-blue-800">
          💡 <strong>نصيحة:</strong> يمكنك سحب المكون أو النقر عليه لإضافته
          إلى القسم الحالي
        </p>
      </div>
    </div>
  );
}

