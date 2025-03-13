using BatchWebApiAuthentication.Context;
using BatchWebApiAuthentication.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using BatchWebApiAuthentication.ViewModels;

namespace BatchWebApiAuthentication.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        AppDbContext _context;
        IConfiguration _configuration;
        public AuthenticationController(AppDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }
        [HttpPost("login")]
        public IActionResult Login(LoginViewModel user)
        {
            IActionResult response = Unauthorized();

            var obj = _context.Users
                .FirstOrDefault(x => x.Email.ToLower() == user.Email.ToLower());

            if (obj == null || !BCrypt.Net.BCrypt.Verify(user.Password, obj.Password))
                return Unauthorized(new { message = "Invalid email or password" });

            var tokenString = GenerateJSONWebToken(obj);
            return Ok(new { token = tokenString });
        }



        private string GetRoleName(int roleId)
        {
            string roleName = (from x in _context.Roles
                               where x.RoleId == roleId
                               select x.RoleName).FirstOrDefault();
            return roleName;
        }

        private string GenerateJSONWebToken(User user)
        {
            string role = GetRoleName(user.RoleId);

            //List<Claim> claims = new List<Claim> {
            //     new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            //     new Claim(JwtRegisteredClaimNames.Sid, user.Id.ToString()),
            //     new Claim(JwtRegisteredClaimNames.Name, user.FirstName + " " + user.LastName),
            //     new Claim("Role", role.ToString()),
            //     new Claim(type:"Date", DateTime.Now.ToString())
            //};

            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),  // Fixed issue
                new Claim(JwtRegisteredClaimNames.Sid, user.Id.ToString()),
                new Claim(JwtRegisteredClaimNames.Name, $"{user.FirstName} {user.LastName}"),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Role, role),
                new Claim("DateOnly", DateTime.UtcNow.ToString("yyyy-MM-dd HH:mm:ss"))
            };


            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                _configuration["Jwt:Issuer"],
                _configuration["Jwt:Audience"],
                claims,
                expires: DateTime.UtcNow.AddHours(2),
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }


        //private string GenerateJSONWebToken(User user)
        //{
        //    var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
        //    var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

        //    var token = new JwtSecurityToken(_configuration["Jwt:Issuer"],
        //      _configuration["Jwt:Audience"],
        //      null,
        //      expires: DateTime.Now.AddMinutes(120),
        //      signingCredentials: credentials);
        //    return new JwtSecurityTokenHandler().WriteToken(token);

        //}
    }
}
