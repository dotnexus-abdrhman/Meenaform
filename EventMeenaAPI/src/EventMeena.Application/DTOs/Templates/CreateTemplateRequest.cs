using EventMeena.Domain.Enums;

namespace EventMeena.Application.DTOs.Templates;

/// <summary>
/// Create template request DTO
/// </summary>
public class CreateTemplateRequest
{
    public string Name { get; set; } = string.Empty;
    public string? Description { get; set; }
    public EventType Type { get; set; }
    public string? ThumbnailUrl { get; set; }
    public string TemplateDataJson { get; set; } = string.Empty;
    public bool IsPublic { get; set; }
}

/// <summary>
/// Create template from event request DTO
/// </summary>
public class CreateTemplateFromEventRequest
{
    public Guid EventId { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? Description { get; set; }
    public string? ThumbnailUrl { get; set; }
    public bool IsPublic { get; set; }
}

