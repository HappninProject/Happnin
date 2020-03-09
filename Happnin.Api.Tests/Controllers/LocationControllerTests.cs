using System;
using Happnin.Business.Dto;
using Happnin.Business.Services;
using Happnin.Controllers;

namespace Happnin.Tests.Controllers
{
    public class LocationControllerTests : BaseControllerTests<ILocationService, Location, LocationInput>
    {
        public override Location CreateDto()
        {
            return new Location
            {
                Address = Guid.NewGuid().ToString(),
                City = Guid.NewGuid().ToString(),
                State = Guid.NewGuid().ToString(),
                Country = Guid.NewGuid().ToString(),
                ZipCode = Guid.NewGuid().ToString()
            };
        }

        public override BaseController<Location, LocationInput> GetController(ILocationService service)
        {
            return new LocationController(service);
        }
    }
}
