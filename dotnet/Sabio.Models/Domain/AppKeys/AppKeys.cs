using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Domain.AppKeys
{
    public class AppKeys
    {
        public string StripeConfigurationApiKey { get; set; }
        public string Domain { get; set; }
        public string DomainName { get; set; }
        public string DomainEmail { get; set; }
        public string SendGridAppKey { get; set; }

    }
}
