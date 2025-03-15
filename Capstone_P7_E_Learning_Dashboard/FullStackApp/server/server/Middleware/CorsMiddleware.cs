namespace server.Middleware
{
    public static class CorsMiddleware
    {
        public static void AddCorsPolicy(this IServiceCollection services)
        {
            services.AddCors(options =>
            {
                options.AddPolicy("AllowAll",
                    policy => policy.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
            });
        }

        public static void UseCorsPolicy(this IApplicationBuilder app)
        {
            app.UseCors("AllowAll");
        }
    }
}
