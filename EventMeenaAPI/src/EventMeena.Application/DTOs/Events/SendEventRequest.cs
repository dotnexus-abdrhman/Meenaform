namespace EventMeena.Application.DTOs.Events;

/// <summary>
/// طلب إرسال حدث لجهات الاتصال أو المجموعات
/// </summary>
public class SendEventRequest
{
    /// <summary>
    /// قائمة معرفات جهات الاتصال المراد إرسال الحدث لها
    /// </summary>
    public List<Guid>? ContactIds { get; set; }
    
    /// <summary>
    /// قائمة معرفات المجموعات المراد إرسال الحدث لها
    /// </summary>
    public List<Guid>? GroupIds { get; set; }
    
    /// <summary>
    /// قائمة إيميلات إضافية (اختياري)
    /// </summary>
    public List<string>? Emails { get; set; }
    
    /// <summary>
    /// رسالة مخصصة للإرسال (اختياري)
    /// </summary>
    public string? CustomMessage { get; set; }
}

