// types/participation.ts
// تعريفات TypeScript للأحداث التي شاركت فيها

import { EventType } from "./event";
import { ResponseStatus } from "./response";
import { ComponentType, QuestionType } from "./component";

/**
 * حدث شاركت فيه
 */
export interface ParticipatedEvent {
  // معرفات
  responseId: string;
  eventId: string;
  
  // معلومات الحدث
  eventTitle: string;
  eventDescription?: string;
  eventType: EventType;
  ownerName: string;
  
  // معلومات المشاركة
  participatedAt: string;
  completedAt?: string;
  durationSeconds?: number;
  status: ResponseStatus;
  
  // نتائج الاختبار (إن وجدت)
  score?: number;
  totalPoints?: number;
  percentage?: number;
  isPassed?: boolean;
  
  // الإجابات
  answers: Record<string, any>;
}

/**
 * تفاصيل المشاركة مع الأقسام والمكونات
 */
export interface ParticipationDetails extends ParticipatedEvent {
  sections: ParticipationSection[];
}

/**
 * قسم في تفاصيل المشاركة
 */
export interface ParticipationSection {
  id: string;
  title: string;
  description?: string;
  order: number;
  components: ParticipationComponent[];
}

/**
 * مكون في تفاصيل المشاركة
 */
export interface ParticipationComponent {
  id: string;
  type: ComponentType;
  order: number;
  settings: ParticipationComponentSettings;
}

/**
 * إعدادات المكون في المشاركة
 */
export interface ParticipationComponentSettings {
  label?: string;
  description?: string;
  questionType?: QuestionType;
  required?: boolean;
  choices?: Array<{
    id: string;
    label: string;
    value: string;
    isCorrect?: boolean;
  }>;
  // إعدادات إضافية حسب نوع المكون
  [key: string]: any;
}

/**
 * فلتر المشاركات
 */
export interface ParticipationsFilter {
  eventType?: EventType;
  status?: ResponseStatus;
  search?: string;
  sortBy?: "date" | "title" | "type";
  sortOrder?: "asc" | "desc";
}

