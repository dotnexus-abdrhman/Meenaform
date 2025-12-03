using EventMeena.Application.DTOs.Templates;
using FluentValidation;

namespace EventMeena.Application.Validators.Templates;

/// <summary>
/// Validator for CreateTemplateRequest
/// </summary>
public class CreateTemplateRequestValidator : AbstractValidator<CreateTemplateRequest>
{
    public CreateTemplateRequestValidator()
    {
        RuleFor(x => x.Name)
            .NotEmpty().WithMessage("اسم القالب مطلوب")
            .MinimumLength(2).WithMessage("الاسم يجب أن يكون على الأقل حرفين")
            .MaximumLength(200).WithMessage("الاسم يجب ألا يتجاوز 200 حرف");

        RuleFor(x => x.Description)
            .MaximumLength(1000).WithMessage("الوصف يجب ألا يتجاوز 1000 حرف")
            .When(x => !string.IsNullOrEmpty(x.Description));

        RuleFor(x => x.Type)
            .IsInEnum().WithMessage("نوع القالب غير صالح");

        RuleFor(x => x.TemplateDataJson)
            .NotEmpty().WithMessage("بيانات القالب مطلوبة");
    }
}

/// <summary>
/// Validator for UpdateTemplateRequest
/// </summary>
public class UpdateTemplateRequestValidator : AbstractValidator<UpdateTemplateRequest>
{
    public UpdateTemplateRequestValidator()
    {
        RuleFor(x => x.Name)
            .MinimumLength(2).WithMessage("الاسم يجب أن يكون على الأقل حرفين")
            .MaximumLength(200).WithMessage("الاسم يجب ألا يتجاوز 200 حرف")
            .When(x => !string.IsNullOrEmpty(x.Name));

        RuleFor(x => x.Description)
            .MaximumLength(1000).WithMessage("الوصف يجب ألا يتجاوز 1000 حرف")
            .When(x => !string.IsNullOrEmpty(x.Description));
    }
}

/// <summary>
/// Validator for CreateTemplateFromEventRequest
/// </summary>
public class CreateTemplateFromEventRequestValidator : AbstractValidator<CreateTemplateFromEventRequest>
{
    public CreateTemplateFromEventRequestValidator()
    {
        RuleFor(x => x.EventId)
            .NotEmpty().WithMessage("معرف الحدث مطلوب");

        RuleFor(x => x.Name)
            .NotEmpty().WithMessage("اسم القالب مطلوب")
            .MinimumLength(2).WithMessage("الاسم يجب أن يكون على الأقل حرفين")
            .MaximumLength(200).WithMessage("الاسم يجب ألا يتجاوز 200 حرف");

        RuleFor(x => x.Description)
            .MaximumLength(1000).WithMessage("الوصف يجب ألا يتجاوز 1000 حرف")
            .When(x => !string.IsNullOrEmpty(x.Description));
    }
}

