using EventMeena.Application.DTOs.Common;
using EventMeena.Application.DTOs.Groups;
using EventMeena.Application.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EventMeena.API.Controllers;

/// <summary>
/// Groups management controller
/// </summary>
[Authorize]
public class GroupsController : BaseApiController
{
    private readonly IGroupService _groupService;

    public GroupsController(IGroupService groupService)
    {
        _groupService = groupService;
    }

    /// <summary>
    /// الحصول على جميع مجموعات المستخدم
    /// </summary>
    [HttpGet]
    public async Task<ActionResult<ApiResponse<List<GroupDto>>>> GetGroups()
    {
        var result = await _groupService.GetUserGroupsAsync(CurrentUserId);
        
        if (!result.Success)
            return BadRequestResponse<List<GroupDto>>(result.Message ?? "فشل جلب المجموعات");
            
        return Success(result.Data!);
    }

    /// <summary>
    /// الحصول على جميع مجموعات المستخدم مع جهات الاتصال
    /// </summary>
    [HttpGet("with-contacts")]
    public async Task<ActionResult<ApiResponse<List<GroupWithContactsDto>>>> GetGroupsWithContacts()
    {
        var result = await _groupService.GetUserGroupsWithContactsAsync(CurrentUserId);
        
        if (!result.Success)
            return BadRequestResponse<List<GroupWithContactsDto>>(result.Message ?? "فشل جلب المجموعات");
            
        return Success(result.Data!);
    }

    /// <summary>
    /// الحصول على مجموعة بالـ ID
    /// </summary>
    [HttpGet("{id:guid}")]
    public async Task<ActionResult<ApiResponse<GroupDto>>> GetById(Guid id)
    {
        var result = await _groupService.GetByIdAsync(id, CurrentUserId);
        
        if (!result.Success)
            return NotFoundResponse<GroupDto>(result.Message ?? "المجموعة غير موجودة");
            
        return Success(result.Data!);
    }

    /// <summary>
    /// الحصول على مجموعة مع جهات الاتصال
    /// </summary>
    [HttpGet("{id:guid}/with-contacts")]
    public async Task<ActionResult<ApiResponse<GroupWithContactsDto>>> GetByIdWithContacts(Guid id)
    {
        var result = await _groupService.GetByIdWithContactsAsync(id, CurrentUserId);
        
        if (!result.Success)
            return NotFoundResponse<GroupWithContactsDto>(result.Message ?? "المجموعة غير موجودة");
            
        return Success(result.Data!);
    }

    /// <summary>
    /// إنشاء مجموعة جديدة
    /// </summary>
    [HttpPost]
    public async Task<ActionResult<ApiResponse<GroupDto>>> Create([FromBody] CreateGroupRequest request)
    {
        var result = await _groupService.CreateAsync(CurrentUserId, request);
        
        if (!result.Success)
            return BadRequestResponse<GroupDto>(result.Message ?? "فشل إنشاء المجموعة");
            
        return Created(result.Data!, "تم إنشاء المجموعة بنجاح");
    }

    /// <summary>
    /// تحديث مجموعة
    /// </summary>
    [HttpPut("{id:guid}")]
    public async Task<ActionResult<ApiResponse<GroupDto>>> Update(Guid id, [FromBody] UpdateGroupRequest request)
    {
        var result = await _groupService.UpdateAsync(id, CurrentUserId, request);
        
        if (!result.Success)
            return BadRequestResponse<GroupDto>(result.Message ?? "فشل تحديث المجموعة");
            
        return Success(result.Data!, "تم تحديث المجموعة بنجاح");
    }

    /// <summary>
    /// حذف مجموعة
    /// </summary>
    [HttpDelete("{id:guid}")]
    public async Task<ActionResult<ApiResponse>> Delete(Guid id)
    {
        var result = await _groupService.DeleteAsync(id, CurrentUserId);
        
        if (!result.Success)
            return BadRequestNoContent(result.Message ?? "فشل حذف المجموعة");
            
        return SuccessNoContent("تم حذف المجموعة بنجاح");
    }

    /// <summary>
    /// إضافة جهات اتصال إلى مجموعة
    /// </summary>
    [HttpPost("{id:guid}/contacts")]
    public async Task<ActionResult<ApiResponse>> AddContacts(Guid id, [FromBody] AddContactsToGroupRequest request)
    {
        var result = await _groupService.AddContactsAsync(id, CurrentUserId, request);
        
        if (!result.Success)
            return BadRequestNoContent(result.Message ?? "فشل إضافة جهات الاتصال");
            
        return SuccessNoContent("تم إضافة جهات الاتصال بنجاح");
    }

    /// <summary>
    /// إزالة جهات اتصال من مجموعة
    /// </summary>
    [HttpDelete("{id:guid}/contacts")]
    public async Task<ActionResult<ApiResponse>> RemoveContacts(Guid id, [FromBody] RemoveContactsFromGroupRequest request)
    {
        var result = await _groupService.RemoveContactsAsync(id, CurrentUserId, request);
        
        if (!result.Success)
            return BadRequestNoContent(result.Message ?? "فشل إزالة جهات الاتصال");
            
        return SuccessNoContent("تم إزالة جهات الاتصال بنجاح");
    }
}

