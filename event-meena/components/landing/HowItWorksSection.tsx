"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  PenTool,
  Settings,
  Send,
  BarChart3,
  ArrowLeft,
  CheckCircle2
} from "lucide-react";

const steps = [
  {
    number: "01",
    icon: PenTool,
    title: "صمم حدثك",
    description: "اختر من القوالب الجاهزة أو ابدأ من الصفر. أضف الأسئلة والمكونات بسهولة من خلال السحب والإفلات.",
    features: ["قوالب جاهزة", "سحب وإفلات", "مكونات متنوعة"],
    color: "from-blue-500 to-blue-600",
  },
  {
    number: "02",
    icon: Settings,
    title: "خصص الإعدادات",
    description: "حدد مدة الحدث، نوع المشاركة، وخصص رسالة الشكر. اجعل حدثك مميزاً بلمستك الخاصة.",
    features: ["تحديد المدة", "خيارات المشاركة", "رسائل مخصصة"],
    color: "from-purple-500 to-purple-600",
  },
  {
    number: "03",
    icon: Send,
    title: "شارك وانشر",
    description: "احصل على رابط مباشر أو أرسل الحدث لجهات اتصال محددة. شارك عبر البريد أو وسائل التواصل.",
    features: ["رابط مباشر", "إرسال للمجموعات", "مشاركة سهلة"],
    color: "from-green-500 to-green-600",
  },
  {
    number: "04",
    icon: BarChart3,
    title: "حلل النتائج",
    description: "تابع الردود لحظياً، احصل على تحليلات تفصيلية، وصدّر التقارير بصيغة PDF احترافية.",
    features: ["تحليل فوري", "رسوم بيانية", "تصدير PDF"],
    color: "from-orange-500 to-orange-600",
  },
];

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-20 lg:py-28 bg-gray-50 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* العنوان */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-100 rounded-full text-[#1a56db] text-sm font-medium mb-6">
            <CheckCircle2 className="w-4 h-4" />
            <span>كيف يعمل</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            أربع خطوات بسيطة{" "}
            <span className="text-[#1a56db]">لحدث تفاعلي ناجح</span>
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            من الفكرة إلى النتائج في دقائق معدودة
          </p>
        </div>

        {/* الخطوات */}
        <div className="relative">
          {/* الخط الواصل - Desktop فقط */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 -translate-y-1/2 -z-10"></div>

          <div className="grid lg:grid-cols-4 gap-6">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="relative">
                  <Card className="group relative overflow-hidden bg-white border border-gray-200 hover:border-gray-300 transition-all duration-300 hover:shadow-md h-full">
                    <CardContent className="p-6 space-y-4">
                      {/* الرقم */}
                      <div className="flex items-start justify-between">
                        <span className={`text-5xl font-bold bg-gradient-to-r ${step.color} bg-clip-text text-transparent opacity-20 group-hover:opacity-30 transition-opacity`}>
                          {step.number}
                        </span>
                        <div className={`w-11 h-11 bg-gradient-to-r ${step.color} rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-300`}>
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                      </div>

                      {/* العنوان */}
                      <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#1a56db] transition-colors">
                        {step.title}
                      </h3>

                      {/* الوصف */}
                      <p className="text-gray-600 leading-relaxed text-sm">
                        {step.description}
                      </p>

                      {/* المميزات */}
                      <ul className="space-y-1.5 pt-2">
                        {step.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                            <CheckCircle2 className="w-3.5 h-3.5 text-green-500 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  {/* السهم - Desktop فقط */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -left-3 -translate-y-1/2 z-10">
                      <div className="w-6 h-6 bg-white rounded-full border border-gray-300 flex items-center justify-center">
                        <ArrowLeft className="w-3 h-3 text-gray-500" />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-14 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-6 p-6 sm:p-8 bg-white rounded-2xl border border-gray-200 shadow-sm">
            <div className="text-center sm:text-right">
              <h3 className="text-xl font-bold text-gray-900 mb-1">
                جاهز للبدء؟
              </h3>
              <p className="text-gray-600 text-sm">
                أنشئ حدثك الأول الآن مجاناً
              </p>
            </div>
            <Link
              href="/dashboard/events/new"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-[#1a56db] hover:bg-[#1648c7] text-white font-bold rounded-xl transition-colors duration-200 group"
            >
              ابدأ الآن
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

