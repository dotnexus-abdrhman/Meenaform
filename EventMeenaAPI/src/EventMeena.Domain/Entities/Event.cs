using EventMeena.Domain.Common;
using EventMeena.Domain.Enums;

namespace EventMeena.Domain.Entities;

/// <summary>
/// كيان الحدث (استبيان، اختبار، نموذج، حدث)
/// </summary>
public class Event : AuditableEntity
{
    public string Title { get; set; } = string.Empty;
    public string? Description { get; set; }
    public EventType Type { get; set; }
    public EventStatus Status { get; set; } = EventStatus.Draft;

    // الإعدادات العامة
    public string? CoverImage { get; set; }
    public string? ThemeColor { get; set; }
    public string? Language { get; set; } = "ar";

    // إعدادات الوقت
    public DateTime? StartDate { get; set; }
    public DateTime? EndDate { get; set; }
    public int? TimeLimitMinutes { get; set; }

    // إعدادات المشاركة
    public string ShareCode { get; set; } = string.Empty;
    public string? ShareLink { get; set; }
    public bool RequireLogin { get; set; } = false;
    public bool AllowAnonymous { get; set; } = true;
    public int? MaxResponses { get; set; }
    public bool AllowMultipleResponses { get; set; } = false;
    public bool AllowEditResponses { get; set; } = false;

    // إعدادات الاختبار (Quiz)
    public bool ShowResults { get; set; } = true;
    public bool ShowCorrectAnswers { get; set; } = true;
    public bool ShuffleQuestions { get; set; } = false;
    public bool ShuffleOptions { get; set; } = false;
    public int? PassingScore { get; set; }

    // رسائل الشكر والنتائج
    public string? ThankYouMessage { get; set; }
    public string? SuccessMessage { get; set; }
    public string? GoodMessage { get; set; }
    public string? ImprovementMessage { get; set; }

    // إحصائيات
    public int ViewCount { get; set; } = 0;
    public int ResponseCount { get; set; } = 0;

    // المالك
    public Guid UserId { get; set; }

    // Navigation Properties
    public virtual User User { get; set; } = null!;
    public virtual ICollection<Section> Sections { get; set; } = new List<Section>();
    public virtual ICollection<Response> Responses { get; set; } = new List<Response>();
    public virtual ICollection<SendHistory> SendHistories { get; set; } = new List<SendHistory>();
}

