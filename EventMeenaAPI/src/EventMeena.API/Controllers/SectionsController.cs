using EventMeena.Application.DTOs.Common;
using EventMeena.Application.DTOs.Sections;
using EventMeena.Application.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EventMeena.API.Controllers;

/// <summary>
/// Sections management controller
/// </summary>
[Authorize]
public class SectionsController : BaseApiController
{
    private readonly ISectionService _sectionService;

    public SectionsController(ISectionService sectionService)
    {
        _sectionService = sectionService;
    }

    /// <summary>
    /// الحصول على أقسام حدث معين
    /// </summary>
    [HttpGet("event/{eventId:guid}")]
    public async Task<ActionResult<ApiResponse<List<SectionDto>>>> GetByEventId(Guid eventId)
    {
        var result = await _sectionService.GetByEventIdAsync(eventId, CurrentUserId);
        
        if (!result.Success)
            return BadRequestResponse<List<SectionDto>>(result.Message ?? "فشل جلب الأقسام");
            
        return Success(result.Data!);
    }

    /// <summary>
    /// الحصول على أقسام حدث مع المكونات
    /// </summary>
    [HttpGet("event/{eventId:guid}/with-components")]
    public async Task<ActionResult<ApiResponse<List<SectionWithComponentsDto>>>> GetByEventIdWithComponents(Guid eventId)
    {
        var result = await _sectionService.GetByEventIdWithComponentsAsync(eventId, CurrentUserId);
        
        if (!result.Success)
            return BadRequestResponse<List<SectionWithComponentsDto>>(result.Message ?? "فشل جلب الأقسام");
            
        return Success(result.Data!);
    }

    /// <summary>
    /// الحصول على قسم بالـ ID
    /// </summary>
    [HttpGet("{id:guid}")]
    public async Task<ActionResult<ApiResponse<SectionDto>>> GetById(Guid id)
    {
        var result = await _sectionService.GetByIdAsync(id, CurrentUserId);
        
        if (!result.Success)
            return NotFoundResponse<SectionDto>(result.Message ?? "القسم غير موجود");
            
        return Success(result.Data!);
    }

    /// <summary>
    /// الحصول على قسم مع المكونات
    /// </summary>
    [HttpGet("{id:guid}/with-components")]
    public async Task<ActionResult<ApiResponse<SectionWithComponentsDto>>> GetByIdWithComponents(Guid id)
    {
        var result = await _sectionService.GetByIdWithComponentsAsync(id, CurrentUserId);
        
        if (!result.Success)
            return NotFoundResponse<SectionWithComponentsDto>(result.Message ?? "القسم غير موجود");
            
        return Success(result.Data!);
    }

    /// <summary>
    /// إنشاء قسم جديد
    /// </summary>
    [HttpPost("event/{eventId:guid}")]
    public async Task<ActionResult<ApiResponse<SectionDto>>> Create(Guid eventId, [FromBody] CreateSectionRequest request)
    {
        var result = await _sectionService.CreateAsync(eventId, CurrentUserId, request);
        
        if (!result.Success)
            return BadRequestResponse<SectionDto>(result.Message ?? "فشل إنشاء القسم");
            
        return Created(result.Data!, "تم إنشاء القسم بنجاح");
    }

    /// <summary>
    /// تحديث قسم
    /// </summary>
    [HttpPut("{id:guid}")]
    public async Task<ActionResult<ApiResponse<SectionDto>>> Update(Guid id, [FromBody] UpdateSectionRequest request)
    {
        var result = await _sectionService.UpdateAsync(id, CurrentUserId, request);
        
        if (!result.Success)
            return BadRequestResponse<SectionDto>(result.Message ?? "فشل تحديث القسم");
            
        return Success(result.Data!, "تم تحديث القسم بنجاح");
    }

    /// <summary>
    /// حذف قسم
    /// </summary>
    [HttpDelete("{id:guid}")]
    public async Task<ActionResult<ApiResponse>> Delete(Guid id)
    {
        var result = await _sectionService.DeleteAsync(id, CurrentUserId);
        
        if (!result.Success)
            return BadRequestNoContent(result.Message ?? "فشل حذف القسم");
            
        return SuccessNoContent("تم حذف القسم بنجاح");
    }

    /// <summary>
    /// إعادة ترتيب الأقسام
    /// </summary>
    [HttpPut("event/{eventId:guid}/reorder")]
    public async Task<ActionResult<ApiResponse>> Reorder(Guid eventId, [FromBody] ReorderSectionsRequest request)
    {
        var result = await _sectionService.ReorderAsync(eventId, CurrentUserId, request);
        
        if (!result.Success)
            return BadRequestNoContent(result.Message ?? "فشل إعادة ترتيب الأقسام");
            
        return SuccessNoContent("تم إعادة ترتيب الأقسام بنجاح");
    }
}

