using EventMeena.Domain.Common;

namespace EventMeena.Domain.Entities;

/// <summary>
/// كيان جهة الاتصال
/// </summary>
public class Contact : AuditableEntity
{
    public string Name { get; set; } = string.Empty;
    public string? Email { get; set; }
    public string? Phone { get; set; }
    public string? Company { get; set; }
    public string? JobTitle { get; set; }
    public string? Notes { get; set; }
    public string? Tags { get; set; }  // JSON array of tags
    public bool IsActive { get; set; } = true;

    // المالك
    public Guid UserId { get; set; }

    // Navigation Properties
    public virtual User User { get; set; } = null!;
    public virtual ICollection<ContactGroup> ContactGroups { get; set; } = new List<ContactGroup>();
    public virtual ICollection<SendHistory> SendHistories { get; set; } = new List<SendHistory>();
}

