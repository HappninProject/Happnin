using System;
using System.Collections.Generic;
using System.Text;
using AutoMapper;
using Happnin.Data;

namespace Happnin.Business.Services
{
    public class EventImageService : EntityService<Dto.EventImage, Dto.EventImageInput, Data.EventImage>, IEventImageService
    {
        public EventImageService(AppDbContext applicationDbContext, IMapper mapper) : base(applicationDbContext, mapper)
        {
        }
    }
}
