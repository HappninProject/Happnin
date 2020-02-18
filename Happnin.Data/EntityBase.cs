using System.ComponentModel.DataAnnotations;
using Happnin.Data.Migrations;

namespace Happnin.Data
{
    public class EntityBase : IEntityBase
    {
        [Required]
        public int Id { get; set; }
    }
}
