using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;
using SignalRSample.Data;
using SignalRSample.Hubs;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(connectionString));
builder.Services.AddDatabaseDeveloperPageExceptionFilter();

builder.Services.AddDefaultIdentity<IdentityUser>(options => options.SignIn.RequireConfirmedAccount = true)
    .AddEntityFrameworkStores<ApplicationDbContext>();
builder.Services.AddControllersWithViews();

/*var azureSignalRConnectionString = "Endpoint=https://signalrproj.service.signalr.net;AccessKey=PYdFPgHsb7zBLcJ3Q0U0XdZXll0Msf7OtngHnOKIUsg=;Version=1.0;";

// use Azure signalR
builder.Services.AddSignalR().AddAzureSignalR(azureSignalRConnectionString);*/

// using defaul signalR
builder.Services.AddSignalR();


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseMigrationsEndPoint();
}
else
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");
app.MapRazorPages();


// Hubs
app.MapHub<UserHub>("/hubs/userCount");
app.MapHub<DeathlyHallowHub>("/hubs/deathlyhallows");
app.MapHub<HouseGroupHub>("/hubs/houseGroup");
app.MapHub<NotificationHub>("/hubs/notification");
app.MapHub<ChatHub>("/hubs/chat");
app.MapHub<OrderHub>("/hubs/order");

app.Run();
