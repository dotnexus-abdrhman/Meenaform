namespace EventMeena.Application.DTOs.Sections;

/// <summary>
/// Update section request DTO
/// </summary>
public class UpdateSectionRequest
{
    public string Title { get; set; } = string.Empty;
    public string? Description { get; set; }
    public bool IsVisible { get; set; }
}

/// <summary>
/// Reorder sections request DTO
/// </summary>
public class ReorderSectionsRequest
{
    public List<Guid> SectionIds { get; set; } = new();
}

