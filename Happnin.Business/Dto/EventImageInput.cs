namespace Happnin.Business.Dto
{
    public class EventImageInput
    {
        public string FileName { get; set; }
        public string DataType { get; set; }
        public byte[] Image { get; set; }
    }
}