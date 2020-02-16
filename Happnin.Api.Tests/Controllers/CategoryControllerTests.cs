using System;
using System.Collections.Generic;
using System.Text;
using Happnin.Api.Controllers;
using Happnin.Business.Dto;
using Happnin.Business.Services;
using Happnin.Data;
using Category = Happnin.Business.Dto.Category;

namespace Happnin.Api.Tests.Controllers
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
