using EventMeena.Application.Interfaces;
using EventMeena.Domain.Entities;
using EventMeena.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace EventMeena.Infrastructure.Repositories;

/// <summary>
/// Contact Repository Implementation
/// </summary>
public class ContactRepository : GenericRepository<Contact>, IContactRepository
{
    public ContactRepository(ApplicationDbContext context) : base(context)
    {
    }

    public async Task<IReadOnlyList<Contact>> GetByUserIdAsync(Guid userId)
    {
        return await _dbSet
            .Include(c => c.SendHistories)
            .Where(c => c.UserId == userId && c.IsActive)
            .OrderBy(c => c.Name)
            .ToListAsync();
    }

    public async Task<IReadOnlyList<Contact>> GetByUserIdWithGroupsAsync(Guid userId)
    {
        return await _dbSet
            .Include(c => c.ContactGroups)
                .ThenInclude(cg => cg.Group)
            .Include(c => c.SendHistories)
            .Where(c => c.UserId == userId && c.IsActive)
            .OrderBy(c => c.Name)
            .ToListAsync();
    }

    public async Task<IReadOnlyList<Contact>> GetByGroupIdAsync(Guid groupId)
    {
        return await _context.ContactGroups
            .Where(cg => cg.GroupId == groupId)
            .Select(cg => cg.Contact)
            .Where(c => c.IsActive)
            .OrderBy(c => c.Name)
            .ToListAsync();
    }

    public async Task<Contact?> GetByEmailAndUserIdAsync(string email, Guid userId)
    {
        return await _dbSet
            .FirstOrDefaultAsync(c => c.Email != null &&
                c.Email.ToLower() == email.ToLower() &&
                c.UserId == userId);
    }

    public async Task<bool> ExistsByEmailAndUserIdAsync(string email, Guid userId)
    {
        return await _dbSet
            .AnyAsync(c => c.Email != null &&
                c.Email.ToLower() == email.ToLower() &&
                c.UserId == userId);
    }

    public async Task<IReadOnlyList<Contact>> SearchAsync(Guid userId, string searchTerm)
    {
        var lowerSearchTerm = searchTerm.ToLower();
        return await _dbSet
            .Where(c => c.UserId == userId && c.IsActive &&
                (c.Name.ToLower().Contains(lowerSearchTerm) ||
                 (c.Email != null && c.Email.ToLower().Contains(lowerSearchTerm)) ||
                 (c.Phone != null && c.Phone.Contains(searchTerm)) ||
                 (c.Company != null && c.Company.ToLower().Contains(lowerSearchTerm))))
            .OrderBy(c => c.Name)
            .ToListAsync();
    }
}

