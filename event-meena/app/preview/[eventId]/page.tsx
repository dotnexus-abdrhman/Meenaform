"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { useEventsStore } from "@/store/eventsStore";
import { Loader2, AlertCircle } from "lucide-react";
import ParticipateHeader from "@/components/events/participate/ParticipateHeader";
import ParticipateFooter from "@/components/events/participate/ParticipateFooter";
import EventInfo from "@/components/events/participate/EventInfo";
import ResponseForm from "@/components/events/participate/ResponseForm";
import PreviewBanner from "@/components/events/preview/PreviewBanner";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function EventPreviewPage() {
  const params = useParams();
  const eventId = params.eventId as string;

  const { fetchEventForPreview, currentEvent, isLoading, error } = useEventsStore();

  // جلب الحدث للمعاينة (بدون التحقق من المصادقة أو الحالة)
  useEffect(() => {
    if (eventId) {
      fetchEventForPreview(eventId);
    }
  }, [eventId, fetchEventForPreview]);

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto mb-4" />
          <p className="text-gray-600 text-lg">جاري تحميل المعاينة...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !currentEvent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <AlertCircle className="w-10 h-10 text-red-600" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-4">
                عذراً، لا يمكن تحميل الحدث
              </h1>
              <p className="text-gray-600 mb-8">
                {error || "لم نتمكن من العثور على الحدث المطلوب. قد يكون الرابط غير صحيح أو تم حذف الحدث."}
              </p>
              <Button asChild>
                <Link href="/">العودة للرئيسية</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // عرض المعاينة
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* شريط المعاينة */}
      <PreviewBanner eventId={eventId} eventTitle={currentEvent.title} />

      {/* Header */}
      <ParticipateHeader creatorName="" />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Event Info */}
          <EventInfo event={currentEvent} />

          {/* Response Form - في وضع المعاينة */}
          <ResponseForm
            event={currentEvent}
            participantInfo={null}
            isPreviewMode={true}
          />
        </div>
      </div>

      <ParticipateFooter />
    </div>
  );
}

