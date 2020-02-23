using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace Happnin.Data
{
    public class User : IdentityUser<int>, IEntityBase
    {
        private string _firstName; 
        public string FirstName
        {
            get => _firstName;
            set => _firstName = value ?? throw new ArgumentNullException(nameof(FirstName));
        }
        
        private string _lastName;
        public string LastName
        {
            get => _lastName;
            set => _lastName =  value ?? throw new ArgumentNullException(nameof(LastName));
        }

        public int LocationId { get; set; }
        private Location _location;

        public Location Location
        {
            get => _location;
            set => _location = value ?? throw new ArgumentNullException(nameof(Location));
        }

        public List<User> Friends { get; } = new List<User>();

        public User(string firstName, string lastName, Location location) 
            : this(firstName, lastName)
        {
            Location = location;
        }

        private User(string firstName, string lastName)
        {
            FirstName = firstName;
            LastName = lastName;
        }

        public bool AddFriend(User friend)
        {
            bool added = false;
            if (friend != null)
            {
                Friends.Add(friend);
                friend.Friends.Add(this);
                added = true;
            }

            return added;
        }


    }
}
