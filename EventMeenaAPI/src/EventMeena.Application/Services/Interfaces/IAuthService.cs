using EventMeena.Application.DTOs.Auth;
using EventMeena.Application.DTOs.Common;

namespace EventMeena.Application.Services.Interfaces;

/// <summary>
/// Authentication service interface
/// </summary>
public interface IAuthService
{
    Task<ApiResponse<AuthResponse>> RegisterAsync(RegisterRequest request);
    Task<ApiResponse<AuthResponse>> LoginAsync(LoginRequest request);
    Task<ApiResponse<AuthResponse>> RefreshTokenAsync(RefreshTokenRequest request);
    Task<ApiResponse> LogoutAsync(Guid userId);
    Task<ApiResponse<UserDto>> GetCurrentUserAsync(Guid userId);
    Task<ApiResponse<UserDto>> UpdateProfileAsync(Guid userId, UpdateProfileRequest request);
    Task<ApiResponse> ChangePasswordAsync(Guid userId, ChangePasswordRequest request);

    /// <summary>
    /// طلب إعادة تعيين كلمة المرور (نسيت كلمة المرور)
    /// </summary>
    Task<ApiResponse> ForgotPasswordAsync(ForgotPasswordRequest request);

    /// <summary>
    /// إعادة تعيين كلمة المرور باستخدام الرمز
    /// </summary>
    Task<ApiResponse> ResetPasswordAsync(ResetPasswordRequest request);
}

