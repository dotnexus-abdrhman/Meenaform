"use client";

import { Sparkles, ArrowLeft } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";

export default function WelcomeCard() {
  const { user } = useAuthStore();
  const router = useRouter();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "صباح الخير";
    if (hour < 18) return "مساء الخير";
    return "مساء الخير";
  };

  return (
    <Card className="relative overflow-hidden shadow-sm border border-gray-200 hover:border-gray-300 bg-gradient-to-br from-blue-50 to-white transition-all duration-300">
      {/* خلفية زخرفية */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5">
        <div className="absolute top-4 right-4 w-32 h-32 bg-[#1a56db] rounded-full blur-3xl"></div>
        <div className="absolute bottom-4 left-4 w-40 h-40 bg-[#1a56db] rounded-full blur-3xl"></div>
      </div>

      <div className="relative p-6 sm:p-8">
        <div className="flex items-start justify-between gap-4">
          {/* المحتوى */}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-5 h-5 text-[#1a56db]" />
              <span className="text-sm font-medium text-[#1a56db]">
                {getGreeting()}
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              مرحباً، {user?.name?.split(" ")[0] || "عزيزي"}! 👋
            </h2>

            <p className="text-gray-600 mb-6 max-w-2xl">
              نحن سعداء بوجودك معنا. ابدأ بإنشاء حدثك الأول أو استكشف القوالب
              الجاهزة لتوفير الوقت.
            </p>

            {/* أزرار الإجراءات */}
            <div className="flex flex-wrap gap-3">
              <Button
                onClick={() => router.push("/dashboard/events/new")}
                variant="outline"
                className="border-[#1a56db] text-[#1a56db] hover:bg-blue-50"
              >
                إنشاء حدث جديد
                <ArrowLeft className="w-4 h-4 mr-2" />
              </Button>
              <Button
                onClick={() => router.push("/dashboard/events/templates")}
                variant="outline"
                className="border-[#1a56db] text-[#1a56db] hover:bg-blue-50"
              >
                تصفح القوالب
              </Button>
            </div>
          </div>

          {/* صورة توضيحية (اختياري) */}
          <div className="hidden lg:block">
            <div className="w-32 h-32 bg-blue-100 rounded-2xl flex items-center justify-center">
              <Sparkles className="w-16 h-16 text-[#1a56db]" />
            </div>
          </div>
        </div>

        {/* نصائح سريعة */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">
            💡 نصائح سريعة:
          </h3>
          <ul className="grid sm:grid-cols-2 gap-2 text-sm text-gray-600">
            <li className="flex items-start gap-2">
              <span className="text-[#1a56db] mt-0.5">•</span>
              <span>استخدم القوالب الجاهزة لتوفير الوقت</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#1a56db] mt-0.5">•</span>
              <span>أضف جهات اتصال لإرسال الأحداث بسهولة</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#1a56db] mt-0.5">•</span>
              <span>راجع النتائج والتحليلات بعد كل حدث</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#1a56db] mt-0.5">•</span>
              <span>صدّر البيانات بصيغة PDF أو Excel</span>
            </li>
          </ul>
        </div>
      </div>
    </Card>
  );
}

