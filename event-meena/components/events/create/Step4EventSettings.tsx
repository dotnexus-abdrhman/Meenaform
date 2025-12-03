"use client";

import { useState } from "react";
import { useEventBuilderStore } from "@/store/eventBuilderStore";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Calendar,
  Lock,
  Edit,
  Eye,
  RefreshCw,
  PenTool,
  Settings as SettingsIcon,
  MessageSquare,
  Trophy,
  AlertTriangle,
} from "lucide-react";

export default function Step4EventSettings() {
  const [showAuthWarning, setShowAuthWarning] = useState(false);
  const {
    type,
    startDate,
    endDate,
    requireAuth,
    allowEdit,
    showResults,
    allowMultipleResponses,
    requireSignature,
    thankYouMessage,
    successMessage,
    goodMessage,
    improvementMessage,
    setStartDate,
    setEndDate,
    setRequireAuth,
    setAllowEdit,
    setShowResults,
    setAllowMultipleResponses,
    setRequireSignature,
    setThankYouMessage,
    setSuccessMessage,
    setGoodMessage,
    setImprovementMessage,
  } = useEventBuilderStore();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          إعدادات الحدث
        </h2>
        <p className="text-gray-600">
          اضبط الإعدادات والخيارات المتقدمة لحدثك
        </p>
      </div>

      {/* Date Settings */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-blue-50">
            <Calendar className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">الفترة الزمنية</h3>
            <p className="text-sm text-gray-600">
              حدد متى يكون الحدث متاحاً للمشاركين
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Start Date */}
          <div className="space-y-2">
            <Label htmlFor="startDate">تاريخ البداية</Label>
            <Input
              id="startDate"
              type="datetime-local"
              value={startDate || ""}
              onChange={(e) => setStartDate(e.target.value)}
              className="h-11"
            />
            <p className="text-xs text-gray-500">
              اتركه فارغاً للبدء فوراً
            </p>
          </div>

          {/* End Date */}
          <div className="space-y-2">
            <Label htmlFor="endDate">تاريخ النهاية</Label>
            <Input
              id="endDate"
              type="datetime-local"
              value={endDate || ""}
              onChange={(e) => setEndDate(e.target.value)}
              className="h-11"
            />
            <p className="text-xs text-gray-500">
              اتركه فارغاً لعدم تحديد نهاية
            </p>
          </div>
        </div>
      </Card>

      {/* Access Settings */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-purple-50">
            <Lock className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">إعدادات الوصول</h3>
            <p className="text-sm text-gray-600">
              تحكم في من يمكنه الوصول والمشاركة
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Require Auth */}
          <div className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:border-primary/30 transition-colors">
            <div className="flex items-start gap-3">
              <Lock className="w-5 h-5 text-gray-600 mt-0.5" />
              <div>
                <Label htmlFor="requireAuth" className="text-base font-semibold cursor-pointer">
                  يتطلب تسجيل دخول
                </Label>
                <p className="text-sm text-gray-600 mt-1">
                  المشاركون يجب أن يسجلوا الدخول قبل المشاركة
                </p>
              </div>
            </div>
            <Checkbox
              id="requireAuth"
              checked={requireAuth}
              onCheckedChange={(checked) => {
                if (checked === false && requireAuth === true) {
                  // Show warning dialog when trying to disable
                  setShowAuthWarning(true);
                } else {
                  // Enable directly without warning
                  setRequireAuth(true);
                }
              }}
            />
          </div>
        </div>
      </Card>

      {/* Response Settings */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-green-50">
            <SettingsIcon className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">إعدادات الردود</h3>
            <p className="text-sm text-gray-600">
              خيارات متعلقة بردود المشاركين
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Allow Edit */}
          <div className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:border-primary/30 transition-colors">
            <div className="flex items-start gap-3">
              <Edit className="w-5 h-5 text-gray-600 mt-0.5" />
              <div>
                <Label htmlFor="allowEdit" className="text-base font-semibold cursor-pointer">
                  السماح بتعديل الردود
                </Label>
                <p className="text-sm text-gray-600 mt-1">
                  المشاركون يمكنهم تعديل ردودهم بعد الإرسال
                </p>
              </div>
            </div>
            <Checkbox
              id="allowEdit"
              checked={allowEdit}
              onCheckedChange={(checked) => setAllowEdit(checked === true)}
            />
          </div>

          {/* Allow Multiple Responses */}
          <div className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:border-primary/30 transition-colors">
            <div className="flex items-start gap-3">
              <RefreshCw className="w-5 h-5 text-gray-600 mt-0.5" />
              <div>
                <Label htmlFor="allowMultiple" className="text-base font-semibold cursor-pointer">
                  السماح بردود متعددة
                </Label>
                <p className="text-sm text-gray-600 mt-1">
                  المشارك يمكنه إرسال أكثر من رد واحد
                </p>
              </div>
            </div>
            <Checkbox
              id="allowMultiple"
              checked={allowMultipleResponses}
              onCheckedChange={(checked) => setAllowMultipleResponses(checked === true)}
            />
          </div>

          {/* Show Results - Only for Quizzes */}
          {type === "quiz" && (
            <div className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:border-primary/30 transition-colors">
              <div className="flex items-start gap-3">
                <Eye className="w-5 h-5 text-gray-600 mt-0.5" />
                <div>
                  <Label htmlFor="showResults" className="text-base font-semibold cursor-pointer">
                    عرض النتائج للمشاركين
                  </Label>
                  <p className="text-sm text-gray-600 mt-1">
                    المشاركون يمكنهم رؤية النتائج بعد الإرسال
                  </p>
                </div>
              </div>
              <Checkbox
                id="showResults"
                checked={showResults}
                onCheckedChange={(checked) => setShowResults(checked === true)}
              />
            </div>
          )}

          {/* Require Signature */}
          <div className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:border-primary/30 transition-colors">
            <div className="flex items-start gap-3">
              <PenTool className="w-5 h-5 text-gray-600 mt-0.5" />
              <div>
                <Label htmlFor="requireSignature" className="text-base font-semibold cursor-pointer">
                  طلب توقيع مع الرد
                </Label>
                <p className="text-sm text-gray-600 mt-1">
                  المشاركون يجب أن يوقعوا إلكترونياً قبل الإرسال
                </p>
              </div>
            </div>
            <Checkbox
              id="requireSignature"
              checked={requireSignature}
              onCheckedChange={(checked) => setRequireSignature(checked === true)}
            />
          </div>
        </div>
      </Card>

      {/* Thank You Message */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center">
            <MessageSquare className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">
              رسالة الشكر
            </h3>
            <p className="text-sm text-gray-600">
              خصص الرسالة التي ستظهر للمشاركين بعد الإرسال
            </p>
          </div>
        </div>

        <div>
          <Label htmlFor="thankYouMessage" className="text-base font-semibold">
            رسالة الشكر
          </Label>
          <Textarea
            id="thankYouMessage"
            value={thankYouMessage}
            onChange={(e) => setThankYouMessage(e.target.value)}
            placeholder="أدخل رسالة الشكر التي ستظهر للمشاركين بعد الإرسال"
            rows={4}
            className="mt-2 resize-none"
          />
          <p className="text-sm text-gray-500 mt-2 flex items-start gap-2">
            <span className="text-green-600 mt-0.5">ℹ️</span>
            <span>
              هذه الرسالة ستظهر للمشاركين بعد إرسال إجاباتهم بنجاح
            </span>
          </p>
        </div>
      </Card>

      {/* Quiz Result Messages - Only for Quiz with showResults enabled */}
      {type === "quiz" && showResults && (
        <Card className="p-6 border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-yellow-50">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
              <Trophy className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">
                رسائل النتائج (للاختبارات)
              </h3>
              <p className="text-sm text-gray-600">
                خصص الرسائل التي ستظهر للمشاركين حسب أدائهم في الاختبار
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {/* Success Message */}
            <div>
              <Label htmlFor="successMessage" className="text-base font-semibold text-green-700">
                رسالة النجاح (درجة عالية)
              </Label>
              <Textarea
                id="successMessage"
                value={successMessage}
                onChange={(e) => setSuccessMessage(e.target.value)}
                placeholder="ممتاز! أداء رائع!"
                rows={2}
                className="mt-2 resize-none border-green-200 focus:border-green-400"
              />
              <p className="text-xs text-gray-500 mt-1">
                تظهر للمشاركين الذين حصلوا على 80% أو أكثر
              </p>
            </div>

            {/* Good Message */}
            <div>
              <Label htmlFor="goodMessage" className="text-base font-semibold text-blue-700">
                رسالة الأداء الجيد (درجة متوسطة)
              </Label>
              <Textarea
                id="goodMessage"
                value={goodMessage}
                onChange={(e) => setGoodMessage(e.target.value)}
                placeholder="جيد جداً! استمر في التقدم"
                rows={2}
                className="mt-2 resize-none border-blue-200 focus:border-blue-400"
              />
              <p className="text-xs text-gray-500 mt-1">
                تظهر للمشاركين الذين حصلوا على 50% - 79%
              </p>
            </div>

            {/* Improvement Message */}
            <div>
              <Label htmlFor="improvementMessage" className="text-base font-semibold text-orange-700">
                رسالة التحسين (درجة منخفضة)
              </Label>
              <Textarea
                id="improvementMessage"
                value={improvementMessage}
                onChange={(e) => setImprovementMessage(e.target.value)}
                placeholder="يحتاج إلى تحسين"
                rows={2}
                className="mt-2 resize-none border-orange-200 focus:border-orange-400"
              />
              <p className="text-xs text-gray-500 mt-1">
                تظهر للمشاركين الذين حصلوا على أقل من 50%
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm border border-amber-200 rounded-lg p-3 mt-4">
              <p className="text-xs text-gray-600 flex items-start gap-2">
                <span className="text-amber-600 mt-0.5">💡</span>
                <span>
                  هذه الرسائل ستظهر فقط إذا كان "عرض النتائج للمشاركين" مفعلاً. يمكنك تخصيصها لتحفيز المشاركين وتشجيعهم.
                </span>
              </p>
            </div>
          </div>
        </Card>
      )}

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
              يمكنك تغيير هذه الإعدادات في أي وقت بعد إنشاء الحدث من صفحة
              التعديل.
            </p>
          </div>
        </div>
      </div>

      {/* Warning Dialog for Disabling Authentication */}
      <AlertDialog open={showAuthWarning} onOpenChange={setShowAuthWarning}>
        <AlertDialogContent className="max-w-lg bg-white">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2 text-orange-600 text-xl">
              <AlertTriangle className="w-6 h-6" />
              تحذير: إلغاء تفعيل تسجيل الدخول
            </AlertDialogTitle>
            <AlertDialogDescription className="space-y-4 text-base text-gray-700" asChild>
              <div>
                <p className="font-semibold text-gray-900">
                  عند إلغاء تفعيل هذا الخيار:
                </p>
                <ul className="list-disc pr-6 space-y-2 text-gray-700">
                  <li>لن تتمكن من معرفة أسماء المشاركين في الحدث</li>
                  <li>ستظهر جميع الردود كـ <span className="font-semibold text-gray-900">"مشارك مجهول"</span> في صفحة النتائج</li>
                  <li>لن تتمكن من التواصل مع المشاركين لاحقاً</li>
                  <li>قد تفقد القدرة على تتبع الردود المكررة</li>
                </ul>
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <p className="font-semibold text-orange-700 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" />
                    توصية
                  </p>
                  <p className="text-sm text-orange-800 mt-1">
                    من الأفضل الإبقاء على هذا الخيار مفعّلاً لتتبع أفضل للمشاركين وجودة أعلى للبيانات المجمعة.
                  </p>
                </div>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-gray-100 hover:bg-gray-200 text-gray-900">
              إلغاء
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                setRequireAuth(false);
                setShowAuthWarning(false);
              }}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              إلغاء التفعيل
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

