using EventMeena.Application.DTOs.Responses;
using FluentValidation;

namespace EventMeena.Application.Validators.Responses;

/// <summary>
/// Validator for StartResponseRequest
/// </summary>
public class StartResponseRequestValidator : AbstractValidator<StartResponseRequest>
{
    public StartResponseRequestValidator()
    {
        RuleFor(x => x.RespondentName)
            .MaximumLength(100).WithMessage("الاسم يجب ألا يتجاوز 100 حرف")
            .When(x => !string.IsNullOrEmpty(x.RespondentName));

        RuleFor(x => x.RespondentEmail)
            .EmailAddress().WithMessage("البريد الإلكتروني غير صالح")
            .MaximumLength(256).WithMessage("البريد الإلكتروني يجب ألا يتجاوز 256 حرف")
            .When(x => !string.IsNullOrEmpty(x.RespondentEmail));

        RuleFor(x => x.RespondentPhone)
            .MaximumLength(20).WithMessage("رقم الهاتف يجب ألا يتجاوز 20 رقم")
            .When(x => !string.IsNullOrEmpty(x.RespondentPhone));
    }
}

/// <summary>
/// Validator for SubmitSectionAnswersRequest
/// </summary>
public class SubmitSectionAnswersRequestValidator : AbstractValidator<SubmitSectionAnswersRequest>
{
    public SubmitSectionAnswersRequestValidator()
    {
        RuleFor(x => x.SectionIndex)
            .GreaterThanOrEqualTo(0).WithMessage("فهرس القسم يجب أن يكون صفر أو أكثر");

        RuleFor(x => x.Answers)
            .NotNull().WithMessage("الإجابات مطلوبة");
    }
}

/// <summary>
/// Validator for CompleteResponseRequest
/// </summary>
public class CompleteResponseRequestValidator : AbstractValidator<CompleteResponseRequest>
{
    public CompleteResponseRequestValidator()
    {
        // FinalAnswers is optional
    }
}

