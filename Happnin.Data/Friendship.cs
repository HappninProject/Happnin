using System;
using System.Collections.Generic;
using System.Text;

namespace Happnin.Data
{
    public class Friendship : EntityBase
    {
        private string _userId;

        public string UserId
        {
            get => _userId;
            set
            {
                if (!string.IsNullOrEmpty(value))
                {
                    _userId = value;
                }
                else
                {
                    throw new ArgumentException("UserId was null or empty", nameof(UserId));
                }
            }
        }

        public User User { get; set; }
        
        private string _friendId;
        public string FriendId
        {
            get => _friendId;
            set
            {
                if (!string.IsNullOrEmpty(value))
                {
                    _friendId = value;
                }
                else
                {
                    throw new ArgumentException("FriendId was null or empty",nameof(FriendId));
                }
            }
        }
       
        //0 pending, 1 accepted
        public int Status { get; set; }

        public User Friend { get; set; }

    }
}
