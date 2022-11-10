using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests.StripeTransaction
{
    public class StripeTransactionAddRequest
    {
       public string SessionId { get; set; }
       public string PaymentStatus { get; set; }
       public string PaymentIntentId { get; set; }
       public string CustomerEmail { get; set; }
       public string CustomerName { get; set; }
       public string Currency { get; set; }
       public double PaymentAmount { get; set; }
    }
}
