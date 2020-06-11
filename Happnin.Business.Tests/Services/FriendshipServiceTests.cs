using Happnin.Business.Dto;
using Happnin.Business.Services;
using Happnin.Data;
using Happnin.Data.Tests;
using System.Threading.Tasks;
using Xunit;
using Friendship = Happnin.Data.Friendship;

namespace Happnin.Business.Tests.Services
{
    public class FriendshipServiceTests : EntityServiceBaseTest<Dto.Friendship, FriendshipInput, Data.Friendship>
    {
        private string user1;
        private string friend1;
        private string user2;
        private string friend2;

        public FriendshipServiceTests()
        {
            using var applicationDbContext = new AppDbContext(Options, null);
            var kyle = SampleData.UserKyle();
            var caleb = SampleData.UserCaleb();
            var jessica = SampleData.UserJessica();
            var salem = SampleData.UserSalem();
            applicationDbContext.Users.Add(kyle);
            applicationDbContext.Users.Add(caleb);
            applicationDbContext.Users.Add(jessica);
            applicationDbContext.Users.Add(salem);
            applicationDbContext.SaveChanges();

            user1 = kyle.Id;
            friend1 = caleb.Id;
            user2 = jessica.Id;
            friend2 = salem.Id;

        }
        public override (Friendship entity, Friendship secondEntity) GetEntities()
        {
            var frienship1 = new Friendship { UserId = user1, FriendId = friend1 };
            var friendship2 = new Friendship { UserId = user2, FriendId = friend2 };
            return (frienship1, friendship2);
        }

        public override (Dto.Friendship dto, Dto.Friendship seconDto) GetDtos()
        {
            var friendship1 = new Dto.Friendship { UserId = user1, FriendId = friend1 };
            var friendship2 = new Dto.Friendship { UserId = user2, FriendId = friend2 };
            return (friendship1, friendship2);
        }

        public override EntityService<Dto.Friendship, FriendshipInput, Friendship> GetService(AppDbContext dbContext)
        {
            return new FriendshipService(dbContext, Mapper);
        }

        public override void AssertEntitiesAreEqual(Friendship expected, Friendship actual)
        {
            Assert.Equal(expected.FriendId, actual.FriendId);
            Assert.Equal(expected.UserId, actual.UserId);
            Assert.Equal(expected.Id, actual.Id);
        }

        public override void AssertDtosAreEqual(Dto.Friendship expected, Dto.Friendship actual)
        {
            Assert.Equal(expected.UserId, actual.UserId);
            Assert.Equal(expected.FriendId, actual.FriendId);
        }

        public override Friendship UpdateEntity(Friendship entity, string update)
        {
            entity.FriendId = update;
            return entity;
        }

        public override Task Update_EntityUpdated_ShouldSaveToDatabase()
        {
            // TODO make this text work
            return null;
        }
    }
}
