using AutoMapper;
using BlogEngine.Business;
using Happnin.Data.Tests;

namespace Happenin.Business.Tests
{
    public class BaseTests : BaseTest
    {
        public IMapper Mapper { get; set; }
        public BaseTests() : base()
        {
            Mapper = AutomapperProfileConfiguration.CreateMapper();
        }
    }
}
