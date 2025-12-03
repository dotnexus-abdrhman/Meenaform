using EventMeena.Domain.Common;
using EventMeena.Domain.Enums;

namespace EventMeena.Domain.Entities;

/// <summary>
/// كيان الرد على الحدث
/// </summary>
public class Response : AuditableEntity
{
    public ResponseStatus Status { get; set; } = ResponseStatus.Started;
    
    // بيانات المستجيب
    public string? RespondentName { get; set; }
    public string? RespondentEmail { get; set; }
    public string? RespondentPhone { get; set; }
    public string? RespondentIp { get; set; }
    public string? UserAgent { get; set; }
    
    // الإجابات (JSON)
    public string AnswersJson { get; set; } = "{}";
    
    // معلومات الوقت
    public DateTime StartedAt { get; set; } = DateTime.UtcNow;
    public DateTime? CompletedAt { get; set; }
    public int? DurationSeconds { get; set; }
    
    // نتائج الاختبار
    public int? Score { get; set; }
    public int? TotalPoints { get; set; }
    public double? Percentage { get; set; }
    public bool? IsPassed { get; set; }
    
    // القسم الحالي (للردود غير المكتملة)
    public int CurrentSectionIndex { get; set; } = 0;
    
    // الحدث
    public Guid EventId { get; set; }
    
    // Navigation Properties
    public virtual Event Event { get; set; } = null!;
}

