using EventMeena.Application.DTOs.Groups;

namespace EventMeena.Application.DTOs.Contacts;

/// <summary>
/// Contact response DTO
/// </summary>
public class ContactDto
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? Email { get; set; }
    public string? Phone { get; set; }
    public string? Company { get; set; }
    public string? JobTitle { get; set; }
    public string? Notes { get; set; }
    public List<string> Tags { get; set; } = new();
    public List<Guid> GroupIds { get; set; } = new();
    public bool IsActive { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }

    // إحصائيات (يتم حسابها)
    public ContactStatsDto? Stats { get; set; }
}

/// <summary>
/// إحصائيات جهة الاتصال
/// </summary>
public class ContactStatsDto
{
    public int EventsSent { get; set; }
    public int EventsCompleted { get; set; }
    public double ResponseRate { get; set; }
    public DateTime? LastInteraction { get; set; }
}

/// <summary>
/// Contact with groups DTO
/// </summary>
public class ContactWithGroupsDto : ContactDto
{
    public List<GroupDto> Groups { get; set; } = new();
}

