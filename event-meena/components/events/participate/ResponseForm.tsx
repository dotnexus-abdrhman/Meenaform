"use client";

import { useState, useEffect, useRef } from "react";
import { Event } from "@/types/event";
import { ComponentAnswer, Response, ParticipantInfo } from "@/types/response";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { Loader2, CheckCircle, ArrowRight, ArrowLeft, AlertCircle, Edit } from "lucide-react";
import SectionView from "./SectionView";
import ThankYouPage from "./ThankYouPage";
import { responsesService } from "@/lib/api/services";

interface ResponseFormProps {
  event: Event;
  participantInfo?: ParticipantInfo | null;
  isPreviewMode?: boolean;
}

export default function ResponseForm({ event, participantInfo, isPreviewMode = false }: ResponseFormProps) {
  const { user } = useAuthStore();
  const { toast } = useToast();
  const router = useRouter();

  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [answers, setAnswers] = useState<ComponentAnswer[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [startTime] = useState(new Date());
  const [backendResponseId, setBackendResponseId] = useState<string | null>(null);
  const [isStartingResponse, setIsStartingResponse] = useState(false);
  const [alreadyResponded, setAlreadyResponded] = useState(false);
  const [alreadyRespondedMessage, setAlreadyRespondedMessage] = useState("");
  const [existingResponseId, setExistingResponseId] = useState<string | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isLoadingExistingResponse, setIsLoadingExistingResponse] = useState(false);

  // Guard: التأكد من وجود sections
  const hasSections = event.sections && event.sections.length > 0;
  const currentSection = hasSections ? event.sections[currentSectionIndex] : null;
  const isLastSection = hasSections ? currentSectionIndex === event.sections.length - 1 : true;
  const isFirstSection = currentSectionIndex === 0;

  // Calculate progress
  const progress = hasSections ? ((currentSectionIndex + 1) / event.sections.length) * 100 : 0;

  // Guard لمنع التنفيذ المتكرر بسبب React StrictMode
  const responseInitialized = useRef(false);
  // Track if we're waiting for participant info
  const waitingForParticipantInfo = useRef(false);

  // بدء الاستجابة عند تحميل المكون (إذا لم تكن في وضع المعاينة)
  useEffect(() => {
    const initResponse = async () => {
      // منع التنفيذ المتكرر
      if (responseInitialized.current || isPreviewMode || backendResponseId) return;

      // تجهيز معلومات المشارك
      const finalParticipantInfo: ParticipantInfo = participantInfo || {
        userId: user?.id,
        name: user?.name,
        email: user?.email,
        phone: user?.phone,
      };

      // فحص: هل الحدث يتطلب معلومات المشارك؟
      const requiresParticipantInfo = event.settings?.requireAuth === true;
      const hasParticipantData = finalParticipantInfo.name || finalParticipantInfo.email || finalParticipantInfo.userId;

      // إذا كان الحدث يتطلب معلومات ولم تصل بعد، انتظر
      if (requiresParticipantInfo && !hasParticipantData) {
        console.log("⏳ Event requires participant info, waiting...");
        waitingForParticipantInfo.current = true;
        return;
      }

      // إذا كنا ننتظر معلومات المشارك وجاءت الآن
      if (waitingForParticipantInfo.current && hasParticipantData) {
        console.log("✅ Participant info received!");
        waitingForParticipantInfo.current = false;
      }

      responseInitialized.current = true;
      setIsStartingResponse(true);

      try {
        // Start response on backend
        console.log("📤 Starting response with participant info:", finalParticipantInfo);
        const response = await responsesService.startResponse(event.id, finalParticipantInfo);
        setBackendResponseId(response.id);
        console.log("✅ Response started:", response.id);
      } catch (error: any) {
        console.error("❌ Failed to start response:", error);

        // التحقق إذا كان الخطأ بسبب رد سابق (allowMultipleResponses = false)
        const errorMessage = error?.message || "";
        if (errorMessage.includes("مسبقاً") || errorMessage.includes("مسبق")) {
          setAlreadyResponded(true);
          setAlreadyRespondedMessage(errorMessage);

          // جلب الـ existing response ID للتعديل إذا كان allowEdit مفعّل
          if (event.settings?.allowEdit) {
            try {
              const email = finalParticipantInfo?.email || user?.email;
              if (email) {
                const existingResponse = await responsesService.getExistingResponse(event.id, email);
                if (existingResponse) {
                  setExistingResponseId(existingResponse.id);
                }
              }
            } catch (fetchError) {
              console.error("Failed to fetch existing response:", fetchError);
            }
          }
          return;
        }

        // Reset the guard on error so user can retry
        responseInitialized.current = false;
        // Don't show error toast - allow user to continue, will retry on submit
      } finally {
        setIsStartingResponse(false);
      }
    };

    if (hasSections) {
      initResponse();
    }
  }, [event.id, event.settings?.requireAuth, isPreviewMode, hasSections, participantInfo, user]);

  // Handler لتفعيل وضع التعديل من شاشة "شاركت مسبقاً"
  const handleEditFromAlreadyResponded = async () => {
    if (!existingResponseId) return;

    setIsLoadingExistingResponse(true);
    try {
      const email = participantInfo?.email || user?.email;
      if (!email) {
        toast({
          title: "خطأ",
          description: "لم يتم العثور على البريد الإلكتروني",
          variant: "destructive",
        });
        return;
      }

      const existingResponse = await responsesService.getExistingResponse(event.id, email);
      if (existingResponse) {
        // تحميل الإجابات القديمة (mapResponse تُرجع ComponentAnswer[] بالفعل)
        setAnswers(existingResponse.answers || []);
        setBackendResponseId(existingResponse.id);
        setIsEditMode(true);
        setAlreadyResponded(false); // إخفاء شاشة "شاركت مسبقاً"
        setCurrentSectionIndex(0);
      }
    } catch (error) {
      console.error("Failed to load existing response:", error);
      toast({
        title: "خطأ",
        description: "فشل في تحميل الرد السابق",
        variant: "destructive",
      });
    } finally {
      setIsLoadingExistingResponse(false);
    }
  };

  // إذا كان المستخدم قد شارك مسبقاً
  if (alreadyResponded) {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-blue-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          لقد شاركت في هذا الحدث مسبقاً
        </h2>
        <p className="text-gray-600 mb-6">
          {alreadyRespondedMessage || "شكراً لمشاركتك السابقة! هذا الحدث لا يسمح بتقديم أكثر من رد واحد."}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {event.settings?.allowEdit && existingResponseId && (
            <Button
              onClick={handleEditFromAlreadyResponded}
              disabled={isLoadingExistingResponse}
              className="w-full sm:w-auto sm:min-w-[200px]"
            >
              {isLoadingExistingResponse ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin ml-2" />
                  جارٍ التحميل...
                </>
              ) : (
                <>
                  <Edit className="w-4 h-4 ml-2" />
                  تعديل الرد
                </>
              )}
            </Button>
          )}
          <Button
            variant="outline"
            onClick={() => router.push("/")}
            className="w-full sm:w-auto sm:min-w-[200px]"
          >
            العودة إلى الصفحة الرئيسية
          </Button>
        </div>
      </div>
    );
  }

  // إذا لم توجد sections، عرض رسالة خطأ
  if (!hasSections) {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <AlertCircle className="w-8 h-8 text-yellow-600" />
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">
          الحدث غير مكتمل
        </h2>
        <p className="text-gray-600">
          هذا الحدث لا يحتوي على أي أقسام أو أسئلة بعد.
          يرجى التواصل مع منشئ الحدث.
        </p>
      </div>
    );
  }

  // Get styling based on event type
  const getEventTypeStyles = () => {
    switch (event.type) {
      case "quiz":
        return {
          containerClass: "bg-gradient-to-b from-gray-50 to-white",
          cardClass: "border border-gray-200 shadow-sm",
          headerClass: "bg-gradient-to-r from-[#1a56db] to-[#0ea5e9] text-white",
          buttonClass: "bg-[#1a56db] hover:bg-[#1a56db]/90 text-white shadow-md hover:shadow-lg transition-all",
          progressColor: "text-[#1a56db]",
        };
      case "poll":
        return {
          containerClass: "bg-gradient-to-br from-green-50 to-emerald-50",
          cardClass: "border border-green-200 shadow-md",
          headerClass: "bg-green-600 text-white",
          buttonClass: "bg-green-600 hover:bg-green-700",
          progressColor: "text-green-600",
        };
      case "form":
        return {
          containerClass: "bg-gray-50",
          cardClass: "border border-gray-200 shadow-sm",
          headerClass: "bg-gray-700 text-white",
          buttonClass: "bg-gray-700 hover:bg-gray-800",
          progressColor: "text-gray-700",
        };
      default: // survey
        return {
          containerClass: "bg-gradient-to-br from-blue-50 via-white to-purple-50",
          cardClass: "border border-gray-200 shadow-md",
          headerClass: "bg-primary text-white",
          buttonClass: "bg-primary hover:bg-primary/90",
          progressColor: "text-primary",
        };
    }
  };

  const styles = getEventTypeStyles();

  // Get answers for current section
  const currentSectionAnswers = currentSection
    ? answers.filter((answer) =>
        currentSection.components.some((comp) => comp.id === answer.componentId)
      )
    : [];

  // Check if current section is complete
  const isSectionComplete = () => {
    if (!currentSection) return false;

    const requiredComponents = currentSection.components.filter(
      (comp) => (comp.settings as any).required
    );

    return requiredComponents.every((comp) =>
      answers.some((answer) => answer.componentId === comp.id && answer.answer)
    );
  };

  // Handle answer change
  const handleAnswerChange = (componentId: string, componentType: string, value: any) => {
    // Prevent changes in preview mode
    if (isPreviewMode) return;

    setAnswers((prev) => {
      const existingIndex = prev.findIndex((a) => a.componentId === componentId);
      const newAnswer: ComponentAnswer = {
        componentId,
        componentType,
        answer: value,
        timeSpent: 0, // Will be calculated on submit
        answeredAt: new Date().toISOString(),
      };

      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex] = newAnswer;
        return updated;
      }

      return [...prev, newAnswer];
    });
  };

  // Handle next section
  const handleNext = () => {
    // In preview mode, allow navigation without validation
    if (isPreviewMode) {
      if (isLastSection) {
        // Don't submit in preview mode
        return;
      } else {
        setCurrentSectionIndex((prev) => prev + 1);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      return;
    }

    if (!isSectionComplete()) {
      toast({
        title: "تنبيه",
        description: "يرجى الإجابة على جميع الأسئلة المطلوبة قبل المتابعة",
        variant: "destructive",
      });
      return;
    }

    if (isLastSection) {
      handleSubmit();
    } else {
      setCurrentSectionIndex((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Handle previous section
  const handlePrevious = () => {
    if (!isFirstSection) {
      setCurrentSectionIndex((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Handle submit
  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      // Prepare participant info
      const finalParticipantInfo: ParticipantInfo = participantInfo || {
        userId: user?.id,
        name: user?.name,
        email: user?.email,
        phone: user?.phone,
      };

      let currentResponseId = backendResponseId;

      // إذا كنا في وضع التعديل، نستخدم updateResponseAnswers
      if (isEditMode && currentResponseId) {
        console.log("📤 Updating response answers...");
        await responsesService.updateResponseAnswers(currentResponseId, answers);
        console.log("✅ Response updated successfully!");
        setIsEditMode(false);
      } else {
        // If we don't have a response ID, start one now
        if (!currentResponseId) {
          console.log("📤 Starting response on backend...");
          const startedResponse = await responsesService.startResponse(event.id, finalParticipantInfo);
          currentResponseId = startedResponse.id;
          setBackendResponseId(currentResponseId);
          console.log("✅ Response started:", currentResponseId);
        }

        // Complete the response with all answers
        console.log("📤 Completing response with answers:", answers);
        await responsesService.completeResponse(currentResponseId, answers);
        console.log("✅ Response completed successfully!");
      }

      setIsSubmitted(true);

      toast({
        title: isEditMode ? "تم تحديث الرد بنجاح!" : "تم الإرسال بنجاح!",
        description: isEditMode ? "تم حفظ التعديلات بنجاح" : "شكراً لمشاركتك، تم استلام إجاباتك بنجاح",
      });
    } catch (error) {
      console.error("❌ Error submitting response:", error);
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء إرسال الإجابات، يرجى المحاولة مرة أخرى",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Helper functions
  const getDeviceType = (): "desktop" | "mobile" | "tablet" => {
    const ua = navigator.userAgent;
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
      return "tablet";
    }
    if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
      return "mobile";
    }
    return "desktop";
  };

  const getBrowserInfo = (): string => {
    const ua = navigator.userAgent;
    if (ua.includes("Firefox")) return "Firefox";
    if (ua.includes("Chrome")) return "Chrome";
    if (ua.includes("Safari")) return "Safari";
    if (ua.includes("Edge")) return "Edge";
    return "Unknown";
  };

  const getOSInfo = (): string => {
    const ua = navigator.userAgent;
    if (ua.includes("Win")) return "Windows";
    if (ua.includes("Mac")) return "MacOS";
    if (ua.includes("Linux")) return "Linux";
    if (ua.includes("Android")) return "Android";
    if (ua.includes("iOS")) return "iOS";
    return "Unknown";
  };

  // Show thank you page after submission
  if (isSubmitted) {
    return (
      <ThankYouPage
        event={event}
        answers={answers}
        onViewResults={() => {
          // TODO: Navigate to results page
          console.log("View results");
        }}
        onSubmitAnother={() => {
          if (event.settings.allowMultipleResponses) {
            setIsSubmitted(false);
            setCurrentSectionIndex(0);
            setAnswers([]);
            // Reset response ID to start a new response
            setBackendResponseId(null);
            responseInitialized.current = false;
          } else {
            toast({
              title: "تنبيه",
              description: "هذا الحدث لا يسمح بردود متعددة",
              variant: "destructive",
            });
          }
        }}
        onEditResponse={() => {
          if (event.settings.allowEdit) {
            // العودة للنموذج مع الإجابات الحالية للتعديل
            setIsSubmitted(false);
            setCurrentSectionIndex(0);
            setIsEditMode(true);
            // لا نمسح الإجابات - نبقيها للتعديل
          } else {
            toast({
              title: "تنبيه",
              description: "هذا الحدث لا يسمح بتعديل الردود",
              variant: "destructive",
            });
          }
        }}
      />
    );
  }

  return (
    <div className={`space-y-6 ${styles.containerClass} p-4 md:p-6 rounded-2xl`}>
      {/* Progress Bar */}
      {event.settings.showProgressBar && (
        <div className={`bg-white ${styles.cardClass} rounded-xl p-6 shadow-md`}>
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-bold text-gray-800">
              {event.type === "quiz" ? `السؤال ${currentSectionIndex + 1} من ${event.sections.length}` : `القسم ${currentSectionIndex + 1} من ${event.sections.length}`}
            </span>
            <span className={`text-sm font-bold ${styles.progressColor}`}>
              {Math.round(progress)}%
            </span>
          </div>
          <Progress value={progress} className="h-3" />
        </div>
      )}

      {/* Quiz Header (only for quiz type) */}
      {event.type === "quiz" && currentSection && (
        <div className={`${styles.headerClass} rounded-xl p-6 md:p-8 text-center shadow-lg`}>
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border-2 border-white/30">
              <span className="text-white font-bold text-lg">{currentSectionIndex + 1}</span>
            </div>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            {currentSection.title}
          </h2>
          {currentSection.description && (
            <p className="text-white/95 text-sm md:text-base max-w-2xl mx-auto">
              {currentSection.description}
            </p>
          )}
        </div>
      )}

      {/* Current Section */}
      {currentSection && (
      <SectionView
        section={currentSection}
        answers={currentSectionAnswers}
        onAnswerChange={handleAnswerChange}
        eventType={event.type}
        isPreviewMode={isPreviewMode}
      />
      )}

      {/* Navigation Buttons */}
      <div className={`${styles.cardClass} rounded-xl p-6`}>
        <div className="flex items-center justify-between gap-4">
          {/* Previous Button */}
          <Button
            variant="outline"
            size="lg"
            onClick={handlePrevious}
            disabled={isFirstSection || isSubmitting}
            className="flex-1 md:flex-none"
          >
            <ArrowRight className="w-5 h-5 ml-2" />
            السابق
          </Button>

          {/* Next/Submit Button */}
          <Button
            size="lg"
            onClick={handleNext}
            disabled={isPreviewMode ? isLastSection : (!isSectionComplete() || isSubmitting)}
            className={`flex-1 md:flex-none md:min-w-[200px] ${styles.buttonClass}`}
          >
            {isPreviewMode ? (
              isLastSection ? (
                <>
                  <CheckCircle className="w-5 h-5 mr-2" />
                  معاينة فقط
                </>
              ) : (
                <>
                  {event.type === "quiz" ? "السؤال التالي" : "التالي"}
                  <ArrowLeft className="w-5 h-5 mr-2" />
                </>
              )
            ) : isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                جاري الإرسال...
              </>
            ) : isLastSection ? (
              <>
                <CheckCircle className="w-5 h-5 mr-2" />
                {event.type === "quiz" ? "إنهاء الاختبار" : "إرسال الإجابات"}
              </>
            ) : (
              <>
                {event.type === "quiz" ? "السؤال التالي" : "التالي"}
                <ArrowLeft className="w-5 h-5 mr-2" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

