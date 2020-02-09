using Happnin.Business.Dto;
using Happnin.Business.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace Happnin.Api.Controllers
{
    [Route("api/User")]
    [ApiController]
    public class UserController : BaseController<User, UserInput>
    {
        public UserController(IUserService service): base(service)
        {
        }
    }
}