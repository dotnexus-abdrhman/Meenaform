using EventMeena.Application.Interfaces;
using EventMeena.Domain.Entities;
using EventMeena.Domain.Enums;
using EventMeena.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace EventMeena.Infrastructure.Repositories;

/// <summary>
/// Response Repository Implementation
/// </summary>
public class ResponseRepository : GenericRepository<Response>, IResponseRepository
{
    public ResponseRepository(ApplicationDbContext context) : base(context)
    {
    }

    public async Task<IReadOnlyList<Response>> GetByEventIdAsync(Guid eventId)
    {
        return await _dbSet
            .Where(r => r.EventId == eventId)
            .OrderByDescending(r => r.CreatedAt)
            .ToListAsync();
    }

    public async Task<IReadOnlyList<Response>> GetByEventIdAndStatusAsync(Guid eventId, ResponseStatus status)
    {
        return await _dbSet
            .Where(r => r.EventId == eventId && r.Status == status)
            .OrderByDescending(r => r.CreatedAt)
            .ToListAsync();
    }

    public async Task<Response?> GetByEventIdAndEmailAsync(Guid eventId, string email)
    {
        return await _dbSet
            .FirstOrDefaultAsync(r => r.EventId == eventId &&
                r.RespondentEmail != null &&
                r.RespondentEmail.ToLower() == email.ToLower());
    }

    public async Task<Response?> GetByEventIdAndIpAsync(Guid eventId, string ipAddress)
    {
        return await _dbSet
            .FirstOrDefaultAsync(r => r.EventId == eventId &&
                r.RespondentIp != null &&
                r.RespondentIp == ipAddress);
    }

    public async Task<Response?> GetCompletedByEventIdAndEmailAsync(Guid eventId, string email)
    {
        return await _dbSet
            .FirstOrDefaultAsync(r => r.EventId == eventId &&
                r.RespondentEmail != null &&
                r.RespondentEmail.ToLower() == email.ToLower() &&
                r.Status == ResponseStatus.Completed);
    }

    public async Task<Response?> GetCompletedByEventIdAndIpAsync(Guid eventId, string ipAddress)
    {
        return await _dbSet
            .FirstOrDefaultAsync(r => r.EventId == eventId &&
                r.RespondentIp != null &&
                r.RespondentIp == ipAddress &&
                r.Status == ResponseStatus.Completed);
    }

    public async Task<int> GetCompletedCountByEventIdAsync(Guid eventId)
    {
        return await _dbSet
            .CountAsync(r => r.EventId == eventId && r.Status == ResponseStatus.Completed);
    }

    public async Task<double?> GetAverageScoreByEventIdAsync(Guid eventId)
    {
        return await _dbSet
            .Where(r => r.EventId == eventId && r.Score.HasValue)
            .AverageAsync(r => (double?)r.Score);
    }

    public async Task<IReadOnlyList<Response>> GetRecentByEventIdAsync(Guid eventId, int count)
    {
        return await _dbSet
            .Where(r => r.EventId == eventId)
            .OrderByDescending(r => r.CreatedAt)
            .Take(count)
            .ToListAsync();
    }

    public async Task<Application.DTOs.Responses.ResponseStatsDto> GetEventStatsAsync(Guid eventId)
    {
        var responses = await _dbSet.Where(r => r.EventId == eventId).ToListAsync();
        var completed = responses.Count(r => r.Status == ResponseStatus.Completed);
        var inProgress = responses.Count(r => r.Status == ResponseStatus.InProgress);
        var avgScore = responses.Where(r => r.Score.HasValue).Select(r => (double)r.Score!.Value).DefaultIfEmpty(0).Average();
        var avgDuration = responses.Where(r => r.DurationSeconds.HasValue).Select(r => (double)r.DurationSeconds!.Value).DefaultIfEmpty(0).Average();
        var passed = responses.Count(r => r.IsPassed == true);
        var failed = responses.Count(r => r.IsPassed == false);

        return new Application.DTOs.Responses.ResponseStatsDto
        {
            TotalResponses = responses.Count,
            CompletedResponses = completed,
            InProgressResponses = inProgress,
            AverageScore = avgScore,
            AverageDurationSeconds = avgDuration,
            PassedCount = passed,
            FailedCount = failed,
            PassRate = completed > 0 ? (double)passed / completed * 100 : 0
        };
    }

    public async Task DeleteByEventIdAsync(Guid eventId)
    {
        var responses = await _dbSet.Where(r => r.EventId == eventId).ToListAsync();
        _dbSet.RemoveRange(responses);
    }

    public async Task<Dictionary<DateTime, int>> GetDailyResponseCountsAsync(Guid userId, DateTime startDate, DateTime endDate)
    {
        var responses = await _dbSet
            .Include(r => r.Event)
            .Where(r => r.Event.UserId == userId &&
                       r.Status == ResponseStatus.Completed &&
                       r.CompletedAt.HasValue &&
                       r.CompletedAt.Value >= startDate &&
                       r.CompletedAt.Value <= endDate)
            .Select(r => r.CompletedAt!.Value.Date)
            .ToListAsync();

        return responses
            .GroupBy(d => d)
            .ToDictionary(g => g.Key, g => g.Count());
    }

    public async Task<int> GetCompletedResponsesCountAsync(Guid userId, DateTime? startDate = null, DateTime? endDate = null)
    {
        var query = _dbSet
            .Include(r => r.Event)
            .Where(r => r.Event.UserId == userId && r.Status == ResponseStatus.Completed);

        if (startDate.HasValue)
            query = query.Where(r => r.CompletedAt.HasValue && r.CompletedAt.Value >= startDate.Value);

        if (endDate.HasValue)
            query = query.Where(r => r.CompletedAt.HasValue && r.CompletedAt.Value <= endDate.Value);

        return await query.CountAsync();
    }
}

