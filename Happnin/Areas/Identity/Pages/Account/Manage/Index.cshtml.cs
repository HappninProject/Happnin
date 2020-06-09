using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Happnin.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace Happnin.Areas.Identity.Pages.Account.Manage
{
    public partial class IndexModel : PageModel
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;

        public IndexModel(
            UserManager<User> userManager,
            SignInManager<User> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }

        public string Username { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string ZipCode{ get; set; }

        public string Email { get; set; }

        public byte[] Image { get; set; }

        [TempData]
        public string StatusMessage { get; set; }

        [BindProperty]
        public InputModel Input { get; set; }

        public class InputModel
        {
            [Required]
            [Display(Name = "FirstName")]
            public string FirstName { get; set; }

            [Required]
            [Display(Name = "LastName")]
            public string LastName { get; set; }

            [Required]
            [Display(Name = "UserName")]
            public string UserName { get; set; }

            [Required]
            [Display(Name = "ZipCode")]
            public string ZipCode { get; set; }

            [Display(Name = "Image")] 
            public IFormFile Image { get; set; }
        }

        private async Task LoadAsync(User user)
        {
            var userName = await _userManager.GetUserNameAsync(user);
            FirstName = user.FirstName;
            LastName = user.LastName;
            ZipCode = user.ZipCode;
            Username = userName;
            Image = user.Image;



            Input = new InputModel
            {
                UserName = userName,
                FirstName = this.FirstName,
                LastName =  this.LastName,
                ZipCode = this.ZipCode,
            };
        }

        public async Task<IActionResult> OnGetAsync()
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null)
            {
                return NotFound($"Unable to load user with ID '{_userManager.GetUserId(User)}'.");
            }

            await LoadAsync(user);
            return Page();
        }

        public async Task<IActionResult> OnPostAsync()
        {
            bool changed = false;
            var user = await _userManager.GetUserAsync(User);
            if (user == null)
            {
                return NotFound($"Unable to load user with ID '{_userManager.GetUserId(User)}'.");
            }

            if (!ModelState.IsValid)
            {
                await LoadAsync(user);
                return Page();
            }

            if (Input.UserName != user.UserName)
            {

                var userNameExists = await  _userManager.FindByNameAsync(Input.UserName);
                if (userNameExists == null)
                {
                    user.UserName = Input.UserName;
                    changed = true;
                }
                else
                {
                    ModelState.AddModelError( "UserName", $"Username {Input.UserName} already exists");
                }
            } 
            
            if (Input.Image != null)
            { 
                user.Image = await ConvertImage(Input.Image);
                changed = true;
            }
           
            if (Input.FirstName != user.FirstName || Input.LastName != user.LastName || Input.ZipCode != user.ZipCode)
            { 
                user.FirstName = Input.FirstName; 
                user.LastName = Input.LastName; 
                user.ZipCode = Input.ZipCode;
                changed = true;
            }

            if (changed)
            {
                var result = await _userManager.UpdateAsync(user);
                if (!result.Succeeded)
                { 
                    var userId = await _userManager.GetUserIdAsync(user); 
                    throw new InvalidOperationException($"Unexpected error occurred while updating your profile '{userId}'.");
                }
            }    
           
            await _signInManager.RefreshSignInAsync(user);
            StatusMessage = "Your profile has been updated";
            return RedirectToPage();
        }

        private async Task<byte[]> ConvertImage(IFormFile image)
        {
            byte[] fileBytes;
            
            using(var memoryStream = new MemoryStream())
            {
                await image.CopyToAsync(memoryStream);
                fileBytes = memoryStream.ToArray();
            }

            return fileBytes;
        }
    }
}
