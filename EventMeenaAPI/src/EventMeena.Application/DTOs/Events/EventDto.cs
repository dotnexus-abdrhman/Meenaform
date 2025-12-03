using EventMeena.Application.DTOs.Sections;
using EventMeena.Domain.Enums;

namespace EventMeena.Application.DTOs.Events;

/// <summary>
/// Event response DTO
/// </summary>
public class EventDto
{
    public Guid Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string? Description { get; set; }
    public EventType Type { get; set; }
    public EventStatus Status { get; set; }
    public string? CoverImage { get; set; }
    public string? ThemeColor { get; set; }
    public string? Language { get; set; }
    public DateTime? StartDate { get; set; }
    public DateTime? EndDate { get; set; }
    public int? TimeLimitMinutes { get; set; }
    public string ShareCode { get; set; } = string.Empty;
    public string? ShareLink { get; set; }
    public bool RequireLogin { get; set; }
    public bool AllowAnonymous { get; set; }
    public int? MaxResponses { get; set; }
    public bool AllowMultipleResponses { get; set; }
    public bool AllowEditResponses { get; set; }
    public bool ShowResults { get; set; }
    public bool ShowCorrectAnswers { get; set; }
    public bool ShuffleQuestions { get; set; }
    public bool ShuffleOptions { get; set; }
    public int? PassingScore { get; set; }
    public string? ThankYouMessage { get; set; }
    public string? SuccessMessage { get; set; }
    public string? GoodMessage { get; set; }
    public string? ImprovementMessage { get; set; }
    public int ViewCount { get; set; }
    public int ResponseCount { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }
}

/// <summary>
/// Event with sections DTO
/// </summary>
public class EventWithSectionsDto : EventDto
{
    public List<SectionDto> Sections { get; set; } = new();
}

/// <summary>
/// Event with full details (sections and components) DTO
/// </summary>
public class EventWithFullDetailsDto : EventDto
{
    public List<SectionWithComponentsDto> Sections { get; set; } = new();
}

/// <summary>
/// Event list item DTO (lightweight)
/// </summary>
public class EventListItemDto
{
    public Guid Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string? Description { get; set; }
    public EventType Type { get; set; }
    public EventStatus Status { get; set; }
    public string? CoverImage { get; set; }
    public string ShareCode { get; set; } = string.Empty;
    public int ViewCount { get; set; }
    public int ResponseCount { get; set; }
    public int CompletedResponseCount { get; set; }
    public int SectionsCount { get; set; }
    public int ComponentsCount { get; set; }
    public DateTime CreatedAt { get; set; }

    /// <summary>
    /// معدل الإكمال (نسبة مئوية)
    /// </summary>
    public double CompletionRate => ResponseCount > 0
        ? Math.Round((double)CompletedResponseCount / ResponseCount * 100, 1)
        : 0;
}

