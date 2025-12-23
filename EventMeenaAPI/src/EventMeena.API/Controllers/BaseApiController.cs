using System.Security.Claims;
using EventMeena.Application.DTOs.Common;
using Microsoft.AspNetCore.Mvc;

namespace EventMeena.API.Controllers;

/// <summary>
/// Base controller with common functionality
/// </summary>
[ApiController]
[Route("api/[controller]")]
public abstract class BaseApiController : ControllerBase
{
    /// <summary>
    /// Gets the current authenticated user's ID
    /// </summary>
    protected Guid CurrentUserId
    {
        get
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            return Guid.TryParse(userIdClaim, out var userId) ? userId : Guid.Empty;
        }
    }

    /// <summary>
    /// Gets the current authenticated user's email
    /// </summary>
    protected string? CurrentUserEmail => User.FindFirst(ClaimTypes.Email)?.Value;

    /// <summary>
    /// Returns a success response with data
    /// </summary>
    protected ActionResult<ApiResponse<T>> Success<T>(T data, string? message = null)
    {
        return Ok(ApiResponse<T>.SuccessResponse(data, message));
    }

    /// <summary>
    /// Returns a success response for created resource
    /// </summary>
    protected ActionResult<ApiResponse<T>> Created<T>(T data, string? message = null)
    {
        return StatusCode(StatusCodes.Status201Created, ApiResponse<T>.SuccessResponse(data, message));
    }

    /// <summary>
    /// Returns a not found response
    /// </summary>
    protected ActionResult<ApiResponse<T>> NotFoundResponse<T>(string message = "العنصر غير موجود")
    {
        return NotFound(ApiResponse<T>.FailureResponse(message));
    }

    /// <summary>
    /// Returns a bad request response
    /// </summary>
    protected ActionResult<ApiResponse<T>> BadRequestResponse<T>(string message)
    {
        return BadRequest(ApiResponse<T>.FailureResponse(message));
    }

    /// <summary>
    /// Returns an unauthorized response
    /// </summary>
    protected ActionResult<ApiResponse<T>> UnauthorizedResponse<T>(string message = "غير مصرح لك بالوصول")
    {
        return Unauthorized(ApiResponse<T>.FailureResponse(message));
    }

    /// <summary>
    /// Returns a server error response
    /// </summary>
    protected ActionResult<ApiResponse<T>> ServerErrorResponse<T>(string message = "حدث خطأ في الخادم")
    {
        return StatusCode(StatusCodes.Status500InternalServerError, ApiResponse<T>.FailureResponse(message));
    }

    /// <summary>
    /// Returns a success response without data
    /// </summary>
    protected ActionResult<ApiResponse> SuccessNoContent(string? message = null)
    {
        return Ok(ApiResponse.SuccessResponse(message));
    }

    /// <summary>
    /// Returns a not found response without data
    /// </summary>
    protected ActionResult<ApiResponse> NotFoundNoContent(string message = "العنصر غير موجود")
    {
        return NotFound(ApiResponse.FailureResponse(message));
    }

    /// <summary>
    /// Returns a bad request response without data
    /// </summary>
    protected ActionResult<ApiResponse> BadRequestNoContent(string message)
    {
        return BadRequest(ApiResponse.FailureResponse(message));
    }
}

