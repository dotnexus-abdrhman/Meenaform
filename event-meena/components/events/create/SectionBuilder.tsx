"use client";

import { useState } from "react";
import { Section } from "@/types/section";
import { Component, ComponentType } from "@/types/component";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { getComponentDisplayTitle, getComponentDisplaySubtitle } from "@/lib/helpers/componentDisplay";
import {
  HelpCircle,
  Star,
  Upload,
  Image as ImageIcon,
  Video,
  Link2,
  Table,
  PenTool,
  Type,
  Trash2,
  GripVertical,
  Settings,
  Monitor,
} from "lucide-react";

// Map all component types including question subtypes
const componentIcons: Record<string, any> = {
  question: HelpCircle,
  rating: Star,
  table: Table,
  pdf_upload: Upload,
  image_upload: ImageIcon,
  video_upload: Video,
  link: Link2,
  signature: PenTool,
  text: Type,
  display: Monitor,
  // Question subtypes (for templates)
  short_text: HelpCircle,
  long_text: HelpCircle,
  single_choice: HelpCircle,
  multiple_choice: HelpCircle,
  dropdown: HelpCircle,
  yes_no: HelpCircle,
  linear_scale: HelpCircle,
  choice_grid: HelpCircle,
  number: HelpCircle,
  email: HelpCircle,
  phone: HelpCircle,
  date: HelpCircle,
  time: HelpCircle,
};

const componentColors: Record<string, { text: string; bg: string }> = {
  question: { text: "text-blue-600", bg: "bg-blue-50" },
  rating: { text: "text-yellow-600", bg: "bg-yellow-50" },
  table: { text: "text-orange-600", bg: "bg-orange-50" },
  pdf_upload: { text: "text-red-600", bg: "bg-red-50" },
  image_upload: { text: "text-green-600", bg: "bg-green-50" },
  video_upload: { text: "text-purple-600", bg: "bg-purple-50" },
  link: { text: "text-cyan-600", bg: "bg-cyan-50" },
  signature: { text: "text-pink-600", bg: "bg-pink-50" },
  text: { text: "text-gray-600", bg: "bg-gray-50" },
  display: { text: "text-indigo-600", bg: "bg-indigo-50" },
  // Question subtypes (for templates) - all use blue color
  short_text: { text: "text-blue-600", bg: "bg-blue-50" },
  long_text: { text: "text-blue-600", bg: "bg-blue-50" },
  single_choice: { text: "text-blue-600", bg: "bg-blue-50" },
  multiple_choice: { text: "text-blue-600", bg: "bg-blue-50" },
  dropdown: { text: "text-blue-600", bg: "bg-blue-50" },
  yes_no: { text: "text-blue-600", bg: "bg-blue-50" },
  linear_scale: { text: "text-blue-600", bg: "bg-blue-50" },
  choice_grid: { text: "text-blue-600", bg: "bg-blue-50" },
  number: { text: "text-blue-600", bg: "bg-blue-50" },
  email: { text: "text-blue-600", bg: "bg-blue-50" },
  phone: { text: "text-blue-600", bg: "bg-blue-50" },
  date: { text: "text-blue-600", bg: "bg-blue-50" },
  time: { text: "text-blue-600", bg: "bg-blue-50" },
};

const componentLabels: Record<string, string> = {
  question: "سؤال",
  rating: "تقييم",
  table: "جدول",
  pdf_upload: "رفع PDF",
  image_upload: "رفع صورة",
  video_upload: "رفع فيديو",
  link: "رابط",
  signature: "توقيع",
  text: "نص",
  display: "عرض",
  // Question subtypes (for templates)
  short_text: "نص قصير",
  long_text: "نص طويل",
  single_choice: "اختيار من متعدد",
  multiple_choice: "اختيار متعدد",
  dropdown: "قائمة منسدلة",
  yes_no: "نعم/لا",
  linear_scale: "مقياس خطي",
  choice_grid: "شبكة اختيارات",
  number: "رقم",
  email: "بريد إلكتروني",
  phone: "رقم جوال",
  date: "تاريخ",
  time: "وقت",
};

interface SectionBuilderProps {
  section: Section;
  sectionIndex: number;
  onUpdateTitle: (title: string) => void;
  onUpdateDescription: (description: string) => void;
  onRemoveComponent: (componentId: string) => void;
  onEditComponent: (component: Component) => void;
  onDrop: (e: React.DragEvent) => void;
}

