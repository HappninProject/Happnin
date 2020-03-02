using System.Collections.Generic;
using System.Threading.Tasks;
using Happnin.Business.Dto;

namespace Happnin.Business.Services
{
    public interface IUserService
    {
        Task<List<Dto.User>> FetchAllAsync();
        Task<Dto.User> FetchByIdAsync(string id);
        Task<Dto.User> InsertAsync(UserInput entity);
        Task<Dto.User> UpdateAsync(string id, UserInput entity);
        Task<bool> DeleteAsync(string id);
    }
}
