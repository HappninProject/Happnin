using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualStudio.TestPlatform.ObjectModel;
using Xunit;

namespace Happnin.Data.Tests
{
    public class AttendingTests : BaseTest
    {
        [Fact]
        public void Attending_Create_Success()
        {
            var eventId = 1;
            var userId = "123456-12345-12345-12345-12345";

            var attending = new Attending {EventId = eventId, UserId = userId};

            Assert.Equal(eventId, attending.EventId);
            Assert.Equal(userId, attending.UserId);
        }

        [Fact]
        public void Attending_UserIdNull_ThrowsException()
        {
            Action act = () => new Attending
            {
                EventId = 1,
                UserId = null
            };

            Assert.Throws<ArgumentNullException>(act);
        }

        [Fact]
        public void Attending_UserIdEmpty_ThrowsException()
        {
            Action act = () => new Attending
            {
                EventId = 1,
                UserId = ""
            };

            Assert.Throws<ArgumentNullException>(act);
        }

        [Fact]
        public async Task Create_Attending_DatabaseShouldSaveIt()
        {
            var userId = "NotReal";
            var eventId = 42;
            var attendingId = -1;
            Attending attending = new Attending{EventId = eventId, UserId = userId};

            using var appDbContext = new AppDbContext(Options, null);
            appDbContext.Attendees.Add(attending);
            await appDbContext.SaveChangesAsync();
            attendingId = attending.Id;

            using var assertDbContext = new AppDbContext(Options, null);
            Attending attendFromDb = await assertDbContext.Attendees.SingleOrDefaultAsync(a => a.Id == attendingId);
        
            Assert.Equal(userId, attendFromDb.UserId);
            Assert.Equal(eventId, attendFromDb.EventId);
        }


    }
}
