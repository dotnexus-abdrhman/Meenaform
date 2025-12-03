using AutoMapper;
using EventMeena.Application.DTOs.Common;
using EventMeena.Application.DTOs.Components;
using EventMeena.Application.Interfaces;
using EventMeena.Application.Services.Interfaces;
using EventMeena.Domain.Entities;

namespace EventMeena.Application.Services.Implementations;

/// <summary>
/// Component service implementation
/// </summary>
public class ComponentService : IComponentService
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IMapper _mapper;

    public ComponentService(IUnitOfWork unitOfWork, IMapper mapper)
    {
        _unitOfWork = unitOfWork;
        _mapper = mapper;
    }

    public async Task<ApiResponse<ComponentDto>> GetByIdAsync(Guid id, Guid userId)
    {
        var component = await _unitOfWork.Components.GetByIdAsync(id);
        if (component == null)
            return ApiResponse<ComponentDto>.FailureResponse("المكون غير موجود");

        var section = await _unitOfWork.Sections.GetByIdAsync(component.SectionId);
        if (section == null)
            return ApiResponse<ComponentDto>.FailureResponse("القسم غير موجود");

        var evt = await _unitOfWork.Events.GetByIdAsync(section.EventId);
        if (evt == null || evt.UserId != userId)
            return ApiResponse<ComponentDto>.FailureResponse("غير مصرح");

        return ApiResponse<ComponentDto>.SuccessResponse(_mapper.Map<ComponentDto>(component));
    }

    public async Task<ApiResponse<List<ComponentDto>>> GetBySectionIdAsync(Guid sectionId, Guid userId)
    {
        var section = await _unitOfWork.Sections.GetByIdAsync(sectionId);
        if (section == null)
            return ApiResponse<List<ComponentDto>>.FailureResponse("القسم غير موجود");

        var evt = await _unitOfWork.Events.GetByIdAsync(section.EventId);
        if (evt == null || evt.UserId != userId)
            return ApiResponse<List<ComponentDto>>.FailureResponse("غير مصرح");

        var components = await _unitOfWork.Components.GetBySectionIdAsync(sectionId);
        return ApiResponse<List<ComponentDto>>.SuccessResponse(_mapper.Map<List<ComponentDto>>(components));
    }

    public async Task<ApiResponse<ComponentDto>> CreateAsync(Guid sectionId, Guid userId, CreateComponentRequest request)
    {
        var section = await _unitOfWork.Sections.GetByIdAsync(sectionId);
        if (section == null)
            return ApiResponse<ComponentDto>.FailureResponse("القسم غير موجود");

        var evt = await _unitOfWork.Events.GetByIdAsync(section.EventId);
        if (evt == null || evt.UserId != userId)
            return ApiResponse<ComponentDto>.FailureResponse("غير مصرح");

        var maxOrder = await _unitOfWork.Components.GetMaxOrderBySectionIdAsync(sectionId);
        var component = _mapper.Map<Component>(request);
        component.SectionId = sectionId;
        component.Order = maxOrder + 1;

        await _unitOfWork.Components.AddAsync(component);
        await _unitOfWork.SaveChangesAsync();

        return ApiResponse<ComponentDto>.SuccessResponse(_mapper.Map<ComponentDto>(component), "تم إنشاء المكون بنجاح");
    }

    public async Task<ApiResponse<ComponentDto>> UpdateAsync(Guid id, Guid userId, UpdateComponentRequest request)
    {
        var component = await _unitOfWork.Components.GetByIdAsync(id);
        if (component == null)
            return ApiResponse<ComponentDto>.FailureResponse("المكون غير موجود");

        var section = await _unitOfWork.Sections.GetByIdAsync(component.SectionId);
        if (section == null)
            return ApiResponse<ComponentDto>.FailureResponse("القسم غير موجود");

        var evt = await _unitOfWork.Events.GetByIdAsync(section.EventId);
        if (evt == null || evt.UserId != userId)
            return ApiResponse<ComponentDto>.FailureResponse("غير مصرح");

        _mapper.Map(request, component);
        _unitOfWork.Components.Update(component);
        await _unitOfWork.SaveChangesAsync();

        return ApiResponse<ComponentDto>.SuccessResponse(_mapper.Map<ComponentDto>(component), "تم تحديث المكون بنجاح");
    }

    public async Task<ApiResponse> DeleteAsync(Guid id, Guid userId)
    {
        var component = await _unitOfWork.Components.GetByIdAsync(id);
        if (component == null)
            return ApiResponse.FailureResponse("المكون غير موجود");

        var section = await _unitOfWork.Sections.GetByIdAsync(component.SectionId);
        if (section == null)
            return ApiResponse.FailureResponse("القسم غير موجود");

        var evt = await _unitOfWork.Events.GetByIdAsync(section.EventId);
        if (evt == null || evt.UserId != userId)
            return ApiResponse.FailureResponse("غير مصرح");

        _unitOfWork.Components.Delete(component);
        await _unitOfWork.SaveChangesAsync();

        return ApiResponse.SuccessResponse("تم حذف المكون بنجاح");
    }

    public async Task<ApiResponse> ReorderAsync(Guid sectionId, Guid userId, ReorderComponentsRequest request)
    {
        var section = await _unitOfWork.Sections.GetByIdAsync(sectionId);
        if (section == null)
            return ApiResponse.FailureResponse("القسم غير موجود");

        var evt = await _unitOfWork.Events.GetByIdAsync(section.EventId);
        if (evt == null || evt.UserId != userId)
            return ApiResponse.FailureResponse("غير مصرح");

        await _unitOfWork.Components.ReorderComponentsAsync(sectionId, request.ComponentIds);
        await _unitOfWork.SaveChangesAsync();

        return ApiResponse.SuccessResponse("تم إعادة ترتيب المكونات بنجاح");
    }
}

