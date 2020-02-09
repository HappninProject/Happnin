using AutoMapper;
using Happnin.Business.Dto;
using Happnin.Data;
using Location = Happnin.Data.Location;

namespace Happnin.Business
{
    public class LocationService : EntityService<Dto.Location, LocationInput, Location> , ILocationService
    {
        public LocationService(AppDbContext applicationDbContext, IMapper mapper) : base(applicationDbContext, mapper)
        {
        }
    }
}
