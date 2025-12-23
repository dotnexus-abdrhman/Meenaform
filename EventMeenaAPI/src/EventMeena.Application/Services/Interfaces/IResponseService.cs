using EventMeena.Application.DTOs.Common;
using EventMeena.Application.DTOs.Responses;

namespace EventMeena.Application.Services.Interfaces;

/// <summary>
/// Response service interface
/// </summary>
public interface IResponseService
{
    Task<ApiResponse<ResponseDto>> GetByIdAsync(Guid id, Guid userId);
    Task<ApiResponse<PagedResult<ResponseDto>>> GetByEventIdAsync(Guid eventId, Guid userId, PaginationParams pagination);
    Task<ApiResponse<ResponseStatsDto>> GetEventStatsAsync(Guid eventId, Guid userId);
    Task<ApiResponse<ResponseDto>> StartResponseAsync(Guid eventId, StartResponseRequest request, string? ipAddress, string? userAgent);
    Task<ApiResponse<ResponseDto>> SubmitSectionAnswersAsync(Guid responseId, SubmitSectionAnswersRequest request);
    Task<ApiResponse<ResponseDto>> CompleteResponseAsync(Guid responseId, CompleteResponseRequest request);
    Task<ApiResponse<ResponseDto?>> GetExistingResponseAsync(Guid eventId, string? email, string? ipAddress);
    Task<ApiResponse<ResponseDto>> UpdateResponseAnswersAsync(Guid responseId, UpdateResponseAnswersRequest request);
    Task<ApiResponse> DeleteAsync(Guid id, Guid userId);
    Task<ApiResponse> DeleteByEventIdAsync(Guid eventId, Guid userId);

    /// <summary>
    /// الحصول على جميع الأحداث التي شارك فيها المستخدم
    /// </summary>
    Task<ApiResponse<List<ParticipationDto>>> GetMyParticipationsAsync(string email);

    /// <summary>
    /// الحصول على تفاصيل مشاركة معينة
    /// </summary>
    Task<ApiResponse<ParticipationDetailsDto>> GetParticipationDetailsAsync(Guid responseId, string email);
}

