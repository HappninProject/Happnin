namespace Happnin.Business.Dto
{
    public class User : UserInput, IEntity
    {
        public int Id { get; set; }
    }
}
