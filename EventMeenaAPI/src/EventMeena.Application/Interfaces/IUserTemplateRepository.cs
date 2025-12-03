using EventMeena.Domain.Entities;
using EventMeena.Domain.Enums;

namespace EventMeena.Application.Interfaces;

/// <summary>
/// UserTemplate Repository Interface
/// </summary>
public interface IUserTemplateRepository : IGenericRepository<UserTemplate>
{
    Task<IReadOnlyList<UserTemplate>> GetByUserIdAsync(Guid userId);
    Task<IReadOnlyList<UserTemplate>> GetByUserIdAndTypeAsync(Guid userId, EventType type);
    Task<IReadOnlyList<UserTemplate>> GetPublicTemplatesAsync();
    Task<IReadOnlyList<UserTemplate>> GetPublicTemplatesByTypeAsync(EventType type);
    Task IncrementUsageCountAsync(Guid templateId);
}

