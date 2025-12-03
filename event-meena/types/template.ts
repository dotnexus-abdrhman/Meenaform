// types/template.ts
// تعريفات TypeScript للقوالب الجاهزة (Templates) والقوالب المخصصة (User Templates)

import { Section } from "./section";
import { EventType, EventSettings } from "./event";

/**
 * فئات القوالب
 */
export type TemplateCategory =
  | "survey"            // استبيانات
  | "quiz"              // اختبارات
  | "form"              // نماذج
  | "poll"              // استطلاعات رأي
  | "evaluation"        // تقييمات
  | "registration"      // تسجيل
  | "feedback"          // ملاحظات
  | "other";            // أخرى

/**
 * مستوى صعوبة القالب
 */
export type TemplateDifficulty =
  | "beginner"          // مبتدئ
  | "intermediate"      // متوسط
  | "advanced";         // متقدم

/**
 * القالب الجاهز
 */
export interface Template {
  id: string;
  name: string;
  nameAr: string;
  description: string;
  descriptionAr: string;
  category: TemplateCategory;
  difficulty: TemplateDifficulty;
  
  // صورة معاينة القالب
  thumbnail: string;
  
  // عدد الأقسام والمكونات
  sectionsCount: number;
  componentsCount: number;
  
  // الوقت المتوقع للإكمال (بالدقائق)
  estimatedTime: number;
  
  // البنية الكاملة للقالب
  sections: TemplateSectionData[];
  
  // الإعدادات الافتراضية
  defaultSettings: TemplateDefaultSettings;
  
  // الإحصائيات
  usageCount: number; // عدد مرات الاستخدام
  rating: number; // التقييم (1-5)
  
  // العلامات (Tags)
  tags: string[];
  
  // هل القالب مميز؟
  featured: boolean;
  
  // هل القالب مجاني؟
  free: boolean;
  
  createdAt: string;
  updatedAt: string;
}

/**
 * بيانات قسم في القالب
 */
export interface TemplateSectionData {
  title: string;
  description?: string;
  order: number;
  components: TemplateComponentData[];
  settings: {
    visible: boolean;
    skippable: boolean;
    showProgress: boolean;
    allowBackNavigation: boolean;
  };
}

/**
 * بيانات مكون في القالب
 */
export interface TemplateComponentData {
  type: string;
  order: number;
  settings: Record<string, any>;
}

/**
 * الإعدادات الافتراضية للقالب
 */
export interface TemplateDefaultSettings {
  // نوع الحدث
  eventType: "survey" | "quiz" | "form" | "poll";
  
  // هل يتطلب تسجيل دخول؟
  requireLogin: boolean;
  
  // السماح بمحاولة واحدة فقط؟
  singleAttempt: boolean;
  
  // عرض النتائج للمشاركين؟
  showResults: boolean;
  
  // رسالة الشكر الافتراضية
  thankYouMessage: string;
  thankYouMessageAr: string;
}

/**
 * فلتر البحث عن القوالب
 */
export interface TemplateFilter {
  category?: TemplateCategory;
  difficulty?: TemplateDifficulty;
  search?: string;
  featured?: boolean;
  free?: boolean;
  sortBy?: "popular" | "recent" | "rating" | "name";
  sortOrder?: "asc" | "desc";
}

/**
 * بيانات إنشاء حدث من قالب
 */
export interface CreateFromTemplateData {
  templateId: string;
  eventName: string;
  eventDescription?: string;
  customizations?: {
    // تخصيصات على القالب
    modifySections?: boolean;
    modifyComponents?: boolean;
    modifySettings?: boolean;
  };
}

/**
 * حالة Store القوالب
 */
export interface TemplatesState {
  templates: Template[];
  currentTemplate: Template | null;
  filteredTemplates: Template[];
  isLoading: boolean;
  error: string | null;
  filters: TemplateFilter;
  
  // الوظائف
  fetchTemplates: () => Promise<void>;
  fetchTemplateById: (id: string) => Promise<void>;
  filterTemplates: (filters: TemplateFilter) => void;
  searchTemplates: (query: string) => void;
  createEventFromTemplate: (data: CreateFromTemplateData) => Promise<string>; // returns eventId
  incrementUsageCount: (templateId: string) => Promise<void>;
  rateTemplate: (templateId: string, rating: number) => Promise<void>;
  clearTemplates: () => void;
}

/**
 * القوالب المميزة (Featured Templates)
 */
export const FEATURED_TEMPLATES = [
  "customer-satisfaction-survey",
  "student-quiz",
  "registration-form",
  "employee-evaluation",
  "event-poll",
] as const;

/**
 * فئات القوالب مع الترجمة
 */
export const TEMPLATE_CATEGORIES: Record<TemplateCategory, { en: string; ar: string }> = {
  survey: { en: "Survey", ar: "استبيان" },
  quiz: { en: "Quiz", ar: "اختبار" },
  form: { en: "Form", ar: "نموذج" },
  poll: { en: "Poll", ar: "استطلاع رأي" },
  evaluation: { en: "Evaluation", ar: "تقييم" },
  registration: { en: "Registration", ar: "تسجيل" },
  feedback: { en: "Feedback", ar: "ملاحظات" },
  other: { en: "Other", ar: "أخرى" },
};

/**
 * مستويات الصعوبة مع الترجمة
 */
export const TEMPLATE_DIFFICULTIES: Record<TemplateDifficulty, { en: string; ar: string }> = {
  beginner: { en: "Beginner", ar: "مبتدئ" },
  intermediate: { en: "Intermediate", ar: "متوسط" },
  advanced: { en: "Advanced", ar: "متقدم" },
};

// ============================================
// القوالب المخصصة (User Templates)
// ============================================

/**
 * القالب المخصص (User Template)
 */
export interface UserTemplate {
  id: string;
  userId: string;
  name: string;
  description: string;
  type: EventType;
  icon?: string;
  coverImage?: string;

  // البنية الكاملة
  sections: Section[];

  // الإعدادات
  settings: Partial<EventSettings>;

  // التواريخ
  createdAt: string;
  updatedAt: string;

  // الإحصائيات
  usageCount: number;

  // الحدث الأصلي (اختياري)
  sourceEventId?: string;
  sourceEventTitle?: string;

  // العلامات (Tags)
  tags?: string[];

  // هل القالب مفضل؟
  isFavorite?: boolean;
}

/**
 * بيانات إنشاء قالب مخصص
 */
export interface CreateUserTemplateData {
  name: string;
  description: string;
  type: EventType;
  icon?: string;
  coverImage?: string;
  sections: Section[];
  settings: Partial<EventSettings>;
  sourceEventId?: string;
  sourceEventTitle?: string;
  tags?: string[];
}

/**
 * بيانات تحديث قالب مخصص
 */
export interface UpdateUserTemplateData {
  name?: string;
  description?: string;
  icon?: string;
  coverImage?: string;
  tags?: string[];
  isFavorite?: boolean;
}

