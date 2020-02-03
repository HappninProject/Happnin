using Happnin.Business.Tests;
using Happnin.Data;
using Happnin.Data.Tests;
using SecretSanta.Business;
using Xunit;

namespace Happenin.Business.Tests
{
    public class LocationServiceTests : EntityServiceBaseTest<Location>
    {
        public override (Location entity, Location secondEntity) GetEntities()
        {
            return (SampleData.Location1234Spokane(), SampleData.Location3456Spokane());
        }

        public override EntityService<Location> GetService(AppDbContext dbContext)
        {
            return new LocationService(dbContext, Mapper);
        }

        public override void AssertEntitiesAreEqual(Location expected, Location actual)
        {
            Assert.Equal(expected.Address, actual.Address);
            Assert.Equal(expected.City, actual.City);
            Assert.Equal(expected.State, actual.State);
            Assert.Equal(expected.Country, actual.Country);
            Assert.Equal(expected.ZipCode, actual.ZipCode);
        }

        public override Location UpdateEntity(Location entity, string update)
        {
            entity.Address = update;
            return entity;
        }
    }
}
