using EventMeena.Domain.Entities;

namespace EventMeena.Application.Interfaces;

/// <summary>
/// Component Repository Interface
/// </summary>
public interface IComponentRepository : IGenericRepository<Component>
{
    Task<IReadOnlyList<Component>> GetBySectionIdAsync(Guid sectionId);
    Task<int> GetMaxOrderBySectionIdAsync(Guid sectionId);
    Task ReorderComponentsAsync(Guid sectionId, List<Guid> componentIds);
}

