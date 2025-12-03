"use client";

import { useEventBuilderStore } from "@/store/eventBuilderStore";
import { Edit3, Info, CheckCircle, Trophy } from "lucide-react";
import { Card } from "@/components/ui/card";
import EditablePreview from "./preview/EditablePreview";

export default function Step5Preview() {
  const store = useEventBuilderStore();

  return (
    <div className="space-y-6">
      {/* Editable Preview Mode Banner */}
      <div className="bg-white border-2 border-primary/20 p-4 rounded-xl shadow-sm">
        <div className="flex items-center justify-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <Edit3 className="w-5 h-5 text-primary" />
          </div>
          <div className="text-center">
            <h3 className="font-bold text-lg text-gray-900">المعاينة التحريرية</h3>
            <p className="text-sm text-gray-600">
              يمكنك تعديل المكونات مباشرة من هنا - مرر على أي مكون لرؤية خيارات التعديل والحذف
            </p>
          </div>
        </div>
      </div>

      {/* Info Banner */}
      <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-bold text-blue-900 mb-1">
              💡 كيفية الاستخدام
            </h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• <strong>تعديل مكون:</strong> مرر الماوس على المكون واضغط "تعديل"</li>
              <li>• <strong>حذف مكون:</strong> مرر الماوس على المكون واضغط "حذف"</li>
              <li>• <strong>إضافة مكون:</strong> اضغط على زر "إضافة مكون جديد"</li>
              <li>• <strong>تعديل العنوان/الوصف:</strong> مرر على العنوان واضغط أيقونة التعديل</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Event Title Preview */}
      <Card className="p-6 bg-gradient-to-r from-gray-50 to-white border-2">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{store.title || "عنوان الحدث"}</h2>
        {store.description && (
          <p className="text-gray-600">{store.description}</p>
        )}
        <div className="mt-3 flex items-center gap-2 text-sm text-gray-500">
          <span className="px-2 py-1 bg-primary/10 text-primary rounded-full font-medium">
            {store.type === "survey" ? "استبيان" :
             store.type === "quiz" ? "اختبار" :
             store.type === "poll" ? "تصويت" : "نموذج"}
          </span>
          <span>•</span>
          <span>{store.sections.length} قسم</span>
          <span>•</span>
          <span>{store.sections.reduce((acc, s) => acc + s.components.length, 0)} مكون</span>
        </div>
      </Card>

      {/* Editable Preview */}
      <EditablePreview />

      {/* Thank You Message Preview */}
      <Card className="p-8 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-3">
            معاينة رسالة الشكر
          </h3>
          <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mx-auto mb-4"></div>
          <p className="text-gray-700 text-lg leading-relaxed max-w-2xl mx-auto mb-4">
            {store.thankYouMessage || "شكراً لمشاركتك!"}
          </p>
          <p className="text-xs text-gray-500 mt-6 italic">
            * هذه معاينة لرسالة الشكر التي ستظهر للمشاركين بعد إرسال إجاباتهم
          </p>
        </div>
      </Card>

      {/* Quiz Result Messages Preview - Only for Quiz with showResults */}
      {store.type === "quiz" && store.showResults && (
        <Card className="p-8 bg-gradient-to-br from-amber-50 to-yellow-50 border-2 border-amber-200">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trophy className="w-8 h-8 text-amber-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              معاينة رسائل النتائج
            </h3>
            <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full mx-auto mb-4"></div>
            <p className="text-sm text-gray-600 mb-6">
              هذه الرسائل ستظهر للمشاركين حسب أدائهم في الاختبار
            </p>
          </div>

          <div className="space-y-4 max-w-2xl mx-auto">
            {/* Success Message Preview */}
            <div className="p-4 bg-green-50 border-2 border-green-200 rounded-lg">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center flex-shrink-0 text-sm font-bold">
                  80%+
                </div>
                <div className="flex-1 text-right">
                  <p className="font-semibold text-green-900 mb-1">رسالة النجاح</p>
                  <p className="text-gray-700">
                    {store.successMessage || "ممتاز! أداء رائع!"}
                  </p>
                </div>
              </div>
            </div>

            {/* Good Message Preview */}
            <div className="p-4 bg-blue-50 border-2 border-blue-200 rounded-lg">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center flex-shrink-0 text-xs font-bold">
                  50-79%
                </div>
                <div className="flex-1 text-right">
                  <p className="font-semibold text-blue-900 mb-1">رسالة الأداء الجيد</p>
                  <p className="text-gray-700">
                    {store.goodMessage || "جيد جداً! استمر في التقدم"}
                  </p>
                </div>
              </div>
            </div>

            {/* Improvement Message Preview */}
            <div className="p-4 bg-orange-50 border-2 border-orange-200 rounded-lg">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-orange-600 text-white flex items-center justify-center flex-shrink-0 text-sm font-bold">
                  &lt;50%
                </div>
                <div className="flex-1 text-right">
                  <p className="font-semibold text-orange-900 mb-1">رسالة التحسين</p>
                  <p className="text-gray-700">
                    {store.improvementMessage || "يحتاج إلى تحسين"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <p className="text-xs text-gray-500 mt-6 text-center italic">
            * هذه معاينة لرسائل النتائج التي ستظهر للمشاركين حسب درجاتهم
          </p>
        </Card>
      )}
    </div>
  );
}

