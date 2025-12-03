// types/response.ts
// تعريفات TypeScript للردود والنتائج (Responses)

/**
 * حالة الرد
 */
export type ResponseStatus =
  | "in_progress"       // قيد الإكمال
  | "completed"         // مكتمل
  | "abandoned";        // متروك (لم يكمل)

/**
 * الرد على الحدث
 */
export interface Response {
  id: string;
  eventId: string;
  
  // معلومات المشارك
  participant: ParticipantInfo;
  
  // الإجابات على جميع المكونات
  answers: ComponentAnswer[];
  
  // الحالة
  status: ResponseStatus;
  
  // الوقت المستغرق (بالثواني)
  timeSpent: number;
  
  // للاختبارات
  score?: ResponseScore;
  
  // التقدم (0-100)
  progress: number;
  
  // البيانات الوصفية
  metadata: ResponseMetadata;
  
  // التواريخ
  startedAt: string;
  completedAt?: string;
  lastUpdatedAt: string;
}

/**
 * معلومات المشارك
 */
export interface ParticipantInfo {
  // إذا كان مسجل دخول
  userId?: string;
  
  // المعلومات الأساسية
  name?: string;
  email?: string;
  phone?: string;
  
  // معلومات إضافية
  ipAddress?: string;
  userAgent?: string;
  location?: {
    country?: string;
    city?: string;
  };
}

/**
 * إجابة على مكون واحد
 */
export interface ComponentAnswer {
  componentId: string;
  componentType: string;
  answer: AnswerValue;
  
  // الوقت المستغرق على هذا المكون (بالثواني)
  timeSpent: number;
  
  // للاختبارات
  isCorrect?: boolean;
  pointsEarned?: number;
  
  answeredAt: string;
}

/**
 * قيمة الإجابة (تختلف حسب نوع المكون)
 */
export type AnswerValue =
  | string                          // نص
  | number                          // رقم
  | boolean                         // نعم/لا
  | string[]                        // اختيار متعدد
  | FileAnswer                      // ملف مرفوع
  | FileAnswer[]                    // ملفات متعددة
  | TableAnswer                     // جدول
  | SignatureAnswer                 // توقيع
  | Record<string, any>;            // أي بيانات أخرى

/**
 * ملف مرفوع
 */
export interface FileAnswer {
  fileName: string;
  fileSize: number;
  fileType: string;
  fileUrl: string;
  uploadedAt: string;
}

/**
 * إجابة جدول
 */
export interface TableAnswer {
  rows: TableRowAnswer[];
  calculations?: Record<string, number>; // نتائج الحسابات
}

/**
 * صف في إجابة الجدول
 */
export interface TableRowAnswer {
  rowId: string;
  cells: Record<string, string | number>;
}

/**
 * توقيع إلكتروني
 */
export interface SignatureAnswer {
  signatureData: string; // Base64 image data
  signedAt: string;
}

/**
 * درجة الاختبار
 */
export interface ResponseScore {
  totalPoints: number;
  earnedPoints: number;
  percentage: number;
  grade?: string; // A, B, C, etc.
  passed: boolean;
}

/**
 * البيانات الوصفية للرد
 */
export interface ResponseMetadata {
  // الجهاز المستخدم
  device: "desktop" | "mobile" | "tablet";
  
  // المتصفح
  browser: string;
  
  // نظام التشغيل
  os: string;
  
  // اللغة
  language: string;
  
  // المصدر (من أين جاء المشارك)
  referrer?: string;
  
  // معرف الجلسة
  sessionId: string;
}

/**
 * إحصائيات الردود
 */
export interface ResponsesStatistics {
  totalResponses: number;
  completedResponses: number;
  inProgressResponses: number;
  abandonedResponses: number;
  
  // معدلات
  completionRate: number; // نسبة الإكمال
  averageTimeSpent: number; // متوسط الوقت (بالثواني)
  
  // للاختبارات
  averageScore?: number;
  highestScore?: number;
  lowestScore?: number;
  passRate?: number;
  
  // التوزيع الزمني
  responsesPerDay: Record<string, number>;
  responsesPerHour: Record<number, number>;
  
  // التوزيع الجغرافي
  responsesByCountry: Record<string, number>;
  
  // التوزيع حسب الجهاز
  responsesByDevice: Record<string, number>;
}

/**
 * تحليل مكون واحد
 */
export interface ComponentAnalytics {
  componentId: string;
  componentType: string;
  componentLabel: string;
  
  // عدد الإجابات
  totalAnswers: number;
  
  // متوسط الوقت المستغرق
  averageTimeSpent: number;
  
  // للأسئلة
  answerDistribution?: Record<string, number>; // توزيع الإجابات
  
  // للتقييمات
  averageRating?: number;
  ratingDistribution?: Record<number, number>;
  
  // للاختبارات
  correctAnswersCount?: number;
  incorrectAnswersCount?: number;
  accuracyRate?: number;
  
  // الإجابات الأكثر شيوعاً
  topAnswers?: Array<{ answer: string; count: number; percentage: number }>;
}

/**
 * فلتر الردود
 */
export interface ResponsesFilter {
  status?: ResponseStatus;
  dateFrom?: string;
  dateTo?: string;
  minScore?: number;
  maxScore?: number;
  search?: string; // البحث في اسم أو بريد المشارك
  sortBy?: "date" | "score" | "time" | "name";
  sortOrder?: "asc" | "desc";
}

/**
 * بيانات تصدير الردود
 */
export interface ExportResponsesData {
  eventId: string;
  format: "excel" | "csv" | "pdf" | "json";
  filters?: ResponsesFilter;
  includeMetadata: boolean;
  includeFiles: boolean;
}

/**
 * حالة Store الردود
 */
export interface ResponsesState {
  responses: Response[];
  currentResponse: Response | null;
  statistics: ResponsesStatistics | null;
  componentAnalytics: ComponentAnalytics[];
  isLoading: boolean;
  error: string | null;
  filters: ResponsesFilter;
  
  // الوظائف
  fetchResponses: (eventId: string) => Promise<void>;
  fetchResponseById: (id: string) => Promise<void>;
  fetchStatistics: (eventId: string) => Promise<void>;
  fetchComponentAnalytics: (eventId: string) => Promise<void>;
  createResponse: (eventId: string, participantInfo: ParticipantInfo) => Promise<Response>;
  updateResponse: (id: string, answers: ComponentAnswer[]) => Promise<void>;
  submitResponse: (id: string) => Promise<void>;
  deleteResponse: (id: string) => Promise<void>;
  filterResponses: (filters: ResponsesFilter) => void;
  exportResponses: (data: ExportResponsesData) => Promise<Blob>;
  clearResponses: () => void;
}

