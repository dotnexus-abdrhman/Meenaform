using EventMeena.Domain.Enums;

namespace EventMeena.Application.DTOs.Templates;

/// <summary>
/// Template response DTO
/// </summary>
public class TemplateDto
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? Description { get; set; }
    public EventType Type { get; set; }
    public string? ThumbnailUrl { get; set; }
    public string TemplateDataJson { get; set; } = string.Empty;
    public bool IsPublic { get; set; }
    public int UsageCount { get; set; }
    public Guid UserId { get; set; }
    public DateTime CreatedAt { get; set; }
}

/// <summary>
/// Template list item DTO (lightweight)
/// </summary>
public class TemplateListItemDto
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? Description { get; set; }
    public EventType Type { get; set; }
    public string? ThumbnailUrl { get; set; }
    public bool IsPublic { get; set; }
    public int UsageCount { get; set; }
    public DateTime CreatedAt { get; set; }
}

