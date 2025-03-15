using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Models;

namespace server.Services
{
    public class QuizService
    {
        private readonly AppDbContext _context;

        public QuizService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<Quiz>> GetCourseQuizzes(int courseId)
        {
            return await _context.Quizzes
                .Where(q => q.CourseId == courseId)
                .Include(q => q.Course)
                .ToListAsync();
        }

        public async Task<(bool Success, string Message, Quiz? Quiz)> AddQuiz(Quiz quiz)
        {
            if (string.IsNullOrWhiteSpace(quiz.Title) || quiz.CourseId <= 0)
                return (false, "Invalid quiz details.", null);

            var courseExists = await _context.Courses.AnyAsync(c => c.CourseId == quiz.CourseId);
            if (!courseExists)
                return (false, "Course not found.", null);

            _context.Quizzes.Add(quiz);
            await _context.SaveChangesAsync();
            return (true, "Quiz created successfully.", quiz);
        }
    }
}
