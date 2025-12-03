using EventMeena.Domain.Common;
using EventMeena.Domain.Enums;

namespace EventMeena.Domain.Entities;

/// <summary>
/// كيان القالب المحفوظ
/// </summary>
public class UserTemplate : AuditableEntity
{
    public string Name { get; set; } = string.Empty;
    public string? Description { get; set; }
    public EventType Type { get; set; }
    public string? ThumbnailUrl { get; set; }
    
    // بيانات القالب (JSON)
    public string TemplateDataJson { get; set; } = "{}";
    
    // إعدادات
    public bool IsPublic { get; set; } = false;
    public int UsageCount { get; set; } = 0;
    
    // المالك
    public Guid UserId { get; set; }
    
    // Navigation Properties
    public virtual User User { get; set; } = null!;
}

