import Link from "next/link";
import Image from "next/image";
import SignupForm from "@/components/auth/SignupForm";

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 py-12">
      {/* المحتوى */}
      <div className="w-full max-w-md">
        {/* الشعار */}
        <Link href="/" className="flex items-center justify-center gap-2.5 mb-8 group">
          <Image
            src="/logo.png"
            alt="مينا إيفنت"
            width={44}
            height={44}
            className="rounded-lg"
          />
          <span className="text-3xl font-bold text-gray-900">
            مينا <span className="text-[#1a56db]">إيفنت</span>
          </span>
        </Link>

        {/* البطاقة */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
          {/* العنوان */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              إنشاء حساب جديد
            </h1>
            <p className="text-gray-600">
              انضم إلينا وابدأ في إنشاء أحداثك التفاعلية
            </p>
          </div>

          {/* النموذج */}
          <SignupForm />
        </div>

        {/* نص إضافي */}
        <p className="text-center text-sm text-gray-500 mt-6">
          بإنشاء حساب، أنت توافق على{" "}
          <Link href="/terms" className="text-[#1a56db] hover:text-[#1648c7] transition-colors">
            الشروط والأحكام
          </Link>
        </p>
      </div>
    </div>
  );
}

