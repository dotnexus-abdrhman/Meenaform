using EventMeena.Application.DTOs.Sections;
using FluentValidation;

namespace EventMeena.Application.Validators.Sections;

/// <summary>
/// Validator for CreateSectionRequest
/// </summary>
public class CreateSectionRequestValidator : AbstractValidator<CreateSectionRequest>
{
    public CreateSectionRequestValidator()
    {
        RuleFor(x => x.Title)
            .NotEmpty().WithMessage("عنوان القسم مطلوب")
            .MinimumLength(2).WithMessage("العنوان يجب أن يكون على الأقل حرفين")
            .MaximumLength(200).WithMessage("العنوان يجب ألا يتجاوز 200 حرف");

        RuleFor(x => x.Description)
            .MaximumLength(1000).WithMessage("الوصف يجب ألا يتجاوز 1000 حرف")
            .When(x => !string.IsNullOrEmpty(x.Description));
    }
}

/// <summary>
/// Validator for UpdateSectionRequest
/// </summary>
public class UpdateSectionRequestValidator : AbstractValidator<UpdateSectionRequest>
{
    public UpdateSectionRequestValidator()
    {
        RuleFor(x => x.Title)
            .MinimumLength(2).WithMessage("العنوان يجب أن يكون على الأقل حرفين")
            .MaximumLength(200).WithMessage("العنوان يجب ألا يتجاوز 200 حرف")
            .When(x => !string.IsNullOrEmpty(x.Title));

        RuleFor(x => x.Description)
            .MaximumLength(1000).WithMessage("الوصف يجب ألا يتجاوز 1000 حرف")
            .When(x => !string.IsNullOrEmpty(x.Description));
    }
}

