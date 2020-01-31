using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Happnin.Data.Tests
{
    public static class SampleData
    {
        public const string Kyle = "Kyle";
        public const string Smith = "Smith";
        public const string Email = "e@mail.com";

        public static User UserKyle() => new User(Kyle, Smith, Email,Location1234Spokane());

        public const string Caleb = "Caleb";
        public const string Walsh = "Walsh";
        public const string CalebEmail = "Caleb@mail.com";

        public static User UserCaleb() => new User(Caleb, Walsh, CalebEmail, Location3456Spokane());

        public const string Street = "1234 street"; 
        public const string City = "Spokane";
        public const string State = "WA";
        public const string Country = "United States of America";
        public const string ZipCode = "99004";

        public static Location Location1234Spokane() => new Location(Street, City, State, Country, ZipCode);

        public const string DifferentStreet = "3456 lane";
        public const string DifferentCity = "Spokane";

        public static Location Location3456Spokane() => new Location(DifferentStreet, DifferentCity, State, Country, ZipCode);

        public const string Party = "Party";
        public const string Description = "a party";
        public static DateTime EventTime = DateTime.MaxValue;
        public const double Cost = 1.5;
        public const int AgeRestriction = 42;

        public static Event EventParty() => 
            new Event(Party, Description, EventTime, Cost, AgeRestriction, UserKyle(), Location1234Spokane());

        public const string Festival = "Festival";
        public const string FestivalDescription = "a nice festival";
        public const double FestivalCost = 15.00;
        public const int AgeRestrictionFestival = 16;
        public static Event EventFestival() => 
            new Event(Festival, FestivalDescription, EventTime, FestivalCost, AgeRestrictionFestival, UserCaleb(), Location3456Spokane());

    }
}
