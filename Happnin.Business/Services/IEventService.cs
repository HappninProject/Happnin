using System.Collections.Generic;
using System.Threading.Tasks;
using Happnin.Business.Dto;

namespace Happnin.Business.Services
{
    public interface IEventService : IEntityService<Event, EventInput>
    {
        Task<List<Event>> FetchHostedEventsAsync(string id);
        Task<List<Event>> FetchProductEventsAsync();
        Task<List<Event>> FetchEventsOnlyAsync();
    }
}
