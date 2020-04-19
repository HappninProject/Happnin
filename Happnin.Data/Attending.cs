using System;
using System.Collections.Generic;
using System.Security.Policy;
using System.Text;

namespace Happnin.Data
{
    public class Attending : EntityBase
    {
        private string _userId;
        public string UserId
        {
            get => _userId;
            set => _userId = !string.IsNullOrEmpty(value) ?
                value :
                throw new ArgumentNullException(nameof(UserId), "UserId entered is not valid");

        }
        public int EventId { get; set; }

    }
}
