using Happnin.Business.Dto;
using Happnin.Business.Services;
using Happnin.Data;
using Happnin.Data.Tests;
using Xunit;
using Category = Happnin.Data.Category;

namespace Happnin.Business.Tests.Services
{
    public class CategoryServiceTests : EntityServiceBaseTest<Dto.Category, Dto.CategoryInput, Category>
    {
        public override (Category entity, Category secondEntity) GetEntities()
        {
            return (SampleData.Category, SampleData.SecondCategory);
        }

        public override (Dto.Category dto, Dto.Category seconDto) GetDtos()
        {
            var dtoCategory = Mapper.Map<Category, Dto.Category>(SampleData.Category);
            var dtoSecondCategory = Mapper.Map<Category, Dto.Category>(SampleData.SecondCategory);
            return (dtoCategory, dtoSecondCategory);
        }

        public override EntityService<Dto.Category, CategoryInput, Category> GetService(AppDbContext dbContext)
        {
            return new CategoryService(dbContext, Mapper);
        }

        public override void AssertEntitiesAreEqual(Category expected, Category actual)
        {
            Assert.Equal(expected.CategoryType, actual.CategoryType);
        }

        public override void AssertDtosAreEqual(Dto.Category expected, Dto.Category actual)
        {
            Assert.Equal(expected.CategoryType, actual.CategoryType);
        }

        public override Category UpdateEntity(Category entity, string update)
        {
            // just returns a different category, than the generated ones, 
            // since the category is an enum and has no string.
            return new Category(CategoryTypes.Music);
        }
    }
}
