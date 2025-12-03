using EventMeena.Application.DTOs.Components;
using FluentValidation;

namespace EventMeena.Application.Validators.Components;

/// <summary>
/// Validator for CreateComponentRequest
/// </summary>
public class CreateComponentRequestValidator : AbstractValidator<CreateComponentRequest>
{
    public CreateComponentRequestValidator()
    {
        RuleFor(x => x.Type)
            .IsInEnum().WithMessage("نوع المكون غير صالح");

        RuleFor(x => x.Title)
            .MaximumLength(500).WithMessage("العنوان يجب ألا يتجاوز 500 حرف")
            .When(x => !string.IsNullOrEmpty(x.Title));

        RuleFor(x => x.Placeholder)
            .MaximumLength(200).WithMessage("النص التوضيحي يجب ألا يتجاوز 200 حرف")
            .When(x => !string.IsNullOrEmpty(x.Placeholder));

        RuleFor(x => x.Points)
            .GreaterThanOrEqualTo(0).WithMessage("النقاط يجب أن تكون صفر أو أكثر")
            .When(x => x.Points.HasValue);
    }
}

/// <summary>
/// Validator for UpdateComponentRequest
/// </summary>
public class UpdateComponentRequestValidator : AbstractValidator<UpdateComponentRequest>
{
    public UpdateComponentRequestValidator()
    {
        RuleFor(x => x.Title)
            .MaximumLength(500).WithMessage("العنوان يجب ألا يتجاوز 500 حرف")
            .When(x => !string.IsNullOrEmpty(x.Title));

        RuleFor(x => x.Placeholder)
            .MaximumLength(200).WithMessage("النص التوضيحي يجب ألا يتجاوز 200 حرف")
            .When(x => !string.IsNullOrEmpty(x.Placeholder));

        RuleFor(x => x.Points)
            .GreaterThanOrEqualTo(0).WithMessage("النقاط يجب أن تكون صفر أو أكثر")
            .When(x => x.Points.HasValue);
    }
}

