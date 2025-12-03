using EventMeena.Domain.Entities;

namespace EventMeena.Application.Services.Interfaces;

/// <summary>
/// JWT Service interface for token generation and validation
/// </summary>
public interface IJwtService
{
    /// <summary>
    /// توليد Access Token للمستخدم
    /// </summary>
    string GenerateAccessToken(User user);
    
    /// <summary>
    /// توليد Refresh Token
    /// </summary>
    string GenerateRefreshToken();
    
    /// <summary>
    /// التحقق من صلاحية Access Token
    /// </summary>
    bool ValidateToken(string token);
    
    /// <summary>
    /// استخراج User ID من Access Token
    /// </summary>
    Guid? GetUserIdFromToken(string token);
    
    /// <summary>
    /// الحصول على تاريخ انتهاء صلاحية الـ Token
    /// </summary>
    DateTime GetTokenExpiration();
    
    /// <summary>
    /// الحصول على تاريخ انتهاء صلاحية Refresh Token
    /// </summary>
    DateTime GetRefreshTokenExpiration();
}

