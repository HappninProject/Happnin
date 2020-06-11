using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Happnin.Business.Dto;
using Happnin.Data;
using Attending = Happnin.Business.Dto.Attending;

namespace Happnin.Business.Services
{
    public class AttendeeService : EntityService<Attending, AttendingInput, Data.Attending>, IAttendeeService
    {
        public AttendeeService(AppDbContext applicationDbContext, IMapper mapper) : base(applicationDbContext, mapper)
        {

        }

        public Task<int> GetAttendingCount(int eventId)
        {
            var attendingCount = Query.Where(e => e.EventId == eventId);
            var count = attendingCount.ToList().Count;

            return Task.FromResult(count);
        }
    }
}
