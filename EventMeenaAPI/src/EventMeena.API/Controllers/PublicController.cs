using EventMeena.Application.DTOs.Common;
using EventMeena.Application.DTOs.Events;
using EventMeena.Application.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EventMeena.API.Controllers;

/// <summary>
/// Public endpoints controller (no authentication required)
/// </summary>
[AllowAnonymous]
public class PublicController : BaseApiController
{
    private readonly IEventService _eventService;

    public PublicController(IEventService eventService)
    {
        _eventService = eventService;
    }

    /// <summary>
    /// الحصول على حدث بواسطة رمز المشاركة
    /// </summary>
    [HttpGet("events/{shareCode}")]
    public async Task<ActionResult<ApiResponse<EventWithFullDetailsDto>>> GetEventByShareCode(string shareCode)
    {
        var result = await _eventService.GetByShareCodeAsync(shareCode);

        if (!result.Success)
            return NotFoundResponse<EventWithFullDetailsDto>(result.Message ?? "الحدث غير موجود");

        return Success(result.Data!);
    }

    /// <summary>
    /// الحصول على حدث للمعاينة (بدون التحقق من الحالة) - للقراءة فقط
    /// </summary>
    [HttpGet("events/{id:guid}/preview")]
    public async Task<ActionResult<ApiResponse<EventWithFullDetailsDto>>> GetEventForPreview(Guid id)
    {
        var result = await _eventService.GetForPreviewAsync(id);

        if (!result.Success)
            return NotFoundResponse<EventWithFullDetailsDto>(result.Message ?? "الحدث غير موجود");

        return Success(result.Data!);
    }

    /// <summary>
    /// زيادة عدد مشاهدات الحدث
    /// </summary>
    [HttpPost("events/{id:guid}/view")]
    public async Task<ActionResult<ApiResponse>> IncrementViewCount(Guid id)
    {
        var result = await _eventService.IncrementViewCountAsync(id);

        if (!result.Success)
            return BadRequestNoContent(result.Message ?? "فشل تحديث عدد المشاهدات");

        return SuccessNoContent("تم تحديث عدد المشاهدات");
    }

    /// <summary>
    /// فحص صحة API
    /// </summary>
    [HttpGet("health")]
    public ActionResult<ApiResponse<HealthCheckResponse>> HealthCheck()
    {
        return Success(new HealthCheckResponse
        {
            Status = "Healthy",
            Timestamp = DateTime.UtcNow,
            Version = "1.0.0"
        }, "API is running");
    }
}

/// <summary>
/// Health check response DTO
/// </summary>
public class HealthCheckResponse
{
    public string Status { get; set; } = string.Empty;
    public DateTime Timestamp { get; set; }
    public string Version { get; set; } = string.Empty;
}

