namespace EventMeena.Domain.Enums;

/// <summary>
/// حالة الإرسال
/// </summary>
public enum SendStatus
{
    Pending = 1,    // قيد الانتظار
    Sent = 2,       // تم الإرسال
    Delivered = 3,  // تم التسليم
    Failed = 4,     // فشل
    Opened = 5      // تم الفتح
}

