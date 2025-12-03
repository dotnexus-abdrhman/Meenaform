"use client";

import { useEventBuilderStore } from "@/store/eventBuilderStore";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FileText, HelpCircle, ClipboardList, Target, ArrowRight } from "lucide-react";
import { EventType } from "@/types/event";
import Link from "next/link";

const eventTypes = [
  {
    value: "survey" as EventType,
    label: "استبيان",
    description: "جمع آراء وملاحظات من المشاركين",
    icon: FileText,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    value: "poll" as EventType,
    label: "استطلاع رأي",
    description: "سؤال سريع مع خيارات محددة",
    icon: HelpCircle,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
  },
  {
    value: "form" as EventType,
    label: "نموذج",
    description: "جمع معلومات وبيانات منظمة",
    icon: ClipboardList,
    color: "text-green-600",
    bgColor: "bg-green-50",
  },
  {
    value: "quiz" as EventType,
    label: "اختبار",
    description: "تقييم المعرفة مع درجات",
    icon: Target,
    color: "text-orange-600",
    bgColor: "bg-orange-50",
  },
];

export default function Step1BasicInfo() {
  const {
    title,
    description,
    type,
    numberOfSections,
    setTitle,
    setDescription,
    setType,
    setNumberOfSections,
  } = useEventBuilderStore();

  const selectedType = eventTypes.find((t) => t.value === type);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          المعلومات الأساسية
        </h2>
        <p className="text-gray-600">
          ابدأ بإدخال المعلومات الأساسية لحدثك التفاعلي
        </p>
      </div>

      {/* Event Title */}
      <div className="space-y-2">
        <Label htmlFor="title" className="text-base font-semibold">
          عنوان الحدث <span className="text-red-500">*</span>
        </Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="مثال: استبيان رضا العملاء 2024"
          className="text-lg h-12"
        />
        <p className="text-sm text-gray-500">
          اختر عنواناً واضحاً ومعبراً عن الحدث
        </p>
      </div>

      {/* Event Description */}
      <div className="space-y-2">
        <Label htmlFor="description" className="text-base font-semibold">
          وصف الحدث
        </Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="اكتب وصفاً مختصراً عن الحدث وأهدافه..."
          className="min-h-[120px] text-base"
        />
        <p className="text-sm text-gray-500">
          وصف اختياري يساعد المشاركين على فهم الغرض من الحدث
        </p>
      </div>

      {/* Event Type */}
      <div className="space-y-3">
        <Label className="text-base font-semibold">
          نوع الحدث <span className="text-red-500">*</span>
        </Label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {eventTypes.map((eventType) => {
            const Icon = eventType.icon;
            const isSelected = type === eventType.value;

            return (
              <div
                key={eventType.value}
                onClick={() => setType(eventType.value)}
                className={`
                  p-4 rounded-lg border-2 cursor-pointer transition-all
                  ${
                    isSelected
                      ? "border-primary bg-primary/5 shadow-md"
                      : "border-gray-200 hover:border-gray-300 hover:shadow-sm"
                  }
                `}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`p-2 rounded-lg ${eventType.bgColor} ${
                      isSelected ? "ring-2 ring-primary ring-offset-2" : ""
                    }`}
                  >
                    <Icon className={`w-6 h-6 ${eventType.color}`} />
                  </div>
                  <div className="flex-1">
                    <h3
                      className={`font-semibold mb-1 ${
                        isSelected ? "text-primary" : "text-gray-900"
                      }`}
                    >
                      {eventType.label}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {eventType.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Number of Sections */}
      <div className="space-y-2">
        <Label htmlFor="sections" className="text-base font-semibold">
          عدد الأقسام <span className="text-red-500">*</span>
        </Label>
        <Select
          value={numberOfSections.toString()}
          onValueChange={(value) => setNumberOfSections(parseInt(value))}
        >
          <SelectTrigger className="h-12 text-base">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
              <SelectItem key={num} value={num.toString()}>
                {num} {num === 1 ? "قسم" : "أقسام"}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <p className="text-sm text-gray-500">
          يمكنك تقسيم حدثك إلى أقسام متعددة لتنظيم أفضل
        </p>
      </div>

      {/* Info Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex gap-3">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
              <span className="text-blue-600 font-bold">💡</span>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-blue-900 mb-1">نصيحة</h4>
            <p className="text-sm text-blue-800">
              الأقسام تساعد في تنظيم الحدث وتقسيمه إلى خطوات منطقية. مثلاً:
              قسم للمعلومات الشخصية، قسم للأسئلة، قسم للتقييم.
            </p>
          </div>
        </div>
      </div>

      {/* Back to Dashboard Button */}
      <div className="pt-4 border-t border-gray-200">
        <Button
          variant="ghost"
          size="sm"
          asChild
          className="text-gray-600 hover:text-gray-900 hover:bg-gray-100"
        >
          <Link href="/dashboard/events" className="flex items-center gap-2">
            <ArrowRight className="w-4 h-4" />
            <span>العودة إلى الأحداث</span>
          </Link>
        </Button>
      </div>
    </div>
  );
}

