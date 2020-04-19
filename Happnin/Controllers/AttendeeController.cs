using Happnin.Business.Dto;
using Happnin.Business.Services;
using Microsoft.AspNetCore.Mvc;

namespace Happnin.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AttendeeController : BaseController<Attending, AttendingInput>
    {  
        public AttendeeController(IEntityService<Attending, AttendingInput> service) : base(service)
        {
        }
    }
}