export default function SectionBuilder({
  section,
  sectionIndex,
  onUpdateTitle,
  onUpdateDescription,
  onRemoveComponent,
  onEditComponent,
  onDrop,
}: SectionBuilderProps) {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    onDrop(e);
  };

  return (
    <Card className="p-6">
      {/* Section Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white font-bold">
            {sectionIndex + 1}
          </div>
          <h3 className="text-xl font-bold text-gray-900">
            القسم {sectionIndex + 1}
          </h3>
        </div>

        {/* Section Title */}
        <div className="space-y-2 mb-4">
          <Input
            value={section.title}
            onChange={(e) => onUpdateTitle(e.target.value)}
            placeholder="عنوان القسم"
            className="text-lg font-semibold"
          />
        </div>

        {/* Section Description */}
        <div className="space-y-2">
          <Textarea
            value={section.description}
            onChange={(e) => onUpdateDescription(e.target.value)}
            placeholder="وصف القسم (اختياري)"
            className="min-h-[80px]"
          />
        </div>
      </div>

      {/* Components List */}
      <div className="space-y-3 mb-4">
        {section.components.length > 0 ? (
          section.components.map((component, index) => {
            // Safe fallback for unknown component types
            const Icon = componentIcons[component.type] || HelpCircle;
            const colors = componentColors[component.type] || { text: "text-gray-600", bg: "bg-gray-50" };
            const label = componentLabels[component.type] || "مكون";

            return (
              <Card
                key={component.id}
                className="p-4 hover:shadow-lg transition-all border-2 border-gray-100 hover:border-primary/30 bg-white"
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                  {/* Top Row: Drag Handle + Icon + Info */}
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    {/* Drag Handle */}
                    <div className="cursor-move text-gray-500 hover:text-gray-700 flex-shrink-0">
                      <GripVertical className="w-5 h-5" />
                    </div>

                    {/* Icon */}
                    <div className={`p-3 rounded-lg ${colors.bg} border border-gray-200 flex-shrink-0`}>
                      <Icon className={`w-6 h-6 ${colors.text}`} />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-gray-900 text-base mb-1 truncate">
                        {getComponentDisplayTitle(component)}
                      </h4>
                      <p className="text-sm text-gray-700 font-medium">
                        {getComponentDisplaySubtitle(component)}
                      </p>
                      {(component.settings as any).description && (
                        <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                          {(component.settings as any).description}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Actions - تحت في الموبايل، يمين في الديسكتوب */}
                  <div className="flex items-center gap-2 justify-end sm:justify-start flex-shrink-0">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onEditComponent(component)}
                      className="hover:bg-primary hover:text-white border-gray-300"
                    >
                      <Settings className="w-4 h-4 sm:ml-1" />
                      <span className="hidden sm:inline">تعديل</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onRemoveComponent(component.id)}
                      className="hover:bg-red-600 hover:text-white border-gray-300"
                    >
                      <Trash2 className="w-4 h-4 sm:ml-1" />
                      <span className="hidden sm:inline">حذف</span>
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })
        ) : (
          <div
            className={`
              border-2 border-dashed rounded-lg p-8 text-center transition-all
              ${
                isDragOver
                  ? "border-primary bg-primary/5"
                  : "border-gray-300 bg-gray-50"
              }
            `}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className="flex flex-col items-center gap-3">
              <div className="p-4 rounded-full bg-gray-100">
                <Upload className="w-8 h-8 text-gray-400" />
              </div>
              <div>
                <p className="font-semibold text-gray-700 mb-1">
                  لا توجد مكونات بعد
                </p>
                <p className="text-sm text-gray-500">
                  اسحب مكوناً من اللوحة أو انقر عليه لإضافته
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Drop Zone (when components exist) */}
      {section.components.length > 0 && (
        <div
          className={`
            border-2 border-dashed rounded-lg p-4 text-center transition-all
            ${
              isDragOver
                ? "border-primary bg-primary/5"
                : "border-gray-300 bg-gray-50"
            }
          `}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <p className="text-sm text-gray-500">
            اسحب مكوناً هنا لإضافته إلى القسم
          </p>
        </div>
      )}
    </Card>
  );
}

