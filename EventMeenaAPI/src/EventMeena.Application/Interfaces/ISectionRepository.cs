using EventMeena.Domain.Entities;

namespace EventMeena.Application.Interfaces;

/// <summary>
/// Section Repository Interface
/// </summary>
public interface ISectionRepository : IGenericRepository<Section>
{
    Task<IReadOnlyList<Section>> GetByEventIdAsync(Guid eventId);
    Task<IReadOnlyList<Section>> GetByEventIdWithComponentsAsync(Guid eventId);
    Task<int> GetMaxOrderByEventIdAsync(Guid eventId);
    Task ReorderSectionsAsync(Guid eventId, List<Guid> sectionIds);
}

