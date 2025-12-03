using EventMeena.Application.DTOs.Common;
using EventMeena.Application.DTOs.Components;
using EventMeena.Application.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EventMeena.API.Controllers;

/// <summary>
/// Components management controller
/// </summary>
[Authorize]
public class ComponentsController : BaseApiController
{
    private readonly IComponentService _componentService;

    public ComponentsController(IComponentService componentService)
    {
        _componentService = componentService;
    }

    /// <summary>
    /// الحصول على مكونات قسم معين
    /// </summary>
    [HttpGet("section/{sectionId:guid}")]
    public async Task<ActionResult<ApiResponse<List<ComponentDto>>>> GetBySectionId(Guid sectionId)
    {
        var result = await _componentService.GetBySectionIdAsync(sectionId, CurrentUserId);
        
        if (!result.Success)
            return BadRequestResponse<List<ComponentDto>>(result.Message ?? "فشل جلب المكونات");
            
        return Success(result.Data!);
    }

    /// <summary>
    /// الحصول على مكون بالـ ID
    /// </summary>
    [HttpGet("{id:guid}")]
    public async Task<ActionResult<ApiResponse<ComponentDto>>> GetById(Guid id)
    {
        var result = await _componentService.GetByIdAsync(id, CurrentUserId);
        
        if (!result.Success)
            return NotFoundResponse<ComponentDto>(result.Message ?? "المكون غير موجود");
            
        return Success(result.Data!);
    }

    /// <summary>
    /// إنشاء مكون جديد
    /// </summary>
    [HttpPost("section/{sectionId:guid}")]
    public async Task<ActionResult<ApiResponse<ComponentDto>>> Create(Guid sectionId, [FromBody] CreateComponentRequest request)
    {
        var result = await _componentService.CreateAsync(sectionId, CurrentUserId, request);
        
        if (!result.Success)
            return BadRequestResponse<ComponentDto>(result.Message ?? "فشل إنشاء المكون");
            
        return Created(result.Data!, "تم إنشاء المكون بنجاح");
    }

    /// <summary>
    /// تحديث مكون
    /// </summary>
    [HttpPut("{id:guid}")]
    public async Task<ActionResult<ApiResponse<ComponentDto>>> Update(Guid id, [FromBody] UpdateComponentRequest request)
    {
        var result = await _componentService.UpdateAsync(id, CurrentUserId, request);
        
        if (!result.Success)
            return BadRequestResponse<ComponentDto>(result.Message ?? "فشل تحديث المكون");
            
        return Success(result.Data!, "تم تحديث المكون بنجاح");
    }

    /// <summary>
    /// حذف مكون
    /// </summary>
    [HttpDelete("{id:guid}")]
    public async Task<ActionResult<ApiResponse>> Delete(Guid id)
    {
        var result = await _componentService.DeleteAsync(id, CurrentUserId);
        
        if (!result.Success)
            return BadRequestNoContent(result.Message ?? "فشل حذف المكون");
            
        return SuccessNoContent("تم حذف المكون بنجاح");
    }

    /// <summary>
    /// إعادة ترتيب المكونات
    /// </summary>
    [HttpPut("section/{sectionId:guid}/reorder")]
    public async Task<ActionResult<ApiResponse>> Reorder(Guid sectionId, [FromBody] ReorderComponentsRequest request)
    {
        var result = await _componentService.ReorderAsync(sectionId, CurrentUserId, request);
        
        if (!result.Success)
            return BadRequestNoContent(result.Message ?? "فشل إعادة ترتيب المكونات");
            
        return SuccessNoContent("تم إعادة ترتيب المكونات بنجاح");
    }
}

