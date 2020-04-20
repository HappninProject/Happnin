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

        [HttpGet("{id}")]
        [Route("AttendeeInfo")]
        public async Task<List<Attending>> AttendeeInfo(string userId)
        {
            var attendees = await Service.FetchAllAsync();
            var eventsAttended = attendees.Where(a => a.UserId == userId);
            return eventsAttended.ToList();
        }

    }
}
