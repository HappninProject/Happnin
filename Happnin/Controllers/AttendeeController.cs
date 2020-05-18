using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Happnin.Business.Dto;
using Happnin.Business.Services;
using Microsoft.AspNetCore.Mvc;

namespace Happnin.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AttendeeController : BaseController<Attending, AttendingInput>
    {  
        public AttendeeController(IAttendeeService service) : base(service)
        {
        }

        [HttpGet]
        [Route("AttendeeInfo/{id}")]
        public async Task<List<Attending>> AttendeeInfo(string id)
        {
            var attendees = await Service.FetchAllAsync();
            var eventsAttended = attendees.Where(a => a.UserId == id);
            return eventsAttended.ToList();
        }

        [HttpGet]
        [Route("Count/{id}")]
        public async Task<int> Count(int id)
        {
            var attendeeService = (IAttendeeService)Service;
            return await attendeeService.GetAttendingCount(id);
        }

    }
}
