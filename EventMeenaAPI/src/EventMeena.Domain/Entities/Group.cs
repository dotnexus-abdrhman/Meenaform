using EventMeena.Domain.Common;

namespace EventMeena.Domain.Entities;

/// <summary>
/// كيان المجموعة (مجموعة جهات اتصال)
/// </summary>
public class Group : AuditableEntity
{
    public string Name { get; set; } = string.Empty;
    public string? Description { get; set; }
    public string? Color { get; set; }
    public string? Icon { get; set; }
    public bool IsActive { get; set; } = true;

    // المالك
    public Guid UserId { get; set; }

    // Navigation Properties
    public virtual User User { get; set; } = null!;
    public virtual ICollection<ContactGroup> ContactGroups { get; set; } = new List<ContactGroup>();
}

