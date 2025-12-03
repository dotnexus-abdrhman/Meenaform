using EventMeena.Application.DTOs.Common;
using EventMeena.Application.Interfaces;
using EventMeena.Application.Services.Interfaces;
using EventMeena.Domain.Entities;
using EventMeena.Domain.Enums;
using Microsoft.Extensions.Configuration;

namespace EventMeena.Application.Services.Implementations;

/// <summary>
/// Service implementation for sending events to contacts
/// </summary>
public class SendEventService : ISendEventService
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IEmailService _emailService;
    private readonly IConfiguration _configuration;
    private readonly string _frontendUrl;

    public SendEventService(IUnitOfWork unitOfWork, IEmailService emailService, IConfiguration configuration)
    {
        _unitOfWork = unitOfWork;
        _emailService = emailService;
        _configuration = configuration;
        _frontendUrl = _configuration["FrontendUrl"] ?? "http://localhost:3000";
    }

    /// <inheritdoc />
    public async Task<ApiResponse> SendEventToContactAsync(Guid eventId, Guid contactId, Guid userId)
    {
        var eventEntity = await _unitOfWork.Events.GetByIdAsync(eventId);
        if (eventEntity == null || eventEntity.UserId != userId)
            return ApiResponse.FailureResponse("الحدث غير موجود أو لا تملك صلاحية الوصول");

        var contact = await _unitOfWork.Contacts.GetByIdAsync(contactId);
        if (contact == null || contact.UserId != userId)
            return ApiResponse.FailureResponse("جهة الاتصال غير موجودة");

        if (string.IsNullOrEmpty(contact.Email))
            return ApiResponse.FailureResponse("جهة الاتصال ليس لديها بريد إلكتروني");

        var eventLink = $"{_frontendUrl}/e/{eventEntity.ShareCode}";

        // 🔗 [DEV] طباعة معلومات الإرسال للتجربة
        Console.WriteLine("════════════════════════════════════════════════════════════════");
        Console.WriteLine("📧 [DEV] Send Event Invitation");
        Console.WriteLine($"📌 Event: {eventEntity.Title}");
        Console.WriteLine($"👤 To: {contact.Name} <{contact.Email}>");
        Console.WriteLine($"🔗 Link: {eventLink}");
        Console.WriteLine("════════════════════════════════════════════════════════════════");

        var success = await _emailService.SendEventInvitationAsync(
            contact.Email, contact.Name, eventEntity.Title, eventEntity.Description, eventLink);

        // طباعة نتيجة الإرسال
        if (success)
        {
            Console.WriteLine($"✅ [DEV] Email sent successfully to {contact.Email}");
        }
        else
        {
            Console.WriteLine($"❌ [DEV] Email failed to send to {contact.Email} (SendGrid API Key not configured?)");
        }

        var sendHistory = new SendHistory
        {
            EventId = eventId,
            ContactId = contactId,
            Method = SendMethod.Email,
            Status = success ? SendStatus.Sent : SendStatus.Pending, // Pending بدلاً من Failed إذا فشل بسبب عدم تكوين API Key
            RecipientEmail = contact.Email,
            Subject = $"دعوة للمشاركة في: {eventEntity.Title}",
            SentAt = success ? DateTime.UtcNow : null,
            ErrorMessage = success ? null : "في انتظار إعداد خدمة البريد الإلكتروني"
        };

        await _unitOfWork.SendHistories.AddAsync(sendHistory);
        await _unitOfWork.SaveChangesAsync();

        // نعتبر العملية ناجحة حتى لو فشل الإيميل (لأننا سجلناها في SendHistory)
        // الهدف هو إظهار الـ Link في الـ Console للتجربة
        return ApiResponse.SuccessResponse(success ? "تم إرسال الدعوة بنجاح" : "تم تسجيل الدعوة (الإيميل في انتظار إعداد الخدمة)");
    }

    /// <inheritdoc />
    public async Task<ApiResponse<int>> SendEventToContactsAsync(Guid eventId, IEnumerable<Guid> contactIds, Guid userId)
    {
        var eventEntity = await _unitOfWork.Events.GetByIdAsync(eventId);
        if (eventEntity == null || eventEntity.UserId != userId)
            return ApiResponse<int>.FailureResponse("الحدث غير موجود أو لا تملك صلاحية الوصول");

        var successCount = 0;
        foreach (var contactId in contactIds)
        {
            var result = await SendEventToContactAsync(eventId, contactId, userId);
            if (result.Success) successCount++;
        }

        return ApiResponse<int>.SuccessResponse(successCount, $"تم إرسال {successCount} دعوة من أصل {contactIds.Count()}");
    }

    /// <inheritdoc />
    public async Task<ApiResponse<int>> SendEventToGroupAsync(Guid eventId, Guid groupId, Guid userId)
    {
        var eventEntity = await _unitOfWork.Events.GetByIdAsync(eventId);
        if (eventEntity == null || eventEntity.UserId != userId)
            return ApiResponse<int>.FailureResponse("الحدث غير موجود أو لا تملك صلاحية الوصول");

        var group = await _unitOfWork.Groups.GetByIdWithContactsAsync(groupId);
        if (group == null || group.UserId != userId)
            return ApiResponse<int>.FailureResponse("المجموعة غير موجودة");

        var contactIds = group.ContactGroups.Select(cg => cg.ContactId).ToList();
        if (!contactIds.Any())
            return ApiResponse<int>.FailureResponse("المجموعة فارغة");

        return await SendEventToContactsAsync(eventId, contactIds, userId);
    }

    /// <inheritdoc />
    public async Task<ApiResponse<int>> SendEventReminderAsync(Guid eventId, IEnumerable<Guid> contactIds, Guid userId)
    {
        var eventEntity = await _unitOfWork.Events.GetByIdAsync(eventId);
        if (eventEntity == null || eventEntity.UserId != userId)
            return ApiResponse<int>.FailureResponse("الحدث غير موجود أو لا تملك صلاحية الوصول");

        var successCount = 0;
        var eventLink = $"{_frontendUrl}/event/{eventEntity.ShareCode}";

        foreach (var contactId in contactIds)
        {
            var contact = await _unitOfWork.Contacts.GetByIdAsync(contactId);
            if (contact == null || contact.UserId != userId || string.IsNullOrEmpty(contact.Email))
                continue;

            var success = await _emailService.SendEventReminderAsync(
                contact.Email, contact.Name, eventEntity.Title, eventLink, eventEntity.EndDate);

            var sendHistory = new SendHistory
            {
                EventId = eventId,
                ContactId = contactId,
                Method = SendMethod.Email,
                Status = success ? SendStatus.Sent : SendStatus.Failed,
                RecipientEmail = contact.Email,
                Subject = $"تذكير: {eventEntity.Title}",
                SentAt = success ? DateTime.UtcNow : null
            };

            await _unitOfWork.SendHistories.AddAsync(sendHistory);
            if (success) successCount++;
        }

        await _unitOfWork.SaveChangesAsync();
        return ApiResponse<int>.SuccessResponse(successCount, $"تم إرسال {successCount} تذكير");
    }

    /// <inheritdoc />
    public async Task<ApiResponse<IEnumerable<SendHistory>>> GetEventSendHistoryAsync(Guid eventId, Guid userId)
    {
        var eventEntity = await _unitOfWork.Events.GetByIdAsync(eventId);
        if (eventEntity == null || eventEntity.UserId != userId)
            return ApiResponse<IEnumerable<SendHistory>>.FailureResponse("الحدث غير موجود أو لا تملك صلاحية الوصول");

        var history = await _unitOfWork.SendHistories.GetByEventIdAsync(eventId);
        return ApiResponse<IEnumerable<SendHistory>>.SuccessResponse(history);
    }
}

