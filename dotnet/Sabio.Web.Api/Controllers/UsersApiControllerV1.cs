using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Sabio.Models.Domain;
using Sabio.Models.Domain.Users;
using Sabio.Models.Requests.Users;
using Sabio.Services;
using Sabio.Web.Models.Responses;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Threading.Tasks;

namespace Sabio.Web.Api.Controllers
{
    [Route("api/users")]
    [ApiController]
    public class UsersApiControllerV1 : ControllerBase
    {
        private IUserService _service = null;
        private IAuthenticationService<int> _authService = null;

        public UsersApiControllerV1(IUserService service,
            IAuthenticationService<int> authService) 
        {
            _service = service;
            _authService = authService;
        }

        //[HttpGet]
        //public ActionResult<ItemsResponse<User>> GetAll()
        //{
        //    int code = 200;
        //    BaseResponse response = null;

        //    try
        //    {
        //        List<User> list = _service.GetAll();

        //        if (list == null)
        //        {
        //            code = 404;
        //            response = new ErrorResponse("Users not found.");
        //        }
        //        else
        //        {
        //            response = new ItemsResponse<User> { Items = list };
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        code = 500;
        //        response = new ErrorResponse(ex.Message);
        //    }

        //    return StatusCode(code, response);
        //}

        //[HttpGet("{id:int}")]
        //public ActionResult<ItemResponse<User>> GetById(int id)
        //{
        //    int code = 200;
        //    BaseResponse response = null;
        //    try
        //    {
        //        User user = _service.Get(id);

        //        if (user == null)
        //        {
        //            code = 404;
        //            response = new ErrorResponse("User not found.");
        //        }
        //        else
        //        {
        //            response = new ItemResponse<User> { Item = user };
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        code = 500;
        //        response = new ErrorResponse($"Generic Exception Error: {ex.Message}");
        //    }
        //    return StatusCode(code, response);
        //}

        [HttpPost]
        [AllowAnonymous]
        public ActionResult<ItemResponse<int>> Create(UserAddRequest request)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                int id = _service.Create(request);

                code = 201;
                response = new ItemResponse<int> { Item = id };
            }
            catch(Exception ex)
            {
                code = 500;

                response = new ErrorResponse($"Exception Error: {ex.Message}");
            }

            return StatusCode(code, response);
        }
        [HttpGet("logout")]
        public async Task<ActionResult<SuccessResponse>> LogOut()
        {
            int code = 200;
            BaseResponse response = null;
            try
            {
                await _authService.LogOutAsync();
                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
            }
            return StatusCode(code, response);
        }

        [HttpGet("current")]
        public ActionResult<ItemResponse<User>> CurrentUser()
        {
            int code = 200;
            BaseResponse response = null;
            UserBase user = (UserBase)_authService.GetCurrentUser();
            try
            {
                User aUser = _service.GetCurrent(user.Id, user);
                if (aUser == null)
                {
                    code = 404;
                    response = new ErrorResponse("User not found.");
                }
                else
                {
                    response = new ItemResponse<User>() { Item = aUser };
                }
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
            }
            return StatusCode(code, response);
        }

        [HttpPost("login")]
        [AllowAnonymous]
        public async Task<ActionResult<SuccessResponse>> Login(UserLogin model)
        {
            int code = 200;
            BaseResponse response = null;
            bool success = false;

            try
            {
                success = await _service.LogInAsync(model.Email, model.Password);
                if (success == false)
                {
                    code = 404;
                    response = new ErrorResponse("Login Error");
                }
                else
                {
                    response = new SuccessResponse();
                }
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
            }
            return StatusCode(code, response);
        }
        //[HttpPut("{id:int}")]
        //public ActionResult<ItemResponse<int>> Update(UserUpdateRequest request)
        //{
        //    int code = 200;
        //    BaseResponse response = null;

        //    try
        //    {
        //        _service.Update(request);

        //        response = new SuccessResponse();
        //    }
        //    catch (Exception ex)
        //    {
        //        code = 500;
        //        response = new ErrorResponse($"General Exception Error: {ex.Message}");
        //    }
        //    return StatusCode(code, response);
        //}

        //[HttpDelete("{id:int}")]
        //public ActionResult<SuccessResponse> Delete(int id)
        //{
        //    int code = 200;
        //    BaseResponse response = null;

        //    try
        //    {
        //        _service.Delete(id);
        //        code = 200;
        //        response = new SuccessResponse();
        //    }
        //    catch (Exception ex)
        //    {
        //        code = 500;
        //        response = new ErrorResponse($"General Exception Error: {ex.Message}");
        //    }
        //    return StatusCode(code, response);
        //}

    }
}
