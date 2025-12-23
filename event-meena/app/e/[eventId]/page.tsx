"use client";

import { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { useEventsStore } from "@/store/eventsStore";
import { useAuthStore } from "@/store/authStore";
import { eventsService } from "@/lib/api/services/eventsService";
import { Event } from "@/types/event";
import { ParticipantInfo } from "@/types/response";
import { Loader2, Calendar, Clock, AlertCircle } from "lucide-react";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import ParticipateHeader from "@/components/events/participate/ParticipateHeader";
import ParticipateFooter from "@/components/events/participate/ParticipateFooter";
import EventInfo from "@/components/events/participate/EventInfo";
import ResponseForm from "@/components/events/participate/ResponseForm";
import ParticipantInfoForm from "@/components/events/participate/ParticipantInfoForm";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function EventParticipatePage() {
  const params = useParams();
  const router = useRouter();
  // eventId هنا هو في الواقع shareCode (رمز المشاركة)
  const shareCode = params.eventId as string;

  const { fetchEventByShareCode, currentEvent, isLoading, error } = useEventsStore();
  const { user } = useAuthStore();

  const [isEventValid, setIsEventValid] = useState(true);
  const [validationMessage, setValidationMessage] = useState("");
  const [participantInfo, setParticipantInfo] = useState<ParticipantInfo | null>(null);
  const [showParticipantForm, setShowParticipantForm] = useState(false);

  // لمنع تسجيل المشاهدة أكثر من مرة
  const viewCounted = useRef(false);

  useEffect(() => {
    if (shareCode) {
      // استخدام Public endpoint لجلب الحدث مع التفاصيل الكاملة
      fetchEventByShareCode(shareCode);
    }
  }, [shareCode, fetchEventByShareCode]);

  // تسجيل المشاهدة عند تحميل الحدث بنجاح
  useEffect(() => {
    if (currentEvent && !viewCounted.current) {
      viewCounted.current = true;
      // زيادة عداد المشاهدات
      eventsService.incrementViewCount(currentEvent.id);
    }
  }, [currentEvent]);

  useEffect(() => {
    if (currentEvent) {
      // التحقق من صلاحية الحدث
      validateEvent(currentEvent);
    }
  }, [currentEvent, user]);

  // التحقق من معلومات المشارك المحفوظة
  useEffect(() => {
    console.log("🔍 Checking participant info...");
    console.log("currentEvent:", currentEvent);
    console.log("requireAuth:", currentEvent?.settings.requireAuth);
    console.log("isPrivate:", currentEvent?.settings.isPrivate);
    console.log("user:", user);

    // نعرض النموذج إذا كان الحدث يتطلب تسجيل أو كان خاص
    const needsAuth = currentEvent?.settings.requireAuth || currentEvent?.settings.isPrivate;

    if (needsAuth && !user) {
      console.log("✅ Auth/Private required and no user logged in");
      const savedInfo = localStorage.getItem("participantInfo");
      console.log("savedInfo from localStorage:", savedInfo);

      if (savedInfo) {
        try {
          const info = JSON.parse(savedInfo);
          console.log("✅ Found saved participant info:", info);

          // للحدث الخاص، نتحقق أيضاً من الوصول المحفوظ
          if (currentEvent?.settings.isPrivate) {
            const savedAccess = localStorage.getItem(`privateAccess_${currentEvent.id}`);
            if (savedAccess) {
              const accessData = JSON.parse(savedAccess);
              // التحقق من أن الإيميل المحفوظ لا يزال في قائمة المسموح لهم
              if (currentEvent.settings.allowedEmails?.some(
                (email) => email.toLowerCase() === accessData.email.toLowerCase()
              )) {
                setParticipantInfo(info);
                setShowParticipantForm(false);
              } else {
                // الإيميل لم يعد مسموحاً له
                localStorage.removeItem(`privateAccess_${currentEvent.id}`);
                localStorage.removeItem("participantInfo");
                setShowParticipantForm(true);
              }
            } else {
              // لا يوجد وصول محفوظ للحدث الخاص
              setShowParticipantForm(true);
            }
          } else {
            setParticipantInfo(info);
            setShowParticipantForm(false);
          }
        } catch (e) {
          console.log("❌ Error parsing saved info, showing form");
          setShowParticipantForm(true);
        }
      } else {
        console.log("❌ No saved info, showing form");
        setShowParticipantForm(true);
      }
    } else {
      console.log("❌ Auth not required or user is logged in");
      setShowParticipantForm(false);
    }
  }, [currentEvent, user]);

  const validateEvent = (event: Event) => {
    // 1. التحقق من حالة الحدث
    if (event.status !== "active") {
      setIsEventValid(false);
      if (event.status === "draft") {
        setValidationMessage("هذا الحدث لا يزال في وضع المسودة ولم يتم نشره بعد.");
      } else if (event.status === "archived") {
        setValidationMessage("هذا الحدث مؤرشف وغير متاح للمشاركة.");
      }
      return;
    }

    // 2. التحقق من تاريخ البداية
    if (event.startDate) {
      const startDate = new Date(event.startDate);
      const now = new Date();
      if (now < startDate) {
        setIsEventValid(false);
        setValidationMessage(
          `هذا الحدث سيبدأ في ${format(startDate, "PPP", { locale: ar })} الساعة ${format(startDate, "p", { locale: ar })}`
        );
        return;
      }
    }

    // 3. التحقق من تاريخ النهاية
    if (event.endDate) {
      const endDate = new Date(event.endDate);
      const now = new Date();
      if (now > endDate) {
        setIsEventValid(false);
        setValidationMessage(
          `انتهى هذا الحدث في ${format(endDate, "PPP", { locale: ar })} الساعة ${format(endDate, "p", { locale: ar })}`
        );
        return;
      }
    }

    // الحدث صالح
    setIsEventValid(true);
    setValidationMessage("");
  };

  // معالج إرسال معلومات المشارك
  const handleParticipantInfoSubmit = (info: ParticipantInfo) => {
    setParticipantInfo(info);
    setShowParticipantForm(false);
  };

  // Loading state - show loading if: actively loading OR hasn't loaded yet (no event and no error)
  if (isLoading || (!currentEvent && !error)) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto mb-4" />
          <p className="text-gray-600 text-lg">جاري تحميل الحدث...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !currentEvent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <ParticipateHeader creatorName="Menna Event" />
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <AlertCircle className="w-10 h-10 text-red-600" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-4">
                عذراً، الحدث غير موجود
              </h1>
              <p className="text-gray-600 mb-8">
                {error || "لم نتمكن من العثور على الحدث المطلوب. قد يكون الرابط غير صحيح أو تم حذف الحدث."}
              </p>
              <Button asChild>
                <Link href="/">العودة إلى الصفحة الرئيسية</Link>
              </Button>
            </div>
          </div>
        </div>
        <ParticipateFooter />
      </div>
    );
  }

  // Invalid event state (لكن ليس بسبب requireAuth)
  if (!isEventValid) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <ParticipateHeader creatorName={currentEvent.userId || ""} />
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
              <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
                {currentEvent.startDate && new Date() < new Date(currentEvent.startDate) ? (
                  <Calendar className="w-10 h-10 text-yellow-600" />
                ) : (
                  <Clock className="w-10 h-10 text-yellow-600" />
                )}
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-4">
                {currentEvent.title}
              </h1>
              <p className="text-gray-600 mb-8">{validationMessage}</p>

              <Button asChild variant="outline">
                <Link href="/">العودة إلى الصفحة الرئيسية</Link>
              </Button>
            </div>
          </div>
        </div>
        <ParticipateFooter />
      </div>
    );
  }

  // إذا كان الحدث يتطلب معلومات المشارك ولم يتم إدخالها بعد
  // (سواء كان requireAuth مفعّل أو الحدث خاص)
  const needsParticipantForm =
    (currentEvent.settings.requireAuth || currentEvent.settings.isPrivate) &&
    !user &&
    showParticipantForm;

  console.log("🎯 Checking if should show ParticipantInfoForm:");
  console.log("  - requireAuth:", currentEvent.settings.requireAuth);
  console.log("  - isPrivate:", currentEvent.settings.isPrivate);
  console.log("  - user:", user);
  console.log("  - showParticipantForm:", showParticipantForm);
  console.log("  - Final condition:", needsParticipantForm);

  if (needsParticipantForm) {
    console.log("✅ SHOWING ParticipantInfoForm!");
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <ParticipateHeader creatorName={currentEvent.userId || ""} />
        <ParticipantInfoForm
          eventTitle={currentEvent.title}
          eventId={currentEvent.id}
          isPrivateEvent={currentEvent.settings.isPrivate}
          allowedEmails={currentEvent.settings.allowedEmails || []}
          onSubmit={handleParticipantInfoSubmit}
        />
        <ParticipateFooter />
      </div>
    );
  }

  console.log("❌ NOT showing ParticipantInfoForm, showing event instead");

  // Valid event - show participation form
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <ParticipateHeader creatorName={currentEvent.userId || ""} />

      <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-8">
        <div className="max-w-4xl mx-auto">
          {/* Event Info */}
          <EventInfo event={currentEvent} />

          {/* Response Form */}
          <ResponseForm event={currentEvent} participantInfo={participantInfo} />
        </div>
      </div>

      <ParticipateFooter />
    </div>
  );
}

