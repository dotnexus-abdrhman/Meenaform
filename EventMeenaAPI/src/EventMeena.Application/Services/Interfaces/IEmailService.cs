namespace EventMeena.Application.Services.Interfaces;

/// <summary>
/// Email service interface for sending emails
/// </summary>
public interface IEmailService
{
    /// <summary>
    /// إرسال بريد إلكتروني واحد
    /// </summary>
    /// <param name="toEmail">البريد الإلكتروني للمستلم</param>
    /// <param name="toName">اسم المستلم</param>
    /// <param name="subject">عنوان الرسالة</param>
    /// <param name="htmlContent">محتوى الرسالة بصيغة HTML</param>
    /// <param name="plainTextContent">محتوى الرسالة بصيغة نص عادي (اختياري)</param>
    /// <returns>نجاح أو فشل الإرسال</returns>
    Task<bool> SendEmailAsync(string toEmail, string toName, string subject, string htmlContent, string? plainTextContent = null);

    /// <summary>
    /// إرسال بريد إلكتروني لعدة مستلمين
    /// </summary>
    /// <param name="recipients">قائمة المستلمين (البريد، الاسم)</param>
    /// <param name="subject">عنوان الرسالة</param>
    /// <param name="htmlContent">محتوى الرسالة بصيغة HTML</param>
    /// <param name="plainTextContent">محتوى الرسالة بصيغة نص عادي (اختياري)</param>
    /// <returns>عدد الرسائل المرسلة بنجاح</returns>
    Task<int> SendBulkEmailAsync(IEnumerable<(string Email, string Name)> recipients, string subject, string htmlContent, string? plainTextContent = null);

    /// <summary>
    /// إرسال دعوة للمشاركة في حدث
    /// </summary>
    /// <param name="toEmail">البريد الإلكتروني للمستلم</param>
    /// <param name="toName">اسم المستلم</param>
    /// <param name="eventTitle">عنوان الحدث</param>
    /// <param name="eventDescription">وصف الحدث</param>
    /// <param name="eventLink">رابط الحدث</param>
    /// <returns>نجاح أو فشل الإرسال</returns>
    Task<bool> SendEventInvitationAsync(string toEmail, string toName, string eventTitle, string? eventDescription, string eventLink);

    /// <summary>
    /// إرسال تذكير بالمشاركة في حدث
    /// </summary>
    /// <param name="toEmail">البريد الإلكتروني للمستلم</param>
    /// <param name="toName">اسم المستلم</param>
    /// <param name="eventTitle">عنوان الحدث</param>
    /// <param name="eventLink">رابط الحدث</param>
    /// <param name="endDate">تاريخ انتهاء الحدث</param>
    /// <returns>نجاح أو فشل الإرسال</returns>
    Task<bool> SendEventReminderAsync(string toEmail, string toName, string eventTitle, string eventLink, DateTime? endDate);

    /// <summary>
    /// إرسال رابط إعادة تعيين كلمة المرور
    /// </summary>
    /// <param name="toEmail">البريد الإلكتروني للمستلم</param>
    /// <param name="toName">اسم المستلم</param>
    /// <param name="resetLink">رابط إعادة التعيين</param>
    /// <returns>نجاح أو فشل الإرسال</returns>
    Task<bool> SendPasswordResetEmailAsync(string toEmail, string toName, string resetLink);
}

