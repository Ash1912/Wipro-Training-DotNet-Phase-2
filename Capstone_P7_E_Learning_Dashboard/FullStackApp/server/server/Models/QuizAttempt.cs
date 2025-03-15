using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace server.Models
{
    public class QuizAttempt
    {
        [Key]
        public int AttemptId { get; set; }

        [Required]
        public int UserId { get; set; }

        [Required]
        public int QuizId { get; set; }

        [Required]
        public DateTime AttemptDate { get; set; } = DateTime.UtcNow;

        [Required]
        [Range(0, 100, ErrorMessage = "Score must be between 0 and 100.")]
        public int Score { get; set; }

        [ForeignKey("UserId")]
        public User User { get; set; }

        [ForeignKey("QuizId")]
        public Quiz Quiz { get; set; }
    }
}
