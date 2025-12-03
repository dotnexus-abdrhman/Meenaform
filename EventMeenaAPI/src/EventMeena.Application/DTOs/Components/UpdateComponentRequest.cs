namespace EventMeena.Application.DTOs.Components;

/// <summary>
/// Update component request DTO
/// </summary>
public class UpdateComponentRequest
{
    public string? Title { get; set; }
    public string? Description { get; set; }
    public string? Placeholder { get; set; }
    public bool IsRequired { get; set; }
    public bool IsVisible { get; set; }
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

/// <summary>
/// Reorder components request DTO
/// </summary>
public class ReorderComponentsRequest
{
    public List<Guid> ComponentIds { get; set; } = new();
}

