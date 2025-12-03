using EventMeena.Application.DTOs.Common;
using EventMeena.Application.DTOs.Templates;
using EventMeena.Application.Services.Interfaces;
using EventMeena.Domain.Enums;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EventMeena.API.Controllers;

/// <summary>
/// Templates management controller
/// </summary>
[Authorize]
public class TemplatesController : BaseApiController
{
    private readonly ITemplateService _templateService;

    public TemplatesController(ITemplateService templateService)
    {
        _templateService = templateService;
    }

    /// <summary>
    /// الحصول على جميع قوالب المستخدم
    /// </summary>
    [HttpGet]
    public async Task<ActionResult<ApiResponse<List<TemplateListItemDto>>>> GetUserTemplates()
    {
        var result = await _templateService.GetUserTemplatesAsync(CurrentUserId);
        
        if (!result.Success)
            return BadRequestResponse<List<TemplateListItemDto>>(result.Message ?? "فشل جلب القوالب");
            
        return Success(result.Data!);
    }

    /// <summary>
    /// الحصول على قوالب المستخدم حسب النوع
    /// </summary>
    [HttpGet("by-type/{type}")]
    public async Task<ActionResult<ApiResponse<List<TemplateListItemDto>>>> GetUserTemplatesByType(EventType type)
    {
        var result = await _templateService.GetUserTemplatesByTypeAsync(CurrentUserId, type);
        
        if (!result.Success)
            return BadRequestResponse<List<TemplateListItemDto>>(result.Message ?? "فشل جلب القوالب");
            
        return Success(result.Data!);
    }

    /// <summary>
    /// الحصول على القوالب العامة
    /// </summary>
    [HttpGet("public")]
    [AllowAnonymous]
    public async Task<ActionResult<ApiResponse<List<TemplateListItemDto>>>> GetPublicTemplates()
    {
        var result = await _templateService.GetPublicTemplatesAsync();
        
        if (!result.Success)
            return BadRequestResponse<List<TemplateListItemDto>>(result.Message ?? "فشل جلب القوالب العامة");
            
        return Success(result.Data!);
    }

    /// <summary>
    /// الحصول على القوالب العامة حسب النوع
    /// </summary>
    [HttpGet("public/by-type/{type}")]
    [AllowAnonymous]
    public async Task<ActionResult<ApiResponse<List<TemplateListItemDto>>>> GetPublicTemplatesByType(EventType type)
    {
        var result = await _templateService.GetPublicTemplatesByTypeAsync(type);
        
        if (!result.Success)
            return BadRequestResponse<List<TemplateListItemDto>>(result.Message ?? "فشل جلب القوالب العامة");
            
        return Success(result.Data!);
    }

    /// <summary>
    /// الحصول على قالب بالـ ID
    /// </summary>
    [HttpGet("{id:guid}")]
    public async Task<ActionResult<ApiResponse<TemplateDto>>> GetById(Guid id)
    {
        var result = await _templateService.GetByIdAsync(id, CurrentUserId);
        
        if (!result.Success)
            return NotFoundResponse<TemplateDto>(result.Message ?? "القالب غير موجود");
            
        return Success(result.Data!);
    }

    /// <summary>
    /// إنشاء قالب جديد
    /// </summary>
    [HttpPost]
    public async Task<ActionResult<ApiResponse<TemplateDto>>> Create([FromBody] CreateTemplateRequest request)
    {
        var result = await _templateService.CreateAsync(CurrentUserId, request);
        
        if (!result.Success)
            return BadRequestResponse<TemplateDto>(result.Message ?? "فشل إنشاء القالب");
            
        return Created(result.Data!, "تم إنشاء القالب بنجاح");
    }

    /// <summary>
    /// إنشاء قالب من حدث موجود
    /// </summary>
    [HttpPost("from-event")]
    public async Task<ActionResult<ApiResponse<TemplateDto>>> CreateFromEvent([FromBody] CreateTemplateFromEventRequest request)
    {
        var result = await _templateService.CreateFromEventAsync(CurrentUserId, request);
        
        if (!result.Success)
            return BadRequestResponse<TemplateDto>(result.Message ?? "فشل إنشاء القالب من الحدث");
            
        return Created(result.Data!, "تم إنشاء القالب من الحدث بنجاح");
    }

    /// <summary>
    /// تحديث قالب
    /// </summary>
    [HttpPut("{id:guid}")]
    public async Task<ActionResult<ApiResponse<TemplateDto>>> Update(Guid id, [FromBody] UpdateTemplateRequest request)
    {
        var result = await _templateService.UpdateAsync(id, CurrentUserId, request);
        
        if (!result.Success)
            return BadRequestResponse<TemplateDto>(result.Message ?? "فشل تحديث القالب");
            
        return Success(result.Data!, "تم تحديث القالب بنجاح");
    }

    /// <summary>
    /// حذف قالب
    /// </summary>
    [HttpDelete("{id:guid}")]
    public async Task<ActionResult<ApiResponse>> Delete(Guid id)
    {
        var result = await _templateService.DeleteAsync(id, CurrentUserId);
        
        if (!result.Success)
            return BadRequestNoContent(result.Message ?? "فشل حذف القالب");
            
        return SuccessNoContent("تم حذف القالب بنجاح");
    }

    /// <summary>
    /// استخدام قالب لإنشاء حدث جديد
    /// </summary>
    [HttpPost("{id:guid}/use")]
    public async Task<ActionResult<ApiResponse<Guid>>> UseTemplate(Guid id)
    {
        var result = await _templateService.UseTemplateAsync(id, CurrentUserId);
        
        if (!result.Success)
            return BadRequestResponse<Guid>(result.Message ?? "فشل استخدام القالب");
            
        return Created(result.Data, "تم إنشاء حدث جديد من القالب بنجاح");
    }
}

