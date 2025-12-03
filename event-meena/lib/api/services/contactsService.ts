/**
 * Contacts Service - خدمة جهات الاتصال
 * الاتصال بـ Backend API لجهات الاتصال والمجموعات
 */

import { apiClient, ApiResponse } from "../client";
import {
  BackendContactDto,
  BackendGroupDto,
  BackendPagedResult,
  mapContact,
  mapGroup,
  mapContactFormToBackend,
  mapGroupFormToBackend,
} from "../mappers";
import { Contact, ContactFormData, Group, GroupFormData } from "@/types/contact";

// ============================================================
// خدمة جهات الاتصال
// ============================================================

export const contactsService = {
  /**
   * جلب جميع جهات الاتصال (مع Pagination)
   * Backend يُرجع PagedResult<ContactDto>
   */
  getAll: async (): Promise<Contact[]> => {
    const response = await apiClient.get<ApiResponse<BackendPagedResult<BackendContactDto>>>("/Contacts");

    if (!response.data.success || !response.data.data) {
      throw new Error(response.data.message || "فشل جلب جهات الاتصال");
    }

    // استخراج الـ items من الاستجابة المُرقّمة
    return response.data.data.items.map(mapContact);
  },

  /**
   * جلب جهة اتصال بواسطة ID
   */
  getById: async (id: string): Promise<Contact> => {
    const response = await apiClient.get<ApiResponse<BackendContactDto>>(
      `/Contacts/${id}`
    );

    if (!response.data.success || !response.data.data) {
      throw new Error(response.data.message || "جهة الاتصال غير موجودة");
    }

    return mapContact(response.data.data);
  },

  /**
   * إنشاء جهة اتصال جديدة
   */
  create: async (data: ContactFormData): Promise<Contact> => {
    const response = await apiClient.post<ApiResponse<BackendContactDto>>(
      "/Contacts",
      mapContactFormToBackend(data)
    );

    if (!response.data.success || !response.data.data) {
      throw new Error(response.data.message || "فشل إنشاء جهة الاتصال");
    }

    return mapContact(response.data.data);
  },

  /**
   * تحديث جهة اتصال
   */
  update: async (id: string, data: Partial<ContactFormData>): Promise<Contact> => {
    const response = await apiClient.put<ApiResponse<BackendContactDto>>(
      `/Contacts/${id}`,
      mapContactFormToBackend(data as ContactFormData)
    );

    if (!response.data.success || !response.data.data) {
      throw new Error(response.data.message || "فشل تحديث جهة الاتصال");
    }

    return mapContact(response.data.data);
  },

  /**
   * حذف جهة اتصال
   */
  delete: async (id: string): Promise<void> => {
    const response = await apiClient.delete<ApiResponse<null>>(`/Contacts/${id}`);

    if (!response.data.success) {
      throw new Error(response.data.message || "فشل حذف جهة الاتصال");
    }
  },

  /**
   * البحث في جهات الاتصال
   */
  search: async (query: string): Promise<Contact[]> => {
    const response = await apiClient.get<ApiResponse<BackendContactDto[]>>(
      `/Contacts/search?query=${encodeURIComponent(query)}`
    );

    if (!response.data.success || !response.data.data) {
      return [];
    }

    return response.data.data.map(mapContact);
  },
};

// ============================================================
// خدمة المجموعات
// ============================================================

export const groupsService = {
  /**
   * جلب جميع المجموعات
   */
  getAll: async (): Promise<Group[]> => {
    const response = await apiClient.get<ApiResponse<BackendGroupDto[]>>("/Groups");

    if (!response.data.success || !response.data.data) {
      throw new Error(response.data.message || "فشل جلب المجموعات");
    }

    return response.data.data.map(mapGroup);
  },

  /**
   * جلب مجموعة بواسطة ID
   */
  getById: async (id: string): Promise<Group> => {
    const response = await apiClient.get<ApiResponse<BackendGroupDto>>(`/Groups/${id}`);

    if (!response.data.success || !response.data.data) {
      throw new Error(response.data.message || "المجموعة غير موجودة");
    }

    return mapGroup(response.data.data);
  },

  /**
   * إنشاء مجموعة جديدة
   */
  create: async (data: GroupFormData): Promise<Group> => {
    const response = await apiClient.post<ApiResponse<BackendGroupDto>>(
      "/Groups",
      mapGroupFormToBackend(data)
    );

    if (!response.data.success || !response.data.data) {
      throw new Error(response.data.message || "فشل إنشاء المجموعة");
    }

    return mapGroup(response.data.data);
  },

  /**
   * تحديث مجموعة
   */
  update: async (id: string, data: Partial<GroupFormData>): Promise<Group> => {
    const response = await apiClient.put<ApiResponse<BackendGroupDto>>(
      `/Groups/${id}`,
      mapGroupFormToBackend(data as GroupFormData)
    );

    if (!response.data.success || !response.data.data) {
      throw new Error(response.data.message || "فشل تحديث المجموعة");
    }

    return mapGroup(response.data.data);
  },

  /**
   * حذف مجموعة
   */
  delete: async (id: string): Promise<void> => {
    const response = await apiClient.delete<ApiResponse<null>>(`/Groups/${id}`);

    if (!response.data.success) {
      throw new Error(response.data.message || "فشل حذف المجموعة");
    }
  },

  /**
   * إضافة جهات اتصال إلى مجموعة
   */
  addContacts: async (groupId: string, contactIds: string[]): Promise<void> => {
    const response = await apiClient.post<ApiResponse<null>>(
      `/Groups/${groupId}/contacts`,
      { contactIds }
    );

    if (!response.data.success) {
      throw new Error(response.data.message || "فشل إضافة جهات الاتصال");
    }
  },

  /**
   * إزالة جهات اتصال من مجموعة
   */
  removeContacts: async (groupId: string, contactIds: string[]): Promise<void> => {
    const response = await apiClient.delete<ApiResponse<null>>(
      `/Groups/${groupId}/contacts`,
      { data: { contactIds } }
    );

    if (!response.data.success) {
      throw new Error(response.data.message || "فشل إزالة جهات الاتصال");
    }
  },
};

export default { contactsService, groupsService };

