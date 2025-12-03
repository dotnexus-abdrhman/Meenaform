namespace EventMeena.Application.DTOs.Events;

/// <summary>
/// Dashboard statistics DTO
/// </summary>
public class DashboardStatsDto
{
    // الإحصائيات الأساسية
    public int TotalEvents { get; set; }
    public int ActiveEvents { get; set; }
    public int TotalResponses { get; set; }
    public int TotalViews { get; set; }
    public double AverageCompletionRate { get; set; }
    
    // نسب التغيير (مقارنة مع الفترة السابقة - 30 يوم)
    public double EventsChange { get; set; }
    public double ActiveEventsChange { get; set; }
    public double ResponsesChange { get; set; }
    public double ViewsChange { get; set; }
    public double CompletionRateChange { get; set; }
    
    // بيانات الرسم البياني (آخر 7 أيام)
    public List<DailyStatsDto> DailyStats { get; set; } = new();
}

/// <summary>
/// Daily statistics for chart
/// </summary>
public class DailyStatsDto
{
    public string Date { get; set; } = string.Empty;
    public int Events { get; set; }
    public int Responses { get; set; }
}

