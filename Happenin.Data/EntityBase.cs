using System.ComponentModel.DataAnnotations;

namespace Happenin.Data
{
    public class EntityBase
    {
        [Required]
        public int? Id { get; protected set; }
    }
}
