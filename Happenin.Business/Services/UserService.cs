using AutoMapper;
using Happnin.Business.Dto;
using Happnin.Data;
using User = Happnin.Data.User;

namespace Happnin.Business.Services
{
    public class UserService : EntityService<Dto.User, UserInput, User>, IUserService
    {
        public UserService(AppDbContext applicationDbContext, IMapper mapper) : base(applicationDbContext, mapper)
        {
        }
    }
}
