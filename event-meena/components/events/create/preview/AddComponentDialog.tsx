"use client";

import { ComponentType } from "@/types/component";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  HelpCircle,
  Star,
  Table,
  Upload,
  Image as ImageIcon,
  Video,
  PenTool,
  Type,
  Monitor,
} from "lucide-react";

interface AddComponentDialogProps {
  open: boolean;
  onClose: () => void;
  onSelect: (type: ComponentType) => void;
}

const componentTypes: {
  type: ComponentType;
  label: string;
  description: string;
  icon: any;
  color: string;
  bgColor: string;
}[] = [
  {
    type: "question",
    label: "سؤال",
    description: "13 نوع مختلف من الأسئلة",
    icon: HelpCircle,
    color: "text-blue-600",
    bgColor: "bg-blue-50 hover:bg-blue-100",
  },
  {
    type: "rating",
    label: "تقييم",
    description: "نجوم، أرقام، إيموجي",
    icon: Star,
    color: "text-yellow-600",
    bgColor: "bg-yellow-50 hover:bg-yellow-100",
  },
  {
    type: "table",
    label: "جدول",
    description: "جدول بيانات أو حسابات",
    icon: Table,
    color: "text-orange-600",
    bgColor: "bg-orange-50 hover:bg-orange-100",
  },
  {
    type: "pdf_upload",
    label: "رفع PDF",
    description: "السماح برفع ملفات PDF",
    icon: Upload,
    color: "text-red-600",
    bgColor: "bg-red-50 hover:bg-red-100",
  },
  {
    type: "image_upload",
    label: "رفع صورة",
    description: "السماح برفع صور",
    icon: ImageIcon,
    color: "text-green-600",
    bgColor: "bg-green-50 hover:bg-green-100",
  },
  {
    type: "video_upload",
    label: "رفع فيديو",
    description: "السماح برفع فيديوهات",
    icon: Video,
    color: "text-purple-600",
    bgColor: "bg-purple-50 hover:bg-purple-100",
  },
  {
    type: "signature",
    label: "توقيع",
    description: "توقيع إلكتروني",
    icon: PenTool,
    color: "text-pink-600",
    bgColor: "bg-pink-50 hover:bg-pink-100",
  },
  {
    type: "text",
    label: "نص توضيحي",
    description: "نص أو تعليمات",
    icon: Type,
    color: "text-gray-600",
    bgColor: "bg-gray-50 hover:bg-gray-100",
  },
  {
    type: "display",
    label: "عرض محتوى",
    description: "صورة، PDF، أو رابط",
    icon: Monitor,
    color: "text-indigo-600",
    bgColor: "bg-indigo-50 hover:bg-indigo-100",
  },
];

export default function AddComponentDialog({
  open,
  onClose,
  onSelect,
}: AddComponentDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">إضافة مكون جديد</DialogTitle>
          <DialogDescription>
            اختر نوع المكون الذي تريد إضافته
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 py-4">
          {componentTypes.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.type}
                onClick={() => onSelect(item.type)}
                className={`
                  p-4 rounded-xl border-2 border-transparent transition-all
                  ${item.bgColor}
                  hover:border-gray-200 hover:shadow-md
                  text-right
                `}
              >
                <div className={`w-12 h-12 rounded-xl ${item.bgColor} flex items-center justify-center mb-3`}>
                  <Icon className={`w-6 h-6 ${item.color}`} />
                </div>
                <h3 className="font-bold text-gray-900 mb-1">{item.label}</h3>
                <p className="text-xs text-gray-600">{item.description}</p>
              </button>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
}

