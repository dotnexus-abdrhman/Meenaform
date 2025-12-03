namespace EventMeena.Application.DTOs.Responses;

/// <summary>
/// Start response request DTO
/// </summary>
public class StartResponseRequest
{
    public string? RespondentName { get; set; }
    public string? RespondentEmail { get; set; }
    public string? RespondentPhone { get; set; }
}

/// <summary>
/// Submit answer request DTO
/// </summary>
public class SubmitAnswerRequest
{
    public Guid ComponentId { get; set; }
    public string AnswerJson { get; set; } = string.Empty;
}

/// <summary>
/// Submit section answers request DTO
/// </summary>
public class SubmitSectionAnswersRequest
{
    public int SectionIndex { get; set; }
    public List<SubmitAnswerRequest> Answers { get; set; } = new();
}

/// <summary>
/// Complete response request DTO
/// </summary>
public class CompleteResponseRequest
{
    public List<SubmitAnswerRequest>? FinalAnswers { get; set; }
}

/// <summary>
/// Update response answers request DTO - لتعديل رد موجود
/// </summary>
public class UpdateResponseAnswersRequest
{
    public List<SubmitAnswerRequest> Answers { get; set; } = new();
}

