using Sabio.Models.Domain.Appointments;
using Sabio.Models.Requests.Appointments;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Services.Interfaces
{
    public interface IAppointmentService
    {
        public int AddAppointment(AppointmentAddRequest model);

        public List<Appointment> GetAppointmentsByWeek();
    }
}
