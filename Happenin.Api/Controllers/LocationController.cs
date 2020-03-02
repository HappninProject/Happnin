using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Happnin.Business.Dto;
using Happnin.Business.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Happnin.Api.Controllers
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