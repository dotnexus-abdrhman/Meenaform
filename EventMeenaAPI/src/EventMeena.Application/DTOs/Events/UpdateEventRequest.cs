using EventMeena.Domain.Enums;

namespace EventMeena.Application.DTOs.Events;

/// <summary>
/// Update event request DTO
/// جميع الحقول nullable لدعم التحديث الجزئي
/// </summary>
public class UpdateEventRequest
{
    public string? Title { get; set; }
    public string? Description { get; set; }
    public EventStatus? Status { get; set; }
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
    public bool? ShowResults { get; set; }
    public bool? ShowCorrectAnswers { get; set; }
    public bool? ShuffleQuestions { get; set; }
    public bool? ShuffleOptions { get; set; }
    public int? PassingScore { get; set; }
}

