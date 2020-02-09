using AutoMapper;
using Happnin.Data.Tests;

namespace Happnin.Business.Tests
{
    public class BaseTests : BaseTest
    {
        public IMapper Mapper { get; set; }
        public BaseTests()
        {
            Mapper = AutomapperProfileConfiguration.CreateMapper();
        }
    }
}
