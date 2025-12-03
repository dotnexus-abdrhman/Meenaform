using EventMeena.Application.DTOs.Components;
using EventMeena.Domain.Enums;

namespace EventMeena.Application.DTOs.Events;

/// <summary>
/// Update event with sections and components request DTO
/// يسمح بتحديث حدث كامل مع أقسامه ومكوناته في طلب واحد
/// </summary>
public class UpdateEventWithSectionsRequest
{
    public string? Title { get; set; }
    public string? Description { get; set; }
    public EventType? Type { get; set; }
    public string? CoverImage { get; set; }
    public string? ThemeColor { get; set; }
    public string? Language { get; set; }
    public DateTime? StartDate { get; set; }
    public DateTime? EndDate { get; set; }
    public int? TimeLimitMinutes { get; set; }
    public bool? RequireLogin { get; set; }
    public bool? AllowAnonymous { get; set; }
    public int? MaxResponses { get; set; }
    public bool? AllowMultipleResponses { get; set; }
    public bool? AllowEditResponses { get; set; }
    public bool? ShowResults { get; set; }
    public bool? ShowCorrectAnswers { get; set; }
    public bool? ShuffleQuestions { get; set; }
    public bool? ShuffleOptions { get; set; }
    public int? PassingScore { get; set; }
    public string? ThankYouMessage { get; set; }
    public string? SuccessMessage { get; set; }
    public string? GoodMessage { get; set; }
    public string? ImprovementMessage { get; set; }

    /// <summary>
    /// الأقسام مع مكوناتها - سيتم استبدال جميع الأقسام الحالية بهذه
    /// </summary>
    public List<UpdateSectionWithComponentsRequest>? Sections { get; set; }
}

/// <summary>
/// Update section with components request DTO
/// </summary>
public class UpdateSectionWithComponentsRequest
{
    /// <summary>
    /// ID القسم - إذا كان null يتم إنشاء قسم جديد
    /// </summary>
    public Guid? Id { get; set; }

    public string Title { get; set; } = string.Empty;
    public string? Description { get; set; }
    public int Order { get; set; }
    public bool IsVisible { get; set; } = true;

    /// <summary>
    /// المكونات في هذا القسم
    /// </summary>
    public List<UpdateComponentInSectionRequest>? Components { get; set; }
}

/// <summary>
/// Update component in section request DTO
/// </summary>
public class UpdateComponentInSectionRequest
{
    /// <summary>
    /// ID المكون - إذا كان null يتم إنشاء مكون جديد
    /// </summary>
    public Guid? Id { get; set; }

    public ComponentType Type { get; set; }
    public int Order { get; set; }
    public string? Title { get; set; }
    public string? Description { get; set; }
    public string? Placeholder { get; set; }
    public bool IsRequired { get; set; }
    public bool IsVisible { get; set; } = true;
    public string? OptionsJson { get; set; }
    public string? ValidationJson { get; set; }
    public string? CorrectAnswerJson { get; set; }
    public int? Points { get; set; }
    public string? Explanation { get; set; }
    public int? MinValue { get; set; }
    public int? MaxValue { get; set; }
    public string? MinLabel { get; set; }
    public string? MaxLabel { get; set; }
    public string? MediaUrl { get; set; }
    public string? MediaType { get; set; }
    public string? StyleJson { get; set; }
}

