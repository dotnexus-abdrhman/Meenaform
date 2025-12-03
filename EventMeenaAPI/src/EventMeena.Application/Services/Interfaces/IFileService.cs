using EventMeena.Application.DTOs.Files;
using Microsoft.AspNetCore.Http;

namespace EventMeena.Application.Services.Interfaces;

/// <summary>
/// خدمة إدارة الملفات
/// </summary>
public interface IFileService
{
    /// <summary>
    /// رفع ملف
    /// </summary>
    /// <param name="file">الملف المرفوع</param>
    /// <param name="fileType">نوع الملف (image, video, pdf, signature)</param>
    /// <returns>معلومات الملف المرفوع</returns>
    Task<FileUploadResponse> UploadFileAsync(IFormFile file, string fileType);
    
    /// <summary>
    /// حذف ملف
    /// </summary>
    /// <param name="fileUrl">رابط الملف النسبي</param>
    /// <returns>نجاح العملية</returns>
    Task<bool> DeleteFileAsync(string fileUrl);
    
    /// <summary>
    /// التحقق من صحة نوع الملف
    /// </summary>
    bool IsValidFileType(string fileName, string fileType);
    
    /// <summary>
    /// التحقق من حجم الملف
    /// </summary>
    bool IsValidFileSize(long fileSize, string fileType);
}

