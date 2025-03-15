using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Models;
using server.Services;

namespace server.Controllers
{
    [Route("api/quizzes")]
    [ApiController]
    [Authorize]
    public class QuizController : ControllerBase
    {
        private readonly QuizService _quizService;

        public QuizController(QuizService quizService)
        {
            _quizService = quizService;
        }

        [HttpGet("{courseId}")]
        public async Task<IActionResult> GetCourseQuizzes(int courseId)
        {
            var quizzes = await _quizService.GetCourseQuizzes(courseId);

            if (quizzes == null || quizzes.Count == 0)
                return NotFound("No quizzes found for this course.");

            return Ok(quizzes);
        }

        [HttpPost]
        public async Task<IActionResult> AddQuiz([FromBody] Quiz quiz)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var (success, message, createdQuiz) = await _quizService.AddQuiz(quiz);

            if (!success)
                return BadRequest(message);

            return CreatedAtAction(nameof(GetCourseQuizzes), new { courseId = createdQuiz.CourseId }, createdQuiz);
        }
    }
}
