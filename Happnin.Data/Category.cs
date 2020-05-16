using System.Collections.Generic;

namespace Happnin.Data
{
    public class Category : EntityBase
    {

        public CategoryTypes CategoryType { get; set; }
        public List<Event> Events { get; } = new List<Event>();

        public Category(CategoryTypes category) : this()
        {
            CategoryType = category;
        }

        private Category() { }
    }

    public enum CategoryTypes
    {
        Music = 0,
        Festival = 1,
        Comedy = 2,
        Culture = 3,
        Other = 4,
        Product = 5
    }
}
