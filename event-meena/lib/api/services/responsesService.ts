/**
 * Responses Service - خدمة الردود
 * الاتصال بـ Backend API للردود
 */

import { apiClient, ApiResponse } from "../client";
import {
  BackendResponseDto,
  BackendPagedResult,
  BackendParticipationDto,
  BackendParticipationDetailsDto,
  mapResponse,
  mapResponseToBackendStart,
  mapSectionAnswersToBackend,
  mapParticipation,
  mapParticipationDetails,
} from "../mappers";
import { Response, ComponentAnswer, ParticipantInfo } from "@/types/response";
import { ParticipatedEvent, ParticipationDetails } from "@/types/participation";

// ============================================================
// أنواع الطلبات
// ============================================================

interface StartResponseRequest {
  respondentName?: string;
  respondentEmail?: string;
  respondentPhone?: string;
}

interface SubmitSectionAnswersRequest {
  sectionIndex: number;
  answers: Array<{
    componentId: string;
    answerJson: string;
  }>;
}

interface CompleteResponseRequest {
  finalAnswers?: Array<{
    componentId: string;
    answerJson: string;
  }>;
}

// ============================================================
// خدمة الردود
// ============================================================

export const responsesService = {
  /**
   * بدء استجابة جديدة (للمشاركين - بدون مصادقة)
   */
  startResponse: async (eventId: string, participantInfo?: ParticipantInfo): Promise<Response> => {
    const request: StartResponseRequest = {
      respondentName: participantInfo?.name,
      respondentEmail: participantInfo?.email,
      respondentPhone: participantInfo?.phone,
    };

    const response = await apiClient.post<ApiResponse<BackendResponseDto>>(
      `/Responses/event/${eventId}/start`,
      request
    );

    if (!response.data.success || !response.data.data) {
      throw new Error(response.data.message || "فشل بدء الاستجابة");
    }

    return mapResponse(response.data.data);
  },

  /**
   * إرسال إجابات قسم (للمشاركين - بدون مصادقة)
   */
  submitSectionAnswers: async (
    responseId: string,
    sectionIndex: number,
    answers: ComponentAnswer[]
  ): Promise<Response> => {
    const request: SubmitSectionAnswersRequest = {
      sectionIndex,
      answers: mapSectionAnswersToBackend(answers),
    };

    const response = await apiClient.post<ApiResponse<BackendResponseDto>>(
      `/Responses/${responseId}/section-answers`,
      request
    );

    if (!response.data.success || !response.data.data) {
      throw new Error(response.data.message || "فشل إرسال الإجابات");
    }

    return mapResponse(response.data.data);
  },

  /**
   * إكمال الاستجابة (للمشاركين - بدون مصادقة)
   */
  completeResponse: async (
    responseId: string,
    finalAnswers?: ComponentAnswer[]
  ): Promise<Response> => {
    const request: CompleteResponseRequest = {
      finalAnswers: finalAnswers ? mapSectionAnswersToBackend(finalAnswers) : undefined,
    };

    const response = await apiClient.post<ApiResponse<BackendResponseDto>>(
      `/Responses/${responseId}/complete`,
      request
    );

    if (!response.data.success || !response.data.data) {
      throw new Error(response.data.message || "فشل إكمال الاستجابة");
    }

    return mapResponse(response.data.data);
  },

  /**
   * جلب ردود حدث معين (للمالك - يحتاج مصادقة)
   */
  getByEventId: async (eventId: string): Promise<Response[]> => {
    const response = await apiClient.get<ApiResponse<BackendPagedResult<BackendResponseDto>>>(
      `/Responses/event/${eventId}`
    );

    if (!response.data.success || !response.data.data) {
      throw new Error(response.data.message || "فشل جلب الردود");
    }

    return response.data.data.items.map(mapResponse);
  },

  /**
   * جلب رد بالـ ID (للمالك - يحتاج مصادقة)
   */
  getById: async (responseId: string): Promise<Response> => {
    const response = await apiClient.get<ApiResponse<BackendResponseDto>>(
      `/Responses/${responseId}`
    );

    if (!response.data.success || !response.data.data) {
      throw new Error(response.data.message || "الرد غير موجود");
    }

    return mapResponse(response.data.data);
  },

  /**
   * حذف رد (للمالك - يحتاج مصادقة)
   */
  delete: async (responseId: string): Promise<void> => {
    const response = await apiClient.delete<ApiResponse<null>>(
      `/Responses/${responseId}`
    );

    if (!response.data.success) {
      throw new Error(response.data.message || "فشل حذف الرد");
    }
  },

  /**
   * البحث عن رد سابق للمشارك (للتعديل - بدون مصادقة)
   */
  getExistingResponse: async (eventId: string, email?: string): Promise<Response | null> => {
    const params = email ? `?email=${encodeURIComponent(email)}` : "";
    const response = await apiClient.get<ApiResponse<BackendResponseDto | null>>(
      `/Responses/event/${eventId}/existing${params}`
    );

    if (!response.data.success) {
      throw new Error(response.data.message || "فشل البحث عن الرد السابق");
    }

    // إذا لم يوجد رد سابق
    if (!response.data.data) {
      return null;
    }

    return mapResponse(response.data.data);
  },

  /**
   * تحديث إجابات رد موجود (للتعديل - بدون مصادقة)
   */
  updateResponseAnswers: async (
    responseId: string,
    answers: ComponentAnswer[]
  ): Promise<Response> => {
    const request = {
      answers: mapSectionAnswersToBackend(answers),
    };

    const response = await apiClient.put<ApiResponse<BackendResponseDto>>(
      `/Responses/${responseId}/answers`,
      request
    );

    if (!response.data.success || !response.data.data) {
      throw new Error(response.data.message || "فشل تحديث الإجابات");
    }

    return mapResponse(response.data.data);
  },

  // ============================================================
  // مشاركاتي - الأحداث التي شاركت فيها
  // ============================================================

  /**
   * جلب جميع الأحداث التي شاركت فيها
   */
  getMyParticipations: async (): Promise<ParticipatedEvent[]> => {
    const response = await apiClient.get<ApiResponse<BackendParticipationDto[]>>(
      "/Responses/my-participations"
    );

    if (!response.data.success || !response.data.data) {
      throw new Error(response.data.message || "فشل جلب المشاركات");
    }

    return response.data.data.map(mapParticipation);
  },

  /**
   * جلب تفاصيل مشاركة معينة
   */
  getParticipationDetails: async (responseId: string): Promise<ParticipationDetails> => {
    const response = await apiClient.get<ApiResponse<BackendParticipationDetailsDto>>(
      `/Responses/my-participations/${responseId}`
    );

    if (!response.data.success || !response.data.data) {
      throw new Error(response.data.message || "فشل جلب تفاصيل المشاركة");
    }

    return mapParticipationDetails(response.data.data);
  },
};

export default responsesService;

