// lib/constants/components.ts
// ثوابت المكونات (Components Constants)

import { ComponentType, QuestionType, RatingType, TableType } from "@/types/component";

/**
 * معلومات نوع المكون
 */
export interface ComponentTypeInfo {
  type: ComponentType;
  label: string;
  labelAr: string;
  icon: string;
  description: string;
  descriptionAr: string;
  category: "input" | "media" | "display";
  color: string;
}

/**
 * جميع أنواع المكونات (9 أنواع)
 */
export const COMPONENT_TYPES: ComponentTypeInfo[] = [
  {
    type: "question",
    label: "Question",
    labelAr: "سؤال",
    icon: "MessageSquare",
    description: "Add various types of questions",
    descriptionAr: "إضافة أنواع مختلفة من الأسئلة",
    category: "input",
    color: "#1a56db",
  },
  {
    type: "rating",
    label: "Rating",
    labelAr: "تقييم",
    icon: "Star",
    description: "Add star, number, or emoji rating",
    descriptionAr: "إضافة تقييم بالنجوم أو الأرقام أو الإيموجي",
    category: "input",
    color: "#ea580c",
  },
  {
    type: "pdf_upload",
    label: "PDF Upload",
    labelAr: "رفع PDF",
    icon: "FileText",
    description: "Allow users to upload PDF files",
    descriptionAr: "السماح للمستخدمين برفع ملفات PDF",
    category: "media",
    color: "#dc2626",
  },
  {
    type: "image_upload",
    label: "Image Upload",
    labelAr: "رفع صورة",
    icon: "Image",
    description: "Allow users to upload images",
    descriptionAr: "السماح للمستخدمين برفع الصور",
    category: "media",
    color: "#16a34a",
  },
  {
    type: "video_upload",
    label: "Video Upload",
    labelAr: "رفع فيديو",
    icon: "Video",
    description: "Allow users to upload videos",
    descriptionAr: "السماح للمستخدمين برفع الفيديوهات",
    category: "media",
    color: "#9333ea",
  },
  {
    type: "table",
    label: "Table",
    labelAr: "جدول",
    icon: "Table",
    description: "Add a table with calculations",
    descriptionAr: "إضافة جدول مع عمليات حسابية",
    category: "input",
    color: "#ca8a04",
  },
  {
    type: "signature",
    label: "Signature",
    labelAr: "توقيع",
    icon: "PenTool",
    description: "Add electronic signature field",
    descriptionAr: "إضافة حقل توقيع إلكتروني",
    category: "input",
    color: "#4f46e5",
  },
  {
    type: "text",
    label: "Text",
    labelAr: "نص",
    icon: "Type",
    description: "Add formatted text content",
    descriptionAr: "إضافة نص منسق",
    category: "display",
    color: "#64748b",
  },
  {
    type: "display",
    label: "Display",
    labelAr: "عرض",
    icon: "Monitor",
    description: "Display image, PDF, or link",
    descriptionAr: "عرض صورة أو PDF أو رابط",
    category: "display",
    color: "#6366f1",
  },
];

/**
 * أنواع الأسئلة
 */
export const QUESTION_TYPES: Array<{
  type: QuestionType;
  label: string;
  labelAr: string;
  icon: string;
}> = [
  { type: "short_text", label: "Short Text", labelAr: "نص قصير", icon: "Type" },
  { type: "long_text", label: "Long Text", labelAr: "نص طويل", icon: "AlignLeft" },
  { type: "single_choice", label: "Single Choice", labelAr: "اختيار من متعدد", icon: "Circle" },
  { type: "multiple_choice", label: "Multiple Choice", labelAr: "اختيار متعدد", icon: "CheckSquare" },
  { type: "dropdown", label: "Dropdown", labelAr: "قائمة منسدلة", icon: "ChevronDown" },
  { type: "yes_no", label: "Yes/No", labelAr: "نعم/لا", icon: "ToggleLeft" },
  { type: "linear_scale", label: "Linear Scale", labelAr: "مقياس خطي", icon: "Sliders" },
  { type: "choice_grid", label: "Choice Grid", labelAr: "شبكة اختيارات", icon: "Grid" },
  { type: "number", label: "Number", labelAr: "رقم", icon: "Hash" },
  { type: "email", label: "Email", labelAr: "بريد إلكتروني", icon: "Mail" },
  { type: "phone", label: "Phone", labelAr: "رقم جوال", icon: "Phone" },
  { type: "date", label: "Date", labelAr: "تاريخ", icon: "Calendar" },
  { type: "time", label: "Time", labelAr: "وقت", icon: "Clock" },
];

