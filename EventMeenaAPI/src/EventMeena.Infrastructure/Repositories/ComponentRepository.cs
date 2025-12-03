using EventMeena.Application.Interfaces;
using EventMeena.Domain.Entities;
using EventMeena.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace EventMeena.Infrastructure.Repositories;

/// <summary>
/// Component Repository Implementation
/// </summary>
public class ComponentRepository : GenericRepository<Component>, IComponentRepository
{
    public ComponentRepository(ApplicationDbContext context) : base(context)
    {
    }

    public async Task<IReadOnlyList<Component>> GetBySectionIdAsync(Guid sectionId)
    {
        return await _dbSet
            .Where(c => c.SectionId == sectionId)
            .OrderBy(c => c.Order)
            .ToListAsync();
    }

    public async Task<int> GetMaxOrderBySectionIdAsync(Guid sectionId)
    {
        var maxOrder = await _dbSet
            .Where(c => c.SectionId == sectionId)
            .MaxAsync(c => (int?)c.Order);
        return maxOrder ?? 0;
    }

    public async Task ReorderComponentsAsync(Guid sectionId, List<Guid> componentIds)
    {
        var components = await _dbSet
            .Where(c => c.SectionId == sectionId)
            .ToListAsync();

        for (int i = 0; i < componentIds.Count; i++)
        {
            var component = components.FirstOrDefault(c => c.Id == componentIds[i]);
            if (component != null)
            {
                component.Order = i;
            }
        }
    }
}

