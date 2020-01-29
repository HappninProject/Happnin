using System;
using System.Collections.Generic;

namespace Happenin.Data
{
    public class User : EntityBase
    {
        private string _username; 
        public string FirstName
        {
            get => _username;
            set => _username = value ?? throw new ArgumentNullException(nameof(FirstName));
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

        // have to read up more about how to handle passwords in entity framework
        public string Password { get; set; } 
        public List<User> Friends { get; } = new List<User>();

        public User(string firstName, string lastName, string email)
        {
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
