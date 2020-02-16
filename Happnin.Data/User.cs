using System;
using System.Collections.Generic;

namespace Happnin.Data
{
    public class User : EntityBase
    {
        private string _userName;

        public string UserName
        {
            get => _userName;
            set => _userName = value ?? throw new ArgumentNullException(nameof(UserName));
        }
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

        private string _email;
        public string Email 
        { 
            get => _email;
            set => _email = value ?? throw new ArgumentNullException(nameof(LastName));
        }

        public int LocationId { get; set; }
        private Location _location;

        public Location Location
        {
            get => _location;
            set => _location = value ?? throw new ArgumentNullException(nameof(Location));
        }

        // have to read up more about how to handle passwords in entity framework
        public string Password { get; set; } 
        public List<User> Friends { get; } = new List<User>();

        public User(string userName, string firstName, string lastName, string email, Location location) 
            : this(userName, firstName, lastName, email)
        {
            Location = location;
        }

        private User(string userName, string firstName, string lastName, string email)
        {
            UserName = userName;
            FirstName = firstName;
            LastName = lastName;
            Email = email;
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
