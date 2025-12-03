using EventMeena.Application.DTOs.Files;
using EventMeena.Application.Services.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;

namespace EventMeena.Application.Services.Implementations;

/// <summary>
/// خدمة إدارة الملفات
/// </summary>
public class FileService : IFileService
{
    private readonly IHostEnvironment _environment;
    private readonly IConfiguration _configuration;
    private readonly string _webRootPath;

    // الأنواع المسموحة لكل فئة
    private readonly Dictionary<string, string[]> _allowedExtensions = new()
    {
        { "image", new[] { ".jpg", ".jpeg", ".png", ".gif", ".webp" } },
        { "video", new[] { ".mp4", ".mov", ".avi", ".mkv", ".webm" } },
        { "pdf", new[] { ".pdf" } },
        { "signature", new[] { ".png", ".jpg", ".jpeg" } }
    };

    // الحد الأقصى للحجم بالبايت لكل فئة
    private readonly Dictionary<string, long> _maxFileSizes = new()
    {
        { "image", 10 * 1024 * 1024 },      // 10 MB
        { "video", 100 * 1024 * 1024 },     // 100 MB
        { "pdf", 20 * 1024 * 1024 },        // 20 MB
        { "signature", 2 * 1024 * 1024 }    // 2 MB
    };

    public FileService(IHostEnvironment environment, IConfiguration configuration)
    {
        _environment = environment;
        _configuration = configuration;
        // حساب مسار wwwroot
        _webRootPath = Path.Combine(_environment.ContentRootPath, "wwwroot");
    }

    public async Task<FileUploadResponse> UploadFileAsync(IFormFile file, string fileType)
    {
        // التحقق من الملف
        if (file == null || file.Length == 0)
            throw new ArgumentException("الملف فارغ أو غير صالح");

        // التحقق من نوع الملف
        var extension = Path.GetExtension(file.FileName).ToLowerInvariant();
        if (!IsValidFileType(file.FileName, fileType))
            throw new ArgumentException($"نوع الملف غير مسموح: {extension}");

        // التحقق من حجم الملف
        if (!IsValidFileSize(file.Length, fileType))
        {
            var maxSizeMB = _maxFileSizes.GetValueOrDefault(fileType, 10 * 1024 * 1024) / (1024 * 1024);
            throw new ArgumentException($"حجم الملف يتجاوز الحد المسموح ({maxSizeMB} MB)");
        }

        // إنشاء اسم فريد للملف
        var uniqueFileName = $"{Guid.NewGuid()}_{DateTimeOffset.UtcNow.ToUnixTimeSeconds()}{extension}";

        // تحديد مجلد الحفظ
        var folderName = fileType switch
        {
            "image" => "images",
            "video" => "videos",
            "pdf" => "pdfs",
            "signature" => "signatures",
            _ => "others"
        };

        var uploadsFolder = Path.Combine(_webRootPath, "uploads", folderName);

        // التأكد من وجود المجلد
        if (!Directory.Exists(uploadsFolder))
            Directory.CreateDirectory(uploadsFolder);

        var filePath = Path.Combine(uploadsFolder, uniqueFileName);

        // حفظ الملف
        using (var stream = new FileStream(filePath, FileMode.Create))
        {
            await file.CopyToAsync(stream);
        }

        // إرجاع معلومات الملف
        return new FileUploadResponse
        {
            FileUrl = $"/uploads/{folderName}/{uniqueFileName}",
            FileName = file.FileName,
            FileSize = file.Length,
            FileType = file.ContentType,
            UploadedAt = DateTime.UtcNow
        };
    }

    public Task<bool> DeleteFileAsync(string fileUrl)
    {
        try
        {
            if (string.IsNullOrEmpty(fileUrl))
                return Task.FromResult(false);

            // تحويل URL النسبي إلى مسار فعلي
            var relativePath = fileUrl.TrimStart('/');
            var filePath = Path.Combine(_webRootPath, relativePath);

            if (File.Exists(filePath))
            {
                File.Delete(filePath);
                return Task.FromResult(true);
            }

            return Task.FromResult(false);
        }
        catch
        {
            return Task.FromResult(false);
        }
    }

    public bool IsValidFileType(string fileName, string fileType)
    {
        var extension = Path.GetExtension(fileName).ToLowerInvariant();

        if (!_allowedExtensions.TryGetValue(fileType, out var allowedExts))
            return false;

        return allowedExts.Contains(extension);
    }

    public bool IsValidFileSize(long fileSize, string fileType)
    {
        if (!_maxFileSizes.TryGetValue(fileType, out var maxSize))
            maxSize = 10 * 1024 * 1024; // Default 10 MB

        return fileSize <= maxSize;
    }
}

