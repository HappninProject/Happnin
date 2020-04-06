using AutoMapper;
using Happnin.Business;
using Happnin.Business.Dto;
using Happnin.Business.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Logging;

namespace Happnin.Controllers
{
    [Route("api/User")]
    [ApiController]
    public class UserController : ControllerBase
    {
        public UserManager<Data.User> UserManager { get; }
        public SignInManager<Data.User> SignInManager { get; }
        protected IUserService Service { get; }
        public IMapper Mapper { get; } =  AutomapperProfileConfiguration.CreateMapper();

        private ILogger Logger { get; }

        public UserController(IUserService service,
            UserManager<Data.User> userManager, 
            SignInManager<Data.User> signInManager, 
            ILogger<UserController> logger)
        {
            Service = service;
            UserManager = userManager;
            SignInManager = signInManager;
            Logger = logger;
        }

        [HttpGet]
        public async Task<IEnumerable<User>> Get() => await Service.FetchAllAsync();

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesDefaultResponseType]
        public async Task<IActionResult> Get(string id)
        {
            Business.Dto.User entity = await Service.FetchByIdAsync(id);
            if (entity is null)
            {
                return NotFound();
            }

            return Ok(entity);
        }

        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesDefaultResponseType]
        public async Task<ActionResult<Business.Dto.User>> Put(string id, UserInput input)
        {
            if (await Service.UpdateAsync(id, input) is Business.Dto.User dto)
            {
                return Ok(dto);
            }

            return NotFound();
        }

        [HttpDelete]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesDefaultResponseType]
        public async Task<IActionResult> Delete(string id)
        {
            return await Service.DeleteAsync(id) ? (IActionResult) Ok() : NotFound();
        } 

        public async Task<User> Post(UserInput userInput)
        {
            Data.User user = Mapper.Map<UserInput,Data.User>(userInput);
            var result = await UserManager.CreateAsync(user, userInput.Password);

            if (result.Succeeded)
            {
                var token = UserManager.GenerateEmailConfirmationTokenAsync(user);
                var confirmationLink = Url.Action("ConfirmEmail", "User", new {userId = user.Id, token = token});

                Logger.Log(LogLevel.Warning, confirmationLink);

                await SignInManager.SignInAsync(user, false);
            }

            return await Task.FromResult(Mapper.Map<Data.User, User>(user));
        }

        [AllowAnonymous]
        public async Task<IActionResult> ConfirmEmail(string userId, string token)
        {
            if (userId == null || token == null)
            {
            }

            var user = await UserManager.FindByIdAsync(userId);
            if (user == null)
            {
            }

            var result = await UserManager.ConfirmEmailAsync(user, token);
            if (result.Succeeded)
            {
            }

            return null;
        }

        [HttpPost]
        [Route("SignOn")]
        public async Task<bool> SignOn(UserInput user)
        {
            var result = await SignInManager.PasswordSignInAsync(user.UserName, user.Password, false, false);
            if (result.Succeeded)
            {
                return true;
            }
            return false;
        }
    }
}