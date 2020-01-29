using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Happenin.Data.Tests
{
    public static class SampleData
    {
        public const string Kyle = "Kyle";
        public const string Smith = "Smith";
        public const string Email = "e@mail.com";

        public static User UserKyle() => new User(Kyle, Smith, Email);

        public const string Caleb = "Caleb";
        public const string Walsh = "Walsh";
        public const string CalebEmail = "Caleb@mail.com";

        public static User UserCaleb() => new User(Caleb, Walsh, CalebEmail);

        public const string Street = "1234 street"; 
        public const string City = "Spokane";
        public const string State = "WA";
        public const string ZipCode = "99004";

        public static Location Location1234Spokane() => new Location(Street,City, State, ZipCode);

        public const string Party = "Party";
        public const string Description = "a party";
        public static DateTime EventTime = DateTime.MaxValue;
        public const double Cost = 1.5;
        public const int AgeRestriction = 42;

        public static Event EventParty() => 
            new Event(Party, Description, Location1234Spokane(),UserKyle(), EventTime, Cost, AgeRestriction);
        

    }
}
