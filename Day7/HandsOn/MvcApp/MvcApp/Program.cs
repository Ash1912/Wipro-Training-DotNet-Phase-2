namespace MvcApp
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.
            builder.Services.AddControllersWithViews(); //Added MVC Services

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (!app.Environment.IsDevelopment())
            {
                app.UseExceptionHandler("/Home/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();

            //Middleware Setup
            app.UseRouting();

            app.UseAuthorization();

            // Default Route Configuration
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller=First}/{action=Index1}/{id?}");
            });

            app.Use(async (context, next) =>
            {
                if (context.Request.Path.ToString().Contains("/end"))
                {
                    await context.Response.WriteAsync("Terminating request at /end");
                    return; // Terminate the request chain
                }
                await next();
            });

            app.Use(async (context, next) =>
            {
                if (context.Request.Path.ToString().Contains("hello"))
                {
                    await context.Response.WriteAsync("Hello from middleware! ");
                }
                await next();
            });

            app.Use(async (context, next) =>
            {
                await context.Response.WriteAsync("Hello1 ");
                await next();
                await context.Response.WriteAsync("Hello2 ");
            });


            app.Run();
        }
    }
}
