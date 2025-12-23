using EventMeena.Domain.Enums;

namespace EventMeena.Application.DTOs.Responses;

/// <summary>
/// DTO للأحداث التي شارك فيها المستخدم
/// </summary>
public class ParticipationDto
{
    /// <summary>
    /// معرف الاستجابة
    /// </summary>
    public Guid ResponseId { get; set; }
    
    /// <summary>
    /// معرف الحدث
    /// </summary>
    public Guid EventId { get; set; }
    
    /// <summary>
    /// عنوان الحدث
    /// </summary>
    public string EventTitle { get; set; } = string.Empty;
    
    /// <summary>
    /// وصف الحدث
    /// </summary>
    public string? EventDescription { get; set; }
    
    /// <summary>
    /// نوع الحدث
    /// </summary>
    public EventType EventType { get; set; }
    
    /// <summary>
    /// اسم مالك الحدث
    /// </summary>
    public string OwnerName { get; set; } = string.Empty;
    
    /// <summary>
    /// تاريخ المشاركة
    /// </summary>
    public DateTime ParticipatedAt { get; set; }
    
    /// <summary>
    /// تاريخ إكمال المشاركة
    /// </summary>
    public DateTime? CompletedAt { get; set; }
    
    /// <summary>
    /// الوقت المستغرق بالثواني
    /// </summary>
    public int? DurationSeconds { get; set; }
    
    /// <summary>
    /// حالة الاستجابة
    /// </summary>
    public ResponseStatus Status { get; set; }
    
    /// <summary>
    /// الدرجة (للاختبارات)
    /// </summary>
    public int? Score { get; set; }
    
    /// <summary>
    /// إجمالي الدرجات (للاختبارات)
    /// </summary>
    public int? TotalPoints { get; set; }
    
    /// <summary>
    /// النسبة المئوية (للاختبارات)
    /// </summary>
    public double? Percentage { get; set; }
    
    /// <summary>
    /// هل نجح؟ (للاختبارات)
    /// </summary>
    public bool? IsPassed { get; set; }
    
    /// <summary>
    /// الإجابات بصيغة JSON
    /// </summary>
    public string AnswersJson { get; set; } = "{}";
}

/// <summary>
/// DTO لعرض تفاصيل المشاركة مع الأقسام والمكونات
/// </summary>
public class ParticipationDetailsDto : ParticipationDto
{
    /// <summary>
    /// أقسام الحدث مع المكونات
    /// </summary>
    public List<ParticipationSectionDto> Sections { get; set; } = new();
}

/// <summary>
/// قسم في تفاصيل المشاركة
/// </summary>
public class ParticipationSectionDto
{
    public Guid Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string? Description { get; set; }
    public int Order { get; set; }
    public List<ParticipationComponentDto> Components { get; set; } = new();
}

/// <summary>
/// مكون في تفاصيل المشاركة
/// </summary>
public class ParticipationComponentDto
{
    public Guid Id { get; set; }
    public ComponentType Type { get; set; }
    public int Order { get; set; }
    public string SettingsJson { get; set; } = "{}";
}

