using System.Threading.Tasks;
using Happnin.Business.Tests;
using Happnin.Data;
using Happnin.Data.Tests;
using Microsoft.EntityFrameworkCore;
using SecretSanta.Business;
using Xunit;

namespace Happenin.Business.Tests
{
    public class UserServiceTests : EntityServiceBaseTest<User>
    {
        public override (User entity, User secondEntity) GetEntities()
        {
            return (SampleData.UserKyle(), SampleData.UserCaleb());
        }

        public override EntityService<User> GetService(AppDbContext dbContext)
        {
            return new UserService(dbContext, Mapper);
        }

        public override void AssertEntitiesAreEqual(User expected, User actual)
        {   
            Assert.Equal(expected.FirstName, actual.FirstName);
            Assert.Equal(expected.LastName, actual.LastName);
            Assert.Equal(expected.Email, actual.Email);
        }

        public override User UpdateEntity(User entity, string update)
        {
            entity.FirstName = update;
            return entity;
        }

        [Fact]
        public override async Task Update_EntityUpdated_ShouldSaveToDatabase()
        {
            using var dbContext = new AppDbContext(Options);
            EntityService<User> service = GetService(dbContext);
            (User entity, User secondEntity) = GetEntities();

            await dbContext.Users.AddAsync(entity);
            await dbContext.Users.AddAsync(secondEntity);
            await dbContext.SaveChangesAsync();
            
            using var dbContextFetch = new AppDbContext(Options);
            User updateEntityFromDb = await dbContextFetch.Users.Include(u => u.Location).SingleOrDefaultAsync(e => e.Id == entity.Id);

            updateEntityFromDb = UpdateEntity(updateEntityFromDb, "This was updated");

            await service.UpdateAsync(secondEntity.Id!.Value, updateEntityFromDb);

            using var dbContextAssert = new AppDbContext(Options);
            User entityFromDb = await dbContextAssert.Users.SingleOrDefaultAsync(e => e.Id == entity.Id);
            User secondEntityFromDb = await dbContextAssert.Users.SingleOrDefaultAsync(e => e.Id == secondEntity.Id);

            AssertEntitiesAreEqual(entity, entityFromDb);
            AssertEntitiesAreEqual(updateEntityFromDb, secondEntityFromDb);
        }

    }
}
