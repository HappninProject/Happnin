using System;
using System.Collections.Generic;
using System.Text;

namespace Happnin.Business.Dto
{
    public class Friendship : FriendshipInput, IEntity 
    {
        public int Id { get; set; }
    }

    public class FriendshipInput
    {
        public string UserId { get; set; }
        public string FriendId { get; set; }
    }
}
