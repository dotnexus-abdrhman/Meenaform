namespace EventMeena.Application.DTOs.Events;

/// <summary>
/// نتيجة إرسال الحدث
/// </summary>
public class SendEventResponse
{
    /// <summary>
    /// عدد الإرسالات الناجحة
    /// </summary>
    public int SuccessCount { get; set; }
    
    /// <summary>
    /// عدد الإرسالات الفاشلة
    /// </summary>
    public int FailureCount { get; set; }
    
    /// <summary>
    /// إجمالي عدد المستلمين
    /// </summary>
    public int TotalRecipients { get; set; }
    
    /// <summary>
    /// قائمة الأخطاء (إن وجدت)
    /// </summary>
    public List<string>? Errors { get; set; }
    
    /// <summary>
    /// تاريخ الإرسال
    /// </summary>
    public DateTime SentAt { get; set; } = DateTime.UtcNow;
}

