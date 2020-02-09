using Happnin.Business.Dto;
using Happnin.Business.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Happnin.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BaseController<TDto, TInputDto> : ControllerBase
        where TInputDto : class
        where TDto : class, TInputDto, IEntity
    {
        protected IEntityService<TDto, TInputDto> Service { get; }

        protected BaseController(IEntityService<TDto, TInputDto> service)
        {
            Service = service ?? throw new ArgumentNullException(nameof(service));
        }

        [HttpGet]
        public async Task<IEnumerable<TDto>> Get() => await Service.FetchAllAsync();

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesDefaultResponseType]
        public async Task<IActionResult> Get(int id)
        {
            TDto entity = await Service.FetchByIdAsync(id);
            if (entity is null)
            {
                return NotFound();
            }

            return Ok(entity);
        }

        [HttpPost]
        public async Task<ActionResult<TDto>> Post(TInputDto input)
        {
            return await Service.InsertAsync(input);
        }

        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesDefaultResponseType]
        public async Task<ActionResult<TDto>> Put(int id, TInputDto input)
        {
            if (await Service.UpdateAsync(id, input) is TDto dto)
            {
                return Ok(dto);
            }

            return NotFound();
        }

        [HttpDelete]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesDefaultResponseType]
        public async Task<IActionResult> Delete(int id)
        {
            return await Service.DeleteAsync(id) ? (IActionResult) Ok() : NotFound();
        } 
    }
}