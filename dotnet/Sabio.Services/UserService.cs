using Sabio.Data.Providers;
using Sabio.Models;
using Sabio.Models.Domain;
using Sabio.Models.Requests.Users;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Sabio.Data;
using Sabio.Models.Domain.Users;
using Stripe.Terminal;
using System;

namespace Sabio.Services
{
    public class UserService : IUserService
    {
        private IAuthenticationService<int> _authenticationService;
        private IDataProvider _dataProvider;

        public UserService(IAuthenticationService<int> authSerice, IDataProvider dataProvider)
        {
            _authenticationService = authSerice;
            _dataProvider = dataProvider;
        }

        public async Task<bool> LogInAsync(string email, string password)
        {
            bool isSuccessful = false;

            IUserAuthData response = Get(email, password);
            if (response != null)
            {
                await _authenticationService.LogInAsync(response);
                isSuccessful = true;
            }

            return isSuccessful;
        }
        public User GetCurrent(int userId, UserBase user)
        {
            string procName = "[dbo].[Users_Current]";
            User curUser = null;
            _dataProvider.ExecuteCmd(procName, delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@Id", userId);
            },
            singleRecordMapper: delegate (IDataReader reader, short set)
            {
                int startingIdx = 0;
                curUser = MapSingleUser(reader, ref startingIdx);
            });
            return curUser;
        }

        #region - DO NOT REMOVE - DO NOT EDIT - EVER


        /// <summary>
        /// ** This method should never be removed from this Interface or this class **
        /// An Instructor will remove it when appropriate.
        /// If you ever do anything to break this method, you need to fix it right away.
        /// </summary>
        /// <param name="email"></param>
        /// <param name="password"></param>
        /// <param name="id"></param>
        /// <param name="roles"></param>
        /// <returns></returns>
        public async Task<bool> LogInTest(string email, string password, int id, string[] roles = null)
        {
            bool isSuccessful = false;
            var testRoles = new[] { "User", "Super", "Content Manager" };

            var allRoles = roles == null ? testRoles : testRoles.Concat(roles);

            IUserAuthData response = new UserBase
            {
                Id = id
                ,
                Name = email
                ,
                Roles = allRoles
                ,
                TenantId = "Acme Corp UId"
            };

            Claim fullName = new Claim("CustomClaim", "Sabio Bootcamp");
            await _authenticationService.LogInAsync(response, new Claim[] { fullName });

            return isSuccessful;
        }

        #endregion

        public int Create(UserAddRequest model)
        {
            //make sure the password column can hold long enough string. put it to 100 to be safe

            int userId = 0;
            //string password = "Get from user model when you have a concreate class";
            string salt = BCrypt.BCryptHelper.GenerateSalt();
            string hashedPassword = BCrypt.BCryptHelper.HashPassword(model.Password, salt);

            //DB provider call to create user and get us a user id
            string procName = "[dbo].[Users_Insert]";
            //be sure to store both salt and passwordHash
            //DO NOT STORE the original password value that the user passed us
            _dataProvider.ExecuteNonQuery(procName,
                           inputParamMapper: delegate (SqlParameterCollection col)
                           {
                               col.AddWithValue("@Email", model.Email);
                               col.AddWithValue("@Password", hashedPassword);
                               col.AddWithValue("@FirstName", model.FirstName);
                               col.AddWithValue("@LastName", model.LastName);
                               if(model.AvatarUrl != null)
                               {
                                col.AddWithValue("@AvatarUrl", model.AvatarUrl);
                               }
                               else
                               {
                                   col.AddWithValue("@AvatarUrl", DBNull.Value);
                               }
                               

                               SqlParameter idOut = new SqlParameter("@Id", SqlDbType.Int);
                               idOut.Direction = ParameterDirection.Output;

                               col.Add(idOut);
                           },
                           returnParameters: delegate (SqlParameterCollection returnCollection)
                           {
                               object oId = returnCollection["@Id"].Value;
                               int.TryParse(oId.ToString(), out userId);
                           });

            return userId;
        }
        public void AddToken(string token, int userId, int tokenType)
        {
            string tokenProcName = "[dbo].[UserTokens_Insert]";

            _dataProvider.ExecuteNonQuery(tokenProcName,
                inputParamMapper: delegate (SqlParameterCollection col)
                {
                    col.AddWithValue("@Token", token);
                    col.AddWithValue("@UserId", userId);
                    col.AddWithValue("@TokenType", tokenType);
                });
        }

