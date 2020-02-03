using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Xunit;

namespace Happnin.Data.Tests
{
    public class UserTests : BaseTest
    {
        [Fact]
        public void User_Create_Success()
        {
            var user = new User(SampleData.Kyle, SampleData.Smith,
                SampleData.Email, SampleData.Location1234Spokane());

            Assert.Equal(SampleData.Kyle, user.FirstName);
            Assert.Equal(SampleData.Smith, user.LastName);
            Assert.Equal(SampleData.Email, user.Email);
            Assert.Equal(SampleData.Street, user.Location.Address);
            Assert.Equal(SampleData.City, user.Location.City);
            Assert.Equal(SampleData.State, user.Location.State);
            Assert.Equal(SampleData.Country, user.Location.Country);
            Assert.Equal(SampleData.ZipCode, user.Location.ZipCode);
        }

        [Fact]
        public void User_FirstNameNull_Exception()
        {
            Action act = () => new User(null, SampleData.Smith, SampleData.Email,SampleData.Location1234Spokane());

            Assert.Throws<ArgumentNullException>(act);
        }
        
        [Fact]
        public void User_LastNameNull_Exception()
        {
            Action act = () => new User(SampleData.Kyle, null, SampleData.Email, SampleData.Location1234Spokane());

            Assert.Throws<ArgumentNullException>(act);
        }

        [Fact]
        public void User_EmailNull_Exception()
        {
            Action act = () => new User(SampleData.Kyle, SampleData.Smith, null, SampleData.Location1234Spokane());

            Assert.Throws<ArgumentNullException>(act);
        }

        [Fact]
        public void User_LocationNull_Exception()
        {
            Action act = () => new User(SampleData.Kyle, SampleData.Smith, SampleData.Email, null);

            Assert.Throws<ArgumentNullException>(act);
        }

        [Fact]
        public void User_AddFriends_Success()
        {
            User kyle = SampleData.UserKyle();
            User caleb = SampleData.UserCaleb();

            bool added = kyle.AddFriend(caleb);

            Assert.True(added);
            Assert.Collection(kyle.Friends, friend => Assert.Equal(caleb.FirstName, friend.FirstName));
            Assert.Collection(caleb.Friends, friend => Assert.Equal(kyle.FirstName, friend.FirstName));
        }

        [Fact]
        public void User_AddFriendNull_ReturnsFalse()
        {
            User kyle = SampleData.UserKyle();

            bool added = kyle.AddFriend(null);

            Assert.False(added);
            Assert.Empty(kyle.Friends);
        }

        [Fact]
        public async Task Create_User_DatabaseShouldSaveIt()
        {
            var userId = -1;
            User user = SampleData.UserKyle();

            using var appDbContext = new AppDbContext(Options);
            appDbContext.Users.Add(user);
            await appDbContext.SaveChangesAsync();
            userId = user.Id!.Value;

            using var appDbContextAssert = new AppDbContext(Options);
            User userFromDb = await appDbContextAssert.Users.Where(e => e.Id == userId).SingleOrDefaultAsync();

            Assert.NotNull(userFromDb);
            Assert.Equal(SampleData.Kyle, userFromDb.FirstName);
            Assert.Equal(SampleData.Smith, userFromDb.LastName);
            Assert.Equal(SampleData.Email, userFromDb.Email);
        }
        
        [Fact]
        public async Task Fetch_User_DatabaseShouldReturnItWithLocation()
        {
            var userId = -1;
            User user = SampleData.UserKyle();

            using var appDbContext = new AppDbContext(Options);
            appDbContext.Users.Add(user);
            await appDbContext.SaveChangesAsync();
            userId = user.Id!.Value;

            using var appDbContextAssert = new AppDbContext(Options);
            User userFromDb = await appDbContextAssert.Users.Include(e => e.Location)
                .Include(e => e.Location).Where(e => e.Id == userId).SingleOrDefaultAsync();
            
            Assert.NotNull(userFromDb);
            Assert.Equal(SampleData.Kyle, userFromDb.FirstName);
            Assert.Equal(SampleData.Smith, userFromDb.LastName);
            Assert.Equal(SampleData.Email, userFromDb.Email);
            Assert.Equal(user.Location.Id, userFromDb.Location.Id);
            Assert.Equal(user.Location.Address, userFromDb.Location.Address);
            Assert.Equal(user.Location.City, user.Location.City);
        }

        [Fact]
        public async Task Update_UserUpdated_SavedToDatabase()
        {
            var userId = -1;
            User user = SampleData.UserKyle();
            using var appDbContext = new AppDbContext(Options);
            appDbContext.Users.Add(user);
            await appDbContext.SaveChangesAsync();
            userId = user.Id!.Value;

            using var appDbContextFetch = new AppDbContext(Options);
            User userFromDb = await appDbContextFetch.Users.Include(e => e.Location)
                .Where(e => e.Id == userId).SingleOrDefaultAsync();
            userFromDb.FirstName = "Updated";
            userFromDb.Email = "newEmail@main.com";
            await appDbContextFetch.SaveChangesAsync();
            

            using var appDbContextAssert = new AppDbContext(Options);
            userFromDb = await appDbContextAssert.Users.Include(e => e.Location)
                .Where(e => e.Id == userId).SingleOrDefaultAsync();
        
            Assert.Equal("Updated", userFromDb.FirstName);
            Assert.Equal("newEmail@main.com", userFromDb.Email);
            Assert.Equal(userId, userFromDb.Id);
        }


    }
}
