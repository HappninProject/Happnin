using System.ComponentModel.DataAnnotations;

namespace Happnin.Business.Dto
{
    public class UserInput
    {
        [Required]
        public string UserName { get; set; }
        
        public string Password { get; set; }
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        public string ZipCode { get; set; }

        public byte[] Image { get; set; }
        public string FileName { get; set; }
        public string DataType { get; set; }
    }
}