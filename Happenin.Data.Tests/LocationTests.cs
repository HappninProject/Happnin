using System;
using System.Collections.Generic;
using System.Text;
using Xunit;

namespace Happenin.Data.Tests
{ 
    public class LocationTests
    {
        [Fact]
        public void Location_CreateLocation_Success()
        {
            var location = new Location(SampleData.Street, SampleData.City, SampleData.State, SampleData.ZipCode);

            Assert.Equal(SampleData.Street, location.Address);
            Assert.Equal(SampleData.City, location.City);
            Assert.Equal(SampleData.State, location.State);
            Assert.Equal(SampleData.ZipCode, location.ZipCode);
        }
        
        [Fact]
        public void Create_NullAddress_ThrowsException()
        {
            Action act = () => new Location(null, SampleData.City, SampleData.State, SampleData.ZipCode);

            Assert.Throws<ArgumentNullException>(act);
        }
 
        [Fact]
        public void Create_NullCity_ThrowsException()
        {
            Action act = () => new Location(SampleData.Street, null, SampleData.State, SampleData.ZipCode);

            Assert.Throws<ArgumentNullException>(act);
        }
         
        [Fact]
        public void Create_NullState_ThrowsException()
        {
            Action act = () => new Location(SampleData.Street, SampleData.City, null, SampleData.ZipCode);

            Assert.Throws<ArgumentNullException>(act);
        }

        [Fact]
        public void Create_NullZipCode_ThrowsException()
        {
            Action act = () => new Location(SampleData.Street,SampleData.City, SampleData.State, null);

            Assert.Throws<ArgumentNullException>(act);
        }
 
    }
}
