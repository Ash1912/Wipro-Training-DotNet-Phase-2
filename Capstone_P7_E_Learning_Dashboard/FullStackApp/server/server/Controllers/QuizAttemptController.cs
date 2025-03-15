using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Models;
using server.Services;

namespace server.Controllers
{
    [Route("api/quiz-attempts")]
    [ApiController]
    [Authorize]
    public class QuizAttemptController : ControllerBase
    {
        private readonly QuizAttemptService _quizAttemptService;

        public QuizAttemptController(QuizAttemptService quizAttemptService)
        {
            _quizAttemptService = quizAttemptService;
        }

        [HttpGet("{userId}")]
        public async Task<IActionResult> GetUserQuizAttempts(int userId)
        {
            var attempts = await _quizAttemptService.GetUserQuizAttempts(userId);

            if (attempts == null || attempts.Count == 0)
                return NotFound("No quiz attempts found for this user.");

            return Ok(attempts);
        }

        [HttpPost]
        public async Task<IActionResult> SubmitQuizAttempt([FromBody] QuizAttempt attempt)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var (success, message, createdAttempt) = await _quizAttemptService.SubmitQuizAttempt(attempt);

            if (!success)
                return BadRequest(message);

            return CreatedAtAction(nameof(GetUserQuizAttempts), new { userId = createdAttempt.UserId }, createdAttempt);
        }
    }
}
