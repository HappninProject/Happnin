using Happnin.Business.Dto;
using Happnin.Business.Services;
using Happnin.Controllers;
using System;
using Microsoft.AspNetCore.Mvc;

namespace Happnin.Tests.Controllers
{
    [Route("api/FriendShip")]
    [ApiController]
    public class FriendshipControllerTests : BaseControllerTests<IFriendshipService, Friendship, FriendshipInput>
    {
        public override Friendship CreateDto()
        {
            return new Friendship
            {
                UserId = new Guid().ToString(),
                FriendId = new Guid().ToString()
            };
        }

        public override BaseController<Friendship, FriendshipInput> GetController(IFriendshipService service)
        {
            return new FriendshipController(service);
        }
    }
}
