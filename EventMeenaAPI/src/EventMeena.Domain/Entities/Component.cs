using EventMeena.Domain.Common;
using EventMeena.Domain.Enums;

namespace EventMeena.Domain.Entities;

/// <summary>
/// كيان المكون (سؤال أو عنصر عرض)
/// </summary>
public class Component : AuditableEntity
{
    public ComponentType Type { get; set; }
    public int Order { get; set; }
    
    // محتوى السؤال/العنصر
    public string? Title { get; set; }
    public string? Description { get; set; }
    public string? Placeholder { get; set; }
    
    // إعدادات عامة
    public bool IsRequired { get; set; } = false;
    public bool IsVisible { get; set; } = true;
    
    // الخيارات (JSON) - للأسئلة متعددة الخيارات
    public string? OptionsJson { get; set; }
    
    // إعدادات التحقق (JSON)
    public string? ValidationJson { get; set; }
    
    // إعدادات الاختبار
    public string? CorrectAnswerJson { get; set; }
    public int? Points { get; set; }
    public string? Explanation { get; set; }
    
    // إعدادات المقياس/التقييم
    public int? MinValue { get; set; }
    public int? MaxValue { get; set; }
    public string? MinLabel { get; set; }
    public string? MaxLabel { get; set; }
    
    // إعدادات الوسائط
    public string? MediaUrl { get; set; }
    public string? MediaType { get; set; }
    
    // إعدادات التنسيق (JSON)
    public string? StyleJson { get; set; }
    
    // القسم المالك
    public Guid SectionId { get; set; }
    
    // Navigation Properties
    public virtual Section Section { get; set; } = null!;
}

