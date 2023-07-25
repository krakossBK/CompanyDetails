using CompanyDetails.Models;
using Microsoft.EntityFrameworkCore;
using CompanyDetails.Repositories;
using CompanyDetails.Interfaces;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();

// получаем строку подключения из файла конфигурации
var connection = builder.Configuration.GetConnectionString("connection");

// добавляем контекст ApplicationContext в качестве сервиса в приложение
builder.Services.AddDbContext<CompanyContext>(option => option.UseNpgsql(connection));


#region Репозитории
builder.Services.AddTransient<ILogRepository, LogRepository>();
builder.Services.AddTransient<ICompanyRepository, CompanyRepository>();
builder.Services.AddTransient<IEmployeeRepository, EmployeeRepository>();
#endregion


// Add framework services.
builder.Services.AddMvc().AddControllersAsServices();// <---- Super important

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

app.UseRouting();

app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();
