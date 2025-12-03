using EventMeena.Domain.Entities;

namespace EventMeena.Application.Interfaces;

/// <summary>
/// Group Repository Interface
/// </summary>
public interface IGroupRepository : IGenericRepository<Group>
{
    Task<IReadOnlyList<Group>> GetByUserIdAsync(Guid userId);
    Task<IReadOnlyList<Group>> GetByUserIdWithContactsAsync(Guid userId);
    Task<Group?> GetByIdWithContactsAsync(Guid id);
    Task<int> GetContactCountAsync(Guid groupId);
}

