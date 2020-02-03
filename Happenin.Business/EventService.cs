using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Happnin.Data;
using Microsoft.EntityFrameworkCore;
using SecretSanta.Business;

namespace Happenin.Business
{
    public class EventService : EntityService<Event> , IEventService
    {
        public EventService(AppDbContext applicationDbContext, IMapper mapper)
            : base(applicationDbContext, mapper)
        {
        }

        public override async Task<Event> UpdateAsync(int id, Event entity)
        {
            Event result = await ApplicationDbContext.Events.Include(e => e.Location).Include(e => e.Host).SingleAsync(item => item.Id == id);
            Mapper.Map(entity, result);
            await ApplicationDbContext.SaveChangesAsync();
            return result;
        }

    }
}
