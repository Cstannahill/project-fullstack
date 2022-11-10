using Sabio.Data.Providers;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Sabio.Data;
using System.Net;
using System.Security.Cryptography.X509Certificates;
using Sabio.Models.Domain.Addresses;
using Sabio.Models.Requests.Addresses;


namespace Sabio.Services
{
    public class AddressService : IAddressService
    {
        IDataProvider _data = null;
        public AddressService(IDataProvider data)
        {

            _data = data;

        }

        public void Update(AddressUpdateRequest request)
        {
            string procName = "[dbo].[Sabio_Addresses_Update]";
            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
                {

                    AddCommonParams(request, col);
                    col.AddWithValue("@Id", request.Id);

                },
                returnParameters: null);
        }

        public int Add(AddressAddRequest request, int userId)
        {
            int id = 0;

            string procName = "[dbo].[Sabio_Addresses_Insert]";
            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                AddCommonParams(request, col);

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

        public void Delete(int id)
        {
            string procName = "[dbo].[Sabio_Addresses_DeleteById]";

            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@Id", id);

            },
            returnParameters: null);
        }

        public Address Get(int id)
        {
            string procName = "[dbo].[Sabio_Addresses_SelectById]";

            Address address = null;

            _data.ExecuteCmd(procName, delegate (SqlParameterCollection paramCollection)
            {


                paramCollection.AddWithValue("@Id", id);

            }, delegate (IDataReader reader, short set) //single record Mapper 
            { //reader from DB  >>> Address

                address = MapSingleAddress(reader);
            }
            );

            return address;
        }

        public List<Address> GetRandomAddresses()
        {

            List<Address> list = null;
            string procName = "[dbo].[Sabio_Addresses_SelectRandom50]";
            _data.ExecuteCmd(procName, inputParamMapper: null
            , singleRecordMapper: delegate (IDataReader reader, short set)
            {
                Address address = MapSingleAddress(reader);

                if (list == null)
                {
                    list = new List<Address>();
                }

                list.Add(address);
            });




            return list;
        }

        private static void AddCommonParams(AddressAddRequest request, SqlParameterCollection col)
        {
            col.AddWithValue("@LineOne", request.LineOne);
            col.AddWithValue("@SuiteNumber", request.SuiteNumber);
            col.AddWithValue("@City", request.City);
            col.AddWithValue("@State", request.State);
            col.AddWithValue("@PostalCode", request.PostalCode);
            col.AddWithValue("@IsActive", request.IsActive);
            col.AddWithValue("@Lat", request.Lat);
            col.AddWithValue("@Long", request.Long);
        }
        private static Address MapSingleAddress(IDataReader reader)
        {
            int startingIdex = 0;

            Address address = new Address();


            address.Id = reader.GetSafeInt32(startingIdex++);
            address.LineOne = reader.GetSafeString(startingIdex++);
            address.SuiteNumber = reader.GetSafeInt32(startingIdex++);
            address.City = reader.GetSafeString(startingIdex++);
            address.State = reader.GetSafeString(startingIdex++);
            address.PostalCode = reader.GetSafeString(startingIdex++);
            address.IsActive = reader.GetSafeBool(startingIdex++);
            address.Lat = reader.GetSafeDouble(startingIdex++);
            address.Long = reader.GetSafeDouble(startingIdex++);
            return address;
        }

    }
}
