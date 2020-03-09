using System;
using Happnin.Business.Dto;
using Happnin.Business.Services;
using Happnin.Controllers;

namespace Happnin.Tests.Controllers
{
    public class EventControllerTests : BaseControllerTests<IEventService, Event, EventInput>
    {
        public override Event CreateDto()
        {
            return new Event
            {
                Name = Guid.NewGuid().ToString(),
                AgeRestriction = new Random().Next(),
                Cost = new Random().NextDouble(),
                Description = Guid.NewGuid().ToString(),
                EventTime = DateTime.Now
            };
        }

        public override BaseController<Event, EventInput> GetController(IEventService service)
        {
            return new EventController(service);
        }
    }
}
