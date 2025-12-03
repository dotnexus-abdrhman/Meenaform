namespace EventMeena.Domain.Common;

/// <summary>
/// Base entity class that all entities inherit from
/// </summary>
public abstract class BaseEntity
{
    public Guid Id { get; set; }
}

