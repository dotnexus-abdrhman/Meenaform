namespace EventMeena.Domain.Enums;

/// <summary>
/// حالة الرد
/// </summary>
public enum ResponseStatus
{
    Started = 1,    // بدأ
    InProgress = 2, // قيد التقدم
    Completed = 3,  // مكتمل
    Abandoned = 4   // متروك
}

