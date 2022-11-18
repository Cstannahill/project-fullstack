using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore;
using Microsoft.Extensions.DependencyInjection;
using SendGrid;
using Stripe.Checkout;
using Stripe;
using System.Collections.Generic;
using Sabio.Web.Models.Responses;
using System;
using Newtonsoft.Json;
using System.Linq;
using Microsoft.AspNet.SignalR.Hosting;
using NuGet.Protocol;
using Microsoft.Extensions.Options;
using Sabio.Models.Domain.AppKeys;
using Sabio.Services.Interfaces;

public class StripeOptions
{
    public string option { get; set; }
}

namespace server.Controllers
{
    [Route("api/stripe")]
    [ApiController]
    public class CheckoutApiController : Controller
    {
        private AppKeys _appKeys;
        IStripeTransactionService _service = null;
        public CheckoutApiController(IOptions<AppKeys> appKeys, IStripeTransactionService service)
        {
            _appKeys = appKeys.Value;
            _service = service;
        }

        [HttpPost]
        public ActionResult<ItemResponse<string>> Create(List<Product> prods)
        {
            StripeConfiguration.ApiKey = _appKeys.StripeConfigurationApiKey;
            BaseResponse response = null;
            int code = 200;
            var domain = "http://localhost:3000/purchases";

            SessionCreateOptions options = new SessionCreateOptions();
           

            List<SessionLineItemOptions> list = new List<SessionLineItemOptions>();
            try
            {
                foreach (Product prod in prods)
                {
                    SessionLineItemOptions sessOptions = new SessionLineItemOptions();
                    sessOptions.Price = prod.DefaultPriceId;
                    sessOptions.Quantity = 1;

                    list.Add(sessOptions);

                }
                options.LineItems = list;
                options.Mode = "payment";
                options.SuccessUrl = domain + "/success?session_id={CHECKOUT_SESSION_ID}";
                options.CancelUrl = domain + "canceled";

                var service = new SessionService();
                Session session = service.Create(options);


                response = new ItemResponse<string> { Item = session.Id };
                code = 200;

                Response.Headers.Add("Location", session.Url);
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse($"Exception Error : , {ex.Message}");
            }
            return StatusCode(code, response);
        }

        [HttpGet("purchases/success/{session_id}")]
        public ActionResult<ItemResponse<PurchaseInformation>> OrderSuccess(string session_id)
        {
            int code = 200;
            BaseResponse response = new ItemResponse<string>();
            PurchaseInformation data = new PurchaseInformation();
            StripeConfiguration.ApiKey = _appKeys.StripeConfigurationApiKey;
            try
            {
                var sessionService = new SessionService();
                Session session = sessionService.Get(session_id);
                _service.AddTransaction(session);
                if (session.CustomerDetails.Name != null)
                {
                    string customer = session.CustomerDetails.Name;
                    data.CustName = customer;
                }

                if (session.AmountTotal != null && session.AmountTotal > 0)
                {
                    string amount = Convert.ToString(session.AmountTotal / 100);
                    data.Amount = amount;
                }
                if (session.LineItems != null)
                {
                    StripeList<LineItem> ItemsPurchased = session.LineItems;
                    data.ItemsPurchased = ItemsPurchased;
                }

                response = new ItemResponse<PurchaseInformation> { Item = data };
            }
            catch (Exception ex)
            {
                response = new ErrorResponse($"General Exception Error: , {ex.Message}");
                code = 500;
            }


            return StatusCode(code, response);
        }




        [HttpGet]
        public ActionResult<ItemsResponse<Customer>> Getlist()
        {
            int code = 200;
            BaseResponse response = null;
            StripeConfiguration.ApiKey = _appKeys.StripeConfigurationApiKey;
            var service = new CustomerService();
            StripeList<Customer> customers = service.List();



            response = new ItemsResponse<Customer> { Items = customers.Data };

            return StatusCode(code, response);

        }

        [HttpPost("init-intent")]
        public ActionResult<ItemResponse<string>> CreateIntent()
        {
            StripeConfiguration.ApiKey = _appKeys.StripeConfigurationApiKey;
            BaseResponse response = null;
            int code = 201;

            try
            {

                var service = new SessionService();
                Session session = service.Create(null);
                PaymentIntentService piService = new PaymentIntentService();
                var paymentIntentService = new PaymentIntentService();
                var paymentIntent = paymentIntentService.Create(new PaymentIntentCreateOptions
                {
                    Amount = 10000,
                    Currency = "usd",
                    AutomaticPaymentMethods = new PaymentIntentAutomaticPaymentMethodsOptions
                    {
                        Enabled = true,
                    },
                });


                response = new ItemResponse<string> { Item = paymentIntent.ClientSecret };
                code = 201;
                //Response.Headers.Add("Location", session.Url);



            }
            catch (Exception ex)
            {

                code = 500;
                response = new ErrorResponse($"Exception Error: {ex}");

            }
            return StatusCode(code, response);
        }

        [HttpPut("{id}")]
        public ActionResult<ItemResponse<int>> UpdateIntent(string id, PaymentIntentUpdateOptions price)
        {
            StripeConfiguration.ApiKey = _appKeys.StripeConfigurationApiKey;
            BaseResponse response = null;
            int code = 200;

            try
            {
                PaymentIntentService piService = new PaymentIntentService();

                PaymentIntentUpdateOptions updatedInt = new PaymentIntentUpdateOptions();
                updatedInt.Amount = price.Amount * 100;



                PaymentIntent payInt = piService.Update(id, updatedInt);
                response = new ItemResponse<int> { Item = Convert.ToInt32(payInt.Amount) };
                code = 200;
            }
            catch (Exception ex)
            {

                code = 500;
                response = new ErrorResponse($"Exception Error: {ex}");

            }
            return StatusCode(code, response);
        }




        public class PurchaseInformation
        {
            public string CustName { get; set; }
            public string Amount { get; set; }
            public StripeList<LineItem> ItemsPurchased { get; set; }

        }

        public class Item
        {
            [JsonProperty("id")]
            public string Id { get; set; }
            public int price { get; set; }
        }

    }
}


