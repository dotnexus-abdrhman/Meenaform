using EventMeena.Application.DTOs.Events;
using FluentValidation;

namespace EventMeena.Application.Validators.Events;

/// <summary>
/// Validator for CreateEventRequest
/// </summary>
public class CreateEventRequestValidator : AbstractValidator<CreateEventRequest>
{
    public CreateEventRequestValidator()
    {
        RuleFor(x => x.Title)
            .NotEmpty().WithMessage("عنوان الحدث مطلوب")
            .MinimumLength(3).WithMessage("العنوان يجب أن يكون على الأقل 3 أحرف")
            .MaximumLength(200).WithMessage("العنوان يجب ألا يتجاوز 200 حرف");

        RuleFor(x => x.Description)
            .MaximumLength(2000).WithMessage("الوصف يجب ألا يتجاوز 2000 حرف")
            .When(x => !string.IsNullOrEmpty(x.Description));

        RuleFor(x => x.Type)
            .IsInEnum().WithMessage("نوع الحدث غير صالح");

        RuleFor(x => x.StartDate)
            .GreaterThan(DateTime.UtcNow).WithMessage("تاريخ البدء يجب أن يكون في المستقبل")
            .When(x => x.StartDate.HasValue);

        RuleFor(x => x.EndDate)
            .GreaterThan(x => x.StartDate).WithMessage("تاريخ الانتهاء يجب أن يكون بعد تاريخ البدء")
            .When(x => x.EndDate.HasValue && x.StartDate.HasValue);

        RuleFor(x => x.MaxResponses)
            .GreaterThan(0).WithMessage("الحد الأقصى للردود يجب أن يكون أكبر من صفر")
            .When(x => x.MaxResponses.HasValue);

        RuleFor(x => x.TimeLimitMinutes)
            .GreaterThan(0).WithMessage("الحد الزمني يجب أن يكون أكبر من صفر")
            .When(x => x.TimeLimitMinutes.HasValue);

        RuleFor(x => x.PassingScore)
            .InclusiveBetween(0, 100).WithMessage("درجة النجاح يجب أن تكون بين 0 و 100")
            .When(x => x.PassingScore.HasValue);
    }
}

