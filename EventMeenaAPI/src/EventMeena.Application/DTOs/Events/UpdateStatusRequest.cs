using EventMeena.Domain.Enums;

namespace EventMeena.Application.DTOs.Events;

/// <summary>
/// Update event status only request DTO
/// يسمح بتحديث حالة الحدث فقط دون المساس بالبيانات الأخرى
/// </summary>
public class UpdateStatusRequest
{
    public EventStatus Status { get; set; }
}

