"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Sparkles, ShieldCheck, AlertTriangle, Loader2 } from "lucide-react";
import ResetPasswordForm from "@/components/auth/ResetPasswordForm";
import { Suspense } from "react";

function ResetPasswordContent() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const token = searchParams.get("token");

  // التحقق من وجود البريد والرمز
  const isValidRequest = email && token;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      {/* المحتوى */}
      <div className="w-full max-w-md">
        {/* الشعار */}
        <Link href="/" className="flex items-center justify-center gap-2.5 mb-8 group">
          <div className="bg-[#1a56db] group-hover:bg-[#1648c7] p-2.5 rounded-xl transition-colors duration-200">
            <Sparkles className="w-7 h-7 text-white" />
          </div>
          <span className="text-3xl font-bold text-gray-900">
            Event <span className="text-[#1a56db]">Meena</span>
          </span>
        </Link>

        {/* البطاقة */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
          {isValidRequest ? (
            <>
              {/* أيقونة الدرع */}
              <div className="flex justify-center mb-4">
                <div className="bg-blue-100 rounded-full p-3">
                  <ShieldCheck className="w-8 h-8 text-[#1a56db]" />
                </div>
              </div>

              {/* العنوان */}
              <div className="text-center mb-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  إعادة تعيين كلمة المرور
                </h1>
                <p className="text-gray-600 text-sm">
                  أدخل كلمة المرور الجديدة لحسابك
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  للحساب: <span className="font-medium text-[#1a56db]">{email}</span>
                </p>
              </div>

              {/* النموذج */}
              <ResetPasswordForm email={email} token={token} />
            </>
          ) : (
            // رسالة خطأ - الرابط غير صالح
            <div className="text-center space-y-6">
              {/* أيقونة التحذير */}
              <div className="flex justify-center">
                <div className="bg-red-100 rounded-full p-4">
                  <AlertTriangle className="w-12 h-12 text-red-600" />
                </div>
              </div>

              {/* رسالة الخطأ */}
              <div className="space-y-2">
                <h2 className="text-xl font-bold text-gray-900">
                  رابط غير صالح
                </h2>
                <p className="text-gray-600 text-sm">
                  هذا الرابط غير صالح أو منتهي الصلاحية.
                  <br />
                  يرجى طلب رابط جديد لإعادة تعيين كلمة المرور.
                </p>
              </div>

              {/* زر طلب رابط جديد */}
              <div className="space-y-3">
                <Link
                  href="/forgot-password"
                  className="block w-full h-12 bg-[#1a56db] hover:bg-[#1648c7] text-white text-base font-semibold rounded-lg transition-colors duration-200 flex items-center justify-center"
                >
                  طلب رابط جديد
                </Link>
                <Link
                  href="/login"
                  className="block text-sm text-gray-600 hover:text-[#1a56db] transition-colors"
                >
                  العودة لتسجيل الدخول
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* نص إضافي */}
        <p className="text-center text-sm text-gray-500 mt-6">
          تحتاج مساعدة؟{" "}
          <Link href="/contact" className="text-[#1a56db] hover:text-[#1648c7] transition-colors">
            تواصل معنا
          </Link>
        </p>
      </div>
    </div>
  );
}

function LoadingFallback() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="text-center">
        <Loader2 className="w-12 h-12 text-[#1a56db] animate-spin mx-auto mb-4" />
        <p className="text-gray-600">جاري التحميل...</p>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <ResetPasswordContent />
    </Suspense>
  );
}
