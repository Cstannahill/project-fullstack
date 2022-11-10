using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Domain.Appointments
{
    public class Appointment
    {
        public int Id { get; set; }
        public string Company { get; set; }
        public DateTime Date { get; set; }
        public string ContactName { get; set; }
        public string ContactMethod { get; set; }
    }
}
