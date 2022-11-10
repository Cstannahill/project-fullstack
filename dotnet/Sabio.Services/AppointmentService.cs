using Sabio.Data.Providers;
using Sabio.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Sabio.Models.Domain.Appointments;
using Sabio.Data;
using Sabio.Models.Requests.Applications;
using Sabio.Models.Requests.Appointments;

namespace Sabio.Services
{
    public class AppointmentService : IAppointmentService
    {
        IDataProvider _data = null;
        public AppointmentService(IDataProvider data)
        {
            _data = data;
        }

        public List<Appointment> GetAppointmentsByWeek()
        {
            List<Appointment> list = null;
            string procName = "dbo.Appointments_SelectAll";

            _data.ExecuteCmd(procName, delegate (SqlParameterCollection paramCollection)
            {

            }, singleRecordMapper: delegate (IDataReader reader, short set)
            {
                int startingIdx = 0;
                Appointment app = MapSingleAppointment(reader, ref startingIdx);
                if (list == null)
                {
                    list = new List<Appointment>();
                }
                list.Add(app);
            });
            return list;
        }

        public int AddAppointment(AppointmentAddRequest model)
        {
            int id = 0;
            string procName = "dbo.Appointments_Insert";

            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {

                AddCommonParams(model, col);
                SqlParameter idOut = new SqlParameter("@Id", SqlDbType.Int);
                idOut.Direction = ParameterDirection.Output;
                col.Add(idOut);
            },
            returnParameters: delegate (SqlParameterCollection returnCollection)
            {
                object oId = returnCollection["@Id"].Value;
                int.TryParse(oId.ToString(), out id);
            });
            return id;
        }

        private static void AddCommonParams(AppointmentAddRequest model, SqlParameterCollection col)
        {
            col.AddWithValue("@Company", model.Company);
            col.AddWithValue("@Date", model.Date);
            col.AddWithValue("@ContactName", model.ContactName);
            col.AddWithValue("@ContactMethod", model.ContactMethod);
        }
        private static Appointment MapSingleAppointment(IDataReader reader, ref int startingIdx)
        {
            Appointment appointment = new Appointment();

            appointment.Id = reader.GetSafeInt32(startingIdx++);
            appointment.Company = reader.GetSafeString(startingIdx++);
            appointment.Date = reader.GetSafeDateTime(startingIdx++);
            appointment.ContactName = reader.GetSafeString(startingIdx++);
            appointment.ContactMethod = reader.GetSafeString(startingIdx++);

            return appointment;
        }
    }
}
