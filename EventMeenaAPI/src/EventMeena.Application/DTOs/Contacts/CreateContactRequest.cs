namespace EventMeena.Application.DTOs.Contacts;

/// <summary>
/// Create contact request DTO
/// </summary>
public class CreateContactRequest
{
    public string Name { get; set; } = string.Empty;
    public string? Email { get; set; }
    public string? Phone { get; set; }
    public string? Company { get; set; }
    public string? JobTitle { get; set; }
    public string? Notes { get; set; }
    public List<string>? Tags { get; set; }
    public List<Guid>? GroupIds { get; set; }
}

