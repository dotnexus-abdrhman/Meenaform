using EventMeena.Application.DTOs.Common;
using EventMeena.Application.DTOs.Components;

namespace EventMeena.Application.Services.Interfaces;

/// <summary>
/// Component service interface
/// </summary>
public interface IComponentService
{
    Task<ApiResponse<ComponentDto>> GetByIdAsync(Guid id, Guid userId);
    Task<ApiResponse<List<ComponentDto>>> GetBySectionIdAsync(Guid sectionId, Guid userId);
    Task<ApiResponse<ComponentDto>> CreateAsync(Guid sectionId, Guid userId, CreateComponentRequest request);
    Task<ApiResponse<ComponentDto>> UpdateAsync(Guid id, Guid userId, UpdateComponentRequest request);
    Task<ApiResponse> DeleteAsync(Guid id, Guid userId);
    Task<ApiResponse> ReorderAsync(Guid sectionId, Guid userId, ReorderComponentsRequest request);
}

