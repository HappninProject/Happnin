using Happnin.Business.Dto;
using Happnin.Business.Services;
using Microsoft.AspNetCore.Mvc;

namespace Happnin.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FriendshipController : BaseController<Friendship, FriendshipInput>
    {
        public FriendshipController(IFriendshipService service) : base(service)
        {
        }
    }
}
