using Happnin.Business.Dto;
using Happnin.Business.Services;
using Happnin.Data;
using Happnin.Data.Tests;
using System;
using System.Threading.Tasks;
using Attending = Happnin.Data.Attending;
using Xunit;

namespace Happnin.Business.Tests.Services
{
    public class AttendeeServiceTests : EntityServiceBaseTest<Dto.Attending, AttendingInput, Data.Attending>
    {
        public override (Attending entity, Attending secondEntity) GetEntities()
        {
            return (SampleData.AttendingSomething(), SampleData.AttendingSomething());
        }

        public override (Dto.Attending dto, Dto.Attending seconDto) GetDtos()
        {
            var dtoAttending = Mapper.Map<Attending, Dto.Attending>(SampleData.AttendingSomething());
            var dtoAttendingElse = Mapper.Map<Attending, Dto.Attending>(SampleData.AttendingSomethingElse());
            return (dtoAttending, dtoAttendingElse);
        }

        public override EntityService<Dto.Attending, AttendingInput, Attending> GetService(AppDbContext dbContext)
        {
            return new AttendeeService(dbContext, Mapper);
        }

        public override void AssertEntitiesAreEqual(Attending expected, Attending actual)
        {
            Assert.Equal(expected.UserId, actual.UserId);
            Assert.Equal(expected.EventId, actual.EventId);
        }
        public override void AssertDtosAreEqual(Dto.Attending expected, Dto.Attending actual)
        {
            Assert.Equal(expected.UserId, actual.UserId);
            Assert.Equal(expected.EventId, actual.EventId);
        }

        public override Attending UpdateEntity(Attending entity, string update)
        {
            entity.UserId = update;
            return entity;
        }

        public override Task Update_EntityUpdated_ShouldSaveToDatabase()
        {
            return null;
        }
    }
}
