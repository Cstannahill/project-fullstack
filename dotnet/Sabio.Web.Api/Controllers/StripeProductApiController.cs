using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Sabio.Models.Domain.AppKeys;
using Sabio.Services;
using Sabio.Web.Models.Responses;
using Stripe;
using System;
using System.Collections.Generic;

namespace Sabio.Web.Api.Controllers
{
    [Route("api/stripe/products")]
    [ApiController]
    public class StripeProductApiController : Controller
    {

        private AppKeys _appKeys;
        public StripeProductApiController(IOptions<AppKeys> appKeys)
        {
            _appKeys = appKeys.Value;

        }


            [HttpGet]
            public ActionResult<ItemsResponse<Product>> GetAllProducts()
            {
                StripeConfiguration.ApiKey = _appKeys.StripeConfigurationApiKey;
                BaseResponse response = null;
                int code = 200;
                var service = new ProductService();
                try
                {
                    StripeList<Product> products = service.List();
                    response = new ItemsResponse<Product> { Items = products.Data };
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
