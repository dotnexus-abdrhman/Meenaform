using EventMeena.Application.DTOs.Auth;
using EventMeena.Application.DTOs.Common;
using EventMeena.Application.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EventMeena.API.Controllers;

/// <summary>
/// Authentication and user management controller
/// </summary>
public class AuthController : BaseApiController
{
    private readonly IAuthService _authService;

    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }

    /// <summary>
    /// تسجيل مستخدم جديد
    /// </summary>
    [HttpPost("register")]
    [AllowAnonymous]
    public async Task<ActionResult<ApiResponse<AuthResponse>>> Register([FromBody] RegisterRequest request)
    {
        var result = await _authService.RegisterAsync(request);

        if (!result.Success)
            return BadRequestResponse<AuthResponse>(result.Message ?? "فشل التسجيل");

        return Created(result.Data!, "تم إنشاء الحساب بنجاح");
    }

    /// <summary>
    /// تسجيل الدخول
    /// </summary>
    [HttpPost("login")]
    [AllowAnonymous]
    public async Task<ActionResult<ApiResponse<AuthResponse>>> Login([FromBody] LoginRequest request)
    {
        var result = await _authService.LoginAsync(request);

        if (!result.Success)
            return BadRequestResponse<AuthResponse>(result.Message ?? "فشل تسجيل الدخول");

        return Success(result.Data!, "تم تسجيل الدخول بنجاح");
    }

    /// <summary>
    /// تحديث التوكن
    /// </summary>
    [HttpPost("refresh-token")]
    [AllowAnonymous]
    public async Task<ActionResult<ApiResponse<AuthResponse>>> RefreshToken([FromBody] RefreshTokenRequest request)
    {
        var result = await _authService.RefreshTokenAsync(request);

        if (!result.Success)
            return UnauthorizedResponse<AuthResponse>(result.Message ?? "التوكن غير صالح");

        return Success(result.Data!, "تم تحديث التوكن بنجاح");
    }

    /// <summary>
    /// تسجيل الخروج
    /// </summary>
    [HttpPost("logout")]
    [Authorize]
    public async Task<ActionResult<ApiResponse>> Logout()
    {
        var result = await _authService.LogoutAsync(CurrentUserId);

        if (!result.Success)
            return BadRequestNoContent(result.Message ?? "فشل تسجيل الخروج");

        return SuccessNoContent("تم تسجيل الخروج بنجاح");
    }

    /// <summary>
    /// الحصول على معلومات المستخدم الحالي
    /// </summary>
    [HttpGet("me")]
    [Authorize]
    public async Task<ActionResult<ApiResponse<UserDto>>> GetCurrentUser()
    {
        var result = await _authService.GetCurrentUserAsync(CurrentUserId);

        if (!result.Success)
            return NotFoundResponse<UserDto>(result.Message ?? "المستخدم غير موجود");

        return Success(result.Data!);
    }

    /// <summary>
    /// تحديث الملف الشخصي
    /// </summary>
    [HttpPut("profile")]
    [Authorize]
    public async Task<ActionResult<ApiResponse<UserDto>>> UpdateProfile([FromBody] UpdateProfileRequest request)
    {
        var result = await _authService.UpdateProfileAsync(CurrentUserId, request);

        if (!result.Success)
            return BadRequestResponse<UserDto>(result.Message ?? "فشل تحديث الملف الشخصي");

        return Success(result.Data!, "تم تحديث الملف الشخصي بنجاح");
    }

    /// <summary>
    /// تغيير كلمة المرور
    /// </summary>
    [HttpPost("change-password")]
    [Authorize]
    public async Task<ActionResult<ApiResponse>> ChangePassword([FromBody] ChangePasswordRequest request)
    {
        var result = await _authService.ChangePasswordAsync(CurrentUserId, request);

        if (!result.Success)
            return BadRequestNoContent(result.Message ?? "فشل تغيير كلمة المرور");

        return SuccessNoContent("تم تغيير كلمة المرور بنجاح");
    }

    /// <summary>
    /// نسيت كلمة المرور - إرسال رابط إعادة التعيين
    /// </summary>
    [HttpPost("forgot-password")]
    [AllowAnonymous]
    public async Task<ActionResult<ApiResponse>> ForgotPassword([FromBody] ForgotPasswordRequest request)
    {
        var result = await _authService.ForgotPasswordAsync(request);

        // نعود دائماً برسالة نجاح لأسباب أمنية
        return SuccessNoContent(result.Message ?? "إذا كان البريد الإلكتروني مسجلاً، ستصلك رسالة لإعادة تعيين كلمة المرور");
    }

    /// <summary>
    /// إعادة تعيين كلمة المرور
    /// </summary>
    [HttpPost("reset-password")]
    [AllowAnonymous]
    public async Task<ActionResult<ApiResponse>> ResetPassword([FromBody] ResetPasswordRequest request)
    {
        var result = await _authService.ResetPasswordAsync(request);

        if (!result.Success)
            return BadRequestNoContent(result.Message ?? "فشل إعادة تعيين كلمة المرور");

        return SuccessNoContent("تم إعادة تعيين كلمة المرور بنجاح");
    }
}

