// types/component.ts
// تعريفات TypeScript للمكونات (Components)

/**
 * أنواع المكونات المتاحة (9 أنواع + link للـ backward compatibility)
 */
export type ComponentType =
  | "question"          // سؤال (مع أنواع متعددة)
  | "rating"            // تقييم (نجوم/أرقام/إيموجي)
  | "pdf_upload"        // رفع ملف PDF
  | "image_upload"      // رفع صورة
  | "video_upload"      // رفع فيديو
  | "link"              // إرفاق رابط (مخفي من الـ UI - للـ backward compatibility)
  | "table"             // جدول (عادي/حسابي)
  | "signature"         // توقيع إلكتروني
  | "text"              // نص توضيحي
  | "display";          // عرض (صورة/PDF/رابط)

/**
 * أنواع الأسئلة
 */
export type QuestionType =
  | "short_text"        // نص قصير
  | "long_text"         // نص طويل
  | "single_choice"     // اختيار من متعدد
  | "multiple_choice"   // اختيار متعدد (Checkboxes)
  | "dropdown"          // قائمة منسدلة
  | "yes_no"            // نعم/لا
  | "linear_scale"      // مقياس خطي (1-5, 1-10)
  | "choice_grid"       // شبكة اختيارات
  | "number"            // رقم
  | "email"             // بريد إلكتروني
  | "phone"             // رقم جوال
  | "date"              // تاريخ
  | "time";             // وقت

/**
 * أنواع التقييم
 */
export type RatingType =
  | "stars"             // نجوم (⭐)
  | "numbers"           // أرقام (1-5, 1-10)
  | "emoji";            // إيموجي (😞 😐 😊)

/**
 * أنواع الجداول
 */
export type TableType =
  | "simple"            // جدول عادي
  | "calculation";      // جدول حسابي (يدعم SUM, AVG, MIN, MAX)

/**
 * أنواع العرض
 */
export type DisplayType =
  | "image"             // عرض صورة
  | "pdf"               // عرض PDF
  | "link";             // عرض رابط

/**
 * المكون الأساسي
 */
export interface Component {
  id: string;
  sectionId: string;
  type: ComponentType;
  order: number; // ترتيب المكون داخل القسم
  settings: ComponentSettings;
  createdAt: string;
  updatedAt: string;
}

/**
 * إعدادات المكون (تختلف حسب النوع)
 */
export type ComponentSettings =
  | QuestionSettings
  | RatingSettings
  | FileUploadSettings
  | LinkSettings
  | TableSettings
  | SignatureSettings
  | TextSettings
  | DisplaySettings;

/**
 * إعدادات مكون السؤال
 */
export interface QuestionSettings {
  type: "question";
  label: string;
  description?: string;
  questionType: QuestionType;
  required: boolean;
  placeholder?: string;
  
  // للاختيارات (single_choice, multiple_choice, dropdown)
  choices?: QuestionChoice[];
  
  // للمقياس الخطي
  scaleMin?: number;
  scaleMax?: number;
  scaleMinLabel?: string;
  scaleMaxLabel?: string;
  
  // لشبكة الاختيارات
  rows?: string[];
  columns?: string[];
  
  // للاختبارات
  correctAnswer?: string | string[] | number;
  points?: number;
  
  // Validation
  minLength?: number;
  maxLength?: number;
  pattern?: string; // Regex pattern
}

/**
 * خيار في السؤال
 */
export interface QuestionChoice {
  id: string;
  label: string;
  value: string;
  isCorrect?: boolean; // للاختبارات
}

/**
 * إعدادات مكون التقييم
 */
export interface RatingSettings {
  type: "rating";
  label: string;
  description?: string;
  ratingType: RatingType;
  required: boolean;
  
  // للنجوم والأرقام
  maxRating: number; // 5 أو 10
  
  // للإيموجي
  emojiSet?: string[]; // مثل: ["😞", "😐", "😊"]
}

