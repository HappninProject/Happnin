using AutoMapper;
using Happnin.Business.Dto;
using Happnin.Business.Services;
using Happnin.Data;
using Happnin.Data.Tests;
using Xunit;
using Location = Happnin.Data.Location;

namespace Happnin.Business.Tests
{
    public class LocationServiceTests : EntityServiceBaseTest<Dto.Location, LocationInput, Location>
    {
        public override (Location entity, Location secondEntity) GetEntities()
        {
            return (SampleData.Location1234Spokane(), SampleData.Location3456Spokane());
        }

        public override (Dto.Location dto, Dto.Location seconDto) GetDtos()
        {
            Dto.Location Spokane1234Dto = Mapper.Map<Location, Dto.Location>(SampleData.Location1234Spokane());
            Dto.Location Spokane3456Dto = Mapper.Map<Location, Dto.Location>(SampleData.Location3456Spokane());
            return (Spokane1234Dto, Spokane3456Dto);
        }

        public override EntityService<Dto.Location, LocationInput, Location> GetService(AppDbContext dbContext)
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

        public override void AssertDtosAreEqual(Dto.Location expected, Dto.Location actual)
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
