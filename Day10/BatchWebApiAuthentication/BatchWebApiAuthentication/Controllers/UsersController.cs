using BatchWebApiAuthentication.Context;
using BatchWebApiAuthentication.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BatchWebApiAuthentication.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly AppDbContext _context;

        public UsersController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            try
            {
                var users = await _context.Users.ToListAsync();
                Console.WriteLine($"Fetched {users.Count} users from the database.");
                return Ok(users);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error in GetUsers: {ex.Message} \n StackTrace: {ex.StackTrace}");
                return StatusCode(500, $"Internal Server Error: {ex.Message}");
            }
        }



        // GET: api/Users/5
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            var user = await
                _context.Users.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        // PUT: api/Users/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser(int id, User user)
        {
            if (id != user.Id)
            {
                return BadRequest(new { message = "User ID mismatch" });
            }

            var existingUser = await _context.Users.FindAsync(id);
            if (existingUser == null)
            {
                return NotFound(new { message = "User not found" });
            }

            // Preserve the existing password if no new password is provided
            if (string.IsNullOrWhiteSpace(user.Password))
            {
                user.Password = existingUser.Password; // Retain old hashed password
            }
            else
            {
                // Hash the new password before updating
                user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);
            }

            _context.Entry(existingUser).CurrentValues.SetValues(user);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                return Conflict(new { message = "Concurrency error" });
            }

            return NoContent();
        }

        // POST: api/Users
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<User>> PostUser(User user)
        {
            try
            {
                Console.WriteLine($"Received User: {user.Email}, {user.FirstName}, {user.LastName}");

                // Validate Role
                var role = await _context.Roles.FindAsync(user.RoleId);
                if (role == null)
                {
                    return BadRequest(new { message = "Invalid RoleId. Role does not exist." });
                }

                // Hash Password
                user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);

                _context.Users.Add(user);
                await _context.SaveChangesAsync();

                return CreatedAtAction(nameof(GetUser), new { id = user.Id }, user);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error in PostUser: {ex.Message} \n StackTrace: {ex.StackTrace}");
                return StatusCode(500, $"Internal Server Error: {ex.Message}");
            }
        }

        // DELETE: api/Users/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound(new { message = "User not found" });
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UserExists(int id)
        {
            return _context.Users.Any(e => e.Id == id);
        }
    }
}
