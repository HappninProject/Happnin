using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Happnin.Business.Dto;
using Happnin.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.JSInterop.Infrastructure;
using User = Happnin.Data.User;

namespace Happnin.Business.Services
{
    public class UserService : IUserService
    {
        protected AppDbContext ApplicationDbContext { get; }
        protected IMapper Mapper { get; }
        protected virtual IQueryable<User> Query => ApplicationDbContext.Set<User>();

       public UserService(AppDbContext applicationDbContext, IMapper mapper)
        {
            ApplicationDbContext =
                applicationDbContext ?? throw new ArgumentNullException(nameof(applicationDbContext));
            Mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }

        public async Task<bool> DeleteAsync(string id)
        {
            bool deleted = false;

            User entity = await Query.FirstOrDefaultAsync(x => x.Id == id);
            if (entity is { })
            {
                var entityFromDb = ApplicationDbContext.Set<User>().Remove(entity);
                deleted = entityFromDb.State == EntityState.Deleted;
            }

            await ApplicationDbContext.SaveChangesAsync();

            return deleted;
        }

        virtual public async Task<List<Dto.User>> FetchAllAsync()
        {
            return Mapper.Map<List<User>, List<Dto.User>>(await Query.ToListAsync());
        }

        virtual public async Task<Dto.User> FetchByIdAsync(string id)
        {
            return Mapper.Map<User, Dto.User>(await Query.FirstOrDefaultAsync(x => x.Id == id));
        }

        virtual public async Task<Dto.User> InsertAsync(UserInput dto)
        {
            User entity = Mapper.Map<UserInput, User>(dto);
            ApplicationDbContext.Add(entity);
            await ApplicationDbContext.SaveChangesAsync();
            return Mapper.Map<User, Dto.User>(entity);
        }

        virtual public async Task<Dto.User> UpdateAsync(string id, UserInput entity)
        {
            if (await Query.FirstOrDefaultAsync(x => x.Id == id) is User result)
            {
                Mapper.Map(entity, result);
                await ApplicationDbContext.SaveChangesAsync();
                return Mapper.Map<User, Dto.User>(result);
            }

            return null;
        }
    }
}

