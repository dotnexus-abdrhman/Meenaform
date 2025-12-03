// types/section.ts
// تعريفات TypeScript للأقسام (Sections)

import { Component } from "./component";

/**
 * Section - قسم داخل الحدث
 * كل حدث يحتوي على أقسام متعددة
 * كل قسم يحتوي على مكونات متعددة
 */
export interface Section {
  id: string;
  eventId: string;
  title: string;
  description?: string;
  order: number; // ترتيب القسم (0, 1, 2, ...)
  components: Component[]; // المكونات داخل هذا القسم
  settings: SectionSettings;
  createdAt: string;
  updatedAt: string;
}

/**
 * إعدادات القسم
 */
export interface SectionSettings {
  // هل القسم مرئي؟
  visible: boolean;
  
  // هل يمكن تخطي هذا القسم؟
  skippable: boolean;
  
  // الحد الأدنى من المكونات المطلوب ملؤها
  minRequiredComponents?: number;
  
  // عرض شريط التقدم
  showProgress: boolean;
  
  // السماح بالعودة لهذا القسم
  allowBackNavigation: boolean;
  
  // لون الخلفية (اختياري)
  backgroundColor?: string;
  
  // صورة خلفية (اختياري)
  backgroundImage?: string;
}

/**
 * بيانات إنشاء قسم جديد
 */
export interface SectionFormData {
  title: string;
  description?: string;
  settings?: Partial<SectionSettings>;
}

/**
 * حالة Store الأقسام
 */
export interface SectionsState {
  sections: Section[];
  currentSection: Section | null;
  isLoading: boolean;
  error: string | null;
  
  // الوظائف
  fetchSections: (eventId: string) => Promise<void>;
  fetchSectionById: (id: string) => Promise<void>;
  createSection: (eventId: string, data: SectionFormData) => Promise<Section>;
  updateSection: (id: string, data: Partial<SectionFormData>) => Promise<void>;
  deleteSection: (id: string) => Promise<void>;
  reorderSections: (eventId: string, sectionIds: string[]) => Promise<void>;
  duplicateSection: (id: string) => Promise<Section>;
  clearSections: () => void;
}

/**
 * القيم الافتراضية لإعدادات القسم
 */
export const defaultSectionSettings: SectionSettings = {
  visible: true,
  skippable: false,
  showProgress: true,
  allowBackNavigation: true,
};

