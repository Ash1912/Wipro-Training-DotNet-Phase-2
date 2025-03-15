using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Models;

namespace server.Services
{
    public class QuizAttemptService
    {
        private readonly AppDbContext _context;

        public QuizAttemptService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<QuizAttempt>> GetUserQuizAttempts(int userId)
        {
            return await _context.QuizAttempts
                .Where(a => a.UserId == userId)
                .Include(a => a.Quiz)
                .ToListAsync();
        }

        public async Task<(bool Success, string Message, QuizAttempt? Attempt)> SubmitQuizAttempt(QuizAttempt attempt)
        {
            if (attempt.UserId <= 0 || attempt.QuizId <= 0 || attempt.Score < 0 || attempt.Score > 100)
                return (false, "Invalid attempt details.", null);

            var quizExists = await _context.Quizzes.AnyAsync(q => q.QuizId == attempt.QuizId);
            if (!quizExists)
                return (false, "Quiz not found.", null);

            _context.QuizAttempts.Add(attempt);
            await _context.SaveChangesAsync();
            return (true, "Quiz attempt recorded.", attempt);
        }
    }
}