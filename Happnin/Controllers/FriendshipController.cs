using System.Collections.Generic;
using System.Threading.Tasks;
using Happnin.Business.Dto;
using Happnin.Business.Services;
using Microsoft.AspNetCore.Mvc;

namespace Happnin.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FriendshipController : BaseController<Friendship, FriendshipInput>
    {
        public IFriendshipService FriendShipService { get; set; }
        public FriendshipController(IFriendshipService service) : base(service)
        {
            FriendShipService = service;
        }
        
        [HttpGet]
        [Route("UserRequests/{id}")]
        public async Task<List<Friendship>> GetUserRequests(string id)
        {
            return await FriendShipService.FetchUserRequests(id);
        } 
        
        [HttpGet]
        [Route("RequestsForUser/{id}")]
        public async Task<List<Friendship>> GetRequestsForUser(string id)
        {
            return await FriendShipService.FetchUserRequests(id);
        }
 
    }
}
