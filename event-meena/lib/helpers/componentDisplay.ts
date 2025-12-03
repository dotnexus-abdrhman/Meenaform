import { Component } from "@/types/component";

/**
 * Get display title for a component
 */
export function getComponentDisplayTitle(component: Component): string {
  const settings = component.settings as any;

  switch (component.type) {
    case "question":
      return settings.label || "سؤال بدون عنوان";

    case "rating":
      return settings.label || "تقييم بدون عنوان";

    case "table":
      return settings.label || "جدول بدون عنوان";

    case "pdf_upload":
      return settings.label || "رفع PDF";

    case "image_upload":
      return settings.label || "رفع صورة";

    case "video_upload":
      return settings.label || "رفع فيديو";

    case "link":
      return settings.label || "رابط";

    case "signature":
      return settings.label || "توقيع";

    case "text":
      return "نص توضيحي";

    case "display":
      return settings.label || "عرض";

    // Support question subtypes directly (for templates)
    case "short_text" as any:
    case "long_text" as any:
    case "single_choice" as any:
    case "multiple_choice" as any:
    case "dropdown" as any:
    case "yes_no" as any:
    case "linear_scale" as any:
    case "choice_grid" as any:
    case "number" as any:
    case "email" as any:
    case "phone" as any:
    case "date" as any:
    case "time" as any:
      return settings.label || "سؤال بدون عنوان";

    default:
      return settings.label || "مكون";
  }
}

/**
 * Get display subtitle/description for a component
 */
export function getComponentDisplaySubtitle(component: Component): string {
  const settings = component.settings as any;

  switch (component.type) {
    case "question":
      return getQuestionTypeLabel(settings.questionType) + (settings.required ? " • مطلوب" : "");

    case "rating":
      return getRatingTypeLabel(settings.ratingType) + (settings.required ? " • مطلوب" : "");

    case "table":
      return getTableTypeLabel(settings.tableType) + ` • ${settings.columns?.length || 0} عمود × ${settings.rowCount || 0} صف`;

    case "pdf_upload":
    case "image_upload":
    case "video_upload":
      return `حجم أقصى: ${settings.maxFileSize || 10}MB` + (settings.allowMultiple ? " • ملفات متعددة" : "");

    case "link":
      return "رابط خارجي" + (settings.validateUrl ? " • مع التحقق" : "");

    case "signature":
      return `${settings.width || 500}×${settings.height || 200}px`;

    case "text":
      const content = settings.content || "";
      return content.length > 60 ? content.substring(0, 60) + "..." : content;

    case "display":
      return getDisplayTypeLabel(settings.displayType);

    // Support question subtypes directly (for templates)
    case "short_text" as any:
    case "long_text" as any:
    case "single_choice" as any:
    case "multiple_choice" as any:
    case "dropdown" as any:
    case "yes_no" as any:
    case "linear_scale" as any:
    case "choice_grid" as any:
    case "number" as any:
    case "email" as any:
    case "phone" as any:
    case "date" as any:
    case "time" as any:
      return getQuestionTypeLabel(component.type as string) + (settings.required ? " • مطلوب" : "");

    default:
      return "";
  }
}

/**
 * Get question type label in Arabic
 */
function getQuestionTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    short_text: "نص قصير",
    long_text: "نص طويل",
    single_choice: "اختيار واحد",
    multiple_choice: "اختيار متعدد",
    dropdown: "قائمة منسدلة",
    yes_no: "نعم/لا",
    linear_scale: "مقياس خطي",
    choice_grid: "شبكة اختيارات",
    number: "رقم",
    email: "بريد إلكتروني",
    phone: "هاتف",
    date: "تاريخ",
    time: "وقت",
  };
  return labels[type] || type;
}

/**
 * Get rating type label in Arabic
 */
function getRatingTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    stars: "نجوم",
    numbers: "أرقام",
    emoji: "إيموجي",
  };
  return labels[type] || type;
}

/**
 * Get table type label in Arabic
 */
function getTableTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    simple: "جدول بسيط",
    calculation: "جدول حسابي",
  };
  return labels[type] || type;
}

/**
 * Get display type label in Arabic
 */
function getDisplayTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    image: "عرض صورة",
    pdf: "عرض PDF",
    link: "عرض رابط",
  };
  return labels[type] || type;
}

