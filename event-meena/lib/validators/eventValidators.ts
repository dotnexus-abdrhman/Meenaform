// lib/validators/eventValidators.ts
// مدققات البيانات باستخدام Zod (Event Validators)

import { z } from "zod";

/**
 * مدقق بيانات إنشاء حدث
 */
export const eventFormSchema = z.object({
  title: z
    .string()
    .min(3, "العنوان يجب أن يكون 3 أحرف على الأقل")
    .max(200, "العنوان يجب ألا يتجاوز 200 حرف"),
  description: z
    .string()
    .min(10, "الوصف يجب أن يكون 10 أحرف على الأقل")
    .max(1000, "الوصف يجب ألا يتجاوز 1000 حرف"),
  type: z.enum(["survey", "poll", "form", "quiz"], {
    message: "نوع الحدث غير صالح",
  }),
  status: z.enum(["draft", "active", "archived"], {
    message: "حالة الحدث غير صالحة",
  }),
  coverImage: z.string().url("رابط الصورة غير صالح").optional().or(z.literal("")),
});

/**
 * مدقق بيانات إنشاء قسم
 */
export const sectionFormSchema = z.object({
  title: z
    .string()
    .min(2, "عنوان القسم يجب أن يكون حرفين على الأقل")
    .max(100, "عنوان القسم يجب ألا يتجاوز 100 حرف"),
  description: z
    .string()
    .max(500, "وصف القسم يجب ألا يتجاوز 500 حرف")
    .optional()
    .or(z.literal("")),
});

/**
 * مدقق بيانات سؤال
 */
export const questionSettingsSchema = z.object({
  type: z.literal("question"),
  label: z
    .string()
    .min(3, "عنوان السؤال يجب أن يكون 3 أحرف على الأقل")
    .max(500, "عنوان السؤال يجب ألا يتجاوز 500 حرف"),
  description: z.string().max(1000).optional(),
  questionType: z.enum([
    "short_text",
    "long_text",
    "single_choice",
    "multiple_choice",
    "dropdown",
    "yes_no",
    "linear_scale",
    "choice_grid",
    "number",
    "email",
    "phone",
    "date",
    "time",
  ]),
  required: z.boolean(),
  placeholder: z.string().optional(),
  choices: z
    .array(
      z.object({
        id: z.string(),
        label: z.string().min(1, "نص الخيار مطلوب"),
        value: z.string(),
        isCorrect: z.boolean().optional(),
      })
    )
    .optional(),
  scaleMin: z.number().optional(),
  scaleMax: z.number().optional(),
  scaleMinLabel: z.string().optional(),
  scaleMaxLabel: z.string().optional(),
  rows: z.array(z.string()).optional(),
  columns: z.array(z.string()).optional(),
  correctAnswer: z.union([z.string(), z.array(z.string()), z.number()]).optional(),
  points: z.number().optional(),
  minLength: z.number().optional(),
  maxLength: z.number().optional(),
  pattern: z.string().optional(),
});

/**
 * مدقق بيانات تقييم
 */
export const ratingSettingsSchema = z.object({
  type: z.literal("rating"),
  label: z
    .string()
    .min(3, "عنوان التقييم يجب أن يكون 3 أحرف على الأقل")
    .max(200, "عنوان التقييم يجب ألا يتجاوز 200 حرف"),
  description: z.string().max(500).optional(),
  ratingType: z.enum(["stars", "numbers", "emoji"]),
  required: z.boolean(),
  maxRating: z.number().min(1).max(10),
  emojiSet: z.array(z.string()).optional(),
});

/**
 * مدقق بيانات رفع ملف
 */
export const fileUploadSettingsSchema = z.object({
  type: z.enum(["pdf_upload", "image_upload", "video_upload"]),
  label: z
    .string()
    .min(3, "عنوان حقل الرفع يجب أن يكون 3 أحرف على الأقل")
    .max(200, "عنوان حقل الرفع يجب ألا يتجاوز 200 حرف"),
  description: z.string().max(500).optional(),
  required: z.boolean(),
  maxFileSize: z.number().min(1).max(100), // 1-100 MB
  acceptedFileTypes: z.array(z.string()).min(1),
  allowMultiple: z.boolean(),
  maxFiles: z.number().optional(),
});

/**
 * مدقق بيانات رابط
 */
