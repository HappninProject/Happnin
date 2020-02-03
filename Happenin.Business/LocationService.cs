using System;
using System.Collections.Generic;
using System.Text;
using AutoMapper;
using Happnin.Data;
using SecretSanta.Business;

namespace Happenin.Business
{
    public class LocationService : EntityService<Location> , ILocationService
    {
        public LocationService(AppDbContext applicationDbContext, IMapper mapper) : base(applicationDbContext, mapper)
        {
        }
    }
}
