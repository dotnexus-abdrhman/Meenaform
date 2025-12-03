namespace EventMeena.Application.DTOs.Sections;

/// <summary>
/// Create section request DTO
/// </summary>
public class CreateSectionRequest
{
    public string Title { get; set; } = string.Empty;
    public string? Description { get; set; }
    public bool IsVisible { get; set; } = true;
}

