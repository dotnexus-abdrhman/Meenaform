import Link from "next/link";
import { Sparkles } from "lucide-react";
import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
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
          {/* العنوان */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              مرحباً بعودتك! 👋
            </h1>
            <p className="text-gray-600">
              سجل دخولك للوصول إلى لوحة التحكم
            </p>
          </div>

          {/* النموذج */}
          <LoginForm />
        </div>

        {/* نص إضافي */}
        <p className="text-center text-sm text-gray-500 mt-6">
          بتسجيل الدخول، أنت توافق على{" "}
          <Link href="/terms" className="text-[#1a56db] hover:text-[#1648c7] transition-colors">
            الشروط والأحكام
          </Link>
        </p>
      </div>
    </div>
  );
}

