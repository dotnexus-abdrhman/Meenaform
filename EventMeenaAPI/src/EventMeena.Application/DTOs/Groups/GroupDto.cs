using EventMeena.Application.DTOs.Contacts;

namespace EventMeena.Application.DTOs.Groups;

/// <summary>
/// Group response DTO
/// </summary>
public class GroupDto
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? Description { get; set; }
    public string? Color { get; set; }
    public string? Icon { get; set; }
    public bool IsActive { get; set; }
    public int ContactCount { get; set; }
    public List<Guid> ContactIds { get; set; } = new();
    public DateTime CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }

    // إحصائيات (يتم حسابها)
    public GroupStatsDto? Stats { get; set; }
}

/// <summary>
/// إحصائيات المجموعة
/// </summary>
public class GroupStatsDto
{
    public int EventsSent { get; set; }
    public double AverageResponseRate { get; set; }
    public DateTime? LastEventSent { get; set; }
}

/// <summary>
/// Group with contacts DTO
/// </summary>
public class GroupWithContactsDto : GroupDto
{
    public List<ContactDto> Contacts { get; set; } = new();
}

