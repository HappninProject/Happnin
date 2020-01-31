using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
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
        public async Task Create_Event_DatabaseShouldSaveIt()
        {
            var locationId = -1;
            Location location = SampleData.Location3456Spokane();

            using var appDbContext = new AppDbContext(Options);
            appDbContext.Location.Add(location);
            await appDbContext.SaveChangesAsync();
            locationId = location.Id!.Value;

            using var appDbContextAssert = new AppDbContext(Options);
            Location locationFromDb = await appDbContextAssert.Location.Where(e => e.Id == locationId).SingleOrDefaultAsync();

            Assert.Equal(location.Address, locationFromDb.Address);
            Assert.Equal(location.City, locationFromDb.City);
            Assert.Equal(location.State, locationFromDb.State);
            Assert.Equal(location.Country, locationFromDb.Country);
            Assert.Equal(location.ZipCode, locationFromDb.ZipCode);
        }

    }
}
