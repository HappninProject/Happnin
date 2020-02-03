using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Happnin.Data;
using Microsoft.EntityFrameworkCore;
using SecretSanta.Business;

namespace Happenin.Business
{
    public class UserService : EntityService<User>, IUserService
    {
        public UserService(AppDbContext applicationDbContext, IMapper mapper) : base(applicationDbContext, mapper)
        {
        }

        public override async Task<User> UpdateAsync(int id, User entity)
        {
            User result = await ApplicationDbContext.Users.Include(u => u.Location).SingleAsync(item => item.Id == id);
            Mapper.Map(entity, result);
            await ApplicationDbContext.SaveChangesAsync();
            return result;
        }
    }
}
