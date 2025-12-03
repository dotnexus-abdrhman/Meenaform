"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Sparkles, Check, Star, Users, BarChart3, Circle } from "lucide-react";

export default function HeroSection() {
  const [animationPhase, setAnimationPhase] = useState(0);

  useEffect(() => {
    // تشغيل الـ animation تلقائياً
    const phases = [0, 1, 2, 3, 4, 5];
    let currentIndex = 0;

    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % phases.length;
      setAnimationPhase(phases[currentIndex]);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden bg-gradient-to-b from-gray-50/50 to-white">
      {/* خلفية بسيطة وهادية */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* المحتوى النصي */}
          <div className="text-center lg:text-right space-y-6">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/5 border border-primary/10 rounded-full text-primary text-sm font-medium">
              <Sparkles className="w-4 h-4" />
              <span>منصة إنشاء الأحداث التفاعلية الأولى عربياً</span>
            </div>

            {/* العنوان الرئيسي */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-800 leading-tight">
              أنشئ{" "}
              <span className="text-primary">حدثك التفاعلي</span>
              <br />
              في دقائق معدودة
            </h1>

            {/* الوصف */}
            <p className="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              منصة احترافية لإنشاء الاستبيانات، الاختبارات، والنماذج التفاعلية بطريقة سهلة وسريعة.
              صمم، شارك، وحلل النتائج بكل سهولة.
            </p>

            {/* الأزرار */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2">
              <Link
                href="/dashboard/events/new"
                className="inline-flex items-center justify-center gap-2 bg-[#1a56db] hover:bg-[#1648c7] text-white text-lg font-medium px-8 py-4 rounded-xl transition-colors duration-200 group"
              >
                ابدأ الآن مجاناً
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/dashboard/events/templates"
                className="inline-flex items-center justify-center gap-2 border-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 text-lg font-medium px-8 py-4 rounded-xl transition-colors duration-200"
              >
                استعرض القوالب
              </Link>
            </div>

            {/* الإحصائيات */}
            <div className="grid grid-cols-3 gap-6 pt-6">
              <div className="text-center lg:text-right">
                <div className="text-3xl font-bold text-gray-900">+10K</div>
                <div className="text-sm text-gray-600 mt-1">مستخدم نشط</div>
              </div>
              <div className="text-center lg:text-right">
                <div className="text-3xl font-bold text-gray-900">+50K</div>
                <div className="text-sm text-gray-600 mt-1">حدث تم إنشاؤه</div>
              </div>
              <div className="text-center lg:text-right">
                <div className="text-3xl font-bold text-gray-900">+200K</div>
                <div className="text-sm text-gray-600 mt-1">مشارك</div>
              </div>
            </div>
          </div>

          {/* Form Builder Animation */}
          <div className="relative">
            {/* البطاقة الرئيسية - Form Builder */}
            <div className="relative bg-white rounded-2xl shadow-lg border border-gray-200 p-6 animate-gentle-float">
              {/* Header */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#1a56db] rounded-xl flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-sm">استبيان رضا العملاء</h3>
                    <p className="text-xs text-gray-500">يتم البناء...</p>
                  </div>
                </div>
                <div className="flex gap-1.5">
                  <Circle className="w-3 h-3 text-red-400 fill-red-400" />
                  <Circle className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                  <Circle className="w-3 h-3 text-green-400 fill-green-400" />
                </div>
              </div>

              {/* Form Content - Animated */}
              <div className="space-y-4">
                {/* السؤال 1 - نص */}
                <div className={`transition-all duration-500 ${animationPhase >= 0 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                  <div className="text-xs text-gray-500 mb-1.5 font-medium">سؤال نصي</div>
                  <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                    <div className="text-sm text-gray-800 font-medium">ما رأيك في خدماتنا؟</div>
                    <div className="mt-2 h-8 bg-white rounded border border-gray-300 flex items-center px-3">
                      <span className="text-gray-400 text-xs">اكتب إجابتك هنا...</span>
                    </div>
                  </div>
                </div>

                {/* السؤال 2 - اختيارات */}
                <div className={`transition-all duration-500 delay-100 ${animationPhase >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                  <div className="text-xs text-gray-500 mb-1.5 font-medium">اختيار من متعدد</div>
                  <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                    <div className="text-sm text-gray-800 font-medium mb-2">كيف عرفت عنا؟</div>
                    <div className="space-y-1.5">
                      {['وسائل التواصل', 'صديق أو زميل', 'محرك البحث'].map((option, i) => (
                        <div
                          key={i}
                          className={`flex items-center gap-2 p-2 bg-white rounded border transition-all duration-300 ${
                            animationPhase >= 2 && i === 0
                              ? 'border-[#1a56db] bg-blue-50'
                              : 'border-gray-300'
                          }`}
                          style={{ transitionDelay: `${i * 100}ms` }}
                        >
                          <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                            animationPhase >= 2 && i === 0
                              ? 'border-[#1a56db]'
                              : 'border-gray-400'
                          }`}>
                            {animationPhase >= 2 && i === 0 && (
                              <div className="w-2 h-2 rounded-full bg-[#1a56db]"></div>
                            )}
                          </div>
                          <span className="text-xs text-gray-700">{option}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* السؤال 3 - تقييم نجوم */}
                <div className={`transition-all duration-500 delay-200 ${animationPhase >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                  <div className="text-xs text-gray-500 mb-1.5 font-medium">تقييم بالنجوم</div>
                  <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                    <div className="text-sm text-gray-800 font-medium mb-2">قيّم تجربتك معنا</div>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-6 h-6 transition-all duration-300 ${
                            animationPhase >= 4 && star <= 4
                              ? 'text-yellow-400 fill-yellow-400 scale-110'
                              : 'text-gray-300'
                          }`}
                          style={{ transitionDelay: `${star * 100}ms` }}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* زر الإرسال */}
                <div className={`transition-all duration-500 delay-300 ${animationPhase >= 5 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                  <button className="w-full bg-[#1a56db] text-white py-2.5 rounded-lg text-sm font-medium flex items-center justify-center gap-2">
                    <Check className="w-4 h-4" />
                    إرسال الاستبيان
                  </button>
                </div>
              </div>
            </div>

            {/* بطاقة عائمة - الردود */}
            <div className="absolute -top-4 -left-4 bg-white rounded-xl shadow-md p-3 border border-gray-200 animate-gentle-float" style={{ animationDelay: '0.5s' }}>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <Users className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <div className="text-xs font-bold text-gray-800">+234 رد</div>
                  <div className="text-[10px] text-gray-500">هذا الأسبوع</div>
                </div>
              </div>
            </div>

            {/* بطاقة عائمة - التحليلات */}
            <div className="absolute -bottom-4 -right-4 bg-white rounded-xl shadow-md p-3 border border-gray-200 animate-gentle-float" style={{ animationDelay: '1s' }}>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <div className="text-xs font-bold text-gray-800">87% إكمال</div>
                  <div className="text-[10px] text-gray-500">معدل الاستجابة</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

