"use client";

import { Card, CardContent } from "@/components/ui/card";
import { 
  MousePointerClick, 
  Share2, 
  BarChart3, 
  FileDown,
  Sparkles,
  Zap
} from "lucide-react";

const features = [
  {
    icon: MousePointerClick,
    title: "تصميم سهل بالسحب والإفلات",
    description: "أنشئ أحداثك التفاعلية بكل سهولة من خلال واجهة سحب وإفلات بديهية. لا حاجة لخبرة تقنية!",
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-50",
    iconColor: "text-blue-600",
  },
  {
    icon: Share2,
    title: "مشاركة ذكية ومرنة",
    description: "شارك أحداثك عبر رابط مباشر أو أرسلها لجهات اتصال محددة ومجموعات بكل سهولة.",
    color: "from-green-500 to-green-600",
    bgColor: "bg-green-50",
    iconColor: "text-green-600",
  },
  {
    icon: BarChart3,
    title: "تحليل ذكي للنتائج",
    description: "احصل على تحليلات فورية ورسوم بيانية تفاعلية لفهم نتائج أحداثك بشكل أفضل.",
    color: "from-purple-500 to-purple-600",
    bgColor: "bg-purple-50",
    iconColor: "text-purple-600",
  },
  {
    icon: FileDown,
    title: "تصدير احترافي للتقارير",
    description: "صدّر نتائجك كملفات PDF مخصصة بالكامل مع شعارك وألوانك الخاصة.",
    color: "from-orange-500 to-orange-600",
    bgColor: "bg-orange-50",
    iconColor: "text-orange-600",
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-20 lg:py-28 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* العنوان */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-100 rounded-full text-[#1a56db] text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            <span>المميزات</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            كل ما تحتاجه لإنشاء{" "}
            <span className="text-[#1a56db]">أحداث تفاعلية مميزة</span>
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            منصة متكاملة توفر لك جميع الأدوات اللازمة لإنشاء ومشاركة وتحليل أحداثك التفاعلية
          </p>
        </div>

        {/* البطاقات */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={index}
                className="group relative overflow-hidden bg-white border border-gray-200 hover:border-gray-300 transition-all duration-300 hover:shadow-md"
              >
                <CardContent className="relative p-6 space-y-4">
                  {/* الأيقونة */}
                  <div className={`w-12 h-12 ${feature.bgColor} rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-300`}>
                    <Icon className={`w-6 h-6 ${feature.iconColor}`} />
                  </div>

                  {/* العنوان */}
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#1a56db] transition-colors duration-300">
                    {feature.title}
                  </h3>

                  {/* الوصف */}
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {feature.description}
                  </p>

                  {/* خط زخرفي */}
                  <div className="pt-2">
                    <div className={`h-0.5 w-0 group-hover:w-12 bg-gradient-to-r ${feature.color} rounded-full transition-all duration-500`}></div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* قسم إضافي - مميزات ثانوية */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="text-center space-y-3">
            <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mx-auto">
              <Zap className="w-6 h-6 text-[#1a56db]" />
            </div>
            <h4 className="font-bold text-gray-900">سريع وسهل</h4>
            <p className="text-sm text-gray-600">أنشئ حدثك في أقل من 5 دقائق</p>
          </div>
          <div className="text-center space-y-3">
            <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mx-auto">
              <Sparkles className="w-6 h-6 text-[#1a56db]" />
            </div>
            <h4 className="font-bold text-gray-900">تصميم احترافي</h4>
            <p className="text-sm text-gray-600">قوالب جاهزة وتصميمات عصرية</p>
          </div>
          <div className="text-center space-y-3">
            <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mx-auto">
              <BarChart3 className="w-6 h-6 text-[#1a56db]" />
            </div>
            <h4 className="font-bold text-gray-900">تحليلات متقدمة</h4>
            <p className="text-sm text-gray-600">رؤى عميقة لفهم جمهورك</p>
          </div>
        </div>
      </div>
    </section>
  );
}

