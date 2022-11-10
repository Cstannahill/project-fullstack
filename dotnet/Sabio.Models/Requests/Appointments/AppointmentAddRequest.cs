using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests.Appointments
{
    public class AppointmentAddRequest
    {
        public string Company { get; set; }
        public DateTime Date { get; set; }
        public string ContactName { get; set; }
        public string ContactMethod { get; set; }
    }
}
