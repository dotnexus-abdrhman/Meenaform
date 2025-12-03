namespace EventMeena.Application.DTOs.Events;

/// <summary>
/// سجل إرسال الحدث
/// </summary>
public class SendHistoryDto
{
    /// <summary>
    /// معرف السجل
    /// </summary>
    public Guid Id { get; set; }
    
    /// <summary>
    /// معرف الحدث
    /// </summary>
    public Guid EventId { get; set; }
    
    /// <summary>
    /// معرف جهة الاتصال
    /// </summary>
    public Guid? ContactId { get; set; }
    
    /// <summary>
    /// طريقة الإرسال (Email, WhatsApp, SMS)
    /// </summary>
    public string Method { get; set; } = string.Empty;
    
    /// <summary>
    /// حالة الإرسال (Pending, Sent, Failed, Delivered)
    /// </summary>
    public string Status { get; set; } = string.Empty;
    
    /// <summary>
    /// البريد الإلكتروني للمستلم
    /// </summary>
    public string? RecipientEmail { get; set; }
    
    /// <summary>
    /// رقم هاتف المستلم
    /// </summary>
    public string? RecipientPhone { get; set; }
    
    /// <summary>
    /// عنوان الرسالة
    /// </summary>
    public string? Subject { get; set; }
    
    /// <summary>
    /// تاريخ الإرسال
    /// </summary>
    public DateTime? SentAt { get; set; }
    
    /// <summary>
    /// رسالة الخطأ (في حالة الفشل)
    /// </summary>
    public string? ErrorMessage { get; set; }
}

