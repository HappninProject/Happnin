using Happnin.Api.Controllers;
using Happnin.Business.Dto;
using Happnin.Business.Services;
using System;

namespace Happnin.Api.Tests.Controllers
{
    public class UserControllerTests : BaseControllerTests<IUserService, User, UserInput>
    {
        public override User CreateDto()
        {
            return new User
            {
                FirstName = Guid.NewGuid().ToString(),
                LastName = Guid.NewGuid().ToString(),
                Email = Guid.NewGuid().ToString(),
            };
        }

        public override BaseController<User, UserInput> GetController(IUserService service)
        {
            return new UserController(service);
        }
    }
}
