import type { Metadata } from "next";
import { Cairo, Tajawal } from "next/font/google";
import "./globals.css";

// خط Cairo - خط عربي حديث وواضح
const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-cairo",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

// خط Tajawal - خط عربي بديل
const tajawal = Tajawal({
  subsets: ["arabic", "latin"],
  variable: "--font-tajawal",
  display: "swap",
  weight: ["300", "400", "500", "700", "800"],
});

export const metadata: Metadata = {
  title: "مينا إيفنت - منصة إنشاء الأحداث التفاعلية",
  description: "أنشئ حدثك التفاعلي في دقائق - استبيانات، اختبارات، نماذج تفاعلية والمزيد!",
  keywords: ["استبيانات", "اختبارات", "نماذج", "أحداث تفاعلية", "مينا إيفنت"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body
        className={`${cairo.variable} ${tajawal.variable} font-cairo antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
