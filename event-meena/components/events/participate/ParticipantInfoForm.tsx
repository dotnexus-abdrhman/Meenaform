"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { UserCircle, Mail, ArrowLeft, Loader2 } from "lucide-react";
import { ParticipantInfo } from "@/types/response";

// Schema للتحقق من صحة البيانات
const participantInfoSchema = z.object({
  name: z.string().min(2, "الاسم يجب أن يكون حرفين على الأقل"),
  email: z.string().email("البريد الإلكتروني غير صحيح"),
});

type ParticipantInfoFormData = z.infer<typeof participantInfoSchema>;

interface ParticipantInfoFormProps {
  eventTitle: string;
  onSubmit: (info: ParticipantInfo) => void;
}

export default function ParticipantInfoForm({
  eventTitle,
  onSubmit,
}: ParticipantInfoFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ParticipantInfoFormData>({
    resolver: zodResolver(participantInfoSchema),
  });

  const onFormSubmit = async (data: ParticipantInfoFormData) => {
    setIsSubmitting(true);
    
    // حفظ المعلومات في localStorage
    const participantInfo: ParticipantInfo = {
      name: data.name,
      email: data.email,
    };
    
    localStorage.setItem("participantInfo", JSON.stringify(participantInfo));
    
    // تأخير بسيط لتحسين التجربة
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    onSubmit(participantInfo);
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-gray-200 hover:border-gray-300 transition-all duration-300">
        <div className="p-8">
          {/* أيقونة ورأس */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-[#1a56db] rounded-xl flex items-center justify-center mx-auto mb-4">
              <UserCircle className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              معلومات المشارك
            </h1>
            <p className="text-gray-600 text-sm">
              يرجى إدخال معلوماتك للمتابعة إلى
            </p>
            <p className="text-[#1a56db] font-semibold mt-1">
              {eventTitle}
            </p>
          </div>

          {/* النموذج */}
          <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
            {/* الاسم الكامل */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-gray-700 font-medium">
                الاسم الكامل <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <UserCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="name"
                  type="text"
                  placeholder="أدخل اسمك الكامل"
                  {...register("name")}
                  className={`
                    pr-10 h-12 text-base
                    ${errors.name ? "border-red-500 focus:ring-red-500" : ""}
                  `}
                  disabled={isSubmitting}
                />
              </div>
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
              )}
            </div>

            {/* البريد الإلكتروني */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700 font-medium">
                البريد الإلكتروني <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="example@email.com"
                  {...register("email")}
                  className={`
                    pr-10 h-12 text-base
                    ${errors.email ? "border-red-500 focus:ring-red-500" : ""}
                  `}
                  disabled={isSubmitting}
                  dir="ltr"
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* ملاحظة */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800 text-center">
                <span className="font-semibold">ملاحظة:</span> هذه المعلومات ستُستخدم فقط لأغراض التحليل والتواصل معك
              </p>
            </div>

            {/* زر الإرسال */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-12 text-base font-semibold bg-[#1a56db] hover:bg-[#1648c7] text-white transition-colors duration-200"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 ml-2 animate-spin" />
                  جاري التحميل...
                </>
              ) : (
                <>
                  متابعة إلى الحدث
                  <ArrowLeft className="w-5 h-5 mr-2" />
                </>
              )}
            </Button>
          </form>

          {/* معلومات إضافية */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center">
              بالمتابعة، أنت توافق على مشاركة معلوماتك مع منشئ الحدث
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}

