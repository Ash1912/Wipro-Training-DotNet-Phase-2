using System.ComponentModel.DataAnnotations;

namespace server.Models
{
    public class Course
    {
        [Key]
        public int CourseId { get; set; }

        [Required]
        public string Title { get; set; }

        public string Description { get; set; }

        // Add this navigation property
        public List<Enrollment> Enrollments { get; set; } = new List<Enrollment>();
    }
}
