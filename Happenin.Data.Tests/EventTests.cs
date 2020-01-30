using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Xunit;

namespace Happenin.Data.Tests
{
    public class EventTests : BaseTest
    {
        [Fact]
        public void Event_Create_Success()
        {
            var eventHappenin = new Event(SampleData.Party, SampleData.Description, SampleData.EventTime, SampleData.Cost, SampleData.AgeRestriction , SampleData.UserKyle(), SampleData.Location1234Spokane());

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
            Action act = () => new Event(null, SampleData.Description, SampleData.EventTime, SampleData.Cost, SampleData.AgeRestriction , SampleData.UserKyle(), SampleData.Location1234Spokane());

            Assert.Throws<ArgumentNullException>(act);
        }

        [Fact]
        public void Event_DescriptionNull_ThrowsException()
        {
            Action act = () => new Event(SampleData.Party, null, SampleData.EventTime, SampleData.Cost, SampleData.AgeRestriction , SampleData.UserKyle(), SampleData.Location1234Spokane());

            Assert.Throws<ArgumentNullException>(act);
        }

        [Fact]
        public void Event_LocationNull_ThrowsException()
        {
            Action act = () => new Event(SampleData.Party, SampleData.Description, SampleData.EventTime, SampleData.Cost, SampleData.AgeRestriction , SampleData.UserKyle(), null);
            
            Assert.Throws<ArgumentNullException>(act);
        }

        [Fact]
        public void Event_UserNull_ThrowsException()
        {
            Action act = () => new Event(SampleData.Party, SampleData.Description, SampleData.EventTime, SampleData.Cost, SampleData.AgeRestriction , null, SampleData.Location1234Spokane());

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

        
    }
}
