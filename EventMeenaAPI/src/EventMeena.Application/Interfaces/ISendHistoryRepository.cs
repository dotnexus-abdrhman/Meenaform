using EventMeena.Domain.Entities;
using EventMeena.Domain.Enums;

namespace EventMeena.Application.Interfaces;

/// <summary>
/// SendHistory Repository Interface
/// </summary>
public interface ISendHistoryRepository : IGenericRepository<SendHistory>
{
    Task<IReadOnlyList<SendHistory>> GetByEventIdAsync(Guid eventId);
    Task<IReadOnlyList<SendHistory>> GetByEventIdAndStatusAsync(Guid eventId, SendStatus status);
    Task<IReadOnlyList<SendHistory>> GetByContactIdAsync(Guid contactId);
    Task<int> GetSentCountByEventIdAsync(Guid eventId);
    Task<int> GetDeliveredCountByEventIdAsync(Guid eventId);
    Task<int> GetOpenedCountByEventIdAsync(Guid eventId);
}

