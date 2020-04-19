using AutoMapper;
using Happnin.Data;
using System.Reflection;


namespace Happnin.Business
{
    public class AutomapperProfileConfiguration : Profile
    {
        public AutomapperProfileConfiguration()
        {
            CreateMap<User, Dto.User>();
            CreateMap<Dto.User, User>();
            CreateMap<Dto.UserInput, User>();
            CreateMap<Location, Dto.Location>();
            CreateMap<Dto.LocationInput, Location>();
            CreateMap<Event, Dto.Event>();
            CreateMap<Dto.EventInput, Event>();
            CreateMap<Category, Dto.Category>();
            CreateMap<Dto.CategoryInput, Category>();
            CreateMap<Dto.AttendingInput, Dto.Attending>();
            CreateMap<Dto.Attending, Dto.AttendingInput>();
            CreateMap<Dto.Attending, Attending>();
            CreateMap<Attending, Dto.Attending>();
            
            CreateMap<Event, Event>().ForMember(property => property.Id, option => option.Ignore());
            CreateMap<User, User>().ForMember(property => property.Id, option => option.Ignore());
            CreateMap<Location, Location>().ForMember(property => property.Id, option => option.Ignore());
        }

        static public IMapper CreateMapper()
        {
            var mapperConfiguration = new MapperConfiguration(cfg =>
            {
                cfg.AddMaps(Assembly.GetExecutingAssembly());
            });

            return mapperConfiguration.CreateMapper();
        }
    }
}