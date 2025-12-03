using EventMeena.Application.DTOs.Common;
using EventMeena.Domain.Entities;

namespace EventMeena.Application.Services.Interfaces;

/// <summary>
/// Service interface for sending events to contacts
/// </summary>
public interface ISendEventService
{
    /// <summary>
    /// إرسال دعوة لحدث إلى جهة اتصال واحدة
    /// </summary>
    /// <param name="eventId">معرف الحدث</param>
    /// <param name="contactId">معرف جهة الاتصال</param>
    /// <param name="userId">معرف المستخدم المرسل</param>
    /// <returns>نجاح أو فشل الإرسال</returns>
    Task<ApiResponse> SendEventToContactAsync(Guid eventId, Guid contactId, Guid userId);
    
    /// <summary>
    /// إرسال دعوة لحدث إلى عدة جهات اتصال
    /// </summary>
    /// <param name="eventId">معرف الحدث</param>
    /// <param name="contactIds">قائمة معرفات جهات الاتصال</param>
    /// <param name="userId">معرف المستخدم المرسل</param>
    /// <returns>عدد الدعوات المرسلة بنجاح</returns>
    Task<ApiResponse<int>> SendEventToContactsAsync(Guid eventId, IEnumerable<Guid> contactIds, Guid userId);
    
    /// <summary>
    /// إرسال دعوة لحدث إلى مجموعة كاملة
    /// </summary>
    /// <param name="eventId">معرف الحدث</param>
    /// <param name="groupId">معرف المجموعة</param>
    /// <param name="userId">معرف المستخدم المرسل</param>
    /// <returns>عدد الدعوات المرسلة بنجاح</returns>
    Task<ApiResponse<int>> SendEventToGroupAsync(Guid eventId, Guid groupId, Guid userId);
    
    /// <summary>
    /// إرسال تذكير للمشاركة في حدث
    /// </summary>
    /// <param name="eventId">معرف الحدث</param>
    /// <param name="contactIds">قائمة معرفات جهات الاتصال</param>
    /// <param name="userId">معرف المستخدم المرسل</param>
    /// <returns>عدد التذكيرات المرسلة بنجاح</returns>
    Task<ApiResponse<int>> SendEventReminderAsync(Guid eventId, IEnumerable<Guid> contactIds, Guid userId);
    
    /// <summary>
    /// الحصول على سجل إرسالات حدث معين
    /// </summary>
    /// <param name="eventId">معرف الحدث</param>
    /// <param name="userId">معرف المستخدم</param>
    /// <returns>قائمة سجلات الإرسال</returns>
    Task<ApiResponse<IEnumerable<SendHistory>>> GetEventSendHistoryAsync(Guid eventId, Guid userId);
}

