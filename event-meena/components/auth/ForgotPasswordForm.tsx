"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { Mail, Loader2, ArrowRight, CheckCircle2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authService } from "@/lib/api/services/authService";

// Schema للتحقق من البيانات
const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, "البريد الإلكتروني مطلوب")
    .email("البريد الإلكتروني غير صحيح"),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      await authService.forgotPassword(data.email);
      setSubmittedEmail(data.email);
      setIsSuccess(true);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("حدث خطأ أثناء إرسال الطلب. يرجى المحاولة مرة أخرى.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // عرض رسالة النجاح
  if (isSuccess) {
    return (
      <div className="text-center space-y-6">
        {/* أيقونة النجاح */}
        <div className="flex justify-center">
          <div className="bg-green-100 rounded-full p-4">
            <CheckCircle2 className="w-12 h-12 text-green-600" />
          </div>
        </div>

        {/* رسالة النجاح */}
        <div className="space-y-2">
          <h2 className="text-xl font-bold text-gray-900">
            تم إرسال رابط إعادة التعيين
          </h2>
          <p className="text-gray-600 text-sm">
            إذا كان البريد الإلكتروني{" "}
            <span className="font-semibold text-[#1a56db]">{submittedEmail}</span>{" "}
            مسجلاً لدينا، ستتلقى رسالة تحتوي على رابط لإعادة تعيين كلمة المرور.
          </p>
        </div>

        {/* تعليمات إضافية */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800">
          <p className="font-medium mb-2">لم تستلم الرسالة؟</p>
          <ul className="text-right space-y-1 text-blue-700">
            <li>• تحقق من مجلد البريد غير الهام (Spam)</li>
            <li>• تأكد من صحة البريد الإلكتروني</li>
            <li>• انتظر بضع دقائق وحاول مرة أخرى</li>
          </ul>
        </div>

        {/* رابط العودة */}
        <Link
          href="/login"
          className="inline-flex items-center gap-2 text-[#1a56db] font-semibold hover:text-[#1648c7] transition-colors"
        >
          <ArrowRight className="w-4 h-4" />
          العودة لتسجيل الدخول
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* رسالة الخطأ */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      {/* البريد الإلكتروني */}
      <div className="space-y-2">
        <Label htmlFor="email" className="text-gray-700 font-medium">
          البريد الإلكتروني
        </Label>
        <div className="relative">
          <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            id="email"
            type="email"
            placeholder="example@eventmeena.com"
            className="pr-10 h-12"
            {...register("email")}
            disabled={isLoading}
          />
        </div>
        {errors.email && (
          <p className="text-red-600 text-sm">{errors.email.message}</p>
        )}
      </div>

      {/* زر الإرسال */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full h-12 bg-[#1a56db] hover:bg-[#1648c7] disabled:bg-gray-400 disabled:cursor-not-allowed text-white text-base font-semibold rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            جاري إرسال الرابط...
          </>
        ) : (
          "إرسال رابط إعادة التعيين"
        )}
      </button>

      {/* رابط العودة */}
      <p className="text-center text-sm text-gray-600">
        تذكرت كلمة المرور؟{" "}
        <Link
          href="/login"
          className="text-[#1a56db] font-semibold hover:text-[#1648c7] transition-colors"
        >
          تسجيل الدخول
        </Link>
      </p>
    </form>
  );
}

