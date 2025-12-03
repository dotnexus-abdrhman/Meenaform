namespace EventMeena.Application.DTOs.Templates;

/// <summary>
/// Update template request DTO
/// </summary>
public class UpdateTemplateRequest
{
    public string Name { get; set; } = string.Empty;
    public string? Description { get; set; }
    public string? ThumbnailUrl { get; set; }
    public string TemplateDataJson { get; set; } = string.Empty;
    public bool IsPublic { get; set; }
}

