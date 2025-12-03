// types/contact.ts
// تعريفات TypeScript لجهات الاتصال والمجموعات (Contacts & Groups)

/**
 * جهة اتصال
 */
export interface Contact {
  id: string;
  userId: string; // صاحب جهة الاتصال
  
  // المعلومات الأساسية
  name: string;
  email: string;
  phone: string;
  
  // معلومات إضافية
  company?: string;
  jobTitle?: string;
  notes?: string;
  
  // العلامات (Tags)
  tags: string[];
  
  // المجموعات التي ينتمي إليها
  groupIds: string[];
  
  // الإحصائيات
  stats: ContactStats;
  
  // التواريخ
  createdAt: string;
  updatedAt: string;
}

/**
 * إحصائيات جهة الاتصال
 */
export interface ContactStats {
  // عدد الأحداث المرسلة
  eventsSent: number;
  
  // عدد الأحداث المكتملة
  eventsCompleted: number;
  
  // معدل الاستجابة
  responseRate: number;
  
  // آخر تفاعل
  lastInteraction?: string;
}

/**
 * المجموعة
 */
export interface Group {
  id: string;
  userId: string; // صاحب المجموعة
  
  // المعلومات الأساسية
  name: string;
  description?: string;
  
  // اللون (للتمييز البصري)
  color: string;
  
  // الأيقونة
  icon?: string;
  
  // جهات الاتصال في المجموعة
  contactIds: string[];
  
  // عدد الأعضاء
  membersCount: number;
  
  // الإحصائيات
  stats: GroupStats;
  
  // التواريخ
  createdAt: string;
  updatedAt: string;
}

/**
 * إحصائيات المجموعة
 */
export interface GroupStats {
  // عدد الأحداث المرسلة لهذه المجموعة
  eventsSent: number;
  
  // متوسط معدل الاستجابة
  averageResponseRate: number;
  
  // آخر حدث مرسل
  lastEventSent?: string;
}

/**
 * بيانات إنشاء جهة اتصال
 */
export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  company?: string;
  jobTitle?: string;
  notes?: string;
  tags?: string[];
  groupIds?: string[];
}

/**
 * بيانات إنشاء مجموعة
 */
export interface GroupFormData {
  name: string;
  description?: string;
  color?: string;
  icon?: string;
  contactIds?: string[];
}

/**
 * بيانات استيراد جهات الاتصال
 */
export interface ImportContactsData {
  file: File;
  format: "excel" | "csv";
  mapping: {
    nameColumn: string;
    emailColumn: string;
    phoneColumn: string;
    companyColumn?: string;
    jobTitleColumn?: string;
  };
  skipFirstRow: boolean;
  addToGroupId?: string;
}

/**
 * نتيجة الاستيراد
 */
export interface ImportResult {
  success: boolean;
  totalRows: number;
  successfulImports: number;
  failedImports: number;
  errors: ImportError[];
  importedContacts: Contact[];
}

/**
 * خطأ في الاستيراد
 */
export interface ImportError {
  row: number;
  field: string;
  error: string;
  value: string;
}

/**
 * فلتر جهات الاتصال
 */
export interface ContactsFilter {
  search?: string;
  groupId?: string;
  tags?: string[];
  hasEmail?: boolean;
  hasPhone?: boolean;
  sortBy?: "name" | "email" | "createdAt" | "lastInteraction";
  sortOrder?: "asc" | "desc";
}

/**
 * فلتر المجموعات
 */
export interface GroupsFilter {
  search?: string;
  sortBy?: "name" | "membersCount" | "createdAt";
  sortOrder?: "asc" | "desc";
}

/**
 * بيانات إرسال حدث لجهات اتصال
 */
export interface SendEventToContactsData {
  eventId: string;
  recipients: {
    contactIds?: string[];
    groupIds?: string[];
  };
  sendMethod: "email" | "sms" | "both";
  customMessage?: string;
  scheduleAt?: string; // إرسال مجدول
}

/**
 * نتيجة الإرسال
 */
export interface SendResult {
  success: boolean;
  totalRecipients: number;
  successfulSends: number;
  failedSends: number;
  errors: SendError[];
}

/**
 * خطأ في الإرسال
 */
export interface SendError {
  contactId: string;
  contactName: string;
  error: string;
}

/**
 * حالة Store جهات الاتصال
 */
export interface ContactsState {
  contacts: Contact[];
  currentContact: Contact | null;
  isLoading: boolean;
  error: string | null;
  filters: ContactsFilter;
  
  // الوظائف
  fetchContacts: () => Promise<void>;
  fetchContactById: (id: string) => Promise<void>;
  createContact: (data: ContactFormData) => Promise<Contact>;
  updateContact: (id: string, data: Partial<ContactFormData>) => Promise<void>;
  deleteContact: (id: string) => Promise<void>;
  deleteMultipleContacts: (ids: string[]) => Promise<void>;
  importContacts: (data: ImportContactsData) => Promise<ImportResult>;
  exportContacts: (format: "excel" | "csv") => Promise<Blob>;
  filterContacts: (filters: ContactsFilter) => void;
  searchContacts: (query: string) => void;
  addToGroup: (contactIds: string[], groupId: string) => Promise<void>;
  removeFromGroup: (contactIds: string[], groupId: string) => Promise<void>;
  clearContacts: () => void;
}

/**
 * حالة Store المجموعات
 */
export interface GroupsState {
  groups: Group[];
  currentGroup: Group | null;
  isLoading: boolean;
  error: string | null;
  filters: GroupsFilter;
  
  // الوظائف
  fetchGroups: () => Promise<void>;
  fetchGroupById: (id: string) => Promise<void>;
  createGroup: (data: GroupFormData) => Promise<Group>;
  updateGroup: (id: string, data: Partial<GroupFormData>) => Promise<void>;
  deleteGroup: (id: string) => Promise<void>;
  addContactsToGroup: (groupId: string, contactIds: string[]) => Promise<void>;
  removeContactsFromGroup: (groupId: string, contactIds: string[]) => Promise<void>;
  filterGroups: (filters: GroupsFilter) => void;
  searchGroups: (query: string) => void;
  sendEventToGroup: (data: SendEventToContactsData) => Promise<SendResult>;
  clearGroups: () => void;
}

/**
 * ألوان المجموعات الافتراضية
 */
export const DEFAULT_GROUP_COLORS = [
  "#1a56db", // أزرق
  "#16a34a", // أخضر
  "#dc2626", // أحمر
  "#ea580c", // برتقالي
  "#9333ea", // بنفسجي
  "#0891b2", // سماوي
  "#ca8a04", // ذهبي
  "#e11d48", // وردي
] as const;

/**
 * أيقونات المجموعات الافتراضية
 */
export const DEFAULT_GROUP_ICONS = [
  "Users",
  "UserGroup",
  "AcademicCap",
  "Briefcase",
  "BuildingOffice",
  "UserCircle",
  "UsersThree",
  "GraduationCap",
] as const;

