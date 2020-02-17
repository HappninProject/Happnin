using Happnin.Business.Dto;
using Happnin.Business.Services;
using Happnin.Data;
using Happnin.Data.Tests;
using Xunit;
using User = Happnin.Data.User;

namespace Happnin.Business.Tests
{
    public class UserServiceTests : EntityServiceBaseTest<Dto.User, UserInput, User>
    {
        public UserServiceTests()
        {
            // seeding foreign key value of location for user.
            using var applicationDbContext = new AppDbContext(Options);
            applicationDbContext.Locations.Add(SampleData.Location1234Spokane());
            applicationDbContext.Locations.Add(SampleData.Location3456Spokane());
            applicationDbContext.SaveChanges();
        } 
        
        public override (User entity, User secondEntity) GetEntities()
        {
            return (SampleData.UserKyle(), SampleData.UserCaleb());
        }

        public override (Dto.User dto, Dto.User seconDto) GetDtos()
        {
            Dto.User kyleDto = Mapper.Map<User, Dto.User>(SampleData.UserKyle());
            kyleDto.LocationId = 1;
            Dto.User calebDto = Mapper.Map<User, Dto.User>(SampleData.UserCaleb());
            calebDto.LocationId = 2;
            return (kyleDto, calebDto);
        }

        public override EntityService<Dto.User, UserInput, User> GetService(AppDbContext dbContext)
        {
            return new UserService(dbContext, Mapper);
        }

        public override void AssertEntitiesAreEqual(User expected, User actual)
        {   
            Assert.Equal(expected.FirstName, actual.FirstName);
            Assert.Equal(expected.LastName, actual.LastName);
            Assert.Equal(expected.Email, actual.Email);
        }

        public override void AssertDtosAreEqual(Dto.User expected, Dto.User actual)
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
    }
}
