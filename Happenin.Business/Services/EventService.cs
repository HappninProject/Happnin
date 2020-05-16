using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Happnin.Business.Dto;
using Happnin.Data;
using Microsoft.EntityFrameworkCore;
using Event = Happnin.Data.Event;

namespace Happnin.Business.Services
{
    public class EventService : EntityService<Dto.Event, EventInput, Event> , IEventService
    {
        public EventService(AppDbContext applicationDbContext, IMapper mapper)
            : base(applicationDbContext, mapper)
        {
        }

        public async Task<List<Dto.Event>> FetchHostedEventsAsync(string id)
        {
            var events = Query.Where(e => e.HostId == id);
            
            return MapList(events.ToList());
        }

        public async Task<List<Dto.Event>> FetchProductEventsAsync()
        {
            var events = Query.Where(e => e.CategoryId == 5);
            return MapList(events.ToList());
        }

        public async Task<List<Dto.Event>> FetchEventsOnlyAsync()
        {
            var events = Query.Where(e => e.CategoryId != 5);
            return MapList(events.ToList());
        }

        // Todo, push this up to the EntityService/IEntityService class 
        private List<Dto.Event> MapList(List<Data.Event> dataList)
        {
            var dtoList = new List<Dto.Event>();
            foreach (var f in dataList)
            {
                dtoList.Add(Mapper.Map<Data.Event, Dto.Event>(f));
            }

            return dtoList;
        }
    }
}
