using EventMeena.Domain.Common;
using EventMeena.Domain.Enums;

namespace EventMeena.Domain.Entities;

/// <summary>
/// كيان سجل الإرسال
/// </summary>
public class SendHistory : AuditableEntity
{
    public SendMethod Method { get; set; }
    public SendStatus Status { get; set; } = SendStatus.Pending;
    
    // بيانات الإرسال
    public string? RecipientEmail { get; set; }
    public string? RecipientPhone { get; set; }
    public string? Subject { get; set; }
    public string? Message { get; set; }
    
    // معلومات الحالة
    public DateTime? SentAt { get; set; }
    public DateTime? DeliveredAt { get; set; }
    public DateTime? OpenedAt { get; set; }
    public string? ErrorMessage { get; set; }
    
    // معرف خارجي (من مزود الخدمة)
    public string? ExternalId { get; set; }
    
    // العلاقات
    public Guid EventId { get; set; }
    public Guid? ContactId { get; set; }
    
    // Navigation Properties
    public virtual Event Event { get; set; } = null!;
    public virtual Contact? Contact { get; set; }
}

