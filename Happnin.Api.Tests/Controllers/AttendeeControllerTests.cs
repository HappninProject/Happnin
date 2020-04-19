using System;
using System.Collections.Generic;
using System.Text;
using Happnin.Business.Dto;
using Happnin.Business.Services;
using Happnin.Controllers;

namespace Happnin.Tests.Controllers
{
    public class AttendeeControllerTests : BaseControllerTests<IAttendeeService, Attending, AttendingInput>
    {
        public override Attending CreateDto()
        {
            return new Attending
            {
                EventId =  new Random().Next(),
                UserId = new Guid().ToString()
            };
        }

        public override BaseController<Attending, AttendingInput> GetController(IAttendeeService service)
        {
            return new AttendeeController(service);
        }
    }
}
