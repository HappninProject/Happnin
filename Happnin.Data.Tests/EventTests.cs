using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Xunit;

namespace Happnin.Data.Tests
{
    public class EventTests : BaseTest
    {
        [Fact]
        public void Event_Create_Success() 
        {
            var eventHappenin = new Event(SampleData.Party, SampleData.Description,SampleData.Category, SampleData.EventTime, SampleData.EndTime, SampleData.Cost, SampleData.AgeRestriction , SampleData.UserKyle(), SampleData.Location1234Spokane());

            Assert.Equal(SampleData.Party, eventHappenin.Name);
            Assert.Equal(SampleData.Description, eventHappenin.Description);
            Assert.Equal(SampleData.Location1234Spokane().City, eventHappenin.Location.City);
            Assert.Equal(SampleData.Kyle, eventHappenin.Host.FirstName);
            Assert.Equal(SampleData.EventTime, eventHappenin.EventTime);
            Assert.Equal(SampleData.Cost, eventHappenin.Cost);
            Assert.Equal(SampleData.AgeRestriction, eventHappenin.AgeRestriction);
        }

        [Fact]
        public void Event_NameNull_ThrowsException()
        {
            Action act = () => new Event(null, SampleData.Description, SampleData.Category, SampleData.EventTime, SampleData.EndTime, SampleData.Cost, SampleData.AgeRestriction , SampleData.UserKyle(), SampleData.Location1234Spokane());

            Assert.Throws<ArgumentNullException>(act);
        }

        [Fact]
        public void Event_DescriptionNull_ThrowsException()
        {
            Action act = () => new Event(SampleData.Party, null, SampleData.Category,  SampleData.EventTime, SampleData.EndTime, SampleData.Cost, SampleData.AgeRestriction , SampleData.UserKyle(), SampleData.Location1234Spokane());

            Assert.Throws<ArgumentNullException>(act);
        }

        [Fact]
        public void Event_LocationNull_ThrowsException()
        {
            Action act = () => new Event(SampleData.Party, SampleData.Description, SampleData.Category, SampleData.EventTime, SampleData.EndTime, SampleData.Cost, SampleData.AgeRestriction , SampleData.UserKyle(), null);
            
            Assert.Throws<ArgumentNullException>(act);
        }

        [Fact]
        public void Event_UserNull_ThrowsException()
        {
            Action act = () => new Event(SampleData.Party, SampleData.Description, SampleData.Category, SampleData.EventTime, SampleData.EndTime, SampleData.Cost, SampleData.AgeRestriction , null, SampleData.Location1234Spokane());

            Assert.Throws<ArgumentNullException>(act);
        }

        [Fact]
        public void Event_AddAttendees_Success()
        {
            Event eventHappenin = SampleData.EventParty();
            User kyle = SampleData.UserKyle();
            User caleb = SampleData.UserCaleb();

            bool addedKyle = eventHappenin.AddAttendee(kyle);
            bool addedCaleb =eventHappenin.AddAttendee(caleb);

            Assert.True(addedKyle);
            Assert.True(addedCaleb);
            Assert.Collection(eventHappenin.Attendees, 
                attendee => Assert.Equal(SampleData.Kyle, attendee.FirstName),
                attendee => Assert.Equal(SampleData.Caleb, attendee.FirstName));
        }

        [Fact]
        public void Event_AddNullAttendee_ShouldReturnFalse()
        {
            Event eventHappenin = SampleData.EventParty();

            bool added = eventHappenin.AddAttendee(null);

            Assert.False(added);
            Assert.Empty(eventHappenin.Attendees);
        }

        [Fact]
        public async Task Create_Event_DatabaseShouldSaveIt()
        {
            var eventId = -1;
            Event eventHappenin = SampleData.EventParty();

            using var appDbContext = new AppDbContext(Options);
            appDbContext.Events.Add(eventHappenin);
            await appDbContext.SaveChangesAsync();
            eventId = eventHappenin.Id;

            using var appDbContextAssert = new AppDbContext(Options);
            Event eventFromDb = await appDbContextAssert.Events.Where(e => e.Id == eventId).SingleOrDefaultAsync();

            Assert.Equal(eventHappenin.Name, eventFromDb.Name);
            Assert.Equal(eventHappenin.Description, eventFromDb.Description);
            Assert.Equal(eventHappenin.AgeRestriction, eventFromDb.AgeRestriction);
            Assert.Equal(eventHappenin.Cost, eventFromDb.Cost);
        }
        [Fact]
        public async Task Fetch_Event_DatabaseShouldReturnItWithUserAndLocation()
        {
            var eventId = -1;
            Event eventHappenin = SampleData.EventParty();

            using var appDbContext = new AppDbContext(Options);
            appDbContext.Events.Add(eventHappenin);
            await appDbContext.SaveChangesAsync();
            eventId = eventHappenin.Id;

            using var appDbContextAssert = new AppDbContext(Options);
            Event eventFromDb = await appDbContextAssert.Events.Include(e => e.Host)
                .Include(e => e.Location).Where(e => e.Id == eventId).SingleOrDefaultAsync();

            Assert.Equal(eventHappenin.Name, eventFromDb.Name);
            Assert.Equal(eventHappenin.Description, eventFromDb.Description);
            Assert.Equal(eventHappenin.AgeRestriction, eventFromDb.AgeRestriction);
            Assert.Equal(eventHappenin.Cost, eventFromDb.Cost);
            Assert.NotNull(eventFromDb.Host);
            Assert.Equal(eventHappenin.Host.FirstName, eventFromDb.Host.FirstName);
            Assert.Equal(eventHappenin.Host.LastName, eventFromDb.Host.LastName);
            Assert.NotNull(eventFromDb.Location);
            Assert.Equal(eventHappenin.Location.Id, eventFromDb.Location.Id);
            Assert.Equal(eventHappenin.Location.Address, eventFromDb.Location.Address);
            Assert.Equal(eventHappenin.Location.City, eventHappenin.Location.City);
        }

        [Fact]
        public async Task Update_EventUpdated_SavedToDatabase()
        {
            var eventId = -1;
            Event eventHappenin = SampleData.EventParty();
            using var appDbContext = new AppDbContext(Options);
            appDbContext.Events.Add(eventHappenin);
            await appDbContext.SaveChangesAsync();
            eventId = eventHappenin.Id;

            using var appDbContextFetch = new AppDbContext(Options);
            Event eventFromDb = await appDbContextFetch.Events.Include(e => e.Host)
                .Include(e => e.Location).Where(e => e.Id == eventId).SingleOrDefaultAsync();
            eventFromDb.Cost = 12.00;
            eventFromDb.Host = SampleData.UserCaleb();
            await appDbContextFetch.SaveChangesAsync();

            using var appDbContextAssert = new AppDbContext(Options);
            eventFromDb = await appDbContextAssert.Events.Include(e => e.Host)
                .Include(e => e.Location).Where(e => e.Id == eventId).SingleOrDefaultAsync();
        
            Assert.Equal(12.00, eventFromDb.Cost);
            Assert.Equal(SampleData.Caleb, eventFromDb.Host.FirstName);
            Assert.Equal(eventId, eventFromDb.Id);
        }

    }
}
