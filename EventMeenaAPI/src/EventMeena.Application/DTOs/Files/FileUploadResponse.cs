namespace EventMeena.Application.DTOs.Files;

/// <summary>
/// استجابة رفع الملف
/// </summary>
public class FileUploadResponse
{
    /// <summary>
    /// رابط الملف النسبي
    /// </summary>
    public string FileUrl { get; set; } = string.Empty;
    
    /// <summary>
    /// اسم الملف الأصلي
    /// </summary>
    public string FileName { get; set; } = string.Empty;
    
    /// <summary>
    /// حجم الملف بالبايت
    /// </summary>
    public long FileSize { get; set; }
    
    /// <summary>
    /// نوع الملف (MIME Type)
    /// </summary>
    public string FileType { get; set; } = string.Empty;
    
    /// <summary>
    /// تاريخ الرفع
    /// </summary>
    public DateTime UploadedAt { get; set; } = DateTime.UtcNow;
}

