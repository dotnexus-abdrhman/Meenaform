using EventMeena.Application.DTOs.Components;

namespace EventMeena.Application.DTOs.Sections;

/// <summary>
/// Section response DTO
/// </summary>
public class SectionDto
{
    public Guid Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string? Description { get; set; }
    public int Order { get; set; }
    public bool IsVisible { get; set; }
    public Guid EventId { get; set; }
    public DateTime CreatedAt { get; set; }
}

/// <summary>
/// Section with components DTO
/// </summary>
public class SectionWithComponentsDto : SectionDto
{
    public List<ComponentDto> Components { get; set; } = new();
}

