using System.ComponentModel.DataAnnotations;

namespace Happnin.Data
{
    public class EntityBase : IEntityBase
    {
        [Required]
        public int Id { get; set; }
    }
}
