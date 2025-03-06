using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace NetCoreWebAppDemo
{
    public class Program
    {
        public static void Main(string[] args)
        {
            //will create local server // kestrel server, cross platform server
            var builder = WebApplication.CreateBuilder(args);
            var app = builder.Build();

            // this is inbuilt middleware that allows to execute static contents
            // from wwwroot folder
            app.UseStaticFiles();

            // middleware >

            // middleware > piece of some logic that has to be executed
            // we create middleware 
            // 1. use   > allows to run the middleware, also calls next middleware in chain
            // 2. run   > terminate the application pipeline chain
            // 3. map

            //app.Map("/a", x => x.Response.WriteAsync("B"));
            app.Use(async (context, next) =>
            {
                await context.Response.WriteAsync("hello1 from use ");
                await next();
            });

            app.Use(async (context, next) =>
            {
                await context.Response.WriteAsync("hello2 from use ");
                await next();
            });
            app.Map("/a", x => x.Response.WriteAsync("B"));
            app.Map("/newbranch", a => {
                a.Map("/branch1", brancha => brancha
                    .Run(c => c.Response.WriteAsync("Running from the newbranch/branch1 branch!")));
                a.Map("/branch2", brancha => brancha
                    .Run(c => c.Response.WriteAsync("Running from the newbranch/branch2 branch!")));

                a.Run(c => c.Response.WriteAsync("Running from the newbranch branch!"));
            });


            //app.Run(async context =>
            //{
            //    await context.Response.WriteAsync("Hello1");
            //});
            //app.Run(async context =>
            //{
            //    await context.Response.WriteAsync("Hello2");
            //});

            app.MapGet("/", () => "Hello!");

            app.Run();
        }
    }
}