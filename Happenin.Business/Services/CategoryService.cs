using System.Threading.Tasks;
using AutoMapper;
using Happnin.Business.Dto;
using Happnin.Data;
using Category = Happnin.Business.Dto.Category;

namespace Happnin.Business.Services
{
    public class CategoryService : EntityService<Dto.Category, Dto.CategoryInput, Data.Category>, ICategoryService
    {
        public CategoryService(AppDbContext applicationDbContext, IMapper mapper) : base(applicationDbContext, mapper)
        {
        }
    }
}
