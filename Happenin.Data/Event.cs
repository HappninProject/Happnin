﻿using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Text;

namespace Happenin.Data
{
    public class Event
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
        public int LocationId { get; set; }
        private Location _location;
        public Location Location
        {
            get => _location; 
            set => _location = value ?? throw  new ArgumentNullException(nameof(Location));
        }
        public int HostId { get; set; }
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

        public Event(string name, string description, DateTime eventTime,
             double cost, int ageRestriction,User host, Location location) 
            : this(name, description, eventTime, cost, ageRestriction, location.Id!.Value, host.Id.Value)
        {
            Location = location;
            Host = host;
        }

        private Event(string name, string description, DateTime eventTime, double cost, int ageRestriction, int locationId, int userId)
        {
            Name = name;
            Description = description;
            EventTime = eventTime;
            Cost = cost;
            AgeRestriction = ageRestriction;
        }

        private Event(){}

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
