/**
 * Auth Service - خدمة المصادقة
 * الاتصال بـ Backend API للمصادقة
 */

import { apiClient, ApiResponse, tokenManager } from "../client";
import { BackendAuthResponse, BackendUserDto, mapAuthResponse, mapUser } from "../mappers";
import { LoginData, SignupData, User } from "@/types/auth";

// ============================================================
// أنواع الاستجابات
// ============================================================

interface AuthResult {
  user: User;
  token: string;
  refreshToken: string;
}

// ============================================================
// خدمة المصادقة
// ============================================================

export const authService = {
  /**
   * تسجيل الدخول
   */
  login: async (data: LoginData): Promise<AuthResult> => {
    const response = await apiClient.post<ApiResponse<BackendAuthResponse>>(
      "/Auth/login",
      {
        email: data.email,
        password: data.password,
        rememberMe: data.rememberMe || false,
      }
    );

    if (!response.data.success || !response.data.data) {
      throw new Error(response.data.message || "فشل تسجيل الدخول");
    }

    const result = mapAuthResponse(response.data.data);
    
    // حفظ التوكنات
    tokenManager.setTokens(result.token, result.refreshToken);

    return result;
  },

  /**
   * إنشاء حساب جديد
   */
  register: async (data: SignupData): Promise<AuthResult> => {
    const response = await apiClient.post<ApiResponse<BackendAuthResponse>>(
      "/Auth/register",
      {
        fullName: data.name,
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
        phone: data.phone || null,
      }
    );

    if (!response.data.success || !response.data.data) {
      throw new Error(response.data.message || "فشل إنشاء الحساب");
    }

    const result = mapAuthResponse(response.data.data);
    
    // حفظ التوكنات
    tokenManager.setTokens(result.token, result.refreshToken);

    return result;
  },

  /**
   * تسجيل الخروج
   */
  logout: async (): Promise<void> => {
    try {
      await apiClient.post("/Auth/logout");
    } finally {
      // مسح التوكنات في جميع الحالات
      tokenManager.clearTokens();
    }
  },

  /**
   * الحصول على بيانات المستخدم الحالي
   */
  getCurrentUser: async (): Promise<User> => {
    const response = await apiClient.get<ApiResponse<BackendUserDto>>("/Auth/me");

    if (!response.data.success || !response.data.data) {
      throw new Error(response.data.message || "فشل جلب بيانات المستخدم");
    }

    return mapUser(response.data.data);
  },

  /**
   * تحديث الملف الشخصي
   */
  updateProfile: async (data: {
    name?: string;
    phone?: string;
    avatar?: string;
  }): Promise<User> => {
    const response = await apiClient.put<ApiResponse<BackendUserDto>>(
      "/Auth/profile",
      {
        fullName: data.name,
        phone: data.phone || null,
        profileImage: data.avatar || null,
      }
    );

    if (!response.data.success || !response.data.data) {
      throw new Error(response.data.message || "فشل تحديث الملف الشخصي");
    }

    return mapUser(response.data.data);
  },

  /**
   * تغيير كلمة المرور
   */
  changePassword: async (data: {
    currentPassword: string;
    newPassword: string;
    confirmNewPassword: string;
  }): Promise<void> => {
    const response = await apiClient.post<ApiResponse<null>>("/Auth/change-password", data);

    if (!response.data.success) {
      throw new Error(response.data.message || "فشل تغيير كلمة المرور");
    }
  },

  /**
   * نسيت كلمة المرور
   */
  forgotPassword: async (email: string): Promise<void> => {
    const response = await apiClient.post<ApiResponse<null>>("/Auth/forgot-password", {
      email,
    });

    if (!response.data.success) {
      throw new Error(response.data.message || "فشل إرسال رابط استعادة كلمة المرور");
    }
  },

  /**
   * إعادة تعيين كلمة المرور
   */
  resetPassword: async (data: {
    token: string;
    email: string;
    newPassword: string;
    confirmPassword: string;
  }): Promise<void> => {
    const response = await apiClient.post<ApiResponse<null>>("/Auth/reset-password", data);

    if (!response.data.success) {
      throw new Error(response.data.message || "فشل إعادة تعيين كلمة المرور");
    }
  },

  /**
   * التحقق من صحة التوكن
   */
  verifyToken: async (): Promise<boolean> => {
    if (!tokenManager.hasValidToken()) {
      return false;
    }

    try {
      await authService.getCurrentUser();
      return true;
    } catch {
      tokenManager.clearTokens();
      return false;
    }
  },
};

export default authService;

