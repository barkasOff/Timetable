using API.Extensions;
using API.Middleware;
using Application.Subjects;
using FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace API
{
  public class Startup
  {
    private readonly IConfiguration _config;

    public Startup(IConfiguration config) =>
        _config = config;

    public void ConfigureServices(IServiceCollection services)
    {
      services.AddControllers().AddFluentValidation(config => config.RegisterValidatorsFromAssemblyContaining<Create>());
      services.AddApplicationServices(_config);
    }

    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
      app.UseMiddleware<ExtentionMiddleware>();
      app.UseRouting();
      app.UseCors("CorsPolicy");
      app.UseAuthorization();
      app.UseEndpoints(endpoints => endpoints.MapControllers());
    }
  }
}