/**
 * إعدادات رفع الملفات (PDF, Image, Video)
 */
export interface FileUploadSettings {
  type: "pdf_upload" | "image_upload" | "video_upload";
  label: string;
  description?: string;
  required: boolean;
  
  // الحد الأقصى لحجم الملف (بالميجابايت)
  maxFileSize: number;
  
  // أنواع الملفات المسموحة
  acceptedFileTypes: string[];
  
  // السماح برفع ملفات متعددة
  allowMultiple: boolean;
  
  // الحد الأقصى لعدد الملفات
  maxFiles?: number;
}

/**
 * إعدادات مكون الرابط
 */
export interface LinkSettings {
  type: "link";
  label: string;
  description?: string;
  required: boolean;
  placeholder?: string;
  
  // Validation
  validateUrl: boolean;
}

/**
 * إعدادات مكون الجدول
 */
export interface TableSettings {
  type: "table";
  label: string;
  description?: string;
  tableType: TableType;

  // تعريف الأعمدة
  columns: TableColumn[];

  // عدد الصفوف
  rowCount: number;

  // بيانات الجدول (يملأها منشئ الحدث)
  // tableData[rowIndex][columnId] = value
  tableData: Record<number, Record<string, string>>;

  // للجداول الحسابية
  calculations?: TableCalculation[];
}

/**
 * عمود في الجدول
 */
export interface TableColumn {
  id: string;
  label: string;
  type: "text" | "number" | "date" | "select";
  width?: number;
  required?: boolean;
  options?: string[]; // للـ select
}

/**
 * صف في الجدول
 */
export interface TableRow {
  id: string;
  cells: Record<string, string | number>;
}

/**
 * عملية حسابية في الجدول
 */
export interface TableCalculation {
  id: string;
  type: "sum" | "avg" | "min" | "max" | "count";
  columnId: string;
  label: string;
}

/**
 * إعدادات مكون التوقيع
 */
export interface SignatureSettings {
  type: "signature";
  label: string;
  description?: string;
  required: boolean;
  
  // عرض وارتفاع منطقة التوقيع
  width: number;
  height: number;
  
  // لون الخط
  penColor: string;
  
  // سمك الخط
  penWidth: number;
}

/**
 * إعدادات مكون النص التوضيحي
 */
export interface TextSettings {
  type: "text";
  content: string; // HTML content (Rich Text)

  // تنسيق النص
  fontSize?: "small" | "medium" | "large";
  textAlign?: "left" | "center" | "right";
  textColor?: string;
  backgroundColor?: string;
}

/**
 * إعدادات مكون العرض
 */
export interface DisplaySettings {
  type: "display";
  label: string;
  description?: string;
  displayType: DisplayType;

  // للصورة
  imageUrl?: string;
  imageFile?: File;
  imageAlt?: string;

  // للـ PDF
  pdfUrl?: string;
  pdfFile?: File;
  pdfFileName?: string;
  allowDownload?: boolean;

  // للرابط
  linkUrl?: string;
  linkText?: string;
  openInNewTab?: boolean;
}

/**
 * بيانات إنشاء مكون جديد
 */
export interface ComponentFormData {
  type: ComponentType;
  settings: Partial<ComponentSettings>;
}

/**
 * حالة Store المكونات
 */
export interface ComponentsState {
  components: Component[];
  currentComponent: Component | null;
  isLoading: boolean;
  error: string | null;
  
  // الوظائف
  fetchComponents: (sectionId: string) => Promise<void>;
  fetchComponentById: (id: string) => Promise<void>;
  createComponent: (sectionId: string, data: ComponentFormData) => Promise<Component>;
  updateComponent: (id: string, data: Partial<ComponentFormData>) => Promise<void>;
  deleteComponent: (id: string) => Promise<void>;
  reorderComponents: (sectionId: string, componentIds: string[]) => Promise<void>;
  duplicateComponent: (id: string) => Promise<Component>;
  clearComponents: () => void;
}

