using System;
using System.Collections.Generic;
using System.Text;
using Happnin.Data;

namespace Happnin.Business.Dto
{
    public class Category : CategoryInput, IEntity
    {
        public int Id { get; set; }
    }

    public class CategoryInput
    {
        public CategoryTypes CategoryType { get; set; }
    }
}
