using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;

namespace ExpenseTrackerRestAPI
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateHostBuilder(args).Build().Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.ConfigureKestrel(serverOptions =>
                        {
                            serverOptions.Limits.MinRequestBodyDataRate =
                                new MinDataRate(bytesPerSecond: 100, gracePeriod: TimeSpan.FromSeconds(10));
                        })
                        .UseStartup<Startup>();
                    
                    webBuilder.UseUrls("http://0.0.0.0:5000");
                });
    }
}
