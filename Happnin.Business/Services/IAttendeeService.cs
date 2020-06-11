using System.Threading.Tasks;
using Happnin.Business.Dto;

namespace Happnin.Business.Services
{
    public interface IAttendeeService : IEntityService<Attending, AttendingInput>
    {
        Task<int> GetAttendingCount(int eventId);
    }
}
