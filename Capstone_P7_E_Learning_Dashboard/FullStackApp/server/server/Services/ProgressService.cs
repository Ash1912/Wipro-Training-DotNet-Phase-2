using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Models;

namespace server.Services
{
    public class ProgressService
    {
        private readonly AppDbContext _context;

        public ProgressService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<Progress>> GetUserProgress(int userId)
        {
            return await _context.Progresses
                .Where(p => p.UserId == userId)
                .Include(p => p.Course) // Eager loading Course details
                .ToListAsync();
        }

        public async Task<(bool Success, string Message, Progress? Progress)> UpdateProgress(Progress progress)
        {
            var existingProgress = await _context.Progresses
                .FirstOrDefaultAsync(p => p.UserId == progress.UserId && p.CourseId == progress.CourseId);

            if (existingProgress == null)
                return (false, "Progress record not found.", null);

            if (progress.CompletionPercentage < 0 || progress.CompletionPercentage > 100)
                return (false, "Completion percentage must be between 0 and 100.", null);

            existingProgress.CompletionPercentage = progress.CompletionPercentage;
            await _context.SaveChangesAsync();

            return (true, "Progress updated successfully.", existingProgress);
        }
    }
}
