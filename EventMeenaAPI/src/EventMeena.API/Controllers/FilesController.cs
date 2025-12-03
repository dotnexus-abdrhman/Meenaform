using EventMeena.Application.DTOs.Common;
using EventMeena.Application.DTOs.Files;
using EventMeena.Application.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EventMeena.API.Controllers;

/// <summary>
/// إدارة الملفات - رفع وحذف الملفات
/// </summary>
[ApiController]
[Route("api/[controller]")]
public class FilesController : BaseApiController
{
    private readonly IFileService _fileService;

    public FilesController(IFileService fileService)
    {
        _fileService = fileService;
    }

    /// <summary>
    /// رفع ملف جديد
    /// </summary>
    /// <param name="file">الملف المراد رفعه</param>
    /// <param name="type">نوع الملف (image, video, pdf, signature)</param>
    /// <returns>معلومات الملف المرفوع</returns>
    /// <response code="200">تم رفع الملف بنجاح</response>
    /// <response code="400">خطأ في البيانات المرسلة</response>
    [HttpPost("upload")]
    [AllowAnonymous] // السماح للمشاركين بالرفع بدون تسجيل دخول
    [RequestSizeLimit(104857600)] // 100 MB max
    [RequestFormLimits(MultipartBodyLengthLimit = 104857600)]
    public async Task<ActionResult<ApiResponse<FileUploadResponse>>> Upload(
        IFormFile file,
        [FromQuery] string type = "image")
    {
        try
        {
            // التحقق من وجود الملف
            if (file == null || file.Length == 0)
                return BadRequestResponse<FileUploadResponse>("يرجى اختيار ملف للرفع");

            // التحقق من نوع الملف المحدد
            var allowedTypes = new[] { "image", "video", "pdf", "signature" };
            if (!allowedTypes.Contains(type.ToLower()))
                return BadRequestResponse<FileUploadResponse>("نوع الملف غير مدعوم. الأنواع المدعومة: image, video, pdf, signature");

            // التحقق من صحة نوع الملف
            if (!_fileService.IsValidFileType(file.FileName, type.ToLower()))
                return BadRequestResponse<FileUploadResponse>($"امتداد الملف غير مسموح لنوع {type}");

            // التحقق من حجم الملف
            if (!_fileService.IsValidFileSize(file.Length, type.ToLower()))
                return BadRequestResponse<FileUploadResponse>("حجم الملف يتجاوز الحد المسموح");

            // رفع الملف
            var result = await _fileService.UploadFileAsync(file, type.ToLower());

            return Success(result, "تم رفع الملف بنجاح");
        }
        catch (ArgumentException ex)
        {
            return BadRequestResponse<FileUploadResponse>(ex.Message);
        }
        catch (Exception ex)
        {
            return BadRequestResponse<FileUploadResponse>($"حدث خطأ أثناء رفع الملف: {ex.Message}");
        }
    }

    /// <summary>
    /// حذف ملف
    /// </summary>
    /// <param name="fileUrl">رابط الملف النسبي</param>
    /// <returns>نتيجة الحذف</returns>
    [HttpDelete]
    [Authorize]
    public async Task<ActionResult<ApiResponse<bool>>> Delete([FromQuery] string fileUrl)
    {
        if (string.IsNullOrEmpty(fileUrl))
            return BadRequestResponse<bool>("يرجى تحديد رابط الملف");

        var result = await _fileService.DeleteFileAsync(fileUrl);

        if (result)
            return Success(true, "تم حذف الملف بنجاح");

        return NotFoundResponse<bool>("الملف غير موجود");
    }
}

