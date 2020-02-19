using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Happnin.ClientApi;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Happnin.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class EventController : Controller
    {
        private IHttpClientFactory ClientFactory { get; }

        public EventController(IHttpClientFactory clientFactory)
        {
            ClientFactory = clientFactory ?? throw new ArgumentNullException(nameof(clientFactory));
        }

        // GET: Event
        [HttpGet]
        public async Task<IEnumerable<Event>> Get()
        {
            var httpClient = ClientFactory.CreateClient("Happnin.Api");
            var client = new EventClient(httpClient);
            ICollection<Event> events = await client.GetAllAsync();
            return events; 
        }
    }
}