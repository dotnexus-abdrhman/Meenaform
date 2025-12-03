using EventMeena.Domain.Common;

namespace EventMeena.Domain.Entities;

/// <summary>
/// كيان القسم (صفحة في الحدث)
/// </summary>
public class Section : AuditableEntity
{
    public string Title { get; set; } = string.Empty;
    public string? Description { get; set; }
    public int Order { get; set; }
    public bool IsVisible { get; set; } = true;
    
    // الحدث المالك
    public Guid EventId { get; set; }
    
    // Navigation Properties
    public virtual Event Event { get; set; } = null!;
    public virtual ICollection<Component> Components { get; set; } = new List<Component>();
}

