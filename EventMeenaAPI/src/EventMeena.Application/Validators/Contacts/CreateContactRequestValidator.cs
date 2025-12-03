using EventMeena.Application.DTOs.Contacts;
using FluentValidation;

namespace EventMeena.Application.Validators.Contacts;

/// <summary>
/// Validator for CreateContactRequest
/// </summary>
public class CreateContactRequestValidator : AbstractValidator<CreateContactRequest>
{
    public CreateContactRequestValidator()
    {
        RuleFor(x => x.Name)
            .NotEmpty().WithMessage("اسم جهة الاتصال مطلوب")
            .MinimumLength(2).WithMessage("الاسم يجب أن يكون على الأقل حرفين")
            .MaximumLength(100).WithMessage("الاسم يجب ألا يتجاوز 100 حرف");

        RuleFor(x => x.Email)
            .EmailAddress().WithMessage("البريد الإلكتروني غير صالح")
            .MaximumLength(256).WithMessage("البريد الإلكتروني يجب ألا يتجاوز 256 حرف")
            .When(x => !string.IsNullOrEmpty(x.Email));

        RuleFor(x => x.Phone)
            .MaximumLength(20).WithMessage("رقم الهاتف يجب ألا يتجاوز 20 رقم")
            .When(x => !string.IsNullOrEmpty(x.Phone));

        RuleFor(x => x)
            .Must(x => !string.IsNullOrEmpty(x.Email) || !string.IsNullOrEmpty(x.Phone))
            .WithMessage("يجب توفير البريد الإلكتروني أو رقم الهاتف على الأقل");
    }
}

/// <summary>
/// Validator for UpdateContactRequest
/// </summary>
public class UpdateContactRequestValidator : AbstractValidator<UpdateContactRequest>
{
    public UpdateContactRequestValidator()
    {
        RuleFor(x => x.Name)
            .MinimumLength(2).WithMessage("الاسم يجب أن يكون على الأقل حرفين")
            .MaximumLength(100).WithMessage("الاسم يجب ألا يتجاوز 100 حرف")
            .When(x => !string.IsNullOrEmpty(x.Name));

        RuleFor(x => x.Email)
            .EmailAddress().WithMessage("البريد الإلكتروني غير صالح")
            .MaximumLength(256).WithMessage("البريد الإلكتروني يجب ألا يتجاوز 256 حرف")
            .When(x => !string.IsNullOrEmpty(x.Email));

        RuleFor(x => x.Phone)
            .MaximumLength(20).WithMessage("رقم الهاتف يجب ألا يتجاوز 20 رقم")
            .When(x => !string.IsNullOrEmpty(x.Phone));
    }
}

