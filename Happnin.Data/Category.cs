using System;
using System.Collections.Generic;
using System.Text;

namespace Happnin.Data
{
    public class Category : EntityBase
    {

        public CategoryTypes CategoryType { get; set; }

        public Category(CategoryTypes category)
        {
            CategoryType = category;
        }
    }

    public enum CategoryTypes
    {
        Music = 0,
        Festival = 1,
        Comedy = 2,
        Culture = 3,
        Other = 4
    }
}
