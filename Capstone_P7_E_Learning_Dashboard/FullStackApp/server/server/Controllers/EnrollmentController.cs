using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Models;
using server.Services;

namespace server.Controllers
{
    [Route("api/enrollments")]
    [ApiController]
    public class EnrollmentController : ControllerBase
    {
        private readonly EnrollmentService _enrollmentService;

        public EnrollmentController(EnrollmentService enrollmentService)
        {
            _enrollmentService = enrollmentService;
        }

        [HttpGet("{userId}")]
        public async Task<IActionResult> GetUserEnrollments(int userId)
        {
            var enrollments = await _enrollmentService.GetUserEnrollments(userId);
            if (enrollments == null || enrollments.Count == 0)
                return NotFound("No enrollments found for this user.");
            return Ok(enrollments);
        }

        [HttpPost]
        public async Task<IActionResult> EnrollUser([FromBody] Enrollment enrollment)
        {
            if (enrollment.UserId <= 0 || enrollment.CourseId <= 0)
                return BadRequest("Invalid User ID or Course ID.");

            var (success, message, createdEnrollment) = await _enrollmentService.EnrollUser(enrollment);

            if (!success)
                return BadRequest(message);

            return CreatedAtAction(nameof(GetUserEnrollments), new { userId = createdEnrollment.UserId }, createdEnrollment);
        }

        [HttpDelete("{userId}/{courseId}")]
        public async Task<IActionResult> Unenroll(int userId, int courseId)
        {
            var (success, message) = await _enrollmentService.Unenroll(userId, courseId);

            if (!success)
                return NotFound(message);

            return NoContent();
        }

    }
}
