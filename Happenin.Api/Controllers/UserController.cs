using Happnin.Business.Dto;
using Happnin.Business.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using AutoMapper;
using Happnin.Business;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Happnin.Api.Controllers
{
    [Route("api/User")]
    [ApiController]
    public class UserController : BaseController<User, UserInput>
    {
        public UserManager<Data.User> UserManager { get; }
        public SignInManager<Data.User> SignInManager { get; }
        public IMapper Mapper { get; } =  AutomapperProfileConfiguration.CreateMapper();

        public UserController(IUserService service, UserManager<Data.User> userManager, SignInManager<Data.User> signInManager): base(service)
        {
            UserManager = userManager;
            SignInManager = signInManager;
        }

        public override async Task<User> Post(UserInput userInput)
        {
            if (ModelState.IsValid)
            {
                Data.User user = Mapper.Map<UserInput,Data.User>(userInput);
                var result = await UserManager.CreateAsync(user, userInput.Password);

                if (result.Succeeded)
                {
                    await SignInManager.SignInAsync(user, false);
                }

                return await Task.FromResult(Mapper.Map<Data.User, User>(user));
            }

            return await Task.FromResult<User>(null);
        }
        [HttpPost]
        [Route("SignOn")]
        public async Task<bool> SignOn(string username, string password)
        {
            var result = await SignInManager.PasswordSignInAsync(username, password, false, false);
            if (result.Succeeded)
            {
                return true;
            }

            return false;
        }
    }
}