using AutoMapper;
using AutoMapper.Configuration;
using Happnin.Business;
using Happnin.Business.Services;
using Happnin.Data;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace Happnin.Api
{
    public class Startup
    {
        //public Startup(IConfiguration configuration)
        //{
        //    Configuration = configuration;
        //}

        public IConfiguration Configuration { get; }
        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            var sqliteConnection = new SqliteConnection("DataSource=Happnin.db");

            services.AddDbContext<AppDbContext>(options =>
                options.EnableSensitiveDataLogging()
                    .UseSqlite(sqliteConnection));

            services.AddIdentity<User, IdentityRole>()
                .AddEntityFrameworkStores<AppDbContext>();
            
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IEventService, EventService>();
            services.AddScoped<ILocationService, LocationService>();
            services.AddScoped<ICategoryService, CategoryService>();

            services.AddAutoMapper(new [] { typeof(AutomapperProfileConfiguration).Assembly});

            services.AddMvc(options => options.EnableEndpointRouting = false);
            services.AddSwaggerDocument();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseAuthentication();
            app.UseOpenApi();
            app.UseSwaggerUi3();
            app.UseMvc();
        }
    }
}
