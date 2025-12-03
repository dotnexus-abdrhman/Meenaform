using System.ComponentModel.DataAnnotations;

namespace EventMeena.Application.DTOs.Auth;

/// <summary>
/// طلب استعادة كلمة المرور
/// </summary>
public class ForgotPasswordRequest
{
    /// <summary>
    /// البريد الإلكتروني للمستخدم
    /// </summary>
    [Required(ErrorMessage = "البريد الإلكتروني مطلوب")]
    [EmailAddress(ErrorMessage = "صيغة البريد الإلكتروني غير صحيحة")]
    public string Email { get; set; } = string.Empty;
}

