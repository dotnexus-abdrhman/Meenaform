using EventMeena.Domain.Enums;

namespace EventMeena.Application.DTOs.Components;

/// <summary>
/// Create component request DTO
/// </summary>
public class CreateComponentRequest
{
    public ComponentType Type { get; set; }
    public string? Title { get; set; }
    public string? Description { get; set; }
    public string? Placeholder { get; set; }
    public bool IsRequired { get; set; }
    public bool IsVisible { get; set; } = true;
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

