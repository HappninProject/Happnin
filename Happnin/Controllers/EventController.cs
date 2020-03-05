using Happnin.Business.Dto;
using Happnin.Business.Services;
using Microsoft.AspNetCore.Mvc;

namespace Happnin.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventController : BaseController<Event, EventInput>
    {
        public EventController(IEventService service) : base(service)
        {
        }
    }
}