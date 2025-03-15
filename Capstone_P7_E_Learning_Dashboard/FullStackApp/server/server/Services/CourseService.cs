using server.Models;
using server.Data;
using Microsoft.EntityFrameworkCore;

namespace server.Services
{
    public class CourseService
    {
        private readonly AppDbContext _context;

        public CourseService(AppDbContext context)
        {
            _context = context;
        }

        // ✅ Get all courses  
        public async Task<List<Course>> GetAllCourses()
        {
            return await _context.Courses.ToListAsync();
        }

        // ✅ Get a course by ID  
        public async Task<Course?> GetCourseById(int id)
        {
            return await _context.Courses.FindAsync(id);
        }

        // ✅ Create a new course  
        public async Task<Course> CreateCourse(Course course)
        {
            _context.Courses.Add(course);
            await _context.SaveChangesAsync();
            return course;
        }

        // ✅ Update a course  
        public async Task<Course?> UpdateCourse(int id, Course course)
        {
            var existingCourse = await _context.Courses.FindAsync(id);
            if (existingCourse == null) return null;

            existingCourse.Title = course.Title;
            existingCourse.Description = course.Description;

            await _context.SaveChangesAsync();
            return existingCourse;
        }

        // ✅ Delete a course  
        public async Task<bool> DeleteCourse(int id)
        {
            var course = await _context.Courses.FindAsync(id);
            if (course == null) return false;

            _context.Courses.Remove(course);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
