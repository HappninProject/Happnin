using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;
using Xunit;

namespace Happnin.Data.Tests
{
    public class UserTests : BaseTest
    {
        [Fact]
        public void User_Create_Success()
        {
            var user = new User(SampleData.Kyle, SampleData.Smith)
            {
                Email = "kyle@website.com"
            };

            Assert.Equal(SampleData.Kyle, user.FirstName);
            Assert.Equal(SampleData.Smith, user.LastName);
            Assert.Equal("kyle@website.com", user.Email);
        }

       
        [Fact]
        public void User_FirstNameNull_Exception()
        {
            Action act = () => new User(null, SampleData.Smith);
            
            Assert.Throws<ArgumentNullException>(act);
        }
        
        [Fact]
        public void User_LastNameNull_Exception()
        {
            Action act = () => new User(SampleData.Kyle, null);

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
            var userId = "";
            User user = SampleData.UserKyle();

            using var appDbContext = new AppDbContext(Options, null);
            appDbContext.Users.Add(user);
            await appDbContext.SaveChangesAsync();
            userId = user.Id!;

            using var appDbContextAssert = new AppDbContext(Options, null);
            User userFromDb = await appDbContextAssert.Users.Where(e => e.Id == userId).SingleOrDefaultAsync();

            Assert.NotNull(userFromDb);
            Assert.Equal(SampleData.Kyle, userFromDb.FirstName);
            Assert.Equal(SampleData.Smith, userFromDb.LastName);
        }
        

        [Fact]
        public async Task Update_UserUpdated_SavedToDatabase()
        {
            var userId = "";
            User user = SampleData.UserKyle();
            using var appDbContext = new AppDbContext(Options, null);
            appDbContext.Users.Add(user);
            await appDbContext.SaveChangesAsync();
            userId = user.Id!;

            using var appDbContextFetch = new AppDbContext(Options, null);
            User userFromDb = await appDbContextFetch.Users.Where(e => e.Id == userId).SingleOrDefaultAsync();
            userFromDb.FirstName = "Updated";
            userFromDb.Email = "newEmail@main.com";
            await appDbContextFetch.SaveChangesAsync();
            

            using var appDbContextAssert = new AppDbContext(Options, null);
            userFromDb = await appDbContextAssert.Users.Where(e => e.Id == userId).SingleOrDefaultAsync();
        
            Assert.Equal("Updated", userFromDb.FirstName);
            Assert.Equal("newEmail@main.com", userFromDb.Email);
            Assert.Equal(userId, userFromDb.Id);
        }


    }
}
