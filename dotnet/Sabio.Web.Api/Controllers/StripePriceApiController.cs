using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Microsoft.Extensions.Options;
using Sabio.Models.Domain.AppKeys;
using Sabio.Services;
using Sabio.Web.Models.Responses;
using Stripe;
using System;

namespace Sabio.Web.Api.Controllers
{
    [Route("api/stripe/prices")]
    [ApiController]
    public class StripePriceApiController : Controller
    {
        private AppKeys _appKeys;

        public StripePriceApiController(IOptions<AppKeys> appKeys)
        {
            _appKeys = appKeys.Value;
        }



        [HttpGet("{id}")]
        public ActionResult<ItemResponse<string>> GetPrice(string id)
        {
            StripeConfiguration.ApiKey = _appKeys.StripeConfigurationApiKey;
            BaseResponse response = null;
            int code = 200;
            var service = new PriceService();
            try
            {
                Price price = service.Get(id, null);
                response = new ItemResponse<string> { Item = price.UnitAmount.ToString() };
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse($"Exception Error: {ex}");
            }
            return StatusCode(code, response);
        }

    }
}
