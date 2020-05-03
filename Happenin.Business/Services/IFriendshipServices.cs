using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Happnin.Business.Dto;

namespace Happnin.Business.Services
{
    public interface IFriendshipService : IEntityService<Friendship, FriendshipInput>
    {
        Task<List<Friendship>> FetchUserRequests(string id);
        Task<List<Friendship>> FetchRequestsForUser(string id);
    }
}
