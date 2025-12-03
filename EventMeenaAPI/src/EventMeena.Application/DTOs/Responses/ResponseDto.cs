using EventMeena.Domain.Enums;

namespace EventMeena.Application.DTOs.Responses;

/// <summary>
/// Response DTO
/// </summary>
public class ResponseDto
{
    public Guid Id { get; set; }
    public ResponseStatus Status { get; set; }
    public string? RespondentName { get; set; }
    public string? RespondentEmail { get; set; }
    public string? RespondentPhone { get; set; }
    public string AnswersJson { get; set; } = string.Empty;
    public DateTime StartedAt { get; set; }
    public DateTime? CompletedAt { get; set; }
    public int? DurationSeconds { get; set; }
    public int? Score { get; set; }
    public int? TotalPoints { get; set; }
    public double? Percentage { get; set; }
    public bool? IsPassed { get; set; }
    public int CurrentSectionIndex { get; set; }
    public Guid EventId { get; set; }
    public DateTime CreatedAt { get; set; }
}

/// <summary>
/// Response statistics DTO
/// </summary>
public class ResponseStatsDto
{
    public int TotalResponses { get; set; }
    public int CompletedResponses { get; set; }
    public int InProgressResponses { get; set; }
    public double? AverageScore { get; set; }
    public double? AverageDurationSeconds { get; set; }
    public int PassedCount { get; set; }
    public int FailedCount { get; set; }
    public double PassRate { get; set; }
}

