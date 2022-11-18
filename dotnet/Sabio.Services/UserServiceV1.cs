using Sabio.Data;
using Sabio.Data.Extensions;
using Sabio.Data.Providers;
using Sabio.Models.Domain.Users;
using Sabio.Models.Requests.Users;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Services
{
    public class UserServiceV1 : IUserServiceV1
    {
        IDataProvider _data = null;

        public UserServiceV1(IDataProvider data)
        {
            _data = data;
        }

        public void Update(UserUpdateRequest request)
        {
            string procName = "[dbo].[Users_Update]";
            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                AddCommonParams(request, col);
                col.AddWithValue("@Id", request.Id);
            },
            returnParameters: null);
        }

        public User Get(int id)
        {
            string procName = "[dbo].[Users_SelectById]";

            User user = null;

            _data.ExecuteCmd(procName, delegate (SqlParameterCollection paramCollection)
            {
                paramCollection.AddWithValue("@Id", id);

            }, delegate (IDataReader reader, short set)
            {
                user = MapSingleUser(reader);
            }
            );

            return user;
        }

        public void Delete(int id)
        {
            string procName = "[dbo].[Users_Delete]";

            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@Id", id);

            },
            returnParameters: null);
        }
        public int Add(UserAddRequest request, int userId)
        {
            int id = 0;

            string procName = "[dbo].[Users_Insert]";
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
 
        public List<User> GetAll()
        {
            List<User> list = null;

            string procName = "[dbo].[Users_SelectAll]";
            _data.ExecuteCmd(procName, inputParamMapper: null
            , singleRecordMapper: delegate (IDataReader reader, short set)
            {
                User user = MapSingleUser(reader);

                if (list == null)
                {
                    list = new List<User>();
                }

                list.Add(user);
            });

            return list;
        }

        private static void AddCommonParams(UserAddRequest request, SqlParameterCollection col)
        {
            col.AddWithValue("@FirstName", request.FirstName);
            col.AddWithValue("@LastName", request.LastName);
            col.AddWithValue("@Email", request.Email);
            col.AddWithValue("@Password", request.Password);
            if(request.AvatarUrl != null)
            {
                col.AddWithValue("@AvatarUrl", request.AvatarUrl);
            }
            else
            {
                col.AddWithValue("@AvatarUrl", DBNull.Value);
            }
            
        }
        private static User MapSingleUser(IDataReader reader)
        {
            int startingIdx = 0;
            User user = new User();

            user.Id = reader.GetSafeInt32(startingIdx++);
            user.FirstName = reader.GetSafeString(startingIdx++);
            user.LastName = reader.GetSafeString(startingIdx++);
            user.Email = reader.GetSafeString(startingIdx++);
            user.AvatarUrl = reader.GetSafeString(startingIdx++);
            user.TenantId = reader.GetSafeString(startingIdx++);
            user.DateCreated = reader.GetSafeDateTime(startingIdx++);
            user.DateModified = reader.GetSafeDateTime(startingIdx++);
            return user;
        }
    }
}
