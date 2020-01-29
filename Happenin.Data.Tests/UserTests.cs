using System;
using Xunit;

namespace Happenin.Data.Tests
{
    public class UserTests
    {
        [Fact]
        public void User_Create_Success()
        {
            var user = new User(SampleData.Kyle, SampleData.Smith, SampleData.Email);

            Assert.Equal(SampleData.Kyle, user.FirstName);
            Assert.Equal(SampleData.Smith, user.LastName);
            Assert.Equal(SampleData.Email, user.Email);
        }

        [Fact]
        public void User_FirstNameNull_Exception()
        {
            Action act = () => new User(null, SampleData.Smith, SampleData.Email);

            Assert.Throws<ArgumentNullException>(act);
        }
        
        [Fact]
        public void User_LastNameNull_Exception()
        {
            Action act = () => new User(SampleData.Kyle, null, SampleData.Email);

            Assert.Throws<ArgumentNullException>(act);
        }

        [Fact]
        public void User_EmailNull_Exception()
        {
            Action act = () => new User(SampleData.Kyle, SampleData.Smith, null);

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


    }
}
