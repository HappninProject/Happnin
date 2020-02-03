using System.Threading.Tasks;
using AutoMapper;
using Happnin.Business.Tests;
using Happnin.Data;
using Happnin.Data.Tests;
using Microsoft.EntityFrameworkCore;
using SecretSanta.Business;
using Xunit;

namespace Happenin.Business.Tests
{
    public class EventServiceTests : EntityServiceBaseTest<Event>
    {
        public override (Event entity, Event secondEntity) GetEntities()
        {
            return (SampleData.EventParty(), SampleData.EventFestival());
        }

        public override EntityService<Event> GetService(AppDbContext dbContext)
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

        public override Event UpdateEntity(Event entity, string update)
        {
            entity.Description = update;
            return entity;
        }

        [Fact]
        public override async Task Update_EntityUpdated_ShouldSaveToDatabase()
        {
            using var dbContext = new AppDbContext(Options);
            EntityService<Event> service = GetService(dbContext);
            (Event entity, Event secondEntity) = GetEntities();

            await dbContext.Events.AddAsync(entity);
            await dbContext.Events.AddAsync(secondEntity);
            await dbContext.SaveChangesAsync();
            
            using var dbContextFetch = new AppDbContext(Options);
            Event updateEntityFromDb = await dbContextFetch.Events.Include(e => e.Location)
                .Include(e => e.Host).Include(e => e.Host.Location).SingleOrDefaultAsync(e => e.Id == entity.Id);

            updateEntityFromDb = UpdateEntity(updateEntityFromDb, "This was updated");

            await service.UpdateAsync(secondEntity.Id!.Value, updateEntityFromDb);

            using var dbContextAssert = new AppDbContext(Options);
            Event entityFromDb = await dbContextAssert.Events.SingleOrDefaultAsync(e => e.Id == entity.Id);
            Event secondEntityFromDb = await dbContextAssert.Events.SingleOrDefaultAsync(e => e.Id == secondEntity.Id);

            AssertEntitiesAreEqual(entity, entityFromDb);
            AssertEntitiesAreEqual(updateEntityFromDb, secondEntityFromDb);
        }

    }
}
