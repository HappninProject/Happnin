using System;
using System.Collections.Generic;
using System.Text;
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
    }
}
