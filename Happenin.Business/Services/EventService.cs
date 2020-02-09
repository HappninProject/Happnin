using System;
using System.Collections.Generic;
using System.Text;
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

        //public override async Task<Dto.Event> UpdateAsync(int id, EventInput entity)
        //{
        //    Event result = await ApplicationDbContext.Events.Include(e => e.Location).Include(e => e.Host).SingleAsync(item => item.Id == id);
        //    Mapper.Map(entity, result);
        //    await ApplicationDbContext.SaveChangesAsync();
        //    return result;
        //}

    }
}
