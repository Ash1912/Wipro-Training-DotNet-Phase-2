using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using server.Data;
using server.Models;

namespace server.Services
{
    public class AuthService
    {
        private readonly AppDbContext _context;
        private readonly IConfiguration _configuration;
        private readonly string _jwtSecret;
        private readonly string _jwtIssuer;
        private readonly string _jwtAudience;

        public AuthService(AppDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;

            _jwtSecret = _configuration["JwtSettings:Key"];
            _jwtIssuer = _configuration["JwtSettings:Issuer"];
            _jwtAudience = _configuration["JwtSettings:Audience"];

            if (string.IsNullOrEmpty(_jwtSecret))
            {
                throw new ArgumentNullException(nameof(_jwtSecret), "JWT Secret is missing. Check appsettings.json.");
            }

            Console.WriteLine($"JWT Secret Loaded: {_jwtSecret}");
        }

        public async Task<(bool Success, string Message)> Register(User user)
        {
            var existingUser = await _context.Users.FirstOrDefaultAsync(u => u.Email == user.Email);
            if (existingUser != null)
                return (false, "Email already exists");

            user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return (true, "User registered successfully");
        }

        public async Task<(bool Success, string Token, string Message)> Login(string email, string password)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);

            if (user == null)
            {
                Console.WriteLine("User not found");
                return (false, null, "Invalid email or password");
            }

            Console.WriteLine($"Stored Password Hash: {user.Password}");

            if (!BCrypt.Net.BCrypt.Verify(password, user.Password))
            {
                Console.WriteLine("Password verification failed");
                return (false, null, "Invalid email or password");
            }

            Console.WriteLine("Login successful");

            string token = GenerateJwtToken(user);
            user.Token = token;
            //await _context.SaveChangesAsync();

            return (true, token, "Login successful");
        }

        private string GenerateJwtToken(User user)
        {
            if (string.IsNullOrEmpty(_jwtSecret))
            {
                throw new ArgumentNullException(nameof(_jwtSecret), "JWT Secret is missing.");
            }

            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(JwtRegisteredClaimNames.Sid, user.Id.ToString()),
                new Claim(JwtRegisteredClaimNames.Name, $"{user.FirstName} {user.LastName}"),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Role, user.RoleId.ToString()),
                new Claim("DateOnly", DateTime.UtcNow.ToString("yyyy-MM-dd HH:mm:ss"))
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtSecret));
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                _jwtIssuer,
                _jwtAudience,
                claims,
                expires: DateTime.UtcNow.AddHours(2),
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
