using System;
using System.IO;
using System.Threading.Tasks;
using Happnin.Business.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Happnin.Business.Dto;

namespace Happnin.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UploadController : ControllerBase
    {
        private IEventImageService Service { get; }
        public UploadController(IEventImageService service)
        {
            Service = service;
        }


        [HttpPost]
        public async Task<EventImage> Post([FromForm]IFormFile body)
        {
            byte[] fileBytes;
            
            using(var memoryStream = new MemoryStream())
            {
                await body.CopyToAsync(memoryStream);
                fileBytes = memoryStream.ToArray();
            }

            var filename = body.FileName;
            var contentType = body.ContentType;
            
            var EventImage = new EventImageInput
            {
                DataType = contentType.ToString(),
                FileName = filename.ToString(),
                Image = fileBytes
            };

            var returned = await Service.InsertAsync(EventImage);

            return returned;
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<EventImageInput> Get(int id)
        {
            var result = await Service.FetchByIdAsync(id);
            return result;
        }
    }
}
