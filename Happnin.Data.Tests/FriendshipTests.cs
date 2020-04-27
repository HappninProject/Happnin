using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Xunit;

namespace Happnin.Data.Tests
{
    public class FriendshipTests : BaseTest
    {
        [Fact]
        public void Create_Friendship_Success()
        {
            var userId = new Guid().ToString();
            var friendId = new Guid().ToString();
            var friendship = new Friendship
            {
                User = SampleData.UserKyle(), 
                Friend = SampleData.UserCaleb(), 
                FriendId = friendId, 
                UserId = userId
            };

            Assert.Equal((userId, friendId, SampleData.Kyle, SampleData.Caleb),
                       (friendship.UserId, friendship.FriendId, friendship.User.FirstName, friendship.Friend.FirstName));
        }

        [Fact]
        public void Create_Friendship_FriendIDNullFails()
        {
            Action act = () => new Friendship
            {
                User = SampleData.UserKyle(), 
                Friend = SampleData.UserCaleb(), 
                FriendId = null, 
                UserId = new Guid().ToString()
            };
            
            Assert.Throws<ArgumentException>(act);
        }

        [Fact]
        public void Create_Friendship_FriendIDEmptyFails()
        {
            Action act = () => new Friendship
            {
                User = SampleData.UserKyle(), 
                Friend = SampleData.UserCaleb(), 
                FriendId = "", 
                UserId = new Guid().ToString()
            };
            
            Assert.Throws<ArgumentException>(act);
        }
        
        [Fact]
        public void Create_Friendship_UserIDNullFails()
        {
            Action act = () => new Friendship
            {
                User = SampleData.UserKyle(), 
                Friend = SampleData.UserCaleb(), 
                FriendId = new Guid().ToString(), 
                UserId = null
            };
            
            Assert.Throws<ArgumentException>(act);
        }


        [Fact]
        public void Create_Friendship_UserIDEmptyFails()
        {
            Action act = () => new Friendship
            {
                User = SampleData.UserKyle(), 
                Friend = SampleData.UserCaleb(), 
                FriendId = new Guid().ToString(), 
                UserId = ""
            };
            
            Assert.Throws<ArgumentException>(act);
        }

        [Fact]
        public async Task CreateFriendShip_InDatabase_Success()
        {
            User kyle = SampleData.UserKyle();
            User caleb = SampleData.UserCaleb();
            Friendship friendship = new Friendship{User = kyle, Friend = caleb};

            using var appDbContext = new AppDbContext(Options, null);
            appDbContext.Users.Add(kyle);
            appDbContext.Users.Add(caleb);
            await appDbContext.SaveChangesAsync();
            friendship.FriendId = caleb.Id;
            friendship.UserId = kyle.Id;
            appDbContext.Friends.Add(friendship);
            await appDbContext.SaveChangesAsync();

            using var appDbAssert = new AppDbContext(Options, null);
            var friendshipDB = await appDbAssert.Friends.SingleOrDefaultAsync(f => f.Id == friendship.Id);
            Assert.Equal(friendship.Id, friendshipDB.Id);
            Assert.Equal(friendship.UserId, friendshipDB.UserId);
            Assert.Equal(friendship.FriendId, friendshipDB.FriendId);
        }
    }
}
