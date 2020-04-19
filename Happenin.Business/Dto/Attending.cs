using System;
using System.Collections.Generic;
using System.Text;

namespace Happnin.Business.Dto
{
    public class Attending : AttendingInput, IEntity
    {
        public int Id { get; set; }
    }

    public class AttendingInput
    {
        public int EventId { get; set; }
        public string UserId { get; set; }
    }
}
