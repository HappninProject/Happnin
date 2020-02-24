using Happnin.Api.Controllers;
using Happnin.Business.Dto;
using Happnin.Business.Services;
using System;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Moq;
using Xunit;

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
            return new UserController(service, null, null);
        }

        //TODO fix this test
        public override async Task Post_ValidItem_Inserted()
        {
            //User dto = CreateDto();
            //var entityInput = Mapper.Map<User, UserInput>(dto); 
            //var service = new Mock<IUserService>();
            //var userManager = new Mock<UserManager<Data.User>>();
            //var signInManager = new Mock<SignInManager<Data.User>>();
            //service.Setup(service => service.InsertAsync(entityInput))
            //    .Returns(Task.FromResult(dto));
            //var controller = new UserController(service.Object, userManager.Object, signInManager.Object);
            
            //var result = await controller.Post(entityInput);

            //Assert.Equal(dto, result); 
        }
    }
}
