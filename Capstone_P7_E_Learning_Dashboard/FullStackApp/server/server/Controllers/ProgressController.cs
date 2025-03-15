using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Models;
using server.Services;

namespace server.Controllers
{
    [Route("api/progress")]
    [ApiController]
    public class ProgressController : ControllerBase
    {
        private readonly ProgressService _progressService;

        public ProgressController(ProgressService progressService)
        {
            _progressService = progressService;
        }

        [HttpGet("{userId}")]
        public async Task<IActionResult> GetUserProgress(int userId)
        {
            var progressRecords = await _progressService.GetUserProgress(userId);

            if (progressRecords == null || progressRecords.Count == 0)
                return NotFound("No progress records found for this user.");

            return Ok(progressRecords);
        }

        [HttpPut]
        public async Task<IActionResult> UpdateProgress([FromBody] Progress progress)
        {
            if (progress.UserId <= 0 || progress.CourseId <= 0)
                return BadRequest("Invalid User ID or Course ID.");

            var (success, message, updatedProgress) = await _progressService.UpdateProgress(progress);

            if (!success)
                return BadRequest(message);

            return Ok(updatedProgress);
        }
    }
}
