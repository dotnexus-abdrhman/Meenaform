import Link from "next/link";
import { Sparkles, KeyRound } from "lucide-react";
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";

export default function ForgotPasswordPage() {
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
          {/* أيقونة المفتاح */}
          <div className="flex justify-center mb-4">
            <div className="bg-blue-100 rounded-full p-3">
              <KeyRound className="w-8 h-8 text-[#1a56db]" />
            </div>
          </div>

          {/* العنوان */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              نسيت كلمة المرور؟
            </h1>
            <p className="text-gray-600 text-sm">
              لا تقلق! أدخل بريدك الإلكتروني وسنرسل لك رابطاً لإعادة تعيين كلمة المرور.
            </p>
          </div>

          {/* النموذج */}
          <ForgotPasswordForm />
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

