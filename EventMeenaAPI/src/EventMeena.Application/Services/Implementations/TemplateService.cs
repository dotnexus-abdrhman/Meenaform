using AutoMapper;
using EventMeena.Application.DTOs.Common;
using EventMeena.Application.DTOs.Templates;
using EventMeena.Application.Interfaces;
using EventMeena.Application.Services.Interfaces;
using EventMeena.Domain.Entities;
using EventMeena.Domain.Enums;

namespace EventMeena.Application.Services.Implementations;

/// <summary>
/// Template service implementation
/// </summary>
public class TemplateService : ITemplateService
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IMapper _mapper;

    public TemplateService(IUnitOfWork unitOfWork, IMapper mapper)
    {
        _unitOfWork = unitOfWork;
        _mapper = mapper;
    }

    public async Task<ApiResponse<TemplateDto>> GetByIdAsync(Guid id, Guid userId)
    {
        var template = await _unitOfWork.UserTemplates.GetByIdAsync(id);
        if (template == null)
            return ApiResponse<TemplateDto>.FailureResponse("القالب غير موجود");

        if (!template.IsPublic && template.UserId != userId)
            return ApiResponse<TemplateDto>.FailureResponse("غير مصرح");

        return ApiResponse<TemplateDto>.SuccessResponse(_mapper.Map<TemplateDto>(template));
    }

    public async Task<ApiResponse<List<TemplateListItemDto>>> GetUserTemplatesAsync(Guid userId)
    {
        var templates = await _unitOfWork.UserTemplates.GetByUserIdAsync(userId);
        return ApiResponse<List<TemplateListItemDto>>.SuccessResponse(_mapper.Map<List<TemplateListItemDto>>(templates));
    }

    public async Task<ApiResponse<List<TemplateListItemDto>>> GetUserTemplatesByTypeAsync(Guid userId, EventType type)
    {
        var templates = await _unitOfWork.UserTemplates.GetByUserIdAndTypeAsync(userId, type);
        return ApiResponse<List<TemplateListItemDto>>.SuccessResponse(_mapper.Map<List<TemplateListItemDto>>(templates));
    }

    public async Task<ApiResponse<List<TemplateListItemDto>>> GetPublicTemplatesAsync()
    {
        var templates = await _unitOfWork.UserTemplates.GetPublicTemplatesAsync();
        return ApiResponse<List<TemplateListItemDto>>.SuccessResponse(_mapper.Map<List<TemplateListItemDto>>(templates));
    }

    public async Task<ApiResponse<List<TemplateListItemDto>>> GetPublicTemplatesByTypeAsync(EventType type)
    {
        var templates = await _unitOfWork.UserTemplates.GetPublicTemplatesByTypeAsync(type);
        return ApiResponse<List<TemplateListItemDto>>.SuccessResponse(_mapper.Map<List<TemplateListItemDto>>(templates));
    }

    public async Task<ApiResponse<TemplateDto>> CreateAsync(Guid userId, CreateTemplateRequest request)
    {
        var template = _mapper.Map<UserTemplate>(request);
        template.UserId = userId;

        await _unitOfWork.UserTemplates.AddAsync(template);
        await _unitOfWork.SaveChangesAsync();

        return ApiResponse<TemplateDto>.SuccessResponse(_mapper.Map<TemplateDto>(template), "تم إنشاء القالب بنجاح");
    }

    public async Task<ApiResponse<TemplateDto>> CreateFromEventAsync(Guid userId, CreateTemplateFromEventRequest request)
    {
        var evt = await _unitOfWork.Events.GetByIdWithFullDetailsAsync(request.EventId);
        if (evt == null || evt.UserId != userId)
            return ApiResponse<TemplateDto>.FailureResponse("الحدث غير موجود");

        var template = new UserTemplate
        {
            UserId = userId,
            Name = request.Name,
            Description = request.Description,
            Type = evt.Type,
            TemplateDataJson = SerializeEventToTemplate(evt),
            IsPublic = request.IsPublic
        };

        await _unitOfWork.UserTemplates.AddAsync(template);
        await _unitOfWork.SaveChangesAsync();

        return ApiResponse<TemplateDto>.SuccessResponse(_mapper.Map<TemplateDto>(template), "تم إنشاء القالب من الحدث بنجاح");
    }

    public async Task<ApiResponse<TemplateDto>> UpdateAsync(Guid id, Guid userId, UpdateTemplateRequest request)
    {
        var template = await _unitOfWork.UserTemplates.GetByIdAsync(id);
        if (template == null || template.UserId != userId)
            return ApiResponse<TemplateDto>.FailureResponse("القالب غير موجود");

        _mapper.Map(request, template);
        _unitOfWork.UserTemplates.Update(template);
        await _unitOfWork.SaveChangesAsync();

        return ApiResponse<TemplateDto>.SuccessResponse(_mapper.Map<TemplateDto>(template), "تم تحديث القالب بنجاح");
    }

    public async Task<ApiResponse> DeleteAsync(Guid id, Guid userId)
    {
        var template = await _unitOfWork.UserTemplates.GetByIdAsync(id);
        if (template == null || template.UserId != userId)
            return ApiResponse.FailureResponse("القالب غير موجود");

        _unitOfWork.UserTemplates.Delete(template);
        await _unitOfWork.SaveChangesAsync();

        return ApiResponse.SuccessResponse("تم حذف القالب بنجاح");
    }

    public async Task<ApiResponse<Guid>> UseTemplateAsync(Guid id, Guid userId)
    {
        var template = await _unitOfWork.UserTemplates.GetByIdAsync(id);
        if (template == null)
            return ApiResponse<Guid>.FailureResponse("القالب غير موجود");

        if (!template.IsPublic && template.UserId != userId)
            return ApiResponse<Guid>.FailureResponse("غير مصرح");

        var evt = DeserializeTemplateToEvent(template.TemplateDataJson);
        evt.UserId = userId;
        evt.Status = EventStatus.Draft;
        evt.ShareCode = await GenerateUniqueShareCode();

        await _unitOfWork.Events.AddAsync(evt);
        await _unitOfWork.SaveChangesAsync();

        return ApiResponse<Guid>.SuccessResponse(evt.Id, "تم إنشاء الحدث من القالب بنجاح");
    }

    private string SerializeEventToTemplate(Event evt) => System.Text.Json.JsonSerializer.Serialize(evt);
    private Event DeserializeTemplateToEvent(string data) => System.Text.Json.JsonSerializer.Deserialize<Event>(data) ?? new Event();
    private async Task<string> GenerateUniqueShareCode()
    {
        string code;
        do { code = Guid.NewGuid().ToString("N")[..8].ToUpper(); }
        while (await _unitOfWork.Events.ShareCodeExistsAsync(code));
        return code;
    }
}

