/**
 * API Client - Axios مع التكوين الأساسي
 * يتضمن interceptors للـ Token و Error handling
 */

import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from "axios";

// عنوان الـ Backend API
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5250/api";

// مفاتيح LocalStorage
const ACCESS_TOKEN_KEY = "event_meena_access_token";
const REFRESH_TOKEN_KEY = "event_meena_refresh_token";

/**
 * استجابة الـ API الموحدة من Backend
 */
export interface ApiResponse<T> {
  success: boolean;
  data: T | null;
  message: string | null;
  errors: string[] | null;
}

/**
 * صيغة Problem Details من ASP.NET Core (FluentValidation)
 */
interface ProblemDetails {
  type?: string;
  title?: string;
  status?: number;
  errors?: Record<string, string[]>;
  traceId?: string;
}

/**
 * خطأ API مخصص
 */
export class ApiError extends Error {
  status: number;
  errors: string[];

  constructor(message: string, status: number, errors: string[] = []) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.errors = errors;
  }
}

/**
 * إدارة التوكنات
 */
export const tokenManager = {
  getAccessToken: (): string | null => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  },

  getRefreshToken: (): string | null => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  },

  setTokens: (accessToken: string, refreshToken: string): void => {
    if (typeof window === "undefined") return;
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  },

  clearTokens: (): void => {
    if (typeof window === "undefined") return;
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  },

  hasValidToken: (): boolean => {
    return !!tokenManager.getAccessToken();
  },
};

/**
 * إنشاء Axios Instance
 */
const createApiClient = (): AxiosInstance => {
  const client = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      "Content-Type": "application/json",
    },
    timeout: 30000, // 30 ثانية
  });

  // Request Interceptor - إضافة التوكن لكل طلب
  client.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = tokenManager.getAccessToken();
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Response Interceptor - معالجة الأخطاء وتجديد التوكن
  client.interceptors.response.use(
    (response) => response,
    async (error: AxiosError<ApiResponse<unknown>>) => {
      const originalRequest = error.config as InternalAxiosRequestConfig & {
        _retry?: boolean;
      };

      // إذا كان الخطأ 401 ولم نحاول التجديد بعد
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        const refreshToken = tokenManager.getRefreshToken();
        if (refreshToken) {
          try {
            // محاولة تجديد التوكن
            const response = await axios.post<ApiResponse<{
              accessToken: string;
              refreshToken: string;
            }>>(`${API_BASE_URL}/Auth/refresh-token`, {
              refreshToken,
            });

            if (response.data.success && response.data.data) {
              const { accessToken, refreshToken: newRefreshToken } = response.data.data;
              tokenManager.setTokens(accessToken, newRefreshToken);

              // إعادة المحاولة مع التوكن الجديد
              if (originalRequest.headers) {
                originalRequest.headers.Authorization = `Bearer ${accessToken}`;
              }
              return client(originalRequest);
            }
          } catch {
            // فشل تجديد التوكن - تسجيل الخروج
            tokenManager.clearTokens();
            if (typeof window !== "undefined") {
              window.location.href = "/login";
            }
          }
        }
      }

      // تحويل الخطأ إلى ApiError
      const apiError = createApiError(error);
      return Promise.reject(apiError);
    }
  );

  return client;
};

/**
 * التحقق من أن الـ response هو Problem Details
 */
const isProblemDetails = (data: unknown): data is ProblemDetails => {
  return (
    typeof data === "object" &&
    data !== null &&
    "title" in data &&
    "status" in data
  );
};

/**
 * استخراج رسائل الخطأ من Problem Details
 */
const extractProblemDetailsErrors = (problemDetails: ProblemDetails): string[] => {
  const errors: string[] = [];

  if (problemDetails.errors) {
    // تحويل object { "Password": ["error1", "error2"] } إلى array
    Object.values(problemDetails.errors).forEach((fieldErrors) => {
      if (Array.isArray(fieldErrors)) {
        errors.push(...fieldErrors);
      }
    });
  }

  return errors;
};

/**
 * إنشاء ApiError من AxiosError
 */
const createApiError = (error: AxiosError<ApiResponse<unknown> | ProblemDetails>): ApiError => {
  if (error.response) {
    const { data, status } = error.response;

    // التحقق من Problem Details format (من FluentValidation)
    if (isProblemDetails(data)) {
      const errors = extractProblemDetailsErrors(data);
      const message = errors.length > 0
        ? errors.join(" | ")
        : data.title || getErrorMessage(status);
      return new ApiError(message, status, errors);
    }

    // التعامل مع ApiResponse format العادي
    const apiData = data as ApiResponse<unknown>;
    const message = apiData?.message || getErrorMessage(status);
    const errors = apiData?.errors || [];
    return new ApiError(message, status, errors);
  }

  if (error.request) {
    return new ApiError("لا يمكن الاتصال بالخادم. تأكد من اتصالك بالإنترنت.", 0, []);
  }

  return new ApiError(error.message || "حدث خطأ غير متوقع", 0, []);
};

/**
 * الحصول على رسالة خطأ بناءً على الكود
 */
const getErrorMessage = (status: number): string => {
  switch (status) {
    case 400:
      return "طلب غير صالح. تحقق من البيانات المدخلة.";
    case 401:
      return "غير مصرح. يرجى تسجيل الدخول مرة أخرى.";
    case 403:
      return "غير مسموح. ليس لديك صلاحية للوصول.";
    case 404:
      return "غير موجود. المورد المطلوب غير متاح.";
    case 409:
      return "تعارض. البيانات موجودة مسبقاً.";
    case 422:
      return "بيانات غير صالحة. تحقق من المدخلات.";
    case 429:
      return "طلبات كثيرة. انتظر قليلاً ثم حاول مرة أخرى.";
    case 500:
      return "خطأ في الخادم. حاول مرة أخرى لاحقاً.";
    case 502:
    case 503:
    case 504:
      return "الخدمة غير متاحة حالياً. حاول مرة أخرى لاحقاً.";
    default:
      return "حدث خطأ غير متوقع.";
  }
};

// إنشاء وتصدير الـ API Client
export const apiClient = createApiClient();

// تصدير افتراضي
export default apiClient;

