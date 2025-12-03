namespace EventMeena.Domain.Entities;

/// <summary>
/// جدول العلاقة بين جهات الاتصال والمجموعات (Many-to-Many)
/// </summary>
public class ContactGroup
{
    public Guid ContactId { get; set; }
    public Guid GroupId { get; set; }
    public DateTime AddedAt { get; set; } = DateTime.UtcNow;
    
    // Navigation Properties
    public virtual Contact Contact { get; set; } = null!;
    public virtual Group Group { get; set; } = null!;
}

