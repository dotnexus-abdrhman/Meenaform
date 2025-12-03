using AutoMapper;
using EventMeena.Application.DTOs.Common;
using EventMeena.Application.DTOs.Responses;
using EventMeena.Application.Interfaces;
using EventMeena.Application.Services.Interfaces;
using EventMeena.Domain.Entities;
using EventMeena.Domain.Enums;

namespace EventMeena.Application.Services.Implementations;

/// <summary>
/// Response service implementation
/// </summary>
public class ResponseService : IResponseService
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IMapper _mapper;

    public ResponseService(IUnitOfWork unitOfWork, IMapper mapper)
    {
        _unitOfWork = unitOfWork;
        _mapper = mapper;
    }

    public async Task<ApiResponse<ResponseDto>> GetByIdAsync(Guid id, Guid userId)
    {
        var response = await _unitOfWork.Responses.GetByIdAsync(id);
        if (response == null)
            return ApiResponse<ResponseDto>.FailureResponse("الاستجابة غير موجودة");

        var evt = await _unitOfWork.Events.GetByIdAsync(response.EventId);
        if (evt == null || evt.UserId != userId)
            return ApiResponse<ResponseDto>.FailureResponse("غير مصرح");

        return ApiResponse<ResponseDto>.SuccessResponse(_mapper.Map<ResponseDto>(response));
    }

    public async Task<ApiResponse<PagedResult<ResponseDto>>> GetByEventIdAsync(Guid eventId, Guid userId, PaginationParams pagination)
    {
        var evt = await _unitOfWork.Events.GetByIdAsync(eventId);
        if (evt == null || evt.UserId != userId)
            return ApiResponse<PagedResult<ResponseDto>>.FailureResponse("الحدث غير موجود");

        var responses = await _unitOfWork.Responses.GetByEventIdAsync(eventId);
        var totalCount = responses.Count;
        var pagedResponses = responses
            .Skip((pagination.PageNumber - 1) * pagination.PageSize)
            .Take(pagination.PageSize)
            .ToList();

        return ApiResponse<PagedResult<ResponseDto>>.SuccessResponse(new PagedResult<ResponseDto>
        {
            Items = _mapper.Map<List<ResponseDto>>(pagedResponses),
            TotalCount = totalCount,
            PageNumber = pagination.PageNumber,
            PageSize = pagination.PageSize
        });
    }

    public async Task<ApiResponse<ResponseStatsDto>> GetEventStatsAsync(Guid eventId, Guid userId)
    {
        var evt = await _unitOfWork.Events.GetByIdAsync(eventId);
        if (evt == null || evt.UserId != userId)
            return ApiResponse<ResponseStatsDto>.FailureResponse("الحدث غير موجود");

        var stats = await _unitOfWork.Responses.GetEventStatsAsync(eventId);
        return ApiResponse<ResponseStatsDto>.SuccessResponse(stats);
    }

    public async Task<ApiResponse<ResponseDto>> StartResponseAsync(Guid eventId, StartResponseRequest request, string? ipAddress, string? userAgent)
    {
        var evt = await _unitOfWork.Events.GetByIdAsync(eventId);
        if (evt == null || evt.Status != EventStatus.Published)
            return ApiResponse<ResponseDto>.FailureResponse("الحدث غير متاح");

        // التحقق من AllowMultipleResponses
        if (!evt.AllowMultipleResponses)
        {
            // التحقق بالإيميل أولاً (أكثر دقة)
            if (!string.IsNullOrEmpty(request.RespondentEmail))
            {
                var existingByEmail = await _unitOfWork.Responses.GetCompletedByEventIdAndEmailAsync(eventId, request.RespondentEmail);
                if (existingByEmail != null)
                {
                    return ApiResponse<ResponseDto>.FailureResponse("لقد قمت بالمشاركة في هذا الحدث مسبقاً");
                }
            }
            // التحقق بالـ IP كخيار احتياطي (فقط إذا لم يكن هناك إيميل)
            else if (!string.IsNullOrEmpty(ipAddress))
            {
                var existingByIp = await _unitOfWork.Responses.GetCompletedByEventIdAndIpAsync(eventId, ipAddress);
                if (existingByIp != null)
                {
                    return ApiResponse<ResponseDto>.FailureResponse("لقد قمت بالمشاركة في هذا الحدث مسبقاً من هذا الجهاز");
                }
            }
        }

        var response = new Response
        {
            EventId = eventId,
            RespondentName = request.RespondentName,
            RespondentEmail = request.RespondentEmail,
            RespondentPhone = request.RespondentPhone,
            Status = ResponseStatus.InProgress,
            StartedAt = DateTime.UtcNow,
            RespondentIp = ipAddress,
            UserAgent = userAgent
        };

        await _unitOfWork.Responses.AddAsync(response);
        await _unitOfWork.SaveChangesAsync();

        return ApiResponse<ResponseDto>.SuccessResponse(_mapper.Map<ResponseDto>(response), "تم بدء الاستجابة");
    }

    public async Task<ApiResponse<ResponseDto>> SubmitSectionAnswersAsync(Guid responseId, SubmitSectionAnswersRequest request)
    {
        var response = await _unitOfWork.Responses.GetByIdAsync(responseId);
        if (response == null || response.Status != ResponseStatus.InProgress)
            return ApiResponse<ResponseDto>.FailureResponse("الاستجابة غير صالحة");

        // Merge answers - parse existing JSON and add new answers
        var existingAnswers = System.Text.Json.JsonSerializer.Deserialize<Dictionary<string, System.Text.Json.JsonElement>>(response.AnswersJson)
            ?? new Dictionary<string, System.Text.Json.JsonElement>();
        foreach (var answer in request.Answers)
        {
            // Parse the AnswerJson string to JsonElement to avoid double-encoding
            var answerElement = System.Text.Json.JsonSerializer.Deserialize<System.Text.Json.JsonElement>(answer.AnswerJson);
            existingAnswers[answer.ComponentId.ToString()] = answerElement;
        }
        response.AnswersJson = System.Text.Json.JsonSerializer.Serialize(existingAnswers);
        response.CurrentSectionIndex = request.SectionIndex;

        _unitOfWork.Responses.Update(response);
        await _unitOfWork.SaveChangesAsync();

        return ApiResponse<ResponseDto>.SuccessResponse(_mapper.Map<ResponseDto>(response));
    }

    public async Task<ApiResponse<ResponseDto>> CompleteResponseAsync(Guid responseId, CompleteResponseRequest request)
    {
        var response = await _unitOfWork.Responses.GetByIdAsync(responseId);
        if (response == null || response.Status != ResponseStatus.InProgress)
            return ApiResponse<ResponseDto>.FailureResponse("الاستجابة غير صالحة");

        // DEBUG: Log incoming data
        Console.WriteLine("========== DEBUG: CompleteResponseAsync ==========");
        Console.WriteLine($"ResponseId: {responseId}");
        Console.WriteLine($"FinalAnswers Count: {request.FinalAnswers?.Count ?? 0}");
        if (request.FinalAnswers != null)
        {
            foreach (var ans in request.FinalAnswers)
            {
                Console.WriteLine($"  ComponentId: {ans.ComponentId}");
                Console.WriteLine($"  AnswerJson: {ans.AnswerJson}");
                Console.WriteLine("  ---");
            }
        }
        Console.WriteLine($"Existing AnswersJson BEFORE: {response.AnswersJson}");

        // Add final answers if provided
        if (request.FinalAnswers != null && request.FinalAnswers.Any())
        {
            var existingAnswers = System.Text.Json.JsonSerializer.Deserialize<Dictionary<string, System.Text.Json.JsonElement>>(response.AnswersJson)
                ?? new Dictionary<string, System.Text.Json.JsonElement>();
            foreach (var answer in request.FinalAnswers)
            {
                // Parse the AnswerJson string to JsonElement to avoid double-encoding
                var answerElement = System.Text.Json.JsonSerializer.Deserialize<System.Text.Json.JsonElement>(answer.AnswerJson);
                existingAnswers[answer.ComponentId.ToString()] = answerElement;
            }
            response.AnswersJson = System.Text.Json.JsonSerializer.Serialize(existingAnswers);
        }

        Console.WriteLine($"AnswersJson AFTER: {response.AnswersJson}");
        Console.WriteLine("==================================================");

        response.Status = ResponseStatus.Completed;
        response.CompletedAt = DateTime.UtcNow;
        response.DurationSeconds = (int)(DateTime.UtcNow - response.StartedAt).TotalSeconds;

        _unitOfWork.Responses.Update(response);

        // زيادة عداد الردود في الحدث
        await _unitOfWork.Events.IncrementResponseCountAsync(response.EventId);

        await _unitOfWork.SaveChangesAsync();

        return ApiResponse<ResponseDto>.SuccessResponse(_mapper.Map<ResponseDto>(response), "تم إكمال الاستجابة بنجاح");
    }

    public async Task<ApiResponse> DeleteAsync(Guid id, Guid userId)
    {
        var response = await _unitOfWork.Responses.GetByIdAsync(id);
        if (response == null)
            return ApiResponse.FailureResponse("الاستجابة غير موجودة");

        var evt = await _unitOfWork.Events.GetByIdAsync(response.EventId);
        if (evt == null || evt.UserId != userId)
            return ApiResponse.FailureResponse("غير مصرح");

        _unitOfWork.Responses.Delete(response);
        await _unitOfWork.SaveChangesAsync();

        return ApiResponse.SuccessResponse("تم حذف الاستجابة بنجاح");
    }

    public async Task<ApiResponse> DeleteByEventIdAsync(Guid eventId, Guid userId)
    {
        var evt = await _unitOfWork.Events.GetByIdAsync(eventId);
        if (evt == null || evt.UserId != userId)
            return ApiResponse.FailureResponse("الحدث غير موجود");

        await _unitOfWork.Responses.DeleteByEventIdAsync(eventId);
        await _unitOfWork.SaveChangesAsync();

        return ApiResponse.SuccessResponse("تم حذف جميع الاستجابات بنجاح");
    }

    public async Task<ApiResponse<ResponseDto?>> GetExistingResponseAsync(Guid eventId, string? email, string? ipAddress)
    {
        var evt = await _unitOfWork.Events.GetByIdAsync(eventId);
        if (evt == null || evt.Status != EventStatus.Published)
            return ApiResponse<ResponseDto?>.FailureResponse("الحدث غير متاح");

        Response? existingResponse = null;

        // البحث بالإيميل أولاً (أكثر دقة)
        if (!string.IsNullOrEmpty(email))
        {
            existingResponse = await _unitOfWork.Responses.GetCompletedByEventIdAndEmailAsync(eventId, email);
        }
        // البحث بالـ IP كخيار احتياطي
        else if (!string.IsNullOrEmpty(ipAddress))
        {
            existingResponse = await _unitOfWork.Responses.GetCompletedByEventIdAndIpAsync(eventId, ipAddress);
        }

        if (existingResponse == null)
        {
            return ApiResponse<ResponseDto?>.SuccessResponse(null, "لا يوجد رد سابق");
        }

        return ApiResponse<ResponseDto?>.SuccessResponse(_mapper.Map<ResponseDto>(existingResponse));
    }

    public async Task<ApiResponse<ResponseDto>> UpdateResponseAnswersAsync(Guid responseId, UpdateResponseAnswersRequest request)
    {
        var response = await _unitOfWork.Responses.GetByIdAsync(responseId);
        if (response == null)
            return ApiResponse<ResponseDto>.FailureResponse("الرد غير موجود");

        var evt = await _unitOfWork.Events.GetByIdAsync(response.EventId);
        if (evt == null || evt.Status != EventStatus.Published)
            return ApiResponse<ResponseDto>.FailureResponse("الحدث غير متاح");

        // التحقق من أن الحدث يسمح بالتعديل
        if (!evt.AllowEditResponses)
            return ApiResponse<ResponseDto>.FailureResponse("هذا الحدث لا يسمح بتعديل الردود");

        // تحديث الإجابات (مخزنة كـ JSON)
        var existingAnswers = System.Text.Json.JsonSerializer.Deserialize<Dictionary<string, System.Text.Json.JsonElement>>(response.AnswersJson)
            ?? new Dictionary<string, System.Text.Json.JsonElement>();

        foreach (var answerRequest in request.Answers)
        {
            var answerElement = System.Text.Json.JsonSerializer.Deserialize<System.Text.Json.JsonElement>(answerRequest.AnswerJson);
            existingAnswers[answerRequest.ComponentId.ToString()] = answerElement;
        }

        response.AnswersJson = System.Text.Json.JsonSerializer.Serialize(existingAnswers);
        response.UpdatedAt = DateTime.UtcNow;
        await _unitOfWork.SaveChangesAsync();

        return ApiResponse<ResponseDto>.SuccessResponse(_mapper.Map<ResponseDto>(response), "تم تحديث الرد بنجاح");
    }
}

