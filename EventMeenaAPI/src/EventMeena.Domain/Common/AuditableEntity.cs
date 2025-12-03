namespace EventMeena.Domain.Common;

/// <summary>
/// Base entity with audit fields (CreatedAt, UpdatedAt)
/// </summary>
public abstract class AuditableEntity : BaseEntity
{
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? UpdatedAt { get; set; }
}

