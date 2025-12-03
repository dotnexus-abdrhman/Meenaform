import { apiClient, ApiResponse } from "../client";

// ===================================
// File Upload Service
// خدمة رفع الملفات
// ===================================

export interface FileUploadResponse {
  fileUrl: string;
  fileName: string;
  fileSize: number;
  fileType: string;
  uploadedAt: string;
}

export type FileCategory = "image" | "video" | "pdf" | "signature";

export interface UploadProgressCallback {
  (progress: number): void;
}

/**
 * رفع ملف إلى الخادم
 * @param file الملف المراد رفعه
 * @param type نوع الملف (image, video, pdf, signature)
 * @param onProgress callback لتتبع التقدم
 * @returns معلومات الملف المرفوع
 */
export async function uploadFile(
  file: File,
  type: FileCategory,
  onProgress?: UploadProgressCallback
): Promise<FileUploadResponse> {
  const formData = new FormData();
  formData.append("file", file);

  // استخدام XMLHttpRequest للحصول على progress
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.upload.addEventListener("progress", (event) => {
      if (event.lengthComputable && onProgress) {
        const progress = Math.round((event.loaded / event.total) * 100);
        onProgress(progress);
      }
    });

    xhr.addEventListener("load", () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const response: ApiResponse<FileUploadResponse> = JSON.parse(
            xhr.responseText
          );
          if (response.success && response.data) {
            resolve(response.data);
          } else {
            reject(new Error(response.message || "فشل رفع الملف"));
          }
        } catch {
          reject(new Error("خطأ في تحليل الاستجابة"));
        }
      } else {
        try {
          const errorResponse = JSON.parse(xhr.responseText);
          reject(new Error(errorResponse.message || `خطأ HTTP: ${xhr.status}`));
        } catch {
          reject(new Error(`خطأ HTTP: ${xhr.status}`));
        }
      }
    });

    xhr.addEventListener("error", () => {
      reject(new Error("فشل الاتصال بالخادم"));
    });

    xhr.addEventListener("abort", () => {
      reject(new Error("تم إلغاء الرفع"));
    });

    // فتح الاتصال
    // NEXT_PUBLIC_API_URL يحتوي على /api بالفعل (مثل: http://localhost:5250/api)
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5250/api";
    xhr.open("POST", `${baseUrl}/Files/upload?type=${type}`);

    // إضافة credentials إذا لزم الأمر
    xhr.withCredentials = true;

    xhr.send(formData);
  });
}

/**
 * رفع ملف باستخدام fetch (بدون progress)
 * @param file الملف
 * @param type نوع الملف
 */
export async function uploadFileSimple(
  file: File,
  type: FileCategory
): Promise<FileUploadResponse> {
  const formData = new FormData();
  formData.append("file", file);

  const response = await apiClient.post<ApiResponse<FileUploadResponse>>(
    `/Files/upload?type=${type}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  if (!response.data.success || !response.data.data) {
    throw new Error(response.data.message || "فشل رفع الملف");
  }

  return response.data.data;
}

/**
 * تحويل Base64 إلى File
 * مفيد للتوقيعات
 */
export function base64ToFile(
  base64: string,
  fileName: string,
  mimeType: string
): File {
  const byteString = atob(base64.split(",")[1]);
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);

  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  return new File([ab], fileName, { type: mimeType });
}

/**
 * الحصول على URL الكامل للملف
 * الملفات الثابتة تُخدم من الجذر وليس من /api
 */
export function getFullFileUrl(fileUrl: string): string {
  if (!fileUrl) return "";
  if (fileUrl.startsWith("http") || fileUrl.startsWith("data:")) {
    return fileUrl;
  }
  // إزالة /api من المسار لأن الملفات الثابتة تُخدم من الجذر
  let baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5250";
  // إذا كان baseUrl ينتهي بـ /api، نزيله
  if (baseUrl.endsWith("/api")) {
    baseUrl = baseUrl.slice(0, -4);
  }
  return `${baseUrl}${fileUrl}`;
}

// Export service object
export const filesService = {
  uploadFile,
  uploadFileSimple,
  base64ToFile,
  getFullFileUrl,
};

