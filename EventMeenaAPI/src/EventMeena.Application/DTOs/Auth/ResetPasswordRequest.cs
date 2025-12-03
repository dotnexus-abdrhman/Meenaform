using System.ComponentModel.DataAnnotations;

namespace EventMeena.Application.DTOs.Auth;

/// <summary>
/// طلب إعادة تعيين كلمة المرور
/// </summary>
public class ResetPasswordRequest
{
    /// <summary>
    /// البريد الإلكتروني للمستخدم
    /// </summary>
    [Required(ErrorMessage = "البريد الإلكتروني مطلوب")]
    [EmailAddress(ErrorMessage = "صيغة البريد الإلكتروني غير صحيحة")]
    public string Email { get; set; } = string.Empty;
    
    /// <summary>
    /// رمز إعادة التعيين
    /// </summary>
    [Required(ErrorMessage = "رمز إعادة التعيين مطلوب")]
    public string Token { get; set; } = string.Empty;
    
    /// <summary>
    /// كلمة المرور الجديدة
    /// </summary>
    [Required(ErrorMessage = "كلمة المرور الجديدة مطلوبة")]
    [MinLength(6, ErrorMessage = "كلمة المرور يجب أن تكون 6 أحرف على الأقل")]
    public string NewPassword { get; set; } = string.Empty;
    
    /// <summary>
    /// تأكيد كلمة المرور الجديدة
    /// </summary>
    [Required(ErrorMessage = "تأكيد كلمة المرور مطلوب")]
    [Compare("NewPassword", ErrorMessage = "كلمات المرور غير متطابقة")]
    public string ConfirmPassword { get; set; } = string.Empty;
}

