using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Text;

namespace Happenin.Data
{
    public class Event : EntityBase
    {
        private string _name;

        public string Name
        {
            get => _name; 
            set => _name = value ?? throw new ArgumentNullException(nameof(Name));
        }
        private string _description;

        public string Description
        {
            get => _description; 
            set => _description = value ?? throw new ArgumentNullException(nameof(Description));
        }
        private Location _location;

        public Location Location
        {
            get => _location; 
            set => _location = value ?? throw  new ArgumentNullException(nameof(Location));
        }
        private User _host;

        public User Host
        {
            get => _host; 
            set => _host = value ?? throw new ArgumentNullException(nameof(Host));
        }
        public DateTime EventTime { get; set; }
        public double Cost { get; set; }
        public int AgeRestriction { get; set; }
        public List<User> Attendees { get;  } = new List<User>();

        public Event(string name, string description, Location location, 
            User host, DateTime eventTime, double cost, int ageRestriction)
        {
            Name = name;
            Description = description;
            Location = location;
            Host = host;
            EventTime = eventTime;
            Cost = cost;
            AgeRestriction = ageRestriction;
        }

        public bool AddAttendee(User attendee)
        {
            bool added = false;
            
            if (attendee != null)
            {
                Attendees.Add(attendee);
                added = true;
            }

            return added;
        }
    }
}
