using EventMeena.Application.DTOs.Common;
using EventMeena.Application.DTOs.Groups;

namespace EventMeena.Application.Services.Interfaces;

/// <summary>
/// Group service interface
/// </summary>
public interface IGroupService
{
    Task<ApiResponse<GroupDto>> GetByIdAsync(Guid id, Guid userId);
    Task<ApiResponse<GroupWithContactsDto>> GetByIdWithContactsAsync(Guid id, Guid userId);
    Task<ApiResponse<List<GroupDto>>> GetUserGroupsAsync(Guid userId);
    Task<ApiResponse<List<GroupWithContactsDto>>> GetUserGroupsWithContactsAsync(Guid userId);
    Task<ApiResponse<GroupDto>> CreateAsync(Guid userId, CreateGroupRequest request);
    Task<ApiResponse<GroupDto>> UpdateAsync(Guid id, Guid userId, UpdateGroupRequest request);
    Task<ApiResponse> DeleteAsync(Guid id, Guid userId);
    Task<ApiResponse> AddContactsAsync(Guid id, Guid userId, AddContactsToGroupRequest request);
    Task<ApiResponse> RemoveContactsAsync(Guid id, Guid userId, RemoveContactsFromGroupRequest request);
}

