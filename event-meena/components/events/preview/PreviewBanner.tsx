"use client";

import { Eye, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PreviewBannerProps {
  eventId: string;
  eventTitle?: string;
}

export default function PreviewBanner({ eventId, eventTitle }: PreviewBannerProps) {
  const handleClose = () => {
    // إغلاق التبويب إذا تم فتحه من زر المعاينة
    window.close();
  };

  return (
    <div className="sticky top-0 z-50 bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Left side - Info */}
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
              <Eye className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-sm md:text-base">
                وضع المعاينة - للقراءة فقط
              </p>
              <p className="text-xs md:text-sm text-white/90 hidden sm:block">
                هذه نسخة للمعاينة فقط ولن يتم حفظ أي ردود
              </p>
            </div>
          </div>

          {/* Right side - Close button */}
          <Button
            onClick={handleClose}
            variant="secondary"
            size="sm"
            className="bg-white text-orange-600 hover:bg-white/90 font-medium shadow-md"
          >
            <X className="w-4 h-4 ml-2" />
            إغلاق المعاينة
          </Button>
        </div>
      </div>
    </div>
  );
}

