using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Services;
using server.Middleware;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace server
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
            var configuration = builder.Configuration;

            // 🔹 Ensure connection string is configured
            var connectionString = configuration.GetConnectionString("DefaultConnection") ??
                throw new InvalidOperationException("Database connection string is missing!");

            // 🔹 Database Connection
            builder.Services.AddDbContext<AppDbContext>(options =>
                options.UseSqlServer(connectionString));

            // 🔹 Register Services
            builder.Services.AddScoped<AuthService>();

            builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)

.AddJwtBearer(options =>

{

    options.TokenValidationParameters = new TokenValidationParameters

    {

        ValidateIssuer = true,

        ValidateAudience = true,

        ValidateLifetime = true,

        ValidateIssuerSigningKey = true,

        ValidIssuer = builder.Configuration["JwtSettings:Issuer"],

        ValidAudience = builder.Configuration["JwtSettings:Audience"],

        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["JwtSettings:Key"]))

    };



});

            // 🔹 Middleware Configurations
            builder.Services.AddCorsPolicy();
            //builder.Services.AddJwtAuthentication(configuration);
            builder.Services.AddSwaggerWithJwt();

            // 🔹 Add Controllers with JSON Formatting
            builder.Services.AddControllers().AddJsonOptions(options =>
            {
                options.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.Preserve;
                options.JsonSerializerOptions.WriteIndented = true;
            });

            var app = builder.Build();

            // 🔹 Middleware Execution Order
            app.UseExceptionHandling(); // Handles exceptions early
            app.UseCorsPolicy();
            app.UseHttpsRedirection();

            app.UseAuthentication();
            app.UseAuthorization();

            // 🔹 Enable Swagger **only in development**
            if (app.Environment.IsDevelopment())
            {
                app.UseSwaggerUIConfig(app.Environment);
            }

            app.MapControllers();
            app.Run();
        }
    }
}