/**
 * أنواع التقييم
 */
export const RATING_TYPES: Array<{
  type: RatingType;
  label: string;
  labelAr: string;
  icon: string;
}> = [
  { type: "stars", label: "Stars", labelAr: "نجوم", icon: "Star" },
  { type: "numbers", label: "Numbers", labelAr: "أرقام", icon: "Hash" },
  { type: "emoji", label: "Emoji", labelAr: "إيموجي", icon: "Smile" },
];

/**
 * أنواع الجداول
 */
export const TABLE_TYPES: Array<{
  type: TableType;
  label: string;
  labelAr: string;
  icon: string;
}> = [
  { type: "simple", label: "Simple Table", labelAr: "جدول عادي", icon: "Table" },
  { type: "calculation", label: "Calculation Table", labelAr: "جدول حسابي", icon: "Calculator" },
];

/**
 * الإعدادات الافتراضية لكل نوع مكون
 */
export const DEFAULT_COMPONENT_SETTINGS = {
  question: {
    type: "question" as const,
    label: "سؤال جديد",
    questionType: "short_text" as QuestionType,
    required: false,
    placeholder: "أدخل إجابتك هنا...",
  },
  rating: {
    type: "rating" as const,
    label: "تقييم جديد",
    ratingType: "stars" as RatingType,
    required: false,
    maxRating: 5,
  },
  pdf_upload: {
    type: "pdf_upload" as const,
    label: "رفع ملف PDF",
    required: false,
    maxFileSize: 10, // 10 MB
    acceptedFileTypes: [".pdf"],
    allowMultiple: false,
  },
  image_upload: {
    type: "image_upload" as const,
    label: "رفع صورة",
    required: false,
    maxFileSize: 5, // 5 MB
    acceptedFileTypes: [".jpg", ".jpeg", ".png", ".gif", ".webp"],
    allowMultiple: false,
  },
  video_upload: {
    type: "video_upload" as const,
    label: "رفع فيديو",
    required: false,
    maxFileSize: 50, // 50 MB
    acceptedFileTypes: [".mp4", ".mov", ".avi", ".mkv", ".webm"],
    allowMultiple: false,
  },
  link: {
    type: "link" as const,
    label: "رابط",
    url: "",
    required: false,
  },
  table: {
    type: "table" as const,
    label: "جدول جديد",
    tableType: "simple" as TableType,
    columns: [
      { id: "col1", label: "العمود 1", type: "text" as const, width: 200 },
      { id: "col2", label: "العمود 2", type: "text" as const, width: 200 },
    ],
    rows: [],
    allowAddRows: true,
    allowDeleteRows: true,
  },
  signature: {
    type: "signature" as const,
    label: "التوقيع الإلكتروني",
    required: false,
    width: 500,
    height: 200,
    penColor: "#000000",
    penWidth: 2,
  },
  text: {
    type: "text" as const,
    content: "<p>أدخل النص هنا...</p>",
    fontSize: "medium" as const,
    textAlign: "right" as const,
  },
  display: {
    type: "display" as const,
    label: "عرض محتوى",
    displayType: "image" as const,
  },
};

/**
 * الحد الأقصى لحجم الملفات (بالميجابايت)
 */
export const MAX_FILE_SIZES = {
  pdf: 10,
  image: 5,
  video: 50,
};

/**
 * أنواع الملفات المقبولة
 */
export const ACCEPTED_FILE_TYPES = {
  pdf: [".pdf"],
  image: [".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg"],
  video: [".mp4", ".mov", ".avi", ".mkv", ".webm"],
};

