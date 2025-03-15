//using Microsoft.AspNetCore.Authentication.JwtBearer;
//using Microsoft.IdentityModel.Tokens;
//using System.Text;

//namespace server.Middleware
//{
//    public static class AuthenticationMiddleware
//    {
//        public static void AddJwtAuthentication(this IServiceCollection services, IConfiguration configuration)
//        {
//            var jwtSettings = configuration.GetSection("JwtSettings");
//            var secretKey = jwtSettings["Key"];

//            if (string.IsNullOrEmpty(secretKey))
//                throw new ArgumentNullException("JWT Secret Key is missing in configuration!");

//            var key = Encoding.UTF8.GetBytes(secretKey);

//            services.AddAuthentication(options =>
//            {
//                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
//                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
//            })
//            .AddJwtBearer(options =>
//            {
//                options.RequireHttpsMetadata = true;
//                options.SaveToken = true;
//                options.TokenValidationParameters = new TokenValidationParameters
//                {
//                    ValidateIssuerSigningKey = true,
//                    IssuerSigningKey = new SymmetricSecurityKey(key),

//                    ValidateIssuer = true,
//                    ValidIssuer = jwtSettings["Issuer"],

//                    ValidateAudience = true,
//                    ValidAudience = jwtSettings["Audience"],

//                    ValidateLifetime = true,  // Ensure token expiration is checked
//                    ClockSkew = TimeSpan.Zero,  // Prevents default 5-minute expiration buffer

//                    RoleClaimType = "role" // If role-based authentication is used
//                };
//                options.Events = new JwtBearerEvents
//                {
//                    OnAuthenticationFailed = context =>
//                    {
//                        Console.WriteLine($"Authentication failed: {context.Exception.Message}");
//                        return Task.CompletedTask;
//                    },
//                    OnChallenge = context =>
//                    {
//                        Console.WriteLine("JWT validation failed: Unauthorized access.");
//                        return Task.CompletedTask;
//                    }
//                };
//            });

//            services.AddAuthorization();
//        }
//    }
//}
