using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Happnin.Business.Dto;
using Happnin.Business.Services;

namespace Happnin.Controllers
{
    public class AttendeeController : BaseController<Attending, AttendingInput>
    {  
        public AttendeeController(IEntityService<Attending, AttendingInput> service) : base(service)
        {
        }
    }
}
