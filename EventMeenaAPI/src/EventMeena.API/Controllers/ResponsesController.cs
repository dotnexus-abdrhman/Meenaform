using EventMeena.Application.DTOs.Common;
using EventMeena.Application.DTOs.Responses;
using EventMeena.Application.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EventMeena.API.Controllers;

/// <summary>
/// Responses management controller
/// </summary>
[Authorize]
public class ResponsesController : BaseApiController
{
    private readonly IResponseService _responseService;

    public ResponsesController(IResponseService responseService)
    {
        _responseService = responseService;
    }

    /// <summary>
    /// الحصول على ردود حدث معين مع Pagination
    /// </summary>
    [HttpGet("event/{eventId:guid}")]
    public async Task<ActionResult<ApiResponse<PagedResult<ResponseDto>>>> GetByEventId(Guid eventId, [FromQuery] PaginationParams pagination)
    {
        var result = await _responseService.GetByEventIdAsync(eventId, CurrentUserId, pagination);

        if (!result.Success)
            return BadRequestResponse<PagedResult<ResponseDto>>(result.Message ?? "فشل جلب الردود");

        return Success(result.Data!);
    }

    /// <summary>
    /// الحصول على إحصائيات ردود حدث
    /// </summary>
    [HttpGet("event/{eventId:guid}/stats")]
    public async Task<ActionResult<ApiResponse<ResponseStatsDto>>> GetEventStats(Guid eventId)
    {
        var result = await _responseService.GetEventStatsAsync(eventId, CurrentUserId);

        if (!result.Success)
            return BadRequestResponse<ResponseStatsDto>(result.Message ?? "فشل جلب الإحصائيات");

        return Success(result.Data!);
    }

    /// <summary>
    /// الحصول على رد بالـ ID
    /// </summary>
    [HttpGet("{id:guid}")]
    public async Task<ActionResult<ApiResponse<ResponseDto>>> GetById(Guid id)
    {
        var result = await _responseService.GetByIdAsync(id, CurrentUserId);

        if (!result.Success)
            return NotFoundResponse<ResponseDto>(result.Message ?? "الرد غير موجود");

        return Success(result.Data!);
    }

    /// <summary>
    /// بدء استجابة جديدة (عام - بدون مصادقة)
    /// </summary>
    [HttpPost("event/{eventId:guid}/start")]
    [AllowAnonymous]
    public async Task<ActionResult<ApiResponse<ResponseDto>>> StartResponse(Guid eventId, [FromBody] StartResponseRequest request)
    {
        var ipAddress = HttpContext.Connection.RemoteIpAddress?.ToString();
        var userAgent = HttpContext.Request.Headers.UserAgent.ToString();

        var result = await _responseService.StartResponseAsync(eventId, request, ipAddress, userAgent);

        if (!result.Success)
            return BadRequestResponse<ResponseDto>(result.Message ?? "فشل بدء الاستجابة");

        return Created(result.Data!, "تم بدء الاستجابة بنجاح");
    }

    /// <summary>
    /// إرسال إجابات قسم (عام - بدون مصادقة)
    /// </summary>
    [HttpPost("{responseId:guid}/section-answers")]
    [AllowAnonymous]
    public async Task<ActionResult<ApiResponse<ResponseDto>>> SubmitSectionAnswers(Guid responseId, [FromBody] SubmitSectionAnswersRequest request)
    {
        var result = await _responseService.SubmitSectionAnswersAsync(responseId, request);

        if (!result.Success)
            return BadRequestResponse<ResponseDto>(result.Message ?? "فشل إرسال الإجابات");

        return Success(result.Data!, "تم حفظ الإجابات بنجاح");
    }

    /// <summary>
    /// إكمال الاستجابة (عام - بدون مصادقة)
    /// </summary>
    [HttpPost("{responseId:guid}/complete")]
    [AllowAnonymous]
    public async Task<ActionResult<ApiResponse<ResponseDto>>> CompleteResponse(Guid responseId, [FromBody] CompleteResponseRequest request)
    {
        var result = await _responseService.CompleteResponseAsync(responseId, request);

        if (!result.Success)
            return BadRequestResponse<ResponseDto>(result.Message ?? "فشل إكمال الاستجابة");

        return Success(result.Data!, "تم إكمال الاستجابة بنجاح");
    }

