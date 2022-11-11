using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Sabio.Models.Domain.Friends;
using Sabio.Models;
using Sabio.Models.Domain.Music;
using Sabio.Services;
using Sabio.Services.Interfaces;
using Sabio.Web.Controllers;
using Sabio.Web.Models.Responses;
using Stripe;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;

namespace Sabio.Web.Api.Controllers
{
    [Route("api/music")]
    [ApiController]
    [AllowAnonymous]
    public class MusicApiController : BaseApiController
    {
        private IMusicService _musicService = null;
        private IAuthenticationService<int> _authService = null;

        public MusicApiController(IMusicService musicService, ILogger<MusicApiController> logger, IAuthenticationService<int> authService) : base(logger)
        {
            _musicService = musicService;
            _authService = authService;
        }

        [HttpGet]
        public ActionResult<ItemsResponse<Album>> GetAll()
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                List<Album> albums = _musicService.GetAll();

                if(albums == null)
                {
                    code = 404;
                    response = new ErrorResponse("App resource not found");
                }
                else
                {
                    response = new ItemsResponse<Album> { Items = albums };
                }
            }
            catch(Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
                base.Logger.LogError(ex.ToString());
            }
            return StatusCode(code, response);
        }

        [HttpGet("paginate")]
        public ActionResult<ItemResponse<Paged<Album>>> Pagination(int pageIndex, int pageSize)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                Paged<Album> paged = _musicService.Pagination(pageIndex, pageSize);
                if (paged == null)
                {
                    code = 404;
                    response = new ErrorResponse("Records not found.");
                }
                else
                {
                    ItemResponse<Paged<Album>> result = new ItemResponse<Paged<Album>>();
                    result.Item = paged;
                    code = 200;
                    return StatusCode(code, result);

                }
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse($"General Exception Error: {ex.Message}");
            }
            return StatusCode(code, response);
        }
    }
}