        public void ConfirmUser(string token)
        {
            string procName = "[dbo].[Users_ConfirmToken]";
            _dataProvider.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection col)
                {
                    col.AddWithValue("@Token", token);
                },
                returnParameters: null);
        }
        public int ForgotMyPassword(string email)
        {
            int id = 0;

            string procName = "[dbo].[Users_SelectByEmail]";
            _dataProvider.ExecuteCmd(procName,
                inputParamMapper: delegate (SqlParameterCollection col)
                {
                    col.AddWithValue("@Email", email);

                }, singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    int startIdx = 0;

                    id = reader.GetSafeInt32(startIdx++);

                });
            return id;

        }
        public int PasswordToken(string token)
        {
            int id = 0;
            string procName = "[dbo].[UsersSelect_ByToken]";
            _dataProvider.ExecuteCmd(procName, inputParamMapper: delegate (SqlParameterCollection paramColl)
            {
                paramColl.AddWithValue("@Token", token);
            }, singleRecordMapper: delegate (IDataReader reader, short set)
            {
                int startIdx = 0;
                id = reader.GetSafeInt32(startIdx++);
            });
            return id;

        }
        public void PasswordReset(int userId, string password)
        {
            string salt = BCrypt.BCryptHelper.GenerateSalt();
            string hashedPassword = BCrypt.BCryptHelper.HashPassword(password, salt);

            string procName = "[dbo].[Users_UpdatePassword]";
            _dataProvider.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection col)
                {
                    col.AddWithValue("@Password", hashedPassword);
                    col.AddWithValue("@Id", userId);
                },
                returnParameters: null);
        }

        /// <summary>
        /// Gets the Data call to get a give user
        /// </summary>
        /// <param name="email"></param>
        /// <param name="passwordHash"></param>
        /// <returns></returns>
        private IUserAuthData Get(string email, string password)
        {
            //make sure the password column can hold long enough string. put it to 100 to be safe
            string passwordFromDb = "";
            UserBase user = null;

            //get user object from db;
            string procName = "dbo.Users_SelectAuth";
            _dataProvider.ExecuteCmd(procName,
               inputParamMapper: delegate (SqlParameterCollection col)
               {
                   col.AddWithValue("@Email", email);
               },
               singleRecordMapper: delegate (IDataReader reader, short set)
               {
                   int startingIdx = 0;
                   UserBase aUser = new UserBase();

                   aUser.Id = reader.GetSafeInt32(startingIdx++);
                   aUser.Name = reader.GetSafeString(startingIdx++);
                   passwordFromDb = reader.GetSafeString(startingIdx++);
                   aUser.TenantId = reader.GetSafeString(startingIdx++);
                   bool isValidCredentials = BCrypt.BCryptHelper.CheckPassword(password, passwordFromDb);
                   if (isValidCredentials)
                   {
                       user = aUser;
                   }
               });
            return user;
        }

        private static User MapSingleUser(IDataReader reader, ref int startingIdx)
        {
            User user = new User();
            user.Id = reader.GetSafeInt32(startingIdx++);
            user.FirstName = reader.GetSafeString(startingIdx++);
            user.LastName = reader.GetSafeString(startingIdx++);
            user.TenantId = reader.GetSafeString(startingIdx++);
            user.Email = reader.GetSafeString(startingIdx++);
            user.AvatarUrl = reader.GetSafeString(startingIdx++);
            return user;
        }
    }
}