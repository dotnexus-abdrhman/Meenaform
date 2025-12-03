using EventMeena.Application.Interfaces;
using EventMeena.Domain.Entities;
using EventMeena.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace EventMeena.Infrastructure.Repositories;

/// <summary>
/// Section Repository Implementation
/// </summary>
public class SectionRepository : GenericRepository<Section>, ISectionRepository
{
    public SectionRepository(ApplicationDbContext context) : base(context)
    {
    }

    public async Task<IReadOnlyList<Section>> GetByEventIdAsync(Guid eventId)
    {
        return await _dbSet
            .Where(s => s.EventId == eventId)
            .OrderBy(s => s.Order)
            .ToListAsync();
    }

    public async Task<IReadOnlyList<Section>> GetByEventIdWithComponentsAsync(Guid eventId)
    {
        return await _dbSet
            .Include(s => s.Components.OrderBy(c => c.Order))
            .Where(s => s.EventId == eventId)
            .OrderBy(s => s.Order)
            .ToListAsync();
    }

    public async Task<int> GetMaxOrderByEventIdAsync(Guid eventId)
    {
        var maxOrder = await _dbSet
            .Where(s => s.EventId == eventId)
            .MaxAsync(s => (int?)s.Order);
        return maxOrder ?? 0;
    }

    public async Task ReorderSectionsAsync(Guid eventId, List<Guid> sectionIds)
    {
        var sections = await _dbSet
            .Where(s => s.EventId == eventId)
            .ToListAsync();

        for (int i = 0; i < sectionIds.Count; i++)
        {
            var section = sections.FirstOrDefault(s => s.Id == sectionIds[i]);
            if (section != null)
            {
                section.Order = i;
            }
        }
    }
}

