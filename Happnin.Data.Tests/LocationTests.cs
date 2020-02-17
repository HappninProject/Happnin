using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;
using Xunit;

namespace Happnin.Data.Tests
{
    public class LocationTests : BaseTest
    {
        [Fact]
        public void Location_CreateLocation_Success()
        {
            var location = new Location(SampleData.Street, SampleData.City, SampleData.State,SampleData.Country, SampleData.ZipCode);

            Assert.Equal(SampleData.Street, location.Address);
            Assert.Equal(SampleData.City, location.City);
            Assert.Equal(SampleData.State, location.State);
            Assert.Equal(SampleData.Country, location.Country);
            Assert.Equal(SampleData.ZipCode, location.ZipCode);
        }
        
        [Fact]
        public void Create_NullAddress_ThrowsException()
        {
            Action act = () => new Location(null, SampleData.City, SampleData.State, SampleData.Country, SampleData.ZipCode);

            Assert.Throws<ArgumentNullException>(act);
        }
 
        [Fact]
        public void Create_NullCity_ThrowsException()
        {
            Action act = () => new Location(SampleData.Street, null, SampleData.State, SampleData.Country, SampleData.ZipCode);

            Assert.Throws<ArgumentNullException>(act);
        }
         
        [Fact]
        public void Create_NullState_ThrowsException()
        {
            Action act = () => new Location(SampleData.Street, SampleData.City, null, SampleData.Country, SampleData.ZipCode);

            Assert.Throws<ArgumentNullException>(act);
        }

        [Fact]
        public void Create_NullCountry_ThrowsException()
        {
            Action act = () => new Location(SampleData.Street, SampleData.City, SampleData.Country, null, SampleData.ZipCode);

            Assert.Throws<ArgumentNullException>(act);
        }

        [Fact]
        public void Create_NullZipCode_ThrowsException()
        {
            Action act = () => new Location(SampleData.Street,SampleData.City, SampleData.State,SampleData.Country, null);

            Assert.Throws<ArgumentNullException>(act);
        }

        [Fact]
        public async Task Create_Location_DatabaseShouldSaveIt()
        {
            var locationId = -1;
            Location location = SampleData.Location3456Spokane();

            using var appDbContext = new AppDbContext(Options);
            appDbContext.Locations.Add(location);
            await appDbContext.SaveChangesAsync();
            locationId = location.Id!.Value;

            using var appDbContextAssert = new AppDbContext(Options);
            Location locationFromDb = await appDbContextAssert.Locations.Where(e => e.Id == locationId).SingleOrDefaultAsync();

            Assert.Equal(location.Address, locationFromDb.Address);
            Assert.Equal(location.City, locationFromDb.City);
            Assert.Equal(location.State, locationFromDb.State);
            Assert.Equal(location.Country, locationFromDb.Country);
            Assert.Equal(location.ZipCode, locationFromDb.ZipCode);
        }
        
        [Fact]
        public async Task Update_LocationUpdated_SavedToDatabase()
        {
           var locationId = -1;
            Location location = SampleData.Location3456Spokane();

            using var appDbContext = new AppDbContext(Options);
            appDbContext.Locations.Add(location);
            await appDbContext.SaveChangesAsync();
            locationId = location.Id!.Value;
           
            using var appDbContextFetch = new AppDbContext(Options);
            Location locationFromDb = await appDbContextFetch.Locations.Where(e => e.Id == locationId).SingleOrDefaultAsync();
            locationFromDb.Address = "qwerty street";
            locationFromDb.State = "NY";

            await appDbContextFetch.SaveChangesAsync();

            using var appDbContextAssert = new AppDbContext(Options);
            locationFromDb = await appDbContextAssert.Locations.Where(e => e.Id == locationId).SingleOrDefaultAsync();
            
            Assert.Equal("qwerty street", locationFromDb.Address);
            Assert.Equal("NY", locationFromDb.State);
        }


    }
}
