namespace EventMeena.Application.DTOs.Groups;

/// <summary>
/// Create group request DTO
/// </summary>
public class CreateGroupRequest
{
    public string Name { get; set; } = string.Empty;
    public string? Description { get; set; }
    public string? Color { get; set; }
    public string? Icon { get; set; }
    public List<Guid>? ContactIds { get; set; }
}

