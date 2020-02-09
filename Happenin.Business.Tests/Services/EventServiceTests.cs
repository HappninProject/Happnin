using System.Threading.Tasks;
using AutoMapper;
using Happnin.Business;
using Happnin.Business.Dto;
using Happnin.Business.Tests;
using Happnin.Data;
using Happnin.Data.Tests;
using Microsoft.EntityFrameworkCore;
using Xunit;
using Event = Happnin.Data.Event;

namespace Happnin.Business.Tests
{
    public class EventServiceTests : EntityServiceBaseTest<Dto.Event, EventInput, Event>
    {
        public EventServiceTests()
        {
            // seeding foreign key value for host and location
            using var applicationDbContext = new AppDbContext(Options);
            applicationDbContext.Users.Add(SampleData.UserKyle());
            applicationDbContext.Users.Add(SampleData.UserCaleb());
            applicationDbContext.SaveChanges();

        }

        public override (Event entity, Event secondEntity) GetEntities()
        {
            return (SampleData.EventParty(), SampleData.EventFestival());
        }

        public override (Dto.Event dto, Dto.Event seconDto) GetDtos()
        {
            // need to set foreign keys to the seeded values
            Dto.Event partyDto = Mapper.Map<Event, Dto.Event>(SampleData.EventParty());
            partyDto.HostId = 1;
            partyDto.LocationId = 1;
            Dto.Event festivalDto = Mapper.Map<Event, Dto.Event>(SampleData.EventFestival());
            festivalDto.HostId = 2;
            festivalDto.LocationId = 2;
            return (partyDto, festivalDto);
        }

        public override EntityService<Dto.Event, EventInput, Event> GetService(AppDbContext dbContext)
        {
            return new EventService(dbContext, Mapper);
        }

        public override void AssertEntitiesAreEqual(Event expected, Event actual)
        {
            Assert.Equal(expected.Name, actual.Name);
            Assert.Equal(expected.Description, actual.Description);
            Assert.Equal(expected.AgeRestriction, actual.AgeRestriction);
            Assert.Equal(expected.Cost, actual.Cost);
            Assert.Equal(expected.EventTime, actual.EventTime);
        }

        public override void AssertDtosAreEqual(Dto.Event expected, Dto.Event actual)
        {
            Assert.Equal(expected.Name, actual.Name);
            Assert.Equal(expected.Description, actual.Description);
            Assert.Equal(expected.AgeRestriction, actual.AgeRestriction);
            Assert.Equal(expected.Cost, actual.Cost);
            Assert.Equal(expected.EventTime, actual.EventTime);
        }

        public override Event UpdateEntity(Event entity, string update)
        {
            entity.Description = update;
            return entity;
        }
    }
}
