namespace EventMeena.Domain.Enums;

/// <summary>
/// طريقة المشاركة
/// </summary>
public enum SharingMethod
{
    Link = 1,       // رابط مباشر
    QRCode = 2,     // رمز QR
    Email = 3,      // بريد إلكتروني
    WhatsApp = 4,   // واتساب
    SMS = 5,        // رسالة نصية
    Embed = 6       // تضمين
}

