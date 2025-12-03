using EventMeena.Application.DTOs.Common;
using EventMeena.Application.DTOs.Contacts;

namespace EventMeena.Application.Services.Interfaces;

/// <summary>
/// Contact service interface
/// </summary>
public interface IContactService
{
    Task<ApiResponse<ContactDto>> GetByIdAsync(Guid id, Guid userId);
    Task<ApiResponse<ContactWithGroupsDto>> GetByIdWithGroupsAsync(Guid id, Guid userId);
    Task<ApiResponse<PagedResult<ContactDto>>> GetUserContactsAsync(Guid userId, PaginationParams pagination);
    Task<ApiResponse<List<ContactWithGroupsDto>>> GetUserContactsWithGroupsAsync(Guid userId);
    Task<ApiResponse<List<ContactDto>>> SearchAsync(Guid userId, string searchTerm);
    Task<ApiResponse<ContactDto>> CreateAsync(Guid userId, CreateContactRequest request);
    Task<ApiResponse<ContactDto>> UpdateAsync(Guid id, Guid userId, UpdateContactRequest request);
    Task<ApiResponse> DeleteAsync(Guid id, Guid userId);
    Task<ApiResponse<List<ContactDto>>> ImportAsync(Guid userId, List<CreateContactRequest> contacts);
}

