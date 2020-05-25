using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Happnin.Data
{
    public class EventImage : IEntityBase
    {
        public int Id { get; set; }
        [ForeignKey("Event")]
        public int EventId { get; set; }
        public Event Event { get; set; }
        public byte[] Image { get; set; }
        public string FileName { get; set; }
        public string DataType { get; set; }

        public EventImage(int eventId, byte[] image, string fileName, string dataType)
        {
            EventId = eventId;
            Image = image;
            FileName = fileName;
            DataType = dataType;
        }
    }
}
