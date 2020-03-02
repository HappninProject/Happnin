using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Happnin.Business.Dto;
using Happnin.Business.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Happnin.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : BaseController<Category, CategoryInput>
    {
        public CategoryController(ICategoryService service) : base(service)
        {
        }
    }
}