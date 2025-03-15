using Microsoft.AspNetCore.Mvc;
using server.Models;
using server.Services;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly AuthService _authService;

        public AuthController(AuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] User user)
        {
            var result = await _authService.Register(user);
            if (!result.Success)
                return BadRequest(new { message = result.Message });

            return Ok(new { message = "User registered successfully" });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] Models.LoginRequest request)
        {
            var (success, token, message) = await _authService.Login(request.Email, request.Password);

            if (!success)
            {
                Console.WriteLine($"Login failed: {message}");
                return Unauthorized(new { message });
            }

            Console.WriteLine("Login successful");
            return Ok(new { token, message });
        }
    }
}
