using AutoMapper;
using Happnin.Business.Dto;
using Happnin.Data;
using Event = Happnin.Data.Event;

namespace Happnin.Business.Services
{
    public class EventService : EntityService<Dto.Event, EventInput, Event> , IEventService
    {
        public EventService(AppDbContext applicationDbContext, IMapper mapper)
            : base(applicationDbContext, mapper)
        {
        }
    }
}