export const linkSettingsSchema = z.object({
  type: z.literal("link"),
  label: z
    .string()
    .min(3, "عنوان حقل الرابط يجب أن يكون 3 أحرف على الأقل")
    .max(200, "عنوان حقل الرابط يجب ألا يتجاوز 200 حرف"),
  description: z.string().max(500).optional(),
  required: z.boolean(),
  placeholder: z.string().optional(),
  validateUrl: z.boolean(),
});

/**
 * مدقق بيانات جدول
 */
export const tableSettingsSchema = z.object({
  type: z.literal("table"),
  label: z
    .string()
    .min(3, "عنوان الجدول يجب أن يكون 3 أحرف على الأقل")
    .max(200, "عنوان الجدول يجب ألا يتجاوز 200 حرف"),
  description: z.string().max(500).optional(),
  tableType: z.enum(["simple", "calculation"]),
  columns: z
    .array(
      z.object({
        id: z.string(),
        label: z.string().min(1, "عنوان العمود مطلوب"),
        type: z.enum(["text", "number", "date", "select"]),
        width: z.number().optional(),
        required: z.boolean().optional(),
        options: z.array(z.string()).optional(),
      })
    )
    .min(1, "يجب إضافة عمود واحد على الأقل"),
  rows: z
    .array(
      z.object({
        id: z.string(),
        cells: z.record(z.string(), z.union([z.string(), z.number()])),
      })
    )
    .optional(),
  allowAddRows: z.boolean(),
  allowDeleteRows: z.boolean(),
  calculations: z
    .array(
      z.object({
        id: z.string(),
        type: z.enum(["sum", "avg", "min", "max", "count"]),
        columnId: z.string(),
        label: z.string(),
      })
    )
    .optional(),
});

/**
 * مدقق بيانات توقيع
 */
export const signatureSettingsSchema = z.object({
  type: z.literal("signature"),
  label: z
    .string()
    .min(3, "عنوان حقل التوقيع يجب أن يكون 3 أحرف على الأقل")
    .max(200, "عنوان حقل التوقيع يجب ألا يتجاوز 200 حرف"),
  description: z.string().max(500).optional(),
  required: z.boolean(),
  width: z.number().min(100).max(1000),
  height: z.number().min(50).max(500),
  penColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/, "لون غير صالح"),
  penWidth: z.number().min(1).max(10),
});

/**
 * مدقق بيانات نص
 */
export const textSettingsSchema = z.object({
  type: z.literal("text"),
  content: z.string().min(1, "محتوى النص مطلوب"),
  fontSize: z.enum(["small", "medium", "large"]).optional(),
  textAlign: z.enum(["left", "center", "right"]).optional(),
  textColor: z.string().optional(),
  backgroundColor: z.string().optional(),
});

/**
 * مدقق بيانات جهة اتصال
 */
export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, "الاسم يجب أن يكون حرفين على الأقل")
    .max(100, "الاسم يجب ألا يتجاوز 100 حرف"),
  email: z.string().email("البريد الإلكتروني غير صالح"),
  phone: z
    .string()
    .regex(/^(05|5)[0-9]{8}$/, "رقم الجوال غير صالح (يجب أن يبدأ بـ 05 ويتكون من 10 أرقام)"),
  company: z.string().max(100).optional().or(z.literal("")),
  jobTitle: z.string().max(100).optional().or(z.literal("")),
  notes: z.string().max(500).optional().or(z.literal("")),
  tags: z.array(z.string()).optional(),
  groupIds: z.array(z.string()).optional(),
});

/**
 * مدقق بيانات مجموعة
 */
export const groupFormSchema = z.object({
  name: z
    .string()
    .min(2, "اسم المجموعة يجب أن يكون حرفين على الأقل")
    .max(100, "اسم المجموعة يجب ألا يتجاوز 100 حرف"),
  description: z.string().max(500).optional().or(z.literal("")),
  color: z.string().regex(/^#[0-9A-Fa-f]{6}$/, "لون غير صالح").optional(),
  icon: z.string().optional(),
  contactIds: z.array(z.string()).optional(),
});

/**
 * مدقق رقم الجوال السعودي
 */
export const saudiPhoneSchema = z
  .string()
  .regex(/^(05|5)[0-9]{8}$/, "رقم الجوال غير صالح (يجب أن يبدأ بـ 05 ويتكون من 10 أرقام)");

/**
 * مدقق البريد الإلكتروني
 */
export const emailSchema = z.string().email("البريد الإلكتروني غير صالح");

/**
 * مدقق الرابط
 */
export const urlSchema = z.string().url("الرابط غير صالح");

