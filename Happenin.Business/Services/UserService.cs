using AutoMapper;
using Happnin.Data;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using Happnin.Business.Dto;
using User = Happnin.Data.User;

namespace Happnin.Business
{
    public class UserService : EntityService<Dto.User, UserInput, User>, IUserService
    {
        public UserService(AppDbContext applicationDbContext, IMapper mapper) : base(applicationDbContext, mapper)
        {
        }

        //    public override async Task<User> UpdateAsync(int id, User entity)
        //    {
        //        User result = await ApplicationDbContext.Users.Include(u => u.Location).SingleAsync(item => item.Id == id);
        //        Mapper.Map(entity, result);
        //        await ApplicationDbContext.SaveChangesAsync();
        //        return result;
        //    }
    }
}
