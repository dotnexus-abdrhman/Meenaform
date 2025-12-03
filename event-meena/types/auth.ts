// تعريفات TypeScript للمصادقة

// بيانات المستخدم
export interface User {
  id: string;
  name: string;
  email: string;
  phone: string; // ← إضافة رقم الجوال
  avatar?: string;
  createdAt?: string;
}

// بيانات تسجيل الدخول
export interface LoginData {
  email: string;
  password: string;
  rememberMe?: boolean;
}

// بيانات إنشاء حساب
export interface SignupData {
  name: string;
  email: string;
  phone: string; // ← إضافة رقم الجوال
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
}

// استجابة API
export interface AuthResponse {
  success: boolean;
  user: User;
  token: string;
  message?: string;
}

// بيانات تحديث الملف الشخصي
export interface UpdateProfileData {
  name?: string;
  phone?: string;
  avatar?: string;
}

// حالة المصادقة
export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  // الوظائف
  login: (data: LoginData) => Promise<void>;
  signup: (data: SignupData) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  updateProfile: (data: UpdateProfileData) => Promise<void>;
  clearError: () => void;
}

// قوة كلمة المرور
export type PasswordStrength = "weak" | "medium" | "strong" | "very-strong";

export interface PasswordStrengthResult {
  strength: PasswordStrength;
  score: number; // 0-4
  feedback: string;
}

