using AutoMapper;
using EventMeena.Application.DTOs.Common;
using EventMeena.Application.DTOs.Sections;
using EventMeena.Application.Interfaces;
using EventMeena.Application.Services.Interfaces;
using EventMeena.Domain.Entities;

namespace EventMeena.Application.Services.Implementations;

/// <summary>
/// Section service implementation
/// </summary>
public class SectionService : ISectionService
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IMapper _mapper;

    public SectionService(IUnitOfWork unitOfWork, IMapper mapper)
    {
        _unitOfWork = unitOfWork;
        _mapper = mapper;
    }

    public async Task<ApiResponse<SectionDto>> GetByIdAsync(Guid id, Guid userId)
    {
        var section = await _unitOfWork.Sections.GetByIdAsync(id);
        if (section == null)
            return ApiResponse<SectionDto>.FailureResponse("القسم غير موجود");

        var evt = await _unitOfWork.Events.GetByIdAsync(section.EventId);
        if (evt == null || evt.UserId != userId)
            return ApiResponse<SectionDto>.FailureResponse("غير مصرح");

        return ApiResponse<SectionDto>.SuccessResponse(_mapper.Map<SectionDto>(section));
    }

    public async Task<ApiResponse<SectionWithComponentsDto>> GetByIdWithComponentsAsync(Guid id, Guid userId)
    {
        var sections = await _unitOfWork.Sections.GetByEventIdWithComponentsAsync(id);
        var section = sections.FirstOrDefault(s => s.Id == id);
        if (section == null)
            return ApiResponse<SectionWithComponentsDto>.FailureResponse("القسم غير موجود");

        var evt = await _unitOfWork.Events.GetByIdAsync(section.EventId);
        if (evt == null || evt.UserId != userId)
            return ApiResponse<SectionWithComponentsDto>.FailureResponse("غير مصرح");

        return ApiResponse<SectionWithComponentsDto>.SuccessResponse(_mapper.Map<SectionWithComponentsDto>(section));
    }

    public async Task<ApiResponse<List<SectionDto>>> GetByEventIdAsync(Guid eventId, Guid userId)
    {
        var evt = await _unitOfWork.Events.GetByIdAsync(eventId);
        if (evt == null || evt.UserId != userId)
            return ApiResponse<List<SectionDto>>.FailureResponse("الحدث غير موجود");

        var sections = await _unitOfWork.Sections.GetByEventIdAsync(eventId);
        return ApiResponse<List<SectionDto>>.SuccessResponse(_mapper.Map<List<SectionDto>>(sections));
    }

    public async Task<ApiResponse<List<SectionWithComponentsDto>>> GetByEventIdWithComponentsAsync(Guid eventId, Guid userId)
    {
        var evt = await _unitOfWork.Events.GetByIdAsync(eventId);
        if (evt == null || evt.UserId != userId)
            return ApiResponse<List<SectionWithComponentsDto>>.FailureResponse("الحدث غير موجود");

        var sections = await _unitOfWork.Sections.GetByEventIdWithComponentsAsync(eventId);
        return ApiResponse<List<SectionWithComponentsDto>>.SuccessResponse(_mapper.Map<List<SectionWithComponentsDto>>(sections));
    }

    public async Task<ApiResponse<SectionDto>> CreateAsync(Guid eventId, Guid userId, CreateSectionRequest request)
    {
        var evt = await _unitOfWork.Events.GetByIdAsync(eventId);
        if (evt == null || evt.UserId != userId)
            return ApiResponse<SectionDto>.FailureResponse("الحدث غير موجود");

        var maxOrder = await _unitOfWork.Sections.GetMaxOrderByEventIdAsync(eventId);
        var section = _mapper.Map<Section>(request);
        section.EventId = eventId;
        section.Order = maxOrder + 1;

        await _unitOfWork.Sections.AddAsync(section);
        await _unitOfWork.SaveChangesAsync();

        return ApiResponse<SectionDto>.SuccessResponse(_mapper.Map<SectionDto>(section), "تم إنشاء القسم بنجاح");
    }

    public async Task<ApiResponse<SectionDto>> UpdateAsync(Guid id, Guid userId, UpdateSectionRequest request)
    {
        var section = await _unitOfWork.Sections.GetByIdAsync(id);
        if (section == null)
            return ApiResponse<SectionDto>.FailureResponse("القسم غير موجود");

        var evt = await _unitOfWork.Events.GetByIdAsync(section.EventId);
        if (evt == null || evt.UserId != userId)
            return ApiResponse<SectionDto>.FailureResponse("غير مصرح");

        _mapper.Map(request, section);
        _unitOfWork.Sections.Update(section);
        await _unitOfWork.SaveChangesAsync();

        return ApiResponse<SectionDto>.SuccessResponse(_mapper.Map<SectionDto>(section), "تم تحديث القسم بنجاح");
    }

    public async Task<ApiResponse> DeleteAsync(Guid id, Guid userId)
    {
        var section = await _unitOfWork.Sections.GetByIdAsync(id);
        if (section == null)
            return ApiResponse.FailureResponse("القسم غير موجود");

        var evt = await _unitOfWork.Events.GetByIdAsync(section.EventId);
        if (evt == null || evt.UserId != userId)
            return ApiResponse.FailureResponse("غير مصرح");

        _unitOfWork.Sections.Delete(section);
        await _unitOfWork.SaveChangesAsync();

        return ApiResponse.SuccessResponse("تم حذف القسم بنجاح");
    }

    public async Task<ApiResponse> ReorderAsync(Guid eventId, Guid userId, ReorderSectionsRequest request)
    {
        var evt = await _unitOfWork.Events.GetByIdAsync(eventId);
        if (evt == null || evt.UserId != userId)
            return ApiResponse.FailureResponse("الحدث غير موجود");

        await _unitOfWork.Sections.ReorderSectionsAsync(eventId, request.SectionIds);
        await _unitOfWork.SaveChangesAsync();

        return ApiResponse.SuccessResponse("تم إعادة ترتيب الأقسام بنجاح");
    }
}

