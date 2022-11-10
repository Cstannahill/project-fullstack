using Microsoft.Extensions.Options;
using Sabio.Models.Domain.AppKeys;
using Sabio.Services.Interfaces;
using SendGrid;
using SendGrid.Helpers.Mail;
using System.IO;



using System.Threading.Tasks;

namespace Sabio.Services
{
    //public class EmailService : IEmailService
    //{
    //    private static AppKeys _appKeys;
    //    private IWebHostEnvironment _hostEnvironment;

    //    public EmailService(
    //        IOptions<AppKeys> AppKeys,
    //        IWebHostEnvironment environment
    //    )
    //    {
    //        _appKeys = AppKeys.Value;
    //        _hostEnvironment = environment;
    //    }

    //    public async void Confirm(string email, string token)
    //    {
    //        string path =
    //            $"{_hostEnvironment}/EmailTemplates/VerifyEmail.html";
    //        string tokenLink =
    //            $"{_appKeys.DomainName}confirm?token={token}?email={email}";

    //        SendGridMessage msg =
    //            new SendGridMessage()
    //            {
    //                From = new EmailAddress(_appKeys.DomainEmail, "CDev"),
    //                Subject = "Please confirm your email",
    //                PlainTextContent = "Please confirm your email",
    //                HtmlContent =
    //                    File
    //                        .ReadAllText(path)
    //                        .Replace("{{tokenLink}}", tokenLink)
    //            };
    //        msg.AddTo(new EmailAddress(email, "Welcome"));
    //        await SendEmail(msg);
    //    }

    //    public async void ForgotPassword(string email, string token)
    //    {
    //        string path = $"{_hostEnvironment.WebRootPath}/EmailTemplates/ForgotPassword.html";


    //        string tokenLink = $"{_appKeys.DomainName}changepassword?token={token}";


    //        SendGridMessage msg = new SendGridMessage()
    //        {
    //            From = new EmailAddress(_appKeys.DomainEmail, "Carte"),
    //            Subject = "Forgot Your Password?",
    //            PlainTextContent = "Please reset your password!",
    //            HtmlContent = File
    //                        .ReadAllText(path)
    //                        .Replace("{{tokenLink}}", tokenLink)
    //        };
    //        msg.AddTo(new EmailAddress(email));
    //        await SendEmail(msg);
    //    }

    //    private async Task SendEmail(SendGridMessage msg)
    //    {
    //        string apiKey = _appKeys.SendGridAppKey;
    //        var client = new SendGridClient(apiKey);
    //        var response = await client.SendEmailAsync(msg);
    //    }
    //}
}