    /// <summary>
    /// الحصول على رد سابق للمشارك (للتعديل) - عام بدون مصادقة
    /// </summary>
    [HttpGet("event/{eventId:guid}/existing")]
    [AllowAnonymous]
    public async Task<ActionResult<ApiResponse<ResponseDto?>>> GetExistingResponse(Guid eventId, [FromQuery] string? email)
    {
        var ipAddress = HttpContext.Connection.RemoteIpAddress?.ToString();
        var result = await _responseService.GetExistingResponseAsync(eventId, email, ipAddress);

        if (!result.Success)
            return BadRequestResponse<ResponseDto?>(result.Message ?? "فشل البحث عن الرد السابق");

        return Success(result.Data, result.Message ?? "تم البحث بنجاح");
    }

    /// <summary>
    /// تحديث إجابات رد موجود (للتعديل) - عام بدون مصادقة
    /// </summary>
    [HttpPut("{responseId:guid}/answers")]
    [AllowAnonymous]
    public async Task<ActionResult<ApiResponse<ResponseDto>>> UpdateResponseAnswers(Guid responseId, [FromBody] UpdateResponseAnswersRequest request)
    {
        var result = await _responseService.UpdateResponseAnswersAsync(responseId, request);

        if (!result.Success)
            return BadRequestResponse<ResponseDto>(result.Message ?? "فشل تحديث الإجابات");

        return Success(result.Data!, "تم تحديث الإجابات بنجاح");
    }

    /// <summary>
    /// حذف رد
    /// </summary>
    [HttpDelete("{id:guid}")]
    public async Task<ActionResult<ApiResponse>> Delete(Guid id)
    {
        var result = await _responseService.DeleteAsync(id, CurrentUserId);

        if (!result.Success)
            return BadRequestNoContent(result.Message ?? "فشل حذف الرد");

        return SuccessNoContent("تم حذف الرد بنجاح");
    }

    /// <summary>
    /// حذف جميع ردود حدث
    /// </summary>
    [HttpDelete("event/{eventId:guid}")]
    public async Task<ActionResult<ApiResponse>> DeleteByEventId(Guid eventId)
    {
        var result = await _responseService.DeleteByEventIdAsync(eventId, CurrentUserId);

        if (!result.Success)
            return BadRequestNoContent(result.Message ?? "فشل حذف الردود");

        return SuccessNoContent("تم حذف جميع الردود بنجاح");
    }

    /// <summary>
    /// الحصول على جميع الأحداث التي شاركت فيها
    /// </summary>
    [HttpGet("my-participations")]
    public async Task<ActionResult<ApiResponse<List<ParticipationDto>>>> GetMyParticipations()
    {
        if (string.IsNullOrEmpty(CurrentUserEmail))
            return BadRequestResponse<List<ParticipationDto>>("البريد الإلكتروني غير متوفر");

        var result = await _responseService.GetMyParticipationsAsync(CurrentUserEmail);

        if (!result.Success)
            return BadRequestResponse<List<ParticipationDto>>(result.Message ?? "فشل جلب المشاركات");

        return Success(result.Data!, "تم جلب المشاركات بنجاح");
    }

    /// <summary>
    /// الحصول على تفاصيل مشاركة معينة
    /// </summary>
    [HttpGet("my-participations/{responseId:guid}")]
    public async Task<ActionResult<ApiResponse<ParticipationDetailsDto>>> GetParticipationDetails(Guid responseId)
    {
        if (string.IsNullOrEmpty(CurrentUserEmail))
            return BadRequestResponse<ParticipationDetailsDto>("البريد الإلكتروني غير متوفر");

        var result = await _responseService.GetParticipationDetailsAsync(responseId, CurrentUserEmail);

        if (!result.Success)
            return NotFoundResponse<ParticipationDetailsDto>(result.Message ?? "المشاركة غير موجودة");

        return Success(result.Data!);
    }
}

