namespace EventMeena.Application.Services.Interfaces;

/// <summary>
/// Current user service interface for accessing authenticated user info
/// </summary>
public interface ICurrentUserService
{
    /// <summary>
    /// الحصول على ID المستخدم الحالي
    /// </summary>
    Guid? UserId { get; }
    
    /// <summary>
    /// الحصول على اسم المستخدم الحالي
    /// </summary>
    string? UserName { get; }
    
    /// <summary>
    /// الحصول على بريد المستخدم الحالي
    /// </summary>
    string? Email { get; }
    
    /// <summary>
    /// التحقق من تسجيل دخول المستخدم
    /// </summary>
    bool IsAuthenticated { get; }
}

