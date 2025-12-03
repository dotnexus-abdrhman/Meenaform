"use client";

import Link from "next/link";
import { Sparkles, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { name: "المميزات", href: "#features" },
      { name: "كيف يعمل", href: "#how-it-works" },
      { name: "الأسعار", href: "#pricing" },
      { name: "القوالب", href: "/dashboard/events/templates" },
    ],
    company: [
      { name: "من نحن", href: "#about" },
      { name: "المدونة", href: "#blog" },
      { name: "الوظائف", href: "#careers" },
      { name: "اتصل بنا", href: "#contact" },
    ],
    legal: [
      { name: "الشروط والأحكام", href: "#terms" },
      { name: "سياسة الخصوصية", href: "#privacy" },
      { name: "سياسة الاستخدام", href: "#usage" },
      { name: "الأسئلة الشائعة", href: "#faq" },
    ],
  };

  const socialLinks = [
    { name: "Facebook", icon: Facebook, href: "#", color: "hover:text-blue-600" },
    { name: "Twitter", icon: Twitter, href: "#", color: "hover:text-sky-500" },
    { name: "Instagram", icon: Instagram, href: "#", color: "hover:text-pink-600" },
    { name: "LinkedIn", icon: Linkedin, href: "#", color: "hover:text-blue-700" },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* القسم الرئيسي */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* معلومات الشركة */}
          <div className="lg:col-span-2 space-y-6">
            {/* الشعار */}
            <Link href="/" className="flex items-center gap-2.5 group w-fit">
              <div className="bg-[#1a56db] p-2 rounded-xl">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-white">
                Event <span className="text-[#3b82f6]">Meena</span>
              </span>
            </Link>

            {/* الوصف */}
            <p className="text-gray-400 leading-relaxed max-w-md">
              منصة احترافية لإنشاء الاستبيانات والاختبارات والنماذج التفاعلية.
              صمم، شارك، وحلل بكل سهولة.
            </p>

            {/* معلومات التواصل */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-400 hover:text-[#3b82f6] transition-colors">
                <Mail className="w-5 h-5 flex-shrink-0" />
                <a href="mailto:info@eventmeena.com">info@eventmeena.com</a>
              </div>
              <div className="flex items-center gap-3 text-gray-400 hover:text-[#3b82f6] transition-colors">
                <Phone className="w-5 h-5 flex-shrink-0" />
                <a href="tel:+966500000000" dir="ltr">+966 50 000 0000</a>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <MapPin className="w-5 h-5 flex-shrink-0" />
                <span>الرياض، المملكة العربية السعودية</span>
              </div>
            </div>
          </div>

          {/* المنتج */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">المنتج</h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-[#3b82f6] transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* الشركة */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">الشركة</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-[#3b82f6] transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* القانونية */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">القانونية</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-[#3b82f6] transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* الخط الفاصل */}
      <div className="border-t border-gray-800"></div>

      {/* القسم السفلي */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* حقوق الملكية */}
          <p className="text-gray-400 text-sm text-center md:text-right" suppressHydrationWarning>
            © {currentYear} Event Meena. جميع الحقوق محفوظة.
          </p>

          {/* وسائل التواصل الاجتماعي */}
          <div className="flex items-center gap-3">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-9 h-9 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 ${social.color} hover:bg-gray-700 transition-colors duration-200`}
                  aria-label={social.name}
                >
                  <Icon className="w-4 h-4" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}

