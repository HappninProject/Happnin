using System.Linq;
using System.Threading.Tasks;
using IdentityServer4.EntityFramework.Options;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Xunit;

namespace Happnin.Data.Tests
{
    public class CategoryTests : BaseTest
    {
        
        //[Fact]
        public async Task Create_Category_DatabaseShouldSaveIt()
        {
            var categoryId = -1;
            Category category = SampleData.Category;

            using var appDbContext = new AppDbContext(Options, new OptionsWrapper<OperationalStoreOptions>(new OperationalStoreOptions()));
            appDbContext.Categories.Add(category);
            await appDbContext.SaveChangesAsync();
            categoryId = category.Id;

            using var assertDbContext = new AppDbContext(Options, null);
            Category categoryFromDb = await assertDbContext.Categories.Where(c => c.Id == categoryId).SingleOrDefaultAsync();
            
            Assert.Equal(category.CategoryType, categoryFromDb.CategoryType);
        }
         
        //[Fact]
        public async Task Create_CategoryWithEvents_DatabaseShouldSaveIt()
        {
            var categoryId = -1;
            var eventHappnin = SampleData.EventFestival();
            Category category = SampleData.Category;
            category.Events.Add(eventHappnin);

            using var appDbContext = new AppDbContext(Options, null);
            appDbContext.Categories.Add(category);
            await appDbContext.SaveChangesAsync();
            categoryId = category.Id;

            using var assertDbContext = new AppDbContext(Options, null);
            Category categoryFromDb = await assertDbContext.Categories.Include(c => c.Events).Where(c => c.Id == categoryId).SingleOrDefaultAsync();
            
            Assert.Equal(category.CategoryType, categoryFromDb.CategoryType);
            Assert.True(categoryFromDb.Events.Count > 0);

        }
   }
}
