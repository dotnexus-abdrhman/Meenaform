"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { Lock, Eye, EyeOff, Loader2, CheckCircle2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authService } from "@/lib/api/services/authService";
import PasswordStrength from "./PasswordStrength";

// Schema للتحقق من البيانات - متوافق مع Backend Validation
const resetPasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(1, "كلمة المرور الجديدة مطلوبة")
      .min(8, "كلمة المرور يجب أن تكون 8 أحرف على الأقل")
      .regex(/[A-Z]/, "كلمة المرور يجب أن تحتوي على حرف كبير واحد على الأقل")
      .regex(/[a-z]/, "كلمة المرور يجب أن تحتوي على حرف صغير واحد على الأقل")
      .regex(/[0-9]/, "كلمة المرور يجب أن تحتوي على رقم واحد على الأقل"),
    confirmPassword: z.string().min(1, "تأكيد كلمة المرور مطلوب"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "كلمة المرور غير متطابقة",
    path: ["confirmPassword"],
  });

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

interface ResetPasswordFormProps {
  email: string;
  token: string;
}

export default function ResetPasswordForm({ email, token }: ResetPasswordFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const newPassword = watch("newPassword");

  const onSubmit = async (data: ResetPasswordFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      await authService.resetPassword({
        email,
        token,
        newPassword: data.newPassword,
        confirmPassword: data.confirmPassword,
      });
      setIsSuccess(true);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("حدث خطأ أثناء إعادة تعيين كلمة المرور. يرجى المحاولة مرة أخرى.");
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
            تم تغيير كلمة المرور بنجاح
          </h2>
          <p className="text-gray-600 text-sm">
            يمكنك الآن تسجيل الدخول باستخدام كلمة المرور الجديدة.
          </p>
        </div>

        {/* زر تسجيل الدخول */}
        <Link
          href="/login"
          className="block w-full h-12 bg-[#1a56db] hover:bg-[#1648c7] text-white text-base font-semibold rounded-lg transition-colors duration-200 flex items-center justify-center"
        >
          تسجيل الدخول الآن
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* رسالة الخطأ */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      {/* كلمة المرور الجديدة */}
      <div className="space-y-2">
        <Label htmlFor="newPassword" className="text-gray-700 font-medium">
          كلمة المرور الجديدة
        </Label>
        <div className="relative">
          <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            id="newPassword"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            className="pr-10 pl-10 h-12"
            {...register("newPassword")}
            disabled={isLoading}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            disabled={isLoading}
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
        {errors.newPassword && (
          <p className="text-red-600 text-sm">{errors.newPassword.message}</p>
        )}
        {/* مؤشر قوة كلمة المرور */}
        <PasswordStrength password={newPassword} />
      </div>

      {/* تأكيد كلمة المرور */}
      <div className="space-y-2">
        <Label htmlFor="confirmPassword" className="text-gray-700 font-medium">
          تأكيد كلمة المرور الجديدة
        </Label>
        <div className="relative">
          <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="••••••••"
            className="pr-10 pl-10 h-12"
            {...register("confirmPassword")}
            disabled={isLoading}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            disabled={isLoading}
          >
            {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
        {errors.confirmPassword && (
          <p className="text-red-600 text-sm">{errors.confirmPassword.message}</p>
        )}
      </div>

      {/* زر إعادة التعيين */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full h-12 bg-[#1a56db] hover:bg-[#1648c7] disabled:bg-gray-400 disabled:cursor-not-allowed text-white text-base font-semibold rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            جاري إعادة التعيين...
          </>
        ) : (
          "إعادة تعيين كلمة المرور"
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

