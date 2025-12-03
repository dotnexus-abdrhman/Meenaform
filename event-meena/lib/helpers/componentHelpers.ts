// lib/helpers/componentHelpers.ts
// دوال مساعدة للمكونات (Component Helpers)

import { Component, ComponentType, ComponentSettings } from "@/types/component";
import { DEFAULT_COMPONENT_SETTINGS } from "@/lib/constants/components";
import { v4 as uuidv4 } from "uuid";

/**
 * إنشاء مكون جديد
 */
export function createComponent(
  sectionId: string,
  type: ComponentType,
  order: number,
  customSettings?: Partial<ComponentSettings>
): Component {
  const defaultSettings = DEFAULT_COMPONENT_SETTINGS[type];
  
  return {
    id: uuidv4(),
    sectionId,
    type,
    order,
    settings: {
      ...defaultSettings,
      ...customSettings,
    } as ComponentSettings,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

/**
 * نسخ مكون
 */
export function duplicateComponent(component: Component, newSectionId?: string): Component {
  return {
    ...component,
    id: uuidv4(),
    sectionId: newSectionId || component.sectionId,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

/**
 * إعادة ترتيب المكونات
 */
export function reorderComponents(components: Component[], fromIndex: number, toIndex: number): Component[] {
  const result = Array.from(components);
  const [removed] = result.splice(fromIndex, 1);
  result.splice(toIndex, 0, removed);
  
  // تحديث order لكل مكون
  return result.map((component, index) => ({
    ...component,
    order: index,
    updatedAt: new Date().toISOString(),
  }));
}

/**
 * نقل مكون من قسم لآخر
 */
export function moveComponentToSection(
  component: Component,
  targetSectionId: string,
  targetOrder: number
): Component {
  return {
    ...component,
    sectionId: targetSectionId,
    order: targetOrder,
    updatedAt: new Date().toISOString(),
  };
}

/**
 * التحقق من صحة المكون
 */
export function validateComponent(component: Component): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  // التحقق من النوع
  if (!component.type) {
    errors.push("نوع المكون مطلوب");
  }
  
  // التحقق من الإعدادات حسب النوع
  const settings = component.settings;

  if (settings.type === "question") {
    if (!settings.label || settings.label.trim() === "") {
      errors.push("عنوان السؤال مطلوب");
    }
    if (!settings.questionType) {
      errors.push("نوع السؤال مطلوب");
    }
    // التحقق من الخيارات للأسئلة الاختيارية
    if (
      ["single_choice", "multiple_choice", "dropdown"].includes(settings.questionType) &&
      (!settings.choices || settings.choices.length === 0)
    ) {
      errors.push("يجب إضافة خيارات للسؤال");
    }
  }

  if (settings.type === "rating") {
    if (!settings.label || settings.label.trim() === "") {
      errors.push("عنوان التقييم مطلوب");
    }
    if (!settings.maxRating || settings.maxRating < 1) {
      errors.push("الحد الأقصى للتقييم يجب أن يكون أكبر من 0");
    }
  }

  if (settings.type === "pdf_upload" || settings.type === "image_upload" || settings.type === "video_upload") {
    if (!settings.label || settings.label.trim() === "") {
      errors.push("عنوان حقل الرفع مطلوب");
    }
    if (!settings.maxFileSize || settings.maxFileSize <= 0) {
      errors.push("الحد الأقصى لحجم الملف يجب أن يكون أكبر من 0");
    }
  }

  if (settings.type === "table") {
    if (!settings.columns || settings.columns.length === 0) {
      errors.push("يجب إضافة أعمدة للجدول");
    }
  }

  if (settings.type === "signature") {
    if (!settings.width || settings.width <= 0) {
      errors.push("عرض منطقة التوقيع يجب أن يكون أكبر من 0");
    }
    if (!settings.height || settings.height <= 0) {
      errors.push("ارتفاع منطقة التوقيع يجب أن يكون أكبر من 0");
    }
  }

  if (settings.type === "text") {
    if (!settings.content || settings.content.trim() === "") {
      errors.push("محتوى النص مطلوب");
    }
  }
  
  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * الحصول على اسم المكون
 */
export function getComponentLabel(component: Component): string {
  const settings = component.settings;
  
  if ("label" in settings && settings.label) {
    return settings.label;
  }
  
  if (settings.type === "text") {
    // استخراج أول 50 حرف من المحتوى
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = settings.content;
    const text = tempDiv.textContent || tempDiv.innerText || "";
    return text.substring(0, 50) + (text.length > 50 ? "..." : "");
  }
  
  return "مكون بدون عنوان";
}

/**
 * الحصول على أيقونة المكون
 */
export function getComponentIcon(type: ComponentType): string {
  const iconMap: Record<ComponentType, string> = {
    question: "MessageSquare",
    rating: "Star",
    pdf_upload: "FileText",
    image_upload: "Image",
    video_upload: "Video",
    link: "Link",
    table: "Table",
    signature: "PenTool",
    text: "Type",
    display: "Monitor",
  };

  return iconMap[type] || "HelpCircle";
}

/**
 * الحصول على لون المكون
 */
export function getComponentColor(type: ComponentType): string {
  const colorMap: Record<ComponentType, string> = {
    question: "#1a56db",
    rating: "#ea580c",
    pdf_upload: "#dc2626",
    image_upload: "#16a34a",
    video_upload: "#9333ea",
    link: "#0891b2",
    table: "#ca8a04",
    signature: "#4f46e5",
    text: "#64748b",
    display: "#6366f1",
  };

  return colorMap[type] || "#64748b";
}

/**
 * فلترة المكونات حسب القسم
 */
export function filterComponentsBySection(components: Component[], sectionId: string): Component[] {
  return components
    .filter((c) => c.sectionId === sectionId)
    .sort((a, b) => a.order - b.order);
}

/**
 * حساب عدد المكونات المطلوبة في قسم
 */
export function countRequiredComponents(components: Component[]): number {
  return components.filter((c) => {
    const settings = c.settings;
    return "required" in settings && settings.required === true;
  }).length;
}

/**
 * التحقق من إمكانية حذف مكون
 */
export function canDeleteComponent(component: Component, minComponents: number, totalComponents: number): boolean {
  return totalComponents > minComponents;
}

/**
 * تصدير المكون إلى JSON
 */
export function exportComponentToJSON(component: Component): string {
  return JSON.stringify(component, null, 2);
}

/**
 * استيراد مكون من JSON
 */
export function importComponentFromJSON(json: string, sectionId: string): Component | null {
  try {
    const data = JSON.parse(json);
    return {
      ...data,
      id: uuidv4(),
      sectionId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  } catch (error) {
    console.error("Error importing component:", error);
    return null;
  }
}

/**
 * الحصول على ملخص المكون
 */
export function getComponentSummary(component: Component): string {
  const settings = component.settings;
  
  if (settings.type === "question") {
    return `سؤال: ${settings.label} (${settings.questionType})`;
  }
  
  if (settings.type === "rating") {
    return `تقييم: ${settings.label} (${settings.ratingType})`;
  }
  
  if (["pdf_upload", "image_upload", "video_upload"].includes(settings.type)) {
    return `رفع ملف: ${(settings as any).label}`;
  }

  if (settings.type === "link") {
    return `رابط: ${(settings as any).label}`;
  }

  if (settings.type === "table") {
    return `جدول: ${(settings as any).label} (${(settings as any).columns.length} أعمدة)`;
  }

  if (settings.type === "signature") {
    return `توقيع: ${(settings as any).label}`;
  }
  
  if (settings.type === "text") {
    return "نص توضيحي";
  }

  if (settings.type === "display") {
    return `عرض: ${(settings as any).label || "محتوى"}`;
  }

  return "مكون";
}

