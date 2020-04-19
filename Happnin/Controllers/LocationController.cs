using Happnin.Business.Dto;
using Happnin.Business.Services;
using Microsoft.AspNetCore.Mvc;

namespace Happnin.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LocationController : BaseController<Location, LocationInput>
    {
        public LocationController(ILocationService service) : base(service)
        {
        }
    }
}