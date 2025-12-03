using EventMeena.Application.DTOs.Common;
using EventMeena.Application.DTOs.Templates;
using EventMeena.Domain.Enums;

namespace EventMeena.Application.Services.Interfaces;

/// <summary>
/// Template service interface
/// </summary>
public interface ITemplateService
{
    Task<ApiResponse<TemplateDto>> GetByIdAsync(Guid id, Guid userId);
    Task<ApiResponse<List<TemplateListItemDto>>> GetUserTemplatesAsync(Guid userId);
    Task<ApiResponse<List<TemplateListItemDto>>> GetUserTemplatesByTypeAsync(Guid userId, EventType type);
    Task<ApiResponse<List<TemplateListItemDto>>> GetPublicTemplatesAsync();
    Task<ApiResponse<List<TemplateListItemDto>>> GetPublicTemplatesByTypeAsync(EventType type);
    Task<ApiResponse<TemplateDto>> CreateAsync(Guid userId, CreateTemplateRequest request);
    Task<ApiResponse<TemplateDto>> CreateFromEventAsync(Guid userId, CreateTemplateFromEventRequest request);
    Task<ApiResponse<TemplateDto>> UpdateAsync(Guid id, Guid userId, UpdateTemplateRequest request);
    Task<ApiResponse> DeleteAsync(Guid id, Guid userId);
    Task<ApiResponse<Guid>> UseTemplateAsync(Guid id, Guid userId);
}

