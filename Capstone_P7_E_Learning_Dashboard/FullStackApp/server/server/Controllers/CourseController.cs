using Microsoft.AspNetCore.Mvc;
using server.Models;
using server.Services;
using Microsoft.AspNetCore.Authorization;

namespace server.Controllers
{
    [Route("api/courses")]
    [ApiController]  
    public class CourseController : ControllerBase
    {
        private readonly CourseService _courseService;

        public CourseController(CourseService courseService)
        {
            _courseService = courseService;
        }

        [HttpGet]
        [Authorize]
        public async Task<ActionResult<List<Course>>> GetAllCourses()
        {
            return await _courseService.GetAllCourses();
        }

        [HttpGet("{id}")]
        [Authorize]
        public async Task<ActionResult<Course>> GetCourseById(int id)
        {
            var course = await _courseService.GetCourseById(id);
            if (course == null)
                return NotFound();
            return course;
        }

        [HttpPost]
        [Authorize(Roles = "Admin")] // 🔒 Only Admin can create courses  
        public async Task<ActionResult<Course>> CreateCourse([FromBody] Course course)
        {
            var createdCourse = await _courseService.CreateCourse(course);
            return CreatedAtAction(nameof(GetCourseById), new { id = createdCourse.CourseId }, createdCourse);
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")] // 🔒 Only Admin can update courses  
        public async Task<IActionResult> UpdateCourse(int id, [FromBody] Course course)
        {
            var updatedCourse = await _courseService.UpdateCourse(id, course);
            if (updatedCourse == null)
                return NotFound();
            return Ok(updatedCourse);
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")] // 🔒 Only Admin can delete courses  
        public async Task<IActionResult> DeleteCourse(int id)
        {
            var deleted = await _courseService.DeleteCourse(id);
            if (!deleted)
                return NotFound();
            return NoContent();
        }
    }
}
