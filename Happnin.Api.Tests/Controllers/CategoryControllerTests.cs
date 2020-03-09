using System;
using Happnin.Business.Dto;
using Happnin.Business.Services;
using Happnin.Controllers;
using Happnin.Data;
using Category = Happnin.Business.Dto.Category;

namespace Happnin.Tests.Controllers
{
    public class CategoryControllerTests : BaseControllerTests<ICategoryService, Category, CategoryInput>
    {
        public override Category CreateDto()
        {
            return new Category
            {
                CategoryType = CategoryTypes.Comedy,
                Id = new Random().Next()
            };
        }

        public override BaseController<Category, CategoryInput> GetController(ICategoryService service)
        {
            return new CategoryController(service);
        }
    }
}
