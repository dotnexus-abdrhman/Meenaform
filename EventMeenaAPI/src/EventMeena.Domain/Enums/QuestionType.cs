namespace EventMeena.Domain.Enums;

/// <summary>
/// نوع السؤال (للاختبارات)
/// </summary>
public enum QuestionType
{
    SingleAnswer = 1,   // إجابة واحدة صحيحة
    MultipleAnswer = 2, // إجابات متعددة صحيحة
    TrueFalse = 3,      // صح أو خطأ
    FillBlank = 4       // ملء الفراغ
}

