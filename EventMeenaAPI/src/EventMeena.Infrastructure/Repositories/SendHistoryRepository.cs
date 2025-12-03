using EventMeena.Application.Interfaces;
using EventMeena.Domain.Entities;
using EventMeena.Domain.Enums;
using EventMeena.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace EventMeena.Infrastructure.Repositories;

/// <summary>
/// SendHistory Repository Implementation
/// </summary>
public class SendHistoryRepository : GenericRepository<SendHistory>, ISendHistoryRepository
{
    public SendHistoryRepository(ApplicationDbContext context) : base(context)
    {
    }

    public async Task<IReadOnlyList<SendHistory>> GetByEventIdAsync(Guid eventId)
    {
        return await _dbSet
            .Include(s => s.Contact)
            .Where(s => s.EventId == eventId)
            .OrderByDescending(s => s.CreatedAt)
            .ToListAsync();
    }

    public async Task<IReadOnlyList<SendHistory>> GetByEventIdAndStatusAsync(Guid eventId, SendStatus status)
    {
        return await _dbSet
            .Include(s => s.Contact)
            .Where(s => s.EventId == eventId && s.Status == status)
            .OrderByDescending(s => s.CreatedAt)
            .ToListAsync();
    }

    public async Task<IReadOnlyList<SendHistory>> GetByContactIdAsync(Guid contactId)
    {
        return await _dbSet
            .Include(s => s.Event)
            .Where(s => s.ContactId == contactId)
            .OrderByDescending(s => s.CreatedAt)
            .ToListAsync();
    }

    public async Task<int> GetSentCountByEventIdAsync(Guid eventId)
    {
        return await _dbSet
            .CountAsync(s => s.EventId == eventId && 
                (s.Status == SendStatus.Sent || 
                 s.Status == SendStatus.Delivered || 
                 s.Status == SendStatus.Opened));
    }

    public async Task<int> GetDeliveredCountByEventIdAsync(Guid eventId)
    {
        return await _dbSet
            .CountAsync(s => s.EventId == eventId && 
                (s.Status == SendStatus.Delivered || s.Status == SendStatus.Opened));
    }

    public async Task<int> GetOpenedCountByEventIdAsync(Guid eventId)
    {
        return await _dbSet
            .CountAsync(s => s.EventId == eventId && s.Status == SendStatus.Opened);
    }
}

