using AutoMapper;
using Happnin.Business.Dto;
using Happnin.Data;
using Friendship = Happnin.Business.Dto.Friendship;

namespace Happnin.Business.Services
{
    public class FriendshipService : EntityService<Friendship, FriendshipInput, Data.Friendship>, IFriendshipService
    {
        public FriendshipService(AppDbContext applicationDbContext, IMapper mapper) : base(applicationDbContext, mapper)
        {
        }
    }
}
