using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Models;

namespace server.Services
{
    public class EnrollmentService
    {
        private readonly AppDbContext _context;

        public EnrollmentService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<Enrollment>> GetUserEnrollments(int userId)
        {
            return await _context.Enrollments
                .Where(e => e.UserId == userId)
                .Include(e => e.Course) // Eager loading Course details
                .ToListAsync();
        }

        public async Task<(bool Success, string Message, Enrollment? Enrollment)> EnrollUser(Enrollment enrollment)
        {
            // Check if enrollment already exists
            bool exists = await _context.Enrollments.AnyAsync(e => e.UserId == enrollment.UserId && e.CourseId == enrollment.CourseId);
            if (exists)
                return (false, "User is already enrolled in this course.", null);

            _context.Enrollments.Add(enrollment);
            await _context.SaveChangesAsync();
            return (true, "User successfully enrolled.", enrollment);
        }

        public async Task<(bool Success, string Message)> Unenroll(int userId, int courseId)
        {
            var enrollment = await _context.Enrollments
                .FirstOrDefaultAsync(e => e.UserId == userId && e.CourseId == courseId);

            if (enrollment == null)
                return (false, "Enrollment not found.");

            _context.Enrollments.Remove(enrollment);
            await _context.SaveChangesAsync();
            return (true, "User successfully unenrolled.");
        }

    }
}
