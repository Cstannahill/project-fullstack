using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Models;
using Sabio.Models.Requests.Applications;
using Sabio.Models.Requests.Friends;
using Sabio.Services.Interfaces;
using Sabio.Web.Models.Responses;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;

namespace WebPage.Controllers
{
    [Route("api/applications")]
    [ApiController]
    public class ApplicationsApiController : ControllerBase
    {
        IAuthenticationService _authService = null;
        IApplicationService _service = null;
        public ApplicationsApiController(IApplicationService service, IAuthenticationService authService)
        {
            _authService = authService;
            _service = service;
        }

        [HttpGet]
        public ActionResult<ItemsResponse<Application>> GetAllApplications(int id)
        {
            int code = 200;
            BaseResponse response = null;
            List<Application> menuModification = null;

            try
            {
                menuModification = _service.GetAllApplications();

                if (menuModification == null)
                {
                    code = 404;
                    response = new ErrorResponse("App Resource not found.");
                }
                else
                {
                    response = new ItemsResponse<Application> { Items = menuModification };
                }
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
            }
            return StatusCode(code, response);
        }

        [HttpPost]
        public ActionResult<ItemResponse<int>> Create(ApplicationAddRequest model)
        {
            int code = 201;
            BaseResponse response = null;

            try
            {
                int id = _service.Add(model);
                response = new ItemResponse<int> { Item = id };
            }
            catch (Exception ex)
            {
                code = 500;

                response = new ErrorResponse(ex.Message);
            }
            return StatusCode(code, response);
        }

        [HttpPut("{id:int}")]
        public ActionResult<SuccessResponse> Update(ApplicationUpdateRequest model)
        {
            int code = 201;
            BaseResponse response = null;

            try
            {
                _service.Update(model);
                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                code = 500;

                response = new ErrorResponse(ex.Message);
            }
            return StatusCode(code, response);
        }

        [HttpPut("close/{id:int}")]
        public ActionResult<SuccessResponse> CloseApp(int id)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                _service.CloseApp(id);
                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                code = 500;

                response = new ErrorResponse(ex.Message);
            }
            return StatusCode(code, response);
        }
    }
}
