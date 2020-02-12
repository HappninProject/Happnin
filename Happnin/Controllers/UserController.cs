using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Happnin.ClientApi;
using Microsoft.AspNetCore.Mvc;

namespace Happnin.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : Controller
    {
        private IHttpClientFactory ClientFactory { get; }

        public UserController(IHttpClientFactory clientFactory)
        {
            ClientFactory = clientFactory ?? throw new ArgumentNullException(nameof(clientFactory));
        }

        // GET: Event
        [HttpGet]
        public async Task<IEnumerable<User>> Get()
        {
            var httpClient = ClientFactory.CreateClient("Happnin.Api");
            var client = new UserClient(httpClient);
            ICollection<User> events = await client.GetAllAsync();
            return events; 
        } 
    }
}