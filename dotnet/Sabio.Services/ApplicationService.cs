
using System.Data.SqlClient;
using System.Data;
using Models;
using Services;
using Sabio.Services.Interfaces;
using Sabio.Data.Providers;
using System.Collections.Generic;
using Sabio.Data;
using Sabio.Models.Requests.Applications;
using System;

namespace Services
{
    public class ApplicationService : IApplicationService
    {
        IDataProvider _data = null;
        public ApplicationService(IDataProvider data)
        {
            _data = data;
        }

        public List<Application> GetAllApplications()
        {
            List<Application> list = null;
            string procName = "dbo.Applications_SelectAll";

            _data.ExecuteCmd(procName, delegate (SqlParameterCollection paramCollection)
            {

            }, singleRecordMapper: delegate (IDataReader reader, short set)
            {
                int startingIdx = 0;
                Application app = MapSingleApplication(reader, ref startingIdx);
                if (list == null)
                {
                    list = new List<Application>();
                }
                list.Add(app);
            });
            return list;
        }

        public int Add(ApplicationAddRequest model)
        {
            int id = 0;
            string procName = "dbo.Applications_Insert";

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

        public void Update(ApplicationUpdateRequest model)
        {

            string procName = "dbo.Applications_Update";

            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {

                AddCommonParams(model, col);
                col.AddWithValue("@Id", model.Id);
                col.AddWithValue("@ReceivedCall", model.ReceivedCall);
                col.AddWithValue("@OfferedInterview", model.OfferedInterview);
                col.AddWithValue("@ReceivedOffer", model.ReceivedOffer);

            },
            returnParameters: null);
        }

        public void CloseApp(int id)
        {

            string procName = "dbo.Applications_Close";

            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {

                col.AddWithValue("@Id", id);

            },
            returnParameters: null);
        }

        private static Application MapSingleApplication(IDataReader reader, ref int startingIdx)
        {
            Application app = new Application();

            app.Id = reader.GetSafeInt32(startingIdx++);
            app.Company = reader.GetSafeString(startingIdx++);
            app.JobTitle = reader.GetSafeString(startingIdx++);
            app.Salary = reader.GetSafeString(startingIdx++);
            app.IsClosed = reader.GetSafeBool(startingIdx++);
            app.ReceivedCall = reader.GetSafeBool(startingIdx++);
            app.OfferedInterview = reader.GetSafeBool(startingIdx++);
            app.ReceivedOffer = reader.GetSafeBool(startingIdx++);
            app.Location = reader.GetSafeString(startingIdx++);
            app.OfferAmount = reader.GetSafeString(startingIdx++);
            app.DateCreated = reader.GetSafeDateTime(startingIdx++);
            app.DateModified = reader.GetSafeDateTime(startingIdx++);


            return app;
        }

        private static void AddCommonParams(ApplicationAddRequest model, SqlParameterCollection col)
        {
            col.AddWithValue("@Company", model.Company);
            col.AddWithValue("@JobTitle", model.JobTitle);
            col.AddWithValue("@Salary", model.Salary);
            col.AddWithValue("@Location", model.Location);
        }
    }
}