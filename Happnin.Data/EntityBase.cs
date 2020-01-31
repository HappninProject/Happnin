using System.ComponentModel.DataAnnotations;

namespace Happnin.Data
{
    public class EntityBase
    {
        [Required]
        public int? Id { get; protected set; }
    }
}
