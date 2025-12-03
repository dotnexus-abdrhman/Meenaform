"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Sparkles, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface InitialChoiceProps {
  onChooseTemplate: () => void;
  onChooseFromScratch: () => void;
}

export default function InitialChoice({
  onChooseTemplate,
  onChooseFromScratch,
}: InitialChoiceProps) {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => router.push("/dashboard/events")}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 ml-2" />
          العودة إلى الأحداث
        </Button>

        {/* Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            إنشاء حدث جديد
          </h1>
          <p className="text-xl text-gray-600">
            اختر الطريقة التي تفضلها لإنشاء حدثك التفاعلي
          </p>
        </div>

        {/* Choices */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* From Template */}
          <Card
            className="p-8 hover:shadow-2xl transition-all duration-300 cursor-pointer group hover:border-purple-300 hover:scale-105"
            onClick={onChooseTemplate}
          >
            <div className="text-center">
              {/* Icon */}
              <div className="inline-flex p-6 rounded-full bg-purple-50 mb-6 group-hover:bg-purple-100 transition-colors">
                <FileText className="w-16 h-16 text-purple-600" />
              </div>

              {/* Title */}
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                إنشاء من قالب
              </h2>

              {/* Description */}
              <p className="text-gray-600 mb-6 leading-relaxed">
                ابدأ بسرعة باستخدام قوالب جاهزة ومصممة مسبقاً. وفر الوقت
                واستخدم أفضل الممارسات.
              </p>

              {/* Features */}
              <ul className="text-sm text-gray-500 space-y-2 mb-6 text-right">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
                  قوالب احترافية جاهزة
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
                  توفير الوقت والجهد
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
                  قابلة للتخصيص بالكامل
                </li>
              </ul>

              {/* Button */}
              <Button
                size="lg"
                className="w-full bg-purple-600 hover:bg-purple-700"
              >
                اختيار قالب
              </Button>
            </div>
          </Card>

          {/* From Scratch */}
          <Card
            className="p-8 hover:shadow-2xl transition-all duration-300 cursor-pointer group hover:border-primary hover:scale-105"
            onClick={onChooseFromScratch}
          >
            <div className="text-center">
              {/* Icon */}
              <div className="inline-flex p-6 rounded-full bg-blue-50 mb-6 group-hover:bg-blue-100 transition-colors">
                <Sparkles className="w-16 h-16 text-primary" />
              </div>

              {/* Title */}
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                إنشاء من الصفر
              </h2>

              {/* Description */}
              <p className="text-gray-600 mb-6 leading-relaxed">
                ابنِ حدثك بالطريقة التي تريدها تماماً. تحكم كامل في كل
                التفاصيل والمكونات.
              </p>

              {/* Features */}
              <ul className="text-sm text-gray-500 space-y-2 mb-6 text-right">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                  تحكم كامل في التصميم
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                  مرونة غير محدودة
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                  إبداع بلا حدود
                </li>
              </ul>

              {/* Button */}
              <Button
                size="lg"
                className="w-full bg-primary hover:bg-primary/90 shadow-lg shadow-primary/30"
              >
                البدء من الصفر
              </Button>
            </div>
          </Card>
        </div>

        {/* Help Text */}
        <p className="text-center text-sm text-gray-500 mt-8">
          يمكنك تعديل وتخصيص حدثك في أي وقت بعد الإنشاء
        </p>
      </div>
    </div>
  );
}

