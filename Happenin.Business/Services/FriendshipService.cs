using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata.Ecma335;
using System.Threading.Tasks;
using System.Transactions;
using AutoMapper;
using Happnin.Business.Dto;
using Happnin.Data;
using Happnin.Data.Migrations;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Microsoft.JSInterop.Infrastructure;
using Friendship = Happnin.Business.Dto.Friendship;

namespace Happnin.Business.Services
{
    public class FriendshipService : EntityService<Friendship, FriendshipInput, Data.Friendship>, IFriendshipService
    {
        public FriendshipService(AppDbContext applicationDbContext, IMapper mapper) : base(applicationDbContext, mapper)
        {
        }

        public override async Task<Friendship> InsertAsync(FriendshipInput dto)
        {
            if (dto.UserId == dto.FriendId)
            {
                return null;
            }

            var friendship = await Query.SingleOrDefaultAsync(u => 
                                    (u.UserId == dto.UserId  || u.UserId == dto.FriendId) 
                                     && (u.FriendId == dto.UserId  || u.FriendId == dto.FriendId));
            if (friendship == null)
            {
                return await base.InsertAsync(dto);
            }
            else
            {
                return Mapper.Map<Data.Friendship, Dto.Friendship>(friendship);
            }
        }

        public Task<List<Friendship>> FetchUserRequests(string id)
        {
            var requests = Query.Where(u => u.UserId == id);
            var list = requests.ToList();
            return Task.FromResult(MapList(list));
        }

        public Task<List<Friendship>> FetchRequestsForUser(string id)
        {
            var requests = Query.Where(u => u.FriendId == id);
            var list = requests.ToList();
            return Task.FromResult(MapList(list));
        }

        private List<Dto.Friendship> MapList(List<Data.Friendship> dataList)
        {
            var dtoList = new List<Dto.Friendship>();
            foreach (var f in dataList)
            {
                dtoList.Add(Mapper.Map<Data.Friendship, Dto.Friendship>(f));
            }

            return dtoList;
        }
    }
}
