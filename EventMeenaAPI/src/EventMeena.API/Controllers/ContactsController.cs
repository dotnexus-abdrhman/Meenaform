using EventMeena.Application.DTOs.Common;
using EventMeena.Application.DTOs.Contacts;
using EventMeena.Application.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EventMeena.API.Controllers;

/// <summary>
/// Contacts management controller
/// </summary>
[Authorize]
public class ContactsController : BaseApiController
{
    private readonly IContactService _contactService;

    public ContactsController(IContactService contactService)
    {
        _contactService = contactService;
    }

    /// <summary>
    /// الحصول على جميع جهات اتصال المستخدم مع Pagination
    /// </summary>
    [HttpGet]
    public async Task<ActionResult<ApiResponse<PagedResult<ContactDto>>>> GetContacts([FromQuery] PaginationParams pagination)
    {
        var result = await _contactService.GetUserContactsAsync(CurrentUserId, pagination);
        
        if (!result.Success)
            return BadRequestResponse<PagedResult<ContactDto>>(result.Message ?? "فشل جلب جهات الاتصال");
            
        return Success(result.Data!);
    }

    /// <summary>
    /// الحصول على جميع جهات اتصال المستخدم مع المجموعات
    /// </summary>
    [HttpGet("with-groups")]
    public async Task<ActionResult<ApiResponse<List<ContactWithGroupsDto>>>> GetContactsWithGroups()
    {
        var result = await _contactService.GetUserContactsWithGroupsAsync(CurrentUserId);
        
        if (!result.Success)
            return BadRequestResponse<List<ContactWithGroupsDto>>(result.Message ?? "فشل جلب جهات الاتصال");
            
        return Success(result.Data!);
    }

    /// <summary>
    /// البحث في جهات الاتصال
    /// </summary>
    [HttpGet("search")]
    public async Task<ActionResult<ApiResponse<List<ContactDto>>>> Search([FromQuery] string searchTerm)
    {
        var result = await _contactService.SearchAsync(CurrentUserId, searchTerm);
        
        if (!result.Success)
            return BadRequestResponse<List<ContactDto>>(result.Message ?? "فشل البحث");
            
        return Success(result.Data!);
    }

    /// <summary>
    /// الحصول على جهة اتصال بالـ ID
    /// </summary>
    [HttpGet("{id:guid}")]
    public async Task<ActionResult<ApiResponse<ContactDto>>> GetById(Guid id)
    {
        var result = await _contactService.GetByIdAsync(id, CurrentUserId);
        
        if (!result.Success)
            return NotFoundResponse<ContactDto>(result.Message ?? "جهة الاتصال غير موجودة");
            
        return Success(result.Data!);
    }

    /// <summary>
    /// الحصول على جهة اتصال مع المجموعات
    /// </summary>
    [HttpGet("{id:guid}/with-groups")]
    public async Task<ActionResult<ApiResponse<ContactWithGroupsDto>>> GetByIdWithGroups(Guid id)
    {
        var result = await _contactService.GetByIdWithGroupsAsync(id, CurrentUserId);
        
        if (!result.Success)
            return NotFoundResponse<ContactWithGroupsDto>(result.Message ?? "جهة الاتصال غير موجودة");
            
        return Success(result.Data!);
    }

    /// <summary>
    /// إنشاء جهة اتصال جديدة
    /// </summary>
    [HttpPost]
    public async Task<ActionResult<ApiResponse<ContactDto>>> Create([FromBody] CreateContactRequest request)
    {
        var result = await _contactService.CreateAsync(CurrentUserId, request);
        
        if (!result.Success)
            return BadRequestResponse<ContactDto>(result.Message ?? "فشل إنشاء جهة الاتصال");
            
        return Created(result.Data!, "تم إنشاء جهة الاتصال بنجاح");
    }

    /// <summary>
    /// تحديث جهة اتصال
    /// </summary>
    [HttpPut("{id:guid}")]
    public async Task<ActionResult<ApiResponse<ContactDto>>> Update(Guid id, [FromBody] UpdateContactRequest request)
    {
        var result = await _contactService.UpdateAsync(id, CurrentUserId, request);
        
        if (!result.Success)
            return BadRequestResponse<ContactDto>(result.Message ?? "فشل تحديث جهة الاتصال");
            
        return Success(result.Data!, "تم تحديث جهة الاتصال بنجاح");
    }

    /// <summary>
    /// حذف جهة اتصال
    /// </summary>
    [HttpDelete("{id:guid}")]
    public async Task<ActionResult<ApiResponse>> Delete(Guid id)
    {
        var result = await _contactService.DeleteAsync(id, CurrentUserId);
        
        if (!result.Success)
            return BadRequestNoContent(result.Message ?? "فشل حذف جهة الاتصال");
            
        return SuccessNoContent("تم حذف جهة الاتصال بنجاح");
    }

    /// <summary>
    /// استيراد جهات اتصال متعددة
    /// </summary>
    [HttpPost("import")]
    public async Task<ActionResult<ApiResponse<List<ContactDto>>>> Import([FromBody] List<CreateContactRequest> contacts)
    {
        var result = await _contactService.ImportAsync(CurrentUserId, contacts);
        
        if (!result.Success)
            return BadRequestResponse<List<ContactDto>>(result.Message ?? "فشل استيراد جهات الاتصال");
            
        return Created(result.Data!, $"تم استيراد {result.Data!.Count} جهة اتصال بنجاح");
    }
}

