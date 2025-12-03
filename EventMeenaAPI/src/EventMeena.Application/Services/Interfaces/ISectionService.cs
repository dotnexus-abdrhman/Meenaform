using EventMeena.Application.DTOs.Common;
using EventMeena.Application.DTOs.Sections;

namespace EventMeena.Application.Services.Interfaces;

/// <summary>
/// Section service interface
/// </summary>
public interface ISectionService
{
    Task<ApiResponse<SectionDto>> GetByIdAsync(Guid id, Guid userId);
    Task<ApiResponse<SectionWithComponentsDto>> GetByIdWithComponentsAsync(Guid id, Guid userId);
    Task<ApiResponse<List<SectionDto>>> GetByEventIdAsync(Guid eventId, Guid userId);
    Task<ApiResponse<List<SectionWithComponentsDto>>> GetByEventIdWithComponentsAsync(Guid eventId, Guid userId);
    Task<ApiResponse<SectionDto>> CreateAsync(Guid eventId, Guid userId, CreateSectionRequest request);
    Task<ApiResponse<SectionDto>> UpdateAsync(Guid id, Guid userId, UpdateSectionRequest request);
    Task<ApiResponse> DeleteAsync(Guid id, Guid userId);
    Task<ApiResponse> ReorderAsync(Guid eventId, Guid userId, ReorderSectionsRequest request);
}

