using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using QuickApplyBackend.Database_Context;
using QuickApplyBackend.Model;
using QuickApplyBackend.Service;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();   //dependcy needed so we can use MapController()

builder.Services.AddScoped<SavedJobService, SavedJobService>();  //needed to make dependecy injection works
builder.Services.AddScoped<AppliedJobService, AppliedJobService>();
builder.Services.AddScoped<JobReferenceService, JobReferenceService>();
builder.Services.AddScoped<SignInService, SignInService>();

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8
            .GetBytes(builder.Configuration.GetSection("AppSettings:Token").Value)),
            ValidateIssuer = false,
            ValidateAudience = false
        };
    });

builder.Services.AddDbContext<QuickApplyContext>(option =>
    option.UseNpgsql(builder.Configuration.GetConnectionString("PostgresConnectionString"
)));

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin", policy =>
    {
        policy.WithOrigins("http://localhost:3000")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseCors("AllowSpecificOrigin");

app.UseHttpsRedirection();

app.UseRouting();

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();   //important so we can add controllers and inject in the controller classes

app.Run();

