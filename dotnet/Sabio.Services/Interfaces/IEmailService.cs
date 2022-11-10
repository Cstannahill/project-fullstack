using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Services.Interfaces
{
    public interface IEmailService
    {
        void Confirm(string email, string token);
        void ForgotPassword(string email, string token);
    }
}
